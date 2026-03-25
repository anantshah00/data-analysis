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

// Dynamic Plotly import (no SSR)
const PlotlyChart = dynamic(() => import('../components/PlotlyChart'), { ssr: false })

// ── Section header helper ────────────────────────────────────────────────────
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
  { feature: 'goal_diff',           description: 'Goals scored − goals conceded',                        type: 'int',   source: 'Derived' },
  { feature: 'xg_diff',             description: 'Expected goals for − xG against',                      type: 'float', source: 'FBref'   },
  { feature: 'goals_scored',        description: 'Total league goals scored',                             type: 'int',   source: 'football-data.co.uk' },
  { feature: 'goals_conceded',      description: 'Total goals conceded',                                  type: 'int',   source: 'football-data.co.uk' },
  { feature: 'clean_sheets',        description: 'Matches with no goals conceded',                        type: 'int',   source: 'football-data.co.uk' },
  { feature: 'ppda',                description: 'Passes Per Defensive Action – lower = more pressing',   type: 'float', source: 'FBref'   },
  { feature: 'progressive_passes',  description: 'Passes advancing ball ≥10 yds toward goal per 90 min', type: 'float', source: 'FBref'   },
  { feature: 'high_press_rec',      description: 'Ball recoveries in final third per 90 min',             type: 'float', source: 'FBref'   },
  { feature: 'consistency_pct',     description: '% of matches won when leading at half-time',            type: 'float', source: 'Derived' },
  { feature: 'shots_on_target_pg',  description: 'Shots on target per game',                              type: 'float', source: 'football-data.co.uk' },
  { feature: 'possession_pct',      description: 'Average ball possession %',                             type: 'float', source: 'FBref'   },
  { feature: 'squad_value_m',       description: 'Squad market value (€ millions)',                       type: 'float', source: 'Transfermarkt' },
  { feature: 'win_rate',            description: 'Wins / 38 matches played',                              type: 'float', source: 'Derived' },
  { feature: 'champion',            description: '1 = title winner, 0 = everyone else',                  type: 'int',   source: 'Label'   },
]

// ── 2024–25 current-season metrics table (GW 29) ─────────────────────────────
const CURRENT_SEASON = [
  { team: 'Liverpool',      pts: 73, ppda: 8.4,  progPass: 65.2, consistency: 91, xgVar: 0.78, prob: 82,  color: '#C8102E' },
  { team: 'Arsenal',        pts: 63, ppda: 8.9,  progPass: 70.1, consistency: 84, xgVar: 0.89, prob: 11,  color: '#EF0107' },
  { team: 'Chelsea',        pts: 59, ppda: 10.2, progPass: 61.3, consistency: 78, xgVar: 1.08, prob: 4,   color: '#034694' },
  { team: 'Nottm Forest',   pts: 53, ppda: 12.8, progPass: 44.2, consistency: 83, xgVar: 0.95, prob: 2,   color: '#CC0000' },
  { team: 'Manchester City',pts: 47, ppda: 9.1,  progPass: 58.4, consistency: 71, xgVar: 1.22, prob: 1,   color: '#6CABDD' },
]

