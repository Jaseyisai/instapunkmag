import { WOMEN_LEGENDS, NEW_WOMEN_PUNK_CARDS, WOMEN_PUNK_ARTICLES } from "../data/content";
import { WomenShowFinder } from "../components/Finders";
import { WomenMusicGenerator } from "../components/Readers";
import PageSection from "../components/PageSection";
import CardGrid from "../components/CardGrid";

export default function WomenPage() {
  return (
    <div className="page-content">
      <PageSection title="Women in Punk">
        <CardGrid
          items={WOMEN_LEGENDS}
          renderItem={(item, index) => (
            <article key={index} className="card">
              <div className="card-icon">{item.emoji}</div>
              <h3>{item.name}</h3>
              <p className="meta">{item.role} · {item.years}</p>
              <p>{item.desc}</p>
            </article>
          )}
        />
      </PageSection>

      <PageSection title="New Women-Led Punk">
        <CardGrid
          items={NEW_WOMEN_PUNK_CARDS}
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

      <PageSection title="Women-Focused Punk Shows">
        <WomenShowFinder />
      </PageSection>

      <PageSection title="Generate Women in Punk Music Ideas">
        <WomenMusicGenerator />
      </PageSection>

      <PageSection title="Riot Grrrl & Women in Punk Articles">
        <CardGrid
          items={WOMEN_PUNK_ARTICLES}
          renderItem={(article, index) => (
            <article key={index} className="card">
              <div className="card-icon">{article.emoji}</div>
              <h3>{article.title}</h3>
              <p className="meta">{article.category} · {article.readTime}</p>
              <p>{article.excerpt}</p>
            </article>
          )}
        />
      </PageSection>
    </div>
  );
}
