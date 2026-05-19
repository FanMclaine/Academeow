import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'

const initialTasks = [
  { id: 1, title: 'Complete React Tutorial', xpReward: 100, difficulty: 'easy',   done: false },
  { id: 2, title: 'Finish Math homework',    xpReward: 50,  difficulty: 'hard',   done: false },
  { id: 3, title: 'Read 10 pages',           xpReward: 20,  difficulty: 'medium', done: false },
]

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks')
    return saved ? JSON.parse(saved) : initialTasks
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])


  // Add the handler function
function handleAdd({ title, difficulty }) {
  const newTask = {
    id: Date.now(), 
    title,
    difficulty,
    xpReward: { easy: 20, medium: 50, hard: 100 }[difficulty],
    done: false,
  }
  setTasks([...tasks, newTask])
}


  function handleComplete(id) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, done: true } : task
    ))
  }

  const xp     = tasks.filter(t => t.done).reduce((sum, t) => sum + t.xpReward, 0)
  const level  = Math.floor(xp / 100) + 1
  const coins  = tasks.filter(t => t.done).length * 10
  const streak = 0 

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout xp={xp} level={level} coins={coins} streak={streak} />}>
          <Route index element={<Dashboard />} />
          <Route path="/tasks" element={<Tasks tasks={tasks} onComplete={handleComplete} onAdd={handleAdd}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}