import { useNaviStore } from '../../store/naviStore'

export function NaviResetButton() {
  const reset = useNaviStore((s) => s.reset)
  return (
    <button
      onClick={reset}
      className="text-sm text-gray-400 hover:text-gray-600 underline"
    >
      最初からやり直す
    </button>
  )
}
