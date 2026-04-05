import math
from shapely.geometry import Polygon
import svgwrite
from copy import deepcopy

class TShirtPatternGenerator:
    def __init__(self, bust: float, waist: float, units: str = "cm"):
        self.bust = bust
        self.waist = waist
        self.units = units
        
        # Base dimensions scaling based on a standard block
        # Simple proportional mapping for MVP
        self.neck_width = min(15, self.bust * 0.15)
        self.shoulder_width = self.bust * 0.35
        self.armhole_depth = self.bust * 0.22
        self.length = max(60, self.waist * 0.7)
        self.waist_width = self.waist * 0.45
        self.hem_width = self.bust * 0.45
        
    def generate_front_block(self) -> Polygon:
        """
        Generates the Shapely Polygon for the front bodice of a basic T-shirt.
        Coordinates are structured starting from High Shoulder Point (HSP) moving clockwise around the half-block,
        then mirrored assuming symmetry, but for simplicity here we generate the full symmetrical polygon.
        """
        center_x = 0
        hsp_y = self.length
        
        # High Shoulder Points
        hsp_right = (center_x + self.neck_width / 2, hsp_y)
        hsp_left = (center_x - self.neck_width / 2, hsp_y)
        
        # Shoulder Slope Points
        shoulder_drop = 3
        shp_right = (center_x + self.shoulder_width / 2, hsp_y - shoulder_drop)
        shp_left = (center_x - self.shoulder_width / 2, hsp_y - shoulder_drop)
        
        # Armhole Bottom Points
        armhole_y = hsp_y - self.armhole_depth
        arm_bottom_right = (center_x + self.bust * 0.25, armhole_y)
        arm_bottom_left = (center_x - self.bust * 0.25, armhole_y)
        
        # Waist Points
        waist_y = hsp_y - self.armhole_depth - 20 # approx 20cm below armhole
        waist_right = (center_x + self.waist_width / 2, waist_y)
        waist_left = (center_x - self.waist_width / 2, waist_y)
        
        # Hem Points
        hem_y = 0
        hem_right = (center_x + self.hem_width / 2, hem_y)
        hem_left = (center_x - self.hem_width / 2, hem_y)
        
        # Center Front Neckline Curve approx
        neck_drop = 10
        center_front_neck = (center_x, hsp_y - neck_drop)
        
        # Construct Polygon matching right side and then left
        coords = [
            center_front_neck,
            hsp_right,
            shp_right,
            arm_bottom_right,
            waist_right,
            hem_right,
            hem_left,
            waist_left,
            arm_bottom_left,
            shp_left,
            hsp_left
        ]
        
        return Polygon(coords)

def generate_svg(polygon: Polygon, filename: str):
    """
    Renders a Shapely Polygon into an SVG file using svgwrite.
    """
    bounds = polygon.bounds
    width = bounds[2] - bounds[0] + 10
    height = bounds[3] - bounds[1] + 10
    
    dwg = svgwrite.Drawing(filename, size=(f"{width}cm", f"{height}cm"), viewBox=f"{bounds[0]-5} {bounds[1]-5} {width} {height}")
    
    coords = list(polygon.exterior.coords)
    # y-axis inversion for SVG
    inverted_coords = [(x, -y + height) for x, y in coords]
    
    path = dwg.polygon(points=inverted_coords, fill="none", stroke="black", stroke_width=0.2)
    dwg.add(path)
    dwg.save()
    return filename

# Expose a simple method to hook up to main.py
def create_scaled_pattern(bust: float, waist: float, output_path: str):
    generator = TShirtPatternGenerator(bust=bust, waist=waist)
    block = generator.generate_front_block()
    generate_svg(block, output_path)
    return output_path
