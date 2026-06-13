import { useGet } from '../../hooks/useApi'
import CrudPage, { Field, inputCls } from '../../components/admin/CrudPage'
import E from '../../lib/endpoints'
import { slugify } from '../../lib/errorHandler'
import { useRole } from '../../lib/roles'
import BranchSelect from '../../components/admin/BranchSelect'

export default function TeachersPage() {
  const { isAdminCabang, branch } = useRole()
  const { data: branchesRes } = useGet(E.BRANCHES, { per_page: 100 })
  const branches = branchesRes?.data?.data || branchesRes?.data || []

  return (
    <CrudPage
      title="Guru"
      endpoint={E.TEACHERS}
      itemEndpoint={E.TEACHER}
      useFormData
      defaultValues={{ branch_id: isAdminCabang && branch ? branch.id : '', full_name: '', slug: '', image: '' }}
      extraParams={isAdminCabang && branch ? { branch_id: branch.id } : {}}
      injectPayload={isAdminCabang && branch ? { branch_id: branch.id } : null}
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
          <BranchSelect branches={branches} register={register} errors={errors} serverErrors={serverErrors} />
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
