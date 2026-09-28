import { Link } from 'react-router-dom'

function NotFound() {
  return <main className="page-content"><div className="empty-state"><span>404</span><h1>That page missed its rep.</h1><p>The page you requested does not exist.</p><Link className="button button--primary" to="/">Return to dashboard</Link></div></main>
}

export default NotFound
