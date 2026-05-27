import { Resend } from 'resend'
import type { OutreachSubmission } from '@/lib/outreachSchemas'

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'contact@easternlandoperations.com'
const FROM_EMAIL = process.env.FROM_EMAIL || 'onboarding@resend.dev'

function getResend(): Resend {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY environment variable is not set')
  return new Resend(key)
}

export type OutreachFormData = OutreachSubmission

function buildEmailSubject(data: OutreachFormData): string {
  const typeMap: Record<string, string> = {
    'property-owner': 'New Seller Property Intake',
    'agent': 'New Agent Inquiry',
    'wholesaler': 'New Wholesaler / Source Partner',
    'contractor': 'New Contractor Inquiry',
    'lender': 'New Lender / Capital Partner Inquiry',
    'investor': 'New Buyer / Investor Profile',
    'housing-partner': 'New Community / Housing Partner',
    'other': 'New Outreach',
  }

  const prefix = typeMap[data.submissionType] || 'New Outreach'

  if (data.submissionType === 'property-owner' && data.propertyAddress) {
    return `${prefix} - ${data.propertyAddress}`
  }

  if ('companyName' in data && data.companyName) {
    return `${prefix} - ${data.fullName} (${data.companyName})`
  }

  return `${prefix} - ${data.fullName}`
}

function row(label: string, value: string | undefined): string {
  if (!value || value.trim() === '') return ''
  return `
    <tr>
      <td style="padding: 8px 16px 8px 0; color: #A9B0B8; font-size: 13px; white-space: nowrap; vertical-align: top; width: 220px;">${label}</td>
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
    'property-owner': 'Seller / Warm Lead Intake',
    'agent': 'Agent',
    'wholesaler': 'Wholesaler / Source Partner',
    'contractor': 'Contractor',
    'lender': 'Lender / Capital Partner',
    'investor': 'Buyer / Investor Buy Box',
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
      row('Preferred Contact', 'preferredContact' in data ? data.preferredContact : undefined),
    ].join('')
  )

  const detailsSection =
    data.submissionType === 'property-owner'
      ? section(
          'Property Intake',
          [
            row('Property Address', data.propertyAddress),
            row('Do You Own The Property?', data.propertyOwnership),
            row('Other Decision-Makers Involved', data.otherDecisionMakers),
            row('Occupancy Status', data.occupancyStatus),
            row('Property Type', data.propertyType),
            row('Situation', data.situation),
            row('Known Repairs Or Issues', data.knownRepairs),
            row('Decision Timeline', data.timeline),
            row('Desired Outcome', data.desiredOutcome),
            row('Mortgages / Taxes / Liens / Violations', data.taxMortgageIssues),
            row('Best Time To Contact', data.bestTimeToContact),
            row('Additional Notes', data.notes),
            row('Referral Source', data.referralSource),
          ].join('')
        )
      : 'propertyTypesWanted' in data
        ? section(
            'Buyer / Investor Buy Box',
            [
              row('Company Name', 'companyName' in data ? data.companyName : undefined),
              row('Buyer Type', data.fundingType),
              row('Property Types Wanted', data.propertyTypesWanted.join(', ')),
              row('Preferred Areas / Zip Codes', data.preferredAreas),
              row('Typical Purchase Price Range', data.typicalPurchasePriceRange),
              row('Maximum Purchase Price', data.maximumPurchasePrice),
              row('Minimum Desired Profit / Return', data.minimumDesiredReturn),
              row('Buyer Role', data.buyerRole),
              row('Rehab Tolerance', data.rehabTolerance),
              row('Close Speed', data.closeSpeed),
              row('Purchases In Last 12 Months', data.purchasesLast12Months),
              row('Proof Of Funds / Lender Letter', data.proofOfFundsAvailable),
              row('Preferred Deal Alert Method', data.preferredDealAlertMethod),
              row('VIP / First-Look Alerts', data.vipAlerts),
              row('Notes', data.notes),
              row('Referral Source', data.referralSource),
            ].join('')
          )
        : section(
            'Partner / Outreach Details',
            [
              row('Company Name', 'companyName' in data ? data.companyName : undefined),
              row('Role / Service', 'roleService' in data ? data.roleService : undefined),
              row('Markets Served', 'marketsServed' in data ? data.marketsServed : undefined),
              row('Partnership Type', 'partnershipType' in data ? data.partnershipType : undefined),
              row('Website / Social', 'websiteLink' in data ? data.websiteLink : undefined),
              row('Reason For Reaching Out', 'reasonForReaching' in data ? data.reasonForReaching : undefined),
              row('Desired Outcome', 'desiredOutcome' in data ? data.desiredOutcome : undefined),
              row('Urgent Information', 'urgentInfo' in data ? data.urgentInfo : undefined),
              row('Referral Source', data.referralSource),
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
  <div style="max-width: 680px; margin: 0 auto; padding: 32px 16px;">
    <div style="border-bottom: 1px solid #3A4047; padding-bottom: 20px; margin-bottom: 28px;">
      <div style="font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: #4E5B4C; margin-bottom: 6px;">
        Eastern Land Operations
      </div>
      <div style="font-size: 20px; font-weight: 700; color: #F4F4F2;">
        ${buildEmailSubject(data)}
      </div>
      <div style="font-size: 12px; color: #A9B0B8; margin-top: 4px;">
        Received ${new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </div>
    </div>

    <div>
      ${contactSection}
      ${detailsSection}
    </div>

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
      emailData.attachments = attachments.map((attachment) => ({
        filename: attachment.filename,
        content: attachment.content,
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
