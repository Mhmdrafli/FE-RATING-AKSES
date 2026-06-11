import { useGet } from '../../hooks/useApi'
import CrudPage, { Field, inputCls } from '../../components/admin/CrudPage'
import E from '../../lib/endpoints'
import Badge from '../../components/ui/Badge'

const ROLE_COLORS = { 'super-admin': 'blue', 'admin-cabang': 'purple' }

export default function UsersPage() {
  const { data: branchesRes } = useGet(E.BRANCHES, { per_page: 100 })
  const branches = branchesRes?.data?.data || branchesRes?.data || []

  return (
    <CrudPage
      title="User"
      endpoint={E.USERS}
      itemEndpoint={E.USER}
      defaultValues={{ name: '', email: '', password: '', password_confirmation: '', branch_id: '', role: 'admin-cabang' }}
      buildPayload={(form, isEdit) => {
        const payload = { name: form.name, email: form.email, branch_id: form.branch_id || null, role: form.role }
        if (!isEdit) { payload.password = form.password; payload.password_confirmation = form.password_confirmation }
        else if (form.password) { payload.password = form.password; payload.password_confirmation = form.password_confirmation }
        return payload
      }}
      columns={[
        { key: 'no', label: 'No', render: (_, i) => i + 1 },
        { key: 'name', label: 'Nama' },
        { key: 'email', label: 'Email' },
        { key: 'branch', label: 'Cabang', render: (r) => r.branch?.name || 'Pusat' },
        { key: 'role', label: 'Role', render: (r) => {
          const role = r.roles?.[0] || r.role
          return role ? <Badge label={role} color={ROLE_COLORS[role] || 'gray'} /> : '-'
        }},
      ]}
      renderForm={({ register, errors, serverErrors, isEdit }) => (
        <>
          <Field label="Nama" required error={errors.name} serverError={serverErrors.name}>
            <input className={inputCls} {...register('name', { required: 'Wajib diisi' })} />
          </Field>
          <Field label="Email" required error={errors.email} serverError={serverErrors.email}>
            <input type="email" className={inputCls} {...register('email', { required: 'Wajib diisi' })} />
          </Field>
          <Field label={isEdit ? 'Password (kosongkan jika tidak diubah)' : 'Password'} required={!isEdit} error={errors.password} serverError={serverErrors.password}>
            <input type="password" className={inputCls} {...register('password', !isEdit ? { required: 'Wajib diisi' } : {})} />
          </Field>
          <Field label="Konfirmasi Password" required={!isEdit} error={errors.password_confirmation} serverError={serverErrors.password_confirmation}>
            <input type="password" className={inputCls} {...register('password_confirmation', !isEdit ? { required: 'Wajib diisi' } : {})} />
          </Field>
          <Field label="Cabang (kosong = Admin Pusat)" serverError={serverErrors.branch_id}>
            <select className={inputCls} {...register('branch_id')}>
              <option value="">— Admin Pusat —</option>
              {branches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </Field>
          <Field label="Role" required error={errors.role} serverError={serverErrors.role}>
            <select className={inputCls} {...register('role', { required: 'Wajib diisi' })}>
              <option value="super-admin">Super Admin</option>
              <option value="admin-cabang">Admin Cabang</option>
            </select>
          </Field>
        </>
      )}
    />
  )
}
