import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Brain, Zap, Bot, Rocket, ArrowRight, Play, BookOpen,
  Code2, Database, Shield, Target, Sparkles, ChevronRight
} from 'lucide-react'
import { weeks, skills } from '../data/types'
import { allLessons, TOTAL_LESSONS } from '../data'
import { latestUpdate } from '../data/syllabus-updates'

interface HomePageProps {
  completionPercent: number
  completedCount: number
  lastVisited: number
  hasNewUpdates?: boolean
}

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const features = [
  { icon: Brain, title: 'Deep Foundations', desc: 'Neural networks, LLMs, tokens, embeddings — understand how AI really works' },
  { icon: Code2, title: 'Hands-On Code', desc: 'Python examples for every concept. Copy, run, and learn by building' },
  { icon: Bot, title: 'Build Real Agents', desc: 'RAG, function calling, LangGraph — create production-ready AI agents' },
  { icon: Database, title: 'Vector Databases', desc: 'Chroma, Pinecone, pgvector — master semantic search' },
  { icon: Shield, title: 'Production Ready', desc: 'Guardrails, testing, deployment, cost optimization' },
  { icon: Target, title: 'Quizzes & Projects', desc: 'Test your knowledge daily. 4 capstone projects for your portfolio' },
]

export function HomePage({ completionPercent, completedCount, lastVisited, hasNewUpdates }: HomePageProps) {
  const continueLesson = allLessons.find(l => l.day === lastVisited)

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&h=1080&fit=crop"
            alt="AI Neural Network"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-surface-950 via-surface-950/90 to-surface-950" />
        </div>

        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-indigo-300 mb-8">
              <Sparkles size={16} />
              Your 30-Day Journey to AI Mastery
            </div>
          </motion.div>

          <motion.h1
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6"
          >
            Become a<br />
            <span className="gradient-text">Pro AI Engineer</span>
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed"
          >
            Master LLMs, build intelligent agents, understand every line of AI-generated code.
            30 days. 4 projects. Zero to production-ready.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              to={completedCount > 0 ? `/lesson/${lastVisited}` : '/lesson/1'}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
            >
              <Play size={20} />
              {completedCount > 0 ? 'Continue Learning' : 'Start Day 1'}
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/curriculum"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl glass text-white font-semibold hover:bg-white/10 transition-all"
            >
              <BookOpen size={20} />
              View Curriculum
            </Link>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-8 mt-16"
          >
            {[
              { value: `${allLessons.length}`, label: 'Days of Learning' },
              { value: '4', label: 'Capstone Projects' },
              { value: '35+', label: 'Glossary Terms' },
              { value: '12', label: 'Core Skills' },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Latest Update Banner */}
      {hasNewUpdates && latestUpdate && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 relative z-10">
          <Link
            to="/updates"
            className="block p-5 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:border-amber-500/50 transition-all group"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-500/20 text-amber-300 animate-pulse">
                  NEW UPDATE
                </span>
                <div>
                  <p className="text-sm font-bold text-white group-hover:text-amber-200 transition-colors">
                    {latestUpdate.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{latestUpdate.summary}</p>
                </div>
              </div>
              <ChevronRight className="text-amber-400 shrink-0 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </section>
      )}

      {/* Continue Learning Banner */}
      {completedCount > 0 && continueLesson && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
          <Link
            to={`/lesson/${lastVisited}`}
            className="block p-6 rounded-2xl glass glow-indigo hover:border-indigo-500/30 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                  {lastVisited}
                </div>
                <div>
                  <p className="text-xs text-indigo-400 font-medium">Continue where you left off</p>
                  <p className="text-white font-bold group-hover:text-indigo-300 transition-colors">
                    Day {lastVisited}: {continueLesson.title}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm text-gray-400">{completedCount}/{TOTAL_LESSONS} completed</p>
                  <div className="w-32 h-1.5 bg-gray-800 rounded-full mt-1 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full"
                      style={{ width: `${completionPercent}%` }}
                    />
                  </div>
                </div>
                <ChevronRight className="text-gray-500 group-hover:text-indigo-400 transition-colors" />
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* 4 Weeks */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Your 4-Week Journey</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            A carefully designed progression from AI fundamentals to building and deploying production agents.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {weeks.map((week, i) => (
            <motion.div
              key={week.week}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative p-6 rounded-2xl border border-white/5 bg-gray-900/30 hover:border-white/10 transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${week.color} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                {week.icon}
              </div>
              <div className="text-xs text-gray-500 font-mono mb-1">WEEK {week.week}</div>
              <h3 className="text-xl font-bold text-white mb-1">{week.title}</h3>
              <p className="text-sm text-gray-500 mb-4">{week.subtitle}</p>
              <p className="text-xs text-gray-600">Days {(week.week - 1) * 7 + 1}–{Math.min(week.week * 7, 30)}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Everything You Need</h2>
          <p className="text-gray-400">Not just theory — real skills, real code, real projects.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="p-6 rounded-2xl border border-white/5 bg-gray-900/20 hover:bg-gray-900/40 transition-all"
            >
              <feature.icon className="w-8 h-8 text-indigo-400 mb-4" />
              <h3 className="font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5 p-8 sm:p-12">
          <div className="flex flex-col lg:flex-row items-start gap-12">
            <div className="lg:w-1/3">
              <h2 className="text-3xl font-bold text-white mb-4">Skills You'll Master</h2>
              <p className="text-gray-400 mb-6">
                By day 30, you'll have hands-on experience with every tool in the modern AI engineering stack.
              </p>
              <Link
                to="/curriculum"
                className="inline-flex items-center gap-2 text-indigo-400 hover:text-indigo-300 font-medium text-sm"
              >
                Start learning <ArrowRight size={16} />
              </Link>
            </div>
            <div className="lg:w-2/3 flex flex-wrap gap-2">
              {skills.map(skill => (
                <span
                  key={skill.name}
                  className="px-4 py-2 rounded-xl glass text-sm text-gray-300 hover:text-white hover:border-indigo-500/30 transition-all cursor-default"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="relative rounded-3xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=400&fit=crop"
            alt="Technology"
            className="absolute inset-0 w-full h-full object-cover opacity-10"
          />
          <div className="relative p-12 sm:p-20 bg-gradient-to-br from-indigo-500/10 to-cyan-500/10 border border-white/5 rounded-3xl">
            <Zap className="w-12 h-12 text-indigo-400 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Build the Future?
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto mb-8">
              Your AI engineering career starts today. One lesson at a time, one project at a time.
            </p>
            <Link
              to="/lesson/1"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-indigo-500/25"
            >
              <Rocket size={20} />
              Begin Day 1 — The AI Universe
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
