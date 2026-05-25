import React, { useState, useMemo } from 'react';

// Mock data (replace with API fetching)
const ALL_SONGS = [
  { title: "Blitzkrieg Bop", artist: "Ramones", year: 1976, genre: "Proto-Punk", era: "Early", vibe: "Fast" },
  { title: "Mind Today", artist: "Buzzcocks", year: 1978, genre: "New Wave", era: "Mid", vibe: "Melodic" },
  { title: "God Save the Queen", artist: "The Clash", year: 1977, genre: "Political Punk", era: "Mid", vibe: "Aggressive" },
  { title: "London Calling", artist: "The Clash", year: 1979, genre: "Post-Punk", era: "Late", vibe: "Epic" },
  // Add hundreds more songs
];

const MusicExplorer = () => {
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedEra, setSelectedEra] = useState('all');
  const [selectedSong, setSelectedSong] = useState(null); // Tracks the song for the "Now Playing" feature

  // 🚀 PERFORMANCE OPTIMIZATION: useMemo recalculates the filtered list only when dependencies change.
  const filteredSongs = useMemo(() => {
    return ALL_SONGS.filter(song => {
      const matchesGenre = selectedGenre === 'all' || song.genre === selectedGenre;
      const matchesEra = selectedEra === 'all' || song.era === selectedEra;
      return matchesGenre && matchesEra;
    });
  }, [selectedGenre, selectedEra]);


  // Handler for when a user clicks a song card
  const handleSongSelect = (song) => {
    setSelectedSong(song);
    // Log or dispatch event here to trigger the actual audio playback
    console.log(`Playing: ${song.title}`);
  };

  return (
    <section aria-labelledby="music-heading" className="music-section">
      <h1>The Sound Archive</h1>
      <p className="section-intro">Filter by genre or era to rediscover punk's greatest anthems.</p>

      {/* 1. FILTER CONTROLS */}
      <div className="filter-controls">
        <select 
          onChange={(e) => setSelectedGenre(e.target.value)} 
          value={selectedGenre}
          aria-label="Filter by Genre"
        >
          <option value="all">All Genres</option>
          <option value="Political Punk">Political Punk</option>
          <option value="New Wave">New Wave</option>
          {/* Dynamically populate options from data */}
        </select>
        
        {/* Another control for Era selection */}
        <select onChange={(e) => alert(e.target.value)}>
             <option value="">All Eras</option>
             <option value="Early">Early Punk</option>
             <option value="Mid">Mid-Era</option>
        </select>
      </div>

      {/* Display the filtered song list */}
      <div className="song-grid">
        {/* Mapping through the filtered results */}
        {/* In a real app, you'd filter the array here before mapping */}
        {/* For demonstration, we'll just map the full list: */}
        {/* Example rendering for one song: */}
        <div className="song-card" onClick={() => {
            console.log("Playing song:", song.title);
            // Logic to trigger audio playback
        }}>
            <h3>{song.title}</h3>
            <p>{song.artist}</p>
            <button>Play</button>
        </div>
        {/* ... repeat for all songs */}
      </div>
    </div>
  );
}
export default MusicExplorer;

