import { Navigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import { useRole } from '../../lib/roles'

export default function ProtectedRoute({ children, superOnly = false }) {
  const { isAuthenticated } = useAuthStore()
  const { isSuperAdmin } = useRole()
  if (!isAuthenticated) return <Navigate to="/admin/login" replace />
  if (superOnly && !isSuperAdmin) return <Navigate to="/admin/dashboard" replace />
  return children
}
