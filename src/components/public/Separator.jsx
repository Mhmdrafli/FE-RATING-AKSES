export default function Separator() {
  return (
    <div className="relative w-full h-20 overflow-hidden" style={{ background: 'linear-gradient(to right, #4A90D9, #00A99D)' }}>
      <div className="absolute top-1/2 -translate-y-1/2 rounded-full bg-white/25" style={{ left: -40, width: 120, height: 120 }} />
      <div className="absolute top-1/2 -translate-y-1/2 rounded-full bg-white/25" style={{ right: -40, width: 120, height: 120 }} />
    </div>
  )
}
