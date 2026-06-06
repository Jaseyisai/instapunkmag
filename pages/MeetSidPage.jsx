import PunkChatBot from "../components/PunkChatBot";
import { ImagePromptGenerator, MediaGuide, MusicGenerator, ChristianMusicGenerator, WomenMusicGenerator, PunkArticleReader } from "../components/Readers";
import PageSection from "../components/PageSection";

export default function MeetSidPage() {
  return (
    <div className="page-content">
      <PageSection title="Meet SID" subtitle="SID is your punk guide, built to answer questions about history, shows, fashion, DIY, and the subcultures that keep the scene alive.">
        <PunkChatBot />
      </PageSection>

      <PageSection title="SID's Creative Toolkit">
        <div className="card-grid">
          <div className="card card-full"><ImagePromptGenerator /></div>
          <div className="card card-full"><PunkArticleReader /></div>
          <div className="card card-full"><MusicGenerator /></div>
          <div className="card card-full"><WomenMusicGenerator /></div>
          <div className="card card-full"><ChristianMusicGenerator /></div>
          <div className="card card-full"><MediaGuide /></div>
        </div>
      </PageSection>
    </div>
  );
}
