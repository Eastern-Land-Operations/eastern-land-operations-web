import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Operations',
  description:
    'The ELO operations model. Full-cycle land acquisitions — source, underwrite, acquire, redevelop, hold or exit. Institutional discipline applied at every phase.',
}

const phases = [
  {
    id: '01',
    phase: 'Source',
    tagline: 'Off-market. Pre-market. Before the listing.',
    body: 'Deal flow is a function of infrastructure, not luck. We build sourcing systems — direct outreach, referral networks, data-driven targeting — that generate consistent pipeline from sellers who are not yet (or will never be) on market.',
    points: [
      'Direct seller outreach across defined target corridors',
      'Agent and wholesaler referral network',
      'Distressed property intelligence and monitoring',
      'Pre-foreclosure and tax delinquency identification',
    ],
  },
  {
    id: '02',
    phase: 'Screen',
    tagline: 'Not every deal is the right deal.',
    body: 'Initial criteria filter before committing field resources. Geography, price range, property type, condition, and situation are assessed before a walkthrough is scheduled. Speed in screening protects the time we spend on the deals that matter.',
    points: [
      'Criteria alignment check — geography, type, price range',
      'Preliminary seller situation assessment',
      'Title and lien flag review',
      'Quick exit modeling before field commitment',
    ],
  },
  {
    id: '03',
    phase: 'Underwrite',
    tagline: 'Every number is real. No optimism.',
    body: 'Full financial and risk analysis. ARV, MAO, repair estimate, carrying costs, exit costs, and timeline are modeled conservatively. We underwrite to outcomes, not to hopeful projections. If it does not pencil conservatively, it does not advance.',
    points: [
      'ARV analysis from comparable closed sales — not listings',
      'Conservative MAO calculation based on defined exit',
      'Scope and repair estimate framework',
      'Carrying cost, financing cost, and exit cost modeling',
    ],
  },
  {
    id: '04',
    phase: 'Walk',
    tagline: 'You cannot underwrite what you have not seen.',
    body: 'Field verification of everything underwriting assumed. Condition, layout, structural integrity, neighborhood dynamics, access, and environmental signals are all captured on-site. The walk either confirms the model or changes it.',
    points: [
      'Physical condition assessment and scope verification',
      'Neighborhood and block-level observation',
      'Environmental and access signals',
      'Seller conversation and situation depth',
    ],
  },
  {
    id: '05',
    phase: 'Structure',
    tagline: 'The right structure for the right situation.',
    body: 'Every acquisition is structured differently. Cash purchase, owner financing, subject-to, installment sale, lease-option — the structure depends on the seller situation, our capital position, and the exit path. One tool does not fit every deal.',
    points: [
      'Capital structure determination based on exit path',
      'Creative structure evaluation where traditional does not fit',
      'Title, legal, and closing coordination',
      'Seller situation consideration in structure design',
    ],
  },
  {
    id: '06',
    phase: 'Execute',
    tagline: 'Close. Mobilize. Redevelop.',
    body: 'From signed contract to stabilization. We coordinate all parties — title, capital, contractors, legal — and execute against a defined scope and schedule. Time is a cost. Every day of hold without progress is margin leaving the deal.',
    points: [
      'Closing coordination with title and legal',
      'Redevelopment scope execution against budget',
      'Contractor management and schedule accountability',
      'Progress tracking against pro forma assumptions',
    ],
  },
  {
    id: '07',
    phase: 'Stabilize / Exit',
    tagline: 'Hold, refinance, or disposition — decided at underwriting.',
    body: 'The exit is not decided at the end. It is decided at underwriting and confirmed through execution. We evaluate retail sale, hold-and-rent, refinance, wholesale, joint venture, or portfolio sale based on the market at stabilization and the original model.',
    points: [
      'Exit comparison at stabilization — retail, hold, JV, portfolio',
      'Refinance evaluation for long-term hold assets',
      'Disposition coordination if sale is the exit',
      'Intelligence capture for next acquisition cycle',
    ],
  },
]

