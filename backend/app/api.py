from fastapi import APIRouter, UploadFile, File, HTTPException, status
from fastapi.responses import JSONResponse
from app.schemas import TranscribeResponse, AnalyzeRequest, AnalyzeResponse
from typing import Optional
import io

router = APIRouter()


@router.post("/transcribe", response_model=TranscribeResponse, status_code=status.HTTP_200_OK)
async def transcribe_audio(file: UploadFile = File(...)):
    """
    Transcribe the uploaded audio file to text.
    """
    # Validate file content type
    if not file.content_type.startswith("audio/"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file type. Please upload an audio file.",
        )

    try:
        # Read file content (limited size to 10MB to prevent abuse)
        contents = await file.read()
        if len(contents) == 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Empty audio file uploaded.",
            )
        if len(contents) > 10 * 1024 * 1024:
            raise HTTPException(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                detail="Audio file too large. Max size: 10MB.",
            )

        # Placeholder transcription logic:
        # In production, integrate with a real speech-to-text service
        # For demo, return fixed string regardless of audio content
        transcription_text = "This is a placeholder transcription of the uploaded audio."

        return TranscribeResponse(transcription=transcription_text)

    except Exception as e:
        # Log error in real app, here just raise HTTPException
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to process the audio file.",
        )


@router.post("/analyze", response_model=AnalyzeResponse, status_code=status.HTTP_200_OK)
async def analyze_transcription(request: AnalyzeRequest):
    """
    Analyze the transcription text to detect scam likelihood.
    """
    text = request.transcription.strip()
    if not text:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Transcription text cannot be empty.",
        )

    try:
        # Placeholder scam analysis logic:
        # In production, use ML model or external API
        # Simple heuristic: if certain scam keywords exist, mark as scam

        scam_keywords = {"prize", "winner", "urgent", "bank", "password", "credit card", "social security", "lottery"}
        text_lower = text.lower()
        matches = [word for word in scam_keywords if word in text_lower]

        scam_score = min(len(matches) / len(scam_keywords), 1.0)  # score between 0 and 1
        is_scam = scam_score >= 0.3  # threshold for scam detection

        return AnalyzeResponse(
            is_scam=is_scam,
            scam_score=round(scam_score, 2),
            matched_keywords=matches,
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to analyze the transcription text.",
        )
