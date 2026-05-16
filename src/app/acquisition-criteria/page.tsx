import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Acquisition Criteria',
  description:
    'What Eastern Land Operations looks for in an acquisition. Geography, property type, condition, situation, and deal structure parameters.',
}

const criteria = [
  {
    category: 'Geography',
    primary: 'Greater Philadelphia metropolitan area',
    secondary: 'South Jersey, Delaware Valley, surrounding corridors',
    note: 'We expand into adjacent markets based on deal quality and existing network depth.',
  },
  {
    category: 'Property Types',
    primary: 'Residential — single family, multi-family (2–4 units)',
    secondary: 'Apartment buildings (5+ units), mixed-use, vacant land and lots',
    note: 'Commercial considered case-by-case based on redevelopment path clarity.',
  },
  {
    category: 'Condition',
    primary: 'All conditions — distressed, non-compliant, and fully occupied',
    secondary: 'Code violations, deferred maintenance, structural issues — all considered',
    note: 'Condition is a pricing factor, not a disqualifier. We do not require repairs or cleanup.',
  },
  {
    category: 'Seller Situation',
    primary: 'Motivated sellers across any circumstance',
    secondary: 'Pre-foreclosure, inherited, tax delinquent, tired landlord, estate, divorce',
    note: 'Situation complexity is welcome. We evaluate the full picture — liens, title, tenants — before making an offer.',
  },
  {
    category: 'Price Range',
    primary: 'Acquisition capacity scales with deal quality',
    secondary: 'Single acquisitions to portfolio transactions',
    note: 'We do not publish a maximum. The right deal at the right price will advance.',
  },
  {
    category: 'Timeline',
    primary: 'ASAP / urgent through 90+ days',
    secondary: 'We move on your timeline within reason',
    note: 'Speed is an operational asset when needed. We can also work within extended timelines.',
  },
]

const dealStructures = [
  { structure: 'Cash Purchase', desc: 'Direct as-is cash acquisition. Standard close. Clean and certain.' },
  { structure: 'Owner Financing', desc: 'Seller carries a note. Structured where it benefits both parties.' },
  { structure: 'Subject-To', desc: 'Existing financing stays in place. Used where appropriate for seller situation.' },
  { structure: 'Installment Sale', desc: 'Purchase price paid over time. Useful for estate and tax situations.' },
  { structure: 'Lease-Option', desc: 'Control of the asset with purchase right. Used for specific repositioning strategies.' },
  { structure: 'Creative Structure', desc: 'If none of the above fit, we evaluate what does. One tool does not fit all deals.' },
]

const disqualifiers = [
  'Properties outside defined geographic corridors without referral context',
  'New construction land requiring full entitlement from scratch (not our lane)',
  'Retail-priced properties with no distress factor or seller motivation',
  'Properties where the seller is unwilling to provide basic access or information',
]

export default function AcquisitionCriteriaPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24 bg-matte-black border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="max-w-2xl">
            <p className="t-eyebrow mb-8">Acquisition Criteria</p>
            <div className="section-rule" />
            <h1 className="t-h1 mb-8" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
              We know what we want.
              <br />
              And what we don't.
            </h1>
            <p className="t-body" style={{ fontSize: '15px', lineHeight: '1.7' }}>
              Criteria are operational filters, not soft preferences. Every submission is
              evaluated against the same standards. Deals that meet the criteria move quickly.
              Deals that don't, don't move — and we will tell you why.
            </p>
          </div>
        </div>
      </section>

      {/* Core criteria */}
      <section className="bg-graphite py-24 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <p className="t-eyebrow mb-6">Core Criteria</p>
          <div className="section-rule" />
          <div className="flex flex-col gap-0 border border-gunmetal" style={{ borderRadius: '2px' }}>
            {criteria.map((c, i) => (
              <div
                key={c.category}
                className={`grid grid-cols-1 lg:grid-cols-4 gap-0 ${
                  i < criteria.length - 1 ? 'border-b border-gunmetal' : ''
                }`}
              >
                <div className="p-8 lg:border-r border-gunmetal border-b lg:border-b-0">
                  <p className="t-id">{c.category}</p>
                </div>
                <div className="lg:col-span-3 p-8">
                  <p className="t-h3 text-sm mb-2">{c.primary}</p>
                  <p className="t-body text-sm mb-3">{c.secondary}</p>
                  <p className="t-caption border-l-2 border-olive pl-4">{c.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deal structures */}
      <section className="bg-matte-black py-24 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <p className="t-eyebrow mb-6">Deal Structures We Use</p>
          <div className="section-rule" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-10">
            <h2 className="t-h2 text-2xl">
              One structure does not fit every deal.
            </h2>
            <p className="t-body" style={{ fontSize: '15px' }}>
              We evaluate the seller's situation, our capital position, and the exit path
              before deciding how to structure the acquisition. The structure should serve
              the deal — not the other way around.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-gunmetal" style={{ borderRadius: '2px' }}>
            {dealStructures.map((item, i) => (
              <div
                key={item.structure}
                className={`p-8 ${
                  i % 3 !== 2 ? 'lg:border-r border-gunmetal' : ''
                } ${
                  i < 3 ? 'border-b border-gunmetal' : ''
                } ${
                  [0, 2, 4].includes(i) && i % 3 !== 2 ? 'sm:border-r border-gunmetal' : ''
                } ${
                  i < 4 ? 'sm:border-b border-gunmetal' : ''
                }`}
              >
                <h3 className="t-h3 text-sm mb-2">{item.structure}</h3>
                <p className="t-body text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What we don't do */}
      <section className="bg-graphite py-20 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="t-eyebrow mb-6">Disqualifying Factors</p>
              <div className="section-rule" />
              <h2 className="t-h2 text-xl mb-6">
                What doesn't advance.
              </h2>
              <p className="t-body">
                We don't say no to be difficult. We say no because misaligned deals waste
                everyone's time. If your property doesn't fit, we will tell you that directly
                and explain why.
              </p>
            </div>
            <div className="flex flex-col gap-0 border-t border-gunmetal">
              {disqualifiers.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 py-5 border-b border-gunmetal"
                >
                  <span className="t-id mt-0.5 flex-shrink-0">—</span>
                  <p className="t-body text-sm">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-matte-black py-20">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="max-w-xl mb-10">
            <h2 className="t-h2 text-xl mb-4">
              Think your property qualifies?
            </h2>
            <p className="t-body">
              Submit it. We review every submission and respond with a clear determination.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/sell-your-property" className="btn-primary">
              Submit Your Property
            </Link>
            <Link href="/contact" className="btn-secondary">
              Ask a Question
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