export default function OperationsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24 bg-matte-black border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="max-w-2xl">
            <p className="t-eyebrow mb-8">Operations Model</p>
            <div className="section-rule" />
            <h1 className="t-h1 mb-8" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
              Full-cycle execution.
              <br />
              No phase outsourced.
            </h1>
            <p className="t-body" style={{ fontSize: '15px', lineHeight: '1.7' }}>
              Every acquisition runs the same seven-phase sequence. No shortcuts. Every
              decision is documented. Every cycle generates field intelligence that
              informs the next. The system compounds.
            </p>
          </div>
        </div>
      </section>

      {/* Pipeline phases */}
      <section className="bg-graphite py-24 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="flex flex-col gap-0 border border-gunmetal" style={{ borderRadius: '2px' }}>
            {phases.map((phase, i) => (
              <div
                key={phase.id}
                className={`grid grid-cols-1 lg:grid-cols-3 gap-0 ${
                  i < phases.length - 1 ? 'border-b border-gunmetal' : ''
                }`}
              >
                {/* Label col */}
                <div className="p-8 lg:border-r border-gunmetal border-b lg:border-b-0">
                  <p className="t-id mb-2">{phase.id}</p>
                  <h2 className="t-h2 text-xl mb-2">{phase.phase}</h2>
                  <p className="t-body text-sm" style={{ fontStyle: 'italic' }}>{phase.tagline}</p>
                </div>

                {/* Content col */}
                <div className="lg:col-span-2 p-8">
                  <p className="t-body mb-6" style={{ fontSize: '14px', lineHeight: '1.7' }}>
                    {phase.body}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {phase.points.map(pt => (
                      <li key={pt} className="flex items-start gap-3">
                        <span className="t-id mt-0.5 flex-shrink-0">—</span>
                        <span className="t-body text-sm">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Intelligence note */}
      <section className="bg-matte-black py-20 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="t-eyebrow mb-6">Field Intelligence</p>
              <div className="section-rule" />
              <h2 className="t-h2 text-2xl mb-6">
                Every circuit generates intelligence.
              </h2>
              <p className="t-body mb-4" style={{ fontSize: '15px', lineHeight: '1.7' }}>
                Each acquisition is a circuit — a complete cycle from first contact through
                final exit. Every circuit generates documented intelligence: what was found on
                the walk, what the neighborhood signaled, what the seller revealed, what the
                numbers actually were versus what was modeled.
              </p>
              <p className="t-body" style={{ fontSize: '15px', lineHeight: '1.7' }}>
                This intelligence accumulates. It improves sourcing criteria, sharpens
                underwriting assumptions, and builds market-specific knowledge that cannot
                be purchased from a data vendor.
              </p>
            </div>
            <div className="border border-gunmetal p-8" style={{ borderRadius: '2px' }}>
              <p className="t-eyebrow mb-6">Circuit Format</p>
              <div className="flex flex-col gap-0">
                {[
                  { label: 'Circuit ID', value: 'C-[YEAR]-[SEQ]', note: 'Canonical reference — DM Mono' },
                  { label: 'Phase Tracking', value: 'Source → Exit', note: '7-phase pipeline, logged' },
                  { label: 'Intelligence Categories', value: '13 tracked', note: 'Per site, per acquisition' },
                  { label: 'Documentation', value: 'Mandatory', note: 'No undocumented decisions' },
                ].map((item, i) => (
                  <div
                    key={item.label}
                    className={`flex justify-between items-start py-5 ${i < 3 ? 'border-b border-gunmetal' : ''}`}
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

      {/* CTA */}
      <section className="bg-graphite py-20">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/acquisition-criteria" className="btn-primary">
              Acquisition Criteria
            </Link>
            <Link href="/sell-your-property" className="btn-secondary">
              Submit a Property
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
