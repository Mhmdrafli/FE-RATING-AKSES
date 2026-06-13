const COLORS = {
  blue: 'bg-[#EFF6FF] text-[#0076D0]',
  green: 'bg-[#EFF6FF] text-[#0076D0]',
  yellow: 'bg-[#EFF6FF] text-[#0076D0]',
  purple: 'bg-[#EFF6FF] text-[#0076D0]',
  teal: 'bg-[#EFF6FF] text-[#0076D0]',
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
