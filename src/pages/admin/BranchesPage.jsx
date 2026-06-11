import CrudPage, { Field, inputCls } from '../../components/admin/CrudPage'
import E from '../../lib/endpoints'
import { slugify } from '../../lib/errorHandler'

export default function BranchesPage() {
  return (
    <CrudPage
      title="Cabang"
      endpoint={E.BRANCHES}
      itemEndpoint={E.BRANCH}
      defaultValues={{ name: '', slug: '', address: '', phone: '' }}
      columns={[
        { key: 'no', label: 'No', render: (_, i) => i + 1 },
        { key: 'name', label: 'Nama' },
        { key: 'slug', label: 'Slug' },
        { key: 'address', label: 'Alamat' },
        { key: 'phone', label: 'Telepon' },
      ]}
      renderForm={({ register, errors, watch, setValue, serverErrors }) => (
        <>
          <Field label="Nama" required error={errors.name} serverError={serverErrors.name}>
            <input className={inputCls}
              {...register('name', { required: 'Wajib diisi', onChange: (e) => setValue('slug', slugify(e.target.value)) })} />
          </Field>
          <Field label="Slug" required error={errors.slug} serverError={serverErrors.slug}>
            <input className={inputCls} {...register('slug', { required: 'Wajib diisi' })} />
          </Field>
          <Field label="Alamat" serverError={serverErrors.address}>
            <textarea className={inputCls} rows={3} {...register('address')} />
          </Field>
          <Field label="Telepon" serverError={serverErrors.phone}>
            <input className={inputCls} {...register('phone')} />
          </Field>
        </>
      )}
    />
  )
}
