import type { Metadata } from 'next'
import SellerForm from '../../components/SellerForm'

export const metadata: Metadata = {
  title: 'Sell Your Property',
  description:
    'Seller property intake for Eastern Land Operations. Share your property details and goals, and we will follow up respectfully with possible next steps.',
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
  'Just exploring options',
] as const

const process = [
  {
    id: '01',
    step: 'Share the basics',
    desc: 'Tell us about the property, the situation, and what would be most helpful for you.',
  },
  {
    id: '02',
    step: 'We review',
    desc: 'Our team looks at the details, the location, and the operational reality of the property.',
  },
  {
    id: '03',
    step: 'We follow up',
    desc: 'If we need clarification, we reach out respectfully and keep the conversation straightforward.',
  },
  {
    id: '04',
    step: 'We outline options',
    desc: 'A direct purchase, a flexible timeline, or another path if that fits the situation better.',
  },
  {
    id: '05',
    step: 'You decide',
    desc: 'No pressure. No obligation. You decide whether any next step makes sense for you.',
  },
  {
    id: '06',
    step: 'We execute cleanly',
    desc: 'If there is a fit, we coordinate title, timing, and communication with a serious operator approach.',
  },
] as const

export default function SellYourPropertyPage() {
  return (
    <>
      <section className="pt-32 pb-24 bg-matte-black border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="max-w-2xl">
            <p className="t-eyebrow mb-8">Seller Property Intake</p>
            <div className="section-rule" />
            <h1 className="t-h1 mb-8">
              Tell us about
              <br />
              your property.
              <br />
              We&apos;ll review it
              <br />
              with care.
            </h1>
            <p className="t-body mb-8">
              If you are considering a sale, working through a difficult property situation, or
              just trying to understand your options, start here. We review each submission
              seriously and follow up with a respectful, clear response.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#form" className="btn-primary">
                Start Property Intake
              </a>
              <a href="tel:3026893912" className="btn-secondary">
                Call 302-689-3912
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-graphite py-16 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-gunmetal" style={{ borderRadius: '2px' }}>
            {[
              {
                title: 'Respectful follow-up',
                desc: 'We do not use aggressive cash-for-houses language or pressure tactics.',
              },
              {
                title: 'Options-aware',
                desc: 'The goal is not to force one outcome. It is to understand what fits your situation.',
              },
              {
                title: 'Careful review',
                desc: 'We review the property, timeline, and situation before outlining possible next steps.',
              },
              {
                title: 'Local context',
                desc: 'We look at neighborhoods, condition, and ownership context through a local operating lens.',
              },
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

      <section className="bg-matte-black py-24 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="t-eyebrow mb-6">Common Situations</p>
              <div className="section-rule" />
              <h2 className="t-h2 mb-6">
                We understand that
                <br />
                every property story is different.
              </h2>
              <p className="t-body">
                You do not need a polished story to reach out. If the property has problems, if
                the title is messy, or if you are still deciding what you want, that context is
                useful and welcome.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-gunmetal" style={{ borderRadius: '2px' }}>
              {situations.map((situation, index) => (
                <div
                  key={situation}
                  className={`px-6 py-4 flex items-center gap-3 ${
                    index % 2 === 0 ? 'border-r border-gunmetal' : ''
                  } ${
                    index < situations.length - 2 ? 'border-b border-gunmetal' : ''
                  }`}
                >
                  <span className="t-id text-xs flex-shrink-0">-</span>
                  <span className="t-body text-sm">{situation}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-graphite py-24 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <p className="t-eyebrow mb-6">How It Works</p>
          <div className="section-rule" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <h2 className="t-h2">A straightforward review process.</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border border-gunmetal" style={{ borderRadius: '2px' }}>
            {process.map((item, index) => (
              <div
                key={item.id}
                className={`p-8 ${
                  [0, 1, 3, 4].includes(index) ? 'border-b lg:border-b-0' : ''
                } ${
                  index % 3 !== 2 ? 'lg:border-r border-gunmetal' : ''
                } ${
                  index < 3 ? 'lg:border-b border-gunmetal' : ''
                } ${
                  [0, 2].includes(index) ? 'sm:border-r border-gunmetal' : ''
                } ${
                  index < 4 ? 'sm:border-b border-gunmetal' : ''
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

      <section id="form" className="bg-matte-black py-24">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.48fr)] gap-8 lg:gap-10 items-start">
            <div className="lg:sticky lg:top-28">
              <p className="t-eyebrow mb-6">Tell Us About Your Property</p>
              <div className="section-rule" />
              <h2 className="t-h2 mb-5">
                Clear intake.
                <br />
                Respectful follow-up.
              </h2>
              <p className="t-body mb-8">
                Use the intake to share the facts, the pressure points, and your ideal outcome.
                The more useful context you provide, the more specific and practical our follow-up can be.
              </p>

              <div className="border border-gunmetal/80 bg-graphite/25 p-5 mb-6" style={{ borderRadius: '2px' }}>
                <p className="t-eyebrow mb-4">What To Expect</p>
                <div className="space-y-3">
                  {[
                    'About 3 to 5 minutes to complete.',
                    'You can submit even without every detail.',
                    'Photos are optional, not required.',
                    'Follow-up is practical and low-pressure.',
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

            <div className="border border-gunmetal/90 bg-graphite/20 p-5 sm:p-7 lg:p-8" style={{ borderRadius: '2px' }}>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-gunmetal pb-5 mb-7">
                <div>
                  <p className="t-eyebrow mb-2">Property Intake</p>
                  <h3 className="t-h3 text-lg">Seller property questionnaire</h3>
                </div>
                <p className="t-caption max-w-xs">
                  Share what you know. We&apos;ll use follow-up to fill any gaps.
                </p>
              </div>

              <SellerForm embedded />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
