export default function PageSection({ title, subtitle, children, className = "" }) {
  return (
    <section className={`home-section ${className}`.trim()}>
      <h2>{title}</h2>
      {subtitle && <p className="section-copy">{subtitle}</p>}
      {children}
    </section>
  );
}
