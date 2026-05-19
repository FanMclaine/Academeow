const difficultyColors = {
  easy:   'bg-green-900 text-green-300 ',
  medium: 'bg-yellow-900 text-yellow-300 ',
  hard:   'bg-red-900 text-red-300 ',
}

export default function TaskCard({
  title = 'Untitled Task',
  xpReward = 0,
  difficulty = 'easy',
  done = false,
  onComplete,
}) {
  const badgeColor = difficultyColors[difficulty] || 'bg-gray-800 text-gray-400'

  return (
    <div className={`rounded-xl p-6 border transition-all duration-300 ${
      done
        ? 'bg-gray-900 border-gray-800 opacity-50'
        : 'bg-gray-800 border-gray-700 hover:border-gray-500'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className={`text-base font-semibold ${done ? 'line-through text-gray-500' : 'text-white'}`}>
          {title}
        </h3>
        <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${badgeColor}`}>
          {difficulty}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-purple-400">+{xpReward} XP</span>
        <button
          onClick={onComplete}
          disabled={done}
          className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
            done
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : 'bg-purple-600 hover:bg-purple-500 text-white cursor-pointer'
          }`}
        >
          {done ? 'Done!' : 'Complete'}
        </button>
      </div>
    </div>
  )
}