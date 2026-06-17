import { useGet } from '../../hooks/useApi'
import CrudPage, { Field, inputCls } from '../../components/admin/CrudPage'
import E from '../../lib/endpoints'
import { slugify } from '../../lib/errorHandler'
import { useRole } from '../../lib/roles'
import BranchSelect from '../../components/admin/BranchSelect'

export default function ClassesPage() {
  const { isAdminCabang, branch } = useRole()
  const { data: branchesRes } = useGet(E.BRANCHES, { per_page: 100 })
  const branches = branchesRes?.data?.data || branchesRes?.data || []

  return (
    <CrudPage
      title="Kelas"
      endpoint={E.CLASSES}
      itemEndpoint={E.CLASS}
      defaultValues={{ branch_id: isAdminCabang && branch ? branch.id : '', name: '', slug: '', quota: '', description: '' }}
      extraParams={isAdminCabang && branch ? { branch_id: branch.id } : {}}
      injectPayload={isAdminCabang && branch ? { branch_id: branch.id } : null}
      columns={[
        { key: 'no', label: 'No', render: (_, i) => i + 1 },
        { key: 'name', label: 'Nama' },
        { key: 'slug', label: 'Slug' },
        { key: 'branch', label: 'Cabang', render: (r) => r.branch?.name || '-' },
        { key: 'quota', label: 'Kuota' },
      ]}
      renderForm={({ register, errors, setValue, serverErrors }) => (
        <>
          <BranchSelect branches={branches} register={register} errors={errors} serverErrors={serverErrors} />
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
