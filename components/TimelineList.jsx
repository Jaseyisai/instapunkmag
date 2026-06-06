export default function TimelineList({ items }) {
  return (
    <div className="timeline-list">
      {items.map((item, index) => (
        <div key={index} className="timeline-item">
          <div className="timeline-year">{item.year}</div>
          <div>
            <h3>{item.event}</h3>
            <p>{item.detail}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
