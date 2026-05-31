import { useState }          from 'react'
import { useGameStore }      from '../store/useGameStore'
import { usePlayerStats }    from '../hooks/usePlayerStats'
import { useTabStore }       from '../store/useTabStore'
import { getCatById }        from '../data/cats'
import TaskCard              from '../components/game/TaskCard'
import AddTaskSheet          from '../components/ui/AddTaskSheet'
import BottomNav             from '../components/ui/BottomNav'
import toast                 from 'react-hot-toast'

export default function Garden() {
  const [sheetOpen, setSheetOpen] = useState(false)
  const { activeTab }             = useTabStore()

  const tasks       = useGameStore(state => state.tasks)
  const addTask     = useGameStore(state => state.addTask)
  const completeTask = useGameStore(state => state.completeTask)
  const deleteTask  = useGameStore(state => state.deleteTask)

  const { xp, level, xpProgress, xpToNextLevel, coins, streak } = usePlayerStats()

  // filter tasks by active tab
  const visibleTasks = tasks.filter(t =>
    activeTab === 'daily' ? t.type === 'daily' : t.type === 'todo'
  ).filter(t => !t.done) // hide completed tasks

  function handleComplete(id) {
    const spawned = completeTask(id)
    if (spawned) {
      toast(`🐱 ${spawned.name} visited your garden!`)
    }
  }

  function handleAdd(task) {
    addTask(task)
  }

  return (
    
    <div className="flex flex-col min-h-full bg-green-50">

      <img data-layer="image 1" className="relative w-[581.45px] h-90 rounded-4xl shadow-xl inset-shadow-sm/100" src="https://www.shutterstock.com/image-vector/garden-backyard-cartoon-vector-illustration-600nw-2458749789.jpg" />

        {/* collected cats in garden — emoji for now */}
        <div className="absolute bottom-14 left-0 right-0 flex justify-around px-6">
          {getCatById && tasks.length >= 0 && []} 
          {/* cats render here in a later iteration when you draw sprites */}
        </div>

        {/* HUD pill ────────────────────────────────── */}
        <div className="absolute top-10 left-3 right-3">
          {/* <div className="bg-[#f5f0e8]/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-3 border-2 border-[#c8a882] shadow-md"> */}
          <div data-layer="Rectangle 1" className="flex items-center gap-3 px-5 py-3 bg-green-50 rounded-[50px] shadow-xl outline-4 outline-offset-[-2.50px] outline-[#4B4646]">

            {/* avatar placeholder */}
            <div className="w-9 h-9 rounded-full bg-[#c8a882] border-2 border-[#a07850] flex items-center justify-center text-sm flex-shrink-0">
              🐱
            </div>

            {/* level + bars */}
            <div className="flex-1 min-w-0">
              <p className="font-pixel text-[8px] text-[#3d2c1e] mb-1">Level {level}</p>

              {/* XP bar */}
              <div className="flex items-center gap-2 mb-1">
                <span className="font-pixel text-[7px] text-[#9b8b7a] w-12 shrink-0">
                  XP: {xp}
                </span>
                <div className="flex-1 h-2 bg-[#e8dcc8] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4a90d9] rounded-full transition-all duration-500"
                    style={{ width: `${xpProgress}%` }}
                  />
                </div>
              </div>

              {/* coins bar */}
              <div className="flex items-center gap-2">
                <span className="font-pixel text-[7px] text-[#9b8b7a] w-12 shrink-0">
                  Coins: {coins}
                </span>
                <div className="flex-1 h-2 bg-[#e8dcc8] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#f0c040] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((coins / 100) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* streak */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <span className="text-base">🔥</span>
              <span className="font-pixel text-[8px] text-[#3d2c1e]">
                Streak: {streak}
              </span>
            </div>
          </div>
        </div>


      {/* ── task list ─────────────────────────────────── */}
      <div className="flex-1 px-4 pt-5 pb-4">
        <h2 className="font-pixel text-xl text-[#3d2c1e] mb-4">
          {activeTab === 'daily' ? 'Dailies' : 'To Do'}
        </h2>

        {visibleTasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-3xl mb-3">🐱</p>
            <p className="font-pixel text-[9px] text-[#9b8b7a] leading-relaxed">
              {activeTab === 'daily'
                ? 'No dailies yet!\nAdd one below.'
                : 'All done! The cats\nare proud of you.'}
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {visibleTasks.map(task => (
              <TaskCard
                key={task.id}
                title={task.title}
                difficulty={task.difficulty}
                done={task.done}
                onComplete={() => handleComplete(task.id)}
                onDelete={() => deleteTask(task.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}