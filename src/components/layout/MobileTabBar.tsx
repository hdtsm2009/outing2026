import { NavLink } from 'react-router-dom'

const TABS = [
  { path: '/', label: 'ホーム', icon: '🏠' },
  { path: '/navi', label: 'ナビ', icon: '🧭' },
  { path: '/list', label: '一覧', icon: '📋' },
  { path: '/calendar', label: 'カレンダー', icon: '📅' },
]

export function MobileTabBar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 sm:hidden z-40 pb-safe">
      <div className="grid grid-cols-4">
        {TABS.map(({ path, label, icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center py-2 text-xs transition-colors ${
                isActive ? 'text-sky-600 font-medium' : 'text-gray-400'
              }`
            }
          >
            <span className="text-xl leading-none mb-0.5">{icon}</span>
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
