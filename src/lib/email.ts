import { Resend } from 'resend'

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'contact@easternlandoperations.com'
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev'

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY environment variable is not set')
  return new Resend(key)
}

export interface OutreachFormData {
  submissionType: string
  fullName: string
  email: string
  phone: string
  preferredContact?: string
  // Property fields
  propertyAddress?: string
  propertyCity?: string
  propertyState?: string
  propertyZip?: string
  propertyType?: string
  occupancyStatus?: string
  condition?: string
  knownRepairs?: string
  codeViolations?: string
  taxMortgageIssues?: string
  isListed?: string
  isUnderContract?: string
  foreclosureDate?: string
  desiredPrice?: string
  timeline?: string
  // Partner fields
  companyName?: string
  roleService?: string
  marketsServed?: string
  partnershipType?: string
  websiteLink?: string
  // Situation
  reasonForReaching?: string
  desiredOutcome?: string
  urgentInfo?: string
  // Source
  referralSource?: string
}

function buildEmailSubject(data: OutreachFormData): string {
  const typeMap: Record<string, string> = {
    'property-owner': 'New Property Submission',
    'agent': 'New Agent Inquiry',
    'wholesaler': 'New Wholesaler/Source Partner',
    'contractor': 'New Contractor Inquiry',
    'lender': 'New Lender/Capital Partner Inquiry',
    'investor': 'New Investor Inquiry',
    'housing-partner': 'New Community/Housing Partner',
    'other': 'New Outreach',
  }

  const prefix = typeMap[data.submissionType] || 'New Outreach'

  if (
    data.submissionType === 'property-owner' &&
    data.propertyAddress &&
    data.propertyCity
  ) {
    return `${prefix} — ${data.propertyAddress}, ${data.propertyCity}${data.propertyState ? ', ' + data.propertyState : ''}`
  }

  if (data.companyName) {
    return `${prefix} — ${data.fullName} (${data.companyName})`
  }

  return `${prefix} — ${data.fullName}`
}

function row(label: string, value: string | undefined): string {
  if (!value || value.trim() === '') return ''
  return `
    <tr>
      <td style="padding: 8px 16px 8px 0; color: #A9B0B8; font-size: 13px; white-space: nowrap; vertical-align: top; width: 200px;">${label}</td>
      <td style="padding: 8px 0; color: #F4F4F2; font-size: 14px; vertical-align: top;">${value}</td>
    </tr>`
}

function section(title: string, rows: string): string {
  const content = rows.trim()
  if (!content) return ''
  return `
    <div style="margin-bottom: 28px;">
      <div style="font-family: sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: #4E5B4C; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #3A4047;">
        ${title}
      </div>
      <table style="width: 100%; border-collapse: collapse;">
        ${content}
      </table>
    </div>`
}

function buildEmailHtml(data: OutreachFormData): string {
  const typeLabels: Record<string, string> = {
    'property-owner': 'Property Owner',
    'agent': 'Agent',
    'wholesaler': 'Wholesaler / Source Partner',
    'contractor': 'Contractor',
    'lender': 'Lender / Capital Partner',
    'investor': 'Investor',
    'housing-partner': 'Community / Housing Partner',
    'other': 'Other',
  }

  const contactSection = section(
    'Contact Information',
    [
      row('Submission Type', typeLabels[data.submissionType] || data.submissionType),
      row('Full Name', data.fullName),
      row('Email', data.email),
      row('Phone', data.phone),
      row('Preferred Contact', data.preferredContact),
    ].join('')
  )

  const propertySection = section(
    'Property Information',
    [
      row('Address', data.propertyAddress),
      row('City', data.propertyCity),
      row('State', data.propertyState),
      row('ZIP', data.propertyZip),
      row('Property Type', data.propertyType),
      row('Occupancy Status', data.occupancyStatus),
      row('Current Condition', data.condition),
      row('Known Repairs', data.knownRepairs),
      row('Code Violations', data.codeViolations),
      row('Tax / Mortgage Issues', data.taxMortgageIssues),
      row('Currently Listed', data.isListed),
      row('Under Contract', data.isUnderContract),
      row('Foreclosure / Sheriff Sale Date', data.foreclosureDate),
      row('Desired Price', data.desiredPrice),
      row('Timeline', data.timeline),
    ].join('')
  )

  const partnerSection = section(
    'Partner Information',
    [
      row('Company Name', data.companyName),
      row('Role / Service', data.roleService),
      row('Markets Served', data.marketsServed),
      row('Partnership Type', data.partnershipType),
      row('Website / Social', data.websiteLink),
    ].join('')
  )

  const situationSection = section(
    'Situation & Notes',
    [
      row('Reason for Reaching Out', data.reasonForReaching),
      row('Desired Outcome', data.desiredOutcome),
      row('Urgent Information', data.urgentInfo),
      row('How did you hear about us?', data.referralSource),
    ].join('')
  )

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin: 0; padding: 0; background-color: #0B0D0F; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;">
  <div style="max-width: 640px; margin: 0 auto; padding: 32px 16px;">
    <!-- Header -->
    <div style="border-bottom: 1px solid #3A4047; padding-bottom: 20px; margin-bottom: 28px;">
      <div style="font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: #4E5B4C; margin-bottom: 6px;">
        Eastern Land Operations
      </div>
      <div style="font-size: 20px; font-weight: 700; color: #F4F4F2;">
        ${buildEmailSubject(data)}
      </div>
      <div style="font-size: 12px; color: #A9B0B8; margin-top: 4px;">
        Received ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>

    <!-- Content -->
    <div>
      ${contactSection}
      ${propertySection}
      ${partnerSection}
      ${situationSection}
    </div>

    <!-- Footer -->
    <div style="margin-top: 32px; padding-top: 20px; border-top: 1px solid #232831; font-size: 11px; color: #A9B0B8; text-align: center;">
      This submission was sent from easternlandoperations.com
    </div>
  </div>
</body>
</html>`
}

export async function sendOutreachEmail(
  data: OutreachFormData,
  attachments?: { filename: string; content: Buffer }[]
): Promise<{ success: boolean; error?: string }> {
  try {
    const resend = getResend()
    const emailData: Parameters<typeof resend.emails.send>[0] = {
      from: FROM_EMAIL,
      to: [CONTACT_EMAIL],
      reply_to: data.email,
      subject: buildEmailSubject(data),
      html: buildEmailHtml(data),
    }

    if (attachments && attachments.length > 0) {
      emailData.attachments = attachments.map((a) => ({
        filename: a.filename,
        content: a.content,
      }))
    }

    const { error } = await resend.emails.send(emailData)

    if (error) {
      console.error('Resend error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (err) {
    console.error('Email send failed:', err)
    return { success: false, error: 'Failed to send email' }
  }
}
