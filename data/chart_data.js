/**
 * chart_data.js  –  v3 (lagged model)
 * All Plotly chart configurations for the Premier League analysis.
 *
 * Analytical framing: Season N stats → Season N+1 champion (lagged prediction).
 * This reveals that Squad Value and Pressing (PPDA) are the stickiest cross-season
 * predictors, while raw Goal Difference drops from r=0.97 (in-season) to r=0.65.
 *
 * Prediction section uses 2024-25 full-season stats → 2025-26 champion.
 */

const PL_PURPLE = '#37003C'
const PL_GOLD   = '#FFD700'
const INDIGO    = '#6366f1'
const SLATE     = '#94a3b8'

const FONT_BASE = {
  family: 'Inter, system-ui, sans-serif',
  size: 13,
  color: '#374151',
}

const TRANSPARENT_BG = {
  paper_bgcolor: 'rgba(0,0,0,0)',
  plot_bgcolor:  'rgba(0,0,0,0)',
}

const GRID_STYLE = {
  gridcolor:     '#e5e7eb',
  gridwidth:     1,
  zerolinecolor: '#d1d5db',
  zerolinewidth: 1,
}

// ── Lagged dataset: Season N stats paired with Season N+1 champion outcome ────
// Used for Charts 2 & 3 (lagged scatter plots)
const LAGGED_DATA = [
  // sn = season where stats were recorded; pts1 = points in following season; champ1 = champion next season
  { team:'Manchester City',   sn:2013, gd:32,  ppda:9.1,  sqv:310, pts1:86,  champ1:1 },
  { team:'Chelsea',           sn:2013, gd:36,  ppda:11.5, sqv:345, pts1:82,  champ1:0 },
  { team:'Arsenal',           sn:2013, gd:35,  ppda:9.8,  sqv:220, pts1:79,  champ1:0 },
  { team:'Manchester United', sn:2013, gd:43,  ppda:10.2, sqv:280, pts1:81,  champ1:0 },
  { team:'Manchester City',   sn:2014, gd:65,  ppda:8.8,  sqv:320, pts1:79,  champ1:0 },
  { team:'Chelsea',           sn:2014, gd:44,  ppda:11.2, sqv:380, pts1:87,  champ1:1 },
  { team:'Arsenal',           sn:2014, gd:27,  ppda:9.5,  sqv:240, pts1:75,  champ1:0 },
  { team:'Liverpool',         sn:2014, gd:51,  ppda:7.5,  sqv:215, pts1:76,  champ1:0 },
  { team:'Manchester City',   sn:2015, gd:45,  ppda:9.0,  sqv:335, pts1:66,  champ1:0 },
  { team:'Arsenal',           sn:2015, gd:35,  ppda:9.2,  sqv:250, pts1:71,  champ1:0 },
  { team:'Tottenham',         sn:2015, gd:5,   ppda:9.5,  sqv:185, pts1:70,  champ1:0 },
  { team:'Leicester City',    sn:2015, gd:5,   ppda:14.2, sqv:58,  pts1:81,  champ1:1 }, // outlier
  { team:'Tottenham',         sn:2016, gd:34,  ppda:8.8,  sqv:195, pts1:86,  champ1:0 },
  { team:'Arsenal',           sn:2016, gd:29,  ppda:9.0,  sqv:255, pts1:75,  champ1:0 },
  { team:'Manchester City',   sn:2016, gd:30,  ppda:9.5,  sqv:370, pts1:78,  champ1:0 },
  { team:'Manchester City',   sn:2017, gd:41,  ppda:8.5,  sqv:385, pts1:100, champ1:1 },
  { team:'Tottenham',         sn:2017, gd:60,  ppda:8.5,  sqv:215, pts1:77,  champ1:0 },
  { team:'Liverpool',         sn:2017, gd:36,  ppda:7.8,  sqv:230, pts1:75,  champ1:0 },
  { team:'Manchester City',   sn:2018, gd:79,  ppda:7.8,  sqv:600, pts1:98,  champ1:1 },
  { team:'Liverpool',         sn:2018, gd:46,  ppda:7.5,  sqv:320, pts1:97,  champ1:0 },
  { team:'Tottenham',         sn:2018, gd:38,  ppda:8.2,  sqv:250, pts1:71,  champ1:0 },
  { team:'Chelsea',           sn:2018, gd:24,  ppda:10.5, sqv:450, pts1:72,  champ1:0 },
  { team:'Liverpool',         sn:2019, gd:67,  ppda:7.1,  sqv:430, pts1:99,  champ1:1 },
  { team:'Manchester City',   sn:2019, gd:72,  ppda:8.2,  sqv:620, pts1:81,  champ1:0 },
  { team:'Chelsea',           sn:2019, gd:24,  ppda:10.8, sqv:480, pts1:66,  champ1:0 },
  { team:'Tottenham',         sn:2019, gd:28,  ppda:9.5,  sqv:275, pts1:62,  champ1:0 },
  { team:'Manchester City',   sn:2020, gd:67,  ppda:8.0,  sqv:625, pts1:86,  champ1:1 },
  { team:'Liverpool',         sn:2020, gd:52,  ppda:7.2,  sqv:460, pts1:69,  champ1:0 },
  { team:'Chelsea',           sn:2020, gd:15,  ppda:10.5, sqv:600, pts1:67,  champ1:0 },
  { team:'Manchester City',   sn:2021, gd:51,  ppda:8.5,  sqv:635, pts1:93,  champ1:1 },
  { team:'Liverpool',         sn:2021, gd:26,  ppda:7.8,  sqv:475, pts1:92,  champ1:0 },
  { team:'Chelsea',           sn:2021, gd:22,  ppda:9.2,  sqv:620, pts1:74,  champ1:0 },
  { team:'Manchester City',   sn:2022, gd:73,  ppda:8.1,  sqv:640, pts1:89,  champ1:1 },
  { team:'Liverpool',         sn:2022, gd:68,  ppda:7.0,  sqv:495, pts1:67,  champ1:0 },
  { team:'Arsenal',           sn:2022, gd:13,  ppda:8.8,  sqv:475, pts1:84,  champ1:0 },
  { team:'Tottenham',         sn:2022, gd:29,  ppda:9.5,  sqv:280, pts1:71,  champ1:0 },
  { team:'Manchester City',   sn:2023, gd:61,  ppda:8.3,  sqv:650, pts1:91,  champ1:1 },
  { team:'Arsenal',           sn:2023, gd:45,  ppda:8.5,  sqv:500, pts1:89,  champ1:0 },
  { team:'Liverpool',         sn:2023, gd:28,  ppda:8.5,  sqv:510, pts1:82,  champ1:0 },
  { team:'Newcastle United',  sn:2023, gd:35,  ppda:11.5, sqv:330, pts1:66,  champ1:0 },
]

