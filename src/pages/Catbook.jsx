import { useGameStore } from '../store/useGameStore'
import { CAT_CATALOGUE, RARITY } from '../data/cats'
import BottomNav from '../components/ui/BottomNav'

const RARITY_COLORS = {
  common:    'border-[#9b8b7a] bg-[#fdf8f0]',
  uncommon:  'border-[#4a90d9] bg-[#eef5fd]',
  rare:      'border-[#9b59b6] bg-[#f5eeff]',
  legendary: 'border-[#f0c040] bg-[#fffbea]',
  mythical:  'border-[#c0392b] bg-[#fff0f0]',
}

const RARITY_LABEL_COLORS = {
  common:    'text-[#9b8b7a]',
  uncommon:  'text-[#4a90d9]',
  rare:      'text-[#9b59b6]',
  legendary: 'text-[#c8a000]',
  mythical:  'text-[#c0392b]',
}

export default function Catbook() {
  const collectedCats = useGameStore(state => state.collectedCats)
  const collectedIds  = new Set(collectedCats.map(c => c.catId))

  const collected   = CAT_CATALOGUE.filter(c =>  collectedIds.has(c.id))
  const undiscovered = CAT_CATALOGUE.filter(c => !collectedIds.has(c.id))

  return (
    <div className="flex flex-col min-h-full">
      <div className="px-4 pt-6 pb-4 flex-1">

        <h2 className="font-pixel text-[13px] text-[#3d2c1e] mb-1">Catbook</h2>
        <p className="font-pixel text-[8px] text-[#9b8b7a] mb-6">
          {collected.length} / {CAT_CATALOGUE.length} collected
        </p>

        {/* collected */}
        {collected.length > 0 && (
          <>
            <p className="font-pixel text-[9px] text-[#3d2c1e] mb-3">Collected</p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {collected.map(cat => {
                const instance = collectedCats.find(c => c.catId === cat.id)
                return (
                  <div
                    key={cat.id}
                    className={`rounded-2xl border-2 p-4 ${RARITY_COLORS[cat.rarity]}`}
                  >
                    <div className="text-4xl text-center mb-2">{cat.sprite}</div>
                    <p className="font-pixel text-[9px] text-[#3d2c1e] text-center mb-1">
                      {cat.name}
                    </p>
                    <p className={`font-pixel text-[7px] text-center capitalize mb-2 ${RARITY_LABEL_COLORS[cat.rarity]}`}>
                      {cat.rarity}
                    </p>
                    <p className="text-[10px] text-[#9b8b7a] text-center leading-relaxed">
                      {cat.bio}
                    </p>
                    {instance && (
                      <p className="font-pixel text-[7px] text-[#b8a898] text-center mt-2">
                        {instance.personality}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </>
        )}

        {/* undiscovered */}
        {undiscovered.length > 0 && (
          <>
            <p className="font-pixel text-[9px] text-[#3d2c1e] mb-3">Undiscovered</p>
            <div className="grid grid-cols-2 gap-3">
              {undiscovered.map(cat => (
                <div
                  key={cat.id}
                  className="rounded-2xl border-2 border-[#e8dcc8] bg-[#f5f0e8] p-4 opacity-60"
                >
                  <div className="text-4xl text-center mb-2 grayscale">❓</div>
                  <p className="font-pixel text-[9px] text-[#9b8b7a] text-center mb-1">
                    ???
                  </p>
                  <p className={`font-pixel text-[7px] text-center capitalize ${RARITY_LABEL_COLORS[cat.rarity]}`}>
                    {cat.rarity}
                  </p>
                  <p className="text-[10px] text-[#c8b8a8] text-center mt-2">
                    Complete tasks to discover
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

    </div>
  )
}