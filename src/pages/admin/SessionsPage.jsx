import { useNavigate } from 'react-router-dom'
import { useGet } from '../../hooks/useApi'
import CrudPage, { Field, inputCls } from '../../components/admin/CrudPage'
import E from '../../lib/endpoints'
import Badge from '../../components/ui/Badge'
import useToastStore from '../../store/toastStore'
import { QrCode, Copy } from 'lucide-react'
import { useRole } from '../../lib/roles'

const STATUS = { active: { label: 'Aktif', color: 'green' }, completed: { label: 'Selesai', color: 'gray' }, cancelled: { label: 'Dibatalkan', color: 'red' } }
const toWibString = (localStr) => {
  if (!localStr) return ''
  const result = localStr.replace('T', ' ') + ':00'
  return result
}
const formatWib = (str) => {
  if (!str) return '-'
  const normalized = str.replace('T', ' ')
  const [date, time] = normalized.split(' ')
  if (!date || !time) return str
  const [y, m, d] = date.split('-')
  return `${parseInt(d)}/${parseInt(m)}/${y}, ${time.slice(0, 5)}`
}
export default function SessionsPage() {
  const navigate = useNavigate()
  const toast = useToastStore()
  const { isAdminCabang, branch } = useRole()
  const scope = isAdminCabang && branch ? { branch_id: branch.id } : {}
  const { data: classesRes } = useGet(E.CLASSES, { per_page: 100, ...scope })
  const { data: teachersRes } = useGet(E.TEACHERS, { per_page: 100, ...scope })
  const { data: roomsRes } = useGet(E.ROOMS, { per_page: 100, ...scope })
  const classes = classesRes?.data?.data || classesRes?.data || []
  const teachers = teachersRes?.data?.data || teachersRes?.data || []
  const rooms = roomsRes?.data?.data || roomsRes?.data || []

  const copyLink = (token) => {
    const url = `${window.location.origin}/rating/${token}`
    navigator.clipboard.writeText(url)
    toast.add('Link disalin!', 'success')
  }

  return (
    <CrudPage
      title="Sesi"
      endpoint={E.SESSIONS}
      itemEndpoint={E.SESSION}
      extraParams={scope}
      defaultValues={{ class_id: '', teacher_id: '', room_id: '', name: '', start_time: '', end_time: '', status: 'active' }}
buildPayload={(form) => {
  return {
    ...form,
    start_time: toWibString(form.start_time),
    end_time: toWibString(form.end_time),
  }
}}
      columns={[
        { key: 'no', label: 'No', render: (_, i) => i + 1 },
        { key: 'name', label: 'Nama Sesi' },
        { key: 'class', label: 'Kelas', render: (r) => r.class?.name || '-' },
        { key: 'teacher', label: 'Guru', render: (r) => r.teacher?.full_name || '-' },
        { key: 'room', label: 'Ruangan', render: (r) => r.room?.name || '-' },
        { key: 'start_time', label: 'Waktu Mulai', render: (r) => formatWib(r.start_time) },
        { key: 'end_time', label: 'Waktu Selesai', render: (r) => formatWib(r.end_time) },
        { key: 'status', label: 'Status', render: (r) => {
          const s = STATUS[r.status] || { label: r.status, color: 'gray' }
          return <Badge label={s.label} color={s.color} />
        }},
      ]}
      extraActions={(row) => (
        <>
          <button onClick={() => navigate(`/admin/sessions/${row.id}/qr`)} className="p-1.5 rounded border border-blue-200 text-[#0076D0] hover:bg-blue-50" title="QR Code">
            <QrCode className="w-4 h-4" />
          </button>
          <button onClick={() => copyLink(row.slug_token)} className="p-1.5 rounded border border-gray-200 text-gray-600 hover:bg-gray-50" title="Salin Link">
            <Copy className="w-4 h-4" />
          </button>
        </>
      )}
      renderForm={({ register, errors, serverErrors }) => (
        <>
          <Field label="Kelas" required error={errors.class_id} serverError={serverErrors.class_id}>
            <select className={inputCls} {...register('class_id', { required: 'Wajib diisi' })}>
              <option value="">Pilih kelas</option>
              {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </Field>
          <Field label="Guru" required error={errors.teacher_id} serverError={serverErrors.teacher_id}>
            <select className={inputCls} {...register('teacher_id', { required: 'Wajib diisi' })}>
              <option value="">Pilih guru</option>
              {teachers.map((t) => <option key={t.id} value={t.id}>{t.full_name}</option>)}
            </select>
          </Field>
          <Field label="Ruangan" required error={errors.room_id} serverError={serverErrors.room_id}>
            <select className={inputCls} {...register('room_id', { required: 'Wajib diisi' })}>
              <option value="">Pilih ruangan</option>
              {rooms.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </Field>
          <Field label="Nama Sesi" required error={errors.name} serverError={serverErrors.name}>
            <input className={inputCls} {...register('name', { required: 'Wajib diisi' })} />
          </Field>
          <Field label="Waktu Mulai" required error={errors.start_time} serverError={serverErrors.start_time}>
            <input type="datetime-local" className={inputCls} {...register('start_time', { required: 'Wajib diisi' })} />
          </Field>
          <Field label="Waktu Selesai" required error={errors.end_time} serverError={serverErrors.end_time}>
            <input type="datetime-local" className={inputCls} {...register('end_time', { required: 'Wajib diisi' })} />
          </Field>
          <Field label="Status" serverError={serverErrors.status}>
            <select className={inputCls} {...register('status')}>
              <option value="active">Aktif</option>
              <option value="completed">Selesai</option>
              <option value="cancelled">Dibatalkan</option>
            </select>
          </Field>
        </>
      )}
    />
  )
}