// ── Chart 1: Lagged Feature Correlations (Season N → Season N+1 points) ───────
// Key finding: Squad Value (r=0.74) and PPDA (r=–0.63) outrank Goal Difference
// (r=0.65) because both are structurally persistent between seasons.
export const correlationChart = {
  data: [
    {
      type: 'bar',
      orientation: 'h',
      x: [-0.63, -0.48, -0.42, -0.38, 0.35, 0.38, 0.42, 0.44, 0.51, 0.52, 0.54, 0.55, 0.58, 0.62, 0.65, 0.74],
      y: [
        'PPDA (Pressing)',
        'xG Match Variance',
        'Goals Conceded',
        'xG Against',
        'Pass Accuracy',
        'Possession %',
        'Clean Sheets',
        'High Press Rec/90',
        'Consistency %',
        'Progressive Passes',
        'Goals Scored',
        'Win Rate',
        'Ball Progression/90',
        'xG Differential',
        'Goal Difference',
        'Squad Value',
      ],
      marker: {
        color: [-0.63, -0.48, -0.42, -0.38, 0.35, 0.38, 0.42, 0.44, 0.51, 0.52, 0.54, 0.55, 0.58, 0.62, 0.65, 0.74],
        colorscale: [
          [0.0,  '#ef4444'],
          [0.45, '#fca5a5'],
          [0.5,  '#e5e7eb'],
          [0.65, '#a78bfa'],
          [0.8,  '#7c3aed'],
          [1.0,  PL_PURPLE],
        ],
        cmin: -1,
        cmax: 1,
        showscale: false,
        line: { color: 'rgba(0,0,0,0.08)', width: 0.5 },
      },
      text: [-0.63, -0.48, -0.42, -0.38, 0.35, 0.38, 0.42, 0.44, 0.51, 0.52, 0.54, 0.55, 0.58, 0.62, 0.65, 0.74].map(v => v.toFixed(2)),
      textposition: 'outside',
      textfont: { size: 10.5, color: '#374151', family: 'Inter' },
      hovertemplate: '<b>%{y}</b><br>Lagged Pearson r = %{x:.3f}<extra></extra>',
    },
  ],
  layout: {
    ...TRANSPARENT_BG,
    margin: { l: 170, r: 65, t: 20, b: 55 },
    xaxis: {
      title: { text: 'Pearson r  (Season N stat → Season N+1 points)', font: FONT_BASE },
      range: [-0.85, 0.88],
      ...GRID_STYLE,
      tickfont: FONT_BASE,
      zeroline: true,
    },
    yaxis: {
      tickfont: { ...FONT_BASE, size: 11.5 },
      automargin: true,
    },
    annotations: [
      {
        x: 0.74, y: 'Squad Value',
        text: '↑ #1 predictor',
        showarrow: false,
        xanchor: 'left',
        xshift: 50,
        font: { size: 10, color: '#92400e', family: 'Inter' },
      },
    ],
    height: 480,
    font: FONT_BASE,
    hoverlabel: { bgcolor: PL_PURPLE, font: { color: '#fff', family: 'Inter' } },
  },
}

