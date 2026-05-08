import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaStar,
  FaExternalLinkAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { getGeneratedPath, updatePathCustomizations } from "../services/api";

export default function GeneratedPathDetail() {
  const { pathId } = useParams();
  const navigate = useNavigate();
  const [path, setPath] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("Roadmap");
  const [expandedTopics, setExpandedTopics] = useState(new Set());
  const [completedTopics, setCompletedTopics] = useState([]);
  const [saveNotice, setSaveNotice] = useState(null);

  useEffect(() => {
    loadPath();
  }, [pathId]);

  useEffect(() => {
    if (!saveNotice) return;
    const timer = setTimeout(() => setSaveNotice(null), 3000);
    return () => clearTimeout(timer);
  }, [saveNotice]);

  const loadPath = async () => {
    try {
      const data = await getGeneratedPath(pathId);
      setPath(data);
      setCompletedTopics(
        data.completedTopics?.map((ct) => `${ct.phase}-${ct.topic}`) || [],
      );
      setLoading(false);
    } catch (error) {
      console.error("Error loading path:", error);
      setLoading(false);
    }
  };

  const toggleTopicExpand = (topicKey) => {
    const newExpanded = new Set(expandedTopics);
    if (newExpanded.has(topicKey)) {
      newExpanded.delete(topicKey);
    } else {
      newExpanded.add(topicKey);
    }
    setExpandedTopics(newExpanded);
  };

  const toggleTopicComplete = (phase, topic) => {
    const key = `${phase}-${topic}`;
    setCompletedTopics((prev) =>
      prev.includes(key) ? prev.filter((t) => t !== key) : [...prev, key],
    );
  };

  const saveProgress = async () => {
    try {
      const completed = completedTopics.map((ct) => {
        const [phase, ...topicParts] = ct.split("-");
        return { phase: parseInt(phase), topic: topicParts.join("-") };
      });

      await updatePathCustomizations(pathId, path.customizations, completed);
      setSaveNotice({
        type: "success",
        message: "Progress saved successfully.",
      });
    } catch (error) {
      console.error("Error saving progress:", error);
      setSaveNotice({
        type: "error",
        message: "Failed to save progress. Please try again.",
      });
    }
  };

  if (loading) {
    return (
      <div className="loading" style={{ paddingTop: 120 }}>
        <div className="loading-spinner" />
      </div>
    );
  }

  if (!path) {
    return (
      <div
        className="career-detail"
        style={{ textAlign: "center", padding: "8rem 2rem" }}
      >
        <h2>Path not found</h2>
        <button
          className="btn-primary"
          onClick={() => navigate("/dashboard")}
          style={{ marginTop: "1rem" }}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const pathData = path.pathData;

  return (
    <div className="career-detail">
      <div className="career-detail-hero">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          <FaArrowLeft /> Back to Dashboard
        </button>
        <motion.div
          className="career-detail-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div
            className="career-detail-icon"
            style={{ background: "rgba(108, 99, 255, 0.2)", color: "#6C63FF" }}
          >
            ✨
          </div>
          <div className="career-detail-info">
            <h1>{pathData.careerTitle}</h1>
            <p>{pathData.description}</p>
            <div className="career-detail-badges">
              <span className="detail-badge">
                Generated: {new Date(path.generatedAt).toLocaleDateString()}
              </span>
              <span className="detail-badge">
                Demand: {pathData.demandLevel}
              </span>
              {pathData.salaryRange && (
                <span className="detail-badge">
                  💰 ${(pathData.salaryRange.min / 1000).toFixed(0)}k - $
                  {(pathData.salaryRange.max / 1000).toFixed(0)}k / year
                </span>
              )}
            </div>
            <button
              className="btn-secondary"
              onClick={saveProgress}
              style={{ marginTop: "1rem" }}
            >
              Save Progress
            </button>
            {saveNotice && (
              <div className={`inline-notice ${saveNotice.type}`}>
                {saveNotice.message}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <div className="career-tabs">
        {["Roadmap", "Skills", "Tools & Companies"].map((tab) => (
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
        {/* Roadmap Tab with Topics & Resources */}
        {activeTab === "Roadmap" && (
          <motion.div
            className="roadmap"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {pathData.phases?.map((phase, i) => {
              const phaseCompletedCount = completedTopics.filter((t) =>
                t.startsWith(`${phase.phase}-`),
              ).length;
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
                        {phaseCompletedCount} / {phase.topics?.length || 0}
                      </span>
                      <span className="phase-duration">{phase.duration}</span>
                    </div>
                  </div>
                  <div className="roadmap-topics">
                    {phase.topics?.map((topicObj, j) => {
                      const topicName =
                        typeof topicObj === "string" ? topicObj : topicObj.name;
                      const resources =
                        typeof topicObj === "string"
                          ? []
                          : topicObj.resources || [];
                      const topicKey = `${phase.phase}-${j}`;
                      const isExpanded = expandedTopics.has(topicKey);
                      const isCompleted = completedTopics.includes(
                        `${phase.phase}-${topicName}`,
                      );

                      return (
                        <div key={j}>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              padding: "0.75rem",
                              background: isExpanded
                                ? "rgba(108, 99, 255, 0.05)"
                                : "transparent",
                              borderRadius: "8px",
                              marginBottom: "0.5rem",
                              cursor: "pointer",
                              border: "1px solid transparent",
                              borderColor: isExpanded
                                ? "rgba(108, 99, 255, 0.2)"
                                : "transparent",
                            }}
                          >
                            <input
                              type="checkbox"
                              checked={isCompleted}
                              onChange={() =>
                                toggleTopicComplete(phase.phase, topicName)
                              }
                              style={{
                                marginRight: "0.75rem",
                                width: "18px",
                                height: "18px",
                                cursor: "pointer",
                              }}
                            />
                            <span
                              style={{
                                flex: 1,
                                textDecoration: isCompleted
                                  ? "line-through"
                                  : "none",
                                color: isCompleted
                                  ? "var(--text-muted)"
                                  : "inherit",
                                fontWeight: "500",
                              }}
                            >
                              {topicName}
                            </span>
                            {resources.length > 0 && (
                              <button
                                onClick={() => toggleTopicExpand(topicKey)}
                                style={{
                                  background: "none",
                                  border: "none",
                                  cursor: "pointer",
                                  color: "#6C63FF",
                                  fontSize: "1.1rem",
                                  marginLeft: "0.5rem",
                                }}
                              >
                                {isExpanded ? (
                                  <FaChevronUp />
                                ) : (
                                  <FaChevronDown />
                                )}
                              </button>
                            )}
                          </div>

                          {/* Resources List */}
                          {isExpanded && resources.length > 0 && (
                            <div
                              style={{
                                marginLeft: "2rem",
                                marginBottom: "1rem",
                                padding: "1rem",
                                background: "rgba(108, 99, 255, 0.03)",
                                borderLeft: "3px solid #6C63FF",
                                borderRadius: "6px",
                              }}
                            >
                              {resources.map((resource, rIdx) => (
                                <div
                                  key={rIdx}
                                  onClick={() =>
                                    resource.url &&
                                    window.open(
                                      resource.url,
                                      "_blank",
                                      "noopener",
                                    )
                                  }
                                  style={{
                                    padding: "0.75rem",
                                    marginBottom: "0.5rem",
                                    background: "white",
                                    borderRadius: "6px",
                                    border: "1px solid #e0e0e0",
                                    cursor: resource.url
                                      ? "pointer"
                                      : "default",
                                    transition: "all 0.2s",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                  }}
                                  onMouseEnter={(e) => {
                                    if (resource.url) {
                                      e.currentTarget.style.boxShadow =
                                        "0 2px 8px rgba(108, 99, 255, 0.15)";
                                      e.currentTarget.style.transform =
                                        "translateX(4px)";
                                    }
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.boxShadow = "none";
                                    e.currentTarget.style.transform =
                                      "translateX(0)";
                                  }}
                                >
                                  <div style={{ flex: 1 }}>
                                    <div
                                      style={{
                                        display: "flex",
                                        gap: "0.5rem",
                                        marginBottom: "0.25rem",
                                        flexWrap: "wrap",
                                      }}
                                    >
                                      <span
                                        style={{
                                          fontSize: "0.75rem",
                                          padding: "0.25rem 0.5rem",
                                          borderRadius: "3px",
                                          background: "#f0f0f0",
                                          color: "#666",
                                          fontWeight: "600",
                                        }}
                                      >
                                        {resource.type}
                                      </span>
                                      <span
                                        style={{
                                          fontSize: "0.75rem",
                                          padding: "0.25rem 0.5rem",
                                          borderRadius: "3px",
                                          background: resource.free
                                            ? "#E8F5E9"
                                            : "#FFF3E0",
                                          color: resource.free
                                            ? "#2E7D32"
                                            : "#E65100",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        {resource.free ? "✓ FREE" : "$ PAID"}
                                      </span>
                                      <span
                                        style={{
                                          fontSize: "0.75rem",
                                          padding: "0.25rem 0.5rem",
                                          borderRadius: "3px",
                                          background: "#f0f0f0",
                                          color: "#666",
                                        }}
                                      >
                                        {resource.platform}
                                      </span>
                                    </div>
                                    <p
                                      style={{
                                        fontSize: "0.9rem",
                                        fontWeight: "600",
                                        margin: "0 0 0.25rem 0",
                                      }}
                                    >
                                      {resource.title}
                                    </p>
                                    <p
                                      style={{
                                        fontSize: "0.85rem",
                                        color: "var(--text-secondary)",
                                        margin: "0.25rem 0",
                                      }}
                                    >
                                      {resource.description}
                                    </p>
                                    {resource.rating > 0 && (
                                      <div
                                        style={{
                                          fontSize: "0.8rem",
                                          color: "var(--text-muted)",
                                          marginTop: "0.25rem",
                                        }}
                                      >
                                        <FaStar
                                          style={{ marginRight: "0.25rem" }}
                                        />
                                        {resource.rating.toFixed(1)}
                                      </div>
                                    )}
                                  </div>
                                  {resource.url && (
                                    <div
                                      style={{
                                        marginLeft: "1rem",
                                        color: "#6C63FF",
                                        fontSize: "1.2rem",
                                      }}
                                    >
                                      <FaExternalLinkAlt />
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Skills Tab */}
        {activeTab === "Skills" && (
          <motion.div
            className="skills-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {pathData.skills?.map((skill, i) => {
              const skillWidths = {
                Beginner: 35,
                Intermediate: 65,
                Advanced: 95,
              };
              return (
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
              );
            })}
          </motion.div>
        )}

        {/* Tools & Companies Tab */}
        {activeTab === "Tools & Companies" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
              Tools & Technologies
            </h3>
            <div className="tags-row" style={{ marginBottom: "2.5rem" }}>
              {pathData.tools?.map((tool, i) => (
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
              {pathData.companies?.map((company, i) => (
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
            {pathData.prerequisites?.length > 0 && (
              <>
                <h3 style={{ marginBottom: "1rem", fontSize: "1.2rem" }}>
                  Prerequisites
                </h3>
                <div className="tags-row">
                  {pathData.prerequisites.map((pre, i) => (
                    <motion.span
                      key={i}
                      className="tag"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
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
