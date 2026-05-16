'use client'

import { useState } from 'react'

interface InvestorFormState {
  fullName: string
  email: string
  phone: string
  companyName: string
  roleService: string
  partnershipType: string
  marketsServed: string
  reasonForReaching: string
  referralSource: string
  _hp: string
}

const initial: InvestorFormState = {
  fullName: '',
  email: '',
  phone: '',
  companyName: '',
  roleService: '',
  partnershipType: '',
  marketsServed: '',
  reasonForReaching: '',
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

export default function InvestorForm() {
  const [form, setForm] = useState<InvestorFormState>(initial)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [errors, setErrors] = useState<Partial<Record<keyof InvestorFormState, string>>>({})

  const set = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof InvestorFormState]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const e: Partial<Record<keyof InvestorFormState, string>> = {}
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
      const submissionType =
        form.roleService.toLowerCase().includes('lend') ||
        form.partnershipType === 'hard-money' ||
        form.partnershipType === 'private-lending'
          ? 'lender'
          : 'investor'

      const res = await fetch('/api/outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionType,
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          companyName: form.companyName,
          roleService: form.roleService,
          partnershipType: form.partnershipType,
          marketsServed: form.marketsServed,
          reasonForReaching: form.reasonForReaching,
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
        <h3 className="t-h3 text-lg mb-3">Inquiry received.</h3>
        <p className="t-body text-sm max-w-sm mx-auto mb-6">
          We review all capital inquiries carefully. If there is a fit, we will be in touch
          with specifics.
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
          Submit another inquiry
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

      {/* Contact */}
      <div className="mb-8">
        <p className="t-eyebrow mb-6">Contact Information</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Full Name *" error={errors.fullName}>
            <input className="form-field" name="fullName" type="text" value={form.fullName} onChange={set} placeholder="John Smith" />
          </Field>
          <Field label="Email Address *" error={errors.email}>
            <input className="form-field" name="email" type="email" value={form.email} onChange={set} placeholder="john@firm.com" />
          </Field>
          <Field label="Phone Number *" error={errors.phone}>
            <input className="form-field" name="phone" type="tel" value={form.phone} onChange={set} placeholder="(555) 000-0000" />
          </Field>
          <Field label="Company / Organization">
            <input className="form-field" name="companyName" type="text" value={form.companyName} onChange={set} placeholder="Your firm or organization" />
          </Field>
        </div>
      </div>

      <div className="thin-rule mb-8" />

      {/* Capital profile */}
      <div className="mb-8">
        <p className="t-eyebrow mb-6">Capital Profile</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Role / Capacity">
            <select className="form-field" name="roleService" value={form.roleService} onChange={set}>
              <option value="">Select...</option>
              <option value="private-lender">Private Lender</option>
              <option value="hard-money">Hard Money Lender</option>
              <option value="equity-partner">Equity Partner</option>
              <option value="jv-investor">JV Investor</option>
              <option value="institutional-capital">Institutional Capital</option>
              <option value="family-office">Family Office</option>
              <option value="other">Other</option>
            </select>
          </Field>
          <Field label="Partnership Type">
            <select className="form-field" name="partnershipType" value={form.partnershipType} onChange={set}>
              <option value="">Select...</option>
              <option value="private-lending">Private / Hard Money Lending</option>
              <option value="equity-coinvest">Equity Co-Investment</option>
              <option value="jv">Joint Venture</option>
              <option value="note-purchasing">Note Purchasing</option>
              <option value="portfolio-acquisition">Portfolio Acquisition</option>
              <option value="open">Open — Let's discuss</option>
            </select>
          </Field>
          <div className="sm:col-span-2">
            <Field label="Geographic Focus">
              <input
                className="form-field"
                name="marketsServed"
                type="text"
                value={form.marketsServed}
                onChange={set}
                placeholder="e.g., Philadelphia Metro, Mid-Atlantic, National"
              />
            </Field>
          </div>
        </div>
      </div>

      <div className="thin-rule mb-8" />

      {/* Context */}
      <div className="mb-8">
        <p className="t-eyebrow mb-6">Context</p>
        <div className="flex flex-col gap-4">
          <Field label="What are you looking to accomplish?">
            <textarea
              className="form-field resize-y"
              name="reasonForReaching"
              value={form.reasonForReaching}
              onChange={set}
              rows={4}
              placeholder="Describe your capital deployment objectives, deal flow expectations, return targets, or any other relevant context."
            />
          </Field>
          <Field label="How did you hear about us?">
            <input
              className="form-field"
              name="referralSource"
              type="text"
              value={form.referralSource}
              onChange={set}
              placeholder="Referral, search, event, direct, etc."
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

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {status === 'submitting' ? 'Sending...' : 'Submit Inquiry'}
        </button>
        <p className="t-caption">
          Confidential. We do not share inquiry data with third parties.
        </p>
      </div>
    </form>
  )
}
