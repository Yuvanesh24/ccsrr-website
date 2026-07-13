# CCSRR Website

**Centre for Comprehensive Stroke Rehabilitation & Research (CCSRR)** — a research centre under MAHE Manipal, founded in 2016.

## Tech Stack

| Layer       | Technology                                                  |
| ----------- | ----------------------------------------------------------- |
| **Frontend**  | Next.js 16 (App Router), TypeScript, Tailwind CSS v4         |
| **CMS**       | Strapi 5 (headless CMS, self-hosted or cloud)                |
| **Database**  | SQLite (dev) / PostgreSQL (prod)                             |
| **Hosting**   | Vercel (frontend) + VPS/Cloud (Strapi CMS)                   |
| **UI Library**| shadcn/ui (base-ui), Framer Motion, Lucide Icons             |

## Project Structure

```
ccsrr-website/
├── frontend/                  # Next.js application
│   ├── public/
│   │   └── placeholder.svg    # Placeholder images
│   ├── src/
│   │   ├── app/               # App Router pages
│   │   │   ├── layout.tsx     # Root layout (Header + Footer)
│   │   │   ├── page.tsx       # Home page
│   │   │   ├── about/
│   │   │   ├── members/
│   │   │   ├── projects/
│   │   │   ├── devices/
│   │   │   ├── events/
│   │   │   ├── publications/
│   │   │   ├── gallery/
│   │   │   ├── contact/
│   │   │   ├── api/contact/   # Contact form API
│   │   │   ├── sitemap.ts
│   │   │   ├── robots.ts
│   │   │   └── not-found.tsx
│   │   ├── components/
│   │   │   ├── ui/            # shadcn/ui components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   ├── StatusBadge.tsx
│   │   │   ├── MemberCard.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── PhDProjectCard.tsx
│   │   │   ├── StudentProjectCard.tsx
│   │   │   ├── DeviceCard.tsx
│   │   │   ├── EventCard.tsx
│   │   │   ├── PublicationCard.tsx
│   │   │   ├── GalleryGrid.tsx
│   │   │   └── ContactForm.tsx
│   │   ├── data/              # Mock/placeholder data
│   │   │   ├── site-content.ts
│   │   │   ├── members.ts
│   │   │   ├── projects.ts
│   │   │   ├── devices.ts
│   │   │   ├── events.ts
│   │   │   ├── publications.ts
│   │   │   └── gallery.ts
│   │   └── lib/
│   │       ├── utils.ts
│   │       └── api.ts         # Strapi API helpers
│   ├── .env.example
│   ├── .env.local             # Local env vars (gitignored)
│   └── package.json
├── cms/                       # Strapi CMS
│   ├── config/
│   ├── src/
│   │   ├── api/
│   │   │   ├── member/
│   │   │   ├── project/
│   │   │   ├── device/
│   │   │   ├── event/
│   │   │   ├── publication/
│   │   │   ├── gallery-item/
│   │   │   └── page-content/
│   │   └── index.js
│   ├── .env.example
│   └── package.json
├── .env.example
└── README.md
```

## Quick Start

### Prerequisites

- Node.js 18+
- npm

### 1. Frontend (Next.js)

```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev
```

The frontend will be available at **http://localhost:3000**.

### 2. CMS (Strapi)

```bash
cd cms
cp .env.example .env
npm install
npm run build
npm run develop
```

The Strapi admin panel will be available at **http://localhost:1337/admin**.

> **First run**: Create an admin account at the Strapi admin panel, then go to **Settings → API Tokens** to generate an API token for the frontend.

### 3. Connect Frontend to CMS

Update `frontend/.env.local`:

```
NEXT_PUBLIC_STRAPI_API_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=your-generated-token
```

## Content Management

### Adding Content via Strapi Admin

1. Navigate to `http://localhost:1337/admin`
2. Use the Content Manager to add/edit:

| Content Type     | Description                         |
| ---------------- | ----------------------------------- |
| Members          | Team members with photos            |
| Projects         | Funded, PhD, and Student projects   |
| Devices          | Rehabilitation equipment            |
| Events           | Workshops, seminars, activities     |
| Publications     | Research papers and chapters        |
| Gallery Items    | Photos organized by category        |
| Page Content     | Vision, Mission, Objectives text    |

