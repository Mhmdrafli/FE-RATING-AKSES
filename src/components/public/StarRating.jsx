import { Star } from 'lucide-react'
const LABELS = { 1: 'Buruk', 2: 'Kurang', 3: 'Okay', 4: 'Bagus', 5: 'Luar Biasa' }
export default function StarRating({ value = 0, onChange }) {
  return (
    <div className="flex flex-col items-center my-4">
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button type="button" key={n} onClick={() => onChange(n)} className="transition">
            <Star className="w-10 h-10" fill={n <= value ? '#FACC15' : 'none'} stroke={n <= value ? '#FACC15' : '#D1D5DB'} />
          </button>
        ))}
      </div>
      {value > 0 && (
        <div className="mt-2 text-[#0076D0] font-semibold">{LABELS[Math.round(value)]}</div>
      )}
    </div>
  )
}
