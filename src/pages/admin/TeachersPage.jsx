import { useGet } from '../../hooks/useApi'
import CrudPage, { Field, inputCls } from '../../components/admin/CrudPage'
import E from '../../lib/endpoints'
import { slugify } from '../../lib/errorHandler'

export default function TeachersPage() {
  const { data: branchesRes } = useGet(E.BRANCHES, { per_page: 100 })
  const branches = branchesRes?.data?.data || branchesRes?.data || []

  return (
    <CrudPage
      title="Guru"
      endpoint={E.TEACHERS}
      itemEndpoint={E.TEACHER}
      useFormData
      defaultValues={{ branch_id: '', full_name: '', slug: '', image: '' }}
      columns={[
        { key: 'no', label: 'No', render: (_, i) => i + 1 },
        { key: 'image', label: 'Foto', render: (r) => (
          r.image ? <img src={r.image} className="w-8 h-8 rounded-full object-cover" alt="" /> :
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">{(r.full_name||'?').charAt(0)}</div>
        )},
        { key: 'full_name', label: 'Nama Lengkap' },
        { key: 'branch', label: 'Cabang', render: (r) => r.branch?.name || '-' },
      ]}
      renderForm={({ register, errors, setValue, serverErrors }) => (
        <>
          <Field label="Cabang" required error={errors.branch_id} serverError={serverErrors.branch_id}>
            <select className={inputCls} {...register('branch_id', { required: 'Wajib diisi' })}>
              <option value="">Pilih cabang</option>
              {branches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </Field>
          <Field label="Nama Lengkap" required error={errors.full_name} serverError={serverErrors.full_name}>
            <input className={inputCls} {...register('full_name', { required: 'Wajib diisi', onChange: (e) => setValue('slug', slugify(e.target.value)) })} />
          </Field>
          <Field label="Slug" required error={errors.slug} serverError={serverErrors.slug}>
            <input className={inputCls} {...register('slug', { required: 'Wajib diisi' })} />
          </Field>
          <Field label="Foto" serverError={serverErrors.image}>
            <input type="file" accept="image/*" className={inputCls} {...register('image')} />
          </Field>
        </>
      )}
    />
  )
}
