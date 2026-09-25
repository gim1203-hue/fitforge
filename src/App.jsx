import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import ExerciseLibrary from './pages/ExerciseLibrary'
import Workouts from './pages/Workouts'
import ActiveWorkout from './pages/ActiveWorkout'
import Goals from './pages/Goals'
import Progress from './pages/Progress'
import NotFound from './pages/NotFound'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/exercises" element={<ExerciseLibrary />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/session/:id" element={<ActiveWorkout />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
