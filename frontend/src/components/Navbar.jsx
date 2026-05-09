import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBrain, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

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

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
  };

  const handleDashboardClick = (event) => {
    if (isAuthenticated) {
      return;
    }

    event.preventDefault();
    setMenuOpen(false);
    navigate("/login", {
      state: {
        from: "/dashboard",
        message: "Please log in to view the dashboard.",
      },
    });
  };

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
          <Link
            to="/dashboard"
            onClick={handleDashboardClick}
            className={isActive("/dashboard") ? "active" : ""}
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/quiz">
            <button className="nav-cta">Take Quiz</button>
          </Link>
        </li>
        {isAuthenticated ? (
          <>
            <li
              style={{
                borderTop: "1px solid rgba(255, 255, 255, 0.1)",
                paddingTop: "0.5rem",
              }}
            >
              <span
                style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}
              >
                Welcome, {user?.name || user?.email}
              </span>
            </li>
            <li>
              <button
                onClick={handleLogout}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-primary)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  fontSize: "0.9rem",
                  padding: "0.5rem 0",
                }}
              >
                <FaSignOutAlt />
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/login">
              <button className="nav-cta">Sign In</button>
            </Link>
          </li>
        )}
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
