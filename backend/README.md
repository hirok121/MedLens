# MedLens API (FastAPI)

Backend for MedLens, an AI-powered clinical decision-support assistant.
This is the initial foundation only — no auth, no real medical/AI logic yet.

## Local setup

```bash
python -m venv .venv
.venv\Scripts\activate        # Windows
# source .venv/bin/activate   # macOS/Linux

pip install -r requirements.txt

copy .env.example .env        # Windows
# cp .env.example .env        # macOS/Linux
# then fill in DATABASE_URL / OPENAI_API_KEY
```

## Run the dev server

```bash
uvicorn app.main:app --reload
```

- API: http://localhost:8000
- Swagger docs: http://localhost:8000/docs

## Database migrations (Alembic)

```bash
alembic upgrade head                       # apply migrations
alembic revision --autogenerate -m "..."   # create a new migration
```

## Project structure

```
app/
├── core/         # config + database engine/session
├── models/       # SQLAlchemy models
├── schemas/      # Pydantic request/response schemas
├── routes/       # API route handlers
├── services/     # external integrations (OpenAI, etc.)
└── main.py       # FastAPI app entrypoint
alembic/          # migrations
```

## Endpoints

- `GET /health`
- `GET /api/patients`
- `POST /api/patients`
- `POST /api/ai/test` — OpenAI integration test (server-side key only)

## Deployment (Railway)

Start command (see `Procfile`):

```
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Required environment variables on Railway:

- `DATABASE_URL`
- `OPENAI_API_KEY`
- `FRONTEND_URL`
