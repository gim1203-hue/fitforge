import './StatCard.css'

function StatCard({ label, value, detail, icon, tone = 'green' }) {
  return (
    <article className="stat-card">
      <div className={`stat-card__icon stat-card__icon--${tone}`} aria-hidden="true">
        {icon}
      </div>

      <div>
        <p className="stat-card__label">{label}</p>
        <p className="stat-card__value">{value}</p>
        <p className="stat-card__detail">{detail}</p>
      </div>
    </article>
  )
}

export default StatCard
