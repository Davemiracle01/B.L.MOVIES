const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static('.'));
app.use('/videos', express.static('public/videos'));

// API route (replaces your api/movies.js)
app.get('/api/movies', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  let movies = [];

  const jsonPath = path.join(__dirname, 'movies.json');
  if (fs.existsSync(jsonPath)) {
    try {
      movies = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    } catch (e) {
      console.error('movies.json parse error:', e.message);
    }
  }

  const videosDir = path.join(__dirname, 'public', 'videos');
  if (fs.existsSync(videosDir)) {
    const files = fs.readdirSync(videosDir)
      .filter(f => f.toLowerCase().endsWith('.mp4'));
    files.forEach(file => {
      const url = `/videos/${encodeURIComponent(file)}`;
      if (!movies.find(m => m.url === url)) {
        const title = decodeURIComponent(file)
          .replace(/\.mp4$/i, '')
          .replace(/[-_.+]/g, ' ')
          .trim();
        movies.push({ title, url });
      }
    });
  }

  res.json(movies);
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
