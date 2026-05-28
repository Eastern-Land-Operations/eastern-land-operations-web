import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Eastern Land Operations is a real estate acquisitions and redevelopment company focused on thoughtful buying, improvement, and long-term ownership.',
}

const principles = [
  {
    id: '01',
    title: 'Thoughtful decisions over rushed ones.',
    body: 'We take time to understand the property, the neighborhood, and the owner’s situation before deciding what makes sense.',
  },
  {
    id: '02',
    title: 'Long-term thinking over quick volume.',
    body: 'We are focused on quality opportunities, not just more activity. That affects what we buy, how we improve it, and whether we hold or sell.',
  },
  {
    id: '03',
    title: 'Simple systems over unnecessary complexity.',
    body: 'Clear communication, organized processes, and practical execution matter more than noise. We try to keep the process straightforward for everyone involved.',
  },
  {
    id: '04',
    title: 'Local knowledge matters.',
    body: 'We visit properties, study neighborhoods, and rely on direct observation instead of making assumptions from a distance.',
  },
  {
    id: '05',
    title: 'Improvement should serve a real outcome.',
    body: 'We focus on improvements that make a property more useful, more stable, and better positioned for the next stage of ownership or sale.',
  },
] as const

export default function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-24 bg-matte-black border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="max-w-2xl">
            <p className="t-eyebrow mb-8">About</p>
            <div className="section-rule" />
            <h1 className="t-h1 mb-8">Eastern Land Operations.</h1>
            <p className="t-body mb-6">
              Eastern Land Operations is a real estate acquisitions and redevelopment company
              focused on land and property opportunities in the Greater Philadelphia region and
              surrounding markets.
            </p>
            <p className="t-body">
              We are not a real estate agency. We buy, improve, and manage property with a
              disciplined long-term approach. Every property is evaluated carefully, and every
              next step is chosen with intention.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-graphite py-20 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="border border-gunmetal p-12 max-w-3xl" style={{ borderRadius: '2px' }}>
            <p className="t-eyebrow mb-6">Position Statement</p>
            <div className="section-rule" />
            <blockquote className="t-display" style={{ fontSize: 'clamp(24px, 3vw, 36px)' }}>
              &ldquo;Strategic land operator
              <br />
              with institutional discipline.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      <section className="bg-matte-black py-24 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <p className="t-eyebrow mb-6">How We Work</p>
          <div className="section-rule" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <h2 className="t-h2">The approach behind every decision.</h2>
            <p className="t-body">
              These are the working principles behind how we review opportunities, make
              decisions, and manage property over time.
            </p>
          </div>

          <div className="flex flex-col gap-0 border border-gunmetal" style={{ borderRadius: '2px' }}>
            {principles.map((item, index) => (
              <div
                key={item.id}
                className={`grid grid-cols-1 lg:grid-cols-4 gap-8 p-8 ${
                  index < principles.length - 1 ? 'border-b border-gunmetal' : ''
                }`}
              >
                <div className="lg:col-span-1">
                  <p className="t-id mb-2">{item.id}</p>
                  <h3 className="t-h3 text-sm leading-snug">{item.title}</h3>
                </div>
                <div className="lg:col-span-3">
                  <p className="t-body">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-graphite py-24 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <p className="t-eyebrow mb-6">What We Are</p>
              <div className="section-rule" />
              <ul className="flex flex-col gap-0 border-t border-gunmetal">
                {[
                  'Disciplined buyers',
                  'Long-term owners',
                  'Hands-on problem solvers',
                  'Redevelopment-minded',
                  'Locally informed',
                  'Direct and practical',
                ].map((item) => (
                  <li key={item} className="t-h3 text-sm py-5 border-b border-gunmetal">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="t-eyebrow mb-6" style={{ color: 'var(--slate)' }}>What We Are Not</p>
              <div className="section-rule" style={{ background: 'var(--gunmetal)' }} />
              <ul className="flex flex-col gap-0 border-t border-gunmetal">
                {[
                  'A real estate agency',
                  'A high-pressure sales operation',
                  'A high-volume flipper',
                  'A generic property brand',
                  'A one-size-fits-all buyer',
                  'A business built on noise',
                ].map((item) => (
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

      <section className="bg-matte-black py-20">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/operations" className="btn-primary">
              View How We Work
            </Link>
            <Link href="/contact" className="btn-secondary">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
