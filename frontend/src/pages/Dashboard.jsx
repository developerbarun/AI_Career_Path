import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaTrophy, FaTasks, FaChartPie, FaRedo } from "react-icons/fa";
import { useProgress } from "../context/ProgressContext";
import { useAuth } from "../context/AuthContext";
import { fetchCareers, getUserPaths } from "../services/api";
import { fallbackCareers, iconMap } from "../data/fallbackData";
import ProgressGraph from "../components/ProgressGraph";

export default function Dashboard() {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generatedPaths, setGeneratedPaths] = useState([]);
  const [confirmReset, setConfirmReset] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { user } = useAuth();
  const { getCareerProgress, getQuizScore, getAllQuizScores, resetProgress } =
    useProgress();

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const careersData = await fetchCareers();
      setCareers(careersData);

      try {
        const pathsData = await getUserPaths();
        setGeneratedPaths(pathsData.paths || []);
      } catch (err) {
        console.log("Failed to load paths:", err);
        setGeneratedPaths([]);
      }
    } catch (err) {
      console.log("Using fallback careers");
      setCareers(fallbackCareers);
      setGeneratedPaths([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user, loadData]);

  const selectedCareers = useMemo(
    () =>
      careers.filter((career) => {
        const progress = getCareerProgress(career.slug, career.roadmap);
        const quiz = getQuizScore(career.slug);
        return progress.total > 0 || !!quiz;
      }),
    [careers, getCareerProgress, getQuizScore, refreshKey],
  );

  const quizScores = getAllQuizScores();
  const quizCount = Object.keys(quizScores).length;
  const normalizedGeneratedPaths = useMemo(() => {
    const getPathIdValue = (path) => {
      if (!path || !path.pathId) return "";
      if (typeof path.pathId === "string") return path.pathId;
      if (
        typeof path.pathId === "object" &&
        typeof path.pathId.$oid === "string"
      ) {
        return path.pathId.$oid;
      }
      if (typeof path.pathId.toString === "function") {
        const value = path.pathId.toString();
        return value === "[object Object]" ? "" : value;
      }
      return "";
    };

    const sorted = [...generatedPaths].sort(
      (a, b) => new Date(b.generatedAt) - new Date(a.generatedAt),
    );

    const deduped = [];
    const seen = new Set();

    for (const path of sorted) {
      const dedupeKey = [
        path.careerSlug || "",
        (path.careerTitle || path.pathData?.careerTitle || "")
          .trim()
          .toLowerCase(),
      ]
        .filter(Boolean)
        .join("|");
      const fallback = path.pathId?.toString() || "";
      const resolvedKey = dedupeKey || fallback;

      if (!seen.has(resolvedKey)) {
        seen.add(resolvedKey);
        deduped.push({
          ...path,
          pathIdValue: getPathIdValue(path),
        });
      }
    }

    return deduped.filter((path) => Boolean(path.pathIdValue));
  }, [generatedPaths]);

  const generatedProgressBySlug = useMemo(() => {
    return normalizedGeneratedPaths.reduce((acc, path) => {
      const slug = path.careerSlug || "";
      if (!slug) return acc;

      const completedTopics = path.completedTopics?.length || 0;
      const totalTopics =
        path.pathData?.phases?.reduce(
          (sum, phase) => sum + (phase.topics?.length || 0),
          0,
        ) || 0;

      if (!acc[slug]) {
        acc[slug] = { completed: 0, total: 0 };
      }

      acc[slug].completed += completedTopics;
      acc[slug].total += totalTopics;
      return acc;
    }, {});
  }, [normalizedGeneratedPaths]);

  const selectedSlugSet = useMemo(
    () => new Set(selectedCareers.map((career) => career.slug)),
    [selectedCareers],
  );

  const careerProgressRows = useMemo(
    () =>
      selectedCareers.map((career) => {
        const localProgress = getCareerProgress(career.slug, career.roadmap);
        const generatedProgress = generatedProgressBySlug[career.slug] || {
          completed: 0,
          total: 0,
        };
        const completed = localProgress.completed + generatedProgress.completed;
        const total = localProgress.total + generatedProgress.total;

        return {
          ...career,
          progress: {
            completed,
            total,
            percent: total > 0 ? Math.round((completed / total) * 100) : 0,
          },
        };
      }),
    [selectedCareers, getCareerProgress, generatedProgressBySlug],
  );

  const overall = useMemo(() => {
    const selectedOverall = careerProgressRows.reduce(
      (acc, career) => {
        acc.completed += career.progress.completed;
        acc.total += career.progress.total;
        return acc;
      },
      { completed: 0, total: 0 },
    );

    const generatedOnlyProgress = normalizedGeneratedPaths.reduce(
      (acc, path) => {
        if (selectedSlugSet.has(path.careerSlug || "")) {
          return acc;
        }

        acc.completed += path.completedTopics?.length || 0;
        acc.total +=
          path.pathData?.phases?.reduce(
            (sum, phase) => sum + (phase.topics?.length || 0),
            0,
          ) || 0;
        return acc;
      },
      { completed: 0, total: 0 },
    );

    const totalCompleted =
      selectedOverall.completed + generatedOnlyProgress.completed;
    const totalTasks = selectedOverall.total + generatedOnlyProgress.total;

    return {
      completed: totalCompleted,
      total: totalTasks,
      percent:
        totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0,
    };
  }, [careerProgressRows, normalizedGeneratedPaths, selectedSlugSet]);
  const suggestedCareer = useMemo(
    () =>
      [...careerProgressRows].sort(
        (a, b) => a.progress.percent - b.progress.percent,
      )[0],
    [careerProgressRows],
  );
  const progressInsight =
    overall.percent >= 70
      ? "Excellent momentum — you are consistently progressing."
      : overall.percent >= 40
        ? "Good pace — keep building weekly consistency."
        : "You are just getting started — focus on one path and complete a phase.";

  if (loading) {
    return (
      <div className="loading" style={{ paddingTop: 120 }}>
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <section className="section">
        <div className="section-header">
          <span className="section-tag">Dashboard</span>
          <h2>Your Learning Progress</h2>
          <p>Track your journey across the career paths you selected</p>
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

        {/* Progress Graph */}
        {careerProgressRows.length > 0 ? (
          <ProgressGraph
            careerProgressRows={careerProgressRows}
            overall={overall}
          />
        ) : (
          <div
            style={{
              marginTop: "2.5rem",
              marginBottom: "2.5rem",
              padding: "1.5rem",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              background: "rgba(255, 255, 255, 0.03)",
              color: "var(--text-secondary)",
            }}
          >
            Take a quiz or open a career path to start tracking progress here.
          </div>
        )}

        <div className="dashboard-insights">
          <div className="dashboard-insight-card">
            <h3>Progress insight</h3>
            <p>{progressInsight}</p>
          </div>
          <div className="dashboard-insight-card">
            <h3>Quiz coverage</h3>
            <p>
              You have completed {quizCount} quiz{quizCount === 1 ? "" : "zes"}.
              Try another quiz to refine your recommendations.
            </p>
          </div>
          <div className="dashboard-insight-card">
            <h3>Recommended next focus</h3>
            <p>
              {suggestedCareer
                ? `${suggestedCareer.title} is your lowest-progress track (${suggestedCareer.progress.percent}%).`
                : "Start with one selected track and complete the first phase topics."}
            </p>
          </div>
        </div>

        {/* AI-Generated Paths Section */}
        {normalizedGeneratedPaths.length > 0 && (
          <>
            <div style={{ marginTop: "3rem", marginBottom: "2rem" }}>
              <h2 style={{ marginBottom: "1rem" }}>
                ✨ Your AI-Generated Paths
              </h2>
              <p
                style={{
                  color: "var(--text-secondary)",
                  marginBottom: "1.5rem",
                }}
              >
                Custom career paths created just for you based on your quiz
                answers
              </p>
              <div className="dashboard-careers">
                {normalizedGeneratedPaths.map((path, i) => {
                  const completedTopics = path.completedTopics?.length || 0;
                  const totalTopics =
                    path.pathData?.phases?.reduce(
                      (sum, phase) => sum + (phase.topics?.length || 0),
                      0,
                    ) || 0;
                  const progressPercent =
                    totalTopics > 0
                      ? Math.round((completedTopics / totalTopics) * 100)
                      : 0;
                  const hasMatchPercent = typeof path.matchPercent === "number";
                  const displayPercent = hasMatchPercent
                    ? path.matchPercent
                    : progressPercent;

                  return (
                    <motion.div
                      key={path.pathIdValue || `${path.careerSlug}-${i}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                    >
                      <Link
                        to={`/path/${path.pathIdValue}`}
                        className="dashboard-career-card"
                      >
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
                            <h3>
                              {path.pathData?.careerTitle || "Custom Path"}
                            </h3>
                            <span className="dcc-percent">
                              {displayPercent}%{" "}
                              {hasMatchPercent ? "Match" : "Progress"}
                            </span>
                          </div>
                        </div>
                        <div className="dcc-progress-bar-bg">
                          <motion.div
                            className="dcc-progress-bar"
                            style={{ background: "#6C63FF" }}
                            initial={{ width: 0 }}
                            animate={{ width: `${displayPercent}%` }}
                            transition={{
                              duration: 0.8,
                              delay: 0.2 + i * 0.08,
                            }}
                          />
                        </div>
                        <div className="dcc-meta">
                          <span>
                            {completedTopics} / {totalTopics} topics completed
                          </span>
                          <span
                            style={{
                              fontSize: "0.85rem",
                              color: "var(--text-muted)",
                            }}
                          >
                            Generated:{" "}
                            {new Date(path.generatedAt).toLocaleDateString()}
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
          Your Career Paths
        </h2>
        {selectedCareers.length > 0 ? (
          <div className="dashboard-careers">
            {selectedCareers.map((career, i) => {
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
        ) : (
          <div
            style={{
              padding: "1.5rem",
              borderRadius: "12px",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              background: "rgba(255, 255, 255, 0.03)",
              color: "var(--text-secondary)",
            }}
          >
            No active career has been selected yet. Take a quiz or start a
            career to make it appear here.
          </div>
        )}

        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          {!confirmReset ? (
            <button
              className="btn-secondary"
              onClick={() => setConfirmReset(true)}
            >
              <FaRedo /> Reset All Progress
            </button>
          ) : (
            <div className="reset-confirm">
              <span>This will clear all saved progress. Continue?</span>
              <button
                className="btn-secondary danger"
                onClick={() => {
                  resetProgress();
                  setConfirmReset(false);
                }}
              >
                Yes, Reset
              </button>
              <button
                className="btn-secondary"
                onClick={() => setConfirmReset(false)}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
