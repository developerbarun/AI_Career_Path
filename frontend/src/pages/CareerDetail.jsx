import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaDollarSign, FaChartLine, FaStar } from "react-icons/fa";
import { fetchCareerBySlug } from "../services/api";
import { fallbackCareers, iconMap } from "../data/fallbackData";

const TABS = ["Roadmap", "Skills", "Tools & Companies"];

export default function CareerDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [career, setCareer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Roadmap");

  useEffect(() => {
    fetchCareerBySlug(slug)
      .then(setCareer)
      .catch(() => {
        const fallback = fallbackCareers.find((c) => c.slug === slug);
        setCareer(fallback || null);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="loading" style={{ paddingTop: 120 }}>
        <div className="loading-spinner" />
      </div>
    );
  }

  if (!career) {
    return (
      <div
        className="career-detail"
        style={{ textAlign: "center", padding: "8rem 2rem" }}
      >
        <h2>Career path not found</h2>
        <button
          className="btn-primary"
          onClick={() => navigate("/careers")}
          style={{ marginTop: "1rem" }}
        >
          Back to Careers
        </button>
      </div>
    );
  }

  const Icon = iconMap[career.icon];
  const skillWidths = { Beginner: 35, Intermediate: 65, Advanced: 95 };

  return (
    <div className="career-detail">
      <div className="career-detail-hero">
        <button className="back-btn" onClick={() => navigate("/careers")}>
          <FaArrowLeft /> Back to Careers
        </button>

        <motion.div
          className="career-detail-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div
            className="career-detail-icon"
            style={{ background: `${career.color}20`, color: career.color }}
          >
            {Icon && <Icon />}
          </div>
          <div className="career-detail-info">
            <h1>{career.title}</h1>
            <p>{career.description}</p>
            <div className="career-detail-badges">
              <span className="detail-badge">
                <FaDollarSign className="icon" style={{ color: "#43E97B" }} />$
                {(career.salaryRange?.min / 1000).toFixed(0)}k - $
                {(career.salaryRange?.max / 1000).toFixed(0)}k / year
              </span>
              <span className="detail-badge">
                <FaChartLine className="icon" style={{ color: "#F9A826" }} />
                {career.demandLevel} Demand
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="career-tabs">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`career-tab ${activeTab === tab ? "active" : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === "Roadmap" && (
          <motion.div
            className="roadmap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {career.roadmap?.map((phase, i) => (
              <motion.div
                key={i}
                className="roadmap-phase"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="roadmap-phase-header">
                  <h3>
                    <span className="phase-number">{phase.phase}</span>
                    {phase.title}
                  </h3>
                  <span className="phase-duration">{phase.duration}</span>
                </div>
                <div className="roadmap-topics">
                  {phase.topics?.map((topic, j) => (
                    <span key={j}>{topic}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "Skills" && (
          <motion.div
            className="skills-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {career.skills?.map((skill, i) => (
              <motion.div
                key={i}
                className="skill-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="skill-name">{skill.name}</div>
                <div className="skill-bar-bg">
                  <motion.div
                    className="skill-bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${skillWidths[skill.level] || 50}%` }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                  />
                </div>
                <div className="skill-level">{skill.level}</div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === "Tools & Companies" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
              Tools & Technologies
            </h3>
            <div className="tags-row" style={{ marginBottom: "2.5rem" }}>
              {career.tools?.map((tool, i) => (
                <motion.span
                  key={i}
                  className="tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {tool}
                </motion.span>
              ))}
            </div>

            <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
              Top Hiring Companies
            </h3>
            <div className="tags-row" style={{ marginBottom: "2.5rem" }}>
              {career.companies?.map((company, i) => (
                <motion.span
                  key={i}
                  className="tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {company}
                </motion.span>
              ))}
            </div>

            {career.prerequisites?.length > 0 && (
              <>
                <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
                  Prerequisites
                </h3>
                <div className="tags-row">
                  {career.prerequisites.map((pre, i) => (
                    <motion.span
                      key={i}
                      className="tag"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <FaStar
                        style={{
                          marginRight: 6,
                          color: "var(--accent-orange)",
                          fontSize: "0.75rem",
                        }}
                      />
                      {pre}
                    </motion.span>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
