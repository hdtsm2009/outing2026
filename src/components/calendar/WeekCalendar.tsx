import { useState, useMemo } from 'react'
import type { Spot, WeekKey, SpotType, AdaptScore } from '../../types/spot'
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

const TYPE_ORDER: Record<string, number> = { '期間限定': 0, '季節営業': 1, '常設': 2 }
const SCORE_ORDER: Record<string, number> = { '◎': 0, '○': 1, '△': 2, '×': 3 }

type SortKey = 'type' | 'score' | 'drive'

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'type', label: '期間限定優先' },
  { key: 'score', label: 'スコア順' },
  { key: 'drive', label: '近い順' },
]

const ALL_TYPES: SpotType[] = ['期間限定', '季節営業', '常設']
const SCORE_FILTERS: AdaptScore[] = ['◎', '○', '△']

export function WeekCalendar({ spots }: Props) {
  const [activeWeek, setActiveWeek] = useState<WeekKey>('w1')
  const [expanded, setExpanded] = useState<number | null>(null)
  const [sortKey, setSortKey] = useState<SortKey>('type')
  const [filterTypes, setFilterTypes] = useState<SpotType[]>([])
  const [filterScores, setFilterScores] = useState<AdaptScore[]>([])
  const [filterCategory, setFilterCategory] = useState<string>('')

  const weekSpots = spotsForWeek(spots, activeWeek)

  const categories = useMemo(() => {
    const set = new Set(weekSpots.map((s) => s.category).filter(Boolean) as string[])
    return Array.from(set).sort()
  }, [weekSpots])

  const filtered = useMemo(() => {
    let result = weekSpots
    if (filterTypes.length > 0) {
      result = result.filter((s) => filterTypes.includes(s.type as SpotType))
    }
    if (filterScores.length > 0) {
      result = result.filter((s) => filterScores.includes(s.weeks[activeWeek]))
    }
    if (filterCategory) {
      result = result.filter((s) => s.category === filterCategory)
    }
    return result
  }, [weekSpots, filterTypes, filterScores, filterCategory, activeWeek])

  const sorted = useMemo(() => {
    return [...filtered].sort((a, b) => {
      if (sortKey === 'type') {
        const ta = TYPE_ORDER[a.type ?? '常設'] ?? 2
        const tb = TYPE_ORDER[b.type ?? '常設'] ?? 2
        if (ta !== tb) return ta - tb
        return (SCORE_ORDER[a.weeks[activeWeek] ?? '△'] ?? 3) - (SCORE_ORDER[b.weeks[activeWeek] ?? '△'] ?? 3)
      }
      if (sortKey === 'score') {
        const sa = SCORE_ORDER[a.weeks[activeWeek] ?? '△'] ?? 3
        const sb = SCORE_ORDER[b.weeks[activeWeek] ?? '△'] ?? 3
        if (sa !== sb) return sa - sb
        return (TYPE_ORDER[a.type ?? '常設'] ?? 2) - (TYPE_ORDER[b.type ?? '常設'] ?? 2)
      }
      if (sortKey === 'drive') {
        return (a.driveMinMax ?? 999) - (b.driveMinMax ?? 999)
      }
      return 0
    })
  }, [filtered, sortKey, activeWeek])

  function toggleType(t: SpotType) {
    setFilterTypes((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t])
  }
  function toggleScore(s: AdaptScore) {
    setFilterScores((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s])
  }
  const hasFilter = filterTypes.length > 0 || filterScores.length > 0 || filterCategory !== ''

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

      {/* ソート・絞り込みバー */}
      <div className="mt-3 space-y-2">
        {/* ソート */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-400 shrink-0">並び順:</span>
          {SORT_OPTIONS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setSortKey(key)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                sortKey === key
                  ? 'bg-gray-800 text-white border-gray-800'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* 絞り込み: タイプ */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-400 shrink-0">タイプ:</span>
          {ALL_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => toggleType(t)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                filterTypes.includes(t)
                  ? t === '期間限定' ? 'bg-red-500 text-white border-red-500'
                  : t === '季節営業' ? 'bg-yellow-400 text-white border-yellow-400'
                  : 'bg-green-500 text-white border-green-500'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* 絞り込み: スコア */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-gray-400 shrink-0">適性:</span>
          {SCORE_FILTERS.map((s) => (
            <button
              key={s!}
              onClick={() => toggleScore(s)}
              className={`text-xs w-9 py-1 rounded-full border transition-colors ${
                filterScores.includes(s)
                  ? s === '◎' ? 'bg-emerald-500 text-white border-emerald-500'
                  : s === '○' ? 'bg-sky-500 text-white border-sky-500'
                  : 'bg-amber-400 text-white border-amber-400'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
              }`}
            >
              {s}
            </button>
          ))}

          {/* カテゴリ */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="text-xs px-2 py-1 rounded-full border border-gray-200 bg-white text-gray-600 focus:outline-none focus:border-sky-400"
          >
            <option value="">カテゴリ: 全て</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {hasFilter && (
            <button
              onClick={() => { setFilterTypes([]); setFilterScores([]); setFilterCategory('') }}
              className="text-xs text-sky-600 hover:underline ml-1"
            >
              リセット
            </button>
          )}
        </div>
      </div>

      <p className="text-xs text-gray-400 mt-3 mb-2">{sorted.length}件{hasFilter ? ` / 全${weekSpots.length}件` : ''}</p>

      {/* リスト */}
      <div className="divide-y divide-gray-100 border border-gray-100 rounded-xl overflow-hidden">
        {sorted.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-400">条件に合うスポットがありません</div>
        )}
        {sorted.map((s) => {
          const score = s.weeks[activeWeek]
          const isOpen = expanded === s.id
          return (
            <div key={s.id} className="bg-white">
              <button
                className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                onClick={() => setExpanded(isOpen ? null : s.id)}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-7 h-7 shrink-0 flex items-center justify-center rounded-full text-sm ${SCORE_COLOR[score ?? ''] ?? 'bg-gray-100 text-gray-400'}`}>
                    {score}
                  </span>

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

                  <svg
                    className={`w-4 h-4 text-gray-300 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20" fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </button>

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
