import Link from 'next/link'

const TOOLS = [
  { name: 'Python',       icon: '🐍', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { name: 'SQL',          icon: '🗄️', color: 'bg-slate-50 text-slate-700 border-slate-200' },
  { name: 'R',            icon: '📉', color: 'bg-sky-50 text-sky-700 border-sky-200' },
  { name: 'Tableau',      icon: '📊', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { name: 'Power BI',     icon: '💡', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  { name: 'Pandas',       icon: '🐼', color: 'bg-green-50 text-green-700 border-green-200' },
  { name: 'Scikit-learn', icon: '🤖', color: 'bg-violet-50 text-violet-700 border-violet-200' },
  { name: 'Alteryx',      icon: '⚙️', color: 'bg-red-50 text-red-700 border-red-200' },
  { name: 'A/B Testing',  icon: '🧪', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  { name: 'Statistics',   icon: '📐', color: 'bg-rose-50 text-rose-700 border-rose-200' },
]

export default function Home() {
  return (
    <div>
      {/* ── Hero Section ──────────────────────────────────────────────────── */}
      <section className="hero-bg min-h-[92vh] flex flex-col items-center justify-center px-4 relative overflow-hidden">

        {/* Decorative orbs */}
        <div className="absolute top-24 right-16 w-64 h-64 bg-pl-gold/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-32 left-12 w-80 h-80 bg-indigo-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pl-pink/4 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-7">

          {/* Eyebrow */}
          <div className="animate-fade-in inline-flex items-center gap-2 pill bg-pl-gold/15 text-pl-gold border border-pl-gold/30 uppercase tracking-widest text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-pl-gold animate-pulse-slow" />
            Data Analytics · Sports · Machine Learning
          </div>

          {/* Title */}
          <h1 className="animate-fade-up text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.08] tracking-tight">
            Hi, I'm{' '}
            <span className="gold-text">Anant</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-fade-up [animation-delay:0.15s] text-lg sm:text-xl text-white/65 leading-relaxed max-w-xl mx-auto font-light">
            Technical Analyst at Wayfair · London. I turn raw data into clear
            stories — from YouTube campaign models to Premier League predictions.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up [animation-delay:0.25s] flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/project-premier-league"
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-pl-gold text-pl-purple font-bold text-sm shadow-lg hover:bg-amber-400 hover:scale-105 active:scale-100 transition-all duration-200"
            >
              View Featured Project →
            </Link>
            <a
              href="https://github.com/anantshah00"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3 rounded-xl border border-white/25 text-white font-semibold text-sm hover:bg-white/10 hover:border-white/40 transition-all duration-200"
            >
              GitHub ↗
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/30 animate-bounce">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div data-animate className="space-y-5">
            <span className="pill bg-pl-purple/10 text-pl-purple border border-pl-purple/20 uppercase tracking-widest text-[10px]">
              About me
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight">
              Turning noise into <span className="gradient-text">signal</span>
            </h2>
            <p className="text-gray-500 leading-relaxed">
              I'm a <strong className="text-gray-700">Technical Analyst at Wayfair</strong> in London,
              where I manage and optimise YouTube marketing campaigns using data-driven insights —
              running A/B tests, geo-lift studies, and building data pipelines that feed into
              Media Mix Modelling. I graduated from <strong className="text-gray-700">Babson College</strong> with
              a BS in Business Analytics &amp; Marketing, and spent a semester at IE Business School in Madrid.
            </p>
            <p className="text-gray-500 leading-relaxed">
              My career started in marketing, which gives me a rare edge: I understand both the business
              question <em>and</em> the data behind it. I work across Python, R, SQL, Tableau, and Power BI —
              and I co-founded the <strong className="text-gray-700">Babson Marketing Society</strong>, which grew
              to 350+ members during my time there.
            </p>
            <p className="text-gray-500 leading-relaxed">
              This portfolio showcases the analytical side of that journey — every chart is interactive,
              every insight is evidence-based, and every model is rigorously validated.
            </p>
            <a
              href="mailto:anantshah00@gmail.com"
              className="inline-flex items-center gap-2 text-sm font-semibold text-pl-purple hover:text-indigo-700 transition-colors"
            >
              anantshah00@gmail.com ↗
            </a>
          </div>

          {/* Stats */}
          <div data-animate data-delay="200" className="grid grid-cols-2 gap-4">
            {[
              { value: 'Wayfair',  label: 'Current employer',     icon: '🏢' },
              { value: '2+',       label: 'Years in analytics',   icon: '📈' },
              { value: '350+',     label: 'BMS members founded',  icon: '🎓' },
              { value: '70K+',     label: 'Campaign impressions', icon: '🚀' },
            ].map(({ value, label, icon }) => (
              <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-card text-center hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300">
                <div className="text-2xl mb-1.5">{icon}</div>
                <div className="text-2xl font-black gradient-text">{value}</div>
                <div className="text-xs font-medium text-gray-500 mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Project ──────────────────────────────────────────────── */}
      <section className="bg-white border-y border-gray-100 py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          <div data-animate className="text-center mb-12 space-y-2">
            <span className="pill bg-pl-purple/10 text-pl-purple border border-pl-purple/20 uppercase tracking-widest text-[10px]">
              Featured project
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900">
              Latest Work
            </h2>
          </div>

          {/* Project card */}
          <div data-animate data-delay="100" className="group relative bg-gradient-to-br from-pl-purple via-pl-purple-light to-indigo-900 rounded-3xl overflow-hidden shadow-2xl hover:shadow-[0_25px_60px_rgba(55,0,60,0.35)] transition-all duration-500">

            {/* Decorative shapes */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-pl-gold/10 rounded-full blur-3xl translate-x-16 -translate-y-16" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400/10 rounded-full blur-2xl -translate-x-12 translate-y-12" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 p-8 lg:p-12">

              {/* Text content */}
              <div className="flex-1 space-y-5">
                <div className="flex items-center gap-2">
                  <span className="pill bg-pl-gold/20 text-pl-gold border border-pl-gold/30 uppercase tracking-widest text-[10px]">
                    ⚽ Sports Analytics
                  </span>
                  <span className="pill bg-white/10 text-white/60 border border-white/10 text-[10px]">
                    Random Forest · xG · Python
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  How Can I Predict The Next<br />
                  <span className="gold-text">Winner of the Premier League?</span>
                </h3>

                <p className="text-white/60 leading-relaxed max-w-lg text-sm">
                  A full data science pipeline: exploratory analysis of 12 Premier League seasons,
                  xG differential modelling, and a Random Forest classifier that achieves{' '}
                  <strong className="text-white/90">95% ROC-AUC</strong> at identifying the title
                  winner from performance metrics alone.
                </p>

                {/* Feature pills */}
                <div className="flex flex-wrap gap-2">
                  {['Goal Difference', 'xG Differential', 'Clean Sheets', 'Squad Value', 'Possession %'].map(f => (
                    <span key={f} className="pill bg-white/10 text-white/70 border border-white/10 text-[10px]">
                      {f}
                    </span>
                  ))}
                </div>

                <Link
                  href="/project-premier-league"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-pl-gold text-pl-purple font-bold text-sm rounded-xl hover:bg-amber-400 hover:scale-105 active:scale-100 transition-all duration-200 shadow-lg shadow-pl-gold/20"
                >
                  Explore Project
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>

              {/* Mini chart preview */}
              <div className="w-full lg:w-64 xl:w-80 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5 space-y-3">
                <p className="text-white/50 text-xs font-semibold uppercase tracking-wide">Model Results</p>
                {[
                  { label: 'Logistic Regression', auc: 89.2, w: 'w-[74%]', color: 'bg-indigo-400' },
                  { label: 'Gradient Boosting',   auc: 93.7, w: 'w-[84%]', color: 'bg-violet-400' },
                  { label: 'Random Forest',        auc: 95.1, w: 'w-[91%]', color: 'bg-pl-gold'    },
                ].map(({ label, auc, w, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-[10px] text-white/60 mb-1">
                      <span>{label}</span>
                      <span className="text-white/90 font-mono font-semibold">{auc}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className={`h-full ${w} ${color} rounded-full transition-all duration-1000`} />
                    </div>
                  </div>
                ))}
                <p className="text-white/30 text-[10px] pt-1">ROC-AUC · 5-fold Stratified CV</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tech Stack ────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-10" data-animate>
          <span className="pill bg-pl-purple/10 text-pl-purple border border-pl-purple/20 uppercase tracking-widest text-[10px]">
            Skills & tools
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mt-3">
            The Stack
          </h2>
        </div>

        <div data-animate data-delay="100" className="flex flex-wrap justify-center gap-3">
          {TOOLS.map(({ name, icon, color }) => (
            <span key={name} className={`pill border text-sm font-semibold px-4 py-2 rounded-xl ${color}`}>
              <span>{icon}</span> {name}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}
