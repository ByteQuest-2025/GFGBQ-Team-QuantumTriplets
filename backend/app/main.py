from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import router as api_router


app = FastAPI(
    title="CallShield API",
    description="API for transcription and scam call analysis",
    version="1.0.0",
)

# Enable CORS for all origins (adjust origins as needed for production)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
