import Link from 'next/link'
import dynamic from 'next/dynamic'
import StatCard from '../components/StatCard'
import InsightCard from '../components/InsightCard'
import {
  correlationChart,
  scatterChart,
  ppdaScatterChart,
  advancedMetricsChart,
  importanceChart,
  radarChart,
  predictionChart,
  MODEL_RESULTS,
} from '../data/chart_data'

const PlotlyChart = dynamic(() => import('../components/PlotlyChart'), { ssr: false })

function SectionHeader({ eyebrow, title, subtitle, center = false }) {
  return (
    <div data-animate className={`space-y-2 mb-10 ${center ? 'text-center' : ''}`}>
      {eyebrow && (
        <span className="pill bg-pl-purple/10 text-pl-purple border border-pl-purple/20 uppercase tracking-widest text-[10px]">
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">{title}</h2>
      {subtitle && <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">{subtitle}</p>}
    </div>
  )
}

const FEATURES = [
  { feature: 'goal_diff',          description: 'Season N goals scored − goals conceded',                  type: 'int',   source: 'Derived' },
  { feature: 'xg_diff',            description: 'Season N expected goals for − xG against',                type: 'float', source: 'FBref'   },
  { feature: 'ppda',               description: 'Season N Passes Per Defensive Action – lower = more press',type: 'float', source: 'FBref'   },
  { feature: 'progressive_passes', description: 'Season N passes advancing ball ≥10 yds toward goal /90',  type: 'float', source: 'FBref'   },
  { feature: 'high_press_rec',     description: 'Season N ball recoveries in final third per 90 min',      type: 'float', source: 'FBref'   },
  { feature: 'consistency_pct',    description: 'Season N % of matches won when leading at half-time',     type: 'float', source: 'Derived' },
  { feature: 'clean_sheets',       description: 'Season N matches with no goals conceded',                 type: 'int',   source: 'football-data.co.uk' },
  { feature: 'goals_scored',       description: 'Season N total league goals scored',                      type: 'int',   source: 'football-data.co.uk' },
  { feature: 'squad_value_m',      description: 'Season N squad market value (€M) – sticky cross-season',  type: 'float', source: 'Transfermarkt' },
  { feature: 'win_rate',           description: 'Season N wins / 38 matches',                              type: 'float', source: 'Derived' },
  { feature: 'champion_n1',        description: 'Label: 1 = won the title in Season N+1, 0 = did not',    type: 'int',   source: 'Label'   },
]

// 2024-25 full-season stats used as Season N input to predict 2025-26
const SEASON_N = [
  { team: 'Liverpool',       pts: 79, ppda: 8.2,  progPass: 66.5, consistency: 93, sqv: 920,  gd: 62,  prob: 37, color: '#C8102E' },
  { team: 'Arsenal',         pts: 67, ppda: 8.8,  progPass: 72.0, consistency: 86, sqv: 820,  gd: 48,  prob: 28, color: '#EF0107' },
  { team: 'Man City',        pts: 62, ppda: 9.3,  progPass: 61.2, consistency: 71, sqv: 900,  gd: 20,  prob: 18, color: '#6CABDD' },
  { team: 'Chelsea',         pts: 63, ppda: 10.1, progPass: 64.2, consistency: 81, sqv: 1050, gd: 35,  prob: 10, color: '#034694' },
  { team: 'Newcastle',       pts: 59, ppda: 11.0, progPass: 57.1, consistency: 77, sqv: 580,  gd: 28,  prob: 4,  color: '#000000' },
  { team: 'Nottm Forest',    pts: 60, ppda: 12.5, progPass: 44.5, consistency: 80, sqv: 280,  gd: 12,  prob: 3,  color: '#CC0000' },
]

export default function PremierLeaguePage() {
  return (
    <div className="bg-surface">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="project-hero-bg py-20 px-4 relative overflow-hidden">
        <div className="absolute top-10 right-20 w-56 h-56 bg-pl-gold/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-indigo-500/8 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-5">
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/60">Projects</span>
            <span>/</span>
            <span className="text-pl-gold/80">Premier League Predictor</span>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="pill bg-pl-gold/20 text-pl-gold border border-pl-gold/30 uppercase tracking-widest text-[10px]">
              ⚽ Sports Analytics
            </span>
            {['Python', 'Pandas', 'Random Forest', 'PPDA', 'Lagged Model', 'xG'].map(tag => (
              <span key={tag} className="pill bg-white/10 text-white/60 border border-white/10 text-[10px]">{tag}</span>
            ))}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            How Can I Predict The Next<br />
            <span className="gold-text">Winner of the Premier League?</span>
          </h1>

          <p className="text-white/60 text-base leading-relaxed max-w-2xl">
            A 12-season lagged analysis: which metrics from Season N most reliably
            predict the champion in Season N+1? The answer reshuffles the rankings –
            Squad Value and pressing intensity become the stickiest cross-season signals,
            while raw Goal Difference loses much of its power.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            {[
              { href: '#overview',      label: 'Overview'   },
              { href: '#dataset',       label: 'Dataset'    },
              { href: '#visualizations',label: 'Charts'     },
              { href: '#insights',      label: 'Insights'   },
              { href: '#model',         label: 'Model'      },
              { href: '#prediction',    label: '2025–26 ↓'  },
            ].map(({ href, label }) => (
              <a key={href} href={href}
                className="text-xs font-medium text-white/50 hover:text-pl-gold transition-colors border-b border-white/20 hover:border-pl-gold/50 pb-0.5">
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stat Cards ───────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-20 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard value="11"   label="Season Pairs"       sublabel="N → N+1 training pairs"   icon="🔁" delay="0"   />
          <StatCard value="0.74" label="Top Lagged r"       sublabel="Squad Value (€M)"          icon="💶" delay="100" />
          <StatCard value="90%"  label="Model ROC-AUC"      sublabel="Random Forest, 5-fold CV"  icon="🎯" delay="200" />
          <StatCard value="37%"  label="2025–26 Favourite"  sublabel="Liverpool (defending)"     icon="🏆" delay="300" />
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 pb-28">

        {/* ── 1. Overview ──────────────────────────────────────────────────── */}
        <section id="overview">
          <SectionHeader
            eyebrow="01 – Overview"
            title="The Problem"
            subtitle="Predicting the current-season winner is easy in hindsight. The harder and more useful question: can last season's process metrics reliably predict who wins next season?"
          />

          <div className="grid md:grid-cols-2 gap-8">
            <div data-animate className="bg-white rounded-2xl p-7 border border-gray-100 shadow-card space-y-4">
              <h3 className="font-bold text-gray-800">Why lagged prediction?</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                In-season models explain a result that's already happening. A lagged model –
                training on Season N stats to predict Season N+1 outcomes – is genuinely
                predictive. It's the kind of question a Director of Football asks before the
                transfer window opens: <em>are we structurally built to win next year?</em>
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                The analytical payoff is that the predictor rankings change significantly.
                Metrics that are <strong>structurally persistent</strong> (squad investment,
                pressing systems) become more important; one-off performance peaks become less.
              </p>
            </div>

            <div data-animate data-delay="100" className="bg-white rounded-2xl p-7 border border-gray-100 shadow-card space-y-4">
              <h3 className="font-bold text-gray-800">Research questions</h3>
              <ol className="space-y-3 text-sm text-gray-500 list-none">
                {[
                  'Which Season N metric is the best predictor of Season N+1 points?',
                  'Does Squad Value outperform Goal Difference in a cross-season model?',
                  'Are pressing metrics (PPDA) stickier than outcome metrics year-to-year?',
                  'Who does the lagged model favour for the 2025–26 title?',
                ].map((q, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="w-5 h-5 rounded-full bg-pl-purple/10 text-pl-purple text-xs font-bold flex-shrink-0 flex items-center justify-center mt-0.5">
                      {i + 1}
                    </span>
                    {q}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* ── 2. Dataset ───────────────────────────────────────────────────── */}
        <section id="dataset">
          <SectionHeader
            eyebrow="02 – Data"
            title="Dataset Description"
            subtitle="Season-level aggregates for the top-5 finishing teams, 2012–13 to 2023–24. Each row is a (Season N stats, Season N+1 champion label) pair – 11 pairs, ~55 observations."
          />

          <div data-animate className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { name: 'football-data.co.uk', desc: 'Match results, shots, goals, cards – free CSVs back to 1993', icon: '📋', color: 'border-blue-200 bg-blue-50/50' },
              { name: 'FBref.com',            desc: 'PPDA, progressive passes, high press recoveries, xG zones', icon: '⚽', color: 'border-green-200 bg-green-50/50' },
              { name: 'Transfermarkt',        desc: 'Squad market values (€M) per season – the stickiest predictor', icon: '💶', color: 'border-amber-200 bg-amber-50/50' },
            ].map(({ name, desc, icon, color }) => (
              <div key={name} data-animate className={`rounded-2xl p-5 border ${color} space-y-2`}>
                <div className="text-2xl">{icon}</div>
                <h4 className="font-semibold text-gray-800 text-sm">{name}</h4>
                <p className="text-gray-500 text-xs">{desc}</p>
              </div>
            ))}
          </div>

          <div data-animate className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 text-sm">Feature Reference</h3>
              <span className="text-xs text-gray-400">{FEATURES.length} features · Season N → N+1 pairs</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-gray-400 uppercase tracking-wide text-[10px]">
                    <th className="px-5 py-3 text-left font-semibold">Feature</th>
                    <th className="px-5 py-3 text-left font-semibold">Description</th>
                    <th className="px-5 py-3 text-left font-semibold">Type</th>
                    <th className="px-5 py-3 text-left font-semibold">Source</th>
                  </tr>
                </thead>
                <tbody>
                  {FEATURES.map(({ feature, description, type, source }) => (
                    <tr key={feature} className="border-t border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-2.5 font-mono text-pl-purple font-medium text-[11px]">{feature}</td>
                      <td className="px-5 py-2.5 text-gray-600">{description}</td>
                      <td className="px-5 py-2.5">
                        <span className={`pill text-[9px] ${type === 'int' ? 'bg-blue-50 text-blue-600 border-blue-200' : 'bg-purple-50 text-purple-600 border-purple-200'}`}>
                          {type}
                        </span>
                      </td>
                      <td className="px-5 py-2.5 text-gray-400">{source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── 3. Visualizations ────────────────────────────────────────────── */}
        <section id="visualizations">
          <SectionHeader
            eyebrow="03 – EDA"
            title="Exploratory Analysis"
            subtitle="Six interactive charts exploring the lagged relationships. Each data point pairs a team's Season N metrics with their Season N+1 outcome."
          />

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div data-animate>
              <PlotlyChart
                title="Lagged Correlations – Season N → Season N+1 Points"
                subtitle="Squad Value rises to #1 · Goal Difference drops from r=0.97 (in-season) to r=0.65 · hover for exact values"
                data={correlationChart.data}
                layout={correlationChart.layout}
              />
            </div>
            <div data-animate data-delay="100">
              <PlotlyChart
                title="Previous Season GD → Next Season Points"
                subtitle="Gold stars = teams that won the title in Season N+1 · bubble size = squad value"
                data={scatterChart.data}
                layout={scatterChart.layout}
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div data-animate>
              <PlotlyChart
                title="Previous Season PPDA → Next Season Points"
                subtitle="x-axis reversed – left = more aggressive press · Leicester 2015→16 annotated"
                data={ppdaScatterChart.data}
                layout={ppdaScatterChart.layout}
              />
            </div>
            <div data-animate data-delay="100">
              <PlotlyChart
                title="Pre-title Season Profile – Process Metrics"
                subtitle="Season N averages for teams that went on to win in Season N+1 vs everyone else"
                data={advancedMetricsChart.data}
                layout={advancedMetricsChart.layout}
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div data-animate>
              <PlotlyChart
                title="Lagged Random Forest Feature Importances"
                subtitle="Squad Value rises from 3% to 22% · PPDA holds at 17% · Goal Difference drops to 13%"
                data={importanceChart.data}
                layout={importanceChart.layout}
              />
            </div>
            <div data-animate data-delay="100">
              <PlotlyChart
                title="Pre-title Season Statistical Profile"
                subtitle="Normalised 0–100 · the Season N fingerprint of teams that won the title in Season N+1"
                data={radarChart.data}
                layout={radarChart.layout}
              />
            </div>
          </div>
        </section>

        {/* ── 4. Key Insights ──────────────────────────────────────────────── */}
        <section id="insights">
          <SectionHeader
            eyebrow="04 – Findings"
            title="Key Insights"
            subtitle="Five conclusions from the lagged analysis – several of which directly contradict what you'd find in an in-season model."
            center
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <InsightCard
              icon="💶"
              accent="gold"
              title="Squad Value Is the #1 Cross-Season Predictor"
              description="In the lagged model, Squad Value (r=0.74) outranks Goal Difference (r=0.65). Investment is structurally persistent – you can't rebuild a squad in one window. It was ranked #9 in the in-season model."
              delay="0"
            />
            <InsightCard
              icon="🔥"
              accent="purple"
              title="Pressing Systems Are Sticky"
              description="PPDA holds a lagged r of –0.63 vs –0.68 in-season – it barely drops. Tactical pressing systems (Klopp's Liverpool, Guardiola's City) persist for years, making them unusually reliable leading indicators."
              delay="100"
            />
            <InsightCard
              icon="📉"
              accent="indigo"
              title="Goal Difference Is Volatile Between Seasons"
              description="GD drops from r=0.97 (in-season) to r=0.65 (lagged) – the biggest fall of any metric. A great goal difference season can be driven by fixture luck, opponent weakness, or an injury-free run that doesn't repeat."
              delay="200"
            />
            <InsightCard
              icon="⚠️"
              accent="emerald"
              title="The Leicester Caveat Holds"
              description="Leicester 2016 remain an outlier in both models: PPDA of 14.2 and squad value of €58M in 2014–15, yet they won the next season. Low-block counter-attack can defeat structure – but it's a 1-in-100 anomaly."
              delay="0"
            />
            <InsightCard
              icon="🎯"
              accent="rose"
              title="90 Points Still Wins the Title"
              description="Regardless of model type, the points threshold holds: since 2013, the average winning total is 91.5. The lagged model is used to identify candidates; 90+ points is still the target for any realistic champion."
              delay="100"
            />
          </div>

          <div data-animate data-delay="200" className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-semibold text-gray-800 text-sm">Lagged vs In-Season Predictor Rankings</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-gray-400 uppercase tracking-wide text-[10px] border-b border-gray-100">
                    <th className="px-5 py-3 text-left">Variable</th>
                    <th className="px-5 py-3 text-left">In-Season r</th>
                    <th className="px-5 py-3 text-left">Lagged r (N→N+1)</th>
                    <th className="px-5 py-3 text-left">Drop</th>
                    <th className="px-5 py-3 text-left">Why it changes</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { var:'Squad Value (€M)',     inSeason:'0.72', lagged:'0.74', drop:'↑+0.02', why:'Investment is sticky',               color:'text-emerald-600' },
                    { var:'PPDA (Pressing)',       inSeason:'–0.68',lagged:'–0.63',drop:'–0.05', why:'Tactical systems persist for years',  color:'text-emerald-600' },
                    { var:'Win Rate',              inSeason:'0.97', lagged:'0.55', drop:'–0.42', why:'Performance volatile without context', color:'text-amber-600' },
                    { var:'Goal Difference',       inSeason:'0.97', lagged:'0.65', drop:'–0.32', why:'Fixture luck & injuries reset',        color:'text-amber-600' },
                    { var:'xG Differential',       inSeason:'0.95', lagged:'0.62', drop:'–0.33', why:'xG over-performance regresses',        color:'text-amber-600' },
                    { var:'Progressive Passes/90', inSeason:'0.71', lagged:'0.58', drop:'–0.13', why:'Moderate drop – style persists',       color:'text-blue-600' },
                    { var:'Consistency %',         inSeason:'0.74', lagged:'0.51', drop:'–0.23', why:'Mental form shifts with squad changes', color:'text-amber-600' },
                    { var:'Possession %',          inSeason:'0.54', lagged:'0.38', drop:'–0.16', why:'Weakest in both models',               color:'text-gray-400' },
                  ].map(({ var: v, inSeason, lagged, drop, why, color }) => (
                    <tr key={v} className="border-t border-gray-50 hover:bg-gray-50/40 transition-colors">
                      <td className="px-5 py-2.5 font-semibold text-gray-800">{v}</td>
                      <td className="px-5 py-2.5 font-mono text-gray-500">{inSeason}</td>
                      <td className="px-5 py-2.5 font-mono font-semibold text-pl-purple">{lagged}</td>
                      <td className={`px-5 py-2.5 font-mono font-medium ${color}`}>{drop}</td>
                      <td className="px-5 py-2.5 text-gray-400">{why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── 5. Model ─────────────────────────────────────────────────────── */}
        <section id="model">
          <SectionHeader
            eyebrow="05 – Modelling"
            title="How the Model Works"
            subtitle="A binary classifier trained on (Season N stats → Season N+1 champion) pairs. 11 training pairs, 10-feature input, stratified cross-validation."
          />

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            <div data-animate className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card space-y-4">
              <div className="w-10 h-10 rounded-xl bg-pl-purple/10 text-pl-purple flex items-center justify-center text-xl">🔁</div>
              <h3 className="font-bold text-gray-800">Lagged Structure</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                For each season pair (N, N+1), team stats from Season N are used as features
                and whether that team won the title in Season N+1 is the binary label.
                This creates 11 pairs (2013→2014 through 2023→2024), yielding ~55 observations.
              </p>
              <div className="bg-gray-50 rounded-xl p-3 text-center">
                <code className="text-[10px] text-pl-purple font-mono">Season N stats → Season N+1 champion?</code>
              </div>
            </div>

            <div data-animate data-delay="100" className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl">📊</div>
              <h3 className="font-bold text-gray-800">10 Input Features</h3>
              <div className="space-y-1.5">
                {[
                  'goal_diff', 'xg_diff', 'ppda',
                  'progressive_passes', 'high_press_rec',
                  'consistency_pct', 'clean_sheets',
                  'squad_value_m', 'win_rate', 'goals_scored',
                ].map(f => (
                  <div key={f} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pl-purple/40" />
                    <code className="text-[10px] text-gray-600 font-mono">{f}</code>
                  </div>
                ))}
              </div>
            </div>

            <div data-animate data-delay="200" className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">✅</div>
              <h3 className="font-bold text-gray-800">Evaluation</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                <strong>Stratified K-Fold</strong> (k=5) preserves the 1:4 champion ratio
                in each fold. <strong>ROC-AUC</strong> is the primary metric – better suited
                to class imbalance than accuracy. Lower AUC vs the in-season model (0.90 vs
                0.96) is expected: predicting the future is harder than explaining the present.
              </p>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
                <div className="text-xs text-emerald-600 font-medium">Hold-out test: 2023 stats → 2024 winner ✓</div>
              </div>
            </div>
          </div>

          <div data-animate className="bg-white rounded-2xl p-7 border border-gray-100 shadow-card">
            <h3 className="font-bold text-gray-800 mb-5">Cross-Validated ROC-AUC by Model (Lagged)</h3>
            <div className="space-y-4">
              {MODEL_RESULTS.map(({ model, auc, std, color }) => (
                <div key={model}>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="text-sm font-medium text-gray-700">{model}</span>
                    <span className="font-mono text-sm font-bold" style={{ color }}>
                      {(auc * 100).toFixed(1)}%{' '}
                      <span className="text-gray-400 font-normal text-xs">±{(std * 100).toFixed(1)}%</span>
                    </span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${auc * 100}%`, background: `linear-gradient(90deg, ${color}88, ${color})` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4">
              5-fold Stratified CV · lower than in-season model (0.96) because predicting the future is inherently harder · values above 0.85 indicate strong discrimination
            </p>
          </div>
        </section>

        {/* ── 6. 2025–26 Prediction ────────────────────────────────────────── */}
        <section id="prediction">
          <SectionHeader
            eyebrow="06 – Prediction"
            title="Who Wins the 2025–26 Title?"
            subtitle="The lagged model uses 2024-25 full-season stats as Season N input to output 2025–26 championship probabilities."
          />

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            <div data-animate>
              <PlotlyChart
                title="2025–26 Championship Probability"
                subtitle="Output of lagged Random Forest · trained on Season N → Season N+1 pairs · hover for 2024–25 points"
                data={predictionChart.data}
                layout={predictionChart.layout}
              />
            </div>

            <div data-animate data-delay="100" className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden self-start">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm">2024-25 Season N Input Metrics</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-gray-400 uppercase tracking-wide text-[10px] border-b border-gray-100">
                      <th className="px-4 py-3 text-left">Team</th>
                      <th className="px-4 py-3 text-right">Pts</th>
                      <th className="px-4 py-3 text-right">PPDA</th>
                      <th className="px-4 py-3 text-right">Sqd €M</th>
                      <th className="px-4 py-3 text-right">GD</th>
                      <th className="px-4 py-3 text-right font-bold text-pl-purple">25–26</th>
                    </tr>
                  </thead>
                  <tbody>
                    {SEASON_N.map(({ team, pts, ppda, sqv, gd, prob, color }) => (
                      <tr key={team} className="border-t border-gray-50 hover:bg-gray-50/40 transition-colors">
                        <td className="px-4 py-2.5 font-semibold text-gray-800">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                            {team}
                          </div>
                        </td>
                        <td className="px-4 py-2.5 font-mono text-gray-700 text-right">{pts}</td>
                        <td className="px-4 py-2.5 font-mono text-gray-600 text-right">{ppda}</td>
                        <td className="px-4 py-2.5 font-mono text-gray-600 text-right">{sqv}</td>
                        <td className="px-4 py-2.5 font-mono text-gray-600 text-right">+{gd}</td>
                        <td className="px-4 py-2.5 font-mono font-bold text-right text-pl-purple">{prob}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div data-animate className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: '🏆',
                title: 'Liverpool – Defending Favourite',
                desc: "Won 2024–25 with strong pressing (PPDA 8.2) and elite consistency (93%). The model assigns 37% – weighted heavily by squad value (€920M) and tactical continuity. Risk: defending champions face a 'second season syndrome' in Slot's era.",
              },
              {
                icon: '🔴',
                title: 'Arsenal – Structural Challenger',
                desc: "Progressive passes of 72.0/90 – highest in the league – and a squad value of €820M push Arsenal to 28%. Two near-misses in the past two seasons mean the system is mature. The consistency gap (86% vs 93%) remains the key differentiator.",
              },
              {
                icon: '🔵',
                title: "City's Bounce-Back Premium",
                desc: "Man City's 2024-25 points tally (62) was historically low, but their squad value (€900M) and deep tactical infrastructure give the lagged model reasons for optimism. The model assigns 18% – the highest bounce-back probability in the dataset.",
              },
            ].map(({ icon, title, desc }) => (
              <div key={title} data-animate className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card space-y-3">
                <div className="text-2xl">{icon}</div>
                <h4 className="font-bold text-gray-800 text-sm">{title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Conclusion ───────────────────────────────────────────────────── */}
        <section>
          <div data-animate className="bg-gradient-to-br from-pl-purple to-indigo-900 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pl-gold/10 rounded-full blur-3xl translate-x-20 -translate-y-20" />
            <div className="relative z-10 max-w-2xl">
              <span className="pill bg-pl-gold/20 text-pl-gold border border-pl-gold/30 uppercase tracking-widest text-[10px] mb-4 inline-flex">
                Conclusion
              </span>
              <h2 className="text-2xl sm:text-3xl font-black leading-tight mb-4">
                The verdict: <span className="gold-text">structure predicts the future, outcomes don't</span>
              </h2>
              <p className="text-white/65 leading-relaxed text-sm mb-6">
                Switching to a lagged model fundamentally reshuffles the predictors.{' '}
                <strong className="text-white">Squad Value rises from #9 to #1</strong> (r=0.74)
                and <strong className="text-white">PPDA holds strong at #2</strong> (r=–0.63),
                while Goal Difference falls from r=0.97 to r=0.65. The lesson: structural
                advantages – the quality of players you own and the tactical system you embed –
                carry across seasons. Performance peaks don't. For 2025–26, Liverpool's defence
                of the title is supported by both metrics; Arsenal and City's bounce-back are
                realistic at 28% and 18% respectively.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://github.com/anantshah00/data-analysis"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-pl-gold text-pl-purple font-bold text-sm rounded-xl hover:bg-amber-400 transition-colors"
                >
                  View Notebook on GitHub ↗
                </a>
                <Link href="/"
                  className="px-5 py-2.5 border border-white/25 text-white font-semibold text-sm rounded-xl hover:bg-white/10 transition-colors">
                  ← Back to Portfolio
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      title: 'Premier League Champion Predictor',
      description:
        'Lagged sports analytics model: which Season N metrics predict the Season N+1 Premier League champion? Squad Value and PPDA lead the cross-season rankings.',
    },
  }
}
