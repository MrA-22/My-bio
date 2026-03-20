import { NavLink } from "react-router-dom"
import { useState } from "react"

const linkClass = ({ isActive }) =>
  isActive
    ? "text-blue-400 font-semibold"
    : "text-gray-300 hover:text-blue-400 transition"

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-gray-900/70 border-b border-gray-800">

      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">

        {/* LOGO */}
        <h1 className="text-xl font-bold text-blue-400">
          Arif.dev
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex gap-8">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/projects" className={linkClass}>
            Projects
          </NavLink>

          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>
        </div>

        {/* HAMBURGER */}
        <button
          className="md:hidden flex flex-col gap-1"
          onClick={() => setOpen(!open)}
        >
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
          <span className="w-6 h-0.5 bg-white"></span>
        </button>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 bg-gray-900 border-t border-gray-800">
          
          <NavLink to="/" onClick={() => setOpen(false)} className={linkClass}>
            Home
          </NavLink>

          <NavLink to="/projects" onClick={() => setOpen(false)} className={linkClass}>
            Projects
          </NavLink>

          <NavLink to="/contact" onClick={() => setOpen(false)} className={linkClass}>
            Contact
          </NavLink>

        </div>
      )}

    </nav>
  )
}