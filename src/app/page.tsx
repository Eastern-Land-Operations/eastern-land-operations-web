import type { Metadata } from 'next'
import Link from 'next/link'
import BrandLogo from '../components/BrandLogo'

export const metadata: Metadata = {
  title: 'Eastern Land Operations | Real Estate Acquisitions',
  description:
    'Eastern Land Operations buys, improves, and manages real estate with a disciplined long-term approach.',
}

const operations = [
  {
    id: '01',
    label: 'Find',
    body: 'Direct outreach, referrals, and local research help us identify properties early.',
  },
  {
    id: '02',
    label: 'Evaluate',
    body: 'Financials, repair scope, and timing are reviewed before any decision is made.',
  },
  {
    id: '03',
    label: 'Acquire',
    body: 'Properties are purchased in the structure that best fits the situation.',
  },
  {
    id: '04',
    label: 'Improve',
    body: 'Work is planned carefully and managed against budget, timeline, and long-term use.',
  },
  {
    id: '05',
    label: 'Hold Or Sell',
    body: 'The next step depends on the property, the market, and the long-term value of keeping it.',
  },
  {
    id: '06',
    label: 'Learn',
    body: 'Every project adds experience that improves the next decision.',
  },
] as const

const criteria = [
  { label: 'Geography', value: 'Greater Philadelphia, South Jersey, and the Delaware Valley' },
  { label: 'Property Types', value: 'Residential, multifamily, mixed-use, and vacant land' },
  { label: 'Condition', value: 'All conditions considered, including distressed or occupied properties' },
  { label: 'Situation', value: 'Inherited property, tax issues, vacant property, or owner transition' },
  { label: 'Price Range', value: 'Capacity scales with deal quality and fit' },
  { label: 'Timeline', value: 'Urgent situations through extended timelines' },
] as const

