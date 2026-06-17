import { useParams, useNavigate } from 'react-router-dom'
import { useGet } from '../../hooks/useApi'
import E from '../../lib/endpoints'
import { QRCodeCanvas } from 'qrcode.react'
import Spinner from '../../components/ui/Spinner'
import useToastStore from '../../store/toastStore'
import { ArrowLeft, Copy, Printer } from 'lucide-react'

export default function SessionQRPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToastStore()
  const { data, loading, error } = useGet(E.SESSION(id))
  if (loading) return <Spinner />
  if (error) return <div className="text-red-500">{error}</div>
  const s = data?.data || data
  if (!s) return null
  const url = `${window.location.origin}/rating/${s.slug_token}`

  const copy = () => { navigator.clipboard.writeText(url); toast.add('Link disalin!', 'success') }

  return (
    <div className="max-w-[480px] mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 mb-4 text-sm hover:text-gray-900">
        <ArrowLeft className="w-4 h-4" /> Kembali
      </button>
      <div className="bg-white rounded-2xl border border-gray-100 p-8 print:border-none print:shadow-none">
        <h2 className="font-bold text-xl text-center mb-1">{s.name}</h2>
        <p className="text-sm text-gray-500 text-center mb-6">Scan QR untuk mengisi rating</p>

        <table className="w-full text-sm mb-6">
          <tbody>
            <tr><td className="text-gray-500 py-1">Kelas</td><td className="py-1 text-right font-medium">{s.class?.name || '-'}</td></tr>
            <tr><td className="text-gray-500 py-1">Guru</td><td className="py-1 text-right font-medium">{s.teacher?.full_name || '-'}</td></tr>
            <tr><td className="text-gray-500 py-1">Ruangan</td><td className="py-1 text-right font-medium">{s.room?.name || '-'}</td></tr>
            <tr><td className="text-gray-500 py-1">Waktu</td><td className="py-1 text-right font-medium">{s.start_time ? new Date(s.start_time).toLocaleString('id-ID') : '-'}</td></tr>
          </tbody>
        </table>

        <div className="flex justify-center mb-4 p-4 bg-white">
          <QRCodeCanvas value={url} size={256} />
        </div>
        <p className="text-xs text-gray-400 text-center break-all mb-6 select-all">{url}</p>

        <div className="flex gap-2 print:hidden">
          <button onClick={copy} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm">
            <Copy className="w-4 h-4" /> Salin Link
          </button>
          <button onClick={() => window.print()} className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-[#0076D0] text-white hover:bg-[#005FA3] text-sm font-semibold">
            <Printer className="w-4 h-4" /> Cetak QR
          </button>
        </div>
      </div>
    </div>
  )
}
