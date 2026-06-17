import PublicNavbar from '../../components/public/PublicNavbar'
import OrnamentBg from '../../components/public/OrnamentBg'
import Separator from '../../components/public/Separator'

export default function RatingDonePage() {
  return (
    <div>
      <section className="relative bg-white overflow-hidden min-h-[70vh]">
        <OrnamentBg />
        <PublicNavbar />
        <div className="relative z-10 max-w-3xl mx-auto px-6 py-20 text-center">
          <h1 className="text-[40px] md:text-[56px] font-extrabold text-[#111] leading-tight">
            Terima Kasih Banyak atas Feedback dan Waktumu!
          </h1>
          <p className="mt-6 text-[#555] max-w-[580px] mx-auto">
            Masukanmu sudah kami terima dengan baik. Tim kami akan segera meninjau catatan
            darimu untuk memastikan sesi belajarmu berikutnya berjalan dengan jauh lebih
            nyaman, seru, dan maksimal.
          </p>
        </div>
      </section>
      <Separator />
    </div>
  )
}
