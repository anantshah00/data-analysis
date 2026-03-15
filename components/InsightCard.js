/**
 * InsightCard.js
 * Displays a single analytical insight with an icon, headline, and explanation.
 */
export default function InsightCard({ icon, title, description, accent = 'purple', delay = '0' }) {
  const accentMap = {
    purple: {
      border:  'border-pl-purple/20',
      icon:    'bg-pl-purple/10 text-pl-purple',
      title:   'text-pl-purple',
    },
    gold: {
      border:  'border-pl-gold/40',
      icon:    'bg-amber-50 text-amber-600',
      title:   'text-amber-700',
    },
    indigo: {
      border:  'border-indigo-200',
      icon:    'bg-indigo-50 text-indigo-600',
      title:   'text-indigo-700',
    },
    emerald: {
      border:  'border-emerald-200',
      icon:    'bg-emerald-50 text-emerald-600',
      title:   'text-emerald-700',
    },
    rose: {
      border:  'border-rose-200',
      icon:    'bg-rose-50 text-rose-600',
      title:   'text-rose-700',
    },
  }

  const style = accentMap[accent] || accentMap.purple

  return (
    <div
      data-animate
      data-delay={delay}
      className={`bg-white rounded-2xl p-5 border ${style.border} shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1`}
    >
      {/* Icon */}
      <div className={`w-10 h-10 rounded-xl ${style.icon} flex items-center justify-center text-xl mb-3`}>
        {icon}
      </div>

      {/* Content */}
      <h4 className={`font-semibold text-sm leading-snug mb-1.5 ${style.title}`}>{title}</h4>
      <p className="text-gray-500 text-xs leading-relaxed">{description}</p>
    </div>
  )
}
