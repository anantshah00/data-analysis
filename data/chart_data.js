/**
 * chart_data.js
 * All Plotly chart configurations for the Premier League analysis.
 * Values are derived from the Python analysis notebook (2013–2024 seasons).
 *
 * Each export is a { data, layout } object ready to pass to <Plot />.
 */

const PL_PURPLE = '#37003C'
const PL_GOLD   = '#FFD700'
const INDIGO    = '#6366f1'
const SLATE     = '#94a3b8'
const RED       = '#ef4444'
const EMERALD   = '#10b981'

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
  gridcolor:    '#e5e7eb',
  gridwidth:    1,
  zerolinecolor:'#d1d5db',
  zerolinewidth: 1,
}

// ── Full season dataset ────────────────────────────────────────────────────────
// Columns: season, team, pts, goal_diff, xg_diff, clean_sheets, sot_pg,
//          possession, pass_acc, squad_value_m, champion
export const SEASON_DATA = [
  // 2013
  { season:2013, team:'Manchester United', pts:89,  gd:43, xgd:41.2, cs:18, sot:5.8, poss:53.1, pass:83.1, sqv:280, champion:1 },
  { season:2013, team:'Manchester City',   pts:78,  gd:32, xgd:30.1, cs:18, sot:5.9, poss:55.4, pass:84.0, sqv:310, champion:0 },
  { season:2013, team:'Chelsea',           pts:75,  gd:36, xgd:34.0, cs:16, sot:5.5, poss:54.0, pass:84.5, sqv:345, champion:0 },
  { season:2013, team:'Arsenal',           pts:73,  gd:35, xgd:33.2, cs:17, sot:5.2, poss:56.2, pass:86.0, sqv:220, champion:0 },
  { season:2013, team:'Tottenham',         pts:72,  gd:20, xgd:18.8, cs:15, sot:5.1, poss:52.0, pass:83.2, sqv:230, champion:0 },
  // 2014
  { season:2014, team:'Manchester City',   pts:86,  gd:65, xgd:61.5, cs:14, sot:6.2, poss:55.5, pass:84.3, sqv:320, champion:1 },
  { season:2014, team:'Liverpool',         pts:84,  gd:51, xgd:48.8, cs:12, sot:6.5, poss:55.2, pass:83.5, sqv:215, champion:0 },
  { season:2014, team:'Chelsea',           pts:82,  gd:44, xgd:42.1, cs:20, sot:5.0, poss:52.1, pass:86.0, sqv:380, champion:0 },
  { season:2014, team:'Arsenal',           pts:79,  gd:27, xgd:25.6, cs:15, sot:5.3, poss:55.0, pass:85.5, sqv:240, champion:0 },
  { season:2014, team:'Everton',           pts:72,  gd:22, xgd:20.4, cs:14, sot:4.8, poss:51.0, pass:82.1, sqv:145, champion:0 },
  // 2015
  { season:2015, team:'Chelsea',           pts:87,  gd:41, xgd:39.4, cs:17, sot:5.0, poss:52.3, pass:86.2, sqv:405, champion:1 },
  { season:2015, team:'Manchester City',   pts:79,  gd:45, xgd:43.2, cs:14, sot:6.0, poss:55.1, pass:84.0, sqv:335, champion:0 },
  { season:2015, team:'Arsenal',           pts:75,  gd:35, xgd:33.5, cs:15, sot:5.1, poss:56.0, pass:86.1, sqv:250, champion:0 },
  { season:2015, team:'Manchester United', pts:70,  gd:25, xgd:23.8, cs:15, sot:4.8, poss:51.5, pass:83.0, sqv:295, champion:0 },
  { season:2015, team:'Tottenham',         pts:64,  gd:5,  xgd:4.5,  cs:13, sot:4.9, poss:54.0, pass:84.5, sqv:185, champion:0 },
  // 2016
  { season:2016, team:'Leicester City',    pts:81,  gd:32, xgd:30.2, cs:15, sot:4.2, poss:43.8, pass:73.5, sqv:65,  champion:1 },
  { season:2016, team:'Arsenal',           pts:71,  gd:29, xgd:27.8, cs:16, sot:5.2, poss:55.9, pass:86.0, sqv:255, champion:0 },
  { season:2016, team:'Tottenham',         pts:70,  gd:34, xgd:32.5, cs:14, sot:5.4, poss:57.0, pass:85.0, sqv:195, champion:0 },
  { season:2016, team:'Manchester City',   pts:66,  gd:30, xgd:28.6, cs:12, sot:5.5, poss:53.5, pass:84.0, sqv:370, champion:0 },
  { season:2016, team:'Manchester United', pts:66,  gd:14, xgd:13.4, cs:16, sot:4.2, poss:53.8, pass:84.5, sqv:345, champion:0 },
  // 2017
  { season:2017, team:'Chelsea',           pts:93,  gd:52, xgd:50.1, cs:16, sot:5.3, poss:53.0, pass:85.0, sqv:430, champion:1 },
  { season:2017, team:'Tottenham',         pts:86,  gd:60, xgd:57.8, cs:14, sot:5.9, poss:57.5, pass:85.5, sqv:215, champion:0 },
  { season:2017, team:'Manchester City',   pts:78,  gd:41, xgd:39.4, cs:14, sot:5.8, poss:55.0, pass:84.3, sqv:385, champion:0 },
  { season:2017, team:'Liverpool',         pts:76,  gd:36, xgd:34.6, cs:13, sot:5.7, poss:57.0, pass:84.1, sqv:230, champion:0 },
  { season:2017, team:'Arsenal',           pts:75,  gd:33, xgd:31.7, cs:14, sot:5.2, poss:56.0, pass:85.5, sqv:270, champion:0 },
  // 2018
  { season:2018, team:'Manchester City',   pts:100, gd:79, xgd:64.7, cs:21, sot:6.8, poss:57.8, pass:88.0, sqv:600, champion:1 },
  { season:2018, team:'Manchester United', pts:81,  gd:40, xgd:31.2, cs:19, sot:5.0, poss:51.3, pass:84.0, sqv:430, champion:0 },
  { season:2018, team:'Tottenham',         pts:77,  gd:38, xgd:34.0, cs:14, sot:5.6, poss:54.8, pass:84.5, sqv:250, champion:0 },
  { season:2018, team:'Liverpool',         pts:75,  gd:46, xgd:39.4, cs:12, sot:5.8, poss:59.2, pass:85.1, sqv:320, champion:0 },
  { season:2018, team:'Chelsea',           pts:70,  gd:24, xgd:25.0, cs:16, sot:5.0, poss:53.0, pass:85.8, sqv:450, champion:0 },
  // 2019
  { season:2019, team:'Manchester City',   pts:98,  gd:72, xgd:71.0, cs:22, sot:6.6, poss:56.4, pass:88.1, sqv:620, champion:1 },
  { season:2019, team:'Liverpool',         pts:97,  gd:67, xgd:57.1, cs:21, sot:5.8, poss:59.0, pass:86.0, sqv:430, champion:0 },
  { season:2019, team:'Chelsea',           pts:72,  gd:24, xgd:27.5, cs:16, sot:5.0, poss:52.5, pass:85.5, sqv:480, champion:0 },
  { season:2019, team:'Tottenham',         pts:71,  gd:28, xgd:30.1, cs:13, sot:5.5, poss:53.8, pass:83.5, sqv:275, champion:0 },
  { season:2019, team:'Arsenal',           pts:70,  gd:22, xgd:24.5, cs:13, sot:5.3, poss:52.0, pass:85.0, sqv:330, champion:0 },
  // 2020
  { season:2020, team:'Liverpool',         pts:99,  gd:52, xgd:48.8, cs:22, sot:5.2, poss:58.8, pass:86.0, sqv:460, champion:1 },
  { season:2020, team:'Manchester City',   pts:81,  gd:67, xgd:57.5, cs:16, sot:6.8, poss:57.5, pass:88.5, sqv:625, champion:0 },
  { season:2020, team:'Manchester United', pts:66,  gd:30, xgd:19.2, cs:13, sot:4.8, poss:49.5, pass:83.0, sqv:455, champion:0 },
  { season:2020, team:'Chelsea',           pts:66,  gd:15, xgd:22.0, cs:15, sot:5.3, poss:52.0, pass:85.0, sqv:600, champion:0 },
  { season:2020, team:'Leicester City',    pts:62,  gd:26, xgd:25.7, cs:13, sot:5.0, poss:48.0, pass:79.5, sqv:175, champion:0 },
  // 2021
  { season:2021, team:'Manchester City',   pts:86,  gd:51, xgd:58.3, cs:19, sot:6.2, poss:57.2, pass:88.0, sqv:635, champion:1 },
  { season:2021, team:'Manchester United', pts:74,  gd:29, xgd:22.0, cs:14, sot:5.0, poss:52.0, pass:83.5, sqv:490, champion:0 },
  { season:2021, team:'Liverpool',         pts:69,  gd:26, xgd:28.2, cs:12, sot:5.3, poss:58.5, pass:86.5, sqv:475, champion:0 },
  { season:2021, team:'Chelsea',           pts:67,  gd:22, xgd:25.8, cs:16, sot:4.8, poss:52.5, pass:86.0, sqv:620, champion:0 },
  { season:2021, team:'Leicester City',    pts:66,  gd:18, xgd:19.5, cs:12, sot:5.1, poss:48.5, pass:80.0, sqv:185, champion:0 },
  // 2022
  { season:2022, team:'Manchester City',   pts:93,  gd:73, xgd:66.7, cs:22, sot:6.7, poss:57.5, pass:88.2, sqv:640, champion:1 },
  { season:2022, team:'Liverpool',         pts:92,  gd:68, xgd:63.4, cs:20, sot:6.5, poss:59.5, pass:86.5, sqv:495, champion:0 },
  { season:2022, team:'Chelsea',           pts:74,  gd:43, xgd:37.5, cs:16, sot:5.2, poss:54.0, pass:86.8, sqv:670, champion:0 },
  { season:2022, team:'Tottenham',         pts:71,  gd:29, xgd:24.5, cs:13, sot:5.3, poss:54.2, pass:83.5, sqv:280, champion:0 },
  { season:2022, team:'Arsenal',           pts:69,  gd:13, xgd:18.5, cs:14, sot:5.0, poss:54.5, pass:84.5, sqv:475, champion:0 },
  // 2023
  { season:2023, team:'Manchester City',   pts:89,  gd:61, xgd:58.5, cs:22, sot:6.8, poss:57.0, pass:88.0, sqv:650, champion:1 },
  { season:2023, team:'Arsenal',           pts:84,  gd:45, xgd:41.0, cs:14, sot:5.8, poss:59.5, pass:88.5, sqv:500, champion:0 },
  { season:2023, team:'Manchester United', pts:75,  gd:15, xgd:15.0, cs:15, sot:4.8, poss:53.0, pass:85.0, sqv:510, champion:0 },
  { season:2023, team:'Newcastle United',  pts:71,  gd:35, xgd:33.5, cs:18, sot:5.0, poss:48.5, pass:80.5, sqv:330, champion:0 },
  { season:2023, team:'Liverpool',         pts:67,  gd:28, xgd:28.0, cs:12, sot:5.6, poss:57.0, pass:86.0, sqv:510, champion:0 },
  // 2024
  { season:2024, team:'Manchester City',   pts:91,  gd:62, xgd:57.5, cs:20, sot:6.5, poss:56.8, pass:87.5, sqv:660, champion:1 },
  { season:2024, team:'Arsenal',           pts:89,  gd:62, xgd:58.5, cs:19, sot:5.9, poss:60.0, pass:88.8, sqv:515, champion:0 },
  { season:2024, team:'Liverpool',         pts:82,  gd:45, xgd:44.0, cs:14, sot:5.8, poss:60.5, pass:88.0, sqv:525, champion:0 },
  { season:2024, team:'Aston Villa',       pts:76,  gd:15, xgd:16.0, cs:12, sot:5.3, poss:48.0, pass:79.0, sqv:295, champion:0 },
  { season:2024, team:'Tottenham',         pts:66,  gd:13, xgd:15.5, cs:11, sot:5.5, poss:52.5, pass:82.5, sqv:310, champion:0 },
]

