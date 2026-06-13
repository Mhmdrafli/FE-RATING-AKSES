import { NavLink, useNavigate } from 'react-router-dom'
import { LayoutDashboard, Building2, Users, DoorOpen, BookOpen, CalendarDays, BarChart2, UserCog, LogOut } from 'lucide-react'
import useAuthStore from '../../store/authStore'
import { useRole } from '../../lib/roles'
import api from '../../lib/api'
import E from '../../lib/endpoints'

const NAV = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/branches', label: 'Cabang', icon: Building2, superOnly: true },
  { to: '/admin/teachers', label: 'Guru', icon: Users },
  { to: '/admin/rooms', label: 'Ruangan', icon: DoorOpen },
  { to: '/admin/classes', label: 'Kelas', icon: BookOpen },
  { to: '/admin/sessions', label: 'Sesi Kelas', icon: CalendarDays },
  { to: '/admin/ratings', label: 'Laporan Rating', icon: BarChart2 },
  { to: '/admin/users', label: 'Manajemen User', icon: UserCog, superOnly: true },
]

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate()
  const { logout } = useAuthStore()
  const { isSuperAdmin } = useRole()
  const nav = NAV.filter((n) => !n.superOnly || isSuperAdmin)
  const handleLogout = async () => {
    try { await api.post(E.LOGOUT) } catch {}
    logout()
    navigate('/admin/login')
  }
  return (
    <>
      {open && <div className="md:hidden fixed inset-0 bg-black/40 z-30" onClick={onClose} />}
      <aside className={`fixed left-0 top-0 h-screen w-[240px] bg-white border-r border-gray-200 z-40 flex flex-col transition-transform ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="py-5 px-6 border-b border-gray-100">
          <div className="font-bold text-[#0076D0]">Akses Learning</div>
          <div className="text-xs text-gray-400">the way become expert</div>
        </div>
        <nav className="px-3 py-4 flex-1 overflow-y-auto">
          {nav.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 py-2.5 px-3 rounded-lg mb-1 text-sm transition ${
                  isActive ? 'bg-[#EFF6FF] text-[#0076D0] font-semibold border-l-[3px] border-[#0076D0]' : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <div className="w-5 h-5 flex items-center justify-center text-[#0076D0]">
                <Icon className="w-5 h-5" />
              </div>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <button onClick={handleLogout} className="m-3 flex items-center gap-3 py-2.5 px-3 rounded-lg text-sm text-red-500 hover:bg-red-50">
          <LogOut className="w-5 h-5" /> Keluar
        </button>
      </aside>
    </>
  )
}
