import React, { useState } from 'react';

function App() {
  const [mood, setMood] = useState('');
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function generatePlaylist() {
    setLoading(true);
    setError(null);
    setPlaylists([]);

    try {
      const response = await fetch('/api/generate-playlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mood }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch playlists');
      }

      const data = await response.json();
      setPlaylists(data.playlists || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const styles = {
    container: {
      maxWidth: 600,
      margin: '40px auto',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      padding: 20,
      backgroundColor: '#f9f9f9',
      borderRadius: 8,
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    },
    heading: {
      textAlign: 'center',
      color: '#222',
      marginBottom: 30,
    },
    inputGroup: {
      display: 'flex',
      gap: 10,
      marginBottom: 20,
    },
    input: {
      flexGrow: 1,
      padding: '10px 15px',
      fontSize: 16,
      borderRadius: 4,
      border: '1px solid #ccc',
      outlineColor: '#1DB954',
      transition: 'border-color 0.3s',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: '#1DB954',
      border: 'none',
      borderRadius: 4,
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      disabled: {
        backgroundColor: '#a0d6a0',
        cursor: 'not-allowed',
      },
    },
    error: {
      color: 'red',
      fontWeight: 'bold',
      marginBottom: 15,
      textAlign: 'center',
    },
    playlistList: {
      listStyleType: 'none',
      padding: 0,
      marginTop: 10,
    },
    playlistItem: {
      padding: 15,
      backgroundColor: 'white',
      marginBottom: 12,
      borderRadius: 6,
      boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
    },
    playlistLink: {
      color: '#1DB954',
      fontWeight: 'bold',
      fontSize: 18,
      textDecoration: 'none',
    },
    playlistDescription: {
      marginTop: 6,
      color: '#555',
      fontSize: 14,
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>AI Mood Playlist Generator</h1>
      <div style={styles.inputGroup}>
        <input
          type="text"
          placeholder="Enter your mood"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          style={styles.input}
          disabled={loading}
        />
        <button
          onClick={generatePlaylist}
          disabled={loading || !mood.trim()}
          style={{
            ...styles.button,
            ...(loading || !mood.trim() ? styles.button.disabled : {}),
          }}
        >
          {loading ? 'Generating...' : 'Generate Playlist'}
        </button>
      </div>
      {error && <div style={styles.error}>Error: {error}</div>}
      <ul style={styles.playlistList}>
        {playlists.map((p) => (
          <li key={p.id} style={styles.playlistItem}>
            <a
              href={p.url}
              target="_blank"
              rel="noreferrer"
              style={styles.playlistLink}
            >
              {p.name}
            </a>
            <p style={styles.playlistDescription}>{p.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
