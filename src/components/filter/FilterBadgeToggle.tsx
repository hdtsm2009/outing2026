import type { AdaptScore } from '../../types/spot'

const SCORES: AdaptScore[] = ['◎', '○', '△', '×']

const STYLE: Record<string, string> = {
  '◎': 'bg-emerald-500 text-white border-emerald-500',
  '○': 'bg-sky-500 text-white border-sky-500',
  '△': 'bg-amber-400 text-white border-amber-400',
  '×': 'bg-red-400 text-white border-red-400',
}

const IDLE = 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'

interface Props {
  label: string
  selected: AdaptScore[]
  onToggle: (v: AdaptScore) => void
}

export function FilterBadgeToggle({ label, selected, onToggle }: Props) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-500 mb-1.5">{label}</p>
      <div className="flex gap-1.5">
        {SCORES.map((s) => (
          <button
            key={s}
            onClick={() => onToggle(s)}
            className={`w-10 py-1 text-sm rounded border transition-colors ${
              selected.includes(s) ? STYLE[s!] : IDLE
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
