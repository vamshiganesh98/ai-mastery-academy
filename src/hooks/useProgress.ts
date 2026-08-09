import { useState, useEffect, useCallback } from 'react'
import { TOTAL_LESSONS } from '../data'

const STORAGE_KEY = 'ai-mastery-progress'
const UPDATES_SEEN_KEY = 'ai-mastery-updates-seen'

export interface ProgressData {
  completedDays: number[]
  quizScores: Record<number, number>
  notes: Record<number, string>
  startDate: string
  lastVisited: number
}

const defaultProgress: ProgressData = {
  completedDays: [],
  quizScores: {},
  notes: {},
  startDate: new Date().toISOString(),
  lastVisited: 1,
}

export function useProgress() {
  const [progress, setProgress] = useState<ProgressData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? { ...defaultProgress, ...JSON.parse(stored) } : defaultProgress
    } catch {
      return defaultProgress
    }
  })

  const [lastSeenUpdateId, setLastSeenUpdateId] = useState<string | null>(() => {
    try {
      return localStorage.getItem(UPDATES_SEEN_KEY)
    } catch {
      return null
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  const markComplete = useCallback((day: number) => {
    setProgress(prev => ({
      ...prev,
      completedDays: prev.completedDays.includes(day)
        ? prev.completedDays
        : [...prev.completedDays, day].sort((a, b) => a - b),
    }))
  }, [])

  const unmarkComplete = useCallback((day: number) => {
    setProgress(prev => ({
      ...prev,
      completedDays: prev.completedDays.filter(d => d !== day),
    }))
  }, [])

  const setQuizScore = useCallback((day: number, score: number) => {
    setProgress(prev => ({
      ...prev,
      quizScores: { ...prev.quizScores, [day]: score },
    }))
  }, [])

  const setNote = useCallback((day: number, note: string) => {
    setProgress(prev => ({
      ...prev,
      notes: { ...prev.notes, [day]: note },
    }))
  }, [])

  const setLastVisited = useCallback((day: number) => {
    setProgress(prev => ({ ...prev, lastVisited: day }))
  }, [])

  const resetProgress = useCallback(() => {
    setProgress(defaultProgress)
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const markUpdatesSeen = useCallback((updateId: string) => {
    setLastSeenUpdateId(updateId)
    localStorage.setItem(UPDATES_SEEN_KEY, updateId)
  }, [])

  const completionPercent = Math.round((progress.completedDays.length / TOTAL_LESSONS) * 100)

  return {
    progress,
    markComplete,
    unmarkComplete,
    setQuizScore,
    setNote,
    setLastVisited,
    resetProgress,
    completionPercent,
    isComplete: (day: number) => progress.completedDays.includes(day),
    lastSeenUpdateId,
    markUpdatesSeen,
  }
}
