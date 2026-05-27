import type { Metadata } from 'next'
import Link from 'next/link'
import BrandLogo from '@/components/BrandLogo'

export const metadata: Metadata = {
  title: 'Eastern Land Operations | Strategic Land Operator',
  description:
    'Eastern Land Operations is a strategic land operator with institutional discipline. Tactical acquisitions, redevelopment outcomes, long-horizon ownership.',
}

const operations = [
  {
    id: '01',
    label: 'Source',
    body: 'Off-market and pre-market identification. We move before the listing exists.',
  },
  {
    id: '02',
    label: 'Underwrite',
    body: 'Full financial and risk analysis. Every acquisition is modeled before a decision is made.',
  },
  {
    id: '03',
    label: 'Acquire',
    body: 'As-is acquisitions. Speed and certainty of close are operational assets.',
  },
  {
    id: '04',
    label: 'Redevelop',
    body: 'Properties repositioned to highest and best use. No cosmetic passes — structural outcomes.',
  },
  {
    id: '05',
    label: 'Hold or Exit',
    body: 'Exits are structured for maximum return. Select assets held as long-term positions.',
  },
  {
    id: '06',
    label: 'Iterate',
    body: 'Each circuit generates intelligence that informs the next. The system compounds.',
  },
]

const criteria = [
  { label: 'Geography', value: 'Greater Philadelphia · South Jersey · Delaware Valley' },
  { label: 'Property Types', value: 'Residential · Multi-Family · Mixed-Use · Vacant Land' },
  { label: 'Condition', value: 'All conditions considered — distressed, occupied, code-flagged' },
  { label: 'Situation', value: 'Pre-foreclosure · Inherited · Tired Landlord · Tax Delinquent' },
  { label: 'Price Range', value: 'Acquisition capacity scales with deal quality' },
  { label: 'Timeline', value: 'ASAP to 90+ days — we move at your pace' },
]

