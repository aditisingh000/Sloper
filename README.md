<div align="center">
  <h1>Sloper 🧵</h1>
  <p><strong>Intelligent pattern-making platform bridging visual inspiration to physical garment construction.</strong></p>
</div>

---

**Sloper** is an ambitious "Holy Grail" project in fashion technology. By leveraging multimodal foundation models and parametric geometry, Sloper allows users to upload a photo of an existing garment and generate a production-ready, custom-fit sewing pattern.

## 🚀 Overview

Traditional pattern drafting is a barrier to entry for many sewing enthusiasts. Sloper automates the "unwrapping" of 3D garments into 2D panels. The app doesn't just guess the shape; it uses computer vision to identify garment topology and applies precise mathematical scaling based on individual body measurements.

## ✨ Key Features

* **📱 Vision-to-Vector**: Upload a photo to extract garment landmarks, seam lines, and style features.
* **📐 Parametric Scaling**: Input custom measurements (bust, waist, hip, etc.) to dynamically adjust the generated pattern.
* **🤖 Intelligent Construction Guides (RAG)**: Automated generation of sewing instructions, including recommended fabric types, stitch settings, and assembly order.
* **🖨️ Printable Output**: Generates tiled PDF/SVG files optimized for standard home printers (A4/Letter).

## 🧠 The Machine Learning Pipeline

1. **Segmentation & Feature Extraction**: Uses Segment Anything Model 2 (SAM 2) or YOLOv11 for real-time garment detection and landmark identification.
2. **2D Pattern Prediction**: Utilizes a Vision-Language Model (VLM) / Transformer architectures (like Sewformer) to interpret style topology and map it to a geometric pattern sequence.
3. **Parametric Generation**: Injects actual measurements into a Python-based geometry engine to calculate precision $(x, y)$ coordinates.

## 🛠️ Technical Stack

* **Backend API**: `FastAPI` (Python) for robust image processing and model inference.
* **Deep Learning**: `PyTorch` for running advanced VLM and segmentation models.
* **Geometry Engine**: `Shapely` / `PyCGE` to handle exact 2D vector mathematics.
* **Print Rendering**: `ReportLab` or `Cairo` for multi-page tiled PDF export.
* **Web Frontend**: `Next.js` (React)
* **Mobile App**: `React Native (Expo)`

## 📈 Roadmap

- [ ] **Phase 1 (MVP)**: Build a tool that takes a flat sketch and generates a scaled pattern for simple silhouettes (e.g., T-shirts, basic skirts).
- [ ] **Phase 2**: Integration of the Scaling Engine and RAG system for intelligent fabric and stitch advice.
- [ ] **Phase 3**: VLM integration to support "In-the-Wild" photos with complex shadowing/folds, and "hallucinating" tailered symmetry for unseen panels.

## 💻 Installation & Setup

*(Detailed local setup coming soon)*

```bash
# Clone the repository
git clone https://github.com/aditisingh000/Sloper.git
cd Sloper

# Install backend dependencies
pip install -r requirements.txt
```

## 🤝 Contributing
We welcome contributions from developers interested in the intersection of FashionTech, Computer Vision, and Computational Geometry! Please check our open issues.

## 📄 License
This project is licensed under the MIT License.
