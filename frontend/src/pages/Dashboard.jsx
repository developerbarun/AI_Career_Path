import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaTrophy, FaTasks, FaChartPie, FaRedo, FaStar } from "react-icons/fa";
import { useProgress } from "../context/ProgressContext";
import { fetchCareers, getUserPaths } from "../services/api";
import { fallbackCareers, iconMap } from "../data/fallbackData";

export default function Dashboard() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generatedPaths, setGeneratedPaths] = useState([]);
  const {
    getCareerProgress,
    getOverallProgress,
    getQuizScore,
    getAllQuizScores,
    resetProgress,
  } = useProgress();

  useEffect(() => {
    fetchCareers()
      .then(setCareers)
      .catch(() => setCareers(fallbackCareers))
      .finally(() => setLoading(false));

    // Load generated paths
    const userId = localStorage.getItem("userId");
    if (userId) {
      getUserPaths(userId)
        .then((data) => setGeneratedPaths(data.paths || []))
        .catch(() => setGeneratedPaths([]));
    }
  }, []);

  if (loading) {
    return (
      <div className="loading" style={{ paddingTop: 120 }}>
        <div className="loading-spinner" />
      </div>
    );
  }

  const overall = getOverallProgress(careers);
  const quizScores = getAllQuizScores();
  const quizCount = Object.keys(quizScores).length;

  return (
    <div className="dashboard-page">
      <section className="section">
        <div className="section-header">
          <span className="section-tag">Dashboard</span>
          <h2>Your Learning Progress</h2>
          <p>Track your journey across all AI career paths</p>
        </div>

        <div className="dashboard-stats">
          <motion.div
            className="dashboard-stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <FaChartPie className="stat-icon" />
            <div className="stat-value">{overall.percent}%</div>
            <div className="stat-label">Overall Progress</div>
          </motion.div>
          <motion.div
            className="dashboard-stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <FaTasks className="stat-icon" />
            <div className="stat-value">{overall.completed}</div>
            <div className="stat-label">Tasks Completed</div>
          </motion.div>
          <motion.div
            className="dashboard-stat-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <FaTrophy className="stat-icon" />
            <div className="stat-value">{quizCount}</div>
            <div className="stat-label">Quizzes Taken</div>
          </motion.div>
        </div>

        {/* AI-Generated Paths Section */}
        {generatedPaths.length > 0 && (
          <>
            <div style={{ marginTop: "3rem", marginBottom: "2rem" }}>
              <h2 style={{ marginBottom: "1rem" }}>✨ Your AI-Generated Paths</h2>
              <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
                Custom career paths created just for you based on your quiz answers
              </p>
              <div className="dashboard-careers">
                {generatedPaths.map((path, i) => {
                  const completedTopics = path.completedTopics?.length || 0;
                  const totalTopics = path.pathData?.phases?.reduce(
                    (sum, phase) => sum + (phase.topics?.length || 0),
                    0
                  ) || 0;
                  const percent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

                  return (
                    <motion.div
                      key={path.pathId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                    >
                      <Link to={`/path/${path.pathId}`} className="dashboard-career-card">
                        <div className="dcc-header">
                          <div
                            className="dcc-icon"
                            style={{
                              background: "rgba(108, 99, 255, 0.2)",
                              color: "#6C63FF",
                            }}
                          >
                            ✨
                          </div>
                          <div>
                            <h3>{path.pathData?.careerTitle || "Custom Path"}</h3>
                            <span className="dcc-percent">{percent}%</span>
                          </div>
                        </div>
                        <div className="dcc-progress-bar-bg">
                          <motion.div
                            className="dcc-progress-bar"
                            style={{ background: "#6C63FF" }}
                            initial={{ width: 0 }}
                            animate={{ width: `${percent}%` }}
                            transition={{ duration: 0.8, delay: 0.2 + i * 0.08 }}
                          />
                        </div>
                        <div className="dcc-meta">
                          <span>
                            {completedTopics} / {totalTopics} topics
                          </span>
                          <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                            Generated: {new Date(path.generatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            <hr style={{ margin: "3rem 0", opacity: 0.2 }} />
          </>
        )}

        {/* Predefined Career Paths Section */}
        <h2 style={{ marginTop: "2rem", marginBottom: "1rem" }}>
          Predefined Career Paths
        </h2>
        <div className="dashboard-careers">
          {careers.map((career, i) => {
            const progress = getCareerProgress(career.slug, career.roadmap);
            const quiz = getQuizScore(career.slug);
            const Icon = iconMap[career.icon];
            return (
              <motion.div
                key={career.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                <Link
                  to={`/careers/${career.slug}`}
                  className="dashboard-career-card"
                >
                  <div className="dcc-header">
                    <div
                      className="dcc-icon"
                      style={{
                        background: `${career.color}20`,
                        color: career.color,
                      }}
                    >
                      {Icon && <Icon />}
                    </div>
                    <div>
                      <h3>{career.title}</h3>
                      <span className="dcc-percent">{progress.percent}%</span>
                    </div>
                  </div>
                  <div className="dcc-progress-bar-bg">
                    <motion.div
                      className="dcc-progress-bar"
                      style={{ background: career.color }}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress.percent}%` }}
                      transition={{ duration: 0.8, delay: 0.2 + i * 0.08 }}
                    />
                  </div>
                  <div className="dcc-meta">
                    <span>
                      {progress.completed} / {progress.total} tasks
                    </span>
                    {quiz && (
                      <span className="dcc-quiz-score">
                        Quiz: {quiz.score}/{quiz.total}
                      </span>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <button
            className="btn-secondary"
            onClick={() => {
              if (window.confirm("Reset all progress? This cannot be undone."))
                resetProgress();
            }}
          >
            <FaRedo /> Reset All Progress
          </button>
        </div>
      </section>
    </div>
  );
}
