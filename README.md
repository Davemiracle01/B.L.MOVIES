# B.L. MOVIES SITE — Deployment Guide

## Quick Deploy to Vercel

### Option 1 — Vercel CLI (Fastest)
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Option 2 — GitHub + Vercel Dashboard
1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → Import your repo
3. Click Deploy — done.

---

## Adding Movies

### For LARGE video files (recommended)
Host your videos on any storage service (Google Drive, Mega, Dropbox, VPS, etc.)
Then edit `movies.json`:

```json
[
  {
    "title": "Movie Name Here",
    "url": "https://your-direct-video-link.com/movie.mp4"
  }
]
```

The URL must be a **direct .mp4 link** (not a webpage).

### For SMALL video files (under 50MB each)
Drop `.mp4` files into `public/videos/`
They will be auto-detected — no config needed.

⚠️  Vercel Hobby plan has a 100MB total deployment limit.
    For larger videos always use external URLs in movies.json.

---

## File Structure
```
bl-movies/
  index.html          ← Main site
  movies.json         ← Add your video URLs here
  vercel.json         ← Vercel config (don't edit)
  api/
    movies.js         ← Auto-reads movies.json + public/videos/
  public/
    videos/           ← Drop small .mp4s here
```

## To add a new movie
Just add a line to `movies.json` and redeploy:
```bash
vercel --prod
```
