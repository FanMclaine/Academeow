import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/',       label: 'Dashboard', icon: 'ti-layout-dashboard' },
  { to: '/tasks',  label: 'Tasks',     icon: 'ti-checkbox'         },
]

export default function Sidebar({ xp, level, coins, streak }) {
  return (
    <aside className="w-52 bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="px-5 py-5 border-b border-gray-800">
        <p className="text-purple-400 font-semibold text-sm">AcademiQuest</p>
        <p className="text-gray-500 text-xs mt-1">Level {level} Scholar</p>
      </div>

      <nav className="flex-1 py-3">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                isActive
                  ? 'text-purple-400 bg-gray-800 border-l-2 border-purple-500'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/50'
              }`
            }
          >
            <i className={`ti ${item.icon} text-base`} aria-hidden="true" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800 grid grid-cols-2 gap-2">
        {[['XP', xp], ['Streak', `${streak}🔥`], ['Coins', coins], ['Level', level]].map(([label, val]) => (
          <div key={label} className="bg-gray-800 rounded-lg p-2.5">
            <p className="text-sm font-medium text-gray-100">{val}</p>
            <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          </div>
        ))}
      </div>
    </aside>
  )
}