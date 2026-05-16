'use client'

import { useState, useRef } from 'react'

type SubmissionType =
  | 'property-owner'
  | 'agent'
  | 'wholesaler'
  | 'contractor'
  | 'lender'
  | 'investor'
  | 'housing-partner'
  | 'other'
  | ''

const submissionTypes: { value: SubmissionType; label: string; description: string }[] = [
  { value: 'property-owner', label: 'Property Owner', description: 'I own a property I want to sell or discuss' },
  { value: 'agent', label: 'Agent / Realtor', description: 'I represent buyers or sellers' },
  { value: 'wholesaler', label: 'Wholesaler / Source Partner', description: 'I bring deal flow and off-market properties' },
  { value: 'contractor', label: 'Contractor / Subcontractor', description: 'I provide rehab or construction services' },
  { value: 'lender', label: 'Lender / Capital Partner', description: 'I provide financing or private capital' },
  { value: 'investor', label: 'Investor', description: "I'm interested in investment opportunities" },
  { value: 'housing-partner', label: 'Community / Housing Partner', description: 'I work with housing programs or community organizations' },
  { value: 'other', label: 'Other', description: "My inquiry doesn't fit the above categories" },
]

const isPropertyType = (t: SubmissionType) =>
  ['property-owner', 'agent', 'wholesaler'].includes(t)

const isPartnerType = (t: SubmissionType) =>
  ['wholesaler', 'contractor', 'lender', 'investor', 'housing-partner', 'agent', 'other'].includes(t)

interface FormState {
  submissionType: SubmissionType
  fullName: string
  email: string
  phone: string
  preferredContact: string
  propertyAddress: string
  propertyCity: string
  propertyState: string
  propertyZip: string
  propertyType: string
  occupancyStatus: string
  condition: string
  knownRepairs: string
  codeViolations: string
  taxMortgageIssues: string
  isListed: string
  isUnderContract: string
  foreclosureDate: string
  desiredPrice: string
  timeline: string
  companyName: string
  roleService: string
  marketsServed: string
  partnershipType: string
  websiteLink: string
  reasonForReaching: string
  desiredOutcome: string
  urgentInfo: string
  referralSource: string
  _hp: string
}

const initialState: FormState = {
  submissionType: '',
  fullName: '',
  email: '',
  phone: '',
  preferredContact: '',
  propertyAddress: '',
  propertyCity: '',
  propertyState: '',
  propertyZip: '',
  propertyType: '',
  occupancyStatus: '',
  condition: '',
  knownRepairs: '',
  codeViolations: '',
  taxMortgageIssues: '',
  isListed: '',
  isUnderContract: '',
  foreclosureDate: '',
  desiredPrice: '',
  timeline: '',
  companyName: '',
  roleService: '',
  marketsServed: '',
  partnershipType: '',
  websiteLink: '',
  reasonForReaching: '',
  desiredOutcome: '',
  urgentInfo: '',
  referralSource: '',
  _hp: '',
}

function FieldLabel({ htmlFor, children, required }: { htmlFor: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="t-eyebrow block mb-2" style={{ fontSize: '10px' }}>
      {children}
      {required && <span className="text-olive ml-1">*</span>}
    </label>
  )
}

function FieldInput({
  id, name, type = 'text', value, onChange, placeholder, required,
}: {
  id: string; name: string; type?: string; value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string; required?: boolean
}) {
  return (
    <input
      id={id} name={name} type={type} value={value}
      onChange={onChange} placeholder={placeholder} required={required}
      className="form-field w-full"
    />
  )
}

function FieldSelect({
  id, name, value, onChange, children, required,
}: {
  id: string; name: string; value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
  children: React.ReactNode; required?: boolean
}) {
  return (
    <select
      id={id} name={name} value={value} onChange={onChange} required={required}
      className="form-field w-full appearance-none"
    >
      {children}
    </select>
  )
}

function FieldTextarea({
  id, name, value, onChange, placeholder, rows = 4,
}: {
  id: string; name: string; value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder?: string; rows?: number
}) {
  return (
    <textarea
      id={id} name={name} value={value} onChange={onChange}
      placeholder={placeholder} rows={rows}
      className="form-field w-full resize-vertical"
    />
  )
}

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="border-t border-gunmetal pt-8 mt-8">
      <p className="t-eyebrow mb-6" style={{ fontSize: '10px' }}>{label}</p>
    </div>
  )
}

