import { ARTICLES } from "../data/content";
import { PunkArticleReader } from "../components/Readers";
import PageSection from "../components/PageSection";
import CardGrid from "../components/CardGrid";

export default function ArticlesPage() {
  return (
    <div className="page-content">
      <PageSection title="Punk Articles">
        <CardGrid
          items={ARTICLES}
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

      <PageSection title="Write a Punk Article">
        <PunkArticleReader />
      </PageSection>
    </div>
  );
}
