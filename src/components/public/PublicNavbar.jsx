export default function PublicNavbar() {
  return (
    <div className="relative z-10">
      <nav className="bg-white border-b border-gray-100 px-6 md:px-12 h-16 flex items-center">
        <div className="flex items-center gap-2">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path d="M3 13l4-4 4 4 5-5 5 5" stroke="#FFCC00" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-extrabold text-[#0076D0] text-lg leading-tight">
            Akses Learning
            <span className="block text-[10px] font-normal text-gray-400">the way become expert</span>
          </span>
        </div>
      </nav>
      <div className="bg-[#0076D0] text-white text-center py-2 text-[13px]">
        Ratting dan evaluasi pembelajaran hari ini!
      </div>
    </div>
  )
}
