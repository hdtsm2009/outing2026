import { useSpots } from '../hooks/useSpots'
import { WeekCalendar } from '../components/calendar/WeekCalendar'
import { LoadingSpinner } from '../components/common/LoadingSpinner'

export function CalendarPage() {
  const { spots, loading, error } = useSpots()

  if (loading) return <LoadingSpinner />
  if (error) return <p className="p-4 text-red-500 text-sm">{error}</p>

  return (
    <main className="max-w-5xl mx-auto px-4 py-4">
      <div className="mb-4">
        <h1 className="font-bold text-gray-900">週別カレンダー</h1>
        <p className="text-xs text-gray-400 mt-0.5">各週に◎○のスポットを表示。赤点 = 期間限定</p>
      </div>
      <WeekCalendar spots={spots} />
      <div className="h-20 sm:h-4" />
    </main>
  )
}
