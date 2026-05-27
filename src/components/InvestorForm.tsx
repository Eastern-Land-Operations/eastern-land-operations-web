'use client'

import { useState } from 'react'
import FormField from '@/components/forms/FormField'
import {
  buyerAlertMethodOptions,
  buyerFormSchema,
  buyerFundingOptions,
  buyerPropertyTypes,
  buyerRoleOptions,
  rehabToleranceOptions,
  type BuyerFormSubmission,
} from '@/lib/outreachSchemas'

type BuyerFormState = BuyerFormSubmission
type BuyerErrors = Partial<Record<keyof BuyerFormState, string>>

const initial: BuyerFormState = {
  submissionType: 'investor',
  fullName: '',
  companyName: '',
  phone: '',
  email: '',
  fundingType: 'Cash buyer',
  propertyTypesWanted: [],
  preferredAreas: '',
  typicalPurchasePriceRange: '',
  maximumPurchasePrice: '',
  minimumDesiredReturn: '',
  buyerRole: 'Buy-and-hold buyer',
  rehabTolerance: 'Moderate rehab',
  closeSpeed: '',
  purchasesLast12Months: '',
  proofOfFundsAvailable: '',
  preferredDealAlertMethod: 'Email',
  vipAlerts: 'Yes',
  notes: '',
  referralSource: '',
  _hp: '',
}

