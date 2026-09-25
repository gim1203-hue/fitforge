import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useWorkouts } from '../hooks/useWorkouts'

function ActiveWorkout() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { plans, exercises, completeWorkout } = useWorkouts()
  const plan = plans.find((item) => item.id === id)
  const sessionExercises = plan ? plan.exerciseIds.map((exerciseId) => exercises.find((item) => item.id === exerciseId)).filter(Boolean) : []
  const [currentIndex, setCurrentIndex] = useState(0)
  const [completed, setCompleted] = useState([])
  const [seconds, setSeconds] = useState(60)
  const [timerRunning, setTimerRunning] = useState(false)

  useEffect(() => {
    if (!timerRunning || seconds === 0) return undefined
    const timer = setInterval(() => setSeconds((value) => value - 1), 1000)
    return () => clearInterval(timer)
  }, [seconds, timerRunning])

  if (!plan) return <main className="page-content"><div className="empty-state"><span>⚠️</span><h1>Workout not found</h1><Link className="button button--primary" to="/workouts">Back to workouts</Link></div></main>

  const current = sessionExercises[currentIndex]

  function markComplete() {
    if (!completed.includes(current.id)) setCompleted((items) => [...items, current.id])
    if (currentIndex < sessionExercises.length - 1) setCurrentIndex((value) => value + 1)
  }

  function finishSession() {
    completeWorkout(plan)
    navigate('/progress', { state: { message: 'Workout completed—excellent work!' } })
  }

  return (
    <main className="page-content session-page">
      <div className="session-top"><Link to="/workouts">← Exit session</Link><span>{completed.length} / {sessionExercises.length} complete</span></div>
      <div className="progress-track"><span style={{ width: `${(completed.length / sessionExercises.length) * 100}%` }} /></div>
      <section className="session-card">
        <p className="eyebrow">NOW TRAINING · {plan.name}</p>
        <div className="session-card__icon">{current.icon}</div>
        <h1>{current.name}</h1>
        <p>{current.instructions}</p>
        <div className="session-prescription"><div><strong>{current.sets}</strong><span>Sets</span></div><div><strong>{current.reps}</strong><span>Reps / sec</span></div><div><strong>{current.equipment}</strong><span>Equipment</span></div></div>
        <div className="session-actions"><button className="button button--secondary" type="button" disabled={currentIndex === 0} onClick={() => setCurrentIndex((value) => value - 1)}>Previous</button><button className="button button--primary" type="button" onClick={markComplete}>{completed.includes(current.id) ? 'Next exercise' : 'Complete exercise'}</button></div>
      </section>
      <section className="timer panel"><div><p className="section-heading__eyebrow">REST TIMER</p><strong>{Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}</strong></div><div><button className="button button--secondary" type="button" onClick={() => setTimerRunning((value) => !value)}>{timerRunning ? 'Pause' : 'Start'}</button><button className="button button--secondary" type="button" onClick={() => { setSeconds(60); setTimerRunning(false) }}>Reset</button></div></section>
      {completed.length === sessionExercises.length && <button className="button button--primary button--full finish-button" type="button" onClick={finishSession}>Finish and save workout</button>}
    </main>
  )
}

export default ActiveWorkout
