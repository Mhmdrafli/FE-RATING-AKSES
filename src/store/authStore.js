import { create } from 'zustand'

const safeUser = () => {
  try { return JSON.parse(localStorage.getItem('admin_user') || 'null') } catch { return null }
}

const useAuthStore = create((set) => ({
  token: localStorage.getItem('admin_token') || null,
  user: safeUser(),
  isAuthenticated: !!localStorage.getItem('admin_token'),
  setAuth: (token, user) => {
    localStorage.setItem('admin_token', token)
    localStorage.setItem('admin_user', JSON.stringify(user))
    set({ token, user, isAuthenticated: true })
  },
  logout: () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    set({ token: null, user: null, isAuthenticated: false })
  },
}))
export default useAuthStore
