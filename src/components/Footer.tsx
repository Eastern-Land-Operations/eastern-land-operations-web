import Link from 'next/link'
import BrandLogo from './BrandLogo'

const links = {
  company: [
    { href: '/about', label: 'About' },
    { href: '/operations', label: 'Operations' },
    { href: '/acquisition-criteria', label: 'Acquisition Criteria' },
  ],
  engage: [
    { href: '/sell-your-property', label: 'Sell Your Property' },
    { href: '/partner-with-us', label: 'Investor Intake' },
    { href: '/contact', label: 'Contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-graphite border-t border-gunmetal">
      <div className="max-w-screen-xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <div className="mb-6">
              <BrandLogo
                variant="light"
                alt="Eastern Land Operations"
                width={78}
                height={48}
                className="block mb-4"
              />
              <p className="t-eyebrow mb-2">Eastern Land Operations</p>
            </div>
            <p className="t-body max-w-xs mb-8">
              Real estate acquisitions, redevelopment, and long-term ownership with a disciplined local approach.
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

        <div className="mt-16 pt-8 border-t border-gunmetal flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="t-caption text-slate/60">
            &copy; {new Date().getFullYear()} Eastern Land Operations, LLC. All rights reserved.
          </p>
          <p className="t-id">Real Estate Operations</p>
        </div>
      </div>
    </footer>
  )
}
