import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className="w-full h-[45px] flex flex-row justify-center items-center gap-x-5 bg-gray-800 px-4">
      
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-blue-500 font-semibold text-xl"
            : "text-white font-medium text-xl"
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/pastes"
        className={({ isActive }) =>
          isActive
            ? "text-blue-500 font-semibold text-xl"
            : "text-white font-medium text-xl"
        }
      >
        Pastes
      </NavLink>

    </div>
  )
}

export default Navbar