'use client'

import { useState } from 'react'

interface SellerFormState {
  fullName: string
  email: string
  phone: string
  propertyAddress: string
  propertyCity: string
  propertyState: string
  propertyZip: string
  propertyType: string
  condition: string
  occupancyStatus: string
  timeline: string
  situation: string
  referralSource: string
  _hp: string
}

const initial: SellerFormState = {
  fullName: '',
  email: '',
  phone: '',
  propertyAddress: '',
  propertyCity: '',
  propertyState: '',
  propertyZip: '',
  propertyType: '',
  condition: '',
  occupancyStatus: '',
  timeline: '',
  situation: '',
  referralSource: '',
  _hp: '',
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="form-label">{label}</label>
      {children}
      {error && <p className="form-error">{error}</p>}
    </div>
  )
}

export default function SellerForm() {
  const [form, setForm] = useState<SellerFormState>(initial)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [errors, setErrors] = useState<Partial<Record<keyof SellerFormState, string>>>({})

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof SellerFormState]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const e: Partial<Record<keyof SellerFormState, string>> = {}
    if (!form.fullName.trim()) e.fullName = 'Required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (form.phone.replace(/\D/g, '').length < 10) e.phone = 'Valid phone required'
    if (!form.propertyAddress.trim()) e.propertyAddress = 'Property address required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionType: 'property-owner',
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          propertyAddress: form.propertyAddress,
          propertyCity: form.propertyCity,
          propertyState: form.propertyState,
          propertyZip: form.propertyZip,
          propertyType: form.propertyType,
          condition: form.condition,
          occupancyStatus: form.occupancyStatus,
          timeline: form.timeline,
          reasonForReaching: form.situation,
          referralSource: form.referralSource,
          _hp: form._hp,
        }),
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
        err instanceof Error ? err.message : 'An error occurred. Please try again.'
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-gunmetal p-12 text-center" style={{ borderRadius: '2px' }}>
        <div className="w-8 h-0.5 bg-olive mx-auto mb-8" />
        <h3 className="t-h3 text-lg mb-3">Submission received.</h3>
        <p className="t-body text-sm max-w-sm mx-auto mb-6">
          Our team reviews every submission. We will follow up within one business day.
        </p>
        <p className="t-caption">
          Direct contact:{' '}
          <a href="mailto:contact@easternlandoperations.com" className="text-off-white hover:text-olive transition-colors">
            contact@easternlandoperations.com
          </a>
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-8 t-caption hover:text-off-white transition-colors underline underline-offset-4"
        >
          Submit another property
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} noValidate>
      {/* Honeypot */}
      <div aria-hidden="true" style={{ display: 'none' }}>
        <input name="_hp" type="text" tabIndex={-1} autoComplete="off" value={form._hp} onChange={set} />
      </div>

      {/* Section: Contact */}
      <div className="mb-8">
        <p className="t-eyebrow mb-6">Contact Information</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name *" error={errors.fullName}>
            <input className="form-field" name="fullName" type="text" value={form.fullName} onChange={set} placeholder="Jane Smith" />
          </Field>
          <Field label="Email Address *" error={errors.email}>
            <input className="form-field" name="email" type="email" value={form.email} onChange={set} placeholder="jane@example.com" />
          </Field>
          <Field label="Phone Number *" error={errors.phone}>
            <input className="form-field" name="phone" type="tel" value={form.phone} onChange={set} placeholder="(555) 000-0000" />
          </Field>
          <Field label="Relationship to Property">
            <select className="form-field" name="occupancyStatus" value={form.occupancyStatus} onChange={set}>
              <option value="">Select...</option>
              <option value="owner-occupied">Owner — I live there</option>
              <option value="landlord">Owner — Rental property</option>
              <option value="inherited">Inherited — I'm an heir</option>
              <option value="executor">Executor / Estate</option>
              <option value="agent">Agent / Representative</option>
              <option value="other">Other</option>
            </select>
          </Field>
        </div>
      </div>

      {/* Divider */}
      <div className="thin-rule mb-8" />

      {/* Section: Property */}
      <div className="mb-8">
        <p className="t-eyebrow mb-6">Property Information</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <Field label="Property Address *" error={errors.propertyAddress}>
              <input className="form-field" name="propertyAddress" type="text" value={form.propertyAddress} onChange={set} placeholder="123 Main Street" />
            </Field>
          </div>
          <Field label="City">
            <input className="form-field" name="propertyCity" type="text" value={form.propertyCity} onChange={set} placeholder="Philadelphia" />
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="State">
              <input className="form-field" name="propertyState" type="text" value={form.propertyState} onChange={set} placeholder="PA" />
            </Field>
            <Field label="ZIP">
              <input className="form-field" name="propertyZip" type="text" value={form.propertyZip} onChange={set} placeholder="19103" />
            </Field>
          </div>
          <Field label="Property Type">
            <select className="form-field" name="propertyType" value={form.propertyType} onChange={set}>
              <option value="">Select...</option>
              <option value="single-family">Single Family</option>
              <option value="multi-family">Multi-Family (2–4 units)</option>
              <option value="apartment">Apartment Building (5+ units)</option>
              <option value="commercial">Commercial</option>
              <option value="mixed-use">Mixed Use</option>
              <option value="vacant-land">Vacant Land / Lot</option>
              <option value="other">Other</option>
            </select>
          </Field>
          <Field label="Current Condition">
            <select className="form-field" name="condition" value={form.condition} onChange={set}>
              <option value="">Select...</option>
              <option value="excellent">Excellent — Move-in ready</option>
              <option value="good">Good — Minor updates needed</option>
              <option value="fair">Fair — Moderate repairs needed</option>
              <option value="poor">Poor — Significant repairs needed</option>
              <option value="distressed">Distressed — Major rehab</option>
            </select>
          </Field>
          <Field label="Your Timeline">
            <select className="form-field" name="timeline" value={form.timeline} onChange={set}>
              <option value="">Select...</option>
              <option value="asap">ASAP / Urgent</option>
              <option value="1-30">Within 30 days</option>
              <option value="30-90">30–90 days</option>
              <option value="90-plus">90+ days / Flexible</option>
              <option value="exploring">Just exploring</option>
            </select>
          </Field>
        </div>
      </div>

      {/* Divider */}
      <div className="thin-rule mb-8" />

      {/* Section: Situation */}
      <div className="mb-8">
        <p className="t-eyebrow mb-6">Your Situation</p>
        <div className="flex flex-col gap-4">
          <Field label="Describe your situation">
            <textarea
              className="form-field resize-y"
              name="situation"
              value={form.situation}
              onChange={set}
              rows={4}
              placeholder="Tell us what's going on — condition, circumstances, what you're looking for. The more context you provide, the faster we can respond."
            />
          </Field>
          <Field label="How did you hear about us?">
            <input
              className="form-field"
              name="referralSource"
              type="text"
              value={form.referralSource}
              onChange={set}
              placeholder="Referral, search, social, direct mail, etc."
            />
          </Field>
        </div>
      </div>

      {/* Error */}
      {status === 'error' && (
        <div className="border border-gunmetal p-4 mb-6" style={{ borderRadius: '2px', borderLeftColor: '#C0392B', borderLeftWidth: '3px' }}>
          <p className="t-body text-sm" style={{ color: '#C0392B' }}>{errorMessage}</p>
        </div>
      )}

      {/* Submit */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending...' : 'Submit Property'}
        </button>
        <p className="t-caption">
          Confidential. We do not sell or share contact data.
        </p>
      </div>
    </form>
  )
}
