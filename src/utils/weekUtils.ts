import type { Spot, WeekKey } from '../types/spot'

const WEEK_RANGES: Record<WeekKey, [string, string]> = {
  w1: ['2026-07-18', '2026-07-20'],
  w2: ['2026-07-21', '2026-07-26'],
  w3: ['2026-07-27', '2026-08-02'],
  w4: ['2026-08-03', '2026-08-09'],
  w5: ['2026-08-10', '2026-08-16'],
  w6: ['2026-08-17', '2026-08-23'],
  w7: ['2026-08-24', '2026-08-31'],
}

function dateToYmd(d: Date): string {
  return d.toISOString().slice(0, 10)
}

function parseDate(s: string): Date | null {
  const m = s.match(/(\d{4})[\/\-](\d{1,2})[\/\-](\d{1,2})/)
  if (m) return new Date(+m[1], +m[2] - 1, +m[3])
  const m2 = s.match(/(\d{1,2})[\/\-](\d{1,2})/)
  if (m2) return new Date(2026, +m2[1] - 1, +m2[2])
  return null
}

function periodDates(period: string): string[] {
  const results: string[] = []
  const rangeMatch = period.match(/(\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2})[〜～](\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2})/)
  if (rangeMatch) {
    const start = parseDate(rangeMatch[1])
    const end = parseDate(rangeMatch[2])
    if (start && end) {
      const cur = new Date(start)
      while (cur <= end) {
        results.push(dateToYmd(cur))
        cur.setDate(cur.getDate() + 1)
      }
      return results
    }
  }
  const parts = period.split(/[、,，]/)
  for (const p of parts) {
    const d = parseDate(p.trim())
    if (d) results.push(dateToYmd(d))
  }
  return results
}

export function spotsForWeek(spots: Spot[], week: WeekKey): Spot[] {
  const [ws, we] = WEEK_RANGES[week]

  return spots.filter((s) => {
    const weekScore = s.weeks[week]
    if (!weekScore || weekScore === '×') return false

    if (s.type === '常設') return true

    if (s.period) {
      const dates = periodDates(s.period)
      if (dates.some((d) => d >= ws && d <= we)) return true
      if (dates.length === 0) return weekScore === '◎' || weekScore === '○'
      return false
    }

    return weekScore === '◎' || weekScore === '○'
  })
}

export const CATEGORY_COLORS: Record<string, string> = {
  '花火': 'bg-red-100 text-red-700',
  '科学・学習': 'bg-blue-100 text-blue-700',
  '自然体験': 'bg-green-100 text-green-700',
  'アウトドア': 'bg-emerald-100 text-emerald-700',
  '川遊び': 'bg-cyan-100 text-cyan-700',
  '水族館': 'bg-cyan-100 text-cyan-700',
  '動物': 'bg-amber-100 text-amber-700',
  'テーマパーク': 'bg-purple-100 text-purple-700',
  'デジタルアート': 'bg-violet-100 text-violet-700',
  '体験型エンタメ': 'bg-pink-100 text-pink-700',
  '農業体験': 'bg-lime-100 text-lime-700',
  '博物館・美術館': 'bg-orange-100 text-orange-700',
  '工場見学': 'bg-slate-100 text-slate-700',
  '宿泊リゾート': 'bg-indigo-100 text-indigo-700',
}

export function categoryColor(cat: string | null): string {
  return (cat && CATEGORY_COLORS[cat]) || 'bg-gray-100 text-gray-600'
}
