import { Link } from "react-router"
import { useState } from "react"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
  <header className="w-full px-4 pt-4 pb-0 max-w-[1200px] mx-auto bg-[#0a0f1a]">
        <nav className="flex items-center justify-between bg-[#0d1421] rounded-full px-6 py-3 border border-slate-800">
        <Link to="/">
          <p className="text-2xl font-bold text-gradient">RESUMID</p>
        </Link>

        {/* Desktop */}
        <div className="hidden sm:flex items-center gap-6">
          <Link
            to="/dashboard"
            className="text-dark-200 font-mono text-sm hover:text-slate-100 transition-colors"
          >
            Dashboard
          </Link>
          <Link to="/upload" className="primary-button w-fit">
            Upload Resume
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="sm:hidden flex flex-col gap-[5px] p-1 bg-transparent border-none cursor-pointer"
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span className={`block w-5 h-[2px] bg-slate-400 rounded transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
          <span className={`block w-5 h-[2px] bg-slate-400 rounded transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-[2px] bg-slate-400 rounded transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
        </button>
      </nav>

      {/* Dropdown — hermano del <nav>, fuera del rounded-full */}
      <div
        className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
        }`}
      >
        <div className="flex flex-col gap-3 bg-[#0d1421] border border-slate-800 rounded-2xl px-6 py-4">
          <Link
            to="/dashboard"
            className="text-dark-200 font-mono text-sm hover:text-slate-100 transition-colors py-1"
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/upload"
            className="primary-button w-fit"
            onClick={() => setMenuOpen(false)}
          >
            Upload Resume
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
