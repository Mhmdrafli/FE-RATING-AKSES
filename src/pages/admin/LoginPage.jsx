// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { useNavigate } from 'react-router-dom'
// import api from '../../lib/api'
// import E from '../../lib/endpoints'
// import useAuthStore from '../../store/authStore'
// import useToastStore from '../../store/toastStore'
// import { Loader2 } from 'lucide-react'

// export default function LoginPage() {
//   const { register, handleSubmit, formState: { errors } } = useForm()
//   const [loading, setLoading] = useState(false)
//   const [errMsg, setErrMsg] = useState('')
//   const navigate = useNavigate()
//   const { setAuth } = useAuthStore()
//   const toast = useToastStore()

//   const onSubmit = async ({ email, password }) => {
//     setLoading(true); setErrMsg('')
//     try {
//       const res = await api.post(E.LOGIN, { email, password })
//       const d = res.data?.data || res.data
//       setAuth(d.token, d.user)
//       toast.add('Berhasil masuk', 'success')
//       navigate('/admin/dashboard')
//     } catch (e) {
//       if ([401, 422].includes(e.response?.status)) setErrMsg('Email atau password salah.')
//       else setErrMsg('Terjadi kesalahan. Coba lagi.')
//     } finally { setLoading(false) }
//   }

//   return (
//     <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4">
//       <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">
//         <div className="text-center mb-6">
//           <div className="font-extrabold text-[#0076D0] text-xl">Akses Learning</div>
//           <div className="text-xs text-gray-400">the way become expert</div>
//         </div>
//         <h1 className="text-xl font-bold text-gray-900 mb-1">Masuk Admin</h1>
//         <p className="text-sm text-gray-500 mb-6">Silakan masuk dengan akun admin kamu.</p>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//           <div>
//             <label className="block text-sm mb-1 text-gray-700">Email</label>
//             <input
//               type="email"
//               {...register('email', { required: 'Email wajib diisi' })}
//               className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#0076D0]"
//             />
//             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//           </div>
//           <div>
//             <label className="block text-sm mb-1 text-gray-700">Password</label>
//             <input
//               type="password"
//               {...register('password', { required: 'Password wajib diisi' })}
//               className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#0076D0]"
//             />
//             {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//           </div>
//           {errMsg && <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-3 py-2 rounded-lg">{errMsg}</div>}
//           <button type="submit" disabled={loading} className="w-full py-2.5 rounded-lg bg-[#0076D0] text-white font-semibold hover:bg-[#005FA3] disabled:opacity-60 flex items-center justify-center gap-2">
//             {loading && <Loader2 className="w-4 h-4 animate-spin" />}
//             {loading ? 'Memproses...' : 'Masuk'}
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }



import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import api from '../../lib/api'
import E from '../../lib/endpoints'
import useAuthStore from '../../store/authStore'
import useToastStore from '../../store/toastStore'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const toast = useToastStore()

  const onSubmit = async ({ email, password }) => {
    setLoading(true); setErrMsg('')
    try {
      const res = await api.post(E.LOGIN, { email, password })
      const d = res.data?.data || res.data
      setAuth(d.token, d.user)
      toast.add('Berhasil masuk', 'success')
      navigate('/admin/dashboard')
    } catch (e) {
      if ([401, 422].includes(e.response?.status)) setErrMsg('Email atau password salah.')
      else setErrMsg('Terjadi kesalahan. Coba lagi.')
    } finally { setLoading(false) }
  }

  const fillDemo = () => {
    setValue('email', 'superadmin@akseslearning.id')
    setValue('password', 'password123')
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="font-extrabold text-[#0076D0] text-xl">Akses Learning</div>
          <div className="text-xs text-gray-400">the way become expert</div>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-1">Masuk Admin</h1>
        <p className="text-sm text-gray-500 mb-6">Silakan masuk dengan akun admin kamu.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm mb-1 text-gray-700">Email</label>
            <input
              type="email"
              {...register('email', { required: 'Email wajib diisi' })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#0076D0]"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm mb-1 text-gray-700">Password</label>
            <input
              type="password"
              {...register('password', { required: 'Password wajib diisi' })}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:border-[#0076D0]"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>

          {errMsg && (
            <div className="bg-red-50 border border-red-100 text-red-600 text-sm px-3 py-2 rounded-lg">
              {errMsg}
            </div>
          )}

          {/* Demo Credentials Card */}
          <div
            onClick={fillDemo}
            className="cursor-pointer rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 hover:bg-blue-100 transition-colors"
          >
            <p className="mb-2 text-xs font-semibold text-blue-500">Akun Demo — Klik untuk auto-fill</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-[#0076D0] text-white font-semibold hover:bg-[#005FA3] disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {loading ? 'Memproses...' : 'Masuk'}
          </button>
        </form>
      </div>
    </div>
  )
}