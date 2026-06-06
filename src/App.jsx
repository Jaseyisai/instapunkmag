import { useState } from "react";
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
import "./App.css";

const NAV_LABELS = {
  HOME: "Home",
  HISTORY: "History",
  MUSIC: "Music",
  FASHION: "Fashion",
  STORES: "Stores",
  ARTICLES: "Articles",
  "WOMEN IN PUNK": "Women",
  "CHRISTIAN PUNK": "Christian",
  GALLERY: "Gallery",
  MEDIA: "Media",
  "MEET SID": "Meet",
};

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

const PRIMARY_SECTIONS = ["HOME", "MUSIC", "FASHION", "STORES", "ARTICLES", "MEDIA", "MEET SID"];
const MORE_SECTIONS = ["HISTORY", "WOMEN IN PUNK", "CHRISTIAN PUNK", "GALLERY"];

function normalizeRoute(section) {
  if (section === "HOME") return "/";
  return `/${section.toLowerCase().replace(/\s+/g, "-")}`;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const sections = SECTIONS.map(section => ({
    label: section,
    displayLabel: NAV_LABELS[section] ?? section,
    path: normalizeRoute(section),
    Component: PAGE_COMPONENTS[section] || HomePage,
  }));

  const primaryNav = sections.filter(section => PRIMARY_SECTIONS.includes(section.label));
  const moreNav = sections.filter(section => MORE_SECTIONS.includes(section.label));

  const toggleMenu = () => {
    setMenuOpen(open => {
      if (open) setMoreOpen(false);
      return !open;
    });
  };

  const handleNavClick = () => {
    setMenuOpen(false);
    setMoreOpen(false);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-tag">insta punk mag</p>
          <h1>Keep the scene loud, local, and alive.</h1>
        </div>
        <button
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          aria-expanded={menuOpen}
          aria-label={`${menuOpen ? "Close" : "Open"} navigation menu`}
          onClick={toggleMenu}
        >
          <span className="menu-symbol">{menuOpen ? "✕" : "☰"}</span>
          <span className="menu-text">{menuOpen ? "Close" : "Menu"}</span>
        </button>
      </header>

      <nav className={`section-nav ${menuOpen ? "open" : ""}`}>
        {primaryNav.map(({ label, displayLabel, path }) => (
          <NavLink
            key={label}
            to={path}
            end
            className={({ isActive }) => `nav-btn ${isActive ? "active" : ""}`}
            onClick={handleNavClick}
            aria-label={label}
          >
            {displayLabel}
          </NavLink>
        ))}

        <div className={`more-dropdown ${moreOpen ? "open" : ""}`}>
          <button
            type="button"
            className={`nav-btn more-trigger ${moreOpen ? "active" : ""}`}
            onClick={() => setMoreOpen(open => !open)}
            aria-expanded={moreOpen}
            aria-label="Open more navigation sections"
          >
            More
          </button>
          <div className="more-list">
            {moreNav.map(({ label, displayLabel, path }) => (
              <NavLink
                key={label}
                to={path}
                end
                className={({ isActive }) => `nav-btn ${isActive ? "active" : ""}`}
                onClick={handleNavClick}
                aria-label={label}
              >
                {displayLabel}
              </NavLink>
            ))}
          </div>
        </div>
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
