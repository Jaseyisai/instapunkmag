import { PUNK_BOOKS, PUNK_FILMS, PUNK_SHORT_FILMS, PUNK_DOCUMENTARIES } from "../data/content";
import { MediaGuide } from "../components/Readers";
import PageSection from "../components/PageSection";
import ResourceList from "../components/ResourceList";

export default function MediaPage() {
  return (
    <div className="page-content">
      <PageSection title="Punk Media & Guides">
        <MediaGuide />
      </PageSection>

      <PageSection title="Books">
        <ResourceList title="Books" items={PUNK_BOOKS} />
      </PageSection>

      <PageSection title="Feature Films">
        <ResourceList title="Feature Films" items={PUNK_FILMS} />
      </PageSection>

      <PageSection title="Short Films">
        <ResourceList title="Short Films" items={PUNK_SHORT_FILMS} />
      </PageSection>

      <PageSection title="Documentaries">
        <ResourceList title="Documentaries" items={PUNK_DOCUMENTARIES} />
      </PageSection>
    </div>
  );
}
