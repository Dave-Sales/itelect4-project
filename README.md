# Campus Lost & Found

[![CI](https://github.com/Dave-Sales/itelect4-project/actions/workflows/ci.yml/badge.svg)](https://github.com/Dave-Sales/itelect4-project/actions/workflows/ci.yml)

## Local development

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and set `VITE_API_URL` to the backend origin (for example, `http://localhost:4000`).
3. Start the frontend with `npm run dev`.

The backend is in the sibling `itelect4-backend` repository. The frontend calls its `/api` routes and sends bearer tokens only on authenticated requests. Register at `/register` or sign in at `/login`.

Signed-in users can visit `/review` to submit a project description for AI feedback. The Gemini key is configured only by the backend and is never sent to this app.

## Production

Deploy this repository as a Vite project on Vercel and set `VITE_API_URL` to the backend origin, without an `/api` suffix. Vite reads this value at build time, so redeploy after changing it.

Build locally with `npm run build`.
