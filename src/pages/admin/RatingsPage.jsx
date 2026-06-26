import { useEffect, useState } from 'react'
import api from '../../lib/api'
import E from '../../lib/endpoints'
import { useGet } from '../../hooks/useApi'
import MetricCard from '../../components/admin/MetricCard'
import DataTable from '../../components/admin/DataTable'
import Pagination from '../../components/ui/Pagination'
import Spinner from '../../components/ui/Spinner'
import useToastStore from '../../store/toastStore'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Star, Download } from 'lucide-react'
import { getErrorMessage } from '../../lib/errorHandler'
import { useRole } from '../../lib/roles'

const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#0076D0]'

export default function RatingsPage() {
  const toast = useToastStore()
  const { isAdminCabang, branch } = useRole()
  const lockedBranch = isAdminCabang && branch ? String(branch.id) : ''
  const [filters, setFilters] = useState({ branch_id: lockedBranch, session_id: '', date_from: '', date_to: '' })
  const [page, setPage] = useState(1)
  const [resp, setResp] = useState(null)
  const [loading, setLoading] = useState(true)

  const scope = isAdminCabang && branch ? { branch_id: branch.id } : {}
  const { data: branchesRes } = useGet(isAdminCabang ? null : E.BRANCHES, { per_page: 100 })
  const { data: sessionsRes } = useGet(E.SESSIONS, { per_page: 100, ...scope })
  const branches = branchesRes?.data?.data || branchesRes?.data || []
  const sessions = sessionsRes?.data?.data || sessionsRes?.data || []

  useEffect(() => {
    setLoading(true)
    api.get(E.RATINGS, { params: { ...filters, page } })
      .then((r) => setResp(r.data?.data || r.data))
      .catch((e) => toast.add(getErrorMessage(e), 'error'))
      .finally(() => setLoading(false))
  }, [JSON.stringify(filters), page])

  const summary = resp?.summary || {}
  const chart = resp?.chart_data || []
  const list = resp?.data?.data || []
  const totalPages = resp?.data?.last_page || 1

  const onFilter = (k, v) => { setFilters((p) => ({ ...p, [k]: v })); setPage(1) }
  const reset = () => { setFilters({ branch_id: lockedBranch, session_id: '', date_from: '', date_to: '' }); setPage(1) }

  const exportCsv = async () => {
    try {
      const res = await api.get(E.RATINGS_EXPORT, { params: filters, responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([res.data]))
      const link = document.createElement('a')
      link.href = url; link.download = 'ratings.csv'
      document.body.appendChild(link); link.click(); link.remove()
    } catch (e) { toast.add('Gagal mengunduh CSV', 'error') }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-100 p-4 grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
        {!isAdminCabang && (
          <div>
            <label className="block text-xs text-gray-500 mb-1">Cabang</label>
            <select className={inputCls} value={filters.branch_id} onChange={(e) => onFilter('branch_id', e.target.value)}>
              <option value="">Semua</option>
              {branches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
        )}
        <div>
          <label className="block text-xs text-gray-500 mb-1">Sesi</label>
          <select className={inputCls} value={filters.session_id} onChange={(e) => onFilter('session_id', e.target.value)}>
            <option value="">Semua</option>
            {sessions.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Dari</label>
          <input type="date" className={inputCls} value={filters.date_from} onChange={(e) => onFilter('date_from', e.target.value)} />
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Sampai</label>
          <input type="date" className={inputCls} value={filters.date_to} onChange={(e) => onFilter('date_to', e.target.value)} />
        </div>
        <div className="flex gap-2">
          <button onClick={reset} className="flex-1 py-2 rounded-lg border border-gray-300 text-sm hover:bg-gray-50">Reset</button>
          <button onClick={exportCsv} className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-[#00A99D] text-white text-sm font-semibold hover:opacity-90">
            <Download className="w-4 h-4" /> CSV
          </button>
        </div>
      </div>

      {loading ? <Spinner /> : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <MetricCard label="Total" value={summary.total_ratings ?? 0} icon={Star} color="blue" />
            <MetricCard label="Tutor" value={(summary.avg_teacher_score ?? 0).toFixed?.(1) || '0.0'} icon={Star} color="blue" />
            <MetricCard label="Ruangan" value={(summary.avg_room_score ?? 0).toFixed?.(1) || '0.0'} icon={Star} color="blue" />
            <MetricCard label="Staf" value={(summary.avg_staff_score ?? 0).toFixed?.(1) || '0.0'} icon={Star} color="blue" />
            <MetricCard label="Platform" value={(summary.avg_platform_score ?? 0).toFixed?.(1) || '0.0'} icon={Star} color="blue" />
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-5">
            <h3 className="font-semibold mb-4">Tren Skor Harian</h3>
            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer>
                <LineChart data={chart}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 5]} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="avg_score" stroke="#0076D0" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <DataTable
            columns={[
              { key: 'no', label: 'No', render: (_, i) => i + 1 + (page - 1) * 15 },
              { key: 'name', label: 'Nama', render: (r) => r.name || 'Anonim' },
              { key: 'session', label: 'Sesi', render: (r) => r.session?.name || '-' },
              { key: 'class_vote', label: 'Kelas', render: (r) => r.class_vote
                ? <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">{r.class_vote}</span>
                : <span className="text-gray-400 text-xs">-</span>
              },
              { key: 'teacher_score', label: 'Tutor', render: (r) => 
  r.answers?.teacher_score ? Number(r.answers.teacher_score).toFixed(1) : '-' 
},
{ key: 'room_score', label: 'Ruangan', render: (r) => 
  r.answers?.room_score ? Number(r.answers.room_score).toFixed(1) : '-' 
},
{ key: 'staff_score', label: 'Staf', render: (r) => 
  r.answers?.staff_score ? Number(r.answers.staff_score).toFixed(1) : '-' 
},
{ key: 'platform_score', label: 'Platform', render: (r) => 
  r.answers?.platform_score ? Number(r.answers.platform_score).toFixed(1) : '-' 
},
              { key: 'overall_score', label: 'Overall', render: (r) => (
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} className="w-3.5 h-3.5" fill={i <= r.overall_score ? '#FACC15' : 'none'} stroke={i <= r.overall_score ? '#FACC15' : '#D1D5DB'} />
                  ))}
                </div>
              )},
              { key: 'notes', label: 'Catatan', render: (r) => r.notes || '-' },
              { key: 'created_at', label: 'Tanggal', render: (r) => r.created_at ? new Date(r.created_at).toLocaleDateString('id-ID') : '-' },
            ]}
            data={list}
            loading={false}
          />
          <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
        </>
      )}
    </div>
  )
}
