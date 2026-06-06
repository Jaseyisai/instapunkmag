export default function ResourceList({ title, items }) {
  return (
    <div className="media-list">
      <h3>{title}</h3>
      {items.map((item, index) => (
        <article key={index} className="card card-small">
          <div className="card-icon">{item.emoji}</div>
          <h4>{item.title}</h4>
          <p className="meta">{item.year} · {item.genre}</p>
          <p>{item.desc}</p>
        </article>
      ))}
    </div>
  );
}
