const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-store');

  let movies = [];

  // 1. Read from movies.json (supports external URLs too)
  const jsonPath = path.join(process.cwd(), 'movies.json');
  if (fs.existsSync(jsonPath)) {
    try {
      movies = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    } catch (e) {
      console.error('movies.json parse error:', e.message);
    }
  }

  // 2. Also scan public/videos/ for local .mp4 files
  const videosDir = path.join(process.cwd(), 'public', 'videos');
  if (fs.existsSync(videosDir)) {
    const files = fs.readdirSync(videosDir)
      .filter(f => f.toLowerCase().endsWith('.mp4'));

    files.forEach(file => {
      // Encode every part of the filename so ANY character is safe in a URL
      const url = `/videos/${encodeURIComponent(file)}`;
      if (!movies.find(m => m.url === url)) {
        // Decode for human-readable title
        const title = decodeURIComponent(file)
          .replace(/\.mp4$/i, '')
          .replace(/[-_.+]/g, ' ')
          .replace(/\s{2,}/g, ' ')
          .trim();
        movies.push({ title, url });
      }
    });
  }

  res.status(200).json(movies);
};
