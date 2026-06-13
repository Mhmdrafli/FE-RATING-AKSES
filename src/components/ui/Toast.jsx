import useToastStore from '../../store/toastStore'
import { CheckCircle2, XCircle, Info, X } from 'lucide-react'

const ICONS = { success: CheckCircle2, error: XCircle, info: Info }
const BORDERS = { success: '#0076D0', error: '#0076D0', info: '#0076D0' }
const COLORS = { success: 'text-[#0076D0]', error: 'text-[#0076D0]', info: 'text-[#0076D0]' }

export default function Toast() {
  const { toasts, remove } = useToastStore()
  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2 max-w-sm">
      {toasts.map((t) => {
        const Icon = ICONS[t.type] || Info
        return (
          <div
            key={t.id}
            className="bg-white rounded-[10px] shadow-lg px-4 py-3 flex items-center gap-3 border-l-4 animate-[slideIn_0.25s_ease-out]"
            style={{ borderLeftColor: BORDERS[t.type] || '#0076D0' }}
          >
            <Icon className={`w-5 h-5 ${COLORS[t.type] || 'text-blue-500'}`} />
            <span className="text-sm text-gray-800 flex-1">{t.message}</span>
            <button onClick={() => remove(t.id)} className="text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        )
      })}
      <style>{`
        @keyframes slideIn { from { transform: translateX(100%); opacity: 0 } to { transform: translateX(0); opacity: 1 } }
      `}</style>
    </div>
  )
}
