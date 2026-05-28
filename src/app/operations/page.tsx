import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Operations',
  description:
    'How Eastern Land Operations reviews opportunities, buys property, manages improvements, and chooses the best next step for each project.',
}

const phases = [
  {
    id: '01',
    phase: 'Find',
    tagline: 'Direct outreach, local relationships, and market research.',
    body: 'We look for opportunities through direct contact, referrals, and targeted research so we can review properties before they become widely marketed.',
    points: [
      'Direct outreach to owners in target areas',
      'Agent and referral relationships',
      'Research on distressed or underused properties',
      'Review of properties tied to time-sensitive situations',
    ],
  },
  {
    id: '02',
    phase: 'Review',
    tagline: 'Not every property is the right fit.',
    body: 'Before spending time on a property, we review the basics: location, price range, property type, condition, and the seller’s situation.',
    points: [
      'Initial fit check for location, property type, and price range',
      'Early review of the seller situation',
      'Title and lien flag review',
      'Early resale or hold review before an in-person visit',
    ],
  },
  {
    id: '03',
    phase: 'Evaluate',
    tagline: 'The numbers have to make sense.',
    body: 'We review likely resale value, repair costs, carrying costs, closing costs, and timing. If the project does not make sense on conservative assumptions, we pass.',
    points: [
      'Review of comparable closed sales rather than list prices',
      'Clear purchase-price limits based on the likely outcome',
      'Repair scope and cost review',
      'Financing, carrying cost, and resale cost review',
    ],
  },
  {
    id: '04',
    phase: 'Visit',
    tagline: 'Seeing the property matters.',
    body: 'An in-person visit helps confirm condition, layout, access, neighborhood context, and issues that can be missed from photos or public records.',
    points: [
      'Property condition review and scope confirmation',
      'Neighborhood and block-level observation',
      'Access and surrounding-property review',
      'Conversation with the owner or contact when helpful',
    ],
  },
  {
    id: '05',
    phase: 'Structure',
    tagline: 'The process should fit the situation.',
    body: 'Not every property should be purchased the same way. Depending on the situation, we may use a direct purchase, seller financing, or another structure that better fits the property and the seller’s timeline.',
    points: [
      'Purchase structure based on the property and expected outcome',
      'Flexible options when a standard purchase is not the best fit',
      'Title, legal, and closing coordination',
      'Seller timeline and circumstances considered in the process',
    ],
  },
  {
    id: '06',
    phase: 'Execute',
    tagline: 'Close carefully and manage the work.',
    body: 'After a property is under contract, we coordinate title, funding, contractors, and legal steps so the closing and improvement process stays organized and on schedule.',
    points: [
      'Closing coordination with title and legal teams',
      'Improvement work managed against budget',
      'Contractor management and schedule accountability',
      'Progress tracked against the original plan',
    ],
  },
  {
    id: '07',
    phase: 'Hold Or Sell',
    tagline: 'The right next step depends on the property.',
    body: 'Once the work is complete or the property is stable, we decide whether to sell, rent, refinance, or hold based on the market, the property, and the long-term value of keeping it.',
    points: [
      'Comparison of sale, rental, refinance, and hold options',
      'Refinance review for long-term ownership opportunities',
      'Sale coordination if selling is the best outcome',
      'Lessons carried forward into future decisions',
    ],
  },
] as const

export default function OperationsPage() {
  return (
    <>
      <section className="pt-32 pb-24 bg-matte-black border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="max-w-2xl">
            <p className="t-eyebrow mb-8">How We Work</p>
            <div className="section-rule" />
            <h1 className="t-h1 mb-8">
              A clear process.
              <br />
              From first review
              <br />
              to final outcome.
            </h1>
            <p className="t-body">
              Every property follows the same general process: review the opportunity, confirm
              the details, close carefully, manage improvements, and choose the best long-term
              outcome.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-graphite py-24 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="flex flex-col gap-0 border border-gunmetal" style={{ borderRadius: '2px' }}>
            {phases.map((phase, index) => (
              <div
                key={phase.id}
                className={`grid grid-cols-1 lg:grid-cols-3 gap-0 ${
                  index < phases.length - 1 ? 'border-b border-gunmetal' : ''
                }`}
              >
                <div className="p-8 lg:border-r border-gunmetal border-b lg:border-b-0">
                  <p className="t-id mb-2">{phase.id}</p>
                  <h2 className="t-h2 text-xl mb-2">{phase.phase}</h2>
                  <p className="t-body text-sm" style={{ fontStyle: 'italic' }}>
                    {phase.tagline}
                  </p>
                </div>

                <div className="lg:col-span-2 p-8">
                  <p className="t-body mb-6">{phase.body}</p>
                  <ul className="flex flex-col gap-2">
                    {phase.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="t-id mt-0.5 flex-shrink-0">-</span>
                        <span className="t-body text-sm">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-matte-black py-20 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="t-eyebrow mb-6">What We Learn</p>
              <div className="section-rule" />
              <h2 className="t-h2 text-2xl mb-6">Every project improves the next one.</h2>
              <p className="t-body mb-4">
                Every project teaches us something useful about pricing, scope, neighborhood
                patterns, timing, and execution. That experience helps us make better decisions
                on the next opportunity.
              </p>
              <p className="t-body">
                Over time, that experience builds practical local knowledge that helps us move
                faster, price more accurately, and avoid avoidable mistakes.
              </p>
            </div>
            <div className="border border-gunmetal p-8" style={{ borderRadius: '2px' }}>
              <p className="t-eyebrow mb-6">What We Track</p>
              <div className="flex flex-col gap-0">
                {[
                  { label: 'Property Details', value: 'Recorded', note: 'Address, condition, and ownership context' },
                  { label: 'Project Stage', value: 'Updated', note: 'Reviewed throughout the process' },
                  { label: 'Costs And Timing', value: 'Tracked', note: 'Repairs, timing, and hold costs' },
                  { label: 'Key Decisions', value: 'Documented', note: 'Important choices are written down' },
                ].map((item, index) => (
                  <div
                    key={item.label}
                    className={`flex justify-between items-start py-5 ${
                      index < 3 ? 'border-b border-gunmetal' : ''
                    }`}
                  >
                    <p className="t-id">{item.label}</p>
                    <div className="text-right">
                      <p className="t-mono text-sm">{item.value}</p>
                      <p className="t-caption mt-1">{item.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-graphite py-20">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/acquisition-criteria" className="btn-primary">
              Acquisition Criteria
            </Link>
            <Link href="/sell-your-property" className="btn-secondary">
              Submit A Property
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
