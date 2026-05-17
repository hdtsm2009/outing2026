import { Link } from 'react-router-dom'

const CARDS = [
  {
    to: '/navi',
    icon: '🧭',
    title: 'ナビで探す',
    desc: '5つの質問に答えるだけで、あなたの状況にぴったりのスポットをご提案します',
    color: 'border-sky-200 hover:border-sky-400 hover:bg-sky-50',
  },
  {
    to: '/list',
    icon: '📋',
    title: '一覧から探す',
    desc: 'カテゴリ・エリア・新生児可否など、細かい条件で63件のスポットを絞り込めます',
    color: 'border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50',
  },
  {
    to: '/calendar',
    icon: '📅',
    title: 'カレンダーで見る',
    desc: 'W1（7/18〜）〜W7（〜8/31）の週ごとに行けるスポットを確認できます',
    color: 'border-violet-200 hover:border-violet-400 hover:bg-violet-50',
  },
]

export function HomePage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">2026夏 親子おでかけDB</h1>
        <p className="text-sm text-gray-500">63件のスポット・イベントを3つの方法から探せます</p>
        <div className="flex justify-center gap-4 mt-3 text-xs text-gray-400">
          <span>7/18〜8/31対応</span>
          <span>·</span>
          <span>7歳児 + 新生児OK</span>
          <span>·</span>
          <span>代々木上原発</span>
        </div>
      </div>

      <div className="space-y-3">
        {CARDS.map(({ to, icon, title, desc, color }) => (
          <Link
            key={to}
            to={to}
            className={`block p-5 rounded-xl border-2 transition-all ${color}`}
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl leading-none mt-0.5">{icon}</span>
              <div>
                <h2 className="font-bold text-gray-900 mb-1">{title}</h2>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-10 p-4 bg-amber-50 rounded-xl text-xs text-amber-700 space-y-1">
        <p className="font-semibold">予約優先度の目安</p>
        <p>🔴 期間限定（花火・特別展）→ 今すぐ予約</p>
        <p>🟡 季節営業（川遊び・プール）→ 2〜3週間前</p>
        <p>🟢 常設（水族館・テーマパーク）→ 1週間前でもOK</p>
      </div>
    </main>
  )
}
