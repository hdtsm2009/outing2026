import type { Spot } from '../../types/spot'
import { SpotCard } from './SpotCard'
import { EmptyState } from '../common/EmptyState'

interface Props {
  spots: Spot[]
}

export function SpotGrid({ spots }: Props) {
  if (spots.length === 0) return <EmptyState />

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {spots.map((s) => (
        <SpotCard key={s.id} spot={s} />
      ))}
    </div>
  )
}
