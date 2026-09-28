import { useState } from 'react'
import { Link } from 'react-router-dom'
import ExerciseCard from '../components/ExerciseCard'
import PageHeader from '../components/PageHeader'
import { useWorkouts } from '../hooks/useWorkouts'

function Workouts() {
  const { exercises, plans, addPlan, deletePlan } = useWorkouts()
  const [showBuilder, setShowBuilder] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState(45)
  const [selected, setSelected] = useState([])
  const [error, setError] = useState('')

  function toggleExercise(id) {
    setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!name.trim() || selected.length === 0) {
      setError('Add a workout name and select at least one exercise.')
      return
    }
    addPlan({ name: name.trim(), description: description.trim() || 'A custom workout built for your goals.', duration: Number(duration), exerciseIds: selected })
    setName(''); setDescription(''); setDuration(45); setSelected([]); setError(''); setShowBuilder(false)
  }

  return (
    <main className="page-content">
      <PageHeader eyebrow="WORKOUT PLANS" title="Train with a plan." description="Use a starter routine or build your own workout from the exercise library." action={<button className="button button--primary" type="button" onClick={() => setShowBuilder((value) => !value)}>{showBuilder ? 'Close builder' : '+ Create workout'}</button>} />

      {showBuilder && <form className="builder panel" onSubmit={handleSubmit}>
        <div className="section-heading"><div><p className="section-heading__eyebrow">NEW ROUTINE</p><h2>Build your workout</h2></div><span>{selected.length} selected</span></div>
        <div className="form-grid"><label><span>Workout name</span><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Morning strength" /></label><label><span>Duration (minutes)</span><input type="number" min="10" max="180" value={duration} onChange={(e) => setDuration(e.target.value)} /></label><label className="form-grid__wide"><span>Description</span><textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What is this workout for?" /></label></div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <div className="card-grid card-grid--compact">{exercises.map((exercise) => <ExerciseCard key={exercise.id} exercise={exercise} selected={selected.includes(exercise.id)} onSelect={toggleExercise} />)}</div>
        <button className="button button--primary" type="submit">Save workout</button>
      </form>}

      <section className="plan-grid">{plans.map((plan) => <article className="plan-card" key={plan.id}><div className="plan-card__top"><span>🏋️</span><button type="button" onClick={() => deletePlan(plan.id)} aria-label={`Delete ${plan.name}`}>×</button></div><h2>{plan.name}</h2><p>{plan.description}</p><div className="workout-meta"><span>{plan.exerciseIds.length} exercises</span><span>{plan.duration} min</span></div><Link className="button button--primary button--full" to={`/session/${plan.id}`}>Start workout</Link></article>)}</section>
    </main>
  )
}

export default Workouts
