'use client'

import { useState } from 'react'

interface ContactFormState {
  fullName: string
  email: string
  phone: string
  relationshipType: string
  message: string
  referralSource: string
  _hp: string
}

const initial: ContactFormState = {
  fullName: '',
  email: '',
  phone: '',
  relationshipType: '',
  message: '',
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

export default function ContactForm() {
  const [form, setForm] = useState<ContactFormState>(initial)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormState, string>>>({})

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof ContactFormState]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const e: Partial<Record<keyof ContactFormState, string>> = {}
    if (!form.fullName.trim()) e.fullName = 'Required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (form.phone.replace(/\D/g, '').length < 10) e.phone = 'Valid phone required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('submitting')
    setErrorMessage('')

    try {
      const submissionTypeMap: Record<string, string> = {
        'property-owner': 'property-owner',
        'agent': 'agent',
        'wholesaler': 'wholesaler',
        'contractor': 'contractor',
        'lender': 'lender',
        'investor': 'investor',
        'other': 'other',
      }

      const res = await fetch('/api/outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionType: submissionTypeMap[form.relationshipType] || 'other',
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          reasonForReaching: form.message,
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
        <h3 className="t-h3 text-lg mb-3">Message received.</h3>
        <p className="t-body text-sm max-w-sm mx-auto mb-6">
          We review all inquiries and respond to those that are a fit.
          Expect a response within one business day.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="t-caption hover:text-off-white transition-colors underline underline-offset-4"
        >
          Send another message
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Field label="Full Name *" error={errors.fullName}>
          <input className="form-field" name="fullName" type="text" value={form.fullName} onChange={set} placeholder="Your name" />
        </Field>
        <Field label="Email Address *" error={errors.email}>
          <input className="form-field" name="email" type="email" value={form.email} onChange={set} placeholder="your@email.com" />
        </Field>
        <Field label="Phone Number *" error={errors.phone}>
          <input className="form-field" name="phone" type="tel" value={form.phone} onChange={set} placeholder="(555) 000-0000" />
        </Field>
        <Field label="Relationship Type">
          <select className="form-field" name="relationshipType" value={form.relationshipType} onChange={set}>
            <option value="">Select...</option>
            <option value="property-owner">Property Owner</option>
            <option value="agent">Agent / Realtor</option>
            <option value="wholesaler">Wholesaler</option>
            <option value="lender">Lender / Capital</option>
            <option value="investor">Investor</option>
            <option value="contractor">Contractor</option>
            <option value="other">Other</option>
          </select>
        </Field>
      </div>

      <div className="flex flex-col gap-4 mb-8">
        <Field label="Message">
          <textarea
            className="form-field resize-y"
            name="message"
            value={form.message}
            onChange={set}
            rows={5}
            placeholder="What would you like to discuss?"
          />
        </Field>
        <Field label="How did you hear about us?">
          <input
            className="form-field"
            name="referralSource"
            type="text"
            value={form.referralSource}
            onChange={set}
            placeholder="Referral, search, direct mail, social, etc."
          />
        </Field>
      </div>

      {/* Error */}
      {status === 'error' && (
        <div className="border border-gunmetal p-4 mb-6" style={{ borderRadius: '2px', borderLeftColor: '#C0392B', borderLeftWidth: '3px' }}>
          <p className="t-body text-sm" style={{ color: '#C0392B' }}>{errorMessage}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </button>
        <p className="t-caption">
          Confidential. We do not sell or share contact data.
        </p>
      </div>
    </form>
  )
}
