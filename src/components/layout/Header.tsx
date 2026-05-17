import { Link, useLocation } from 'react-router-dom'

const NAV = [
  { path: '/', label: 'ホーム' },
  { path: '/navi', label: 'ナビ' },
  { path: '/list', label: '一覧' },
  { path: '/calendar', label: 'カレンダー' },
]

export function Header() {
  const { pathname } = useLocation()

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="font-bold text-sky-600 text-sm">
          2026夏おでかけ
        </Link>
        <nav className="hidden sm:flex gap-1">
          {NAV.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                pathname === path
                  ? 'bg-sky-50 text-sky-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
