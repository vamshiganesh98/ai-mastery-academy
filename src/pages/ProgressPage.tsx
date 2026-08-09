import { Link } from 'react-router-dom'
import {
  Trophy, Calendar, Target, RotateCcw, CheckCircle2,
  BarChart3, Award, Flame
} from 'lucide-react'
import { allLessons, weeks, skills, TOTAL_LESSONS } from '../data'
import type { ProgressData } from '../hooks/useProgress'

interface ProgressPageProps {
  progress: ProgressData
  completionPercent: number
  resetProgress: () => void
  isComplete: (day: number) => boolean
}

export function ProgressPage({ progress, completionPercent, resetProgress, isComplete }: ProgressPageProps) {
  const projectDays = allLessons.filter(l => l.isProject)
  const completedProjects = projectDays.filter(l => isComplete(l.day)).length
  const quizDays = Object.keys(progress.quizScores).length
  const avgQuizScore = quizDays > 0
    ? Math.round(Object.values(progress.quizScores).reduce((a, b) => a + b, 0) / quizDays)
    : 0

  const startDate = new Date(progress.startDate)
  const daysSinceStart = Math.max(1, Math.ceil((Date.now() - startDate.getTime()) / (1000 * 60 * 60 * 24)))

  const achievements = [
    { id: 'first', title: 'First Steps', desc: 'Complete Day 1', earned: isComplete(1), icon: '🎯' },
    { id: 'week1', title: 'Foundation Builder', desc: 'Complete Week 1', earned: [1,2,3,4,5,6,7].every(isComplete), icon: '🧠' },
    { id: 'week2', title: 'LLM Builder', desc: 'Complete Week 2', earned: [8,9,10,11,12,13,14].every(isComplete), icon: '⚡' },
    { id: 'week3', title: 'Agent Architect', desc: 'Complete Week 3', earned: [15,16,17,18,19,20,21].every(isComplete), icon: '🤖' },
    { id: 'graduate', title: 'AI Engineer', desc: `Complete all ${TOTAL_LESSONS} days`, earned: completionPercent === 100, icon: '🎓' },
    { id: 'quiz', title: 'Quiz Master', desc: 'Score 90%+ on any quiz', earned: Object.values(progress.quizScores).some(s => s >= 90), icon: '🏆' },
    { id: 'project', title: 'Builder', desc: 'Complete a capstone project', earned: completedProjects > 0, icon: '🚀' },
    { id: 'streak', title: 'On Fire', desc: 'Complete 7 days in a row', earned: progress.completedDays.length >= 7, icon: '🔥' },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 flex items-center gap-3">
          <BarChart3 className="text-indigo-400" />
          Your Progress
        </h1>
        <p className="text-gray-400">Track your journey to becoming an AI engineer.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Completion', value: `${completionPercent}%`, icon: Target, color: 'text-indigo-400' },
          { label: 'Days Done', value: `${progress.completedDays.length}/${TOTAL_LESSONS}`, icon: CheckCircle2, color: 'text-emerald-400' },
          { label: 'Projects', value: `${completedProjects}/4`, icon: Trophy, color: 'text-amber-400' },
          { label: 'Avg Quiz', value: quizDays > 0 ? `${avgQuizScore}%` : '—', icon: Award, color: 'text-violet-400' },
        ].map(stat => (
          <div key={stat.label} className="p-5 rounded-2xl border border-white/5 bg-gray-900/30">
            <stat.icon className={`${stat.color} mb-2`} size={20} />
            <div className="text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Progress Ring */}
      <div className="p-8 rounded-2xl border border-white/5 bg-gray-900/30 mb-10 text-center">
        <div className="relative w-40 h-40 mx-auto mb-6">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#1f2937" strokeWidth="8" />
            <circle
              cx="50" cy="50" r="42" fill="none"
              stroke="url(#progressGradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${completionPercent * 2.64} 264`}
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold text-white">{completionPercent}%</span>
            <span className="text-xs text-gray-500">Complete</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-4">
          <Calendar size={14} />
          Day {daysSinceStart} of your journey · Started {startDate.toLocaleDateString()}
        </div>

        {completionPercent < 100 ? (
          <Link
            to={`/lesson/${progress.lastVisited}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium hover:opacity-90 transition-opacity"
          >
            <Flame size={18} />
            Continue Learning
          </Link>
        ) : (
          <div className="text-emerald-400 font-bold text-lg">
            🎓 Congratulations, AI Engineer!
          </div>
        )}
      </div>

      {/* Week Progress */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Weekly Progress</h2>
        <div className="space-y-4">
          {weeks.map(week => {
            const weekLessons = allLessons.filter(l => l.week === week.week)
            const completed = weekLessons.filter(l => isComplete(l.day)).length
            const percent = Math.round((completed / weekLessons.length) * 100)
            return (
              <div key={week.week} className="p-4 rounded-2xl border border-white/5 bg-gray-900/20">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{week.icon}</span>
                    <span className="font-medium text-white text-sm">Week {week.week}: {week.title}</span>
                  </div>
                  <span className="text-xs text-gray-500 font-mono">{completed}/{weekLessons.length}</span>
                </div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${week.color} rounded-full transition-all duration-500`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Skills */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Skills Tracker</h2>
        <div className="grid sm:grid-cols-2 gap-2">
          {skills.map(skill => {
            const relatedLessons = allLessons.filter(l =>
              l.title.toLowerCase().includes(skill.name.toLowerCase().split(' ')[0]) ||
              l.objectives.some(o => o.toLowerCase().includes(skill.name.toLowerCase().split(' ')[0]))
            )
            const learned = relatedLessons.some(l => isComplete(l.day))
            return (
              <div
                key={skill.name}
                className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                  learned
                    ? 'border-emerald-500/20 bg-emerald-500/5'
                    : 'border-white/5 bg-gray-900/20'
                }`}
              >
                {learned ? (
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                ) : (
                  <div className="w-4 h-4 rounded-full border border-gray-600 shrink-0" />
                )}
                <span className={`text-sm ${learned ? 'text-white' : 'text-gray-500'}`}>
                  {skill.name}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">Achievements</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {achievements.map(achievement => (
            <div
              key={achievement.id}
              className={`p-4 rounded-2xl border text-center transition-all ${
                achievement.earned
                  ? 'border-amber-500/20 bg-amber-500/5'
                  : 'border-white/5 bg-gray-900/20 opacity-50'
              }`}
            >
              <div className="text-2xl mb-2">{achievement.icon}</div>
              <div className="text-sm font-bold text-white">{achievement.title}</div>
              <div className="text-[10px] text-gray-500 mt-1">{achievement.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Day-by-day checklist */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-white mb-4">All Days</h2>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {allLessons.map(lesson => (
            <Link
              key={lesson.day}
              to={`/lesson/${lesson.day}`}
              className={`aspect-square rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                isComplete(lesson.day)
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : lesson.day === progress.lastVisited
                  ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                  : 'bg-gray-900/30 text-gray-600 border border-white/5 hover:border-white/10'
              }`}
              title={`Day ${lesson.day}: ${lesson.title}`}
            >
              {lesson.day}
            </Link>
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          if (confirm('Reset all progress? This cannot be undone.')) {
            resetProgress()
          }
        }}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-400 transition-colors"
      >
        <RotateCcw size={14} />
        Reset all progress
      </button>
    </div>
  )
}
