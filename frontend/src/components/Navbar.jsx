import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBrain } from "react-icons/fa";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <Link to="/" className="nav-logo">
        <div className="logo-icon">
          <FaBrain />
        </div>
        <span className="logo-gradient">AI CareerPath</span>
      </Link>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li>
          <Link to="/" className={isActive("/") ? "active" : ""}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/careers" className={isActive("/careers") ? "active" : ""}>
            Careers
          </Link>
        </li>
        <li>
          <Link
            to="/resources"
            className={isActive("/resources") ? "active" : ""}
          >
            Resources
          </Link>
        </li>
        <li>
          <Link to="/quiz">
            <button className="nav-cta">Take Quiz</button>
          </Link>
        </li>
      </ul>

      <button
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