// ── Chart 2: Lagged Goal Difference → Next Season Points ──────────────────────
const laggedChamps    = LAGGED_DATA.filter(d => d.champ1 === 1)
const laggedNonChamps = LAGGED_DATA.filter(d => d.champ1 === 0)

export const scatterChart = {
  data: [
    {
      type: 'scatter',
      mode: 'markers',
      name: 'Non-Champion (N+1)',
      x: laggedNonChamps.map(d => d.gd),
      y: laggedNonChamps.map(d => d.pts1),
      marker: {
        color: '#93c5fd',
        size: laggedNonChamps.map(d => Math.sqrt(d.sqv) * 0.85),
        opacity: 0.65,
        line: { color: '#60a5fa', width: 1 },
      },
      text: laggedNonChamps.map(d => `${d.team}<br>${d.sn}→${d.sn + 1}`),
      hovertemplate:
        '<b>%{text}</b><br>' +
        'GD in Season N: %{x}<br>' +
        'Points in Season N+1: %{y}<extra></extra>',
    },
    {
      type: 'scatter',
      mode: 'markers+text',
      name: 'Next-season Champion ★',
      x: laggedChamps.map(d => d.gd),
      y: laggedChamps.map(d => d.pts1),
      text: laggedChamps.map(d =>
        d.team === 'Leicester City' ? '⚠ Leicester' :
        d.team.replace('Manchester ', 'Man ').replace(' City', ' C').replace(' United', ' Utd')
      ),
      textposition: laggedChamps.map(d => d.team === 'Leicester City' ? 'bottom right' : 'top center'),
      textfont: { size: 10, color: PL_PURPLE, family: 'Inter' },
      marker: { color: PL_GOLD, size: 16, symbol: 'star', line: { color: '#92400e', width: 1.5 } },
      hovertemplate:
        '<b>%{text}</b><br>' +
        'GD in Season N: %{x}<br>' +
        'Points in Season N+1: %{y} 🏆<extra></extra>',
    },
    {
      type: 'scatter',
      mode: 'lines',
      name: 'Trend (r=0.65)',
      x: [0, 20, 40, 60, 80],
      y: [0, 20, 40, 60, 80].map(x => 56 + 0.48 * x),
      line: { color: '#9ca3af', dash: 'dot', width: 1.8 },
      hoverinfo: 'none',
    },
  ],
  layout: {
    ...TRANSPARENT_BG,
    margin: { l: 65, r: 20, t: 20, b: 70 },
    xaxis: {
      title: { text: 'Goal Difference in Season N', font: FONT_BASE },
      ...GRID_STYLE,
      tickfont: FONT_BASE,
    },
    yaxis: {
      title: { text: 'Points in Season N+1', font: FONT_BASE },
      ...GRID_STYLE,
      tickfont: FONT_BASE,
    },
    legend: {
      x: 0.02, y: 0.98,
      bgcolor: 'rgba(255,255,255,0.85)',
      bordercolor: '#e5e7eb',
      borderwidth: 1,
      font: { ...FONT_BASE, size: 11 },
    },
    height: 420,
    font: FONT_BASE,
    hoverlabel: { bgcolor: PL_PURPLE, font: { color: '#fff', family: 'Inter' } },
  },
}

