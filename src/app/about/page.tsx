import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Eastern Land Operations is a strategic land operator with institutional discipline. Long-horizon ownership. Redevelopment focus.',
}

const principles = [
  {
    id: '01',
    title: 'Institutional discipline in a non-institutional space.',
    body: 'The residential and small commercial land market is dominated by operators who move on instinct. We apply the same rigor as an institutional buyer — underwriting, pipeline tracking, field intelligence — to transactions that institutional capital ignores.',
  },
  {
    id: '02',
    title: 'Long horizon over short cycle.',
    body: 'We are not optimized for volume. We are optimized for position quality. Every acquisition is evaluated for its long-term trajectory, not just its near-term flip potential. This changes what we buy, how we hold it, and how we exit.',
  },
  {
    id: '03',
    title: 'Subtraction over addition.',
    body: 'Most operators add complexity — more deals, more partners, more overhead. We subtract. Cleaner operations. Fewer but better acquisitions. Every element of the system exists because it earns its place.',
  },
  {
    id: '04',
    title: 'Field credibility is non-negotiable.',
    body: 'We walk properties. We read neighborhoods. We develop our own site intelligence — not from data portals, but from boots-on-the-ground observation. You cannot underwrite what you have not seen.',
  },
  {
    id: '05',
    title: 'Redevelopment as an outcome, not a renovation.',
    body: 'We do not flip houses. We reposition assets. The distinction is material. Every redevelopment decision starts with the exit and works backward through the scope. Nothing is done cosmetically. Everything is structural.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24 bg-matte-black border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="max-w-2xl">
            <p className="t-eyebrow mb-8">About</p>
            <div className="section-rule" />
            <h1 className="t-h1 mb-8" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
              Eastern Land Operations.
            </h1>
            <p className="t-body mb-6" style={{ fontSize: '15px', lineHeight: '1.7' }}>
              Eastern Land Operations is a tactical acquisitions operator focused on land and
              property redevelopment in the Greater Philadelphia region and surrounding markets.
            </p>
            <p className="t-body" style={{ fontSize: '15px', lineHeight: '1.7' }}>
              We are not a real estate agency. We are not a wholesaling operation. We are an
              operational entity — structured, disciplined, and built for long-horizon ownership.
              Every acquisition is a position. Every position is held until the right outcome.
            </p>
          </div>
        </div>
      </section>

      {/* Position statement */}
      <section className="bg-graphite py-20 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="border border-gunmetal p-12 max-w-3xl" style={{ borderRadius: '2px' }}>
            <p className="t-eyebrow mb-6">Position Statement</p>
            <div className="section-rule" />
            <blockquote
              className="t-display"
              style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}
            >
              &ldquo;Strategic land operator
              <br />
              with institutional discipline.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* Operating Principles */}
      <section className="bg-matte-black py-24 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <p className="t-eyebrow mb-6">Operating Principles</p>
          <div className="section-rule" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <h2 className="t-h2 text-2xl">
              The posture behind every decision.
            </h2>
            <p className="t-body" style={{ fontSize: '15px' }}>
              These are not values statements. They are operational constraints — rules that
              govern how we source, acquire, redevelop, and hold. They exist because we have
              seen what happens when they are violated.
            </p>
          </div>

          <div className="flex flex-col gap-0 border border-gunmetal" style={{ borderRadius: '2px' }}>
            {principles.map((p, i) => (
              <div
                key={p.id}
                className={`grid grid-cols-1 lg:grid-cols-4 gap-8 p-8 ${
                  i < principles.length - 1 ? 'border-b border-gunmetal' : ''
                }`}
              >
                <div className="lg:col-span-1">
                  <p className="t-id mb-2">{p.id}</p>
                  <h3 className="t-h3 text-sm leading-snug">{p.title}</h3>
                </div>
                <div className="lg:col-span-3">
                  <p className="t-body">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Is / Is Not */}
      <section className="bg-graphite py-24 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="t-eyebrow mb-6">ELO Is</p>
              <div className="section-rule" />
              <ul className="flex flex-col gap-0 border-t border-gunmetal">
                {[
                  'Strategic land operator',
                  'Institutional discipline',
                  'Redevelopment focus',
                  'Long-horizon ownership',
                  'Operational precision',
                  'Field credibility',
                ].map(item => (
                  <li key={item} className="t-h3 text-sm py-5 border-b border-gunmetal">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="t-eyebrow mb-6" style={{ color: 'var(--slate)' }}>ELO Is Not</p>
              <div className="section-rule" style={{ background: 'var(--gunmetal)' }} />
              <ul className="flex flex-col gap-0 border-t border-gunmetal">
                {[
                  'A real estate agency',
                  'A wholesaling operation',
                  'A startup brand',
                  'A luxury property developer',
                  'A high-volume flipper',
                  'An outdoors company',
                ].map(item => (
                  <li
                    key={item}
                    className="t-body py-5 border-b border-gunmetal"
                    style={{ textDecoration: 'line-through', textDecorationColor: 'var(--gunmetal)' }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-matte-black py-20">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/operations" className="btn-primary">
              View Operations Model
            </Link>
            <Link href="/contact" className="btn-secondary">
              Make Contact
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
