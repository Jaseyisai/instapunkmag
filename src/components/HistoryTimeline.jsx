import React, { useState } from 'react';
// Mock data structure (replace with your actual API call)
const HISTORY_DATA = [
  { year: 1960, title: "Beatles Years", details: "Early pop and beat groups define the genre's starting point." },
  { year: 1973, title: "The Ramones Explosion", details: "Short, fast, and raw. Perfecting the three-chord structure." },
  { year: 1977, title: "CBGB Golden Age", details: "The epicenter of punk. A chaotic fusion of art and noise." },
  { year: 1981, title: "Hardcore Emergence", details: "Increasing speed and aggression, leading to DIY ethics." },
  // Add more years
];

// Helper component for an individual Year Card
const TimelineYearCard = ({ year, title, details, onClick, isActive }) => (
  <div 
    className={`timeline-card ${isActive ? 'active' : ''}`} 
    role="button" // Treats the card as a button for accessibility
    tabIndex={0} // Makes it focusable via keyboard
    onClick={() => onClick(year)}
    onKeyDown={(e) => e.key === 'Enter' && onClick(year)} // Enables Enter key activation
  >
    <h4>{year}: {title}</h4>
    <p>{details}</p>
  </div>
);

const HistoryTimeline = ({ onSelectYear }) => {
  // State to track which year is currently expanded/active
  const [activeYear, setActiveYear] = useState(null);

  // Effect handler that is passed up to the parent PunkHub
  const handleYearSelect = (year) => {
    setActiveYear(year);
    // This calls the parent component's state changer, updating the view.
    onSelectYear(year); 
  };

  return (
    <section aria-labelledby="history-heading" className="history-section">
      <h1>Punk History Timeline</h1>
      <p className="section-intro">Select a year to learn about the seminal moments of punk culture.</p>

      <div className="timeline-wrapper">
        
        {/* 1. The clickable year navigation (left side) */}
        <nav className="timeline-nav">
          <h2>Milestones</h2>
          {HISTORY_DATA.map((item) => (
            <TimelineYearCard
              key={item.year}
              year={item.year}
              title={item.title}
              details="" // Only title needed here
              onClick={handleYearSelect}
              isActive={activeYear === item.year}
            />
          ))}
        </nav>

        {/* 2. The expanded content (right side) */}
        <div 
          className="timeline-content-area" 
          role="tabpanel" // ARIA role indicating this is the content panel
          aria-label={`Content for ${activeYear ? activeYear + 's' : 'Punk History'}`}
        >
          {activeYear ? (
            <div className="timeline-content-card">
              <h2>{activeYear}: {HISTORY_DATA.find(d => d.year === activeYear).title}</h2>
              <p>{HISTORY_DATA.find(d => d.year === activeYear).details}</p>
              {/* Add rich content here (images, associated artists) */}
            </div>
          ) : (
            <p className="placeholder-text">Please select a year to view the history.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default HistoryTimeline;