### Placeholder Content

The frontend includes placeholder data in `src/data/` for development. Replace with CMS data by updating the API helper functions in `src/lib/api.ts`.

## Adding/Updating Content (Without CMS)

Edit the files in `src/data/`:

| File               | Content                                                    |
| ------------------ | ---------------------------------------------------------- |
| `site-content.ts`  | Vision, Mission, Objectives, coordinator bio, about text   |
| `members.ts`       | Team members with categories (Coordinator/Faculty/Scholar) |
| `projects.ts`      | Funded, PhD, and Student projects with statuses            |
| `devices.ts`       | Rehabilitation devices with specifications                 |
| `events.ts`        | Workshops, seminars, and other events                      |
| `publications.ts`  | Research publications with DOI/links                       |
| `gallery.ts`       | Gallery images and categories                              |

## Deployment

### Vercel (Frontend)

1. Push the `frontend/` directory to a GitHub repo
2. Import project in Vercel
3. Set environment variables:
   - `NEXT_PUBLIC_SITE_URL` = `https://ccsrr.manipal.in`
   - `NEXT_PUBLIC_STRAPI_API_URL` = URL of your hosted Strapi instance
   - `NEXT_PUBLIC_STRAPI_API_TOKEN` = Strapi API token
4. Deploy

### Strapi CMS

**Option A: Strapi Cloud** (easiest)
- Deploy directly from Strapi Cloud dashboard

**Option B: VPS with PostgreSQL**
```bash
# Set up PostgreSQL database
createdb ccsrr_cms

# Clone and configure
git clone <repo>
cd cms
npm install
npm run build

# Use PM2 for process management
npm install -g pm2
pm2 start npm --name "ccsrr-cms" -- run start
```

### Domain Setup (ccsrr.manipal.in)

1. Add a `CNAME` record pointing `ccsrr.manipal.in` to `cname.vercel-dns.com`
2. In Vercel project settings, add the custom domain
3. For Strapi, use a subdomain like `cms.ccsrr.manipal.in` or a separate path

### Static Export (Alternative)

For deployment on a standard web server:

```bash
cd frontend
npm run build
# Output will be in frontend/out/
```

> Note: Static export disables API routes (contact form) and dynamic features.

## Build Commands

```bash
# Frontend
cd frontend
npm run dev       # Development server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # Run linter

# CMS
cd cms
npm run develop   # Development with auto-reload
npm run build     # Build admin panel
npm run start     # Production server
```

## Environment Variables

### Frontend (`frontend/.env.local`)

| Variable                      | Description                          |
| ----------------------------- | ------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`        | Public site URL                      |
| `NEXT_PUBLIC_STRAPI_API_URL`  | Strapi API base URL                  |
| `NEXT_PUBLIC_STRAPI_API_TOKEN`| Strapi API token                     |

### CMS (`cms/.env`)

| Variable               | Description                |
| ---------------------- | -------------------------- |
| `HOST`                 | Server host (0.0.0.0)      |
| `PORT`                 | Server port (1337)         |
| `APP_KEYS`             | Strapi app keys            |
| `ADMIN_JWT_SECRET`     | Admin JWT secret           |
| `API_TOKEN_SALT`       | API token salt             |
| `DATABASE_CLIENT`      | `sqlite` or `postgres`     |

## Features

- ✅ Fully responsive (mobile, tablet, laptop, desktop)
- ✅ SEO-optimized with sitemap.xml and robots.txt
- ✅ Open Graph and Twitter card metadata
- ✅ WCAG-compliant accessibility (keyboard nav, alt text, contrast)
- ✅ Status badges (Green=Ongoing, Blue=Completed, Orange=Upcoming)
- ✅ Filterable members, projects, events, publications
- ✅ Gallery with lightbox view
- ✅ Contact form with email integration
- ✅ CMS-ready architecture (Strapi content types pre-configured)
- ✅ Placeholder data ready for content replacement


