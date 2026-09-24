"""
Pydantic schemas for patient request/response validation.
"""
from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class PatientBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=255)
    age: int = Field(..., ge=0, le=150)
    gender: str = Field(..., min_length=1, max_length=50)


class PatientCreate(PatientBase):
    """Payload for creating a new patient."""

    pass


class PatientResponse(PatientBase):
    """Patient data returned by the API."""

    id: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
