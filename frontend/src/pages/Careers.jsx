import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import CareerCard from "../components/CareerCard";
import { fetchCareers } from "../services/api";
import { fallbackCareers } from "../data/fallbackData";

export default function Careers() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCareers()
      .then(setCareers)
      .catch(() => setCareers(fallbackCareers))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ paddingTop: 100, minHeight: "100vh" }}>
      <section className="section">
        <div className="section-header">
          <span className="section-tag">All Paths</span>
          <h2>AI Career Paths</h2>
          <p>
            Deep dive into each role — skills, roadmaps, salary ranges, and the
            companies hiring
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
                transition={{ delay: i * 0.08 }}
              >
                <CareerCard career={career} />
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