export default function HomePage() {
  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-matte-black flex items-center border-b border-gunmetal pt-16">
        <div className="max-w-screen-xl mx-auto px-8 w-full py-24">
          <div className="max-w-3xl">
            <p className="t-eyebrow mb-8">Eastern Land Operations</p>
            <div className="section-rule" />
            <h1 className="t-display mb-8">
              Strategic land operator
              <br />
              with institutional
              <br />
              discipline.
            </h1>
            <p className="t-body mb-12 max-w-[540px]">
              Eastern Land Operations acquires, improves, and holds land and property across
              high-priority local corridors. Every property is reviewed carefully. No impulse buys.
              No cosmetic flips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/sell-your-property" className="btn-primary">
                Submit Property
              </Link>
              <Link href="/partner-with-us" className="btn-secondary">
                Investor Intake
              </Link>
            </div>
          </div>

          <div
            className="pointer-events-none absolute inset-y-0 right-0 hidden xl:flex w-[320px] 2xl:w-[400px] items-center justify-end pr-8"
            aria-hidden="true"
          >
            <BrandLogo
              variant="light"
              alt=""
              width={400}
              height={247}
              priority
              className="w-full opacity-[0.08]"
            />
          </div>
        </div>
      </section>

      <section className="bg-graphite py-24 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div>
              <p className="t-eyebrow mb-6">What We Do</p>
              <div className="section-rule" />
              <h2 className="t-h2 mb-6">
                Real estate acquisitions.
                <br />
                Practical redevelopment.
              </h2>
              <p className="t-body">
                We are a company that finds, reviews, buys, and improves real property with a
                disciplined long-term approach.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-0 border border-gunmetal" style={{ borderRadius: '2px' }}>
              {[
                {
                  heading: 'Acquisitions',
                  body: 'Off-market and direct-to-owner opportunities reviewed carefully at every stage.',
                },
                {
                  heading: 'Redevelopment',
                  body: 'Properties are improved with a clear plan, realistic scope, and practical next step.',
                },
                {
                  heading: 'Long-Term Ownership',
                  body: 'Some properties are sold. Others are held as long-term positions that continue to compound value.',
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

      <section className="bg-matte-black py-24 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <p className="t-eyebrow mb-6">How We Work</p>
          <div className="section-rule" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <h2 className="t-h2">
              A repeatable process.
              <br />
              No unnecessary noise.
            </h2>
            <p className="t-body">
              Every opportunity follows the same sequence: review the basics, confirm the details,
              close carefully, manage the work, and choose the best long-term outcome.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-gunmetal" style={{ borderRadius: '2px' }}>
            {operations.map((op, i) => (
              <div
                key={op.id}
                className={`p-8 ${
                  [0, 1, 3, 4].includes(i) ? 'border-b sm:border-b-0' : ''
                } ${
                  i % 3 !== 2 ? 'lg:border-r border-gunmetal' : ''
                } ${
                  i < 4 ? 'lg:border-b border-gunmetal' : ''
                } ${
                  [0, 2, 4].includes(i) ? 'sm:border-r border-gunmetal' : ''
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
              View How We Work
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-graphite py-24 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="t-eyebrow mb-6">Acquisition Criteria</p>
              <div className="section-rule" />
              <h2 className="t-h2 mb-6">
                We know what we want.
                <br />
                And what we do not.
              </h2>
              <p className="t-body mb-8">
                Every property is reviewed against the same practical standards. Good fit matters.
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

      <section className="bg-matte-black py-24 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <p className="t-eyebrow mb-6">Redevelopment Approach</p>
          <div className="section-rule" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="t-h2 text-2xl mb-6">Outcomes, not quick cosmetics.</h2>
              <p className="t-body mb-6" style={{ fontSize: '15px' }}>
                We do not focus on surface-level fixes for the sake of appearances. We focus on
                improvements that support the property’s next stage of use, ownership, or sale.
              </p>
              <p className="t-body" style={{ fontSize: '15px' }}>
                Our redevelopment approach is budget-driven, schedule-aware, and focused on a clear outcome.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              {[
                { principle: 'Outcome-first planning', detail: 'Scope is set by the likely outcome, not a wish list. If it does not meaningfully improve the project, it does not get added.' },
                { principle: 'Address real issues', detail: 'When a deeper problem exists, we address it directly instead of hiding it behind surface updates.' },
                { principle: 'Respect the timeline', detail: 'Time matters. Work should move with purpose instead of drifting.' },
                { principle: 'Choose the right next step', detail: 'Sale, rental, refinance, or long-term hold are all valid outcomes when they fit the property.' },
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

      <section className="bg-graphite py-24">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="border border-gunmetal p-10" style={{ borderRadius: '2px' }}>
              <p className="t-eyebrow mb-6">Property Owners</p>
              <div className="section-rule" />
              <h2 className="t-h2 text-xl mb-4">Submit your property.</h2>
              <p className="t-body mb-8">
                Any condition. Any situation. We review every submission honestly and respond with
                a clear next step.
              </p>
              <Link href="/sell-your-property" className="btn-primary">
                Submit Property
              </Link>
            </div>

            <div className="border border-gunmetal p-10" style={{ borderRadius: '2px' }}>
              <p className="t-eyebrow mb-6">Investors</p>
              <div className="section-rule" />
              <h2 className="t-h2 text-xl mb-4">Share your investment criteria.</h2>
              <p className="t-body mb-8">
                Tell us what you buy, where you buy, and how you like to review opportunities.
                We use your criteria to share relevant properties with investors, landlords,
                developers, and partners.
              </p>
              <Link href="/partner-with-us" className="btn-primary">
                Investor Intake
              </Link>
            </div>
          </div>

          <div className="mt-16 pt-10 border-t border-gunmetal flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="t-body text-sm">Direct line:</p>
            <div className="flex flex-col sm:flex-row gap-8">
              <a href="tel:3026893912" className="t-mono text-sm hover:text-off-white transition-colors">
                302-689-3912
              </a>
              <a href="mailto:contact@easternlandoperations.com" className="t-mono text-sm hover:text-off-white transition-colors">
                contact@easternlandoperations.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
