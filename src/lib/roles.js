import useAuthStore from '../store/authStore'

export function useRole() {
  const user = useAuthStore((s) => s.user)
  const roles = user?.roles || []
  const isSuperAdmin = roles.includes('super-admin')
  const isAdminCabang = roles.includes('admin-cabang')
  const branch = user?.branch || null
  return { user, roles, isSuperAdmin, isAdminCabang, branch }
}