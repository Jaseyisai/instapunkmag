import React from 'react';

const TimelineItem = ({ item }) => {
  return (
    <div className="timeline-item-wrapper">
      <div className="timeline-dot"></div>
      <div className="timeline-content">
        <h3 className="timeline-title">{item.title}</h3>
        <p className="timeline-date">({item.year})</p>
        <p className="timeline-description">{item.description}</p>
      </div>
    </div>
  );
};

export default TimelineItem;

