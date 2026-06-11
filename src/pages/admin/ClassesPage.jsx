import { useGet } from '../../hooks/useApi'
import CrudPage, { Field, inputCls } from '../../components/admin/CrudPage'
import E from '../../lib/endpoints'
import { slugify } from '../../lib/errorHandler'

export default function ClassesPage() {
  const { data: branchesRes } = useGet(E.BRANCHES, { per_page: 100 })
  const branches = branchesRes?.data?.data || branchesRes?.data || []

  return (
    <CrudPage
      title="Kelas"
      endpoint={E.CLASSES}
      itemEndpoint={E.CLASS}
      defaultValues={{ branch_id: '', name: '', slug: '', quota: '', description: '' }}
      columns={[
        { key: 'no', label: 'No', render: (_, i) => i + 1 },
        { key: 'name', label: 'Nama' },
        { key: 'slug', label: 'Slug' },
        { key: 'branch', label: 'Cabang', render: (r) => r.branch?.name || '-' },
        { key: 'quota', label: 'Kuota' },
      ]}
      renderForm={({ register, errors, setValue, serverErrors }) => (
        <>
          <Field label="Cabang" required error={errors.branch_id} serverError={serverErrors.branch_id}>
            <select className={inputCls} {...register('branch_id', { required: 'Wajib diisi' })}>
              <option value="">Pilih cabang</option>
              {branches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </Field>
          <Field label="Nama" required error={errors.name} serverError={serverErrors.name}>
            <input className={inputCls} {...register('name', { required: 'Wajib diisi', onChange: (e) => setValue('slug', slugify(e.target.value)) })} />
          </Field>
          <Field label="Slug" required error={errors.slug} serverError={serverErrors.slug}>
            <input className={inputCls} {...register('slug', { required: 'Wajib diisi' })} />
          </Field>
          <Field label="Kuota" serverError={serverErrors.quota}>
            <input type="number" className={inputCls} {...register('quota')} />
          </Field>
          <Field label="Deskripsi" serverError={serverErrors.description}>
            <textarea className={inputCls} rows={3} {...register('description')} />
          </Field>
        </>
      )}
    />
  )
}