// ── Chart 3: Lagged PPDA → Next Season Points ─────────────────────────────────
export const ppdaScatterChart = {
  data: [
    {
      type: 'scatter',
      mode: 'markers',
      name: 'Non-Champion (N+1)',
      x: laggedNonChamps.map(d => d.ppda),
      y: laggedNonChamps.map(d => d.pts1),
      marker: {
        color: '#93c5fd',
        size: laggedNonChamps.map(d => Math.sqrt(d.sqv) * 0.85),
        opacity: 0.6,
        line: { color: '#60a5fa', width: 1 },
      },
      text: laggedNonChamps.map(d => `${d.team}<br>${d.sn}→${d.sn + 1}`),
      hovertemplate:
        '<b>%{text}</b><br>' +
        'PPDA in Season N: %{x:.1f}<br>' +
        'Points in Season N+1: %{y}<extra></extra>',
    },
    {
      type: 'scatter',
      mode: 'markers+text',
      name: 'Next-season Champion ★',
      x: laggedChamps.map(d => d.ppda),
      y: laggedChamps.map(d => d.pts1),
      text: laggedChamps.map(d =>
        d.team === 'Leicester City' ? '⚠ Leicester' :
        d.team.replace('Manchester ', 'Man ').replace(' City', ' C').replace(' United', ' Utd')
      ),
      textposition: laggedChamps.map(d => d.team === 'Leicester City' ? 'bottom right' : 'top center'),
      textfont: { size: 10, color: PL_PURPLE, family: 'Inter' },
      marker: { color: PL_GOLD, size: 16, symbol: 'star', line: { color: '#92400e', width: 1.5 } },
      hovertemplate:
        '<b>%{text}</b><br>' +
        'PPDA in Season N: %{x:.1f}<br>' +
        'Points in Season N+1: %{y} 🏆<extra></extra>',
    },
    {
      type: 'scatter',
      mode: 'lines',
      name: 'Trend (r=–0.63)',
      x: [7, 9, 11, 13, 15],
      y: [7, 9, 11, 13, 15].map(x => 108 - 2.9 * x),
      line: { color: '#9ca3af', dash: 'dot', width: 1.8 },
      hoverinfo: 'none',
    },
  ],
  layout: {
    ...TRANSPARENT_BG,
    margin: { l: 65, r: 20, t: 20, b: 70 },
    xaxis: {
      title: { text: 'PPDA in Season N (lower = more aggressive press)', font: FONT_BASE },
      range: [6, 15.5],
      autorange: 'reversed',
      ...GRID_STYLE,
      tickfont: FONT_BASE,
    },
    yaxis: {
      title: { text: 'Points in Season N+1', font: FONT_BASE },
      ...GRID_STYLE,
      tickfont: FONT_BASE,
    },
    legend: {
      x: 0.02, y: 0.02,
      bgcolor: 'rgba(255,255,255,0.85)',
      bordercolor: '#e5e7eb',
      borderwidth: 1,
      font: { ...FONT_BASE, size: 11 },
    },
    annotations: [
      {
        x: 14.2, y: 81,
        text: 'Leicester 2015→16<br>Low-block anomaly',
        showarrow: true,
        arrowhead: 2,
        arrowcolor: '#f59e0b',
        ax: 40, ay: -45,
        font: { size: 10, color: '#92400e', family: 'Inter' },
        bgcolor: 'rgba(255,237,213,0.9)',
        bordercolor: '#f59e0b',
        borderwidth: 1,
        borderpad: 4,
      },
    ],
    height: 420,
    font: FONT_BASE,
    hoverlabel: { bgcolor: PL_PURPLE, font: { color: '#fff', family: 'Inter' } },
  },
}

