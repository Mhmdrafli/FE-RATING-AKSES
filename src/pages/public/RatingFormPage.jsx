import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import api from '../../lib/api'
import E from '../../lib/endpoints'
import useToastStore from '../../store/toastStore'
import PublicNavbar from '../../components/public/PublicNavbar'
import OrnamentBg from '../../components/public/OrnamentBg'
import Separator from '../../components/public/Separator'
import RatingSlider from '../../components/public/RatingSlider'
import StarRating from '../../components/public/StarRating'
import Spinner from '../../components/ui/Spinner'
import { Star, Loader2 } from 'lucide-react'
import { getErrorMessage } from '../../lib/errorHandler'

export default function RatingFormPage() {
  const { slug_token } = useParams()
  const navigate = useNavigate()
  const toast = useToastStore()
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [topReviews, setTopReviews] = useState([])

  const { register, handleSubmit, control, watch, setValue } = useForm({
    defaultValues: {
      name: '', teacher_score: 3, room_score: 3, staff_score: 3,
      platform_score: 3, overall_score: 0, notes: '',
    },
  })

  useEffect(() => {
    api.get(E.SESSION_BY_TOKEN(slug_token))
    .then((res) => {
      const s = res.data?.data || res.data
      if (!s || s.status !== 'active') {
        setErr('Sesi ini tidak tersedia atau sudah tidak aktif.')
      } else if (s.already_voted) {
        navigate(`/rating/${slug_token}/done`)
      } else {
        setSession(s)
        if (s.top_reviews?.length) setTopReviews(s.top_reviews)
      }
    })
      .catch(() => setErr('Sesi ini tidak tersedia atau sudah tidak aktif.'))
      .finally(() => setLoading(false))
  }, [slug_token])

  const onSubmit = async (data) => {
    if (!data.overall_score) {
      toast.add('Mohon pilih rating keseluruhan', 'error'); return
    }
    setSubmitting(true)
    try {
      const criteria = session?.criteria || []
      const answers = {}
      criteria.forEach((c) => {
        if (data[c.key] !== undefined) {
          answers[c.id] = data[c.key]
        }
      })

      await api.post(E.SUBMIT_RATING(slug_token), {
        name: data.name,
        overall_score: data.overall_score,
        notes: data.notes,
        answers,
      })
      navigate(`/rating/${slug_token}/done`)
    } catch (e) {
      toast.add(getErrorMessage(e), 'error')
    } finally { setSubmitting(false) }
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Spinner size="lg" /></div>
  if (err) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Sesi tidak tersedia</h1>
          <p className="text-gray-500">{err}</p>
        </div>
      </div>
    )
  }

  const scrollToForm = () => document.getElementById('rating-form')?.scrollIntoView({ behavior: 'smooth' })
  const teacherName = session?.teacher?.full_name || 'Tutor'
  const className = session?.class?.name || ''
  const teacherImage = session?.teacher?.image

  return (
    <div>
      <section className="relative bg-white overflow-hidden">
        <OrnamentBg />
        <PublicNavbar />
        <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12 py-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-[40px] md:text-[48px] font-extrabold leading-tight text-[#111]">
              Terima kasih telah mengikuti pembelajaran di kelas hari ini!
            </h1>
            <p className="mt-4 text-[#555]">
              Bantu kami menjadi lebih baik dengan mengisi rating untuk sesi <b>{className}</b> bersama <b>{teacherName}</b>.
            </p>
            <button onClick={scrollToForm} className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#0076D0] text-white font-semibold hover:bg-[#005FA3]">
              Isi Ratting
            </button>
          </div>
          <div className="relative flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#EFF6FF] flex items-center justify-center overflow-hidden">
              {teacherImage ? (
                <img src={teacherImage} alt={teacherName} className="w-full h-full object-cover" />
              ) : (
                <span className="text-6xl text-[#0076D0] font-bold">{teacherName.charAt(0)}</span>
              )}
            </div>
            {topReviews[0] && (
              <div className="hidden md:flex absolute -left-4 top-6 bg-white rounded-xl shadow-lg p-3 items-center gap-2 max-w-[220px]">
                <div className="flex">
                  {[1,2,3,4,5].map(i=><Star key={i} className="w-3 h-3" fill={i <= topReviews[0].overall_score ? '#FACC15' : 'none'} stroke={i <= topReviews[0].overall_score ? '#FACC15' : '#D1D5DB'}/>)}
                </div>
                <div className="text-xs">
                  <div className="font-semibold">{topReviews[0].name || 'Anonim'}</div>
                  <div className="text-gray-400 line-clamp-1">{topReviews[0].notes || 'Pengalaman luar biasa!'}</div>
                </div>
              </div>
            )}
            {topReviews[1] && (
              <div className="hidden md:flex absolute -right-4 bottom-6 bg-white rounded-xl shadow-lg p-3 items-center gap-2 max-w-[220px]">
                <div className="flex">
                  {[1,2,3,4,5].map(i=><Star key={i} className="w-3 h-3" fill={i <= topReviews[1].overall_score ? '#FACC15' : 'none'} stroke={i <= topReviews[1].overall_score ? '#FACC15' : '#D1D5DB'}/>)}
                </div>
                <div className="text-xs">
                  <div className="font-semibold">{topReviews[1].name || 'Anonim'}</div>
                  <div className="text-gray-400 line-clamp-1">{topReviews[1].notes || 'Sesi yang seru!'}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Separator />

      <section id="rating-form" className="max-w-[760px] mx-auto py-12 px-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label className="block mb-2 text-[15px] text-gray-800">Nama (opsional)</label>
            <input
              {...register('name')}
              placeholder="Namamu"
              className="w-full px-5 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-[#0076D0]"
            />
          </div>

          <Controller name="teacher_score" control={control} render={({ field }) => (
            <RatingSlider label="Bagaimana penilaianmu terhadap pengajar?" required {...field} />
          )}/>
          <Controller name="room_score" control={control} render={({ field }) => (
            <RatingSlider label="Bagaimana penilaianmu terhadap ruangan kelas?" required {...field} />
          )}/>
          <Controller name="staff_score" control={control} render={({ field }) => (
            <RatingSlider label="Bagaimana penilaianmu terhadap staf?" required {...field} />
          )}/>
          <Controller name="platform_score" control={control} render={({ field }) => (
            <RatingSlider label="Bagaimana penilaianmu terhadap platform pembelajaran?" required {...field} />
          )}/>

          <div className="my-8 text-center">
            <label className="block mb-3 text-[15px] text-gray-800 font-semibold">
              Penilaian keseluruhan untuk sesi ini <span className="text-red-500">*</span>
            </label>
            <Controller name="overall_score" control={control} render={({ field }) => (
              <StarRating value={field.value} onChange={field.onChange} />
            )}/>
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-[15px] text-gray-800">Catatan & masukan (opsional)</label>
            <textarea
              {...register('notes')}
              rows={4}
              placeholder="Tulis pengalaman atau saranmu di sini..."
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#0076D0]"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-full bg-[#0076D0] text-white font-semibold hover:bg-[#005FA3] disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
            {submitting ? 'Mengirim...' : 'Kirim Evaluasi & Masukan Saya'}
          </button>
          <p className="text-xs text-gray-400 text-center mt-3">
            Data yang kamu kirim hanya digunakan untuk meningkatkan kualitas pembelajaran.
          </p>
        </form>
      </section>
    </div>
  )
}
