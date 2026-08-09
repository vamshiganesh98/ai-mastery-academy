import { Link, useLocation } from 'react-router-dom'
import { Brain, BookOpen, GraduationCap, Library, BarChart3, Newspaper } from 'lucide-react'
import { latestUpdate } from '../data/syllabus-updates'

const navItems = [
  { path: '/', label: 'Home', icon: Brain },
  { path: '/curriculum', label: 'Curriculum', icon: BookOpen },
  { path: '/updates', label: 'Updates', icon: Newspaper, showBadge: true },
  { path: '/glossary', label: 'Glossary', icon: Library },
  { path: '/progress', label: 'Progress', icon: BarChart3 },
]

export function Navbar({
  completionPercent,
  lastSeenUpdateId,
}: {
  completionPercent: number
  lastSeenUpdateId: string | null
}) {
  const location = useLocation()
  const hasNewUpdates = latestUpdate ? lastSeenUpdateId !== latestUpdate.id : false

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/25 group-hover:shadow-indigo-500/40 transition-shadow">
              AI
            </div>
            <div className="hidden sm:block">
              <span className="font-bold text-white text-sm">Mastery Academy</span>
              <span className="block text-[10px] text-gray-500 -mt-0.5">30-Day Bootcamp</span>
            </div>
          </Link>

          <div className="flex items-center gap-1">
            {navItems.map(({ path, label, icon: Icon, showBadge }) => {
              const active = location.pathname === path ||
                (path === '/curriculum' && location.pathname.startsWith('/lesson'))
              return (
                <Link
                  key={path}
                  to={path}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'bg-indigo-500/20 text-indigo-300'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} />
                  <span className="hidden md:inline">{label}</span>
                  {showBadge && hasNewUpdates && (
                    <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  )}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-24 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full transition-all duration-500"
                  style={{ width: `${completionPercent}%` }}
                />
              </div>
              <span className="text-xs text-gray-400 font-mono">{completionPercent}%</span>
            </div>
            <GraduationCap size={20} className="text-indigo-400" />
          </div>
        </div>
      </div>
    </nav>
  )
}
