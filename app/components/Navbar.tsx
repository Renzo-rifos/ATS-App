import { Link } from "react-router"

const Navbar = () => {
  return (
    <nav className="navbar">
        <Link to="/">
        <p className="text-2xl font-bold text-gradient">RESUMID</p>
        </Link>
        <Link to="/upload" className="primary-button w-fit"> Upload Resume</Link>
        <Link to="/dashboard" className="text-dark-200 font-mono text-sm hover:text-slate-100 transition-colors">
    Dashboard
</Link>
    </nav>
  )
}

export default Navbar