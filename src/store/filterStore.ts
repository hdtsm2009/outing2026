import { create } from 'zustand'
import type { AdaptScore, SpotType, CostTier, WeekKey } from '../types/spot'

export interface FilterState {
  searchText: string
  categories: string[]
  areas: string[]
  types: SpotType[]
  driveMaxMin: number | null
  childScore7: AdaptScore[]
  newbornScore: AdaptScore[]
  weeks: WeekKey[]
  costTiers: CostTier[]
  stayOnly: boolean
  researchOnly: boolean
}

const INITIAL: FilterState = {
  searchText: '',
  categories: [],
  areas: [],
  types: [],
  driveMaxMin: null,
  childScore7: [],
  newbornScore: [],
  weeks: [],
  costTiers: [],
  stayOnly: false,
  researchOnly: false,
}

interface FilterActions {
  setSearchText: (v: string) => void
  toggleCategory: (v: string) => void
  toggleArea: (v: string) => void
  toggleType: (v: SpotType) => void
  setDriveMaxMin: (v: number | null) => void
  toggleChildScore7: (v: AdaptScore) => void
  toggleNewbornScore: (v: AdaptScore) => void
  toggleWeek: (v: WeekKey) => void
  toggleCostTier: (v: CostTier) => void
  setStayOnly: (v: boolean) => void
  setResearchOnly: (v: boolean) => void
  applyFromNavi: (partial: Partial<FilterState>) => void
  reset: () => void
}

function toggle<T>(arr: T[], v: T): T[] {
  return arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]
}

export const useFilterStore = create<FilterState & FilterActions>((set) => ({
  ...INITIAL,
  setSearchText: (v) => set({ searchText: v }),
  toggleCategory: (v) => set((s) => ({ categories: toggle(s.categories, v) })),
  toggleArea: (v) => set((s) => ({ areas: toggle(s.areas, v) })),
  toggleType: (v) => set((s) => ({ types: toggle(s.types, v) })),
  setDriveMaxMin: (v) => set({ driveMaxMin: v }),
  toggleChildScore7: (v) => set((s) => ({ childScore7: toggle(s.childScore7, v) })),
  toggleNewbornScore: (v) => set((s) => ({ newbornScore: toggle(s.newbornScore, v) })),
  toggleWeek: (v) => set((s) => ({ weeks: toggle(s.weeks, v) })),
  toggleCostTier: (v) => set((s) => ({ costTiers: toggle(s.costTiers, v) })),
  setStayOnly: (v) => set({ stayOnly: v }),
  setResearchOnly: (v) => set({ researchOnly: v }),
  applyFromNavi: (partial) => set({ ...INITIAL, ...partial }),
  reset: () => set(INITIAL),
}))

export function countActiveFilters(s: FilterState): number {
  return (
    (s.searchText ? 1 : 0) +
    s.categories.length +
    s.areas.length +
    s.types.length +
    (s.driveMaxMin !== null ? 1 : 0) +
    s.childScore7.length +
    s.newbornScore.length +
    s.weeks.length +
    s.costTiers.length +
    (s.stayOnly ? 1 : 0) +
    (s.researchOnly ? 1 : 0)
  )
}
