import { useState } from 'react'

const DIFFICULTY_BORDER = {
  easy:   'border-l-[#8bc470]',
  medium: 'border-l-[#9bd1ff]',
  hard:   'border-l-[#e44e76]',
}

export default function TaskCard({
  title      = 'Untitled Task',
  difficulty = 'easy',
  done       = false,
  onComplete,
  onDelete,
}) {
  const [fading, setFading] = useState(false)

  function handleComplete() {
    if (done || fading) return
    setFading(true)
    setTimeout(() => {
      onComplete?.()
    }, 400) // wait for fade then remove
  }

  return (
    <div className={`
      transition-all duration-300
      ${fading ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'}
    `}>
      {/* <div className={`
        flex items-center justify-between
        bg-[#fdf8f0] rounded-2xl px-4 py-3
        border-l-4 border border-[#e8dcc8]
        shadow-sm
        ${DIFFICULTY_BORDER[difficulty]}
      `}> */}
      <div data-layer="Rectangle 3" className={`
        my-1 flex items-center justify-between px-5 py-4 bg-green-100 rounded-[15px] shadow-xl shadow-inset-card border-l-[20px] ${DIFFICULTY_BORDER[difficulty]}
      `}>
        <span className="text-base font-medium text-[#3d2c1e] flex-1 pr-4">
          {title}
        </span>

        <button
          onClick={handleComplete}
          disabled={done || fading}
          className={`
            w-8 h-5 rounded-full border-5 outline-3 shadow-inset-toggle outline-[#4B4646] transition-all duration-200
            flex items-center justify-center
            ${done
              ? 'bg-[#4caf50] border-[#388e3c]'
              : 'bg-[#E2F0E4] border-[#E2F0E4] active:scale-90'
            }
          `}
        >
          {done && <span className="text-white text-xs">✓</span>}
        </button>
      </div>
    </div>
  )
}