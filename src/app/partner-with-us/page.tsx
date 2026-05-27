import type { Metadata } from 'next'
import InvestorForm from '@/components/InvestorForm'

export const metadata: Metadata = {
  title: 'Buyer Network',
  description:
    'Buyer and investor intake for Eastern Land Operations. Share your buy box, close speed, and execution profile so we can route matching opportunities intelligently.',
}

const buyerLanes = [
  {
    id: '01',
    type: 'Local Landlords',
    desc: 'Operators looking for rentals, value-add opportunities, and practical buy-and-hold acquisitions.',
  },
  {
    id: '02',
    type: 'Flip Operators',
    desc: 'Buyers seeking margin-driven rehab opportunities with realistic execution plans and clear resale logic.',
  },
  {
    id: '03',
    type: 'Developers And Builders',
    desc: 'Buyers focused on shells, redevelopment sites, teardowns, and land positions with a build thesis.',
  },
] as const

const standards = [
  { label: 'Clarity', value: 'We want to know exactly what you buy, where you buy, and how you close.' },
  { label: 'Readiness', value: 'Capital, lender relationships, and proof of funds matter more than broad interest.' },
  { label: 'Fit', value: 'We do not blast deals. We try to route relevant opportunities to relevant buyers.' },
  { label: 'Speed', value: 'If your criteria are clear, we can match faster and communicate with less friction.' },
] as const

export default function PartnerWithUsPage() {
  return (
    <>
      <section className="pt-32 pb-24 bg-matte-black border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="max-w-2xl">
            <p className="t-eyebrow mb-8">Buyer / Investor Buy Box Intake</p>
            <div className="section-rule" />
            <h1 className="t-h1 mb-8" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
              Join the ELO
              <br />
              buyer network.
            </h1>
            <p className="t-body mb-8" style={{ fontSize: '15px', lineHeight: '1.7' }}>
              Tell us what you buy, how you fund deals, and how quickly you can move. We use this
              intake to build a more disciplined buyer network around real opportunities.
            </p>
            <a href="#form" className="btn-primary">
              Start Buyer Intake
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
              <p className="t-eyebrow mb-6">Why The Intake Matters</p>
              <div className="section-rule" />
              <h2 className="t-h2 text-2xl mb-6">
                Better buyer data
                <br />
                creates better routing.
              </h2>
              <p className="t-body" style={{ fontSize: '15px', lineHeight: '1.7' }}>
                This is not a vanity signup. We use the form to understand execution capacity,
                criteria, and communication preferences so we can cut down noise and improve fit.
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div>
              <p className="t-eyebrow mb-6">Join The ELO Buyer Network</p>
              <div className="section-rule" />
              <p className="t-body mb-8" style={{ fontSize: '15px', lineHeight: '1.7' }}>
                Share your buy box, your capital profile, and how you like to receive deals. If an
                opportunity matches your criteria, we will know how to reach you.
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
