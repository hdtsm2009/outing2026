import { useState } from 'react'
import { useSpots } from '../hooks/useSpots'
import { useFilteredSpots } from '../hooks/useFilteredSpots'
import { SearchBar } from '../components/common/SearchBar'
import { FilterPanel } from '../components/filter/FilterPanel'
import { SpotGrid } from '../components/spot/SpotGrid'
import { LoadingSpinner } from '../components/common/LoadingSpinner'

export function ListPage() {
  const { spots, loading, error } = useSpots()
  const filtered = useFilteredSpots(spots)
  const [showFilter, setShowFilter] = useState(false)

  if (loading) return <LoadingSpinner />
  if (error) return <p className="p-4 text-red-500 text-sm">{error}</p>

  return (
    <div className="max-w-5xl mx-auto px-4 py-4">
      <div className="mb-4 flex gap-2 items-center">
        <div className="flex-1">
          <SearchBar />
        </div>
        <button
          onClick={() => setShowFilter((v) => !v)}
          className="sm:hidden px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white text-gray-600"
        >
          絞込
        </button>
      </div>

      <div className="sm:grid sm:grid-cols-[220px_1fr] sm:gap-6">
        <div className={`mb-4 sm:mb-0 ${showFilter ? 'block' : 'hidden sm:block'}`}>
          <FilterPanel />
        </div>

        <div>
          <p className="text-xs text-gray-400 mb-3">{filtered.length}件</p>
          <SpotGrid spots={filtered} />
        </div>
      </div>

      <div className="h-20 sm:h-4" />
    </div>
  )
}
