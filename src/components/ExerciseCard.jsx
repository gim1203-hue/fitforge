function ExerciseCard({ exercise, selected = false, onSelect }) {
  return (
    <article className={`exercise-card ${selected ? 'exercise-card--selected' : ''}`}>
      <div className="exercise-card__visual" aria-hidden="true">{exercise.icon}</div>
      <div className="exercise-card__body">
        <div className="tag-row"><span>{exercise.muscle}</span><span>{exercise.difficulty}</span></div>
        <h3>{exercise.name}</h3>
        <p>{exercise.instructions}</p>
        <div className="exercise-card__footer">
          <span>{exercise.equipment}</span>
          <strong>{exercise.sets} × {exercise.reps}</strong>
        </div>
        {onSelect && (
          <button className={`button ${selected ? 'button--secondary' : 'button--primary'} button--full`} type="button" onClick={() => onSelect(exercise.id)}>
            {selected ? 'Remove from workout' : 'Add to workout'}
          </button>
        )}
      </div>
    </article>
  )
}

export default ExerciseCard
