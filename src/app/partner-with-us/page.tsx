import type { Metadata } from 'next'
import InvestorForm from '../../components/InvestorForm'

export const metadata: Metadata = {
  title: 'Investor Intake',
  description:
    'Investor form for Eastern Land Operations. Share your investment criteria, close speed, and purchase preferences so we can share relevant opportunities.',
}

const buyerLanes = [
  {
    id: '01',
    type: 'Local Landlords',
    desc: 'Investors looking for rental properties, value-add opportunities, and practical long-term holds.',
  },
  {
    id: '02',
    type: 'House Flippers',
    desc: 'Buyers looking for projects with realistic renovation scope and clear resale potential.',
  },
  {
    id: '03',
    type: 'Developers And Builders',
    desc: 'Investors focused on shells, redevelopment sites, teardowns, and land opportunities.',
  },
] as const

const standards = [
  { label: 'Clarity', value: 'We want to know what you buy, where you buy, and how quickly you can move.' },
  { label: 'Readiness', value: 'Proof of funds, lender relationships, and realistic purchase criteria matter.' },
  { label: 'Fit', value: 'We try to share opportunities with investors whose criteria are a strong match.' },
  { label: 'Speed', value: 'The clearer your criteria are, the easier it is to move quickly when the right property comes up.' },
] as const

export default function PartnerWithUsPage() {
  return (
    <>
      <section className="pt-32 pb-24 bg-matte-black border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="max-w-2xl">
            <p className="t-eyebrow mb-8">Investor Information</p>
            <div className="section-rule" />
            <h1 className="t-h1 mb-8">
              Share your
              <br />
              investment criteria.
            </h1>
            <p className="t-body mb-8">
              Tell us what you buy, how you fund deals, and how quickly you can move. We use this
              information to share relevant opportunities with investors whose criteria are a strong fit.
            </p>
            <a href="#form" className="btn-primary">
              Start Investor Intake
            </a>
          </div>
        </div>
      </section>

      <section className="bg-graphite py-24 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <p className="t-eyebrow mb-6">Who This Is For</p>
          <div className="section-rule" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-gunmetal" style={{ borderRadius: '2px' }}>
            {buyerLanes.map((lane, index) => (
              <div
                key={lane.id}
                className={`p-8 ${index < buyerLanes.length - 1 ? 'border-b lg:border-b-0 lg:border-r border-gunmetal' : ''}`}
              >
                <p className="t-id mb-3">{lane.id}</p>
                <h2 className="t-h3 text-base mb-3">{lane.type}</h2>
                <p className="t-body text-sm">{lane.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-matte-black py-24 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="t-eyebrow mb-6">Why This Form Matters</p>
              <div className="section-rule" />
              <h2 className="t-h2 mb-6">
                Better criteria
                <br />
                creates better matching.
              </h2>
              <p className="t-body">
                We use this form to understand your purchase criteria, readiness, and communication
                preferences so we can send fewer, more relevant opportunities.
              </p>
            </div>
            <div className="flex flex-col gap-0 border border-gunmetal" style={{ borderRadius: '2px' }}>
              {standards.map((item, index) => (
                <div
                  key={item.label}
                  className={`flex gap-8 px-8 py-5 ${index < standards.length - 1 ? 'border-b border-gunmetal' : ''}`}
                >
                  <p className="t-id w-28 flex-shrink-0 pt-0.5">{item.label}</p>
                  <p className="t-body text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="form" className="bg-graphite py-24">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.48fr)] gap-8 lg:gap-10 items-start">
            <div className="lg:sticky lg:top-28">
              <p className="t-eyebrow mb-6">Investor Information</p>
              <div className="section-rule" />
              <h2 className="t-h2 mb-5">
                Better criteria.
                <br />
                Better opportunity matching.
              </h2>
              <p className="t-body mb-8">
                Share your criteria, purchase profile, and communication preferences so we can
                send fewer, more relevant opportunities.
              </p>

              <div className="border border-gunmetal/80 bg-matte-black/20 p-5 mb-6" style={{ borderRadius: '2px' }}>
                <p className="t-eyebrow mb-4">What To Include</p>
                <div className="space-y-3">
                  {[
                    'The neighborhoods and property types you actively buy.',
                    'Your realistic price range and rehab tolerance.',
                    'How quickly you can close and whether proof of funds is ready.',
                    'How you prefer to receive opportunities.',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="t-id pt-1">-</span>
                      <p className="t-body text-sm">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 border-t border-gunmetal pt-6">
                <div>
                  <p className="t-eyebrow mb-2" style={{ fontSize: '10px' }}>Direct line</p>
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

            <div className="border border-gunmetal/90 bg-matte-black/10 p-5 sm:p-7 lg:p-8" style={{ borderRadius: '2px' }}>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-gunmetal pb-5 mb-7">
                <div>
                  <p className="t-eyebrow mb-2">Investor Intake</p>
                  <h3 className="t-h3 text-lg">Investor criteria form</h3>
                </div>
                <p className="t-caption max-w-xs">
                  Clear criteria helps us send fewer, better-matched opportunities.
                </p>
              </div>

              <InvestorForm embedded />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
