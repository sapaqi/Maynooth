# Maynooth DZ — static website

All site files are in `website/`. No build or dependencies are required.

Local preview: `python -m http.server 8000 --directory website`, then open http://localhost:8000.
GitHub Pages: publish the contents of website as the site root (for example from a gh-pages branch).
Netlify: publish directory `website` (set in netlify.toml). For a manual upload, upload the contents of website.

`index.html` is the standard homepage. `home-gradient.html` is the alternative with the Figma Moving gradient at 25% opacity (WebGPU). `compare-hero.html` compares them.

Current update: approved larger category pins, white outline, unchanged illustration size, stronger shadow; homepage hero shows the complete current map; Wander the map uses a center crop. Map page retains its full-resolution detail tiles and zoom behavior.

Project locations remain illustrative. Three Resources PDFs are still awaiting supplied files; those entries are labelled PDF coming soon. No CMS/backend is included.
