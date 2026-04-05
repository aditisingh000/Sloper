from pydantic import BaseModel
from typing import List

class FabricRecommendation(BaseModel):
    name: str
    reason: str
    weight: str

class StitchGuide(BaseModel):
    needle_type: str
    stitch_length_mm: float
    tension_advice: str

class ConstructionStep(BaseModel):
    order: int
    component: str
    instruction: str

class AdviceResponse(BaseModel):
    fabrics: List[FabricRecommendation]
    stitch_guide: StitchGuide
    steps: List[ConstructionStep]

def get_construction_advice(image_filename: str | None = None, parameters: dict | None = None) -> AdviceResponse:
    """
    Groundwork for the Phase 2 RAG (Retrieval-Augmented Generation) Engine.
    
    Future Implementation:
    1. Pass `image` into Google Gemini (Vision LLM) or OpenAI GPT-4V to analyze drape, stiffness, and weave.
    2. Extract semantic search keywords mapping to a Knowledge Graph of construction techniques.
    3. Retrieve the optimal needle size, seam finishes, and fabric recommendations.
    
    Currently returns a mocked intelligence object for frontend scaffolding.
    """
    
    # Mock fallback logic
    return AdviceResponse(
        fabrics=[
            FabricRecommendation(
                name="Medium-weight Jersey Knit",
                reason="Provides the ideal 2-way stretch required for the basic T-shirt block while maintaining structure.",
                weight="180-200 GSM"
            ),
            FabricRecommendation(
                name="Cotton Interlock",
                reason="Slightly thicker and easier to sew for beginners, resisting curling at the edges.",
                weight="220 GSM"
            )
        ],
        stitch_guide=StitchGuide(
            needle_type="Ballpoint / Jersey (70/10 or 80/12)",
            stitch_length_mm=2.5,
            tension_advice="Loosen slightly (3-4 on standard machines) to prevent puckering on knits. Use a zigzag or stretch stitch."
        ),
        steps=[
            ConstructionStep(order=1, component="Shoulders", instruction="Place front and back bodices right sides together. Stitch shoulder seams."),
            ConstructionStep(order=2, component="Neckband", instruction="Fold neckband in half lengthwise, press. Pin to neckline stretching slightly to fit, and sew with a zigzag stitch."),
            ConstructionStep(order=3, component="Sleeves", instruction="Pin sleeve bell into the armscye flat. Stitch the curve."),
            ConstructionStep(order=4, component="Side Seams", instruction="Sew continuous seam from the sleeve hem down through the armpit to the bottom hem."),
            ConstructionStep(order=5, component="Hems", instruction="Fold sleeve and bottom hems by 2cm, press, and topstitch using a twin needle for a professional finish.")
        ]
    )
