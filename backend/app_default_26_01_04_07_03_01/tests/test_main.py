import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_transcribe_valid_audio():
    # Use a small sample audio file bytes (empty but with valid content-type)
    audio_content = b"RIFF$\x00\x00\x00WAVEfmt "  # partial WAV header bytes for test
    response = client.post(
        "/transcribe",
        files={"file": ("test.wav", audio_content, "audio/wav")},
    )
    assert response.status_code == 200
    data = response.json()
    assert "transcription" in data
    assert isinstance(data["transcription"], str)
    assert len(data["transcription"]) > 0


def test_transcribe_invalid_file_type():
    response = client.post(
        "/transcribe",
        files={"file": ("test.txt", b"not audio content", "text/plain")},
    )
    assert response.status_code == 400
    data = response.json()
    assert data["detail"] == "Invalid file type. Please upload an audio file."


def test_transcribe_empty_file():
    response = client.post(
        "/transcribe",
        files={"file": ("empty.wav", b"", "audio/wav")},
    )
    assert response.status_code == 400
    data = response.json()
    assert data["detail"] == "Empty audio file uploaded."


def test_analyze_valid_text():
    payload = {"transcription": "You are an urgent winner of a lottery prize!"}
    response = client.post("/analyze", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert data["is_scam"] is True
    assert data["scam_score"] > 0
    assert "lottery" in data["matched_keywords"]


def test_analyze_empty_text():
    payload = {"transcription": "   "}
    response = client.post("/analyze", json=payload)
    assert response.status_code == 400
    data = response.json()
    assert data["detail"] == "Transcription text cannot be empty."
