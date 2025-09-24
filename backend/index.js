require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenAI } = require('@google/genai');

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Test endpoint to confirm backend working
app.get('/test', (req, res) => {
  res.json({ message: 'Backend is working' });
});

// Initialize Gemini AI client
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Function to get Spotify access token using client credentials flow
async function getSpotifyAccessToken() {
  // Dynamically import fetch to fix 'fetch is not a function' issue in Node.js
  const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64'),
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
}

app.post('/api/generate-playlist', async (req, res) => {
  const mood = req.body.mood;
  console.log('Mood received:', mood);

  try {
    // Use Gemini AI to get mood keywords
    const aiResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze this mood and give me concise mood keywords only: ${mood}`,
    });

    const moodKeywords = aiResponse.text.trim();
    console.log('Mood keywords from Gemini AI:', moodKeywords);

    // Get Spotify API access token
    const token = await getSpotifyAccessToken();

    // Dynamically import fetch for Spotify search
    const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

    // Search Spotify playlists with mood keywords
    const spotifyResponse = await fetch(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        moodKeywords
      )}&type=playlist&limit=5`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const spotifyData = await spotifyResponse.json();

    // Extract relevant playlist info safely
    const playlists =
      spotifyData.playlists && spotifyData.playlists.items
        ? spotifyData.playlists.items
            .filter(p => p && p.id && p.external_urls)
            .map(p => ({
              id: p.id,
              name: p.name,
              description: p.description || '',
              url: p.external_urls.spotify,
            }))
        : [];

    // Send playlists as JSON response
    res.json({ playlists });
  } catch (error) {
    console.error('ERROR ON BACKEND:', error);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
