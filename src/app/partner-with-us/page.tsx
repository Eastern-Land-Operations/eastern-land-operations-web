import type { Metadata } from 'next'
import InvestorForm from '@/components/InvestorForm'

export const metadata: Metadata = {
  title: 'Capital Inquiry',
  description:
    'Capital inquiry for Eastern Land Operations. Private lenders, equity partners, JV investors. We present underwritten opportunities with clear return profiles.',
}

const capitalTypes = [
  {
    id: '01',
    type: 'Private Lending',
    desc: 'Bridge, hard money, or note financing on residential and mixed-use acquisitions. We close on time, communicate clearly, and value long-term lending relationships.',
    lookingFor: [
      'Acquisition and rehab bridge loans',
      'Fix-and-hold DSCR financing',
      'Note purchases and structured deals',
    ],
  },
  {
    id: '02',
    type: 'Equity Partnership',
    desc: 'Equity co-investment and JV structures on acquisition and redevelopment projects. We manage operations — you deploy capital with a clear return profile.',
    lookingFor: [
      'Deal-by-deal equity co-investment',
      'JV structures on larger projects',
      'Portfolio-level capital relationships',
    ],
  },
  {
    id: '03',
    type: 'Institutional Capital',
    desc: 'For family offices, funds, and institutional allocators looking for disciplined, operator-led deployment in the residential and mixed-use redevelopment space.',
    lookingFor: [
      'Managed deployment relationships',
      'Pipeline-based deal flow',
      'Custom co-investment structures',
    ],
  },
]

const standards = [
  { label: 'Underwriting', value: 'Conservative, exit-first. Every deal modeled before commitment.' },
  { label: 'Documentation', value: 'Deal memos, site intelligence reports, and pipeline tracking provided.' },
  { label: 'Communication', value: 'Direct. No spin. We tell partners what is actually happening.' },
  { label: 'Close Record', value: 'We close what we open. We do not retrade without cause.' },
  { label: 'Returns', value: 'Stated at underwriting. Tracked against actuals through exit.' },
]

export default function PartnerWithUsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24 bg-matte-black border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="max-w-2xl">
            <p className="t-eyebrow mb-8">Capital Inquiry</p>
            <div className="section-rule" />
            <h1 className="t-h1 mb-8" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
              Deploy capital
              <br />
              with discipline.
            </h1>
            <p className="t-body mb-8" style={{ fontSize: '15px', lineHeight: '1.7' }}>
              We present underwritten opportunities with clear return profiles. No speculation.
              No guesswork. Every deal is modeled conservatively before capital is committed.
              We work with private lenders, equity partners, and institutional capital that
              wants operator-led, field-verified deployment.
            </p>
            <a href="#form" className="btn-primary">
              Submit Capital Inquiry
            </a>
          </div>
        </div>
      </section>

      {/* Capital types */}
      <section className="bg-graphite py-24 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <p className="t-eyebrow mb-6">Capital Lanes</p>
          <div className="section-rule" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-gunmetal" style={{ borderRadius: '2px' }}>
            {capitalTypes.map((c, i) => (
              <div
                key={c.id}
                className={`p-8 ${i < capitalTypes.length - 1 ? 'border-b lg:border-b-0 lg:border-r border-gunmetal' : ''}`}
              >
                <p className="t-id mb-3">{c.id}</p>
                <h2 className="t-h3 text-base mb-3">{c.type}</h2>
                <p className="t-body text-sm mb-6">{c.desc}</p>
                <ul className="flex flex-col gap-2">
                  {c.lookingFor.map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="t-id mt-0.5 flex-shrink-0">—</span>
                      <span className="t-body text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Operating standards */}
      <section className="bg-matte-black py-24 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="t-eyebrow mb-6">Operating Standards</p>
              <div className="section-rule" />
              <h2 className="t-h2 text-2xl mb-6">
                What we hold ourselves to.
              </h2>
              <p className="t-body" style={{ fontSize: '15px', lineHeight: '1.7' }}>
                Capital relationships work when both parties operate with the same standard.
                This is what we commit to on every deal, with every partner. Not as a pitch —
                as a standard.
              </p>
            </div>
            <div className="flex flex-col gap-0 border border-gunmetal" style={{ borderRadius: '2px' }}>
              {standards.map((item, i) => (
                <div
                  key={item.label}
                  className={`flex gap-8 px-8 py-5 ${i < standards.length - 1 ? 'border-b border-gunmetal' : ''}`}
                >
                  <p className="t-id w-32 flex-shrink-0 pt-0.5">{item.label}</p>
                  <p className="t-body text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* We also work with */}
      <section className="bg-graphite py-16 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <p className="t-eyebrow mb-6">Other Partner Lanes</p>
          <div className="section-rule" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-0 border border-gunmetal" style={{ borderRadius: '2px' }}>
            {[
              { type: 'Agents', note: 'Direct acquisition opportunities, co-listing on exits' },
              { type: 'Wholesalers', note: 'Consistent deal flow, fast buyer, clean close' },
              { type: 'Contractors', note: 'Active rehab pipeline for qualified crews' },
              { type: 'Attorneys', note: 'Probate, title, and complex acquisition counsel' },
              { type: 'Housing Programs', note: 'Community development and affordable housing partners' },
            ].map((item, i) => (
              <div
                key={item.type}
                className={`p-6 ${i < 4 ? 'border-b sm:border-b-0 sm:border-r border-gunmetal' : ''}`}
              >
                <h3 className="t-h3 text-sm mb-2">{item.type}</h3>
                <p className="t-body text-xs">{item.note}</p>
              </div>
            ))}
          </div>
          <p className="t-caption mt-6">
            If your lane is not listed above, use the form below. We review all serious inquiries.
          </p>
        </div>
      </section>

      {/* Form */}
      <section id="form" className="bg-matte-black py-24">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div>
              <p className="t-eyebrow mb-6">Capital Inquiry</p>
              <div className="section-rule" />
              <p className="t-body mb-8" style={{ fontSize: '15px', lineHeight: '1.7' }}>
                Tell us who you are, your capital capacity, and what you are looking to
                accomplish. We review all inquiries and follow up with those that are a fit.
              </p>
              <div className="flex flex-col gap-4 border-t border-gunmetal pt-6">
                <div>
                  <p className="t-eyebrow mb-2" style={{ fontSize: '10px' }}>Phone</p>
                  <a href="tel:3026893912" className="t-mono text-sm hover:text-olive transition-colors">
                    302-689-3912
                  </a>
                </div>
                <div>
                  <p className="t-eyebrow mb-2" style={{ fontSize: '10px' }}>Email</p>
                  <a href="mailto:contact@easternlandoperations.com" className="t-mono text-sm hover:text-olive transition-colors">
                    contact@easternlandoperations.com
                  </a>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <InvestorForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
