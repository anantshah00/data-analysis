/**
 * PlotlyChart.js
 * Dynamic wrapper for react-plotly.js that disables SSR and shows
 * a clean skeleton while the chart library loads.
 */
import dynamic from 'next/dynamic'

const Plot = dynamic(() => import('react-plotly.js'), {
  ssr: false,
  loading: () => (
    <div className="w-full flex items-center justify-center bg-gray-50 rounded-xl animate-pulse"
         style={{ minHeight: 300 }}>
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-pl-purple border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-gray-400 font-medium">Loading chart…</p>
      </div>
    </div>
  ),
})

/**
 * @param {string}  title       - Section title shown above the chart
 * @param {string}  subtitle    - Optional sub-line below title
 * @param {Array}   data        - Plotly traces array
 * @param {Object}  layout      - Plotly layout object (merged with defaults)
 * @param {Object}  config      - Plotly config overrides
 * @param {string}  className   - Extra Tailwind classes for the outer card
 */
export default function PlotlyChart({
  title,
  subtitle,
  data,
  layout = {},
  config = {},
  className = '',
}) {
  const mergedLayout = {
    autosize:        true,
    paper_bgcolor:   'rgba(0,0,0,0)',
    plot_bgcolor:    'rgba(0,0,0,0)',
    modebar: { bgcolor: 'rgba(0,0,0,0)', color: '#9ca3af', activecolor: '#37003C' },
    ...layout,
  }

  const mergedConfig = {
    displayModeBar:    true,
    displaylogo:       false,
    responsive:        true,
    modeBarButtonsToRemove: ['select2d', 'lasso2d', 'autoScale2d'],
    toImageButtonOptions: {
      format: 'png',
      scale:  2,
    },
    ...config,
  }

  return (
    <div className={`chart-card ${className}`}>
      {title && (
        <div className="mb-4">
          <h3 className="text-base font-semibold text-gray-800 leading-snug">{title}</h3>
          {subtitle && (
            <p className="text-xs text-gray-400 mt-0.5 leading-relaxed">{subtitle}</p>
          )}
        </div>
      )}

      <Plot
        data={data}
        layout={mergedLayout}
        config={mergedConfig}
        style={{ width: '100%' }}
        useResizeHandler
      />
    </div>
  )
}
