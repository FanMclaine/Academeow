import { useEffect }    from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster }      from 'react-hot-toast'
import { useGameStore } from './store/useGameStore'
import AppLayout        from './layouts/AppLayout'
import Garden           from './pages/Garden'
import Catbook          from './pages/Catbook'
import Settings         from './pages/Settings'

export default function App() {
  const resetDailyTasks = useGameStore(state => state.resetDailyTasks)

  useEffect(() => {
    resetDailyTasks()
  }, [])

  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#f5f0e8',
            color: '#3d2c1e',
            fontFamily: "'Press Start 2P', monospace",
            fontSize: '10px',
            border: '2px solid #c8a882',
            borderRadius: '999px',
            padding: '10px 16px',
          },
        }}
      />
      <Routes>
        <Route element={<AppLayout />}>
          <Route index         element={<Garden />}   />
          <Route path="/cats"  element={<Catbook />}  />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}