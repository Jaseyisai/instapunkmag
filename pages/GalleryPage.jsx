import { GALLERY_PROMPTS } from "../data/content";
import GalleryImage from "../components/GalleryImage";
import PageSection from "../components/PageSection";

export default function GalleryPage() {
  return (
    <div className="page-content">
      <PageSection title="Punk Gallery">
        <div className="gallery-grid">
          {GALLERY_PROMPTS.map((item, index) => (
            <GalleryImage key={index} prompt={item.prompt} alt={item.alt} span={index % 3 === 0 ? 2 : 1} />
          ))}
        </div>
      </PageSection>
    </div>
  );
}
