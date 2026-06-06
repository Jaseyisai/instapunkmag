import { useState } from "react";

function SearchCard({ label, type, placeholder }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  async function handleSearch() {
    if (!query.trim()) return;
    setLoading(true);
    setError(false);
    try {
      const response = await fetch(`/api/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: query.trim() }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Search failed");
      setResults(data.results || data);
    } catch (e) {
      setError(true);
    }
    setLoading(false);
  }

  return (
    <div className="search-card">
      <h3>{label}</h3>
      <div className="search-box-row">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch} disabled={loading || !query.trim()}>
          {loading ? "SEARCHING..." : "FIND"}
        </button>
      </div>
      {error && <div className="search-error">Could not complete search. Try another query.</div>}
      {results && (
        <div className="search-results">
          {Array.isArray(results) ? (
            results.map((item, i) => (
              <div key={i} className="search-result-item">{item}</div>
            ))
          ) : (
            <div className="search-result-item">{JSON.stringify(results)}</div>
          )}
        </div>
      )}
    </div>
  );
}

export function ShowFinder() {
  return <SearchCard label="Find Punk Shows" type="find-shows" placeholder="Search shows by city, year or band" />;
}

export function ChristianShowFinder() {
  return <SearchCard label="Find Christian Punk Shows" type="find-christian-shows" placeholder="Search faith-based punk shows" />;
}

export function WomenShowFinder() {
  return <SearchCard label="Find Women-Fronted Shows" type="find-women-shows" placeholder="Search women-led punk shows" />;
}

export function StoreFinder() {
  return <SearchCard label="Find Punk Stores" type="find-stores" placeholder="Search punk shops, records, and merch" />;
}
