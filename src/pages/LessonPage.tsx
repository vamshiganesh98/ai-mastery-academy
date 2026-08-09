import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ArrowLeft, ArrowRight, Clock, CheckCircle2, Circle,
  Lightbulb, AlertTriangle, BookOpen, Target, ExternalLink, StickyNote
} from 'lucide-react'
import { allLessons, weeks } from '../data'
import { VideoEmbed } from '../components/VideoEmbed'
import { Quiz } from '../components/Quiz'
import { CodeBlock } from '../components/CodeBlock'

interface LessonPageProps {
  isComplete: (day: number) => boolean
  markComplete: (day: number) => void
  unmarkComplete: (day: number) => void
  setQuizScore: (day: number, score: number) => void
  setNote: (day: number, note: string) => void
  setLastVisited: (day: number) => void
  notes: Record<number, string>
}

export function LessonPage({
  isComplete, markComplete, unmarkComplete,
  setQuizScore, setNote, setLastVisited, notes,
}: LessonPageProps) {
  const { day } = useParams()
  const dayNum = parseInt(day || '1')
  const lesson = allLessons.find(l => l.day === dayNum)

  useEffect(() => {
    if (lesson) setLastVisited(lesson.day)
  }, [lesson, setLastVisited])

  if (!lesson) return <Navigate to="/curriculum" />

  const week = weeks.find(w => w.week === lesson.week)!
  const completed = isComplete(lesson.day)
  const prevLesson = allLessons.find(l => l.day === dayNum - 1)
  const nextLesson = allLessons.find(l => l.day === dayNum + 1)

  return (
    <div>
      {/* Hero Banner */}
      <div className="relative h-64 sm:h-80 overflow-hidden">
        <img
          src={lesson.image}
          alt={lesson.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950 via-surface-950/70 to-surface-950/30" />
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-4 sm:px-6 pb-8">
          <Link to="/curriculum" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-white mb-4 transition-colors">
            <ArrowLeft size={16} />
            Back to Curriculum
          </Link>
          <div className="flex items-center gap-3 mb-3">
            <span className={`px-3 py-1 rounded-lg text-xs font-bold bg-gradient-to-r ${week.color} text-white`}>
              Day {lesson.day} · Week {lesson.week}
            </span>
            {lesson.isProject && (
              <span className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-500/90 text-white">
                🚀 Capstone Project
              </span>
            )}
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock size={12} />
              {lesson.duration}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{lesson.title}</h1>
          <p className="text-gray-400">{lesson.subtitle}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Mark Complete */}
        <div className="flex items-center justify-between mb-8 p-4 rounded-2xl glass">
          <button
            onClick={() => completed ? unmarkComplete(lesson.day) : markComplete(lesson.day)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              completed
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            {completed ? <CheckCircle2 size={18} /> : <Circle size={18} />}
            {completed ? 'Completed' : 'Mark as Complete'}
          </button>
          <div className="flex gap-2">
            {prevLesson && (
              <Link to={`/lesson/${prevLesson.day}`} className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                <ArrowLeft size={18} />
              </Link>
            )}
            {nextLesson && (
              <Link to={`/lesson/${nextLesson.day}`} className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
                <ArrowRight size={18} />
              </Link>
            )}
          </div>
        </div>

        {/* Description */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <p className="text-lg text-gray-300 leading-relaxed">{lesson.description}</p>
        </motion.section>

        {/* Learning Objectives */}
        <section className="mb-12">
          <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-4">
            <Target className="text-indigo-400" size={22} />
            Learning Objectives
          </h2>
          <div className="space-y-2">
            {lesson.objectives.map((obj, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-gray-900/30 border border-white/5">
                <span className="w-6 h-6 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-300">{obj}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Video */}
        <section className="mb-12">
          <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-4">
            📺 Video Lesson
          </h2>
          <VideoEmbed videoId={lesson.videoId} title={lesson.videoTitle} />
        </section>

        {/* Key Concepts */}
        <section className="mb-12">
          <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-4">
            <BookOpen className="text-violet-400" size={22} />
            Key Concepts
          </h2>
          <div className="space-y-4">
            {lesson.keyConcepts.map((concept, i) => (
              <div key={i} className="p-5 rounded-2xl border border-white/5 bg-gray-900/30">
                <h3 className="font-bold text-white mb-2">{concept.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-2">{concept.description}</p>
                {concept.analogy && (
                  <p className="text-sm text-indigo-300/80 italic border-l-2 border-indigo-500/30 pl-3">
                    💡 Analogy: {concept.analogy}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Deep Dive */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">🔬 Deep Dive</h2>
          <div className="prose-lesson p-6 rounded-2xl border border-white/5 bg-gray-900/20">
            {lesson.deepDive.split('\n').map((line, i) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                return <h3 key={i}>{line.replace(/\*\*/g, '')}</h3>
              }
              if (line.startsWith('```')) return null
              if (line.startsWith('- ') || line.startsWith('✅') || line.startsWith('❌')) {
                return <p key={i} className="!mb-1">• {line.replace(/^[-✅❌]\s*/, '')}</p>
              }
              if (line.startsWith('|')) return null
              if (line.trim() === '') return <br key={i} />
              return <p key={i}>{line}</p>
            })}
          </div>
        </section>

        {/* Code Examples */}
        {lesson.codeExamples && lesson.codeExamples.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xl font-bold text-white mb-4">💻 Code Examples</h2>
            <div className="space-y-6">
              {lesson.codeExamples.map((example, i) => (
                <CodeBlock key={i} {...example} />
              ))}
            </div>
          </section>
        )}

        {/* Pro Tips */}
        <section className="mb-12">
          <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-4">
            <Lightbulb className="text-yellow-400" size={22} />
            Pro Tips
          </h2>
          <div className="space-y-2">
            {lesson.proTips.map((tip, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
                <span className="text-yellow-400 text-sm">⭐</span>
                <span className="text-sm text-gray-300">{tip}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="mb-12">
          <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-4">
            <AlertTriangle className="text-red-400" size={22} />
            Common Mistakes to Avoid
          </h2>
          <div className="space-y-2">
            {lesson.commonMistakes.map((mistake, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-red-500/5 border border-red-500/10">
                <span className="text-red-400 text-sm">⚠️</span>
                <span className="text-sm text-gray-300">{mistake}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Resources */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-white mb-4">📚 Additional Resources</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {lesson.resources.map((resource, i) => (
              <a
                key={i}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-xl border border-white/5 bg-gray-900/30 hover:border-indigo-500/30 hover:bg-gray-900/50 transition-all group"
              >
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                  resource.type === 'video' ? 'bg-red-500/20 text-red-400' :
                  resource.type === 'docs' ? 'bg-blue-500/20 text-blue-400' :
                  resource.type === 'tool' ? 'bg-emerald-500/20 text-emerald-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {resource.type}
                </span>
                <span className="text-sm text-gray-300 group-hover:text-white transition-colors flex-1">
                  {resource.title}
                </span>
                <ExternalLink size={14} className="text-gray-600 group-hover:text-indigo-400" />
              </a>
            ))}
          </div>
        </section>

        {/* Notes */}
        <section className="mb-12">
          <h2 className="flex items-center gap-2 text-xl font-bold text-white mb-4">
            <StickyNote className="text-amber-400" size={22} />
            My Notes
          </h2>
          <textarea
            value={notes[lesson.day] || ''}
            onChange={e => setNote(lesson.day, e.target.value)}
            placeholder="Write your notes, insights, and questions here..."
            className="w-full h-32 p-4 rounded-2xl bg-gray-900/50 border border-white/10 text-gray-300 text-sm placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 resize-y"
          />
        </section>

        {/* Quiz */}
        <section className="mb-12 p-6 sm:p-8 rounded-2xl border border-white/5 bg-gray-900/30">
          <Quiz
            questions={lesson.quiz}
            onComplete={score => setQuizScore(lesson.day, score)}
          />
        </section>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-8 border-t border-white/5">
          {prevLesson ? (
            <Link
              to={`/lesson/${prevLesson.day}`}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={16} />
              Day {prevLesson.day}: {prevLesson.title}
            </Link>
          ) : <div />}
          {nextLesson ? (
            <Link
              to={`/lesson/${nextLesson.day}`}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Day {nextLesson.day}: {nextLesson.title}
              <ArrowRight size={16} />
            </Link>
          ) : (
            <Link
              to="/progress"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-medium hover:opacity-90 transition-opacity"
            >
              View Progress 🎓
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
