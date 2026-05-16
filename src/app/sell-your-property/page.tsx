import type { Metadata } from 'next'
import SellerForm from '@/components/SellerForm'

export const metadata: Metadata = {
  title: 'Sell Your Property',
  description:
    'Submit your property to Eastern Land Operations. Any condition, any situation. We evaluate every submission and respond within one business day.',
}

const situations = [
  'Inherited property',
  'Tired landlord',
  'Vacant home',
  'Code violations',
  'Tax delinquency',
  'Pre-foreclosure',
  'Needs significant repairs',
  'Tenant complications',
  'Cleanout required',
  'Estate / probate',
  'Divorce settlement',
  'As-is, fast close desired',
]

const process = [
  {
    id: '01',
    step: 'Submit',
    desc: 'Fill out the form with your property details and situation. The more context you provide, the faster we evaluate.',
  },
  {
    id: '02',
    step: 'We review',
    desc: 'Our team reviews every submission. We follow up within one business day to discuss and schedule a walkthrough if appropriate.',
  },
  {
    id: '03',
    step: 'We walk',
    desc: 'We assess condition, value, and the full picture — title, liens, situation, your goals. No remote closings without field verification.',
  },
  {
    id: '04',
    step: 'We present a path',
    desc: 'A direct purchase, creative structure, or another option if it fits better. We present what makes sense for your situation, not just what works for ours.',
  },
  {
    id: '05',
    step: 'You decide',
    desc: 'No pressure. No fees. No obligation. If our offer works for you, we move forward. If not, that\'s also fine.',
  },
  {
    id: '06',
    step: 'We close',
    desc: 'We coordinate everything — title, escrow, paperwork. You pick the closing date within reason and we execute.',
  },
]

export default function SellYourPropertyPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24 bg-matte-black border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="max-w-2xl">
            <p className="t-eyebrow mb-8">Property Owners</p>
            <div className="section-rule" />
            <h1 className="t-h1 mb-8" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
              Submit your property.
              <br />
              Any condition.
              <br />
              Any situation.
            </h1>
            <p className="t-body mb-8" style={{ fontSize: '15px', lineHeight: '1.7' }}>
              We evaluate properties directly from owners — as-is, no repairs required. We work
              with your timeline, look at the full picture, and present the best path forward.
              No obligation. No predatory tactics. No pressure to sign anything.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#form" className="btn-primary">
                Submit Your Property
              </a>
              <a href="tel:3026893912" className="btn-secondary">
                Call 302-689-3912
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Key points */}
      <section className="bg-graphite py-16 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-gunmetal" style={{ borderRadius: '2px' }}>
            {[
              { title: 'No repairs needed', desc: 'We purchase as-is. You do not need to fix, clean, or stage anything.' },
              { title: 'No commissions', desc: 'Direct sale means no listing fees, no agent commissions, no hidden costs.' },
              { title: 'Your timeline', desc: 'We can close fast when needed or work with an extended timeline. Your call.' },
              { title: 'Creative structures', desc: 'If a standard sale does not fit, we evaluate other options — subject-to, installment, lease-option.' },
            ].map((item, i) => (
              <div
                key={item.title}
                className={`p-8 ${i < 3 ? 'border-b sm:border-b-0 lg:border-b-0 border-r-0 sm:border-r lg:border-r border-gunmetal' : ''}`}
              >
                <div className="w-6 h-0.5 bg-olive mb-4" />
                <h3 className="t-h3 text-sm mb-2">{item.title}</h3>
                <p className="t-body text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Situations */}
      <section className="bg-matte-black py-24 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="t-eyebrow mb-6">Situations We Handle</p>
              <div className="section-rule" />
              <h2 className="t-h2 text-2xl mb-6">
                Whatever the situation,
                <br />
                describe it.
              </h2>
              <p className="t-body" style={{ fontSize: '15px', lineHeight: '1.7' }}>
                Every situation is different. We have seen a lot. Whatever you are dealing with,
                tell us about it — we will evaluate it honestly and tell you whether we can help
                and how.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-gunmetal" style={{ borderRadius: '2px' }}>
              {situations.map((s, i) => (
                <div
                  key={s}
                  className={`px-6 py-4 flex items-center gap-3 ${
                    i % 2 === 0 ? 'border-r border-gunmetal' : ''
                  } ${
                    i < situations.length - 2 ? 'border-b border-gunmetal' : ''
                  }`}
                >
                  <span className="t-id text-xs flex-shrink-0">—</span>
                  <span className="t-body text-sm">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-graphite py-24 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <p className="t-eyebrow mb-6">The Process</p>
          <div className="section-rule" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <h2 className="t-h2 text-2xl">
              Straightforward. No surprises.
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-gunmetal" style={{ borderRadius: '2px' }}>
            {process.map((item, i) => (
              <div
                key={item.id}
                className={`p-8 ${
                  [0,1,3,4].includes(i) ? 'border-b lg:border-b-0' : ''
                } ${
                  i % 3 !== 2 ? 'lg:border-r border-gunmetal' : ''
                } ${
                  i < 3 ? 'lg:border-b border-gunmetal' : ''
                } ${
                  [0, 2].includes(i) ? 'sm:border-r border-gunmetal' : ''
                } ${
                  i < 4 ? 'sm:border-b border-gunmetal' : ''
                }`}
              >
                <p className="t-id mb-3">{item.id}</p>
                <h3 className="t-h3 text-sm mb-2">{item.step}</h3>
                <p className="t-body text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="form" className="bg-matte-black py-24">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Left: context */}
            <div>
              <p className="t-eyebrow mb-6">Submit Your Property</p>
              <div className="section-rule" />
              <p className="t-body mb-8" style={{ fontSize: '15px', lineHeight: '1.7' }}>
                Fill out the form and our team will be in touch within one business day.
                No commitment, no pressure — just an honest evaluation.
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

            {/* Form */}
            <div className="lg:col-span-2">
              <SellerForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