export default function PremierLeaguePage() {
  return (
    <div className="bg-surface">

      {/* ── Project Hero ──────────────────────────────────────────────────── */}
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
            {['Python', 'Pandas', 'Random Forest', 'PPDA', 'Pressing Metrics', 'xG'].map(tag => (
              <span key={tag} className="pill bg-white/10 text-white/60 border border-white/10 text-[10px]">{tag}</span>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            How Can I Predict The Next<br />
            <span className="gold-text">Winner of the Premier League?</span>
          </h1>

          <p className="text-white/60 text-base leading-relaxed max-w-2xl">
            A 12-season investigation going beyond goals and xG – uncovering how pressing
            intensity, ball progression, and in-game consistency separate title winners from
            the rest, and applying the model to the live 2024–25 season.
          </p>

          {/* Quick links */}
          <div className="flex flex-wrap gap-3 pt-2">
            {[
              { href: '#overview',      label: 'Overview'   },
              { href: '#dataset',       label: 'Dataset'    },
              { href: '#visualizations',label: 'Charts'     },
              { href: '#insights',      label: 'Insights'   },
              { href: '#model',         label: 'Model'      },
              { href: '#prediction',    label: '2024–25 ↓'  },
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

      {/* ── Key Stats Row ─────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-20 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard value="12"   label="Seasons Analysed"   sublabel="2012–13 → 2023–24"  icon="📅" delay="0"   />
          <StatCard value="60"   label="Team-Seasons"        sublabel="Top 5 per season"    icon="🏟️" delay="100" />
          <StatCard value="0.97" label="Best Pearson r"      sublabel="Goal Difference"     icon="📈" delay="200" />
          <StatCard value="96%"  label="Model ROC-AUC"       sublabel="Random Forest CV"    icon="🎯" delay="300" />
        </div>
      </section>

      {/* Main content wrapper */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 pb-28">

        {/* ── 1. Project Overview ───────────────────────────────────────────── */}
        <section id="overview">
          <SectionHeader
            eyebrow="01 – Overview"
            title="The Problem"
            subtitle="The Premier League is the most-watched football league on earth. But what actually separates a title winner from the rest – and can we find it before the season ends?"
          />

          <div className="grid md:grid-cols-2 gap-8">
            <div data-animate className="bg-white rounded-2xl p-7 border border-gray-100 shadow-card space-y-4">
              <h3 className="font-bold text-gray-800">Why it matters</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Every pre-season, clubs spend hundreds of millions and pundits make bold
                predictions – often getting it wrong. This project asks: if we strip away
                narrative and focus on <em>process metrics</em>, which objective signals
                most reliably predict who lifts the trophy?
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Going beyond obvious outputs like goals and xG, we dig into <strong>how</strong> teams
                win the ball back (pressing), <strong>how</strong> they move it forward (ball
                progression), and <strong>how</strong> reliably they protect leads (consistency).
              </p>
            </div>

            <div data-animate data-delay="100" className="bg-white rounded-2xl p-7 border border-gray-100 shadow-card space-y-4">
              <h3 className="font-bold text-gray-800">Research questions</h3>
              <ol className="space-y-3 text-sm text-gray-500 list-none">
                {[
                  'Which single metric has the strongest correlation with winning the title?',
                  'Do pressing metrics (PPDA) outperform traditional goal-based stats?',
                  'Does consistency – protecting leads – predict titles better than possession?',
                  'Can a multi-variable model identify the 2024–25 champion from mid-season data?',
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

        {/* ── 2. Dataset ─────────────────────────────────────────────────────── */}
        <section id="dataset">
          <SectionHeader
            eyebrow="02 – Data"
            title="Dataset Description"
            subtitle="Season-level aggregates for the top-5 finishing teams across 12 Premier League seasons. Advanced process metrics sourced from FBref alongside traditional match data."
          />

          {/* Sources */}
          <div data-animate className="grid sm:grid-cols-3 gap-4 mb-8">
            {[
              { name: 'football-data.co.uk', desc: 'Match results, shots, goals, cards – free CSVs going back to 1993', icon: '📋', color: 'border-blue-200 bg-blue-50/50' },
              { name: 'FBref.com',            desc: 'xG, PPDA, progressive passes, high press recoveries, possession zones', icon: '⚽', color: 'border-green-200 bg-green-50/50' },
              { name: 'Transfermarkt',        desc: 'Squad market values (€M) as a proxy for investment level', icon: '💶', color: 'border-amber-200 bg-amber-50/50' },
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

        {/* ── 3. Visualizations ──────────────────────────────────────────────── */}
        <section id="visualizations">
          <SectionHeader
            eyebrow="03 – EDA"
            title="Exploratory Analysis"
            subtitle="Six interactive charts – from classic correlations to pressing intensity and process metric comparisons. All 60 team-seasons plotted."
          />

          {/* Row 1 */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div data-animate>
              <PlotlyChart
                title="What Best Predicts Final Points?"
                subtitle="Pearson r with season points total · 16 variables including pressing, progression & consistency"
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
                title="Pressing Intensity (PPDA) vs Final Points"
                subtitle="Lower PPDA = more aggressive press · x-axis reversed · Leicester 2016 annotated as the low-block anomaly"
                data={ppdaScatterChart.data}
                layout={ppdaScatterChart.layout}
              />
            </div>
            <div data-animate data-delay="100">
              <PlotlyChart
                title="Advanced Process Metrics – Champions vs Non-Champions"
                subtitle="Season averages across 12 seasons · % gap shown above champion bars"
                data={advancedMetricsChart.data}
                layout={advancedMetricsChart.layout}
              />
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div data-animate>
              <PlotlyChart
                title="Random Forest Feature Importances"
                subtitle="Mean decrease in Gini impurity · trained on 12-feature set including PPDA & consistency"
                data={importanceChart.data}
                layout={importanceChart.layout}
              />
            </div>
            <div data-animate data-delay="100">
              <PlotlyChart
                title="Champion Statistical Profile"
                subtitle="Normalised 0–100 · pressing intensity inverted so higher = more aggressive · hover each axis"
                data={radarChart.data}
                layout={radarChart.layout}
              />
            </div>
          </div>
        </section>

        {/* ── 4. Key Insights ────────────────────────────────────────────────── */}
        <section id="insights">
          <SectionHeader
            eyebrow="04 – Findings"
            title="Key Insights"
            subtitle="Five evidence-based conclusions – including two that challenge conventional football wisdom."
            center
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <InsightCard
              icon="📐"
              accent="gold"
              title="Goal Difference is the #1 Predictor"
              description="Pearson r = 0.97 with final points – the strongest signal in the dataset. Champions average a +57 goal difference vs +27 for non-champions. Both scoring AND defending matter equally."
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
              icon="🔥"
              accent="indigo"
              title="Pressing Is a Leading Indicator"
              description="PPDA correlates at r = –0.68 with final points. Champions average a PPDA of 8.4 vs 11.2 for the rest – a 25% difference. The exception: Leicester 2016 won with a PPDA of 13.8 via a deep low-block."
              delay="200"
            />
            <InsightCard
              icon="🧠"
              accent="emerald"
              title="Consistency Separates Pretenders"
              description="Champions convert 91.5% of half-time leads into wins vs 74.8% for non-champions. xG match variance is also 32% lower for champions – they perform at a steady level, not in bursts."
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
                    { rank:'#1',  var:'Goal Difference',       r:'0.97',  imp:'20%', verdict:'Core predictor',              color:'text-amber-600' },
                    { rank:'#2',  var:'xG Differential',       r:'0.95',  imp:'17%', verdict:'Best quality signal',          color:'text-amber-600' },
                    { rank:'#3',  var:'Win Rate',               r:'0.97',  imp:'14%', verdict:'Derived from points',          color:'text-amber-600' },
                    { rank:'#4',  var:'Consistency %',          r:'0.74',  imp:'11%', verdict:'Underrated – mental strength', color:'text-blue-600'  },
                    { rank:'#5',  var:'Clean Sheets',           r:'0.81',  imp:'10%', verdict:'Defensive solidity',           color:'text-blue-600'  },
                    { rank:'#6',  var:'PPDA (Pressing)',        r:'–0.68', imp:'8%',  verdict:'Leading process indicator',    color:'text-blue-600'  },
                    { rank:'#7',  var:'Goals Scored',           r:'0.87',  imp:'7%',  verdict:'Complements defence',          color:'text-gray-500'  },
                    { rank:'#8',  var:'Ball Progression/90',   r:'0.71',  imp:'5%',  verdict:'Style-dependent',              color:'text-gray-500'  },
                    { rank:'#9',  var:'Squad Value',            r:'0.72',  imp:'3%',  verdict:'Necessary, not sufficient',    color:'text-gray-400'  },
                    { rank:'#10', var:'Possession %',           r:'0.54',  imp:'2%',  verdict:'Weakest process metric',       color:'text-gray-400'  },
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

        {/* ── 5. Model Explanation ───────────────────────────────────────────── */}
        <section id="model">
          <SectionHeader
            eyebrow="05 – Modelling"
            title="How the Model Works"
            subtitle="A binary classification pipeline – predicting champion (1) vs non-champion (0) – trained on 12 features including the new advanced metrics."
          />

          <div className="grid lg:grid-cols-3 gap-6 mb-8">

            {/* Algorithm */}
            <div data-animate className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card space-y-4">
              <div className="w-10 h-10 rounded-xl bg-pl-purple/10 text-pl-purple flex items-center justify-center text-xl">🌲</div>
              <h3 className="font-bold text-gray-800">Algorithm</h3>
              <p className="text-gray-500 text-xs leading-relaxed">
                Three models compared: Logistic Regression (interpretable baseline),
                Random Forest (non-linear ensemble), and Gradient Boosting (sequential).
                All use{' '}
                <code className="bg-gray-100 px-1 rounded text-pl-purple">class_weight='balanced'</code>
                {' '}to handle the 1:4 class imbalance inherent in the data.
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
              <h3 className="font-bold text-gray-800">12 Input Features</h3>
              <div className="space-y-1.5">
                {[
                  'goal_diff', 'xg_diff', 'goals_scored', 'goals_conceded',
                  'ppda', 'progressive_passes', 'high_press_rec',
                  'consistency_pct', 'clean_sheets', 'squad_value_m',
                  'shots_on_target_pg', 'win_rate',
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
                maintains the 1:4 champion ratio. Primary metric is{' '}
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

        {/* ── 6. 2024–25 Prediction ──────────────────────────────────────────── */}
        <section id="prediction">
          <SectionHeader
            eyebrow="06 – Prediction"
            title="Who Wins the 2024–25 Title?"
            subtitle="The trained model applied to live mid-season data at Gameweek 29 (March 2025). Probabilities output from the Random Forest classifier."
          />

          <div className="grid lg:grid-cols-2 gap-8 mb-8">
            {/* Probability chart */}
            <div data-animate>
              <PlotlyChart
                title="Championship Probability – GW 29"
                subtitle="Model output using current PPDA, consistency, progression & goal difference · hover for GW29 points"
                data={predictionChart.data}
                layout={predictionChart.layout}
              />
            </div>

            {/* Current metrics table */}
            <div data-animate data-delay="100" className="bg-white rounded-2xl border border-gray-100 shadow-card overflow-hidden self-start">
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
                <h3 className="font-semibold text-gray-800 text-sm">Live Advanced Metrics (GW 29)</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-gray-400 uppercase tracking-wide text-[10px] border-b border-gray-100">
                      <th className="px-4 py-3 text-left">Team</th>
                      <th className="px-4 py-3 text-right">Pts</th>
                      <th className="px-4 py-3 text-right">PPDA</th>
                      <th className="px-4 py-3 text-right">Prog P/90</th>
                      <th className="px-4 py-3 text-right">Consis.</th>
                      <th className="px-4 py-3 text-right font-bold text-pl-purple">Prob</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CURRENT_SEASON.map(({ team, pts, ppda, progPass, consistency, prob, color }) => (
                      <tr key={team} className="border-t border-gray-50 hover:bg-gray-50/40 transition-colors">
                        <td className="px-4 py-2.5 font-semibold text-gray-800 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                          {team}
                        </td>
                        <td className="px-4 py-2.5 font-mono text-gray-700 text-right">{pts}</td>
                        <td className="px-4 py-2.5 font-mono text-gray-600 text-right">{ppda}</td>
                        <td className="px-4 py-2.5 font-mono text-gray-600 text-right">{progPass}</td>
                        <td className="px-4 py-2.5 font-mono text-gray-600 text-right">{consistency}%</td>
                        <td className="px-4 py-2.5 font-mono font-bold text-right text-pl-purple">{prob}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Prediction commentary */}
          <div data-animate className="grid md:grid-cols-3 gap-5">
            {[
              { icon: '🏆', title: 'Liverpool – Clear Favourite', desc: 'Best PPDA in the league (8.4), highest consistency at 91%, and a 10-point gap at GW29. The model assigns an 82% probability – the largest single-team lead since City in 2018.' },
              { icon: '🔴', title: 'Arsenal – Realistic Challenger', desc: "The highest progressive pass rate (70.1/90) in the division signals Arteta's system is working – but a consistency score of 84% (vs Liverpool's 91%) and a 10-point deficit leave the model at 11%." },
              { icon: '⚠️', title: 'The Leicester Caveat', desc: 'The 2016 anomaly proves low-block teams can win despite high PPDA. Forest (PPDA 12.8) are the modern equivalent. The model gives them 2% – unlikely, but the data says not impossible.' },
            ].map(({ icon, title, desc }) => (
              <div key={title} data-animate className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card space-y-3">
                <div className="text-2xl">{icon}</div>
                <h4 className="font-bold text-gray-800 text-sm">{title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Conclusion ─────────────────────────────────────────────────────── */}
        <section>
          <div data-animate className="bg-gradient-to-br from-pl-purple to-indigo-900 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pl-gold/10 rounded-full blur-3xl translate-x-20 -translate-y-20" />
            <div className="relative z-10 max-w-2xl">
              <span className="pill bg-pl-gold/20 text-pl-gold border border-pl-gold/30 uppercase tracking-widest text-[10px] mb-4 inline-flex">
                Conclusion
              </span>
              <h2 className="text-2xl sm:text-3xl font-black leading-tight mb-4">
                The verdict: <span className="gold-text">process beats output</span>
              </h2>
              <p className="text-white/65 leading-relaxed text-sm mb-6">
                Goal difference remains the strongest single predictor (r = 0.97), but the
                deeper story lies in <strong className="text-white">how</strong> teams generate
                it. Champions press harder (PPDA 8.4 vs 11.2), progress the ball more
                efficiently (+22% progressive passes), and protect leads far more reliably
                (91.5% vs 74.8% consistency). The 12-feature Random Forest achieves{' '}
                <strong className="text-white">96% ROC-AUC</strong> and points to Liverpool
                as the overwhelming 2024–25 favourite at GW29.
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
        'Advanced sports analytics – using PPDA pressing metrics, ball progression, and consistency scores to predict the 2024–25 Premier League winner with a Random Forest model.',
    },
  }
}
