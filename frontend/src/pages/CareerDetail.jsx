import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaDollarSign,
  FaChartLine,
  FaStar,
  FaExternalLinkAlt,
  FaTrophy,
} from "react-icons/fa";
import { fetchCareerBySlug, fetchResources } from "../services/api";
import {
  fallbackCareers,
  fallbackResources,
  iconMap,
} from "../data/fallbackData";
import { useProgress } from "../context/ProgressContext";

const TABS = ["Roadmap", "Skills", "Resources", "Tools & Companies"];

export default function CareerDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [career, setCareer] = useState(null);
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Roadmap");
  const {
    isTaskCompleted,
    toggleTask,
    getPhaseProgress,
    getCareerProgress,
    getQuizScore,
  } = useProgress();

  useEffect(() => {
    fetchCareerBySlug(slug)
      .then(setCareer)
      .catch(() => {
        const fb = fallbackCareers.find((c) => c.slug === slug);
        setCareer(fb || null);
      })
      .finally(() => setLoading(false));

    fetchResources({ careerPath: slug })
      .then(setResources)
      .catch(() =>
        setResources(fallbackResources.filter((r) => r.careerPath === slug)),
      );
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
  const progress = getCareerProgress(career.slug, career.roadmap);
  const quizScore = getQuizScore(career.slug);

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
              {progress.total > 0 && (
                <span
                  className="detail-badge"
                  style={{ color: "var(--accent-green)" }}
                >
                  {progress.percent}% Complete
                </span>
              )}
              {quizScore && (
                <span
                  className="detail-badge"
                  style={{ color: "var(--accent-orange)" }}
                >
                  <FaTrophy /> Quiz: {quizScore.score}/{quizScore.total}
                </span>
              )}
            </div>
            <button
              className="btn-primary"
              style={{ marginTop: "1rem" }}
              onClick={() => navigate(`/careers/${slug}/quiz`)}
            >
              Take Knowledge Quiz <FaArrowRight />
            </button>
          </div>
        </motion.div>
      </div>

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

      <div className="tab-content">
        {activeTab === "Roadmap" && (
          <motion.div
            className="roadmap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {career.roadmap?.map((phase, i) => {
              const done = getPhaseProgress(
                career.slug,
                phase.phase,
                phase.topics,
              );
              return (
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
                    <div className="phase-header-right">
                      <span className="phase-progress">
                        {done} / {phase.topics.length}
                      </span>
                      <span className="phase-duration">{phase.duration}</span>
                    </div>
                  </div>
                  <div className="roadmap-topics">
                    {phase.topics?.map((topic, j) => {
                      const completed = isTaskCompleted(
                        career.slug,
                        phase.phase,
                        topic,
                      );
                      return (
                        <label
                          key={j}
                          className={`task-item ${completed ? "task-done" : ""}`}
                        >
                          <input
                            type="checkbox"
                            checked={completed}
                            onChange={() =>
                              toggleTask(career.slug, phase.phase, topic)
                            }
                          />
                          <span className="task-checkmark" />
                          <span className="task-label">{topic}</span>
                        </label>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
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

        {activeTab === "Resources" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {resources.length > 0 ? (
              <div className="resources-grid">
                {resources.map((resource, i) => (
                  <motion.div
                    key={resource._id || i}
                    className={`resource-card ${resource.url ? "resource-card-clickable" : ""}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() =>
                      resource.url &&
                      window.open(resource.url, "_blank", "noopener")
                    }
                  >
                    <div className="resource-card-header">
                      <span className={`resource-type ${resource.type}`}>
                        {resource.type}
                      </span>
                      {resource.free && (
                        <span className="resource-free">FREE</span>
                      )}
                    </div>
                    <h3>{resource.title}</h3>
                    <p>{resource.description}</p>
                    <div className="resource-rating">
                      <FaStar /> {resource.rating?.toFixed(1)}
                      <span
                        style={{
                          color: "var(--text-muted)",
                          marginLeft: 8,
                          fontSize: "0.8rem",
                        }}
                      >
                        {resource.difficulty}
                      </span>
                    </div>
                    {resource.url && (
                      <div className="resource-link">
                        Visit Resource <FaExternalLinkAlt />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <p style={{ color: "var(--text-muted)", textAlign: "center" }}>
                No resources available for this career path yet.
              </p>
            )}
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
