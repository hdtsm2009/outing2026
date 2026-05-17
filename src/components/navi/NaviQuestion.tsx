interface Option<T> {
  value: T
  label: string
  description?: string
}

interface Props<T> {
  question: string
  step: number
  total: number
  options: Option<T>[]
  onSelect: (v: T) => void
}

export function NaviQuestion<T extends string | number>({ question, step, total, options, onSelect }: Props<T>) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs text-gray-400 mb-1">Q{step} / {total}</p>
        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4">
          <div
            className="bg-sky-500 h-1.5 rounded-full transition-all"
            style={{ width: `${(step / total) * 100}%` }}
          />
        </div>
        <h2 className="text-lg font-bold text-gray-900 leading-snug">{question}</h2>
      </div>
      <div className="space-y-2.5">
        {options.map((opt) => (
          <button
            key={String(opt.value)}
            onClick={() => onSelect(opt.value)}
            className="w-full text-left px-4 py-3 rounded-xl border-2 border-gray-100 hover:border-sky-400 hover:bg-sky-50 transition-all"
          >
            <p className="font-medium text-gray-900 text-sm">{opt.label}</p>
            {opt.description && (
              <p className="text-xs text-gray-400 mt-0.5">{opt.description}</p>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
