import Link from 'next/link'
import dynamic from 'next/dynamic'
import StatCard from '../components/StatCard'
import InsightCard from '../components/InsightCard'
import {
  correlationChart,
  scatterChart,
  lineChart,
  groupedBarChart,
  importanceChart,
  radarChart,
  MODEL_RESULTS,
} from '../data/chart_data'

// Dynamic Plotly import (no SSR)
const PlotlyChart = dynamic(() => import('../components/PlotlyChart'), { ssr: false })

// ── Section header helper ───────────────────────────────────────────────────
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

// ── Dataset feature table ────────────────────────────────────────────────────
const FEATURES = [
  { feature: 'goal_diff',           description: 'Goals scored − goals conceded',         type: 'int',   source: 'Derived' },
  { feature: 'xg_diff',             description: 'Expected goals for − xG against',       type: 'float', source: 'FBref'   },
  { feature: 'goals_scored',        description: 'Total league goals scored',              type: 'int',   source: 'football-data.co.uk' },
  { feature: 'goals_conceded',      description: 'Total goals conceded',                   type: 'int',   source: 'football-data.co.uk' },
  { feature: 'clean_sheets',        description: 'Matches with no goals conceded',         type: 'int',   source: 'football-data.co.uk' },
  { feature: 'shots_on_target_pg',  description: 'Shots on target per game',               type: 'float', source: 'football-data.co.uk' },
  { feature: 'possession_pct',      description: 'Average ball possession %',              type: 'float', source: 'FBref'   },
  { feature: 'pass_accuracy',       description: 'Pass completion percentage',             type: 'float', source: 'FBref'   },
  { feature: 'squad_value_m',       description: 'Squad market value (€ millions)',        type: 'float', source: 'Transfermarkt' },
  { feature: 'win_rate',            description: 'Wins / 38 matches played',               type: 'float', source: 'Derived' },
  { feature: 'champion',            description: '1 = title winner, 0 = everyone else',   type: 'int',   source: 'Label'   },
]

