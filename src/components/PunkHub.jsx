import React, { useState } from 'react';
import Navbar from './Navbar'; // New dedicated component
import AboutSection from './AboutSection'; // Refactored simple section
import HistoryTimeline from './HistoryTimeline'; // Complex module
import MusicExplorer from './MusicExplorer'; // Complex module
// Add ChatComponent, etc., as you finish them

const PunkHub = () => {
  // State to track which main section is currently visible/active
  const [activeSection, setActiveSection] = useState('history');

  // This function handles the rendering based on the active state
  const renderMainContent = () => {
    switch (activeSection) {
      case 'history':
        // Passes the setActiveSection function down so the timeline can change the view
        return <HistoryTimeline onSelectYear={setActiveSection} />;
      case 'music':
        return <MusicExplorer />;
      case 'about':
        return <AboutSection />;
      // Add more cases here:
      case 'chat':
        // return <ChatComponent />;
        return <p>Chat Module Coming Soon...</p>;
      default:
        return <AboutSection />;
    }
  };

  return (
    <div className="punk-hub">
      {/* 1. STICKY NAVIGATION */}
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {/* 2. MAIN ROLE: Tells screen readers this is the primary content */}
      <main 
        className="content-area" 
        aria-live="polite" // Announces changes (like section switches)
      >
        {/* 3. RENDERER: This renders the specific module */}
        {renderMainContent()}
      </main>
      
      {/* Optional: Global Footer or CTA */}
    </div>
  );
};

export default PunkHub;

