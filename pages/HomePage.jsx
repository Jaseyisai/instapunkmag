import { PUNK_BANDS } from "../data/content";
import PageSection from "../components/PageSection";
import CardGrid from "../components/CardGrid";

export default function HomePage() {
  return (
    <div className="page-content">
      <section className="home-hero">
        <div>
          <h1>Insta Punk Mag</h1>
          <p>Street-level culture, DIY attitude, and the punk stories that still matter. Find shows, build your rig, read the scene, and talk to SID — your punk expert.</p>
        </div>
      </section>

      <PageSection title="Essential Punk Bands">
        <CardGrid
          items={PUNK_BANDS}
          renderItem={(band, index) => (
            <article key={index} className="card">
              <h3>{band.name}</h3>
              <p className="meta">{band.genre} · {band.era}</p>
              <p>{band.desc}</p>
              <p className="small">{band.origin}</p>
            </article>
          )}
        />
      </PageSection>
    </div>
  );
}
