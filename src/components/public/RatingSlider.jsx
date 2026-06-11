export default function RatingSlider({ label, required, value = 3, onChange }) {
  const pct = ((value - 1) / 4) * 100
  return (
    <div className="mb-6">
      <label className="block mb-2 text-[15px] text-gray-800">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="border border-gray-200 rounded-xl px-5 py-4 bg-white">
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={1}
            max={5}
            step={0.1}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="flex-1 appearance-none h-1.5 rounded-full"
            style={{ background: `linear-gradient(to right, #0076D0 0%, #0076D0 ${pct}%, #C8E6FA ${pct}%, #C8E6FA 100%)` }}
          />
          <div className="px-3 py-1 rounded-lg border border-gray-300 text-sm min-w-[52px] text-center">
            {Number(value).toFixed(1)}
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
          <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
        </div>
      </div>
      <style>{`
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 20px; height: 20px; border-radius: 50%; background: #0076D0; cursor: pointer; border: 2px solid white; box-shadow: 0 1px 4px rgba(0,0,0,0.2); }
        input[type=range]::-moz-range-thumb { width: 20px; height: 20px; border-radius: 50%; background: #0076D0; cursor: pointer; border: 2px solid white; }
      `}</style>
    </div>
  )
}
