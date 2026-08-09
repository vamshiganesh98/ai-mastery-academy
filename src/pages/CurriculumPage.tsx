import { weeks } from '../data/types'
import { allLessons } from '../data'
import { LessonCard } from '../components/LessonCard'

interface CurriculumPageProps {
  isComplete: (day: number) => boolean
}

export function CurriculumPage({ isComplete }: CurriculumPageProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">30-Day Curriculum</h1>
        <p className="text-gray-400 max-w-2xl">
          Your complete roadmap from AI beginner to production-ready engineer.
          Each day includes lessons, videos, code examples, quizzes, and hands-on projects.
        </p>
      </div>

      {weeks.map(week => {
        const weekLessons = allLessons.filter(l => l.week === week.week)
        return (
          <div key={week.week} className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${week.color} flex items-center justify-center text-xl shadow-lg`}>
                {week.icon}
              </div>
              <div>
                <div className="text-xs text-gray-500 font-mono">WEEK {week.week}</div>
                <h2 className="text-2xl font-bold text-white">{week.title}</h2>
                <p className="text-sm text-gray-500">{week.subtitle}</p>
              </div>
              <div className="ml-auto text-sm text-gray-500">
                {weekLessons.filter(l => isComplete(l.day)).length}/{weekLessons.length} complete
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {weekLessons.map(lesson => (
                <LessonCard
                  key={lesson.day}
                  lesson={lesson}
                  isComplete={isComplete(lesson.day)}
                  weekColor={week.color}
                />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
