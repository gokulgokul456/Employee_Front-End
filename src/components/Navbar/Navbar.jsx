import React, { useState } from 'react'
import './Navbar.css'
import { useAuth } from '../../context/authContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const [hovered, setHovered] = useState(false)

  return (
    <div className='Nav'>
      <h3>Welcome<span role="img" aria-label="wave"></span>, {user.name}</h3>

      <button
        onClick={logout}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className='logout-button'
      >
        {hovered ? `Bye ${user.name} ` : 'Logout'}
      </button>
    </div>
  )
}

export default Navbar
