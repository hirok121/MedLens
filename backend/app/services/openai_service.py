"""
OpenAI integration service.

Isolates all OpenAI SDK usage so routes stay thin. The API key lives only
in this backend's environment (OPENAI_API_KEY) and is never sent to or
exposed in the frontend.

This is a simple integration-test implementation, not the future
clinical AI layer.
"""
from openai import OpenAI

from app.core.config import get_settings

settings = get_settings()

_client: OpenAI | None = None


def _get_client() -> OpenAI:
    global _client
    if _client is None:
        if not settings.openai_api_key:
            raise RuntimeError(
                "OPENAI_API_KEY is not set. Add it to the backend environment."
            )
        _client = OpenAI(api_key=settings.openai_api_key)
    return _client


def get_ai_response(prompt: str) -> str:
    """Send a prompt to OpenAI and return the plain-text response."""
    client = _get_client()

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=500,
    )

    return completion.choices[0].message.content or ""
