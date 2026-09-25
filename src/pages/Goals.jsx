import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import { useWorkouts } from '../hooks/useWorkouts'

function Goals() {
  const { goals, addGoal, updateGoal, deleteGoal } = useWorkouts()
  const [title, setTitle] = useState('')
  const [target, setTarget] = useState(4)
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    if (!title.trim() || Number(target) < 1) { setError('Enter a goal and a target of at least 1.'); return }
    addGoal({ title: title.trim(), target: Number(target) }); setTitle(''); setTarget(4); setError('')
  }

  return (
    <main className="page-content">
      <PageHeader eyebrow="PERSONAL GOALS" title="Turn intention into progress." description="Set measurable goals and update them whenever you make progress." />
      <form className="goal-form panel" onSubmit={handleSubmit}><label><span>Goal</span><input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Complete 12 workouts this month" /></label><label><span>Target</span><input type="number" min="1" value={target} onChange={(event) => setTarget(event.target.value)} /></label><button className="button button--primary" type="submit">Add goal</button>{error && <p className="form-error" role="alert">{error}</p>}</form>
      <section className="goal-list">{goals.map((goal) => { const percent = Math.round((goal.current / goal.target) * 100); return <article className="goal-card" key={goal.id}><div className="goal-card__heading"><div><span>{percent >= 100 ? '🏆' : '🎯'}</span><h2>{goal.title}</h2></div><button type="button" onClick={() => deleteGoal(goal.id)} aria-label={`Delete ${goal.title}`}>×</button></div><div className="progress-track"><span style={{ width: `${percent}%` }} /></div><div className="goal-card__footer"><strong>{goal.current} / {goal.target}</strong><span>{percent}% complete</span><button className="button button--secondary" type="button" disabled={percent >= 100} onClick={() => updateGoal(goal.id, 1)}>+ Add progress</button></div></article> })}</section>
    </main>
  )
}

export default Goals
