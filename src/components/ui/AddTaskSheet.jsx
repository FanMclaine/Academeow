import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

export default function AddTaskSheet({ open, onClose, onAdd }) {
  const [title,      setTitle]      = useState('')
  const [difficulty, setDifficulty] = useState('easy')
  const [type,       setType]       = useState('todo')

  // close on backdrop click, reset form on close
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setTitle('')
        setDifficulty('easy')
        setType('todo')
      }, 300)
    }
  }, [open])

  function handleSubmit() {
    if (!title.trim()) return
    onAdd({ title: title.trim(), difficulty, type })
    onClose()
  }

  return (
    <>
      {/* backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          open ? 'opacity-40' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* sheet */}
      <div className={`
        fixed bottom-0 left-1/2 -translate-x-1/2
        w-full max-w-sm
        bg-[#f5f0e8] rounded-t-3xl
        border-t-2 border-[#c8a882]
        px-6 pt-4 pb-10
        transition-transform duration-300 
        z-50
        ${open ? 'translate-y-0' : 'translate-y-full'}
      `}>
        {/* drag handle */}
        <div className="w-10 h-1 bg-[#c8a882] rounded-full mx-auto mb-6" />

        <h3 className="font-pixel text-[11px] text-[#3d2c1e] mb-6 text-center">
          New Task
        </h3>

        {/* title input */}
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="What needs to be done?"
          className="w-full bg-[#fdf8f0] border-2 border-[#c8a882] rounded-2xl px-4 py-3 text-sm text-[#3d2c1e] placeholder-[#b8a898] outline-none focus:border-[#c0392b] transition-colors mb-4"
        />

        {/* difficulty selector */}
        <div className="flex gap-2 mb-4">
          {['easy', 'medium', 'hard'].map(d => (
            <button
              key={d}
              onClick={() => setDifficulty(d)}
              className={`flex-1 py-2 rounded-2xl text-xs border-2 capitalize transition-all ${
                difficulty === d
                  ? d === 'easy'   ? 'bg-[#4a90d9] border-[#4a90d9] text-white'
                  : d === 'medium' ? 'bg-[#f0c040] border-[#f0c040] text-[#3d2c1e]'
                  :                  'bg-[#c0392b] border-[#c0392b] text-white'
                  : 'bg-transparent border-[#c8a882] text-[#9b8b7a]'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* type selector */}
        <div className="flex gap-2 mb-6">
          {['todo', 'daily'].map(t => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`flex-1 py-2 rounded-2xl text-xs border-2 capitalize transition-all ${
                type === t
                  ? 'bg-[#c0392b] border-[#c0392b] text-white'
                  : 'bg-transparent border-[#c8a882] text-[#9b8b7a]'
              }`}
            >
              {t === 'todo' ? 'To Do' : 'Daily'}
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-[#c0392b] text-white font-pixel text-[10px] py-3 rounded-2xl border-b-4 border-[#922b21] active:border-b-0 active:translate-y-1 transition-all"
        >
          Add Task
        </button>
      </div>
    </>
  )
}