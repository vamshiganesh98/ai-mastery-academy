import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { HomePage } from './pages/HomePage'
import { CurriculumPage } from './pages/CurriculumPage'
import { LessonPage } from './pages/LessonPage'
import { GlossaryPage } from './pages/GlossaryPage'
import { ProgressPage } from './pages/ProgressPage'
import { UpdatesPage } from './pages/UpdatesPage'
import { useProgress } from './hooks/useProgress'
import { latestUpdate } from './data/syllabus-updates'

function App() {
  const {
    progress,
    completionPercent,
    markComplete,
    unmarkComplete,
    setQuizScore,
    setNote,
    setLastVisited,
    resetProgress,
    isComplete,
    lastSeenUpdateId,
    markUpdatesSeen,
  } = useProgress()

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-surface-950">
        <Navbar completionPercent={completionPercent} lastSeenUpdateId={lastSeenUpdateId} />
        <main className="pt-16">
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  completionPercent={completionPercent}
                  completedCount={progress.completedDays.length}
                  lastVisited={progress.lastVisited}
                  hasNewUpdates={lastSeenUpdateId !== (latestUpdate?.id ?? '')}
                />
              }
            />
            <Route
              path="/curriculum"
              element={<CurriculumPage isComplete={isComplete} />}
            />
            <Route
              path="/lesson/:day"
              element={
                <LessonPage
                  isComplete={isComplete}
                  markComplete={markComplete}
                  unmarkComplete={unmarkComplete}
                  setQuizScore={setQuizScore}
                  setNote={setNote}
                  setLastVisited={setLastVisited}
                  notes={progress.notes}
                />
              }
            />
            <Route path="/glossary" element={<GlossaryPage />} />
            <Route
              path="/updates"
              element={
                <UpdatesPage
                  lastSeenUpdateId={lastSeenUpdateId}
                  markUpdatesSeen={markUpdatesSeen}
                />
              }
            />
            <Route
              path="/progress"
              element={
                <ProgressPage
                  progress={progress}
                  completionPercent={completionPercent}
                  resetProgress={resetProgress}
                  isComplete={isComplete}
                />
              }
            />
          </Routes>
        </main>

        <footer className="border-t border-white/5 py-8 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm text-gray-500">
              AI Mastery Academy — Your living syllabus for AI engineering
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Curriculum updated daily · Built with ❤️ for aspiring AI engineers
            </p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
