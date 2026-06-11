import { useGet } from '../../hooks/useApi'
import E from '../../lib/endpoints'
import MetricCard from '../../components/admin/MetricCard'
import Spinner from '../../components/ui/Spinner'
import EmptyState from '../../components/ui/EmptyState'
import { CalendarDays, Star, TrendingUp, Building2 } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function DashboardPage() {
  const { data, loading, error } = useGet(E.DASHBOARD)
  if (loading) return <Spinner />
  if (error) return <div className="text-red-500">{error}</div>
  const d = data?.data || {}
  const chart = d.chart_data || []
  const recent = d.recent_ratings || []

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard label="Total Sesi" value={d.total_sessions ?? 0} icon={CalendarDays} color="blue" />
        <MetricCard label="Total Rating" value={d.total_ratings ?? 0} icon={Star} color="yellow" />
        <MetricCard label="Rata-rata Skor" value={(d.average_score ?? 0).toFixed ? d.average_score.toFixed(1) : d.average_score} icon={TrendingUp} color="green" />
        <MetricCard label="Cabang Aktif" value={d.active_branches ?? 0} icon={Building2} color="teal" />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Skor Rata-rata per Sesi</h3>
        {chart.length === 0 ? <EmptyState /> : (
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={chart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="session_name" tick={{ fontSize: 12 }} />
                <YAxis domain={[0, 5]} tick={{ fontSize: 12 }} />
                <Tooltip />
                <Bar dataKey="avg_score" fill="#0076D0" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl border border-gray-100">
        <h3 className="font-semibold text-gray-900 p-5 border-b border-gray-100">Rating Terbaru</h3>
        {recent.length === 0 ? <EmptyState /> : (
          <table className="w-full text-sm">
            <thead className="bg-[#F9FAFB] text-gray-600 uppercase text-[12px]">
              <tr>
                <th className="text-left px-4 py-3">Sesi</th>
                <th className="text-left px-4 py-3">Guru</th>
                <th className="text-left px-4 py-3">Ruangan</th>
                <th className="text-left px-4 py-3">Skor</th>
                <th className="text-left px-4 py-3">Total</th>
                <th className="text-left px-4 py-3">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((r, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="px-4 py-3">{r.session_name}</td>
                  <td className="px-4 py-3">{r.teacher_name}</td>
                  <td className="px-4 py-3">{r.room_name}</td>
                  <td className="px-4 py-3 font-semibold text-[#0076D0]">{Number(r.avg_score).toFixed(1)}</td>
                  <td className="px-4 py-3">{r.total_ratings}</td>
                  <td className="px-4 py-3 text-gray-500">{r.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
