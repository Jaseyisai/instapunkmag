import { CHRISTIAN_PUNK_BANDS, NEW_CHRISTIAN_MUSIC_CARDS } from "../data/content";
import { ChristianShowFinder } from "../components/Finders";
import { ChristianMusicGenerator } from "../components/Readers";
import PageSection from "../components/PageSection";
import CardGrid from "../components/CardGrid";

export default function ChristianPage() {
  return (
    <div className="page-content">
      <PageSection title="Christian Punk & Hardcore">
        <CardGrid
          items={CHRISTIAN_PUNK_BANDS}
          renderItem={(band, index) => (
            <article key={index} className="card">
              <h3>{band.name}</h3>
              <p className="meta">{band.genre}</p>
              <p>{band.note}</p>
            </article>
          )}
        />
      </PageSection>

      <PageSection title="Christian Punk Shows">
        <ChristianShowFinder />
      </PageSection>

      <PageSection title="Generate Christian Punk Music Ideas">
        <ChristianMusicGenerator />
      </PageSection>

      <PageSection title="Faith-Driven Music Cards">
        <CardGrid
          items={NEW_CHRISTIAN_MUSIC_CARDS}
          renderItem={(item, index) => (
            <article key={index} className="card">
              <div className="card-icon">{item.emoji}</div>
              <h3>{item.title}</h3>
              <p className="meta">{item.genre}</p>
              <p>{item.desc}</p>
            </article>
          )}
        />
      </PageSection>
    </div>
  );
}
