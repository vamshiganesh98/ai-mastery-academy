import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Search, BookOpen } from 'lucide-react'
import { glossary } from '../data/glossary'

const categories = [...new Set(glossary.map(g => g.category))]

export function GlossaryPage() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = useMemo(() => {
    return glossary.filter(term => {
      const matchesSearch = term.term.toLowerCase().includes(search.toLowerCase()) ||
        term.definition.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = !activeCategory || term.category === activeCategory
      return matchesSearch && matchesCategory
    })
  }, [search, activeCategory])

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 flex items-center gap-3">
          <BookOpen className="text-indigo-400" />
          AI Glossary
        </h1>
        <p className="text-gray-400">
          {glossary.length} essential terms every AI engineer must know. Click any term linked to a lesson to learn more.
        </p>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search terms..."
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-gray-900/50 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveCategory(null)}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
            !activeCategory ? 'bg-indigo-500/20 text-indigo-300' : 'bg-white/5 text-gray-400 hover:text-white'
          }`}
        >
          All
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              activeCategory === cat ? 'bg-indigo-500/20 text-indigo-300' : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map(term => (
          <div
            key={term.term}
            className="p-5 rounded-2xl border border-white/5 bg-gray-900/30 hover:border-white/10 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-bold text-white text-lg">{term.term}</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-white/5 text-gray-500">
                    {term.category}
                  </span>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">{term.definition}</p>
              </div>
              {term.relatedLesson && (
                <Link
                  to={`/lesson/${term.relatedLesson}`}
                  className="shrink-0 px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 text-xs font-medium hover:bg-indigo-500/20 transition-colors"
                >
                  Day {term.relatedLesson}
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p>No terms found matching "{search}"</p>
        </div>
      )}
    </div>
  )
}
