import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Navbar() {
  const router   = useRouter()
  const [open, setOpen] = useState(false)

  const links = [
    { href: '/',                        label: 'Home' },
    { href: '/project-premier-league', label: 'PL Predictor' },
  ]

  const isActive = (href) =>
    href === '/' ? router.pathname === '/' : router.pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-50 bg-pl-purple/95 backdrop-blur-md border-b border-white/10 shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">

        {/* Logo / name */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="w-7 h-7 rounded-lg bg-pl-gold flex items-center justify-center text-pl-purple font-black text-sm select-none">
            A
          </span>
          <span className="text-white font-semibold text-sm tracking-wide group-hover:text-pl-gold transition-colors">
            Anant
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden sm:flex items-center gap-1">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(href)
                    ? 'bg-white/15 text-white'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href="https://github.com/anantshah00"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-3.5 py-1.5 rounded-lg text-sm font-medium text-pl-gold border border-pl-gold/40 hover:bg-pl-gold/10 transition-all duration-200"
            >
              GitHub ↗
            </a>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden p-1.5 rounded-md text-white/70 hover:text-white hover:bg-white/10 transition"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="sm:hidden border-t border-white/10 bg-pl-purple/98 px-4 py-3 space-y-1">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive(href)
                  ? 'bg-white/15 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {label}
            </Link>
          ))}
          <a
            href="https://github.com/anantshah00"
            target="_blank"
            rel="noopener noreferrer"
            className="block px-3 py-2 text-sm font-medium text-pl-gold hover:bg-white/10 rounded-lg transition-colors"
          >
            GitHub ↗
          </a>
        </div>
      )}
    </header>
  )
}
