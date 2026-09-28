import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import { useWorkouts } from '../hooks/useWorkouts'

function Dashboard() {
  const { plans, goals, history, exercises } = useWorkouts()
  const totalMinutes = history.reduce((sum, item) => sum + item.duration, 0)
  const nextWorkout = plans[0]

  const stats = [
    { label: 'Completed workouts', value: history.length, detail: 'All-time sessions', icon: '✓', tone: 'green' },
    { label: 'Training time', value: `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`, detail: 'Time invested', icon: 'T', tone: 'blue' },
    { label: 'Active goals', value: goals.filter((goal) => goal.current < goal.target).length, detail: 'Keep building momentum', icon: 'G', tone: 'orange' },
  ]

  return (
    <main className="page-content">
      <PageHeader eyebrow="FITFORGE DASHBOARD" title="Build strength. Track progress." description="Your personal workspace for better workouts, consistent habits, and measurable results." action={<Link className="button button--primary" to="/workouts">Plan a workout</Link>} />

      <section className="dashboard-section" aria-labelledby="overview-title">
        <div className="section-heading"><div><p className="section-heading__eyebrow">OVERVIEW</p><h2 id="overview-title">Your fitness at a glance</h2></div><p>{new Date().toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</p></div>
        <div className="stats-grid">{stats.map((stat) => <StatCard key={stat.label} {...stat} />)}</div>
      </section>

      <section className="dashboard-grid">
        <article className="panel panel--featured">
          <div><p className="section-heading__eyebrow">UP NEXT</p><h2>{nextWorkout?.name || 'Create your first workout'}</h2><p>{nextWorkout?.description || 'Choose exercises and build a routine that fits your goals.'}</p></div>
          {nextWorkout ? <><div className="workout-meta"><span>{nextWorkout.exerciseIds.length} exercises</span><span>{nextWorkout.duration} minutes</span></div><Link className="button button--light" to={`/session/${nextWorkout.id}`}>Start workout →</Link></> : <Link className="button button--light" to="/workouts">Build a plan →</Link>}
        </article>
        <article className="panel">
          <div className="panel__heading"><div><p className="section-heading__eyebrow">LIBRARY</p><h2>Ready to move</h2></div><Link to="/exercises">View all</Link></div>
          <div className="mini-list">{exercises.slice(0, 3).map((exercise) => <div key={exercise.id}><span className="mini-list__icon">{exercise.icon}</span><div><strong>{exercise.name}</strong><small>{exercise.muscle} · {exercise.difficulty}</small></div></div>)}</div>
        </article>
      </section>
    </main>
  )
}

export default Dashboard
