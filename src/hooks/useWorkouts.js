import { useContext } from 'react'
import { WorkoutContext } from '../context/workout-context'

export function useWorkouts() {
  const context = useContext(WorkoutContext)
  if (!context) throw new Error('useWorkouts must be used inside WorkoutProvider')
  return context
}
