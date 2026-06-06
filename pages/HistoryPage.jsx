import { RIOT_GRRRL_TIMELINE, TIMELINE, RIOT_GRRRL_BANDS } from "../data/content";
import PageSection from "../components/PageSection";
import CardGrid from "../components/CardGrid";
import TimelineList from "../components/TimelineList";

export default function HistoryPage() {
  return (
    <div className="page-content">
      <PageSection title="Punk History Timeline">
        <TimelineList items={TIMELINE} />
      </PageSection>

      <PageSection title="Riot Grrrl Legacy">
        <CardGrid
          items={RIOT_GRRRL_BANDS}
          renderItem={(band, index) => (
            <article key={index} className="card">
              <div className="card-icon">{band.emoji}</div>
              <h3>{band.name}</h3>
              <p className="meta">{band.origin} · {band.years}</p>
              <p>{band.desc}</p>
            </article>
          )}
        />
      </PageSection>

      <PageSection title="Riot Grrrl Milestones">
        <TimelineList items={RIOT_GRRRL_TIMELINE} />
      </PageSection>
    </div>
  );
}
