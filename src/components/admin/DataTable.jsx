import Spinner from '../ui/Spinner'
import EmptyState from '../ui/EmptyState'

export default function DataTable({ columns, data, loading, actions }) {
  if (loading) return <div className="bg-white rounded-xl border border-gray-100"><Spinner /></div>
  if (!data || data.length === 0) return <div className="bg-white rounded-xl border border-gray-100"><EmptyState /></div>
  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#F9FAFB] text-gray-600 uppercase text-[12px]">
            <tr>
              {columns.map((c) => (
                <th key={c.key} className="text-left px-4 py-3 font-semibold">{c.label}</th>
              ))}
              {actions && <th className="text-right px-4 py-3 font-semibold">Aksi</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={row.id ?? i} className="border-t border-gray-100 hover:bg-gray-50 even:bg-[#FAFAFA]">
                {columns.map((c) => (
                  <td key={c.key} className="px-4 py-3 text-gray-800">
                    {c.render ? c.render(row, i) : row[c.key]}
                  </td>
                ))}
                {actions && <td className="px-4 py-3"><div className="flex justify-end gap-2">{actions(row)}</div></td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