export default function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen bg-matte-black flex items-center border-b border-gunmetal pt-16">
        <div className="max-w-screen-xl mx-auto px-8 w-full py-24">
          <div className="max-w-3xl">
            <p className="t-eyebrow mb-8">Eastern Land Operations</p>
            <div className="section-rule" />
            <h1
              className="t-display mb-8"
              style={{ fontSize: 'clamp(40px, 6vw, 72px)' }}
            >
              Strategic land operator
              <br />
              with institutional
              <br />
              discipline.
            </h1>
            <p className="t-body mb-12" style={{ maxWidth: '540px', fontSize: '15px', lineHeight: '1.7' }}>
              Eastern Land Operations acquires, repositions, and holds land and property across
              high-priority corridors. Every acquisition is a deliberate position. Every decision
              is underwritten. No impulse buys. No cosmetic flips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/sell-your-property" className="btn-primary">
                Submit Property
              </Link>
              <Link href="/partner-with-us" className="btn-secondary">
                Buyer Network
              </Link>
            </div>
          </div>

          {/* Emblem — right side */}
          <div
            className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block"
            aria-hidden="true"
          >
            <BrandLogo
              variant="light"
              alt=""
              width={300}
              height={186}
              priority
              className="opacity-10"
            />
          </div>
        </div>
      </section>

      {/* ── What We Do ───────────────────────────────────────── */}
      <section className="bg-graphite py-24 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div>
              <p className="t-eyebrow mb-6">What We Do</p>
              <div className="section-rule" />
              <h2 className="t-h2 text-2xl mb-6">
                Tactical acquisitions.<br />Redevelopment outcomes.
              </h2>
              <p className="t-body">
                We are not a real estate agency. We are not a wholesaler. We are an operational
                entity that sources, underwrites, acquires, and repositions real property — with
                the discipline of an institutional operator and the speed of a field team.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-0 border border-gunmetal" style={{ borderRadius: '2px' }}>
              {[
                {
                  heading: 'Land Acquisitions',
                  body: 'Off-market sourcing with underwriting discipline at every stage. We do not overpay. We do not pass on the right deal.',
                },
                {
                  heading: 'Redevelopment',
                  body: 'Properties repositioned to highest and best use. We hold position through the full cycle — not just to the next flip.',
                },
                {
                  heading: 'Long-Horizon Ownership',
                  body: 'Select assets become long-term portfolio positions. Not everything is for sale. Some things compound.',
                },
              ].map((item, i) => (
                <div
                  key={item.heading}
                  className={`p-8 ${i < 2 ? 'border-b sm:border-b-0 sm:border-r border-gunmetal' : ''}`}
                >
                  <h3 className="t-h3 text-base mb-3">{item.heading}</h3>
                  <p className="t-body text-sm">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Operations Model ─────────────────────────────────── */}
      <section className="bg-matte-black py-24 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <p className="t-eyebrow mb-6">Operations Model</p>
          <div className="section-rule" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <h2 className="t-h2 text-2xl">
              Full-cycle execution.<br />
              No phase outsourced.
            </h2>
            <p className="t-body" style={{ fontSize: '15px' }}>
              Every opportunity runs the same sequence. Source, screen, underwrite, walk,
              structure, execute, hold or exit. No shortcuts. Every decision logged. Every
              cycle generates intelligence for the next.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-gunmetal" style={{ borderRadius: '2px' }}>
            {operations.map((op, i) => (
              <div
                key={op.id}
                className={`p-8 ${
                  [0,1,3,4].includes(i) ? 'border-b sm:border-b-0' : ''
                } ${
                  i % 3 !== 2 ? 'lg:border-r border-gunmetal' : ''
                } ${
                  i < 4 ? 'lg:border-b border-gunmetal' : ''
                } ${
                  [0,2,4].includes(i) ? 'sm:border-r border-gunmetal' : ''
                } ${
                  i < 4 ? 'sm:border-b border-gunmetal' : ''
                }`}
              >
                <p className="t-id mb-3">{op.id}</p>
                <h3 className="t-h3 text-base mb-3">{op.label}</h3>
                <p className="t-body text-sm">{op.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/operations" className="btn-secondary">
              View Full Operations Model
            </Link>
          </div>
        </div>
      </section>

      {/* ── Acquisition Criteria ─────────────────────────────── */}
      <section className="bg-graphite py-24 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="t-eyebrow mb-6">Acquisition Criteria</p>
              <div className="section-rule" />
              <h2 className="t-h2 text-2xl mb-6">
                We know what we want.<br />
                And what we don't.
              </h2>
              <p className="t-body mb-8">
                Criteria are not soft preferences — they are operational filters. Every
                submission is evaluated against the same standards. Deals that fit move fast.
                Deals that don't, don't move.
              </p>
              <Link href="/acquisition-criteria" className="btn-secondary">
                Full Criteria
              </Link>
            </div>

            <div className="flex flex-col gap-0 border border-gunmetal" style={{ borderRadius: '2px' }}>
              {criteria.map((item, i) => (
                <div
                  key={item.label}
                  className={`flex gap-8 px-8 py-5 ${i < criteria.length - 1 ? 'border-b border-gunmetal' : ''}`}
                >
                  <p className="t-id w-32 flex-shrink-0 pt-0.5">{item.label}</p>
                  <p className="t-body text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Redevelopment Discipline ─────────────────────────── */}
      <section className="bg-matte-black py-24 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <p className="t-eyebrow mb-6">Redevelopment Discipline</p>
          <div className="section-rule" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="t-h2 text-2xl mb-6">
                Outcomes, not renovations.
              </h2>
              <p className="t-body mb-6" style={{ fontSize: '15px' }}>
                We do not flip houses. We reposition assets. The distinction is material.
                Every redevelopment decision starts with the exit and works backward through
                the scope. Nothing is done cosmetically. Everything is structural.
              </p>
              <p className="t-body" style={{ fontSize: '15px' }}>
                Our redevelopment approach applies the same institutional discipline as the
                acquisition — budget-driven, schedule-bound, exit-oriented.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              {[
                { principle: 'Exit-first underwriting', detail: 'Scope is set by the exit value, not the want list. If it doesn\'t move the needle, it doesn\'t move.' },
                { principle: 'No cosmetic passes', detail: 'Lipstick on a structural problem is not a strategy. We address root conditions or we price them in.' },
                { principle: 'Schedule discipline', detail: 'Time is a cost. Extended hold periods erode margin. We move with deliberate speed.' },
                { principle: 'Highest and best use', detail: 'The exit isn\'t always a sale. Hold, refinance, and portfolio retention are all legitimate outcomes.' },
              ].map((item) => (
                <div key={item.principle} className="border-l-2 border-olive pl-6">
                  <h3 className="t-h3 text-sm mb-1">{item.principle}</h3>
                  <p className="t-body text-sm">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Inquiry Section ──────────────────────────────────── */}
      <section className="bg-graphite py-24">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Seller */}
            <div className="border border-gunmetal p-10" style={{ borderRadius: '2px' }}>
              <p className="t-eyebrow mb-6">Property Owners</p>
              <div className="section-rule" />
              <h2 className="t-h2 text-xl mb-4">Submit your property.</h2>
              <p className="t-body mb-8">
                Any condition. Any situation. We evaluate every submission honestly and
                respond with a clear path — purchase, creative structure, or referral.
                No pressure. No obligation.
              </p>
              <Link href="/sell-your-property" className="btn-primary">
                Submit Property
              </Link>
            </div>

            {/* Capital */}
            <div className="border border-gunmetal p-10" style={{ borderRadius: '2px' }}>
            <p className="t-eyebrow mb-6">Buyers And Investors</p>
            <div className="section-rule" />
            <h2 className="t-h2 text-xl mb-4">Join the ELO buyer network.</h2>
            <p className="t-body mb-8">
                Tell us what you buy, where you buy, and how you move. We use your buy box to
                route relevant opportunities to serious operators, landlords, developers, and
                investor partners.
            </p>
            <Link href="/partner-with-us" className="btn-primary">
                Buyer Intake
            </Link>
            </div>
          </div>

          {/* Contact strip */}
          <div className="mt-16 pt-10 border-t border-gunmetal flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="t-body text-sm">Direct line:</p>
            <div className="flex flex-col sm:flex-row gap-8">
              <a
                href="tel:3026893912"
                className="t-mono text-sm hover:text-off-white transition-colors"
              >
                302-689-3912
              </a>
              <a
                href="mailto:contact@easternlandoperations.com"
                className="t-mono text-sm hover:text-off-white transition-colors"
              >
                contact@easternlandoperations.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
