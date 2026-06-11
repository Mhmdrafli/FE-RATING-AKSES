import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import Sidebar from './Sidebar'
import TopBar from './TopBar'

export default function AdminLayout() {
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <div className="md:ml-[240px] min-h-screen flex flex-col">
        <TopBar onMenuClick={() => setOpen(true)} />
        <main className="p-4 md:p-8 flex-1"><Outlet /></main>
      </div>
    </div>
  )
}
