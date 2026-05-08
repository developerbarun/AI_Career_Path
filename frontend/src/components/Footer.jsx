import { Link } from "react-router-dom";
import { FaBrain } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <FaBrain style={{ marginRight: 8 }} />
          <span className="gradient">AI CareerPath</span>
        </div>
        <p>Your guide to navigating the exciting world of AI careers</p>
        <div className="footer-links">
          <Link to="/">Home</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/resources">Resources</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/quiz">Career Quiz</Link>
        </div>
        <div className="footer-bottom">
          &copy; 2026 AI CareerPath. Built with React, Node.js, Express &amp;
          MongoDB.
        </div>
      </div>
    </footer>
  );
}
