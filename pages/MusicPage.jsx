import { NEW_MUSIC_CARDS } from "../data/content";
import { MusicGenerator } from "../components/Readers";
import PageSection from "../components/PageSection";
import CardGrid from "../components/CardGrid";

export default function MusicPage() {
  return (
    <div className="page-content">
      <PageSection title="New Punk Music">
        <CardGrid
          items={NEW_MUSIC_CARDS}
          renderItem={(band, index) => (
            <article key={index} className="card">
              <div className="card-icon">{band.emoji}</div>
              <h3>{band.title}</h3>
              <p className="meta">{band.genre}</p>
              <p>{band.desc}</p>
            </article>
          )}
        />
      </PageSection>

      <PageSection title="Generate a Punk Music Prompt">
        <MusicGenerator />
      </PageSection>
    </div>
  );
}
