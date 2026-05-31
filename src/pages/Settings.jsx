import { useGameStore }  from '../store/useGameStore'
import BottomNav         from '../components/ui/BottomNav'

const APP_VERSION = '0.1.0'

export default function Settings() {
  const resetAllTasks   = useGameStore(state => state.resetAllTasks)
  const collectedCats   = useGameStore(state => state.collectedCats)

  function handleResetProgress() {
    if (!window.confirm('Reset ALL progress? This cannot be undone.')) return
    localStorage.removeItem('academeow-game-store')
    window.location.reload()
  }

  return (
    <div className="flex flex-col min-h-full">
      <div className="px-4 pt-6 pb-4 flex-1">
        <h2 className="font-pixel text-[13px] text-[#3d2c1e] mb-6">Settings</h2>

        {/* app info */}
        <div className="bg-[#fdf8f0] rounded-2xl border-2 border-[#e8dcc8] p-4 mb-4">
          <p className="font-pixel text-[9px] text-[#3d2c1e] mb-1">Academeow</p>
          <p className="font-pixel text-[8px] text-[#9b8b7a]">v{APP_VERSION}</p>
        </div>

        {/* theme switcher — stubbed, wire up in bonus phase */}
        <div className="bg-[#fdf8f0] rounded-2xl border-2 border-[#e8dcc8] p-4 mb-4 flex items-center justify-between">
          <div>
            <p className="font-pixel text-[9px] text-[#3d2c1e] mb-1">Theme</p>
            <p className="font-pixel text-[8px] text-[#9b8b7a]">Light mode</p>
          </div>
          <button className="w-12 h-6 rounded-full bg-[#e8dcc8] border-2 border-[#c8a882] relative">
            <div className="w-4 h-4 rounded-full bg-[#c0392b] absolute left-0.5 top-0.5 transition-all" />
          </button>
        </div>

        {/* danger zone */}
        <div className="bg-[#fff0f0] rounded-2xl border-2 border-[#f5c0c0] p-4">
          <p className="font-pixel text-[9px] text-[#c0392b] mb-3">Danger Zone</p>
          <button
            onClick={handleResetProgress}
            className="w-full bg-[#c0392b] text-white font-pixel text-[9px] py-3 rounded-xl border-b-4 border-[#922b21] active:border-b-0 active:translate-y-1 transition-all"
          >
            Reset All Progress
          </button>
        </div>
      </div>

    </div>
  )
}