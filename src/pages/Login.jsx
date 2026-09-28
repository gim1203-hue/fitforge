import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

function Login() {
  const { user, authLoading, authError, signInWithGoogle } = useAuth()

  if (authLoading) return <main className="loading-screen"><div className="loading-spinner" /><p>Checking your session…</p></main>
  if (user) return <Navigate to="/" replace />

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="brand brand--centered"><span className="brand__mark">F</span><span>FitForge</span></div>
        <p className="eyebrow">YOUR TRAINING, YOUR DATA</p>
        <h1>Build a stronger routine.</h1>
        <p>Sign in to create workouts, set goals, and keep your progress safely synchronized across devices.</p>
        <button className="google-button" type="button" onClick={signInWithGoogle}><span aria-hidden="true">G</span>Continue with Google</button>
        {authError && <p className="form-error" role="alert">{authError}</p>}
        <small>By continuing, you agree to use FitForge responsibly.</small>
      </section>
      <aside className="login-visual"><div><span>01</span><h2>Plan intentionally</h2><p>Create routines around the exercises and schedule that work for you.</p></div><div><span>02</span><h2>Train consistently</h2><p>Follow guided sessions and stay focused with an integrated rest timer.</p></div><div><span>03</span><h2>Progress anywhere</h2><p>Your private fitness data follows your Google account across devices.</p></div></aside>
    </main>
  )
}

export default Login