// ── Chart 1: Feature Correlations with Final Points ────────────────────────────
export const correlationChart = {
  data: [
    {
      type: 'bar',
      orientation: 'h',
      x: [-0.89, -0.87, 0.48, 0.54, 0.72, 0.78, 0.81, 0.87, 0.95, 0.97, 0.97],
      y: [
        'Goals Conceded', 'xG Against',
        'Pass Accuracy', 'Possession %', 'Squad Value',
        'Shots on Target/G', 'Clean Sheets',
        'Goals Scored', 'xG Differential',
        'Win Rate', 'Goal Difference',
      ],
      marker: {
        color: [-0.89, -0.87, 0.48, 0.54, 0.72, 0.78, 0.81, 0.87, 0.95, 0.97, 0.97],
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
      text: [-0.89, -0.87, 0.48, 0.54, 0.72, 0.78, 0.81, 0.87, 0.95, 0.97, 0.97].map(v => v.toFixed(2)),
      textposition: 'outside',
      textfont: { size: 12, color: '#374151', family: 'Inter' },
      hovertemplate: '<b>%{y}</b><br>Pearson r = %{x:.3f}<extra></extra>',
    },
  ],
  layout: {
    ...TRANSPARENT_BG,
    margin: { l: 160, r: 60, t: 20, b: 40 },
    xaxis: {
      title: { text: 'Pearson r', font: FONT_BASE },
      range: [-1.15, 1.15],
      ...GRID_STYLE,
      tickfont: FONT_BASE,
      zeroline: true,
    },
    yaxis: {
      tickfont: { ...FONT_BASE, size: 12.5 },
      automargin: true,
    },
    height: 380,
    font: FONT_BASE,
    hoverlabel: { bgcolor: PL_PURPLE, font: { color: '#fff', family: 'Inter' } },
  },
}

// ── Chart 2: Goal Difference vs Final Points (Scatter) ────────────────────────
const champions    = SEASON_DATA.filter(d => d.champion === 1)
const nonChampions = SEASON_DATA.filter(d => d.champion === 0)

export const scatterChart = {
  data: [
    {
      type: 'scatter',
      mode: 'markers',
      name: 'Non-Champion',
      x: nonChampions.map(d => d.gd),
      y: nonChampions.map(d => d.pts),
      marker: {
        color: '#93c5fd',
        size: nonChampions.map(d => Math.sqrt(d.sqv) * 0.9),
        opacity: 0.65,
        line: { color: '#60a5fa', width: 1 },
      },
      text: nonChampions.map(d => `${d.team}<br>${d.season}`),
      hovertemplate:
        '<b>%{text}</b><br>' +
        'Goal Diff: %{x}<br>' +
        'Points: %{y}<br>' +
        'Squad Value: €%{customdata}M<extra></extra>',
      customdata: nonChampions.map(d => d.sqv),
    },
    {
      type: 'scatter',
      mode: 'markers+text',
      name: 'Champion ★',
      x: champions.map(d => d.gd),
      y: champions.map(d => d.pts),
      text: champions.map(d => d.team.replace('Manchester ', 'Man ').replace(' City','C.').replace(' United','Utd')),
      textposition: 'top center',
      textfont: { size: 10, color: PL_PURPLE, family: 'Inter' },
      marker: {
        color: PL_GOLD,
        size: 16,
        symbol: 'star',
        line: { color: '#92400e', width: 1.5 },
      },
      hovertemplate:
        '<b>%{customdata[0]} %{customdata[1]}</b><br>' +
        'Goal Diff: %{x}<br>' +
        'Points: %{y} 🏆<extra></extra>',
      customdata: champions.map(d => [d.team, d.season]),
    },
    // OLS trendline
    {
      type: 'scatter',
      mode: 'lines',
      name: 'Trend (r=0.97)',
      x: [-20, 0, 20, 40, 60, 80],
      y: [-20, 0, 20, 40, 60, 80].map(x => 66.7 + 0.51 * x),
      line: { color: '#9ca3af', dash: 'dot', width: 1.8 },
      hoverinfo: 'none',
      showlegend: true,
    },
  ],
  layout: {
    ...TRANSPARENT_BG,
    margin: { l: 60, r: 20, t: 20, b: 60 },
    xaxis: {
      title: { text: 'Goal Difference (season total)', font: FONT_BASE },
      ...GRID_STYLE,
      tickfont: FONT_BASE,
    },
    yaxis: {
      title: { text: 'Final Points', font: FONT_BASE },
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
    height: 400,
    font: FONT_BASE,
    hoverlabel: { bgcolor: PL_PURPLE, font: { color: '#fff', family: 'Inter' } },
  },
}

// ── Chart 3: Points Race (Top Teams Over Seasons) ─────────────────────────────
const seasons = [2013,2014,2015,2016,2017,2018,2019,2020,2021,2022,2023,2024]

function teamPointsBySeason(teamName) {
  return seasons.map(s => {
    const row = SEASON_DATA.find(d => d.team === teamName && d.season === s)
    return row ? row.pts : null
  })
}

const TEAM_COLORS = {
  'Manchester City':   '#6CABDD',
  'Liverpool':         '#C8102E',
  'Arsenal':           '#EF0107',
  'Chelsea':           '#034694',
  'Tottenham':         '#132257',
}

export const lineChart = {
  data: Object.entries(TEAM_COLORS).map(([team, color]) => ({
    type: 'scatter',
    mode: 'lines+markers',
    name: team.replace('Manchester ', 'Man '),
    x: seasons,
    y: teamPointsBySeason(team),
    connectgaps: false,
    line: { color, width: 2.5 },
    marker: {
      color,
      size: seasons.map(s => {
        const row = SEASON_DATA.find(d => d.team === team && d.season === s)
        return row && row.champion ? 14 : 7
      }),
      symbol: seasons.map(s => {
        const row = SEASON_DATA.find(d => d.team === team && d.season === s)
        return row && row.champion ? 'star' : 'circle'
      }),
      line: { color: 'white', width: 1.5 },
    },
    hovertemplate:
      '<b>%{fullData.name}</b><br>' +
      'Season: %{x}<br>' +
      'Points: %{y}<extra></extra>',
  })),
  layout: {
    ...TRANSPARENT_BG,
    margin: { l: 60, r: 20, t: 20, b: 60 },
    xaxis: {
      title: { text: 'Season (end year)', font: FONT_BASE },
      tickmode: 'array',
      tickvals: seasons,
      ticktext: seasons.map(s => `'${String(s).slice(-2)}`),
      tickfont: FONT_BASE,
      ...GRID_STYLE,
    },
    yaxis: {
      title: { text: 'Final Points', font: FONT_BASE },
      range: [55, 108],
      ...GRID_STYLE,
      tickfont: FONT_BASE,
    },
    legend: {
      orientation: 'h',
      x: 0.5, y: -0.18,
      xanchor: 'center',
      font: { ...FONT_BASE, size: 11 },
    },
    // Horizontal line at 90 points (typical title-winning threshold)
    shapes: [
      {
        type: 'line',
        x0: 2012.5, x1: 2024.5,
        y0: 90, y1: 90,
        line: { color: '#f59e0b', dash: 'dash', width: 1.5 },
      },
    ],
    annotations: [
      {
        x: 2013.2, y: 91.5,
        text: '90-point mark',
        showarrow: false,
        font: { size: 10, color: '#f59e0b', family: 'Inter' },
      },
    ],
    height: 400,
    font: FONT_BASE,
    hoverlabel: { bgcolor: PL_PURPLE, font: { color: '#fff', family: 'Inter' } },
  },
}

// ── Chart 4: Champions vs The Rest — Key Metrics Comparison ───────────────────
const metricLabels = ['Goal Diff', 'Clean Sheets', 'Shots on Target/G', 'Possession %', 'Pass Accuracy %']
const champAvgs    = [56.9,  19.0, 5.94, 54.9, 87.2]
const otherAvgs    = [27.1,  13.5, 5.15, 52.4, 83.7]

export const groupedBarChart = {
  data: [
    {
      type: 'bar',
      name: 'Champions Avg',
      x: metricLabels,
      y: champAvgs,
      marker: {
        color: PL_GOLD,
        line: { color: '#92400e', width: 1 },
      },
      text: champAvgs.map(v => v.toFixed(1)),
      textposition: 'outside',
      textfont: { size: 12, color: '#92400e', family: 'Inter' },
      hovertemplate: '<b>Champions</b><br>%{x}: %{y:.1f}<extra></extra>',
    },
    {
      type: 'bar',
      name: 'Non-Champions Avg',
      x: metricLabels,
      y: otherAvgs,
      marker: {
        color: '#bfdbfe',
        line: { color: '#3b82f6', width: 1 },
      },
      text: otherAvgs.map(v => v.toFixed(1)),
      textposition: 'outside',
      textfont: { size: 12, color: '#1d4ed8', family: 'Inter' },
      hovertemplate: '<b>Non-Champions</b><br>%{x}: %{y:.1f}<extra></extra>',
    },
  ],
  layout: {
    ...TRANSPARENT_BG,
    barmode: 'group',
    bargap: 0.25,
    bargroupgap: 0.08,
    margin: { l: 50, r: 20, t: 20, b: 70 },
    xaxis: {
      tickfont: { ...FONT_BASE, size: 12 },
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
      x: 0.5, y: -0.22,
      xanchor: 'center',
      font: { ...FONT_BASE, size: 12 },
    },
    height: 380,
    font: FONT_BASE,
    hoverlabel: { bgcolor: PL_PURPLE, font: { color: '#fff', family: 'Inter' } },
  },
}

// ── Chart 5: Random Forest Feature Importances ────────────────────────────────
const featureNames = [
  'Goals Conceded', 'Pass Accuracy',
  'Possession %', 'Squad Value',
  'Shots on Target/G', 'Goals Scored',
  'Clean Sheets', 'Win Rate',
  'xG Differential', 'Goal Difference',
]
const importances = [0.01, 0.03, 0.04, 0.07, 0.08, 0.09, 0.11, 0.17, 0.19, 0.22]

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
      textfont: { size: 11.5, color: '#374151', family: 'Inter' },
      hovertemplate: '<b>%{y}</b><br>Importance: %{x:.3f} (%{text})<extra></extra>',
    },
  ],
  layout: {
    ...TRANSPARENT_BG,
    margin: { l: 160, r: 60, t: 20, b: 40 },
    xaxis: {
      title: { text: 'Mean Decrease in Impurity', font: FONT_BASE },
      ...GRID_STYLE,
      tickformat: '.0%',
      tickfont: FONT_BASE,
      range: [0, 0.28],
    },
    yaxis: {
      tickfont: { ...FONT_BASE, size: 12.5 },
      automargin: true,
    },
    height: 360,
    font: FONT_BASE,
    hoverlabel: { bgcolor: PL_PURPLE, font: { color: '#fff', family: 'Inter' } },
  },
}

