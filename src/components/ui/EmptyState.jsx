import { Inbox } from 'lucide-react'
export default function EmptyState({ message = 'Belum ada data' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-[#0076D0]">
      <Inbox className="w-12 h-12 mb-2" />
      <p className="text-sm">{message}</p>
    </div>
  )
}
