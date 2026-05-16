import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendOutreachEmail } from '@/lib/email'

// Simple in-memory rate limiter (resets on cold starts; sufficient for low-volume)
const rateLimitMap = new Map<string, { count: number; windowStart: number }>()
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000 // 1 hour
const RATE_LIMIT_MAX = 5 // max submissions per IP per hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, windowStart: now })
    return true
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false
  }

  entry.count++
  return true
}

const outreachSchema = z.object({
  submissionType: z.enum([
    'property-owner',
    'agent',
    'wholesaler',
    'contractor',
    'lender',
    'investor',
    'housing-partner',
    'other',
  ]),
  fullName: z.string().min(2, 'Full name is required').max(100),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(10, 'Valid phone number is required').max(20),
  preferredContact: z.string().optional(),
  // Property fields (optional)
  propertyAddress: z.string().optional(),
  propertyCity: z.string().optional(),
  propertyState: z.string().optional(),
  propertyZip: z.string().optional(),
  propertyType: z.string().optional(),
  occupancyStatus: z.string().optional(),
  condition: z.string().optional(),
  knownRepairs: z.string().optional(),
  codeViolations: z.string().optional(),
  taxMortgageIssues: z.string().optional(),
  isListed: z.string().optional(),
  isUnderContract: z.string().optional(),
  foreclosureDate: z.string().optional(),
  desiredPrice: z.string().optional(),
  timeline: z.string().optional(),
  // Partner fields (optional)
  companyName: z.string().optional(),
  roleService: z.string().optional(),
  marketsServed: z.string().optional(),
  partnershipType: z.string().optional(),
  websiteLink: z.string().optional(),
  // Situation
  reasonForReaching: z.string().optional(),
  desiredOutcome: z.string().optional(),
  urgentInfo: z.string().optional(),
  // Honeypot
  _hp: z.string().optional(),
  // Source
  referralSource: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      '0.0.0.0'

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      )
    }

    const contentType = request.headers.get('content-type') || ''
    let fields: Record<string, string> = {}
    const attachments: { filename: string; content: Buffer }[] = []

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData()

      for (const [key, value] of formData.entries()) {
        if (typeof value === 'string') {
          fields[key] = value
        } else if (value instanceof File && value.size > 0) {
          if (value.size > 10 * 1024 * 1024) continue // Skip files > 10MB
          if (attachments.length >= 5) continue // Max 5 files
          const buffer = Buffer.from(await value.arrayBuffer())
          attachments.push({ filename: value.name, content: buffer })
        }
      }
    } else {
      const body = await request.json()
      fields = body
    }

    // Honeypot check
    if (fields._hp && fields._hp.trim() !== '') {
      return NextResponse.json({ success: true })
    }

    const parsed = outreachSchema.safeParse(fields)

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors
      return NextResponse.json(
        { error: 'Validation failed', errors },
        { status: 400 }
      )
    }

    const result = await sendOutreachEmail(
      parsed.data,
      attachments.length > 0 ? attachments : undefined
    )

    if (!result.success) {
      console.error('Email send error:', result.error)
      return NextResponse.json(
        { error: 'Failed to send submission. Please try again or contact us directly.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Outreach API error:', err)
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again.' },
      { status: 500 }
    )
  }
}
