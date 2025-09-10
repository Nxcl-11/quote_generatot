# Quote Generator

Author: YOUR NAME HERE

## Overview
A tiny web app that serves a random inspirational quote. Built with Next.js (App Router + TypeScript), Supabase (Postgres + Auth + RLS), and a component system based on shadcn/ui + Tailwind CSS.

## What It Does
- Frontend page lets the user fetch a random quote.
- Backend API route (`/api/quotes/random`) returns one random row from the `quotes` table.
- Quotes live in a Supabase Postgres database.

## Tech Stack
- Next.js 15.2.4 / React 19.1.1 / TypeScript
- Supabase JS client (database + potential auth)
- Tailwind CSS + shadcn/ui component primitives
- Vercel-ready deployment layout
- pnpm for dependency management

## Quick Start
Clone and install dependencies:
```bash
git clone <repo-url> quote-generator
cd quote-generator
npm install
```

Create a local `.env.local` file:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```
(These are found in your Supabase project settings > API.)

Run the dev server:
```bash
npm dev
```
Open: http://localhost:3000

Build for production:
```bash
npm build
npm start
```

## Database Schema (Minimal)
`quotes` table (expected columns):
- `id` (bigint / int8, primary key, ascending)
- `text` (text) – the quote content
- `author` (text) – quote author
- `created_at` (timestamptz, default now())

Example SQL:
```sql
create table if not exists quotes (
  id bigserial primary key,
  text text not null,
  author text,
  created_at timestamptz default now()
);
```
Add a few seed rows so the random API has data.

## Architecture
- Frontend (React components in `app/` and `components/`) renders the UI and calls the internal API using `fetch('/api/quotes/random')`.
- Backend (Next.js route handler at `app/api/quotes/random/route.ts`) creates a Supabase client (using public anon key) and:
  1. Counts total rows in `quotes`.
  2. Picks a random index.
  3. Fetches exactly that row with a ranged select.
  4. Returns JSON `{ quote: { id, text, author, created_at } }`.
- Database (Supabase Postgres) stores `quotes`. Row Level Security can be enabled; read policy must allow `select` for anon or authenticated users.
- Environment variables expose only the public anon key on the client; any privileged operations would go through a server-side key (not needed for simple public reads).

Data Flow:
User clicks button -> Frontend calls `/api/quotes/random` -> Route selects one row from Supabase -> JSON returned to frontend -> UI updates.

## Environment Variables
| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project REST/base URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public anon key for client + server edge reads |

(If you later need admin actions, add a server-only `SUPABASE_SERVICE_ROLE_KEY` and never expose it to the browser.)

## Error Handling
The random quote API returns:
- `200` with `{ quote: {...} }` on success
- `404` if there are zero rows or the random row cannot be fetched
- `500` if counting or row fetch fails (e.g., bad env vars / RLS misconfiguration)

Expect output similar to:
```json
{
  "quote": {
    "id": 3,
    "text": "Simplicity is the soul of efficiency.",
    "author": "Austin Freeman",
    "created_at": "2025-01-01T12:34:56.000Z"
  }
}
```

## Deployment Notes
- Set the two env vars in the hosting platform (e.g. Vercel project settings).
- Ensure `quotes` table exists and has data.
- Confirm RLS policies (if enabled) allow `select` for the anon role.