export default function OutreachForm() {
  const [form, setForm] = useState<FormState>(initialState)
  const [files, setFiles] = useState<FileList | null>(null)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {}
    if (!form.submissionType) newErrors.submissionType = 'Select a submission type'
    if (!form.fullName.trim()) newErrors.fullName = 'Full name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Valid email is required'
    if (!form.phone.trim() || form.phone.replace(/\D/g, '').length < 10) newErrors.phone = 'Valid phone number is required'
    if (isPropertyType(form.submissionType) && !form.propertyAddress.trim()) {
      newErrors.propertyAddress = 'Property address is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')
    setErrorMessage('')

    try {
      const body: Record<string, string> = {}
      Object.entries(form).forEach(([key, val]) => {
        if (val) body[key] = val
      })

      const res = await fetch('/api/outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Submission failed')
      }

      setStatus('success')
      setForm(initialState)
      setFiles(null)
      if (fileInputRef.current) fileInputRef.current.value = ''
    } catch (err) {
      setStatus('error')
      setErrorMessage(
        err instanceof Error ? err.message : 'An error occurred. Please try again or contact us directly.'
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="py-12">
        <div className="w-10 h-0.5 bg-olive mb-6" />
        <h3 className="t-h2 text-xl mb-4">Submission received.</h3>
        <p className="t-body text-sm mb-6">
          Our team reviews all submissions. We follow up within one business day with those that are a fit.
        </p>
        <p className="t-body text-sm">
          For urgent situations, reach us directly:{' '}
          <a href="tel:3026893912" className="t-mono text-sm hover:text-off-white transition-colors">
            302-689-3912
          </a>
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-8 t-eyebrow hover:text-off-white transition-colors"
          style={{ fontSize: '10px' }}
        >
          Submit another inquiry &rarr;
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot */}
      <div aria-hidden="true" style={{ display: 'none' }}>
        <input name="_hp" type="text" tabIndex={-1} autoComplete="off" value={form._hp} onChange={handleChange} />
      </div>

      {/* Submission type */}
      <div className="mb-8">
        <p className="t-eyebrow mb-4" style={{ fontSize: '10px' }}>Who Are You?</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-gunmetal" style={{ borderRadius: '2px' }}>
          {submissionTypes.map((type, i) => (
            <label
              key={type.value}
              className={`flex items-start gap-3 p-4 cursor-pointer transition-colors ${
                form.submissionType === type.value ? 'bg-graphite' : 'hover:bg-graphite/50'
              } ${i % 2 === 0 ? 'border-b sm:border-b-0 sm:border-r border-gunmetal' : ''} ${
                i < submissionTypes.length - 2 ? 'border-b border-gunmetal' : ''
              }`}
            >
              <input
                type="radio"
                name="submissionType"
                value={type.value}
                checked={form.submissionType === type.value}
                onChange={handleChange}
                className="mt-0.5 accent-olive flex-shrink-0"
              />
              <div>
                <p className="t-h3 text-sm mb-0.5">{type.label}</p>
                <p className="t-body text-xs">{type.description}</p>
              </div>
            </label>
          ))}
        </div>
        {errors.submissionType && (
          <p className="t-body text-xs mt-2" style={{ color: '#ef4444' }}>{errors.submissionType}</p>
        )}
      </div>

      {/* Contact info */}
      <SectionDivider label="Contact Information" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
        <div>
          <FieldLabel htmlFor="fullName" required>Full Name</FieldLabel>
          <FieldInput id="fullName" name="fullName" value={form.fullName} onChange={handleChange} placeholder="Jane Smith" required />
          {errors.fullName && <p className="t-body text-xs mt-1" style={{ color: '#ef4444' }}>{errors.fullName}</p>}
        </div>
        <div>
          <FieldLabel htmlFor="email" required>Email Address</FieldLabel>
          <FieldInput id="email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="jane@example.com" required />
          {errors.email && <p className="t-body text-xs mt-1" style={{ color: '#ef4444' }}>{errors.email}</p>}
        </div>
        <div>
          <FieldLabel htmlFor="phone" required>Phone Number</FieldLabel>
          <FieldInput id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="(555) 000-0000" required />
          {errors.phone && <p className="t-body text-xs mt-1" style={{ color: '#ef4444' }}>{errors.phone}</p>}
        </div>
        <div>
          <FieldLabel htmlFor="preferredContact">Preferred Contact</FieldLabel>
          <FieldSelect id="preferredContact" name="preferredContact" value={form.preferredContact} onChange={handleChange}>
            <option value="">Select...</option>
            <option value="phone-call">Phone Call</option>
            <option value="text">Text Message</option>
            <option value="email">Email</option>
            <option value="no-preference">No Preference</option>
          </FieldSelect>
        </div>
      </div>

      {/* Property info (conditional) */}
      {form.submissionType && isPropertyType(form.submissionType) && (
        <>
          <SectionDivider label="Property Information" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
            <div className="sm:col-span-2">
              <FieldLabel htmlFor="propertyAddress" required={form.submissionType === 'property-owner'}>Property Address</FieldLabel>
              <FieldInput id="propertyAddress" name="propertyAddress" value={form.propertyAddress} onChange={handleChange} placeholder="123 Main Street" required={form.submissionType === 'property-owner'} />
              {errors.propertyAddress && <p className="t-body text-xs mt-1" style={{ color: '#ef4444' }}>{errors.propertyAddress}</p>}
            </div>
            <div>
              <FieldLabel htmlFor="propertyCity">City</FieldLabel>
              <FieldInput id="propertyCity" name="propertyCity" value={form.propertyCity} onChange={handleChange} placeholder="Philadelphia" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <FieldLabel htmlFor="propertyState">State</FieldLabel>
                <FieldInput id="propertyState" name="propertyState" value={form.propertyState} onChange={handleChange} placeholder="PA" />
              </div>
              <div>
                <FieldLabel htmlFor="propertyZip">ZIP</FieldLabel>
                <FieldInput id="propertyZip" name="propertyZip" value={form.propertyZip} onChange={handleChange} placeholder="19103" />
              </div>
            </div>
            <div>
              <FieldLabel htmlFor="propertyType">Property Type</FieldLabel>
              <FieldSelect id="propertyType" name="propertyType" value={form.propertyType} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="single-family">Single Family</option>
                <option value="multi-family">Multi-Family (2–4 units)</option>
                <option value="apartment">Apartment Building (5+ units)</option>
                <option value="commercial">Commercial</option>
                <option value="mixed-use">Mixed Use</option>
                <option value="vacant-land">Vacant Land / Lot</option>
                <option value="other">Other</option>
              </FieldSelect>
            </div>
            <div>
              <FieldLabel htmlFor="occupancyStatus">Occupancy Status</FieldLabel>
              <FieldSelect id="occupancyStatus" name="occupancyStatus" value={form.occupancyStatus} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="owner-occupied">Owner Occupied</option>
                <option value="tenant-occupied">Tenant Occupied</option>
                <option value="vacant">Vacant</option>
                <option value="partially-occupied">Partially Occupied</option>
              </FieldSelect>
            </div>
            <div>
              <FieldLabel htmlFor="condition">Current Condition</FieldLabel>
              <FieldSelect id="condition" name="condition" value={form.condition} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="excellent">Excellent — Move-In Ready</option>
                <option value="good">Good — Minor Updates Needed</option>
                <option value="fair">Fair — Moderate Repairs Needed</option>
                <option value="poor">Poor — Significant Repairs Needed</option>
                <option value="distressed">Distressed / Major Rehab</option>
              </FieldSelect>
            </div>
            <div>
              <FieldLabel htmlFor="timeline">Your Timeline</FieldLabel>
              <FieldSelect id="timeline" name="timeline" value={form.timeline} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="asap">ASAP / Urgent</option>
                <option value="1-30">Within 30 days</option>
                <option value="30-90">30–90 days</option>
                <option value="90-plus">90+ days / Flexible</option>
                <option value="just-exploring">Just Exploring</option>
              </FieldSelect>
            </div>
            <div>
              <FieldLabel htmlFor="isListed">Currently Listed?</FieldLabel>
              <FieldSelect id="isListed" name="isListed" value={form.isListed} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </FieldSelect>
            </div>
            <div>
              <FieldLabel htmlFor="codeViolations">Code Violations?</FieldLabel>
              <FieldSelect id="codeViolations" name="codeViolations" value={form.codeViolations} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="none-known">None Known</option>
                <option value="yes-open">Yes — Open</option>
                <option value="yes-resolved">Yes — Resolved</option>
                <option value="unsure">Unsure</option>
              </FieldSelect>
            </div>
            <div>
              <FieldLabel htmlFor="taxMortgageIssues">Tax / Mortgage Issues?</FieldLabel>
              <FieldSelect id="taxMortgageIssues" name="taxMortgageIssues" value={form.taxMortgageIssues} onChange={handleChange}>
                <option value="">Select...</option>
                <option value="none">None</option>
                <option value="tax-delinquent">Tax Delinquent</option>
                <option value="mortgage-behind">Behind on Mortgage</option>
                <option value="both">Both</option>
                <option value="other">Other / Prefer Not to Say</option>
              </FieldSelect>
            </div>
            <div>
              <FieldLabel htmlFor="foreclosureDate">Foreclosure / Sheriff Sale Date</FieldLabel>
              <FieldInput id="foreclosureDate" name="foreclosureDate" type="date" value={form.foreclosureDate} onChange={handleChange} />
            </div>
            <div>
              <FieldLabel htmlFor="desiredPrice">Desired / Asking Price</FieldLabel>
              <FieldInput id="desiredPrice" name="desiredPrice" value={form.desiredPrice} onChange={handleChange} placeholder="e.g., $175,000 or Open to Offers" />
            </div>
            <div className="sm:col-span-2">
              <FieldLabel htmlFor="knownRepairs">Known Repairs / Issues</FieldLabel>
              <FieldTextarea id="knownRepairs" name="knownRepairs" value={form.knownRepairs} onChange={handleChange} placeholder="Describe known repairs, deferred maintenance, or issues..." rows={3} />
            </div>
          </div>
        </>
      )}

      {/* Partner info (conditional) */}
      {form.submissionType && isPartnerType(form.submissionType) && form.submissionType !== 'property-owner' && (
        <>
          <SectionDivider label="Partner Information" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
            <div>
              <FieldLabel htmlFor="companyName">Company / Organization</FieldLabel>
              <FieldInput id="companyName" name="companyName" value={form.companyName} onChange={handleChange} placeholder="Your company or organization" />
            </div>
            <div>
              <FieldLabel htmlFor="roleService">Role / Service</FieldLabel>
              <FieldInput id="roleService" name="roleService" value={form.roleService} onChange={handleChange} placeholder="e.g., Hard Money Lender, General Contractor" />
            </div>
            <div>
              <FieldLabel htmlFor="marketsServed">Markets Served</FieldLabel>
              <FieldInput id="marketsServed" name="marketsServed" value={form.marketsServed} onChange={handleChange} placeholder="e.g., Philadelphia, South Jersey, Delaware" />
            </div>
            <div>
              <FieldLabel htmlFor="partnershipType">Partnership / Opportunities Sought</FieldLabel>
              <FieldInput id="partnershipType" name="partnershipType" value={form.partnershipType} onChange={handleChange} placeholder="e.g., Rehab projects, Private lending, Deal referrals" />
            </div>
            <div className="sm:col-span-2">
              <FieldLabel htmlFor="websiteLink">Website or Social Profile</FieldLabel>
              <FieldInput id="websiteLink" name="websiteLink" type="url" value={form.websiteLink} onChange={handleChange} placeholder="https://yourcompany.com" />
            </div>
          </div>
        </>
      )}

      {/* Situation */}
      <SectionDivider label="Situation" />
      <div className="flex flex-col gap-4 mb-2">
        <div>
          <FieldLabel htmlFor="reasonForReaching">Why are you reaching out?</FieldLabel>
          <FieldTextarea id="reasonForReaching" name="reasonForReaching" value={form.reasonForReaching} onChange={handleChange} placeholder="Tell us about your situation..." rows={4} />
        </div>
        <div>
          <FieldLabel htmlFor="desiredOutcome">What outcome are you looking for?</FieldLabel>
          <FieldTextarea id="desiredOutcome" name="desiredOutcome" value={form.desiredOutcome} onChange={handleChange} placeholder="What would a successful outcome look like?" rows={3} />
        </div>
        <div>
          <FieldLabel htmlFor="urgentInfo">Anything urgent we should know?</FieldLabel>
          <FieldTextarea id="urgentInfo" name="urgentInfo" value={form.urgentInfo} onChange={handleChange} placeholder="Upcoming deadlines, court dates, time-sensitive factors..." rows={3} />
        </div>
        <div>
          <FieldLabel htmlFor="referralSource">How did you hear about us?</FieldLabel>
          <FieldInput id="referralSource" name="referralSource" value={form.referralSource} onChange={handleChange} placeholder="Referral, search, social media, etc." />
        </div>
      </div>

      {/* Error */}
      {status === 'error' && (
        <div className="border-l-2 border-red-500 pl-4 py-2 mt-4">
          <p className="t-body text-sm" style={{ color: '#ef4444' }}>{errorMessage}</p>
        </div>
      )}

      {/* Submit */}
      <div className="border-t border-gunmetal pt-8 mt-8">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
        </button>
        <p className="t-body text-xs mt-4">
          Your information is kept confidential. We do not sell or share contact data.
        </p>
      </div>
    </form>
  )
}
