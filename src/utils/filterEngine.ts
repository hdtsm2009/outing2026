import type { Spot } from '../types/spot'
import type { FilterState } from '../store/filterStore'

export function applyFilters(spots: Spot[], f: FilterState): Spot[] {
  return spots.filter((s) => {
    if (f.searchText) {
      const q = f.searchText.toLowerCase()
      const haystack = [s.name, s.comment, s.childReason7, s.area, s.category]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      if (!haystack.includes(q)) return false
    }

    if (f.categories.length > 0 && !f.categories.includes(s.category ?? '')) return false
    if (f.areas.length > 0 && !f.areas.includes(s.area ?? '')) return false
    if (f.types.length > 0 && !f.types.includes(s.type ?? ('' as never))) return false

    if (f.driveMaxMin !== null && s.driveMinMax !== null) {
      if (s.driveMinMax > f.driveMaxMin) return false
    }

    if (f.childScore7.length > 0 && !f.childScore7.includes(s.childScore7)) return false
    if (f.newbornScore.length > 0 && !f.newbornScore.includes(s.newbornScore)) return false

    if (f.weeks.length > 0) {
      const ok = f.weeks.some((wk) => {
        const score = s.weeks[wk]
        return score === '◎' || score === '○'
      })
      if (!ok) return false
    }

    if (f.costTiers.length > 0 && !f.costTiers.includes(s.costTier ?? (0 as never))) return false

    if (f.stayOnly && !s.stayRecommended?.includes('◎') && !s.stayRecommended?.includes('○')) {
      return false
    }

    if (f.researchOnly && s.researchSuitability !== '◎' && s.researchSuitability !== '○') {
      return false
    }

    return true
  })
}
