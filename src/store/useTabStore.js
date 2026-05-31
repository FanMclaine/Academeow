import { create } from 'zustand'

export const useTabStore = create((set) => ({
  activeTab: 'todo',
  setActiveTab: (tab) => set({ activeTab: tab }),
}))