from pydantic import BaseModel, Field
from typing import List


class TranscribeResponse(BaseModel):
    transcription: str = Field(..., example="Hello, this is a sample transcription.")


class AnalyzeRequest(BaseModel):
    transcription: str = Field(..., min_length=1, example="You are a lottery winner! Please send your bank details.")


class AnalyzeResponse(BaseModel):
    is_scam: bool = Field(..., example=True)
    scam_score: float = Field(..., ge=0.0, le=1.0, example=0.75)
    matched_keywords: List[str] = Field(default_factory=list, example=["lottery", "bank"])
