import { create }    from 'zustand'
import { persist }   from 'zustand/middleware'
import { CAT_CATALOGUE, generatePersonality } from '../data/cats.js'

const XP_PER_DIFFICULTY = {
  easy:   20,
  medium: 50,
  hard:   100,
}

const COINS_PER_DIFFICULTY = {
  easy:   5,
  medium: 15,
  hard:   30,
}

// ── pure helpers (outside store, no React/Zustand dependency) ──

function trySpawnCat(collectedCats) {
  const BASE_CHANCE = 0.30
  if (Math.random() > BASE_CHANCE) return null

  const uncollected = CAT_CATALOGUE.filter(
    cat => !collectedCats.find(c => c.catId === cat.id)
  )
  if (uncollected.length === 0) return null

  const total  = uncollected.reduce((sum, cat) => sum + cat.spawnChance, 0)
  let   cursor = Math.random() * total

  for (const cat of uncollected) {
    cursor -= cat.spawnChance
    if (cursor <= 0) return cat
  }

  return uncollected[uncollected.length - 1] // fallback: last cat
}

// ── store ──────────────────────────────────────────────────────

export const useGameStore = create(
  persist(
    (set, get) => ({

      // ── state ────────────────────────────────────────────────
      tasks:             [],
      xp:                0,
      coins:             0,
      streak:            0,
      lastCompletedDate: null,
      collectedCats:     [],
      lastResetDate:     null,

      // ── actions ──────────────────────────────────────────────

      addTask(task) {
        set(state => ({
          tasks: [
            ...state.tasks,
            {
              id:         Date.now(),
              title:      task.title,
              difficulty: task.difficulty,
              type:       task.type ?? 'task',   // 'daily' | 'task'
              xpReward:   XP_PER_DIFFICULTY[task.difficulty],
              done:       false,
            },
          ],
        }))
      },

      completeTask(id) {
        const { tasks, xp, coins, streak, lastCompletedDate } = get()
        const task = tasks.find(t => t.id === id)
        if (!task || task.done) return null

        const today     = new Date().toDateString()
        const yesterday = new Date(Date.now() - 86400000).toDateString()

        const newStreak =
          lastCompletedDate === today      ? streak
          : lastCompletedDate === yesterday ? streak + 1
          : 1

        set({
          tasks: tasks.map(t =>
            t.id === id ? { ...t, done: true } : t
          ),
          xp:                xp + XP_PER_DIFFICULTY[task.difficulty],
          coins:             coins + COINS_PER_DIFFICULTY[task.difficulty],
          streak:            newStreak,
          lastCompletedDate: today,
        })

        return get().spawnCat()
      },

      spawnCat() {
        const { collectedCats } = get()
        const spawned = trySpawnCat(collectedCats)
        if (!spawned) return null

        set(state => ({
          collectedCats: [
            ...state.collectedCats,
            {
              catId:       spawned.id,
              personality: generatePersonality(),
              caughtAt:    Date.now(),
              timesVisited: 1,
            },
          ],
        }))

        return spawned
      },

      deleteTask(id) {
        set(state => ({
          tasks: state.tasks.filter(t => t.id !== id)
        }))
      },

      resetDailyTasks() {
        const today = new Date().toDateString()
        set(state => ({
          tasks:         state.tasks.map(t =>
            t.type === 'daily' ? { ...t, done: false } : t
          ),
          lastResetDate: today,
        }))
      },

      resetAllTasks() {
        set({ tasks: [] })
      },
    }),

    { name: 'academeow-game-store' }
  )
)