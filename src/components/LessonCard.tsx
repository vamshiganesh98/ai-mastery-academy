import { Link } from 'react-router-dom'
import { Clock, CheckCircle2, Rocket, ChevronRight } from 'lucide-react'
import type { Lesson } from '../data/types'

interface LessonCardProps {
  lesson: Lesson
  isComplete: boolean
  weekColor: string
}

export function LessonCard({ lesson, isComplete, weekColor }: LessonCardProps) {
  return (
    <Link
      to={`/lesson/${lesson.day}`}
      className="group block rounded-2xl border border-white/5 bg-gray-900/40 overflow-hidden hover:border-indigo-500/30 hover:bg-gray-900/60 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5"
    >
      <div className="relative h-36 overflow-hidden">
        <img
          src={lesson.image}
          alt={lesson.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent" />
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold bg-gradient-to-r ${weekColor} text-white shadow-lg`}>
            Day {lesson.day}
          </span>
          {lesson.isProject && (
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/90 text-white flex items-center gap-1">
              <Rocket size={12} />
              Project
            </span>
          )}
          {lesson.week === 5 && (
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-500/90 text-white">
              📡 New
            </span>
          )}
        </div>
        {isComplete && (
          <div className="absolute top-3 right-3">
            <CheckCircle2 size={22} className="text-emerald-400 drop-shadow-lg" />
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-white group-hover:text-indigo-300 transition-colors mb-1">
          {lesson.title}
        </h3>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{lesson.subtitle}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {lesson.duration}
            </span>
            <span className={`px-2 py-0.5 rounded-full ${
              lesson.difficulty === 'Beginner' ? 'bg-emerald-500/10 text-emerald-400' :
              lesson.difficulty === 'Intermediate' ? 'bg-amber-500/10 text-amber-400' :
              'bg-red-500/10 text-red-400'
            }`}>
              {lesson.difficulty}
            </span>
          </div>
          <ChevronRight size={16} className="text-gray-600 group-hover:text-indigo-400 transition-colors" />
        </div>
      </div>
    </Link>
  )
}