export default function PremierLeaguePage() {
  return (
    <div className="bg-surface">

      {/* ── Project Hero ───────────────────────────────────────────────── */}
      <section className="project-hero-bg py-20 px-4 relative overflow-hidden">
        <div className="absolute top-10 right-20 w-56 h-56 bg-pl-gold/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-64 h-64 bg-indigo-500/8 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-5">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-white/40 text-xs">
            <Link href="/" className="hover:text-white/70 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-white/60">Projects</span>
            <span>/</span>
            <span className="text-pl-gold/80">Premier League Predictor</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            <span className="pill bg-pl-gold/20 text-pl-gold border border-pl-gold/30 uppercase tracking-widest text-[10px]">
              ⚽ Sports Analytics
            </span>
            <span className="pill bg-white/10 text-white/60 border border-white/10 text-[10px]">Python</span>
            <span className="pill bg-white/10 text-white/60 border border-white/10 text-[10px]">Pandas</span>
            <span className="pill bg-white/10 text-white/60 border border-white/10 text-[10px]">Random Forest</span>
            <span className="pill bg-white/10 text-white/60 border border-white/10 text-[10px]">xG Metrics</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            How Can I Predict The Next<br />
            <span className="gold-text">Winner of the Premier League?</span>
          </h1>

          <p className="text-white/60 text-base leading-relaxed max-w-2xl">
            A 12-season data science investigation into which performance variables
            most reliably separate title winners from the rest — from traditional
            metrics to modern expected-goals analytics.
          </p>

          {/* Quick links */}
          <div className="flex flex-wrap gap-3 pt-2">
            {[
              { href: '#overview',      label: 'Overview'     },
              { href: '#dataset',       label: 'Dataset'      },
              { href: '#visualizations',label: 'Charts'       },
              { href: '#insights',      label: 'Insights'     },
              { href: '#model',         label: 'Model'        },
            ].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-xs font-medium text-white/50 hover:text-pl-gold transition-colors border-b border-white/20 hover:border-pl-gold/50 pb-0.5"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Key Stats Row ──────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-20 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard value="12"    label="Seasons Analysed"    sublabel="2012–13 → 2023–24"  icon="📅" delay="0"   />
          <StatCard value="60"    label="Team-Seasons"        sublabel="Top 5 per season"    icon="🏟️" delay="100" />
          <StatCard value="0.97"  label="Best Pearson r"      sublabel="Goal Difference"     icon="📈" delay="200" />
          <StatCard value="95%"   label="Model ROC-AUC"       sublabel="Random Forest CV"    icon="🎯" delay="300" />
        </div>
      </section>

      {/* Main content wrapper */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 pb-28">

        {/* ── 1. Project Overview ──────────────────────────────────────── */}
        <section id="overview">
          <SectionHeader
            eyebrow="01 — Overview"
            title="The Problem"
            subtitle="The Premier League is the most-watched football league on earth. But what actually separates a title winner from the rest?"
          />

          <div className="grid md:grid-cols-2 gap-8">
            <div data-animate className="bg-white rounded-2xl p-7 border border-gray-100 shadow-card space-y-4">
              <h3 className="font-bold text-gray-800">Why it matters</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Every pre-season, clubs spend hundreds of millions of euros and pundits
                make bold predictions — often getting it wrong. This project asks:
                if we strip away the noise, <em>which objective metrics</em> most
                reliably predict who lifts the trophy?
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                The answer has practical implications for recruitment departments
                building squads, bookmakers setting odds, and broadcasters crafting
                evidence-based narratives.
              </p>
            </div>

            <div data-animate data-delay="100" className="bg-white rounded-2xl p-7 border border-gray-100 shadow-card space-y-4">
              <h3 className="font-bold text-gray-800">Research questions</h3>
              <ol className="space-y-3 text-sm text-gray-500 list-none">
                {[
                  'Which single metric has the strongest correlation with winning the title?',
                  'Are modern metrics like xG more predictive than traditional goal counts?',
                  'Can a multi-variable model reliably identify the champion mid-season?',
                  'How much does squad investment explain final finishing position?',
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

        {/* ── 2. Dataset ───────────────────────────────────────────────── */}
        <section id="dataset">
          <SectionHeader
            eyebrow="02 — Data"
            title="Dataset Description"
            subtitle="Season-level aggregates for the top-5 finishing teams across 12 Premier League seasons, sourced from three public datasets."
          />

          {/* Sources */}
          <div data-animate className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { name: 'football-data.co.uk', desc: 'Match results, shots, goals, cards — free CSVs', icon: '📋', color: 'border-blue-200 bg-blue-50/50' },
              { name: 'FBref.com',            desc: 'xG, xG against, progressive passes, pressures', icon: '⚽', color: 'border-green-200 bg-green-50/50' },
              { name: 'Transfermarkt',        desc: 'Squad market values (€ millions)',               icon: '💶', color: 'border-amber-200 bg-amber-50/50' },
            ].map(({ name, desc, icon, color }) => (
              <div key={name} data-animate className={`rounded-2xl p-5 border ${color} space-y-2`}>
                <div className="text-2xl">{icon}</div>
                <h4 className="font-semibold text-gray-800 text-sm">{name}</h4>
                <p className="text-gray-500 text-xs">{desc}</p>
              </div>
            ))}
          </div>

          {/* Feature table */}
          <div data-animate className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 text-sm">Feature Reference</h3>
              <span className="text-xs text-gray-400">{FEATURES.length} features · 60 observations</span>
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
                  {FEATURES.map(({ feature, description, type, source }, i) => (
                    <tr key={feature} className={`border-t border-gray-50 hover:bg-gray-50/50 transition-colors ${i % 2 === 0 ? '' : ''}`}>
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

        {/* ── 3. Visualizations ────────────────────────────────────────── */}
        <section id="visualizations">
          <SectionHeader
            eyebrow="03 — EDA"
            title="Exploratory Analysis"
            subtitle="Six interactive charts exploring the relationships between performance metrics and championship outcomes."
          />

          {/* Row 1 */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div data-animate>
              <PlotlyChart
                title="What Best Predicts Final Points?"
                subtitle="Pearson r with season points total · sorted ascending · click bars to inspect"
                data={correlationChart.data}
                layout={correlationChart.layout}
              />
            </div>
            <div data-animate data-delay="100">
              <PlotlyChart
                title="Goal Difference vs Final Points"
                subtitle="Each bubble = one team-season · size = squad value · gold stars = champions"
                data={scatterChart.data}
                layout={scatterChart.layout}
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div data-animate>
              <PlotlyChart
                title="The Points Race (Top Clubs, 2013–2024)"
                subtitle="★ marks = title-winning season · dashed line = 90-point threshold"
                data={lineChart.data}
                layout={lineChart.layout}
              />
            </div>
            <div data-animate data-delay="100">
              <PlotlyChart
                title="Champions vs The Rest — Key Metrics"
                subtitle="Season averages across 12 seasons · champions show consistently higher values"
                data={groupedBarChart.data}
                layout={groupedBarChart.layout}
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div data-animate>
              <PlotlyChart
                title="Random Forest Feature Importances"
                subtitle="Mean decrease in Gini impurity · trained on full dataset"
                data={importanceChart.data}
                layout={importanceChart.layout}
              />
            </div>
            <div data-animate data-delay="100">
              <PlotlyChart
                title="Champion Statistical Profile"
                subtitle="Normalised 0–100 · hover each axis for values · radar shows multi-dimensional dominance"
                data={radarChart.data}
                layout={radarChart.layout}
              />
            </div>
          </div>
        </section>

        {/* ── 4. Key Insights ──────────────────────────────────────────── */}
        <section id="insights">
          <SectionHeader
            eyebrow="04 — Findings"
            title="Key Insights"
            subtitle="Five evidence-based conclusions drawn from the statistical and model analysis."
            center
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <InsightCard
              icon="📐"
              accent="gold"
              title="Goal Difference is the #1 Predictor"
              description="Pearson r = 0.97 with final points — the strongest correlation in the dataset. Champions average a +57 goal difference vs +27 for non-champions. Both scoring AND defending matter equally."
              delay="0"
            />
            <InsightCard
              icon="⚡"
              accent="purple"
              title="xG Differential Outperforms Actual Goals"
              description="xG differential (r = 0.95) is slightly less noisy than raw goals and better identifies sustainable quality. Teams significantly over-performing xG tend to regress the following season."
              delay="100"
            />
            <InsightCard
              icon="🧱"
              accent="indigo"
              title="Clean Sheets Are Underrated"
              description="Champions average 19.4 clean sheets vs 13.5 for others — a 44% difference. Defensive solidity is as important as attacking firepower, yet rarely headlined in transfer speculation."
              delay="200"
            />
            <InsightCard
              icon="💰"
              accent="emerald"
              title="Money Is Necessary But Not Sufficient"
              description="Squad value shows a Spearman ρ = 0.72 with points. All champions had high squad values — except Leicester City 2016, whose counter-pressing exploited wealthier teams with just €65M."
              delay="0"
            />
            <InsightCard
              icon="🎯"
              accent="rose"
              title="The Title Threshold Is ~90 Points"
              description="Since 2013, the average winning points total is 91.5. In only two seasons (2013, 2016) did a team win with fewer than 86 points. Targeting 89+ points is a reliable champion benchmark."
              delay="100"
            />
          </div>

          {/* Ranked table */}
          <div data-animate data-delay="200" className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-semibold text-gray-800 text-sm">Predictor Power Rankings</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-gray-400 uppercase tracking-wide text-[10px] border-b border-gray-100">
                    <th className="px-5 py-3 text-left">Rank</th>
                    <th className="px-5 py-3 text-left">Variable</th>
                    <th className="px-5 py-3 text-left">Pearson r</th>
                    <th className="px-5 py-3 text-left">RF Importance</th>
                    <th className="px-5 py-3 text-left">Verdict</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { rank:'#1', var:'Goal Difference',    r:'0.97', imp:'High (22%)',  verdict:'Core predictor', color:'text-amber-600' },
                    { rank:'#2', var:'xG Differential',    r:'0.95', imp:'High (19%)',  verdict:'Best quality signal', color:'text-amber-600' },
                    { rank:'#3', var:'Win Rate',           r:'0.97', imp:'High (17%)',  verdict:'Derived from points', color:'text-amber-600' },
                    { rank:'#4', var:'Clean Sheets',       r:'0.81', imp:'Medium (11%)', verdict:'Underrated', color:'text-blue-600' },
                    { rank:'#5', var:'Goals Scored',       r:'0.87', imp:'Medium (9%)', verdict:'Complements defence', color:'text-blue-600' },
                    { rank:'#6', var:'Shots on Target/G',  r:'0.78', imp:'Medium (8%)', verdict:'Quality creation', color:'text-gray-500' },
                    { rank:'#7', var:'Squad Value',        r:'0.72', imp:'Medium (7%)', verdict:'Necessary, not sufficient', color:'text-gray-500' },
                    { rank:'#8', var:'Possession %',       r:'0.54', imp:'Low (4%)',    verdict:'Style-dependent', color:'text-gray-400' },
                  ].map(({ rank, var: v, r, imp, verdict, color }) => (
                    <tr key={rank} className="border-t border-gray-50 hover:bg-gray-50/40 transition-colors">
                      <td className="px-5 py-2.5 font-mono font-bold text-gray-400">{rank}</td>
                      <td className="px-5 py-2.5 font-semibold text-gray-800">{v}</td>
                      <td className="px-5 py-2.5 font-mono text-pl-purple font-semibold">{r}</td>
                      <td className="px-5 py-2.5 text-gray-500">{imp}</td>
                      <td className={`px-5 py-2.5 font-medium ${color}`}>{verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ── 5. Model Explanation ─────────────────────────────────────── */}
        <section id="model">
          <SectionHeader
            eyebrow="05 — Modelling"
            title="How the Model Works"
            subtitle="A binary classification pipeline — predicting champion (1) vs non-champion (0) — evaluated with stratified cross-validation."
          />

          <div className="grid lg:grid-cols-3 gap-6 mb-8">

            {/* Algorithm */}
            <div data-animate className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card space-y-4">
              <div className="w-10 h-10 rounded-xl bg-pl-purple/10 text-pl-purple flex items-center justify-center text-xl">🌲</div>
              <h3 className="font-bold text-gray-800">Algorithm</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                Three models were trained and compared: Logistic Regression
                (interpretable baseline), Random Forest (non-linear ensemble),
                and Gradient Boosting (sequential boosting). All use{' '}
                <code className="bg-gray-100 px-1 rounded text-pl-purple">class_weight='balanced'</code>
                {' '}to handle the 1:4 class imbalance.
              </p>
              <div className="pt-1 space-y-1.5">
                {['n_estimators=400', 'max_depth=5', 'min_samples_leaf=2'].map(p => (
                  <code key={p} className="block text-[10px] bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-pl-purple font-mono">{p}</code>
                ))}
              </div>
            </div>

            {/* Features */}
            <div data-animate data-delay="100" className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card space-y-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl">📊</div>
              <h3 className="font-bold text-gray-800">10 Input Features</h3>
              <div className="space-y-1.5">
                {[
                  'goal_diff', 'xg_diff', 'goals_scored', 'goals_conceded',
                  'shots_on_target_pg', 'clean_sheets', 'possession_pct',
                  'pass_accuracy', 'squad_value_m', 'win_rate',
                ].map(f => (
                  <div key={f} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-pl-purple/40" />
                    <code className="text-[10px] text-gray-600 font-mono">{f}</code>
                  </div>
                ))}
              </div>
            </div>

            {/* Evaluation */}
            <div data-animate data-delay="200" className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">✅</div>
              <h3 className="font-bold text-gray-800">Evaluation Strategy</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                <strong>Stratified K-Fold</strong> (k=5) cross-validation ensures each fold
                maintains the champion/non-champion ratio. Primary metric is{' '}
                <strong>ROC-AUC</strong>, which handles class imbalance better than accuracy.
                Hold-out test: trained on 2013–2023, predicted 2023-24.
              </p>
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-center">
                <div className="text-xs text-emerald-600 font-medium">2023-24 champion correctly predicted ✓</div>
              </div>
            </div>
          </div>

          {/* Model results bar chart */}
          <div data-animate className="bg-white rounded-2xl p-7 border border-gray-100 shadow-card">
            <h3 className="font-bold text-gray-800 mb-5">Cross-Validated ROC-AUC by Model</h3>
            <div className="space-y-4">
              {MODEL_RESULTS.map(({ model, auc, std, color }) => (
                <div key={model}>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="text-sm font-medium text-gray-700">{model}</span>
                    <span className="font-mono text-sm font-bold" style={{ color }}>
                      {(auc * 100).toFixed(1)}% <span className="text-gray-400 font-normal text-xs">±{(std * 100).toFixed(1)}%</span>
                    </span>
                  </div>
                  <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${auc * 100}%`,
                        background: `linear-gradient(90deg, ${color}88, ${color})`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4">
              5-fold Stratified CV · AUC = 1.0 is perfect · 0.5 is random · values above 0.9 indicate strong discrimination
            </p>
          </div>
        </section>

        {/* ── Conclusion ───────────────────────────────────────────────── */}
        <section>
          <div data-animate className="bg-gradient-to-br from-pl-purple to-indigo-900 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pl-gold/10 rounded-full blur-3xl translate-x-20 -translate-y-20" />
            <div className="relative z-10 max-w-2xl">
              <span className="pill bg-pl-gold/20 text-pl-gold border border-pl-gold/30 uppercase tracking-widest text-[10px] mb-4 inline-flex">
                Conclusion
              </span>
              <h2 className="text-2xl sm:text-3xl font-black leading-tight mb-4">
                The verdict: <span className="gold-text">Goal difference wins titles</span>
              </h2>
              <p className="text-white/65 leading-relaxed text-sm mb-6">
                Across 12 seasons and 60 team-observations, <strong className="text-white">goal
                difference and xG differential</strong> are the most powerful predictors of Premier
                League success — combining attacking output with defensive solidity in a single
                number. The Random Forest model achieves <strong className="text-white">95%
                ROC-AUC</strong> in cross-validation and correctly identified the 2023-24 champion
                without seeing that season during training.
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
                <Link
                  href="/"
                  className="px-5 py-2.5 border border-white/25 text-white font-semibold text-sm rounded-xl hover:bg-white/10 transition-colors"
                >
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
        'Data science investigation into which variables best predict the next Premier League winner — xG, goal difference, and Random Forest modelling.',
    },
  }
}
