import type { Metadata } from 'next'
import OutreachForm from '@/components/OutreachForm'

export const metadata: Metadata = {
  title: 'Submit Opportunity',
  description:
    'Submit a property, partnership inquiry, or deal to Eastern Land Operations. We review all submissions and respond within one business day.',
}

export default function SubmitOpportunityPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24 bg-matte-black border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="max-w-2xl">
            <p className="t-eyebrow mb-8">Submit Opportunity</p>
            <div className="section-rule" />
            <h1 className="t-h1 mb-8" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
              Submit your inquiry.
            </h1>
            <p className="t-body" style={{ fontSize: '15px', lineHeight: '1.7' }}>
              Property to sell. Capital to deploy. Service to offer. Use this form for any
              inquiry that does not fit the focused pages. We review all submissions and
              respond to those that are a fit.
            </p>
          </div>
        </div>
      </section>

      {/* Info strip */}
      <section className="bg-graphite py-6 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-0 border border-gunmetal" style={{ borderRadius: '2px' }}>
            {[
              'Reviewed within one business day',
              'All submission types accepted',
              'No obligation or pressure',
              'Confidential — data not shared',
            ].map((item, i) => (
              <div
                key={item}
                className={`px-6 py-4 flex items-center gap-3 ${i < 3 ? 'border-b sm:border-b-0 sm:border-r border-gunmetal' : ''}`}
              >
                <span className="t-id text-xs flex-shrink-0">—</span>
                <span className="t-body text-xs">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-matte-black py-24">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Context */}
            <div>
              <p className="t-eyebrow mb-6">General Inquiry</p>
              <div className="section-rule" />
              <p className="t-body mb-8" style={{ fontSize: '15px', lineHeight: '1.7' }}>
                Select the submission type that best describes you, then fill in the
                relevant fields. The form adapts based on your role.
              </p>
              <div className="flex flex-col gap-6 border-t border-gunmetal pt-6">
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
              <OutreachForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
