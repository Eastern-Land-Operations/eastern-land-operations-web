import { NextRequest, NextResponse } from 'next/server'
import { sendOutreachEmail } from '@/lib/email'
import { outreachSchema } from '@/lib/outreachSchemas'

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
