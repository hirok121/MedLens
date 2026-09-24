# MedLens

An AI-powered clinical decision-support assistant.

This repository contains the **initial foundation** for MedLens: a clean,
minimal full-stack setup that will later expand to support patient history
analysis, symptoms, lab results, and AI-assisted differential diagnosis.
No real medical/AI logic, and no authentication, is implemented yet.

## Project structure

```
gpfuturemakers/
├── frontend/    # Next.js (App Router) + TypeScript + Tailwind CSS
└── backend/     # FastAPI + SQLAlchemy + Alembic + PostgreSQL
```

## Tech stack

**Frontend:** Next.js, TypeScript, App Router, Tailwind CSS
**Backend:** FastAPI, Pydantic, SQLAlchemy, Alembic, PostgreSQL

## Setup commands

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
pip install -r requirements.txt
copy .env.example .env        # then fill in DATABASE_URL / OPENAI_API_KEY
```

### Frontend

```bash
cd frontend
npm install
copy .env.example .env.local
```

## Environment variables

**backend/.env**
```
DATABASE_URL=postgresql://user:password@localhost:5432/medlens
OPENAI_API_KEY=
FRONTEND_URL=http://localhost:3000
```

**frontend/.env.local**
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Database migrations

```bash
cd backend
alembic upgrade head
```

To create a new migration after changing models:

```bash
alembic revision --autogenerate -m "describe change"
```

## Local development

Run both in separate terminals:

```bash
# backend
cd backend
uvicorn app.main:app --reload
```

```bash
# frontend
cd frontend
npm run dev
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Swagger docs: http://localhost:8000/docs
- AI integration test page: http://localhost:3000/ai-test

## Railway deployment

Deploy as **three** Railway services:

1. **PostgreSQL** — Railway's managed Postgres plugin. Copy its connection
   string into the backend service's `DATABASE_URL`.
2. **Backend (FastAPI)** — root directory `backend/`.
   - Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
     (also defined in `backend/Procfile`)
   - Env vars: `DATABASE_URL`, `OPENAI_API_KEY`, `FRONTEND_URL`
   - Run `alembic upgrade head` (Railway shell or a release command) after
     the first deploy to create tables.
3. **Frontend (Next.js)** — root directory `frontend/`.
   - Build command: `npm run build`
   - Start command: `npm run start`
   - Env vars: `NEXT_PUBLIC_API_URL=https://<backend-service>.up.railway.app`

After the frontend has a Railway URL, set the backend's `FRONTEND_URL` to
that URL so CORS allows it.

## What's intentionally NOT included yet

- Authentication
- Real medical/AI diagnosis logic
- Complex state management / analytics
- Custom ML models

The `/ai-test` page and `POST /api/ai/test` endpoint exist only to verify
the Next.js → FastAPI → OpenAI → FastAPI → Next.js integration works, both
locally and after Railway deployment. The OpenAI API key is only ever read
server-side by FastAPI (`backend/app/services/openai_service.py`) and is
never exposed to the frontend.
