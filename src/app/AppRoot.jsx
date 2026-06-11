import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import Toast from '../components/ui/Toast'
import RatingFormPage from '../pages/public/RatingFormPage'
import RatingDonePage from '../pages/public/RatingDonePage'
import LoginPage from '../pages/admin/LoginPage'
import DashboardPage from '../pages/admin/DashboardPage'
import BranchesPage from '../pages/admin/BranchesPage'
import TeachersPage from '../pages/admin/TeachersPage'
import RoomsPage from '../pages/admin/RoomsPage'
import ClassesPage from '../pages/admin/ClassesPage'
import SessionsPage from '../pages/admin/SessionsPage'
import SessionQRPage from '../pages/admin/SessionQRPage'
import RatingsPage from '../pages/admin/RatingsPage'
import UsersPage from '../pages/admin/UsersPage'
import AdminLayout from '../components/admin/AdminLayout'
import ProtectedRoute from '../components/admin/ProtectedRoute'
import useAuthStore from '../store/authStore'
import api from '../lib/api'
import E from '../lib/endpoints'

export default function AppRoot() {
  const { token, setAuth, logout } = useAuthStore()

  useEffect(() => {
    if (!token) return
    api.get(E.ME).then((res) => {
      const u = res.data?.data || res.data
      if (u) setAuth(token, u)
    }).catch(() => logout())
  }, [])

  return (
    <BrowserRouter>
      <Toast />
      <Routes>
        <Route path="/" element={<Navigate to="/admin/login" replace />} />
        <Route path="/rating/:slug_token" element={<RatingFormPage />} />
        <Route path="/rating/:slug_token/done" element={<RatingDonePage />} />

        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="branches" element={<BranchesPage />} />
          <Route path="teachers" element={<TeachersPage />} />
          <Route path="rooms" element={<RoomsPage />} />
          <Route path="classes" element={<ClassesPage />} />
          <Route path="sessions" element={<SessionsPage />} />
          <Route path="sessions/:id/qr" element={<SessionQRPage />} />
          <Route path="ratings" element={<RatingsPage />} />
          <Route path="users" element={<UsersPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
