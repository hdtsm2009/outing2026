import { useState } from 'react'
import type { Spot, WeekKey } from '../../types/spot'
import { WEEK_LABELS, WEEK_KEYS } from '../../types/spot'
import { spotsForWeek, categoryColor } from '../../utils/weekUtils'

interface Props {
  spots: Spot[]
}

export function WeekCalendar({ spots }: Props) {
  const [activeWeek, setActiveWeek] = useState<WeekKey>('w1')
  const [selected, setSelected] = useState<Spot | null>(null)
  const weekSpots = spotsForWeek(spots, activeWeek)

  return (
    <div>
      <div className="flex overflow-x-auto gap-1 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {WEEK_KEYS.map((wk) => (
          <button
            key={wk}
            onClick={() => { setActiveWeek(wk); setSelected(null) }}
            className={`shrink-0 text-xs px-3 py-2 rounded-lg border transition-colors whitespace-nowrap ${
              activeWeek === wk
                ? 'bg-sky-500 text-white border-sky-500 font-medium'
                : 'bg-white text-gray-600 border-gray-200 hover:border-sky-300'
            }`}
          >
            {WEEK_LABELS[wk]}
            <span className="ml-1 opacity-70">({spotsForWeek(spots, wk).length})</span>
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-400 mt-2 mb-3">{weekSpots.length}件 ◎○が対応可</p>

      <div className="flex flex-wrap gap-2">
        {weekSpots.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelected(selected?.id === s.id ? null : s)}
            className={`inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition-all ${
              selected?.id === s.id
                ? 'ring-2 ring-sky-400'
                : 'hover:shadow-sm'
            } ${categoryColor(s.category)}`}
          >
            {s.type === '期間限定' && <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />}
            {s.name}
            <span className="opacity-60">{s.weeks[activeWeek]}</span>
          </button>
        ))}
      </div>

      {selected && (
        <div className="mt-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-gray-900 text-sm">{selected.name}</h3>
            <button onClick={() => setSelected(null)} className="text-gray-400 text-lg leading-none ml-2">×</button>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">{selected.area} · {selected.category}</p>
          {selected.period && <p className="text-xs text-gray-500 mt-1">期間: {selected.period}</p>}
          {selected.costParent2 && <p className="text-xs text-gray-500 mt-1">費用: {selected.costParent2}</p>}
          {selected.childReason7 && <p className="text-xs text-gray-600 mt-2 leading-relaxed">{selected.childReason7}</p>}
          {selected.reservation && <p className="text-xs text-amber-600 mt-1">📋 {selected.reservation}</p>}
          <div className="flex gap-3 mt-2">
            {selected.officialUrl && (
              <a href={selected.officialUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-sky-600 hover:underline">公式サイト ↗</a>
            )}
            {selected.reservationUrl && (
              <a href={selected.reservationUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-sky-600 hover:underline">予約 ↗</a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
