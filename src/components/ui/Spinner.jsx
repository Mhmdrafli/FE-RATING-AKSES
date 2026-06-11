export default function Spinner({ size = 'md', fullPage = false }) {
  const sizes = { sm: 'w-4 h-4 border-2', md: 'w-8 h-8 border-[3px]', lg: 'w-12 h-12 border-4' }
  const el = (
    <div className={`${sizes[size]} rounded-full border-blue-200 border-t-[#0076D0] animate-spin`} />
  )
  if (fullPage) {
    return (
      <div className="fixed inset-0 bg-white/70 flex items-center justify-center z-50">{el}</div>
    )
  }
  return <div className="flex items-center justify-center py-8">{el}</div>
}
