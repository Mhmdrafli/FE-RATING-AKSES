import { Menu } from 'lucide-react'
import useAuthStore from '../../store/authStore'
import { useLocation } from 'react-router-dom'

const TITLES = {
  dashboard: 'Dashboard', branches: 'Cabang', teachers: 'Guru', rooms: 'Ruangan',
  classes: 'Kelas', sessions: 'Sesi Kelas', ratings: 'Laporan Rating', users: 'Manajemen User',
}

export default function TopBar({ onMenuClick }) {
  const { user } = useAuthStore()
  const { pathname } = useLocation()
  const seg = pathname.split('/')[2] || ''
  const title = TITLES[seg] || 'Admin'
  const name = user?.name || 'Admin'
  const initials = name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
  return (
    <div className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button className="md:hidden text-[#0076D0]" onClick={onMenuClick}><Menu className="w-6 h-6" /></button>
        <h1 className="font-bold text-lg text-gray-900">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#EFF6FF] text-[#0076D0] font-bold flex items-center justify-center">
          {initials}
        </div>
        <span className="text-sm text-gray-700 hidden sm:block">{name}</span>
      </div>
    </div>
  )
}
