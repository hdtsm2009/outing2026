import type { NaviAnswers } from '../store/naviStore'
import type { FilterState } from '../store/filterStore'
import type { CostTier, WeekKey } from '../types/spot'

const NATURE_CATS = ['自然体験', 'アウトドア', '川遊び', '動物', '農業体験']
const MEMORY_CATS = ['花火', 'デジタルアート', 'テーマパーク', '体験型エンタメ', '水族館']

export function naviAnswersToFilter(a: NaviAnswers): Partial<FilterState> {
  const partial: Partial<FilterState> = {}

  if (a.q1_newborn === 'yes') {
    partial.newbornScore = ['◎', '○']
    if (a.q2a_stay === 'daytrip') {
      partial.driveMaxMin = 90
    } else if (a.q2a_stay === 'stay') {
      partial.stayOnly = true
    }
  } else if (a.q1_newborn === 'no') {
    if (a.q2b_theme === 'nature') {
      partial.categories = NATURE_CATS
    } else if (a.q2b_theme === 'learn') {
      partial.researchOnly = true
    } else if (a.q2b_theme === 'memory') {
      partial.categories = MEMORY_CATS
    }
  }

  const weeks: WeekKey[] = []
  if (a.q3_obon === 'w5') weeks.push('w5')
  else if (a.q3_obon === 'w6later') weeks.push('w6', 'w7')
  if (weeks.length > 0) partial.weeks = weeks

  if (a.q4_budget !== null) {
    partial.costTiers = [a.q4_budget as CostTier]
  }

  return partial
}

export type NaviPattern = 'A' | 'B' | 'C'

export function getNaviPattern(a: NaviAnswers): NaviPattern {
  if (a.q1_newborn === 'yes') return 'A'
  if (a.q2b_theme === 'learn') return 'C'
  return 'B'
}

export const NAVI_PATTERN_LABELS: Record<NaviPattern, string> = {
  A: '新生児連れ向きプラン',
  B: '思い出・体験プラン',
  C: '学び・自由研究プラン',
}
