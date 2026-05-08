import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  FaArrowLeft,
  FaRedo,
  FaArrowRight,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { fallbackTopicQuizzes, careerNames } from "../data/fallbackData";
import { useProgress } from "../context/ProgressContext";

export default function CareerQuiz() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { saveQuizScore, getQuizScore } = useProgress();
  const questions = fallbackTopicQuizzes[slug] || [];
  const prevScore = getQuizScore(slug);

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const handleSelect = (index) => {
    if (selected !== null) return;
    setSelected(index);
    setShowExplanation(true);
    if (questions[current].options[index].correct) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      const finalScore = questions[current].options[selected]?.correct
        ? score
        : score;
      saveQuizScore(slug, finalScore, questions.length);
      setFinished(true);
    }
  };

  const restart = () => {
    setCurrent(0);
    setSelected(null);
    setShowExplanation(false);
    setScore(0);
    setFinished(false);
  };

  if (questions.length === 0) {
    return (
      <div className="career-quiz-page">
        <div className="quiz-container" style={{ textAlign: "center" }}>
          <h2>No quiz available for this career path</h2>
          <button
            className="btn-primary"
            style={{ marginTop: "1rem" }}
            onClick={() => navigate(`/careers/${slug}`)}
          >
            Back to Career <FaArrowRight />
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    const percent = Math.round((score / questions.length) * 100);
    return (
      <div className="career-quiz-page">
        <motion.div
          className="quiz-results"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="section-header" style={{ marginBottom: "2rem" }}>
            <span className="section-tag">Quiz Results</span>
            <h2>{careerNames[slug] || slug}</h2>
          </div>
          <motion.div
            className="result-card"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="crown">
              {percent >= 80
                ? "\u{1F3C6}"
                : percent >= 60
                  ? "\u{1F31F}"
                  : "\u{1F4AA}"}
            </div>
            <div className="quiz-score-display">
              {score}/{questions.length}
            </div>
            <p
              style={{
                color: "var(--text-secondary)",
                marginTop: "0.5rem",
                fontSize: "1.1rem",
              }}
            >
              {percent >= 80
                ? "Excellent! You have strong knowledge in this area."
                : percent >= 60
                  ? "Good job! Keep learning to strengthen your skills."
                  : "Keep going! Review the topics and try again."}
            </p>
            <div
              style={{
                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                marginTop: "1.5rem",
                flexWrap: "wrap",
              }}
            >
              <button
                className="btn-primary"
                onClick={() => navigate(`/careers/${slug}`)}
              >
                View Career Path <FaArrowRight />
              </button>
              <button className="btn-secondary" onClick={restart}>
                <FaRedo /> Retake Quiz
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  const question = questions[current];
  const progress = (current / questions.length) * 100;

  return (
    <div className="career-quiz-page">
      <motion.div
        className="quiz-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <button
          className="back-btn"
          onClick={() => navigate(`/careers/${slug}`)}
        >
          <FaArrowLeft /> Back to {careerNames[slug] || "Career"}
        </button>

        <div className="section-header" style={{ marginBottom: "1.5rem" }}>
          <span className="section-tag">Knowledge Quiz</span>
          <h2>{careerNames[slug] || slug}</h2>
          {prevScore && (
            <div
              className="quiz-score-badge"
              style={{ marginTop: "0.5rem", display: "inline-flex" }}
            >
              Previous: {prevScore.score}/{prevScore.total}
            </div>
          )}
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
              <h2>{question.question}</h2>
            </div>

            <div className="quiz-options">
              {question.options.map((option, i) => {
                let cls = "quiz-option";
                if (selected !== null) {
                  if (option.correct) cls += " quiz-option-correct";
                  else if (i === selected && !option.correct)
                    cls += " quiz-option-wrong";
                }
                return (
                  <motion.button
                    key={i}
                    className={cls}
                    onClick={() => handleSelect(i)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    disabled={selected !== null}
                    style={selected !== null ? { cursor: "default" } : {}}
                  >
                    {selected !== null && option.correct && (
                      <FaCheck
                        style={{ marginRight: 8, color: "var(--accent-green)" }}
                      />
                    )}
                    {selected === i && !option.correct && (
                      <FaTimes
                        style={{ marginRight: 8, color: "var(--accent-pink)" }}
                      />
                    )}
                    {option.text}
                  </motion.button>
                );
              })}
            </div>

            {showExplanation && (
              <motion.div
                className="quiz-explanation"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <strong>
                  {questions[current].options[selected]?.correct
                    ? "Correct!"
                    : "Not quite."}
                </strong>{" "}
                {question.explanation}
              </motion.div>
            )}

            {selected !== null && (
              <div style={{ textAlign: "center" }}>
                <button className="quiz-next-btn" onClick={handleNext}>
                  {current < questions.length - 1
                    ? "Next Question"
                    : "See Results"}{" "}
                  <FaArrowRight />
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
