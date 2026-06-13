import { useEffect, useState, useCallback } from 'react'
import api from '../../lib/api'
import DataTable from './DataTable'
import Pagination from '../ui/Pagination'
import Modal from '../ui/Modal'
import ConfirmDialog from './ConfirmDialog'
import useToastStore from '../../store/toastStore'
import { useForm } from 'react-hook-form'
import { Pencil, Trash2, Plus, Search } from 'lucide-react'
import { getErrorMessage, getFieldErrors } from '../../lib/errorHandler'

/**
 * Props:
 *  title, endpoint, itemEndpoint(id), columns, defaultValues, renderForm(register, errors, watch, setValue), extraActions(row), useFormData(bool)
 */
export default function CrudPage({
  title, endpoint, itemEndpoint, columns,
  defaultValues = {}, renderForm, extraActions, useFormData = false,
  buildPayload, // optional (formData) => payload
  extraParams = {}, // appended to list query
  injectPayload, // optional object merged into payload before submit
}) {
  const toast = useToastStore()
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [modalOpen, setModalOpen] = useState(false)
  const [editItem, setEditItem] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  const [deleting, setDeleting] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [serverErrors, setServerErrors] = useState({})

  const { register, handleSubmit, reset, formState: { errors }, watch, setValue } = useForm({ defaultValues })

  const extraKey = JSON.stringify(extraParams)
  const fetchItems = useCallback(async () => {
    setLoading(true)
    try {
      const res = await api.get(endpoint, { params: { search, page, ...extraParams } })
      const d = res.data?.data
      if (d?.data) { setItems(d.data); setTotalPages(d.last_page || 1) }
      else if (Array.isArray(d)) { setItems(d); setTotalPages(1) }
      else { setItems([]); setTotalPages(1) }
    } catch (e) {
      toast.add(getErrorMessage(e), 'error')
      setItems([])
    } finally { setLoading(false) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint, search, page, extraKey])

  useEffect(() => { fetchItems() }, [fetchItems])

  const openCreate = () => {
    setEditItem(null); setServerErrors({}); reset(defaultValues); setModalOpen(true)
  }
  const openEdit = (row) => {
    setEditItem(row); setServerErrors({})
    reset({ ...defaultValues, ...row })
    setModalOpen(true)
  }

  const onSubmit = async (formData) => {
    setSubmitting(true); setServerErrors({})
    try {
      let payload = buildPayload ? buildPayload(formData, editItem) : formData
      if (injectPayload) payload = { ...payload, ...injectPayload }
      let config = {}
      let body = payload
      if (useFormData) {
        const fd = new FormData()
        Object.entries(payload).forEach(([k, v]) => {
          if (v === undefined || v === null) return
          if (v instanceof FileList) {
            if (v[0]) fd.append(k, v[0])
          } else fd.append(k, v)
        })
        body = fd
        config = { headers: { 'Content-Type': 'multipart/form-data' } }
        if (editItem) fd.append('_method', 'PUT')
      }
      if (editItem) {
        if (useFormData) await api.post(itemEndpoint(editItem.id), body, config)
        else await api.put(itemEndpoint(editItem.id), body)
        toast.add('Data berhasil diperbarui', 'success')
      } else {
        await api.post(endpoint, body, config)
        toast.add('Data berhasil ditambahkan', 'success')
      }
      setModalOpen(false); fetchItems()
    } catch (e) {
      if (e.response?.status === 422) {
        setServerErrors(getFieldErrors(e))
        toast.add(getErrorMessage(e), 'error')
      } else toast.add(getErrorMessage(e), 'error')
    } finally { setSubmitting(false) }
  }

  const onDelete = async () => {
    setDeleting(true)
    try {
      await api.delete(itemEndpoint(deleteId))
      toast.add('Data berhasil dihapus', 'success')
      setDeleteId(null); fetchItems()
    } catch (e) {
      toast.add('Gagal menghapus data', 'error')
    } finally { setDeleting(false) }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#0076D0]" />
          <input
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            placeholder="Cari..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#0076D0]"
          />
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2 bg-[#0076D0] text-white rounded-lg text-sm font-semibold hover:bg-[#005FA3]">
          <Plus className="w-4 h-4" /> Tambah
        </button>
      </div>

      <DataTable
        columns={columns}
        data={items}
        loading={loading}
        actions={(row) => (
          <>
            {extraActions && extraActions(row)}
            <button onClick={() => openEdit(row)} className="p-1.5 rounded border border-blue-200 text-[#0076D0] hover:bg-blue-50">
              <Pencil className="w-4 h-4" />
            </button>
            <button onClick={() => setDeleteId(row.id)} className="p-1.5 rounded border border-blue-200 text-[#0076D0] hover:bg-blue-50">
              <Trash2 className="w-4 h-4" />
            </button>
          </>
        )}
      />

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editItem ? `Edit ${title}` : `Tambah ${title}`}
        footer={
          <>
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-50">Batal</button>
            <button onClick={handleSubmit(onSubmit)} disabled={submitting} className="px-4 py-2 text-sm rounded-lg bg-[#0076D0] text-white hover:bg-[#005FA3] disabled:opacity-60">
              {submitting ? 'Menyimpan...' : 'Simpan'}
            </button>
          </>
        }
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {renderForm({ register, errors, watch, setValue, serverErrors, isEdit: !!editItem })}
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={onDelete}
        loading={deleting}
      />
    </div>
  )
}

export function Field({ label, required, error, serverError, children }) {
  return (
    <div>
      <label className="block text-sm mb-1 text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {(error || serverError) && (
        <p className="text-red-500 text-sm mt-1">{error?.message || (Array.isArray(serverError) ? serverError[0] : serverError)}</p>
      )}
    </div>
  )
}

export const inputCls = 'w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-[#0076D0]'
