import React from 'react';
import TimelineItem from './TimelineItem'; // We will create this next

const Timeline = ({ items }) => {
  return (
    <div className="timeline-container">
      <h2 className="timeline-header">The History of Sound Waves</h2>
      <div className="timeline-line">
        {/* Map through the array of items passed into the component */}
        {items.map((item, index) => (
          <TimelineItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Timeline;

// IMPORTANT: We use CSS classes (like 'timeline-container') for styling later.

