import { NavLink, Routes, Route } from "react-router-dom";
import { SECTIONS } from "./data/content";
import HomePage from "./pages/HomePage";
import HistoryPage from "./pages/HistoryPage";
import MusicPage from "./pages/MusicPage";
import FashionPage from "./pages/FashionPage";
import StoresPage from "./pages/StoresPage";
import ArticlesPage from "./pages/ArticlesPage";
import WomenPage from "./pages/WomenPage";
import ChristianPage from "./pages/ChristianPage";
import GalleryPage from "./pages/GalleryPage";
import MediaPage from "./pages/MediaPage";
import MeetSidPage from "./pages/MeetSidPage";

const PAGE_COMPONENTS = {
  HOME: HomePage,
  HISTORY: HistoryPage,
  MUSIC: MusicPage,
  FASHION: FashionPage,
  STORES: StoresPage,
  ARTICLES: ArticlesPage,
  "WOMEN IN PUNK": WomenPage,
  "CHRISTIAN PUNK": ChristianPage,
  GALLERY: GalleryPage,
  MEDIA: MediaPage,
  "MEET SID": MeetSidPage,
};

function normalizeRoute(section) {
  if (section === "HOME") return "/";
  return `/${section.toLowerCase().replace(/\s+/g, "-")}`;
}

function App() {
  const sections = SECTIONS.map(section => ({
    label: section,
    path: normalizeRoute(section),
    Component: PAGE_COMPONENTS[section] || HomePage,
  }));

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-tag">insta punk mag</p>
          <h1>Keep the scene loud, local, and alive.</h1>
        </div>
      </header>

      <nav className="section-nav">
        {sections.map(({ label, path }) => (
          <NavLink key={label} to={path} end className={({ isActive }) => `nav-btn ${isActive ? "active" : ""}`}>
            {label}
          </NavLink>
        ))}
      </nav>

      <main className="app-main">
        <Routes>
          {sections.map(({ label, path, Component }) => (
            <Route key={label} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
