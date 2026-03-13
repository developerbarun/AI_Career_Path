import { useNavigate } from "react-router-dom";
import { iconMap } from "../data/fallbackData";

export default function CareerCard({ career }) {
  const navigate = useNavigate();
  const Icon = iconMap[career.icon];

  return (
    <div
      className="career-card"
      style={{ "--card-color": career.color }}
      onClick={() => navigate(`/careers/${career.slug}`)}
    >
      <div
        className="career-card-icon"
        style={{ background: `${career.color}20`, color: career.color }}
      >
        {Icon && <Icon />}
      </div>
      <h3>{career.title}</h3>
      <p>
        {career.description.length > 120
          ? career.description.slice(0, 120) + "..."
          : career.description}
      </p>
      <div className="career-card-meta">
        <span className="career-meta-item">
          <span className="dot" style={{ background: career.color }} />$
          {(career.salaryRange?.min / 1000).toFixed(0)}k - $
          {(career.salaryRange?.max / 1000).toFixed(0)}k
        </span>
        <span className="career-meta-item">
          <span
            className="dot"
            style={{
              background:
                career.demandLevel === "Extreme"
                  ? "#FF4B5C"
                  : career.demandLevel === "Very High"
                    ? "#F9A826"
                    : "#43E97B",
            }}
          />
          {career.demandLevel} Demand
        </span>
      </div>
    </div>
  );
}
