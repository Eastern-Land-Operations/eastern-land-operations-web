import Link from 'next/link'
import Image from 'next/image'

const links = {
  company: [
    { href: '/about', label: 'About' },
    { href: '/operations', label: 'Operations' },
    { href: '/acquisition-criteria', label: 'Acquisition Criteria' },
  ],
  engage: [
    { href: '/sell-your-property', label: 'Sell Your Property' },
    { href: '/partner-with-us', label: 'Capital Inquiry' },
    { href: '/contact', label: 'Contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-graphite border-t border-gunmetal">
      <div className="max-w-screen-xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand col */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <Image
                src="/brand/elo-logo-white.svg"
                alt="Eastern Land Operations"
                width={64}
                height={40}
                className="block mb-4"
                style={{ objectFit: 'contain' }}
              />
              <p className="t-eyebrow mb-2">Eastern Land Operations</p>
            </div>
            <p className="t-body max-w-xs mb-8">
              Strategic land operator with institutional discipline. Tactical acquisitions.
              Redevelopment outcomes. Long-horizon ownership.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="tel:3026893912"
                className="t-caption hover:text-off-white transition-colors duration-150"
              >
                <span className="t-id mr-3">TEL</span>302-689-3912
              </a>
              <a
                href="mailto:contact@easternlandoperations.com"
                className="t-caption hover:text-off-white transition-colors duration-150"
              >
                <span className="t-id mr-3">EMAIL</span>contact@easternlandoperations.com
              </a>
            </div>
          </div>

          {/* Company links */}
          <div>
            <p className="t-eyebrow mb-6">Company</p>
            <ul className="flex flex-col gap-3">
              {links.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="t-body text-sm hover:text-off-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Engage links */}
          <div>
            <p className="t-eyebrow mb-6">Engage</p>
            <ul className="flex flex-col gap-3">
              {links.engage.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="t-body text-sm hover:text-off-white transition-colors duration-150"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-gunmetal flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="t-caption text-slate/60">
            &copy; {new Date().getFullYear()} Eastern Land Operations, LLC. All rights reserved.
          </p>
          <p className="t-id">
            Strategic Land Operator
          </p>
        </div>
      </div>
    </footer>
  )
}
