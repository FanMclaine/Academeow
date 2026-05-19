import { Outlet } from 'react-router-dom'
import Sidebar from '../components/ui/Sidebar'

export default function AppLayout({ xp, level, coins, streak }) {
  return (
    <div className="flex h-screen bg-gray-950 overflow-hidden">
      <Sidebar xp={xp} level={level} coins={coins} streak={streak} />
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  )
}