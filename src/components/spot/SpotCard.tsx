import { useState } from 'react'
import type { Spot } from '../../types/spot'
import { ScoreBadge, TypeBadge, CategoryBadge } from './SpotBadge'
import { categoryColor } from '../../utils/weekUtils'
import { ExternalLink } from '../common/ExternalLink'

interface Props {
  spot: Spot
}

export function SpotCard({ spot }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <button
        className="w-full text-left p-4"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-1 mb-1">
              <TypeBadge type={spot.type} />
              <CategoryBadge category={spot.category} colorClass={categoryColor(spot.category)} />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm leading-snug">{spot.name}</h3>
            <p className="text-xs text-gray-400 mt-0.5">{spot.area} {spot.driveMinMax ? `· 車${spot.driveMinMax}分` : ''}</p>
          </div>
          <svg
            className={`w-4 h-4 text-gray-400 shrink-0 mt-1 transition-transform ${open ? 'rotate-180' : ''}`}
            viewBox="0 0 20 20" fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-2">
          <ScoreBadge label="7歳" score={spot.childScore7} />
          <ScoreBadge label="新生児" score={spot.newbornScore} />
          {spot.researchSuitability && (spot.researchSuitability === '◎' || spot.researchSuitability === '○') && (
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">自由研究向き</span>
          )}
        </div>
      </button>

      {open && <SpotCardDetail spot={spot} />}
    </div>
  )
}

function SpotCardDetail({ spot }: Props) {
  return (
    <div className="px-4 pb-4 border-t border-gray-50">
      {spot.period && (
        <p className="text-xs text-gray-500 mt-3">
          <span className="font-medium">期間: </span>{spot.period}
          {spot.periodCertainty && <span className="ml-1 text-gray-400">({spot.periodCertainty})</span>}
        </p>
      )}
      {spot.costParent2 && (
        <p className="text-xs text-gray-500 mt-1">
          <span className="font-medium">親子費用: </span>{spot.costParent2}
        </p>
      )}
      {spot.childReason7 && (
        <p className="text-xs text-gray-600 mt-2 leading-relaxed">
          <span className="font-medium text-gray-700">7歳児に刺さる: </span>{spot.childReason7}
        </p>
      )}
      {spot.comment && (
        <p className="text-xs text-gray-600 mt-1 leading-relaxed">{spot.comment}</p>
      )}
      <div className="flex flex-wrap gap-2 mt-3">
        {spot.heatMeasure && (
          <span className="text-xs text-gray-500">☀ {spot.heatMeasure}</span>
        )}
        {spot.rainy && (
          <span className="text-xs text-gray-500">☂ {spot.rainy}</span>
        )}
        {spot.crowdRisk && (
          <span className="text-xs text-gray-500">👥 {spot.crowdRisk}</span>
        )}
      </div>
      {spot.reservation && (
        <p className="text-xs text-amber-600 mt-2">📋 {spot.reservation}</p>
      )}
      <div className="flex gap-3 mt-3">
        <ExternalLink href={spot.officialUrl} label="公式サイト" />
        <ExternalLink href={spot.reservationUrl} label="予約" />
      </div>
    </div>
  )
}
