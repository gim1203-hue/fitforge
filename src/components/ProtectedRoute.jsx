import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function ProtectedRoute({ children }) {
  const { user, authLoading } = useAuth()

  if (authLoading) {
    return <main className="loading-screen"><div className="loading-spinner" /><p>Loading your FitForge workspace…</p></main>
  }

  return user ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute
