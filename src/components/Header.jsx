import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Header.css'

const links = [
  { to: '/', label: 'Dashboard' },
  { to: '/exercises', label: 'Exercises' },
  { to: '/workouts', label: 'Workouts' },
  { to: '/goals', label: 'Goals' },
  { to: '/progress', label: 'Progress' },
]

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className="site-header">
      <div className="site-header__content">
        <NavLink className="brand" to="/" aria-label="FitForge home"><span className="brand__mark" aria-hidden="true">F</span><span>FitForge</span></NavLink>
        <nav className={`main-navigation ${menuOpen ? 'main-navigation--open' : ''}`} aria-label="Main navigation">
          {links.map((link) => <NavLink key={link.to} className={({ isActive }) => `main-navigation__link ${isActive ? 'main-navigation__link--active' : ''}`} to={link.to} onClick={() => setMenuOpen(false)}>{link.label}</NavLink>)}
        </nav>
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-label="Toggle navigation" onClick={() => setMenuOpen((value) => !value)}><span /><span /><span /></button>
        <div className="profile-button" aria-label="User profile">JD</div>
      </div>
    </header>
  )
}

export default Header
