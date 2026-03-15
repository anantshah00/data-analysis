export default function Footer() {
  return (
    <footer className="bg-pl-purple text-white/60 mt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

          {/* Branding */}
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-pl-gold flex items-center justify-center text-pl-purple font-black text-sm select-none">
              A
            </span>
            <span className="text-white font-semibold text-sm">Anant's Portfolio</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-5 text-sm">
            <a
              href="https://github.com/anantshah00"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pl-gold transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/anant-a-shah/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pl-gold transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:anantshah00@gmail.com"
              className="hover:text-pl-gold transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Copyright */}
          <p className="text-xs text-white/40 text-center sm:text-right">
            © {new Date().getFullYear()} Anant · Built with Next.js & Plotly
          </p>
        </div>
      </div>
    </footer>
  )
}
