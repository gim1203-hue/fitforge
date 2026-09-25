import { Outlet, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import ExerciseLibrary from './pages/ExerciseLibrary'
import Workouts from './pages/Workouts'
import ActiveWorkout from './pages/ActiveWorkout'
import Goals from './pages/Goals'
import Progress from './pages/Progress'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import { useWorkouts } from './hooks/useWorkouts'
import './App.css'
import './Auth.css'

function AuthenticatedLayout() {
  const { syncError } = useWorkouts()
  return <ProtectedRoute><Header />{syncError && <div className="sync-error" role="status">{syncError}</div>}<Outlet /><Footer /></ProtectedRoute>
}

function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AuthenticatedLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/exercises" element={<ExerciseLibrary />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/session/:id" element={<ActiveWorkout />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
