interface Props {
  message?: string
}

export function EmptyState({ message = '条件に合うスポットが見つかりませんでした' }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-gray-400">
      <span className="text-5xl mb-4">🔍</span>
      <p className="text-sm">{message}</p>
    </div>
  )
}
