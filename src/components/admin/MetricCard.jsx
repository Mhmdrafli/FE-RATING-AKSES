const COLORS = {
  blue: 'bg-[#EFF6FF] text-[#0076D0]',
  green: 'bg-green-50 text-green-600',
  yellow: 'bg-yellow-50 text-yellow-600',
  purple: 'bg-purple-50 text-purple-600',
  teal: 'bg-teal-50 text-[#00A99D]',
}
export default function MetricCard({ label, value, icon: Icon, color = 'blue' }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      {Icon && (
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${COLORS[color] || COLORS.blue}`}>
          <Icon className="w-5 h-5" />
        </div>
      )}
      <div className="text-[13px] text-gray-500">{label}</div>
      <div className="text-[28px] font-bold text-gray-900 mt-1">{value}</div>
    </div>
  )
}
