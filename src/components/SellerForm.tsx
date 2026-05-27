'use client'

import { useMemo, useState } from 'react'
import FormField from './forms/FormField'
import {
  contactMethodOptions,
  decisionTimelineOptions,
  occupancyOptions,
  sellerFormSchema,
  sellerOutcomeOptions,
  sellerPropertyTypes,
  sellerSituations,
  type SellerFormSubmission,
} from '../lib/outreachSchemas'

type SellerFormState = SellerFormSubmission & {
  photos: File[]
}

const initial: SellerFormState = {
  submissionType: 'property-owner',
  fullName: '',
  phone: '',
  email: '',
  propertyAddress: '',
  propertyOwnership: '',
  otherDecisionMakers: '',
  occupancyStatus: 'Unknown',
  propertyType: 'Single-family',
  situation: 'Just exploring options',
  knownRepairs: '',
  timeline: 'Just exploring',
  desiredOutcome: 'Help understanding options',
  taxMortgageIssues: '',
  preferredContact: 'Phone',
  bestTimeToContact: '',
  notes: '',
  referralSource: '',
  _hp: '',
  photos: [],
}

type SellerErrors = Partial<Record<keyof SellerFormState, string>>

export default function SellerForm() {
  const [form, setForm] = useState<SellerFormState>(initial)
  const [errors, setErrors] = useState<SellerErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const selectedFilesText = useMemo(() => {
    if (form.photos.length === 0) return 'No files selected'
    return `${form.photos.length} file${form.photos.length === 1 ? '' : 's'} selected`
  }, [form.photos])

  const updateField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof SellerFormState]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const updateFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 5)
    setForm((prev) => ({ ...prev, photos: files }))
    if (errors.photos) {
      setErrors((prev) => ({ ...prev, photos: '' }))
    }
  }

  const validate = () => {
    const payload = { ...form }
    delete (payload as Partial<SellerFormState>).photos

    const parsed = sellerFormSchema.safeParse(payload)

    if (parsed.success) {
      setErrors({})
      return true
    }

    const nextErrors: SellerErrors = {}
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof SellerFormState
      nextErrors[field] = issue.message
    }

    if (form.photos.some((file) => file.size > 10 * 1024 * 1024)) {
      nextErrors.photos = 'Each file must be 10MB or less'
    }

    setErrors(nextErrors)
    return false
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')
    setErrorMessage('')

    try {
      const body = new FormData()
      body.set('submissionType', form.submissionType)
      body.set('fullName', form.fullName)
      body.set('phone', form.phone)
      body.set('email', form.email)
      body.set('propertyAddress', form.propertyAddress)
      body.set('propertyOwnership', form.propertyOwnership)
      body.set('otherDecisionMakers', form.otherDecisionMakers)
      body.set('occupancyStatus', form.occupancyStatus)
      body.set('propertyType', form.propertyType)
      body.set('situation', form.situation)
      body.set('knownRepairs', form.knownRepairs)
      body.set('timeline', form.timeline)
      body.set('desiredOutcome', form.desiredOutcome)
      body.set('taxMortgageIssues', form.taxMortgageIssues)
      body.set('preferredContact', form.preferredContact)
      body.set('bestTimeToContact', form.bestTimeToContact)
      body.set('notes', form.notes)
      body.set('referralSource', form.referralSource)
      body.set('_hp', form._hp)

      form.photos.forEach((file) => body.append('photos', file))

      const res = await fetch('/api/outreach', {
        method: 'POST',
        body,
      })

      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || 'Submission failed')
      }

      setStatus('success')
      setForm(initial)
    } catch (err) {
      setStatus('error')
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'An error occurred while sending your information. Please try again.'
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-gunmetal p-12 text-center" style={{ borderRadius: '2px' }}>
        <div className="w-8 h-0.5 bg-olive mx-auto mb-8" />
        <h3 className="t-h3 text-lg mb-3">Seller intake received.</h3>
        <p className="t-body text-sm max-w-md mx-auto mb-6">
          Thank you. Eastern Land Operations received your property information. We&apos;ll review
          the details and follow up respectfully with possible next steps or options.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 t-caption hover:text-off-white transition-colors underline underline-offset-4"
        >
          Submit another property
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-8">
      <div aria-hidden="true" style={{ display: 'none' }}>
        <input
          name="_hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form._hp}
          onChange={updateField}
        />
      </div>

      <div>
        <p className="t-eyebrow mb-6">Tell Us About Your Property</p>
        <p className="t-body text-sm mb-8" style={{ lineHeight: '1.75' }}>
          Share the basics, your timeline, and anything you think matters. We review each
          submission with care and respond with options that fit the situation.
        </p>
      </div>

      <div className="border border-gunmetal p-6 sm:p-8" style={{ borderRadius: '2px' }}>
        <p className="t-eyebrow mb-6">Contact Information</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Full name" required error={errors.fullName}>
            <input className="form-field" name="fullName" value={form.fullName} onChange={updateField} />
          </FormField>
          <FormField label="Phone number" required error={errors.phone}>
            <input className="form-field" name="phone" type="tel" value={form.phone} onChange={updateField} />
          </FormField>
          <FormField label="Email" required error={errors.email}>
            <input className="form-field" name="email" type="email" value={form.email} onChange={updateField} />
          </FormField>
          <FormField label="Preferred contact method" required error={errors.preferredContact}>
            <select className="form-field" name="preferredContact" value={form.preferredContact} onChange={updateField}>
              {contactMethodOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>
          <div className="sm:col-span-2">
            <FormField label="Best time to contact" error={errors.bestTimeToContact}>
              <input
                className="form-field"
                name="bestTimeToContact"
                value={form.bestTimeToContact}
                onChange={updateField}
                placeholder="Weekday mornings, after 5 PM, weekends, etc."
              />
            </FormField>
          </div>
        </div>
      </div>

      <div className="border border-gunmetal p-6 sm:p-8" style={{ borderRadius: '2px' }}>
        <p className="t-eyebrow mb-6">Property Details</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <FormField label="Property address" required error={errors.propertyAddress}>
              <input
                className="form-field"
                name="propertyAddress"
                value={form.propertyAddress}
                onChange={updateField}
                placeholder="Street address, city, and zip if available"
              />
            </FormField>
          </div>
          <FormField
            label="Do you own the property?"
            required
            error={errors.propertyOwnership}
            helper="If not, tell us your role so we know how to follow up."
          >
            <input
              className="form-field"
              name="propertyOwnership"
              value={form.propertyOwnership}
              onChange={updateField}
              placeholder="Yes, no, inherited, representative, etc."
            />
          </FormField>
          <FormField
            label="Are there other decision-makers involved?"
            required
            error={errors.otherDecisionMakers}
          >
            <input
              className="form-field"
              name="otherDecisionMakers"
              value={form.otherDecisionMakers}
              onChange={updateField}
              placeholder="No, spouse, siblings, business partners, executor, etc."
            />
          </FormField>
          <FormField label="Occupancy" required error={errors.occupancyStatus}>
            <select className="form-field" name="occupancyStatus" value={form.occupancyStatus} onChange={updateField}>
              {occupancyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Property type" required error={errors.propertyType}>
            <select className="form-field" name="propertyType" value={form.propertyType} onChange={updateField}>
              {sellerPropertyTypes.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="What best describes the situation?" required error={errors.situation}>
            <select className="form-field" name="situation" value={form.situation} onChange={updateField}>
              {sellerSituations.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="How soon are you looking to make a decision?" required error={errors.timeline}>
            <select className="form-field" name="timeline" value={form.timeline} onChange={updateField}>
              {decisionTimelineOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>
          <div className="sm:col-span-2">
            <FormField label="What outcome would be most helpful?" required error={errors.desiredOutcome}>
              <select className="form-field" name="desiredOutcome" value={form.desiredOutcome} onChange={updateField}>
                {sellerOutcomeOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </FormField>
          </div>
        </div>
      </div>

      <div className="border border-gunmetal p-6 sm:p-8" style={{ borderRadius: '2px' }}>
        <p className="t-eyebrow mb-6">Condition And Context</p>
        <div className="space-y-4">
          <FormField
            label="What repairs or issues are you aware of?"
            error={errors.knownRepairs}
            helper="Roof, plumbing, electrical, structural work, cleanout, tenant issues, or anything else you want us to know."
          >
            <textarea
              className="form-field resize-y"
              name="knownRepairs"
              value={form.knownRepairs}
              onChange={updateField}
              rows={4}
            />
          </FormField>
          <FormField
            label="Are there any mortgages, taxes, liens, or violations we should know about?"
            error={errors.taxMortgageIssues}
          >
            <textarea
              className="form-field resize-y"
              name="taxMortgageIssues"
              value={form.taxMortgageIssues}
              onChange={updateField}
              rows={3}
            />
          </FormField>
          <FormField
            label="Upload photos if possible"
            error={errors.photos}
            helper="Optional. You can upload up to 5 files. Images or PDFs work best."
          >
            <div className="space-y-3">
              <input
                className="form-field file:mr-4 file:border-0 file:bg-off-white file:px-3 file:py-2 file:text-xs file:font-medium file:uppercase file:tracking-[0.12em] file:text-matte-black"
                name="photos"
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                onChange={updateFiles}
              />
              <p className="t-caption">{selectedFilesText}</p>
            </div>
          </FormField>
          <FormField
            label="Tell us anything else about the property or situation"
            error={errors.notes}
          >
            <textarea
              className="form-field resize-y"
              name="notes"
              value={form.notes}
              onChange={updateField}
              rows={5}
            />
          </FormField>
        </div>
      </div>

      {status === 'error' ? (
        <div
          className="border border-gunmetal p-4"
          style={{ borderRadius: '2px', borderLeftColor: '#C0392B', borderLeftWidth: '3px' }}
        >
          <p className="t-body text-sm" style={{ color: '#C0392B' }}>
            {errorMessage}
          </p>
        </div>
      ) : null}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending...' : 'Submit Property Intake'}
        </button>
        <p className="t-caption">
          Required fields are marked. We only use this information to review your situation and
          follow up.
        </p>
      </div>
    </form>
  )
}
