import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaArrowRight, FaCompass } from "react-icons/fa";
import CareerCard from "../components/CareerCard";
import { fetchCareers } from "../services/api";
import { fallbackCareers } from "../data/fallbackData";

export default function Home() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCareers()
      .then(setCareers)
      .catch(() => setCareers(fallbackCareers))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-grid" />
        <div className="hero-glow purple" />
        <div className="hero-glow pink" />

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="hero-badge">
            <span className="pulse" />
            The Future of AI Careers — 2026 Edition
          </div>

          <h1>
            Navigate Your
            <br />
            <span className="gradient-text">AI Career Path</span>
          </h1>

          <p>
            Discover the most in-demand AI roles, learn exactly what skills you
            need, follow step-by-step roadmaps, and find your perfect career
            match with our interactive quiz.
          </p>

          <div className="hero-buttons">
            <Link to="/careers">
              <button className="btn-primary">
                Explore Careers <FaArrowRight />
              </button>
            </Link>
            <Link to="/quiz">
              <button className="btn-secondary">
                <FaCompass /> Find Your Match
              </button>
            </Link>
          </div>

          <div className="hero-stats">
            <motion.div
              className="hero-stat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="number">6+</div>
              <div className="label">Career Paths</div>
            </motion.div>
            <motion.div
              className="hero-stat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="number">$250k+</div>
              <div className="label">Top Salaries</div>
            </motion.div>
            <motion.div
              className="hero-stat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="number">50+</div>
              <div className="label">Skills Mapped</div>
            </motion.div>
            <motion.div
              className="hero-stat"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="number">7</div>
              <div className="label">Quiz Questions</div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Career Paths Preview */}
      <section className="section">
        <div className="section-header">
          <span className="section-tag">Career Paths</span>
          <h2>Choose Your AI Destiny</h2>
          <p>
            Explore the most exciting and lucrative career paths in artificial
            intelligence
          </p>
        </div>

        {loading ? (
          <div className="loading">
            <div className="loading-spinner" />
          </div>
        ) : (
          <div className="careers-grid">
            {careers.map((career, i) => (
              <motion.div
                key={career._id || i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <CareerCard career={career} />
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="section" style={{ textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">Get Started</span>
          <h2 style={{ marginBottom: "1rem" }}>
            Not sure which path is right?
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              marginBottom: "2rem",
              maxWidth: 500,
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: "1.1rem",
            }}
          >
            Take our 7-question career quiz and discover which AI role matches
            your skills, interests, and goals.
          </p>
          <Link to="/quiz">
            <button className="btn-primary" style={{ fontSize: "1.1rem" }}>
              Take the Career Quiz <FaArrowRight />
            </button>
          </Link>
        </motion.div>
      </section>
    </>
  );
}
