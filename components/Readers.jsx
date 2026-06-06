import { useState } from "react";

function ReaderCard({ title, description, apiPath, placeholder, buttonLabel }) {
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleAction() {
    if (!query.trim()) return;
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(apiPath, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim() }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Request failed");
      setOutput(data.text || data.summary || data.result || data);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  }

  return (
    <div className="reader-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <div className="reader-input-row">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleAction()}
        />
        <button onClick={handleAction} disabled={loading || !query.trim()}>
          {loading ? "WORKING..." : buttonLabel}
        </button>
      </div>
      {error && <div className="reader-error">There was a problem. Please try again.</div>}
      {output && <div className="reader-result">{output}</div>}
    </div>
  );
}

export function PunkArticleReader() {
  return (
    <ReaderCard
      title="Punk Article Generator"
      description="Turn a headline or idea into a full punk-inspired article."
      apiPath="/api/generate-article"
      placeholder="Enter a story idea or title"
      buttonLabel="WRITE ARTICLE"
    />
  );
}

export function MusicGenerator() {
  return (
    <ReaderCard
      title="Music Prompt Generator"
      description="Create a music production prompt or song mood idea."
      apiPath="/api/generate-music"
      placeholder="Enter a genre, vibe or concept"
      buttonLabel="GENERATE PROMPT"
    />
  );
}

export function ImagePromptGenerator() {
  return (
    <ReaderCard
      title="Punk Image Prompt"
      description="Generate a creative visual prompt for punk-themed artwork."
      apiPath="/api/generate-image"
      placeholder="Enter a visual concept"
      buttonLabel="MAKE PROMPT"
    />
  );
}

export function MediaGuide() {
  return (
    <ReaderCard
      title="Media & Mix Guide"
      description="Ask for recommendations or ideas about punk media, mix tapes, and playlists."
      apiPath="/api/generate-media"
      placeholder="Enter a topic or theme"
      buttonLabel="GET IDEAS"
    />
  );
}

export function ChristianMusicGenerator() {
  return (
    <ReaderCard
      title="Christian Punk Music"
      description="Generate faith-driven punk music ideas and band concepts."
      apiPath="/api/generate-christian-music"
      placeholder="Enter a Christian punk vibe"
      buttonLabel="GENERATE"
    />
  );
}

export function WomenMusicGenerator() {
  return (
    <ReaderCard
      title="Women in Punk Music"
      description="Generate ideas for women-led punk bands, playlists, or scenes."
      apiPath="/api/generate-women-music"
      placeholder="Enter a women-focused punk theme"
      buttonLabel="GENERATE"
    />
  );
}