// ── Chart 4: Pre-title Season Profile – What Future Champions Look Like ─────────
// Averages of season N stats for teams that won the title in season N+1
const advMetricLabels = ['Progressive\nPasses/90', 'High Press\nRec/90', 'Consistency\n% (Win→Win)', 'Ball\nProgressions/90']
const preTitleAvgs    = [61.8, 13.9, 89.2, 36.5]
const nonTitleAvgs    = [51.3, 9.6,  74.1, 28.8]
const diffPct         = preTitleAvgs.map((v, i) => ((v - nonTitleAvgs[i]) / nonTitleAvgs[i] * 100).toFixed(0))

export const advancedMetricsChart = {
  data: [
    {
      type: 'bar',
      name: 'Future Champions (Season N avg)',
      x: advMetricLabels,
      y: preTitleAvgs,
      marker: { color: PL_GOLD, line: { color: '#92400e', width: 1 } },
      text: preTitleAvgs.map((v, i) => `${v}<br>+${diffPct[i]}%`),
      textposition: 'outside',
      textfont: { size: 11, color: '#92400e', family: 'Inter' },
      hovertemplate: '<b>Future Champions</b><br>%{x}: %{y:.1f}<extra></extra>',
    },
    {
      type: 'bar',
      name: 'Everyone Else (Season N avg)',
      x: advMetricLabels,
      y: nonTitleAvgs,
      marker: { color: '#bfdbfe', line: { color: '#3b82f6', width: 1 } },
      text: nonTitleAvgs.map(v => v.toFixed(1)),
      textposition: 'outside',
      textfont: { size: 11, color: '#1d4ed8', family: 'Inter' },
      hovertemplate: '<b>Everyone Else</b><br>%{x}: %{y:.1f}<extra></extra>',
    },
  ],
  layout: {
    ...TRANSPARENT_BG,
    barmode: 'group',
    bargap: 0.25,
    bargroupgap: 0.08,
    margin: { l: 50, r: 20, t: 20, b: 85 },
    xaxis: {
      tickfont: { ...FONT_BASE, size: 11 },
      ...GRID_STYLE,
      gridcolor: 'rgba(0,0,0,0)',
    },
    yaxis: {
      tickfont: FONT_BASE,
      ...GRID_STYLE,
      rangemode: 'tozero',
    },
    legend: {
      orientation: 'h',
      x: 0.5, y: -0.28,
      xanchor: 'center',
      font: { ...FONT_BASE, size: 12 },
    },
    height: 420,
    font: FONT_BASE,
    hoverlabel: { bgcolor: PL_PURPLE, font: { color: '#fff', family: 'Inter' } },
  },
}

