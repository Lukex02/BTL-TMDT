# BTL-TMDT Project Setup

This repository contains two apps:

- `backend/`: NestJS API using Supabase as the database layer
- `frontend/`: React + Vite client that talks to the backend API

## Prerequisites

- Node.js 18+ and npm
- A Supabase project
- Git

## Project Structure

```text
BTL-TMDT/
  backend/
  frontend/
  README.md
```

## 1) Backend Setup

Go to the backend folder:

```bash
cd backend
npm install
```

Create a `.env` file in `backend/` with your Supabase credentials:

```env
SUPABASE_URI=https://your-project.supabase.co
SUPABASE_PUBLISHABLE_KEY=your_publishable_key
SUPABASE_ANON_KEY=your_anon_key
PORT=3000
```

Notes:

- `SUPABASE_URI` and `SUPABASE_PUBLISHABLE_KEY` are required by the backend Supabase client.
- `PORT` is optional; if omitted, the backend runs on `3000`.
- Keep real keys out of git.

Run the backend:

```bash
npm run start:dev
```

Useful backend scripts:

- `npm run start` - run once
- `npm run start:dev` - watch mode
- `npm run build` - production build
- `npm run test` - unit tests

Swagger is available at:

```text
http://localhost:3000/api
```

## 2) Frontend Setup

Go to the frontend folder:

```bash
cd ../frontend
npm install
```

Run the frontend:

```bash
npm run dev
```

Useful frontend scripts:

- `npm run dev` - start Vite dev server
- `npm run build` - create production build
- `npm run preview` - preview the production build

## 3) How the Apps Connect

- The frontend currently calls the backend at `http://localhost:3000`.
- If you run the backend on a different port or host, update the API base URLs inside `frontend/src/services/*`.
- The backend enables CORS, so the frontend can talk to it during local development.

## 4) Typical Local Start Order

1. Start the backend in `backend/`
2. Start the frontend in `frontend/`
3. Open the frontend URL shown by Vite in your browser

## 5) Quick Troubleshooting

- If API calls fail, confirm the backend is running on the expected port.
- If authentication or database features fail, re-check the Supabase values in `backend/.env`.
- If the frontend shows stale data, clear browser storage for the app and reload.

## 6) Folder-Level Docs

- Backend guide: [backend/README.md](backend/README.md)
- Frontend guide: [frontend/README.md](frontend/README.md)
