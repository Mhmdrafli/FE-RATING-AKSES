const Ornament = () => (
  <svg width="346" height="408" viewBox="0 0 346 408" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path opacity="0.3" d="M148.424 198.396C96.7963 253.937 9.64455 257.405 -46.2346 206.144L-224.177 42.905L-37.2161 -158.227L140.726 5.01129C196.606 56.2731 200.052 142.855 148.424 198.396Z" stroke="#0076D0" strokeWidth="3"/>
    <path opacity="0.3" d="M184.697 231.67C112.656 309.172 -8.95428 314.013 -86.9273 242.483L-261.138 82.6674L-0.255257 -197.99L173.955 -38.1745C251.928 33.3554 256.737 154.169 184.697 231.67Z" stroke="#0076D0" strokeWidth="3"/>
    <path opacity="0.3" d="M166.118 214.627C103.82 281.648 -1.34379 285.834 -68.7721 223.977L-243.497 63.69L-17.8955 -179.012L156.83 -18.7247C224.258 43.1317 228.416 147.607 166.118 214.627Z" stroke="#0076D0" strokeWidth="3"/>
  </svg>
)
export default function OrnamentBg() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      <div className="absolute top-0 left-0"><Ornament /></div>
      <div className="absolute top-0 right-0" style={{ transform: 'scaleX(-1)' }}><Ornament /></div>
    </div>
  )
}
