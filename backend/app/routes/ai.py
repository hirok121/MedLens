"""
AI integration test route.

This exists only to verify the Next.js -> FastAPI -> OpenAI -> FastAPI ->
Next.js round trip works end-to-end (including after Railway deployment).
It is not a medical diagnosis feature.
"""
from fastapi import APIRouter, HTTPException

from app.schemas.ai import AITestRequest, AITestResponse
from app.services.openai_service import get_ai_response

router = APIRouter(prefix="/api/ai", tags=["ai"])


@router.post("/test", response_model=AITestResponse)
def test_ai(payload: AITestRequest):
    try:
        response_text = get_ai_response(payload.prompt)
    except RuntimeError as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    except Exception as exc:  # noqa: BLE001 - surface upstream OpenAI errors as 502
        raise HTTPException(status_code=502, detail=f"OpenAI request failed: {exc}") from exc

    return AITestResponse(response=response_text)