export default function InvestorForm() {
  const [form, setForm] = useState<BuyerFormState>(initial)
  const [errors, setErrors] = useState<BuyerErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const updateField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof BuyerFormState]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const togglePropertyType = (value: string) => {
    setForm((prev) => {
      const exists = prev.propertyTypesWanted.includes(value)
      return {
        ...prev,
        propertyTypesWanted: exists
          ? prev.propertyTypesWanted.filter((item) => item !== value)
          : [...prev.propertyTypesWanted, value],
      }
    })
    if (errors.propertyTypesWanted) {
      setErrors((prev) => ({ ...prev, propertyTypesWanted: '' }))
    }
  }

  const validate = () => {
    const parsed = buyerFormSchema.safeParse(form)

    if (parsed.success) {
      setErrors({})
      return true
    }

    const nextErrors: BuyerErrors = {}
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof BuyerFormState
      nextErrors[field] = issue.message
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
      const res = await fetch('/api/outreach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
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
          : 'An error occurred while sending your buyer profile. Please try again.'
      )
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-gunmetal p-12 text-center" style={{ borderRadius: '2px' }}>
        <div className="w-8 h-0.5 bg-olive mx-auto mb-8" />
        <h3 className="t-h3 text-lg mb-3">Buyer profile received.</h3>
        <p className="t-body text-sm max-w-md mx-auto mb-6">
          Thank you. Your buyer profile has been received. Eastern Land Operations will review
          your buy box and contact you when opportunities match your criteria.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 t-caption hover:text-off-white transition-colors underline underline-offset-4"
        >
          Submit another buyer profile
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
        <p className="t-eyebrow mb-6">Join the ELO Buyer Network</p>
        <p className="t-body text-sm mb-8" style={{ lineHeight: '1.75' }}>
          Tell us how you buy, what you buy, and how quickly you can move. We use this to match
          real opportunities with real operators, investors, and capital partners.
        </p>
      </div>

      <div className="border border-gunmetal p-6 sm:p-8" style={{ borderRadius: '2px' }}>
        <p className="t-eyebrow mb-6">Buyer Profile</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="Full name" required error={errors.fullName}>
            <input className="form-field" name="fullName" value={form.fullName} onChange={updateField} />
          </FormField>
          <FormField label="Company name" error={errors.companyName}>
            <input className="form-field" name="companyName" value={form.companyName} onChange={updateField} />
          </FormField>
          <FormField label="Phone number" required error={errors.phone}>
            <input className="form-field" name="phone" type="tel" value={form.phone} onChange={updateField} />
          </FormField>
          <FormField label="Email" required error={errors.email}>
            <input className="form-field" name="email" type="email" value={form.email} onChange={updateField} />
          </FormField>
          <FormField label="Buyer type" required error={errors.fundingType}>
            <select className="form-field" name="fundingType" value={form.fundingType} onChange={updateField}>
              {buyerFundingOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Buyer role" required error={errors.buyerRole}>
            <select className="form-field" name="buyerRole" value={form.buyerRole} onChange={updateField}>
              {buyerRoleOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>
        </div>
      </div>

      <div className="border border-gunmetal p-6 sm:p-8" style={{ borderRadius: '2px' }}>
        <p className="t-eyebrow mb-6">Buy Box</p>
        <div className="space-y-6">
          <FormField
            label="What property types are you looking for?"
            required
            error={errors.propertyTypesWanted}
            helper="Choose every category you actively want to review."
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {buyerPropertyTypes.map((option) => {
                const checked = form.propertyTypesWanted.includes(option)
                return (
                  <label
                    key={option}
                    className={`border px-4 py-3 text-sm transition-colors cursor-pointer ${
                      checked
                        ? 'border-off-white text-off-white bg-graphite'
                        : 'border-gunmetal text-slate hover:border-slate'
                    }`}
                    style={{ borderRadius: '2px' }}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={checked}
                      onChange={() => togglePropertyType(option)}
                    />
                    {option}
                  </label>
                )
              })}
            </div>
          </FormField>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <FormField label="Preferred areas / zip codes / neighborhoods" required error={errors.preferredAreas}>
                <input
                  className="form-field"
                  name="preferredAreas"
                  value={form.preferredAreas}
                  onChange={updateField}
                  placeholder="Germantown, Mt. Airy, Logan, 19144, 19141, etc."
                />
              </FormField>
            </div>
            <FormField label="Typical purchase price range" error={errors.typicalPurchasePriceRange}>
              <input
                className="form-field"
                name="typicalPurchasePriceRange"
                value={form.typicalPurchasePriceRange}
                onChange={updateField}
                placeholder="$80,000 to $180,000"
              />
            </FormField>
            <FormField label="Maximum purchase price" error={errors.maximumPurchasePrice}>
              <input
                className="form-field"
                name="maximumPurchasePrice"
                value={form.maximumPurchasePrice}
                onChange={updateField}
                placeholder="$350,000"
              />
            </FormField>
            <FormField label="Minimum desired profit or return" error={errors.minimumDesiredReturn}>
              <input
                className="form-field"
                name="minimumDesiredReturn"
                value={form.minimumDesiredReturn}
                onChange={updateField}
                placeholder="15% IRR, $40K net, 8% cash-on-cash, etc."
              />
            </FormField>
            <FormField label="Rehab tolerance" required error={errors.rehabTolerance}>
              <select className="form-field" name="rehabTolerance" value={form.rehabTolerance} onChange={updateField}>
                {rehabToleranceOptions.map((option) => (
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
        <p className="t-eyebrow mb-6">Execution Capacity</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormField label="How quickly can you close?" error={errors.closeSpeed}>
            <input
              className="form-field"
              name="closeSpeed"
              value={form.closeSpeed}
              onChange={updateField}
              placeholder="7 days, 14 days, 30 days, depends on financing, etc."
            />
          </FormField>
          <FormField label="How many properties have you purchased in the last 12 months?" error={errors.purchasesLast12Months}>
            <input
              className="form-field"
              name="purchasesLast12Months"
              value={form.purchasesLast12Months}
              onChange={updateField}
              placeholder="0, 3, 12+, etc."
            />
          </FormField>
          <div className="sm:col-span-2">
            <FormField label="Do you have proof of funds or lender letter available?" required error={errors.proofOfFundsAvailable}>
              <input
                className="form-field"
                name="proofOfFundsAvailable"
                value={form.proofOfFundsAvailable}
                onChange={updateField}
                placeholder="Yes, proof of funds ready / lender letter available / can provide on request"
              />
            </FormField>
          </div>
          <FormField label="Preferred deal alert method" required error={errors.preferredDealAlertMethod}>
            <select
              className="form-field"
              name="preferredDealAlertMethod"
              value={form.preferredDealAlertMethod}
              onChange={updateField}
            >
              {buyerAlertMethodOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>
          <FormField label="Would you like VIP / first-look alerts?" required error={errors.vipAlerts}>
            <select className="form-field" name="vipAlerts" value={form.vipAlerts} onChange={updateField}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </FormField>
          <div className="sm:col-span-2">
            <FormField label="Notes about your buy box" error={errors.notes}>
              <textarea className="form-field resize-y" name="notes" value={form.notes} onChange={updateField} rows={5} />
            </FormField>
          </div>
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
          {status === 'submitting' ? 'Sending...' : 'Submit Buyer Profile'}
        </button>
        <p className="t-caption">
          Required fields are marked. We use this profile to match opportunities more accurately.
        </p>
      </div>
    </form>
  )
}
