import { useLocation } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import StatCard from '../components/StatCard'
import { useWorkouts } from '../hooks/useWorkouts'

function Progress() {
  const { history } = useWorkouts()
  const location = useLocation()
  const totalMinutes = history.reduce((sum, item) => sum + item.duration, 0)
  const stats = [
    { label: 'Total sessions', value: history.length, detail: 'Completed workouts', icon: '✓', tone: 'green' },
    { label: 'Total time', value: `${Math.floor(totalMinutes / 60)}h ${totalMinutes % 60}m`, detail: 'Time under tension', icon: 'T', tone: 'blue' },
    { label: 'Exercises completed', value: history.reduce((sum, item) => sum + item.exercises, 0), detail: 'Movements logged', icon: 'E', tone: 'orange' },
  ]
  return (
    <main className="page-content">
      <PageHeader eyebrow="PROGRESS" title="Consistency compounds." description="Every completed session becomes part of your training history." />
      {location.state?.message && <div className="success-message" role="status">✓ {location.state.message}</div>}
      <section className="stats-grid">{stats.map((stat) => <StatCard key={stat.label} {...stat} />)}</section>
      <section className="history-section"><div className="section-heading"><div><p className="section-heading__eyebrow">HISTORY</p><h2>Recent workouts</h2></div></div>{history.length ? <div className="history-list">{history.map((item) => <article key={item.id}><span className="history-list__icon">✓</span><div><h3>{item.name}</h3><p>{new Date(item.completedAt).toLocaleString()}</p></div><div><strong>{item.duration} min</strong><small>{item.exercises} exercises</small></div></article>)}</div> : <div className="empty-state"><span>📈</span><h2>No workouts logged yet</h2><p>Complete a workout to begin building your history.</p></div>}</section>
    </main>
  )
}

export default Progress
