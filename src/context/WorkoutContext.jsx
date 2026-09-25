import { useEffect, useState } from 'react'
import { exercises } from '../data/exercises'
import { WorkoutContext } from './workout-context'

const starterPlans = [
  { id: 'starter-strength', name: 'Full Body Strength', description: 'A balanced strength session for the whole body.', exerciseIds: [1, 2, 4, 6], duration: 45 },
  { id: 'lower-body', name: 'Lower Body Power', description: 'Build stronger legs and glutes with focused movements.', exerciseIds: [1, 3, 7, 11], duration: 50 },
]

const starterGoals = [
  { id: 'goal-weekly', title: 'Complete 4 workouts this week', target: 4, current: 2 },
]

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : fallback
  } catch {
    return fallback
  }
}

export function WorkoutProvider({ children }) {
  const [plans, setPlans] = useState(() => readStorage('fitforge-plans', starterPlans))
  const [goals, setGoals] = useState(() => readStorage('fitforge-goals', starterGoals))
  const [history, setHistory] = useState(() => readStorage('fitforge-history', []))

  useEffect(() => localStorage.setItem('fitforge-plans', JSON.stringify(plans)), [plans])
  useEffect(() => localStorage.setItem('fitforge-goals', JSON.stringify(goals)), [goals])
  useEffect(() => localStorage.setItem('fitforge-history', JSON.stringify(history)), [history])

  function addPlan(plan) {
    setPlans((current) => [...current, { ...plan, id: crypto.randomUUID() }])
  }

  function deletePlan(id) {
    setPlans((current) => current.filter((plan) => plan.id !== id))
  }

  function addGoal(goal) {
    setGoals((current) => [...current, { ...goal, id: crypto.randomUUID(), current: 0 }])
  }

  function updateGoal(id, amount) {
    setGoals((current) => current.map((goal) => (
      goal.id === id ? { ...goal, current: Math.min(goal.target, Math.max(0, goal.current + amount)) } : goal
    )))
  }

  function deleteGoal(id) {
    setGoals((current) => current.filter((goal) => goal.id !== id))
  }

  function completeWorkout(plan) {
    setHistory((current) => [{
      id: crypto.randomUUID(),
      planId: plan.id,
      name: plan.name,
      duration: plan.duration,
      completedAt: new Date().toISOString(),
      exercises: plan.exerciseIds.length,
    }, ...current])
  }

  const value = { exercises, plans, goals, history, addPlan, deletePlan, addGoal, updateGoal, deleteGoal, completeWorkout }

  return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
}
