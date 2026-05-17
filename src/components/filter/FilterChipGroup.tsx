interface Props {
  label: string
  options: string[]
  selected: string[]
  onToggle: (v: string) => void
}

export function FilterChipGroup({ label, options, selected, onToggle }: Props) {
  return (
    <div>
      <p className="text-xs font-medium text-gray-500 mb-1.5">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onToggle(opt)}
            className={`text-xs px-3 py-1 rounded-full border transition-colors ${
              selected.includes(opt)
                ? 'bg-sky-500 text-white border-sky-500'
                : 'bg-white text-gray-600 border-gray-200 hover:border-sky-300'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  )
}
