import { useState } from 'react'
import TaskCard from '../components/game/TaskCard'

export default function Tasks({ tasks, onComplete, onAdd }) {
  const [title, setTitle] = useState('')
  const [difficulty, setDifficulty] = useState('easy')

  const handleSubmit = event => {
    event.preventDefault()

    if (!title.trim()) {
      return
    }

    if (onAdd) {
      onAdd({
        title: title.trim(),
        difficulty,
      })
    }

    setTitle('')
    setDifficulty('easy')
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-6">Tasks</h2>

      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-4 max-w-xl bg-slate-900 p-4 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-white mb-1" htmlFor="task-title">
            Title
          </label>
          <input
            id="task-title"
            type="text"
            value={title}
            onChange={event => setTitle(event.target.value)}
            className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-white"
            placeholder="Enter task title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1" htmlFor="task-difficulty">
            Difficulty
          </label>
          <select
            id="task-difficulty"
            value={difficulty}
            onChange={event => setDifficulty(event.target.value)}
            className="w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-white"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500"
        >
          Add Task
        </button>
      </form>

      <div className="flex flex-col gap-4 max-w-xl">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            title={task.title}
            xpReward={task.xpReward}
            difficulty={task.difficulty}
            done={task.done}
            onComplete={() => onComplete(task.id)}
          />
        ))}
      </div>
    </div>
  )
}