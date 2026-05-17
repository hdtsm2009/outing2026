import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Header } from './components/layout/Header'
import { MobileTabBar } from './components/layout/MobileTabBar'
import { HomePage } from './pages/HomePage'
import { ListPage } from './pages/ListPage'
import { NaviPage } from './pages/NaviPage'
import { CalendarPage } from './pages/CalendarPage'

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/list" element={<ListPage />} />
        <Route path="/navi" element={<NaviPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
      <MobileTabBar />
    </BrowserRouter>
  )
}
