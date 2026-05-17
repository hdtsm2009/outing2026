import { useMemo } from 'react'
import type { Spot } from '../types/spot'
import { useFilterStore } from '../store/filterStore'
import { applyFilters } from '../utils/filterEngine'

export function useFilteredSpots(spots: Spot[]): Spot[] {
  const filterState = useFilterStore()
  return useMemo(() => applyFilters(spots, filterState), [spots, filterState])
}
