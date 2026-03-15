/**
 * StatCard.js
 * Large-number highlight card for key project metrics.
 */
export default function StatCard({ value, label, sublabel, icon, delay = '0' }) {
  return (
    <div
      data-animate
      data-delay={delay}
      className="bg-white rounded-2xl px-5 py-5 border border-gray-100 shadow-card text-center group hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
    >
      {icon && (
        <span className="text-2xl mb-2 block">{icon}</span>
      )}
      <div className="text-3xl font-black tracking-tight gradient-text mb-1">{value}</div>
      <div className="text-sm font-semibold text-gray-700 leading-tight">{label}</div>
      {sublabel && (
        <div className="text-xs text-gray-400 mt-0.5">{sublabel}</div>
      )}
    </div>
  )
}
