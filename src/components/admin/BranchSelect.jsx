import { Field, inputCls } from './CrudPage'
import { useRole } from '../../lib/roles'

/**
 * Branch select that auto-locks for admin-cabang users.
 * For admin-cabang: renders plain text; branch_id is injected via CrudPage injectPayload.
 */
export default function BranchSelect({ branches, register, errors, serverErrors }) {
  const { isAdminCabang, branch } = useRole()

  if (isAdminCabang && branch) {
    return (
      <Field label="Cabang" required>
        <div className={`${inputCls} bg-gray-50 text-gray-700`}>{branch.name}</div>
      </Field>
    )
  }

  return (
    <Field label="Cabang" required error={errors?.branch_id} serverError={serverErrors?.branch_id}>
      <select className={inputCls} {...register('branch_id', { required: 'Wajib diisi' })}>
        <option value="">Pilih cabang</option>
        {branches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
      </select>
    </Field>
  )
}