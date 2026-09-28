import { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore'
import { exercises } from '../data/exercises'
import { db } from '../firebase'
import { useAuth } from '../hooks/useAuth'
import { WorkoutContext } from './workout-context'

/* oxlint-disable react/set-state-in-effect -- authentication changes hydrate state from Firestore and the local offline fallback. */

const starterPlans = [
  { id: 'starter-strength', name: 'Full Body Strength', description: 'A balanced strength session for the whole body.', exerciseIds: [1, 2, 4, 6], duration: 45 },
  { id: 'lower-body', name: 'Lower Body Power', description: 'Build stronger legs and glutes with focused movements.', exerciseIds: [1, 3, 7, 11], duration: 50 },
]

const starterGoals = [{ id: 'goal-weekly', title: 'Complete 4 workouts this week', target: 4, current: 2 }]

function readFallback(uid, type, fallback) {
  try {
    const value = localStorage.getItem(`fitforge-${uid}-${type}`)
    return value ? JSON.parse(value) : fallback
  } catch { return fallback }
}

export function WorkoutProvider({ children }) {
  const { user } = useAuth()
  const [plans, setPlans] = useState([])
  const [goals, setGoals] = useState([])
  const [history, setHistory] = useState([])
  const [dataLoading, setDataLoading] = useState(true)
  const [syncError, setSyncError] = useState('')

  useEffect(() => {
    if (!user) {
      setPlans([]); setGoals([]); setHistory([]); setDataLoading(false)
      return undefined
    }

    setDataLoading(true)
    setPlans(readFallback(user.uid, 'plans', starterPlans))
    setGoals(readFallback(user.uid, 'goals', starterGoals))
    setHistory(readFallback(user.uid, 'history', []))
    let plansSeeded = false
    let goalsSeeded = false
    let loadedCollections = 0
    const markLoaded = () => { loadedCollections += 1; if (loadedCollections >= 3) setDataLoading(false) }
    const path = (type) => collection(db, 'users', user.uid, type)
    const handleError = () => { setSyncError('Cloud sync is temporarily unavailable. Your latest local data is still visible.'); setDataLoading(false) }

    const unsubscribePlans = onSnapshot(path('plans'), async (snapshot) => {
      if (snapshot.empty && !plansSeeded) {
        plansSeeded = true
        await Promise.all(starterPlans.map((plan) => setDoc(doc(path('plans'), plan.id), plan)))
      } else if (!snapshot.empty) setPlans(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })))
      markLoaded()
    }, handleError)

    const unsubscribeGoals = onSnapshot(path('goals'), async (snapshot) => {
      if (snapshot.empty && !goalsSeeded) {
        goalsSeeded = true
        await Promise.all(starterGoals.map((goal) => setDoc(doc(path('goals'), goal.id), goal)))
      } else if (!snapshot.empty) setGoals(snapshot.docs.map((item) => ({ id: item.id, ...item.data() })))
      markLoaded()
    }, handleError)

    const unsubscribeHistory = onSnapshot(path('history'), (snapshot) => {
      const records = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }))
      setHistory(records.sort((a, b) => b.completedAt.localeCompare(a.completedAt)))
      markLoaded()
    }, handleError)

    return () => { unsubscribePlans(); unsubscribeGoals(); unsubscribeHistory() }
  }, [user])

  useEffect(() => {
    if (!user) return
    localStorage.setItem(`fitforge-${user.uid}-plans`, JSON.stringify(plans))
    localStorage.setItem(`fitforge-${user.uid}-goals`, JSON.stringify(goals))
    localStorage.setItem(`fitforge-${user.uid}-history`, JSON.stringify(history))
  }, [goals, history, plans, user])

  const userCollection = (type) => collection(db, 'users', user.uid, type)

  async function save(type, item) {
    setSyncError('')
    try { await setDoc(doc(userCollection(type), item.id), item) }
    catch { setSyncError('Could not sync this change. Check your connection and try again.') }
  }

  function addPlan(plan) {
    const item = { ...plan, id: crypto.randomUUID() }
    setPlans((current) => [...current, item]); save('plans', item)
  }

  function deletePlan(id) {
    setPlans((current) => current.filter((plan) => plan.id !== id))
    deleteDoc(doc(userCollection('plans'), id)).catch(() => setSyncError('Could not delete this workout from the cloud.'))
  }

  function addGoal(goal) {
    const item = { ...goal, id: crypto.randomUUID(), current: 0 }
    setGoals((current) => [...current, item]); save('goals', item)
  }

  function updateGoal(id, amount) {
    setGoals((current) => current.map((goal) => {
      if (goal.id !== id) return goal
      const updated = { ...goal, current: Math.min(goal.target, Math.max(0, goal.current + amount)) }
      save('goals', updated)
      return updated
    }))
  }

  function deleteGoal(id) {
    setGoals((current) => current.filter((goal) => goal.id !== id))
    deleteDoc(doc(userCollection('goals'), id)).catch(() => setSyncError('Could not delete this goal from the cloud.'))
  }

  function completeWorkout(plan) {
    const item = { id: crypto.randomUUID(), planId: plan.id, name: plan.name, duration: plan.duration, completedAt: new Date().toISOString(), exercises: plan.exerciseIds.length }
    setHistory((current) => [item, ...current]); save('history', item)
  }

  const value = { exercises, plans, goals, history, dataLoading, syncError, addPlan, deletePlan, addGoal, updateGoal, deleteGoal, completeWorkout }
  return <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
}