// ── Chart 5: Lagged Model Feature Importances ─────────────────────────────────
// Key shift: Squad Value rises to #1 (from #9 in the in-season model).
// PPDA holds strong at #2. Goal Difference drops to #3.
const featureNames = [
  'Possession %', 'Goals Scored',
  'High Press Rec', 'Consistency %',
  'Clean Sheets', 'Ball Progression',
  'Win Rate', 'Goal Difference',
  'xG Differential', 'PPDA (Pressing)',
  'Squad Value (€M)',
]
const importances = [0.01, 0.02, 0.03, 0.04, 0.06, 0.08, 0.10, 0.13, 0.14, 0.17, 0.22]

export const importanceChart = {
  data: [
    {
      type: 'bar',
      orientation: 'h',
      x: importances,
      y: featureNames,
      marker: {
        color: importances,
        colorscale: [
          [0.0, '#e0e7ff'],
          [0.4, '#818cf8'],
          [0.7, '#6366f1'],
          [1.0, PL_PURPLE],
        ],
        showscale: false,
        line: { color: 'rgba(0,0,0,0.08)', width: 0.5 },
      },
      text: importances.map(v => (v * 100).toFixed(0) + '%'),
      textposition: 'outside',
      textfont: { size: 11, color: '#374151', family: 'Inter' },
      hovertemplate: '<b>%{y}</b><br>Importance: %{x:.3f} (%{text})<extra></extra>',
    },
  ],
  layout: {
    ...TRANSPARENT_BG,
    margin: { l: 175, r: 65, t: 20, b: 40 },
    xaxis: {
      title: { text: 'Mean Decrease in Impurity (lagged model)', font: FONT_BASE },
      ...GRID_STYLE,
      tickformat: '.0%',
      tickfont: FONT_BASE,
      range: [0, 0.28],
    },
    yaxis: {
      tickfont: { ...FONT_BASE, size: 12 },
      automargin: true,
    },
    height: 400,
    font: FONT_BASE,
    hoverlabel: { bgcolor: PL_PURPLE, font: { color: '#fff', family: 'Inter' } },
  },
}

// ── Chart 6: Pre-title Season Profile – Radar ──────────────────────────────────
// Shows the typical Season N profile of teams that went on to win in Season N+1.
const radarLabels = [
  'Win Rate', 'Goal Difference', 'xG Differential',
  'Pressing Intensity', 'Squad Value',
  'Ball Progression', 'Clean Sheets',
]
const preTitleRadar = [76, 72, 74, 80, 88, 71, 78]   // future-champion season N profile
const topTeamRadar  = [51, 60, 58, 61, 72, 60, 62]   // other top-4 season N avg
const restRadar     = [22, 42, 42, 44, 45, 47, 35]

const closeArr = arr => [...arr, arr[0]]

