import { useState } from 'react'
import { CheckCircle2, XCircle, RotateCcw, Trophy } from 'lucide-react'
import type { QuizQuestion } from '../data/types'

interface QuizProps {
  questions: QuizQuestion[]
  onComplete?: (score: number) => void
}

export function Quiz({ questions, onComplete }: QuizProps) {
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const question = questions[currentQ]

  const handleSelect = (index: number) => {
    if (showExplanation) return
    setSelected(index)
    setShowExplanation(true)
    if (index === question.correctIndex) {
      setScore(s => s + 1)
    }
  }

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1)
      setSelected(null)
      setShowExplanation(false)
    } else {
      const actualScore = Math.round((score / questions.length) * 100)
      setFinished(true)
      onComplete?.(actualScore)
    }
  }

  const handleRetry = () => {
    setCurrentQ(0)
    setSelected(null)
    setShowExplanation(false)
    setScore(0)
    setFinished(false)
  }

  if (finished) {
    const percent = Math.round((score / questions.length) * 100)
    return (
      <div className="text-center py-8">
        <Trophy className={`w-16 h-16 mx-auto mb-4 ${percent >= 70 ? 'text-yellow-400' : 'text-gray-500'}`} />
        <h3 className="text-2xl font-bold text-white mb-2">
          {percent >= 70 ? 'Great job!' : 'Keep learning!'}
        </h3>
        <p className="text-gray-400 mb-1">
          You scored <span className="text-white font-bold">{score}/{questions.length}</span> ({percent}%)
        </p>
        <p className="text-sm text-gray-500 mb-6">
          {percent >= 90 ? 'Outstanding! You\'ve mastered this topic.' :
           percent >= 70 ? 'Good understanding. Review the explanations for missed questions.' :
           'Re-read the lesson and try again.'}
        </p>
        <button
          onClick={handleRetry}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500/30 transition-colors text-sm font-medium"
        >
          <RotateCcw size={16} />
          Retry Quiz
        </button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-white">Knowledge Check</h3>
        <span className="text-sm text-gray-500 font-mono">
          {currentQ + 1} / {questions.length}
        </span>
      </div>

      <div className="w-full h-1 bg-gray-800 rounded-full mb-6 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full transition-all"
          style={{ width: `${((currentQ + (showExplanation ? 1 : 0)) / questions.length) * 100}%` }}
        />
      </div>

      <p className="text-white font-medium text-lg mb-5">{question.question}</p>

      <div className="space-y-2.5 mb-6">
        {question.options.map((option, i) => {
          let style = 'border-white/10 hover:border-indigo-500/50 hover:bg-indigo-500/5'
          if (showExplanation) {
            if (i === question.correctIndex) {
              style = 'border-emerald-500/50 bg-emerald-500/10'
            } else if (i === selected) {
              style = 'border-red-500/50 bg-red-500/10'
            } else {
              style = 'border-white/5 opacity-50'
            }
          } else if (selected === i) {
            style = 'border-indigo-500/50 bg-indigo-500/10'
          }

          return (
            <button
              key={i}
              onClick={() => handleSelect(i)}
              disabled={showExplanation}
              className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all flex items-center gap-3 ${style}`}
            >
              <span className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-xs font-mono text-gray-400 shrink-0">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-sm text-gray-200">{option}</span>
              {showExplanation && i === question.correctIndex && (
                <CheckCircle2 size={18} className="text-emerald-400 ml-auto shrink-0" />
              )}
              {showExplanation && i === selected && i !== question.correctIndex && (
                <XCircle size={18} className="text-red-400 ml-auto shrink-0" />
              )}
            </button>
          )
        })}
      </div>

      {showExplanation && (
        <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 mb-6">
          <p className="text-sm text-indigo-200">
            <strong className="text-indigo-300">Explanation: </strong>
            {question.explanation}
          </p>
        </div>
      )}

      {showExplanation && (
        <button
          onClick={handleNext}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-medium hover:opacity-90 transition-opacity"
        >
          {currentQ < questions.length - 1 ? 'Next Question' : 'See Results'}
        </button>
      )}
    </div>
  )
}
