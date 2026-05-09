import { useMemo } from "react";
import { motion } from "framer-motion";

export default function ProgressGraph({ careerProgressRows, overall }) {
  const maxProgress = useMemo(() => {
    if (careerProgressRows.length === 0) return 0;
    return Math.max(...careerProgressRows.map((c) => c.progress.percent));
  }, [careerProgressRows]);

  if (careerProgressRows.length === 0) {
    return null;
  }

  return (
    <motion.div
      className="progress-graph-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      style={{
        marginTop: "2.5rem",
        marginBottom: "2.5rem",
        padding: "1.5rem",
        background: "rgba(255, 255, 255, 0.03)",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
      }}
    >
      <h3
        style={{
          marginBottom: "1.5rem",
          fontSize: "1.1rem",
          fontWeight: "600",
        }}
      >
        Selected Career Progress Overview
      </h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {careerProgressRows.map((career, index) => {
          const barHeight =
            (career.progress.percent / (maxProgress || 100)) * 40 + 20;

          return (
            <motion.div
              key={career.slug}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              {/* Career Label */}
              <div
                style={{
                  minWidth: "120px",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  paddingBottom: "4px",
                }}
              >
                <div
                  style={{
                    color: "var(--text-primary)",
                    marginBottom: "4px",
                  }}
                >
                  {career.title}
                </div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "var(--text-secondary)",
                  }}
                >
                  {career.progress.completed}/{career.progress.total}
                </div>
              </div>

              {/* Bar Container */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "flex-end",
                  gap: "0.5rem",
                  height: "60px",
                  justifyContent: "flex-start",
                }}
              >
                {/* Bar */}
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${barHeight}px` }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.05 }}
                  style={{
                    background: `linear-gradient(135deg, ${career.color} 0%, ${career.color}88 100%)`,
                    borderRadius: "6px 6px 0 0",
                    minWidth: "24px",
                    boxShadow: `0 0 12px ${career.color}44`,
                  }}
                />

                {/* Percentage Label */}
                <div
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    color: career.color,
                    minWidth: "45px",
                    paddingBottom: "2px",
                  }}
                >
                  {career.progress.percent}%
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Overall Summary Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={{
          marginTop: "2rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "0.75rem",
          }}
        >
          <div style={{ fontSize: "0.9rem", fontWeight: "500" }}>
            Overall Progress
          </div>
          <div
            style={{
              fontSize: "1.1rem",
              fontWeight: "700",
              background: "linear-gradient(135deg, #6C63FF 0%, #9F7AEA 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {overall.percent}%
          </div>
        </div>
        <div
          style={{
            width: "100%",
            height: "8px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "4px",
            overflow: "hidden",
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${overall.percent}%` }}
            transition={{ duration: 1, delay: 0.9 }}
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #6C63FF 0%, #9F7AEA 100%)",
              borderRadius: "4px",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
