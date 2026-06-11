export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (!totalPages || totalPages <= 1) return null
  const pages = []
  const start = Math.max(1, currentPage - 2)
  const end = Math.min(totalPages, start + 4)
  for (let i = start; i <= end; i++) pages.push(i)

  const btn = 'px-3 py-1.5 text-sm rounded-md border border-gray-200 disabled:opacity-50'
  return (
    <div className="flex items-center justify-end gap-2 mt-4">
      <button disabled={currentPage <= 1} onClick={() => onPageChange(currentPage - 1)} className={btn}>
        Sebelumnya
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          className={`px-3 py-1.5 text-sm rounded-md border ${
            p === currentPage ? 'bg-[#0076D0] text-white border-[#0076D0]' : 'border-gray-200 hover:bg-gray-50'
          }`}
        >
          {p}
        </button>
      ))}
      <button disabled={currentPage >= totalPages} onClick={() => onPageChange(currentPage + 1)} className={btn}>
        Selanjutnya
      </button>
    </div>
  )
}
