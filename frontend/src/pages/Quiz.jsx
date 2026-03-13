import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaRedo } from "react-icons/fa";
import { fetchQuiz } from "../services/api";
import {
  fallbackQuiz,
  careerNames,
  fallbackCareers,
} from "../data/fallbackData";

export default function Quiz() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuiz()
      .then((data) => {
        const parsed = data.map((q) => ({
          ...q,
          options: q.options.map((opt) => ({
            text: opt.text,
            careerWeights:
              opt.careerWeights instanceof Map
                ? Object.fromEntries(opt.careerWeights)
                : opt.careerWeights,
          })),
        }));
        setQuestions(parsed);
      })
      .catch(() => setQuestions(fallbackQuiz))
      .finally(() => setLoading(false));
  }, []);

  const handleSelect = (option) => {
    const newAnswers = [...answers, option];
    setAnswers(newAnswers);

    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (allAnswers) => {
    const scores = {};
    allAnswers.forEach((answer) => {
      const weights = answer.careerWeights || {};
      Object.entries(weights).forEach(([career, weight]) => {
        scores[career] = (scores[career] || 0) + weight;
      });
    });

    const sorted = Object.entries(scores)
      .sort(([, a], [, b]) => b - a)
      .map(([career, score]) => ({ career, score }));

    setResults(sorted);
  };

  const restart = () => {
    setCurrent(0);
    setAnswers([]);
    setResults(null);
  };

  if (loading) {
    return (
      <div className="quiz-page">
        <div className="loading">
          <div className="loading-spinner" />
        </div>
      </div>
    );
  }

  if (results) {
    const maxScore = results[0]?.score || 1;
    const topCareer = results[0];
    const topSlug = topCareer?.career;
    const matchPercent = Math.min(
      99,
      Math.round((topCareer.score / (questions.length * 3)) * 100),
    );

    return (
      <div className="quiz-page">
        <motion.div
          className="quiz-results"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="section-header" style={{ marginBottom: "2rem" }}>
            <span className="section-tag">Your Results</span>
            <h2>Career Match Found!</h2>
          </div>

          <motion.div
            className="result-card"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="crown">&#x1F3C6;</div>
            <h2>{careerNames[topSlug] || topSlug}</h2>
            <div className="match-percent">{matchPercent}% Match</div>
            <p
              style={{
                color: "var(--text-secondary)",
                marginTop: "1rem",
                maxWidth: 400,
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Based on your answers, this role aligns best with your skills and
              interests.
            </p>
            <button
              className="btn-primary"
              style={{ marginTop: "1.5rem" }}
              onClick={() => navigate(`/careers/${topSlug}`)}
            >
              View Career Details <FaArrowRight />
            </button>
          </motion.div>

          <h3
            style={{
              marginBottom: "1rem",
              fontSize: "1.1rem",
              color: "var(--text-secondary)",
            }}
          >
            Other matches
          </h3>
          <div className="result-other">
            {results.slice(1).map((r, i) => (
              <motion.div
                key={r.career}
                className="result-other-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/careers/${r.career}`)}
              >
                <span className="rank">#{i + 2}</span>
                <span className="name">
                  {careerNames[r.career] || r.career}
                </span>
                <div className="result-bar-bg">
                  <div
                    className="result-bar"
                    style={{
                      width: `${(r.score / maxScore) * 100}%`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <button className="btn-secondary" onClick={restart}>
              <FaRedo /> Retake Quiz
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const question = questions[current];
  const progress = (current / questions.length) * 100;

  return (
    <div className="quiz-page">
      <motion.div
        className="quiz-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="section-header" style={{ marginBottom: "2rem" }}>
          <span className="section-tag">Career Quiz</span>
          <h2>Find Your AI Career</h2>
        </div>

        <div className="quiz-progress">
          <div className="quiz-progress-bar-bg">
            <div
              className="quiz-progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="quiz-progress-text">
            Question {current + 1} of {questions.length}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="quiz-question">
              <div className="category">{question?.category}</div>
              <h2>{question?.question}</h2>
            </div>

            <div className="quiz-options">
              {question?.options?.map((option, i) => (
                <motion.button
                  key={i}
                  className="quiz-option"
                  onClick={() => handleSelect(option)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
