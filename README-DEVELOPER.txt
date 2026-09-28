MAYNOOTH DZ — ORIGINAL DEMO
===========================
Static HTML / CSS / JavaScript website. No build, backend, database, Node.js,
API keys or external platform account is required to host this demo.

DEPLOYMENT
1. Extract this ZIP.
2. Upload the CONTENTS of the website/ folder to the chosen web directory.
   Keep all files and the assets/ directory together and preserve filenames.
3. Serve index.html as the directory index. HTTPS is recommended.
4. The site works at a domain root or inside a subdirectory. Do not add SPA
   rewrites: each .html URL must resolve to its actual file. Preserve query
   strings used by project.html, article.html and map.html.
5. Configure team access on your hosting server if required. This export
   includes no login or access restriction. Anyone who can access that server
   location can view the demo, without a ChatGPT account.

PAGES
index.html — original homepage (not the alternative design)
projects.html — project directory and filters
project.html?id=demohouse-retrofit — project details
map.html — interactive illustrative project map
take-action.html — retrofit pathway
community.html — community updates
article.html?id=picnic — article details (also id=map)
resources.html — resource links

DEMO BEHAVIOUR
- Header megamenus show illustrative labels; main navigation links work.
- Project data, some article content and map pins are demonstration content.
- Newsletter form validates input and prepares a mailto request; it does NOT
  save subscribers or send email automatically. A mailing service integration
  is needed for production. Other mailto links open the visitor's email app.
- Resource links use third-party websites. Energy Master Plan uses a request
  for a copy by email.
- Project summary downloads are generated HTML, not official project PDFs.
- Fonts, images, icons and frontend scripts are bundled locally.
- The alternative homepage and its styles are intentionally excluded.

QUICK LOCAL PREVIEW (optional)
In the website/ directory: python -m http.server 8080
Then open http://localhost:8080/ . This is only a local preview server.

Handoff: 25 September 2026
