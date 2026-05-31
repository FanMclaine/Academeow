import { useNavigate }      from 'react-router-dom'
import { useTabStore }      from '../../store/useTabStore'
import navbarBg             from '../../assets/bottom-navbar.svg'
import navDaily    from '../../assets/nav-dailies.svg'
import navTodo     from '../../assets/nav-todo.svg'
import navCatbook  from '../../assets/nav-catbook.svg'
import navSettings from '../../assets/nav-settings.svg'
import navAdd      from '../../assets/nav-add.svg'

const tabs = [
  { id: 'daily',    label: 'Dailies',  icon: navDaily, route: '/'         },
  { id: 'todo',     label: 'To Do',    icon: navTodo, route: '/'         },
  { id: 'catbook',  label: 'Catbook',  icon: navCatbook, route: '/cats'     },
  { id: 'settings', label: 'Settings', icon: navSettings, route: '/settings' },
]

export default function BottomNav({ onAdd }) {
  const navigate                    = useNavigate()
  const { activeTab, setActiveTab } = useTabStore()

  function handleTab(tab) {
    setActiveTab(tab.id)
    navigate(tab.route)
  }

  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-sm bg-green-50">

      {/* SVG as background layer */}
      <img
        src={navbarBg}
        alt=""
        aria-hidden="true"
        className="w-full"
        draggable={false}
      />

      {/* buttons overlaid on top */}
<div className="absolute inset-0 flex items-center justify-between px-4 pb-1">
  
  {/* left two tabs */}
  <div className="flex items-center gap-4">
    {tabs.slice(0, 2).map(tab => (
      <button
  key={tab.id}
  onClick={() => handleTab(tab)}
  className={`flex flex-col items-center gap-1 px-3 py-1 transition-all ${
    activeTab === tab.id
            ? 'text-[#d07c72] scale-110'
            : 'text-[#9b8b7a]'
  }`}
>
  <img
    src={tab.icon}
    alt={tab.label}
    className="w-8 h-8"
    draggable={false}
  />
  <span className="text-[8px]">{tab.label}</span>
</button>
    ))}
  </div>

  {/* empty middle spacer — matches + button width */}
  <div className="w-14" />

  {/* right two tabs */}
  <div className="flex items-center gap-4">
    {tabs.slice(2, 4).map(tab => (
      <button
        key={tab.id}
        onClick={() => handleTab(tab)}
        className={`flex flex-col items-center gap-1 px-3 py-1 transition-all ${
          activeTab === tab.id
            ? 'text-[#d07c72] scale-110'
            : 'text-[#9b8b7a]'
        }`}
      >
        <img
          src={tab.icon}
          alt={tab.label}
          className="w-8 h-8"
          draggable={false}
        />
        <span className="text-[8px]">{tab.label}</span>
      </button>
    ))}
  </div>

</div>

      {/* floating + button — sits above everything */}
      <button
  onClick={() => {console.log('+ clicked, onAdd:', onAdd); onAdd?.()}}   // ← ?. means "call only if onAdd exists"
  className="absolute -top-8 left-1/2 -translate-x-1/2 w-17 h-17 z-10 active:scale-95 transition-transform"
>
  <img src={navAdd} alt="Add task" className="w-full h-full" draggable={false} />
</button>
    </div>
  )
}