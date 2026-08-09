import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Newspaper, Calendar, BookOpen, ExternalLink, Sparkles,
  ArrowRight, RefreshCw
} from 'lucide-react'
import { syllabusUpdates, latestUpdate } from '../data/syllabus-updates'

interface UpdatesPageProps {
  lastSeenUpdateId: string | null
  markUpdatesSeen: (id: string) => void
}

const typeLabels: Record<string, { label: string; color: string }> = {
  'morning-brief': { label: 'Morning Brief', color: 'bg-amber-500/20 text-amber-400' },
  'new-lesson': { label: 'New Lesson', color: 'bg-emerald-500/20 text-emerald-400' },
  'lesson-update': { label: 'Lesson Updated', color: 'bg-blue-500/20 text-blue-400' },
  'industry-news': { label: 'Industry News', color: 'bg-violet-500/20 text-violet-400' },
  'resource': { label: 'New Resource', color: 'bg-cyan-500/20 text-cyan-400' },
}

export function UpdatesPage({ lastSeenUpdateId, markUpdatesSeen }: UpdatesPageProps) {
  useEffect(() => {
    if (latestUpdate) markUpdatesSeen(latestUpdate.id)
  }, [markUpdatesSeen])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center">
            <Newspaper size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">Living Syllabus</h1>
            <p className="text-sm text-gray-500">Updated every morning with the latest in AI engineering</p>
          </div>
        </div>
        <p className="text-gray-400 max-w-2xl">
          Your curriculum stays current — <strong className="text-gray-300">fully automated</strong>.
          Every day at 6 AM UTC, a bot scans AI blogs, GitHub releases, and industry sources,
          then publishes a morning brief here. No human in the loop.
        </p>
      </div>

      {/* How it works */}
      <div className="p-5 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 mb-10">
        <div className="flex items-start gap-3">
          <RefreshCw size={20} className="text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-white text-sm mb-1">Fully Automated — Zero Human in the Loop</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              GitHub Actions runs <code className="text-indigo-300 text-xs">scripts/morning-check/run.mjs</code> daily
              at 6 AM UTC. It scans RSS feeds and GitHub releases, filters for AI engineering relevance,
              writes a morning brief to your Updates page, and auto-commits. Optional: add
              <code className="text-indigo-300 text-xs"> OPENAI_API_KEY</code> to GitHub Secrets for AI-written summaries.
            </p>
          </div>
        </div>
      </div>

      {/* Updates feed */}
      <div className="space-y-8">
        {syllabusUpdates.map((update, i) => {
          const isNew = update.id !== lastSeenUpdateId && i === 0
          const typeInfo = typeLabels[update.type] || typeLabels['industry-news']

          return (
            <motion.article
              key={update.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-2xl border overflow-hidden ${
                isNew
                  ? 'border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-orange-500/5'
                  : 'border-white/5 bg-gray-900/30'
              }`}
            >
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${typeInfo.color}`}>
                    {typeInfo.label}
                  </span>
                  {isNew && (
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 flex items-center gap-1">
                      <Sparkles size={12} />
                      NEW
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Calendar size={12} />
                    {new Date(update.date).toLocaleDateString('en-US', {
                      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
                    })}
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-white mb-3">{update.title}</h2>
                <p className="text-gray-400 leading-relaxed mb-6">{update.summary}</p>

                {/* Highlights */}
                <div className="mb-6">
                  <h3 className="text-sm font-bold text-white mb-3">What Changed</h3>
                  <ul className="space-y-2">
                    {update.highlights.map((h, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                        <span className="text-indigo-400 shrink-0 mt-0.5">→</span>
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Teacher note */}
                <div className="p-4 rounded-xl bg-violet-500/10 border border-violet-500/20 mb-6">
                  <p className="text-sm text-violet-200">
                    <span className="font-bold text-violet-300">🎓 Teacher's Note: </span>
                    {update.teacherNote}
                  </p>
                </div>

                {/* Affected lessons */}
                {update.affectedLessons && update.affectedLessons.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {update.affectedLessons.map(day => (
                      <Link
                        key={day}
                        to={`/lesson/${day}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 text-xs font-medium hover:bg-indigo-500/20 transition-colors"
                      >
                        <BookOpen size={12} />
                        {day === 31 ? 'Day 31 (New)' : `Day ${day} (Updated)`}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Sources */}
                <div>
                  <h3 className="text-sm font-bold text-white mb-3">Sources</h3>
                  <div className="flex flex-wrap gap-2">
                    {update.sources.map((source, j) => (
                      <a
                        key={j}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 text-xs hover:text-white hover:bg-white/10 transition-colors"
                      >
                        {source.title}
                        <ExternalLink size={10} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          )
        })}
      </div>

      {/* CTA */}
      <div className="mt-12 text-center p-8 rounded-2xl border border-white/5 bg-gray-900/30">
        <p className="text-gray-400 mb-4">Ready to learn today's updates?</p>
        <Link
          to="/lesson/31"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-rose-500 to-orange-500 text-white font-medium hover:opacity-90 transition-opacity"
        >
          Start Day 31 — Production Agent Concepts
          <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  )
}
