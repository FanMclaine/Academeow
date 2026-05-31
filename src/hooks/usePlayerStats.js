// src/hooks/usePlayerStats.js
import { useGameStore } from '../store/useGameStore'

export function usePlayerStats() {
  const xp     = useGameStore(state => state.xp)
  const coins  = useGameStore(state => state.coins)
  const streak = useGameStore(state => state.streak)
  const level  = Math.floor(xp / 100) + 1
  const xpToNextLevel   = level * 100
  const xpInCurrentLevel = xp - (level - 1) * 100
  const xpProgress      = (xpInCurrentLevel / 100) * 100 // percentage

  return { xp, coins, streak, level, xpToNextLevel, xpProgress }
}