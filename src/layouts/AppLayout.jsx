// src/layouts/AppLayout.jsx
import { useState }   from 'react'
import { Outlet }     from 'react-router-dom'
import BottomNav      from '../components/ui/BottomNav'
import AddTaskSheet   from '../components/ui/AddTaskSheet'
import { useGameStore } from '../store/useGameStore'

export default function AppLayout() {
  const [sheetOpen, setSheetOpen] = useState(false)
  const addTask = useGameStore(state => state.addTask)

  function handleAdd(task) {
    addTask(task)
  }

  return (
    <div className="relative flex flex-col h-screen max-w-sm mx-auto bg-green-50 overflow-clip">
      <main className="flex-1 overflow-y-auto pb-24">
        <Outlet />
      </main>

      {/* BottomNav lives HERE, once, with onAdd wired up */}
      <BottomNav onAdd={() => setSheetOpen(true)} />

      {/* AddTaskSheet lives HERE too, once */}
      <AddTaskSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onAdd={handleAdd}
      />
    </div>
  )
}