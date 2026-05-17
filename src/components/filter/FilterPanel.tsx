import { useFilterStore, countActiveFilters } from '../../store/filterStore'
import { FilterChipGroup } from './FilterChipGroup'
import { FilterBadgeToggle } from './FilterBadgeToggle'
import type { SpotType, CostTier, WeekKey } from '../../types/spot'
import { WEEK_LABELS, WEEK_KEYS } from '../../types/spot'

const CATEGORIES = [
  '水族館', '動物', '自然体験', '科学・学習', 'テーマパーク',
  '花火', 'アウトドア', '川遊び', 'デジタルアート', '体験型エンタメ',
  '農業体験', '博物館・美術館', '工場見学', '宿泊リゾート',
]

const AREAS = ['都内', '神奈川', '千葉', '埼玉', '茨城', '栃木', '山梨', '長野', '静岡', '群馬']
const TYPES: SpotType[] = ['常設', '期間限定', '季節営業']
const COST_LABELS: Record<CostTier, string> = {
  1: '〜¥5k',
  2: '¥5-15k',
  3: '¥15k〜',
  4: '宿泊〜¥10万',
  5: '宿泊¥10万〜',
}

export function FilterPanel() {
  const store = useFilterStore()
  const activeCount = countActiveFilters(store)

  return (
    <aside className="space-y-5">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold text-gray-700">絞り込み</p>
        {activeCount > 0 && (
          <button
            onClick={store.reset}
            className="text-xs text-sky-600 hover:underline"
          >
            リセット ({activeCount})
          </button>
        )}
      </div>

      <FilterChipGroup
        label="カテゴリ"
        options={CATEGORIES}
        selected={store.categories}
        onToggle={store.toggleCategory}
      />

      <FilterChipGroup
        label="エリア"
        options={AREAS}
        selected={store.areas}
        onToggle={store.toggleArea}
      />

      <FilterChipGroup
        label="開催タイプ"
        options={TYPES}
        selected={store.types}
        onToggle={(v) => store.toggleType(v as SpotType)}
      />

      <FilterBadgeToggle
        label="7歳児適性"
        selected={store.childScore7}
        onToggle={store.toggleChildScore7}
      />

      <FilterBadgeToggle
        label="新生児可否"
        selected={store.newbornScore}
        onToggle={store.toggleNewbornScore}
      />

      <div>
        <p className="text-xs font-medium text-gray-500 mb-1.5">週フィルター</p>
        <div className="flex flex-wrap gap-1.5">
          {WEEK_KEYS.map((wk) => (
            <button
              key={wk}
              onClick={() => store.toggleWeek(wk)}
              className={`text-xs px-2 py-1 rounded border transition-colors ${
                store.weeks.includes(wk as WeekKey)
                  ? 'bg-sky-500 text-white border-sky-500'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-sky-300'
              }`}
            >
              {wk.toUpperCase()}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-1">
          {store.weeks.length > 0 ? store.weeks.map((w) => WEEK_LABELS[w]).join(' / ') : ''}
        </p>
      </div>

      <div>
        <p className="text-xs font-medium text-gray-500 mb-1.5">予算</p>
        <div className="flex flex-wrap gap-1.5">
          {([1, 2, 3, 4, 5] as CostTier[]).map((tier) => (
            <button
              key={tier}
              onClick={() => store.toggleCostTier(tier)}
              className={`text-xs px-2 py-1 rounded border transition-colors ${
                store.costTiers.includes(tier)
                  ? 'bg-sky-500 text-white border-sky-500'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-sky-300'
              }`}
            >
              {COST_LABELS[tier]}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs font-medium text-gray-500 mb-1.5">移動時間上限（お盆最大）</p>
        <input
          type="range"
          min={30}
          max={240}
          step={15}
          value={store.driveMaxMin ?? 240}
          onChange={(e) => store.setDriveMaxMin(Number(e.target.value) === 240 ? null : Number(e.target.value))}
          className="w-full accent-sky-500"
        />
        <p className="text-xs text-gray-500 text-right">
          {store.driveMaxMin !== null ? `${store.driveMaxMin}分以内` : '制限なし'}
        </p>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={store.researchOnly}
            onChange={(e) => store.setResearchOnly(e.target.checked)}
            className="accent-sky-500"
          />
          自由研究向きのみ
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input
            type="checkbox"
            checked={store.stayOnly}
            onChange={(e) => store.setStayOnly(e.target.checked)}
            className="accent-sky-500"
          />
          宿泊向きのみ
        </label>
      </div>
    </aside>
  )
}
