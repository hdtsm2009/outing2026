import { useState } from 'react'
import type { Spot, WeekKey } from '../../types/spot'
import { WEEK_LABELS, WEEK_KEYS } from '../../types/spot'
import { spotsForWeek, categoryColor } from '../../utils/weekUtils'
import { ExternalLink } from '../common/ExternalLink'

interface Props {
  spots: Spot[]
}

const SCORE_COLOR: Record<string, string> = {
  '◎': 'bg-emerald-100 text-emerald-700 font-bold',
  '○': 'bg-sky-100 text-sky-700',
  '△': 'bg-amber-100 text-amber-700',
  '×': 'bg-red-100 text-red-400',
}

export function WeekCalendar({ spots }: Props) {
  const [activeWeek, setActiveWeek] = useState<WeekKey>('w1')
  const [expanded, setExpanded] = useState<number | null>(null)
  const weekSpots = spotsForWeek(spots, activeWeek)

  return (
    <div>
      {/* 週タブ */}
      <div className="flex overflow-x-auto gap-1 pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {WEEK_KEYS.map((wk) => (
          <button
            key={wk}
            onClick={() => { setActiveWeek(wk); setExpanded(null) }}
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

      {/* リスト */}
      <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
        {weekSpots.map((s) => {
          const score = s.weeks[activeWeek]
          const isOpen = expanded === s.id
          return (
            <div key={s.id} className="bg-white">
              <button
                className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                onClick={() => setExpanded(isOpen ? null : s.id)}
              >
                <div className="flex items-center gap-3">
                  {/* スコア */}
                  <span className={`w-7 h-7 shrink-0 flex items-center justify-center rounded-full text-sm ${SCORE_COLOR[score ?? ''] ?? 'bg-gray-100 text-gray-400'}`}>
                    {score}
                  </span>

                  {/* メイン情報 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {s.type === '期間限定' && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-red-100 text-red-600 font-medium shrink-0">期間限定</span>
                      )}
                      {s.type === '季節営業' && (
                        <span className="text-xs px-1.5 py-0.5 rounded bg-yellow-100 text-yellow-700 font-medium shrink-0">季節営業</span>
                      )}
                      <span className="font-medium text-gray-900 text-sm truncate">{s.name}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-400">
                      <span className={`px-1.5 py-0.5 rounded-full ${categoryColor(s.category)}`}>{s.category}</span>
                      <span>{s.area}</span>
                      {s.driveMinMax && <span>車{s.driveMinMax}分</span>}
                      {s.costParent2 && <span className="hidden sm:inline truncate max-w-32">{s.costParent2}</span>}
                    </div>
                  </div>

                  {/* 展開矢印 */}
                  <svg
                    className={`w-4 h-4 text-gray-300 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20" fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>

              {/* 展開詳細 */}
              {isOpen && (
                <div className="px-4 pb-4 pt-1 bg-gray-50 border-t border-gray-100 text-xs text-gray-600 space-y-1.5">
                  {s.period && <p><span className="font-medium text-gray-700">期間: </span>{s.period}</p>}
                  {s.costParent2 && <p><span className="font-medium text-gray-700">費用: </span>{s.costParent2}</p>}
                  {s.childReason7 && <p className="leading-relaxed"><span className="font-medium text-gray-700">7歳に刺さる: </span>{s.childReason7}</p>}
                  {s.reservation && <p className="text-amber-600">📋 {s.reservation}</p>}
                  <div className="flex gap-4 pt-1">
                    <ExternalLink href={s.officialUrl} label="公式サイト" />
                    <ExternalLink href={s.reservationUrl} label="予約" />
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
