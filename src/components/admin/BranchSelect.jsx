import { Field, inputCls } from './CrudPage'
import { useRole } from '../../lib/roles'

/**
 * Branch select that auto-locks for admin-cabang users.
 * Pass register, errors, serverErrors, setValue from useForm.
 */
export default function BranchSelect({ branches, register, errors, serverErrors, setValue }) {
  const { isAdminCabang, branch } = useRole()

  if (isAdminCabang && branch) {
    // ensure form value is set
    setTimeout(() => setValue && setValue('branch_id', branch.id), 0)
    return (
      <Field label="Cabang" required>
        <input type="hidden" value={branch.id} {...register('branch_id')} />
        <div className={`${inputCls} bg-gray-50 text-gray-700`}>{branch.name}</div>
      </Field>
    )
  }

  return (
    <Field label="Cabang" required error={errors.branch_id} serverError={serverErrors.branch_id}>
      <select className={inputCls} {...register('branch_id', { required: 'Wajib diisi' })}>
        <option value="">Pilih cabang</option>
        {branches.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
      </select>
    </Field>
  )
}