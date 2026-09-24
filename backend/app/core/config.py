"""
Application configuration.

Settings are loaded from environment variables (and a local .env file in
development). Never hardcode secrets here — see .env.example for the list
of variables the app expects.
"""
from functools import lru_cache

from pydantic import field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # Database
    database_url: str = "postgresql+psycopg://postgres:postgres@localhost:5432/medlens"

    # CORS - the deployed frontend origin (e.g. https://medlens.up.railway.app)
    frontend_url: str = "http://localhost:3000"

    # OpenAI (server-side only — never expose to the frontend)
    openai_api_key: str = ""

    # App metadata
    app_name: str = "medlens-api"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @field_validator("database_url")
    @classmethod
    def _use_psycopg3_driver(cls, value: str) -> str:
        """
        Railway (and other hosts) provide DATABASE_URL as plain
        postgresql:// or postgres://, which SQLAlchemy defaults to the
        psycopg2 driver. This project uses psycopg3 instead, so normalize
        the scheme to postgresql+psycopg:// regardless of source.
        """
        if value.startswith("postgres://"):
            return "postgresql+psycopg://" + value[len("postgres://") :]
        if value.startswith("postgresql://"):
            return "postgresql+psycopg://" + value[len("postgresql://") :]
        return value


@lru_cache
def get_settings() -> Settings:
    return Settings()
