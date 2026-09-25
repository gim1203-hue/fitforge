import { useMemo, useState } from 'react'
import ExerciseCard from '../components/ExerciseCard'
import PageHeader from '../components/PageHeader'
import { useWorkouts } from '../hooks/useWorkouts'

function ExerciseLibrary() {
  const { exercises } = useWorkouts()
  const [search, setSearch] = useState('')
  const [muscle, setMuscle] = useState('All')
  const [difficulty, setDifficulty] = useState('All')

  const muscles = ['All', ...new Set(exercises.map((exercise) => exercise.muscle))]
  const filtered = useMemo(() => exercises.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(search.toLowerCase())
    return matchesSearch && (muscle === 'All' || exercise.muscle === muscle) && (difficulty === 'All' || exercise.difficulty === difficulty)
  }), [difficulty, exercises, muscle, search])

  return (
    <main className="page-content">
      <PageHeader eyebrow="EXERCISE LIBRARY" title="Find your next movement." description="Search practical exercises by muscle group, equipment, and difficulty." />
      <section className="filter-bar" aria-label="Exercise filters">
        <label><span>Search</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search exercises..." /></label>
        <label><span>Muscle group</span><select value={muscle} onChange={(event) => setMuscle(event.target.value)}>{muscles.map((item) => <option key={item}>{item}</option>)}</select></label>
        <label><span>Difficulty</span><select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}><option>All</option><option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label>
      </section>
      <p className="result-count">Showing {filtered.length} of {exercises.length} exercises</p>
      {filtered.length ? <section className="card-grid">{filtered.map((exercise) => <ExerciseCard key={exercise.id} exercise={exercise} />)}</section> : <div className="empty-state"><span>🔍</span><h2>No exercises found</h2><p>Try changing your search or filters.</p></div>}
    </main>
  )
}

export default ExerciseLibrary
