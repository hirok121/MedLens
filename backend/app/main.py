"""
MedLens API entrypoint.

Run locally with:
    uvicorn app.main:app --reload
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.routes import ai, health, patients

settings = get_settings()

app = FastAPI(
    title="MedLens API",
    description="Backend API for MedLens, an AI-powered clinical decision-support assistant.",
    version="0.1.0",
)

# Allow the local Next.js dev server plus the configurable production frontend origin.
allowed_origins = {"http://localhost:3000", settings.frontend_url}

app.add_middleware(
    CORSMiddleware,
    allow_origins=list(allowed_origins),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(patients.router)
app.include_router(ai.router)