// ── Chart 6: Champion Statistical Profile — Radar ─────────────────────────────
// Values normalised to 0-100 using min-max across the full dataset
const radarLabels = [
  'Win Rate', 'Goal Difference', 'xG Differential',
  'Clean Sheets', 'Shots on Target/G',
  'Possession %', 'Pass Accuracy',
]
const champRadar  = [79, 75, 80, 81, 82, 68, 87]
const top4Radar   = [52, 62, 60, 64, 70, 60, 78]
const othersRadar = [21, 44, 44, 36, 43, 49, 65]

// Close the polygon
const closeArr = arr => [...arr, arr[0]]

export const radarChart = {
  data: [
    {
      type: 'scatterpolar',
      name: 'Champions (avg)',
      r: closeArr(champRadar),
      theta: [...radarLabels, radarLabels[0]],
      fill: 'toself',
      fillcolor: 'rgba(255,215,0,0.18)',
      line: { color: PL_GOLD, width: 3 },
      marker: { size: 6, color: PL_GOLD },
      hovertemplate: '<b>Champions</b><br>%{theta}: %{r}<extra></extra>',
    },
    {
      type: 'scatterpolar',
      name: 'Top-4 (avg)',
      r: closeArr(top4Radar),
      theta: [...radarLabels, radarLabels[0]],
      fill: 'toself',
      fillcolor: 'rgba(99,102,241,0.12)',
      line: { color: INDIGO, width: 2, dash: 'dash' },
      marker: { size: 5, color: INDIGO },
      hovertemplate: '<b>Top 4</b><br>%{theta}: %{r}<extra></extra>',
    },
    {
      type: 'scatterpolar',
      name: 'Rest of league',
      r: closeArr(othersRadar),
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
        visible: true,
        range: [0, 100],
        tickfont: { size: 9, color: '#9ca3af' },
        gridcolor: '#e5e7eb',
        linecolor: '#e5e7eb',
      },
      angularaxis: {
        tickfont: { size: 11.5, color: '#374151', family: 'Inter' },
        gridcolor: '#e5e7eb',
        linecolor: '#d1d5db',
      },
    },
    legend: {
      orientation: 'h',
      x: 0.5, y: -0.12,
      xanchor: 'center',
      font: { ...FONT_BASE, size: 12 },
    },
    margin: { l: 60, r: 60, t: 20, b: 40 },
    height: 400,
    font: FONT_BASE,
    hoverlabel: { bgcolor: PL_PURPLE, font: { color: '#fff', family: 'Inter' } },
  },
}

// ── Model cross-validation scores (for display) ───────────────────────────────
export const MODEL_RESULTS = [
  { model: 'Logistic Regression', auc: 0.892, std: 0.041, color: '#818cf8' },
  { model: 'Random Forest',       auc: 0.951, std: 0.028, color: PL_PURPLE },
  { model: 'Gradient Boosting',   auc: 0.937, std: 0.033, color: '#7c3aed' },
]