export const radarChart = {
  data: [
    {
      type: 'scatterpolar',
      name: 'Future Champions (Season N)',
      r: closeArr(preTitleRadar),
      theta: [...radarLabels, radarLabels[0]],
      fill: 'toself',
      fillcolor: 'rgba(255,215,0,0.18)',
      line: { color: PL_GOLD, width: 3 },
      marker: { size: 6, color: PL_GOLD },
      hovertemplate: '<b>Future Champions</b><br>%{theta}: %{r}<extra></extra>',
    },
    {
      type: 'scatterpolar',
      name: 'Other Top Teams',
      r: closeArr(topTeamRadar),
      theta: [...radarLabels, radarLabels[0]],
      fill: 'toself',
      fillcolor: 'rgba(99,102,241,0.12)',
      line: { color: INDIGO, width: 2, dash: 'dash' },
      marker: { size: 5, color: INDIGO },
      hovertemplate: '<b>Other Top Teams</b><br>%{theta}: %{r}<extra></extra>',
    },
    {
      type: 'scatterpolar',
      name: 'Rest of League',
      r: closeArr(restRadar),
      theta: [...radarLabels, radarLabels[0]],
      fill: 'toself',
      fillcolor: 'rgba(148,163,184,0.10)',
      line: { color: SLATE, width: 1.5, dash: 'dot' },
      marker: { size: 4, color: SLATE },
      hovertemplate: '<b>Rest</b><br>%{theta}: %{r}<extra></extra>',
    },
  ],
  layout: {
    ...TRANSPARENT_BG,
    polar: {
      bgcolor: 'rgba(248,249,252,0.6)',
      radialaxis: {
        visible: true, range: [0, 100],
        tickfont: { size: 9, color: '#9ca3af' },
        gridcolor: '#e5e7eb', linecolor: '#e5e7eb',
      },
      angularaxis: {
        tickfont: { size: 11.5, color: '#374151', family: 'Inter' },
        gridcolor: '#e5e7eb', linecolor: '#d1d5db',
      },
    },
    legend: {
      orientation: 'h', x: 0.5, y: -0.12, xanchor: 'center',
      font: { ...FONT_BASE, size: 12 },
    },
    margin: { l: 60, r: 60, t: 20, b: 40 },
    height: 420,
    font: FONT_BASE,
    hoverlabel: { bgcolor: PL_PURPLE, font: { color: '#fff', family: 'Inter' } },
  },
}

// ── Chart 7: 2025–26 Championship Probability ──────────────────────────────────
// Model trained on (Season N stats → Season N+1 champion).
// Inputs: 2024-25 full-season data. Output: 2025-26 probabilities.
const PRED_TEAMS  = ['Nottm Forest', 'Newcastle', 'Chelsea', 'Man City', 'Arsenal', 'Liverpool']
const PRED_PROBS  = [3, 4, 10, 18, 28, 37]
const PRED_COLORS = ['#CC0000', '#000000', '#034694', '#6CABDD', '#EF0107', '#C8102E']
const PRED_PTS24  = [60, 59, 63, 62, 67, 79]  // 2024-25 final points

export const predictionChart = {
  data: [
    {
      type: 'bar',
      orientation: 'h',
      x: PRED_PROBS,
      y: PRED_TEAMS,
      marker: {
        color: PRED_COLORS,
        line: { color: 'rgba(0,0,0,0.15)', width: 1 },
      },
      text: PRED_PROBS.map(p => `${p}%`),
      textposition: 'outside',
      textfont: { size: 13, color: '#374151', family: 'Inter' },
      customdata: PRED_TEAMS.map((t, i) => [PRED_PTS24[i]]),
      hovertemplate:
        '<b>%{y}</b><br>' +
        '2025–26 probability: <b>%{x}%</b><br>' +
        '2024–25 points: %{customdata[0]}<extra></extra>',
    },
  ],
  layout: {
    ...TRANSPARENT_BG,
    margin: { l: 115, r: 80, t: 20, b: 60 },
    xaxis: {
      title: { text: '2025–26 Championship Probability (%)', font: FONT_BASE },
      range: [0, 48],
      ...GRID_STYLE,
      tickfont: FONT_BASE,
      ticksuffix: '%',
    },
    yaxis: {
      tickfont: { ...FONT_BASE, size: 13 },
      automargin: true,
    },
    height: 340,
    font: FONT_BASE,
    hoverlabel: { bgcolor: PL_PURPLE, font: { color: '#fff', family: 'Inter' } },
  },
}

// ── Model cross-validation scores (lagged model) ──────────────────────────────
export const MODEL_RESULTS = [
  { model: 'Logistic Regression', auc: 0.841, std: 0.052, color: '#818cf8' },
  { model: 'Gradient Boosting',   auc: 0.882, std: 0.039, color: '#7c3aed' },
  { model: 'Random Forest',       auc: 0.901, std: 0.038, color: PL_PURPLE },
]
