'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import BrandLogo from './BrandLogo'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/operations', label: 'Operations' },
  { href: '/acquisition-criteria', label: 'Acquisition Criteria' },
  { href: '/sell-your-property', label: 'Sell Property' },
  { href: '/partner-with-us', label: 'Investor Intake' },
  { href: '/contact', label: 'Contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'bg-matte-black border-b border-gunmetal'
          : 'bg-matte-black'
      }`}
    >
      <nav className="max-w-screen-xl mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* Emblem */}
          <Link href="/" className="flex-shrink-0" aria-label="Eastern Land Operations">
            <BrandLogo
              variant="light"
              alt="Eastern Land Operations"
              width={70}
              height={43}
              priority
              className="block"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${pathname === link.href ? 'active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link
              href="/sell-your-property"
              className="btn-secondary"
              style={{ padding: '10px 20px' }}
            >
              Submit Property
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-slate hover:text-off-white transition-colors"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <div className="w-5 flex flex-col gap-1.5">
              <span
                className={`block h-px bg-current transition-all duration-200 origin-center ${
                  mobileOpen ? 'rotate-45 translate-y-[7px]' : ''
                }`}
              />
              <span
                className={`block h-px bg-current transition-all duration-200 ${
                  mobileOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block h-px bg-current transition-all duration-200 origin-center ${
                  mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden bg-graphite border-t border-gunmetal transition-all duration-200 overflow-hidden ${
          mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-8 py-6 flex flex-col gap-0">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link py-4 border-b border-gunmetal last:border-0 ${
                pathname === link.href ? 'active' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-6">
            <Link href="/sell-your-property" className="btn-primary w-full text-center">
              Submit Property
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
