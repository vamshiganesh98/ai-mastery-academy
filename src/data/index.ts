import { lessons as week1 } from './curriculum-week1'
import { week2Lessons } from './curriculum-week2'
import { week3Lessons } from './curriculum-week3'
import { week4Lessons } from './curriculum-week4'
import { bonusLessons } from './curriculum-bonus'

export const allLessons = [...week1, ...week2Lessons, ...week3Lessons, ...week4Lessons, ...bonusLessons]

export const TOTAL_LESSONS = allLessons.length

export { lessons } from './curriculum-week1'
export { week2Lessons } from './curriculum-week2'
export { week3Lessons } from './curriculum-week3'
export { week4Lessons } from './curriculum-week4'
export { bonusLessons } from './curriculum-bonus'
export * from './types'
export * from './glossary'
export * from './syllabus-updates'
