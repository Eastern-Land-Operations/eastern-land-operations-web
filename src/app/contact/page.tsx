import type { Metadata } from 'next'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact Eastern Land Operations. Submit a property, capital inquiry, or general message. We review all submissions and respond within one business day.',
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-24 bg-matte-black border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="max-w-2xl">
            <p className="t-eyebrow mb-8">Contact</p>
            <div className="section-rule" />
            <h1 className="t-h1 mb-8" style={{ fontSize: 'clamp(32px, 4vw, 52px)' }}>
              Make contact.
            </h1>
            <p className="t-body" style={{ fontSize: '15px', lineHeight: '1.7' }}>
              Property to submit. Capital to deploy. Question to ask. Use the form or reach
              us directly. We review every submission and respond to those that are a fit.
            </p>
          </div>
        </div>
      </section>

      {/* Contact + Form */}
      <section className="bg-graphite py-24 border-b border-gunmetal">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Direct contact */}
            <div>
              <p className="t-eyebrow mb-6">Direct</p>
              <div className="section-rule" />

              <div className="flex flex-col gap-8 mb-10">
                <div>
                  <p className="t-eyebrow mb-3" style={{ fontSize: '10px' }}>Phone</p>
                  <a
                    href="tel:3026893912"
                    className="t-mono text-base hover:text-olive transition-colors"
                  >
                    302-689-3912
                  </a>
                </div>
                <div>
                  <p className="t-eyebrow mb-3" style={{ fontSize: '10px' }}>Email</p>
                  <a
                    href="mailto:contact@easternlandoperations.com"
                    className="t-mono text-sm hover:text-olive transition-colors"
                  >
                    contact@easternlandoperations.com
                  </a>
                </div>
              </div>

              <div className="border-t border-gunmetal pt-8">
                <p className="t-eyebrow mb-4" style={{ fontSize: '10px' }}>Specific Inquiries</p>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/sell-your-property"
                    className="t-body text-sm hover:text-off-white transition-colors"
                  >
                    Property submission &rarr;
                  </Link>
                  <Link
                    href="/partner-with-us"
                    className="t-body text-sm hover:text-off-white transition-colors"
                  >
                    Capital inquiry &rarr;
                  </Link>
                </div>
              </div>

              <div className="border-t border-gunmetal pt-8 mt-8">
                <p className="t-eyebrow mb-3" style={{ fontSize: '10px' }}>Response Time</p>
                <p className="t-body text-sm">
                  We review all submissions within one business day. For urgent situations —
                  foreclosure dates, time-sensitive deals — call directly.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <p className="t-eyebrow mb-6">General Inquiry</p>
              <div className="section-rule" />
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Bottom strip */}
      <section className="bg-matte-black py-16">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-gunmetal" style={{ borderRadius: '2px' }}>
            <div className="p-8 sm:border-r border-gunmetal border-b sm:border-b-0">
              <p className="t-eyebrow mb-3" style={{ fontSize: '10px' }}>Property Owners</p>
              <p className="t-body text-sm mb-4">Any condition. Any situation.</p>
              <Link href="/sell-your-property" className="t-caption hover:text-off-white transition-colors">
                Submit property &rarr;
              </Link>
            </div>
            <div className="p-8 sm:border-r border-gunmetal border-b sm:border-b-0">
              <p className="t-eyebrow mb-3" style={{ fontSize: '10px' }}>Capital Partners</p>
              <p className="t-body text-sm mb-4">Underwritten. Operator-led.</p>
              <Link href="/partner-with-us" className="t-caption hover:text-off-white transition-colors">
                Capital inquiry &rarr;
              </Link>
            </div>
            <div className="p-8">
              <p className="t-eyebrow mb-3" style={{ fontSize: '10px' }}>Operations</p>
              <p className="t-body text-sm mb-4">Full-cycle land operator.</p>
              <Link href="/operations" className="t-caption hover:text-off-white transition-colors">
                View model &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
