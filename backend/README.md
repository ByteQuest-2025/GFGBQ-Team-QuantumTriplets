# CallShield FastAPI Backend

## Project Description

CallShield is a backend service built with FastAPI that provides two core functionalities:

- **Audio Transcription**: Upload an audio file and receive a text transcription.
- **Scam Call Analysis**: Analyze a transcription text to detect the likelihood of a scam call.

This backend is designed to be simple, clean, and easy to extend with real transcription and scam detection logic.

## Features

- REST API endpoints:
  - `POST /transcribe`: Accepts audio file uploads and returns the transcription text.
  - `POST /analyze`: Accepts transcription text and returns scam detection results.
- CORS enabled for all origins.
- Input validation and error handling.
- Placeholder logic for transcription and scam analysis (can be replaced with real services).
- Dockerfile included for containerized deployment.
- Automated tests with `pytest`.

## Prerequisites

- Python 3.10 or above
- Docker (optional, for containerized deployment)

## Installation

1. Clone the repository or extract the project archive.

2. (Optional) Create and activate a Python virtual environment:

       python3 -m venv venv
       source venv/bin/activate  # On Windows: venv\Scripts\activate

3. Install dependencies:

       pip install -r requirements.txt

## Configuration

- Copy `.env.example` to `.env` and set any environment variables if needed.

- Currently, the app does not require any mandatory environment variables but placeholders are there for future integration with external services.

## Running the Application

### Locally

Run the FastAPI server with Uvicorn:

    uvicorn app.main:app --reload

The API will be available at `http://127.0.0.1:8000`.

### Using Docker

Build and run the Docker container:

    docker build -t callshield-backend .
    docker run -d -p 8000:8000 callshield-backend

## API Usage

### 1. Transcribe Audio

- **Endpoint:** `POST /transcribe`
- **Description:** Upload an audio file to get the transcription text.
- **Request:** Multipart form with file under key `file`.
- **Response:**
  
      {
          "transcription": "Transcribed text here..."
      }

- **Example using `curl`:**

      curl -X POST "http://127.0.0.1:8000/transcribe" \
           -F "file=@your_audio_file.wav"

### 2. Analyze Transcription

- **Endpoint:** `POST /analyze`
- **Description:** Analyze transcription text for scam likelihood.
- **Request JSON:**

      {
          "transcription": "You have won a lottery prize!"
      }

- **Response JSON:**

      {
          "is_scam": true,
          "scam_score": 0.5,
          "matched_keywords": ["lottery", "prize"]
      }

- **Example using `curl`:**

      curl -X POST "http://127.0.0.1:8000/analyze" \
           -H "Content-Type: application/json" \
           -d '{"transcription":"You have won a lottery prize!"}'

## Running Tests

Run tests with `pytest`:

    pytest tests/

## Troubleshooting

- **Error: `ModuleNotFoundError`**  
  Ensure you have installed dependencies using `pip install -r requirements.txt`.

- **Audio file upload issues**  
  Make sure to upload valid audio files with proper `Content-Type`.

- **Port already in use**  
  Change the port by running `uvicorn app.main:app --reload --port 8080` or stop the conflicting process.

## Project Structure

