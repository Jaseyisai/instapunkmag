import { ShowFinder, StoreFinder } from "../components/Finders";
import PageSection from "../components/PageSection";

export default function StoresPage() {
  return (
    <div className="page-content">
      <PageSection title="Find Punk Shows">
        <ShowFinder />
      </PageSection>

      <PageSection title="Find Punk Stores">
        <StoreFinder />
      </PageSection>
    </div>
  );
}
