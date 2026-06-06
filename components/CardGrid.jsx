export default function CardGrid({ items, renderItem, className = "" }) {
  return (
    <div className={`card-grid ${className}`.trim()}>
      {items.map((item, index) => renderItem(item, index))}
    </div>
  );
}
