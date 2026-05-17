import type { AdaptScore, SpotType } from '../../types/spot'

const SCORE_STYLE: Record<string, string> = {
  '◎': 'bg-emerald-100 text-emerald-700 font-bold',
  '○': 'bg-sky-100 text-sky-700',
  '△': 'bg-amber-100 text-amber-700',
  '×': 'bg-red-100 text-red-500',
  '-': 'bg-gray-100 text-gray-400',
}

const TYPE_STYLE: Record<string, string> = {
  '常設': 'bg-green-100 text-green-700',
  '期間限定': 'bg-red-100 text-red-700 font-bold',
  '季節営業': 'bg-yellow-100 text-yellow-700',
}

interface ScoreBadgeProps {
  label: string
  score: AdaptScore
}

export function ScoreBadge({ label, score }: ScoreBadgeProps) {
  if (!score) return null
  return (
    <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-gray-100">
      <span className="text-gray-500">{label}</span>
      <span className={`px-1 rounded ${SCORE_STYLE[score] ?? ''}`}>{score}</span>
    </span>
  )
}

interface TypeBadgeProps {
  type: SpotType | null
}

export function TypeBadge({ type }: TypeBadgeProps) {
  if (!type) return null
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${TYPE_STYLE[type] ?? 'bg-gray-100 text-gray-600'}`}>
      {type}
    </span>
  )
}

interface CategoryBadgeProps {
  category: string | null
  colorClass?: string
}

export function CategoryBadge({ category, colorClass = 'bg-gray-100 text-gray-600' }: CategoryBadgeProps) {
  if (!category) return null
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${colorClass}`}>
      {category}
    </span>
  )
}
