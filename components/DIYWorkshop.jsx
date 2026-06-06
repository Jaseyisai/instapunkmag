import { useState } from "react";
import { DIY_PROJECTS, DIY_TOOLS_ESSENTIALS } from "../data/content";

export default function DIYWorkshop() {
  const [openCard, setOpenCard] = useState(null);
  const [filter, setFilter] = useState("ALL");

  const difficulties = ["ALL", "BEGINNER", "INTERMEDIATE"];
  const filtered = filter === "ALL" ? DIY_PROJECTS : DIY_PROJECTS.filter(p => p.difficulty === filter);

  return (
    <div>
      <div className="diy-filter-bar">
        {difficulties.map(d => (
          <button key={d} className={`diy-filter-btn ${filter === d ? "active" : ""}`} onClick={() => setFilter(d)}>
            {d}
          </button>
        ))}
      </div>

      <div className="diy-projects-grid">
        {filtered.map((project, i) => {
          const isOpen = openCard === i;
          return (
            <div key={i} className="diy-card">
              <div className="diy-card-header" onClick={() => setOpenCard(isOpen ? null : i)}>
                <div className="diy-card-emoji">{project.emoji}</div>
                <div className="diy-card-meta">
                  <div className={`diy-difficulty ${project.difficulty}`}>{project.difficulty}</div>
                </div>
              </div>
              <div className="diy-card-title" onClick={() => setOpenCard(isOpen ? null : i)} style={{ cursor: "pointer" }}>{project.title}</div>
              <div className="diy-card-stats">
                <div className="diy-stat">TIME<span>{project.time}</span></div>
                <div className="diy-stat">COST<span>{project.cost}</span></div>
              </div>

              <div className={`diy-card-body ${isOpen ? "open" : ""}`}>
                <div className="diy-tools-list">
                  <div className="diy-tools-label">// YOU'LL NEED</div>
                  {project.tools.map((t, j) => <span key={j} className="diy-tool-chip">{t}</span>)}
                </div>
                <div className="diy-steps-label">// STEPS</div>
                {project.steps.map((step, j) => (
                  <div key={j} className="diy-step">
                    <div className="diy-step-num">{j + 1}</div>
                    <div className="diy-step-text">{step}</div>
                  </div>
                ))}
                <div className="diy-tip">{project.tips}</div>
              </div>

              <button className="diy-toggle-btn" onClick={() => setOpenCard(isOpen ? null : i)}>
                {isOpen ? "▲ COLLAPSE" : "▼ EXPAND TUTORIAL"}
              </button>
            </div>
          );
        })}
      </div>

      <div className="punk-divider"><span>// THE ESSENTIAL DIY TOOLKIT //</span></div>
      <div className="diy-tools-essentials">
        {DIY_TOOLS_ESSENTIALS.map((tool, i) => (
          <div key={i} className="diy-tool-card">
            <div className="diy-tool-emoji">{tool.emoji}</div>
            <div>
              <div className="diy-tool-name">{tool.name}</div>
              <div className="diy-tool-use">{tool.use}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
