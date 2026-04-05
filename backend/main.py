from fastapi import FastAPI, UploadFile, File, Form
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uuid
import os
from geometry import create_scaled_pattern
from rag import get_construction_advice, AdviceResponse

app = FastAPI(title="Sloper API", version="0.1.0")

# Setup CORS for the Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Measurements(BaseModel):
    bust: float
    waist: float

class PatternResponse(BaseModel):
    pattern_id: str
    status: str
    message: str
    pdf_url: str | None = None

@app.get("/health")
def health_check():
    return {"status": "ok", "message": "Sloper API is running"}

@app.post("/api/generate-pattern", response_model=PatternResponse)
async def generate_pattern(
    bust: float = Form(...),
    waist: float = Form(...),
    image: UploadFile = File(None)
):
    """
    Mock endpoint for Phase 1 MVP.
    Takes measurements and an image, returns a mock pattern generation status.
    """
    if image:
        print(f"Received image: {image.filename}")
    
    print(f"Scaling geometry for Bust: {bust}, Waist: {waist}")
    
    mock_id = str(uuid.uuid4())
    os.makedirs("output", exist_ok=True)
    out_path = f"output/{mock_id}.svg"
    
    create_scaled_pattern(bust, waist, out_path)
    
    return PatternResponse(
        pattern_id=mock_id,
        status="success",
        message="Created draft pattern using basic T-shirt block.",
        pdf_url=f"/api/download/{mock_id}"
    )

@app.get("/api/download/{pattern_id}")
async def download_pattern(pattern_id: str):
    """
    Download the generated SVG/PDF.
    """
    path = f"output/{pattern_id}.svg"
    if os.path.exists(path):
        return FileResponse(path, media_type="image/svg+xml", filename=f"sloper_pattern_{pattern_id}.svg")
    return {"error": "Pattern not found"}

@app.post("/api/advice", response_model=AdviceResponse)
async def construction_advice(
    image: UploadFile = File(None)
):
    """
    Groundwork endpoint for Phase 2: RAG Construction Advice
    """
    image_name = image.filename if image else None
    return get_construction_advice(image_filename)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
