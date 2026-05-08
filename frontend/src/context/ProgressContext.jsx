import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const ProgressContext = createContext();

const TASKS_KEY = "aicp_tasks";
const QUIZ_KEY = "aicp_quiz_scores";

function loadJSON(key, fallback = {}) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function ProgressProvider({ children }) {
  const [tasks, setTasks] = useState(() => loadJSON(TASKS_KEY));
  const [quizScores, setQuizScores] = useState(() => loadJSON(QUIZ_KEY));

  useEffect(() => {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(QUIZ_KEY, JSON.stringify(quizScores));
  }, [quizScores]);

  const isTaskCompleted = useCallback(
    (slug, phase, topic) => {
      return tasks[slug]?.[`phase-${phase}`]?.includes(topic) || false;
    },
    [tasks],
  );

  const toggleTask = useCallback((slug, phase, topic) => {
    setTasks((prev) => {
      const copy = JSON.parse(JSON.stringify(prev));
      if (!copy[slug]) copy[slug] = {};
      const key = `phase-${phase}`;
      if (!copy[slug][key]) copy[slug][key] = [];
      const idx = copy[slug][key].indexOf(topic);
      if (idx >= 0) {
        copy[slug][key].splice(idx, 1);
      } else {
        copy[slug][key].push(topic);
      }
      return copy;
    });
  }, []);

  const getPhaseProgress = useCallback(
    (slug, phase, topics) => {
      const completed = tasks[slug]?.[`phase-${phase}`] || [];
      return completed.filter((t) => topics.includes(t)).length;
    },
    [tasks],
  );

  const getCareerProgress = useCallback(
    (slug, roadmap) => {
      if (!roadmap) return { completed: 0, total: 0, percent: 0 };
      let completed = 0;
      let total = 0;
      for (const phase of roadmap) {
        total += phase.topics.length;
        completed += (tasks[slug]?.[`phase-${phase.phase}`] || []).filter((t) =>
          phase.topics.includes(t),
        ).length;
      }
      return {
        completed,
        total,
        percent: total > 0 ? Math.round((completed / total) * 100) : 0,
      };
    },
    [tasks],
  );

  const getOverallProgress = useCallback(
    (allCareers) => {
      let totalCompleted = 0;
      let totalTasks = 0;
      for (const career of allCareers) {
        const { completed, total } = getCareerProgress(
          career.slug,
          career.roadmap,
        );
        totalCompleted += completed;
        totalTasks += total;
      }
      return {
        completed: totalCompleted,
        total: totalTasks,
        percent:
          totalTasks > 0 ? Math.round((totalCompleted / totalTasks) * 100) : 0,
      };
    },
    [getCareerProgress],
  );

  const saveQuizScore = useCallback((slug, score, total) => {
    setQuizScores((prev) => ({
      ...prev,
      [slug]: { score, total, completedAt: new Date().toISOString() },
    }));
  }, []);

  const getQuizScore = useCallback(
    (slug) => quizScores[slug] || null,
    [quizScores],
  );

  const getAllQuizScores = useCallback(() => quizScores, [quizScores]);

  const resetProgress = useCallback(() => {
    setTasks({});
    setQuizScores({});
    localStorage.removeItem(TASKS_KEY);
    localStorage.removeItem(QUIZ_KEY);
  }, []);

  return (
    <ProgressContext.Provider
      value={{
        isTaskCompleted,
        toggleTask,
        getPhaseProgress,
        getCareerProgress,
        getOverallProgress,
        saveQuizScore,
        getQuizScore,
        getAllQuizScores,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within ProgressProvider");
  return ctx;
}
