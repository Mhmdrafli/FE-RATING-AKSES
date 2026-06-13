import logo from '../../assets/logo.png'

export default function PublicNavbar() {
  return (
    <div className="relative z-10">
      <nav className="bg-white border-b border-gray-100 px-6 md:px-12 h-16 flex items-center">
      <img src={logo} alt="Akses Learning" className="h-25 w-auto" />
      </nav>
      <div className="bg-[#0076D0] text-white text-center py-2 text-[13px]">
        Rating dan evaluasi pembelajaran hari ini!
      </div>
    </div>
  )
}