<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Session Progress (Jun 18, 2026)

## What changed
- Members split into Team / Former / Collaborator sections (group field added to Member interface)
- 31 team members, 10 former members (Wasim, Rajath Shenoy, Vasanthan, Amreen, Pradeepa, Sanjukta, Alexander, Arnold, plus existing), 0 collaborators section visible
- National collaborators: 5 named individuals (Dr. Jeyaraj Pandian, Dr. Sivakumar, Dr. Sivakumar Balasubramanian, Dr. Karthik Babu, Dr. Dorcas Gandhi)
- International collaborators: 13 named individuals (Dr. Mindy F Levin, Dr. Julie Bernhardt, Dr. Coralie English, Dr. Philippe Archambault, Dr. Dario Liebermann, Dr. Janice Eng, Dr. Heidi Janssen, Dr. Marie-Louise Bird, Dr. Catherine Sackley, Dr. Sangeetha Madhavan, Dr. Chitra Balasubramanian, Dr. Sandeep Subramanian, Dr. Anna Kuppuswamy)
- Collaborator logos: institution logos retained where available; placeholder.svg used for entries without logos (shows name as text)
- International grid changed to md:grid-cols-5 to match national
- DU logo uses DU.svg.png from source (1280x1279, RGBA, no bg removal)
- New intl logos added: AU, DU, UOB, UOG, UOL, UOM (backgrounds removed except DU)
- UCL removed from collaborators list (re-added as Dr. Anna Kuppuswamy with ucl.png)
- IITH and ASSA removed from national collaborators
- KCL logo re-rendered via sharp at 923x703 (native SVG size), then replaced with user's KCL.png (1240x944)
- UCL, UOT, UTHSC backgrounds removed via Pillow
- Focus areas: 2 new cards (Evidence Based Practice #04, Assessment & Predictions #05) centered below original 3
- Nav logo: h-20
- Qualifications reversed (earliest degree first)

## Build
`cd frontend && npm run build` — 12 static routes, zero errors
