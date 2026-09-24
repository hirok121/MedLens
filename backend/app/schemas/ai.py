"""
Pydantic schemas for the OpenAI integration test endpoint.
"""
from pydantic import BaseModel, Field


class AITestRequest(BaseModel):
    prompt: str = Field(..., min_length=1, max_length=4000)


class AITestResponse(BaseModel):
    response: str
