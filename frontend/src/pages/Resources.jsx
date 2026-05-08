import { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaStar, FaExternalLinkAlt } from "react-icons/fa";
import { fetchResources } from "../services/api";
import { fallbackResources } from "../data/fallbackData";

const TYPES = ["All", "Course", "Book", "Tutorial", "Tool", "Community"];

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetchResources()
      .then(setResources)
      .catch(() => setResources(fallbackResources))
      .finally(() => setLoading(false));
  }, []);

  const filtered =
    filter === "All" ? resources : resources.filter((r) => r.type === filter);

  return (
    <div className="resources-page">
      <section className="section">
        <div className="section-header">
          <span className="section-tag">Learn</span>
          <h2>Learning Resources</h2>
          <p>
            Curated courses, books, tutorials, and communities to accelerate
            your AI career
          </p>
        </div>

        <div className="resources-filters">
          {TYPES.map((type) => (
            <button
              key={type}
              className={`filter-btn ${filter === type ? "active" : ""}`}
              onClick={() => setFilter(type)}
            >
              {type}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="loading">
            <div className="loading-spinner" />
          </div>
        ) : (
          <div className="resources-grid">
            {filtered.map((resource, i) => (
              <motion.div
                key={resource._id || i}
                className={`resource-card ${resource.url ? "resource-card-clickable" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
                  {resource.free && <span className="resource-free">FREE</span>}
                </div>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <div className="resource-rating">
                  <FaStar />
                  {resource.rating?.toFixed(1)}
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
        )}
      </section>
    </div>
  );
}
