"use client";

import { useState } from "react";

export default function Home() {
  const [bust, setBust] = useState<number>(90);
  const [waist, setWaist] = useState<number>(70);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPdfUrl(null);
    setUploadedImageUrl(null);

    const formData = new FormData();
    formData.append("bust", bust.toString());
    formData.append("waist", waist.toString());
    if (file) formData.append("image", file);

    try {
      const res = await fetch("http://localhost:8000/api/generate-pattern", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to generate pattern");

      const data = await res.json();
      setPdfUrl(`http://localhost:8000${data.pdf_url}`);
      if (data.image_url) setUploadedImageUrl(`http://localhost:8000${data.image_url}`);
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fdfaf3] text-[#3e3832] selection:bg-[#c9b48f] selection:text-white relative overflow-hidden" style={{ backgroundImage: 'radial-gradient(#e0d5c1 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      
      {/* Textured overlay to give a paper feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-color-burn" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/aged-paper.png")' }}></div>

      <div className="max-w-5xl mx-auto px-6 py-12 relative z-10 flex flex-col md:flex-row gap-16 md:gap-24 items-start">
        
        {/* Left Side: The "Sketchbook" */}
        <div className="w-full md:w-1/2 pt-10">
          <div className="inline-block relative mb-8">
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-[#2c2825] mb-2 font-[family-name:var(--font-playfair)]">Sloper</h1>
            {/* Hand-drawn underline effect */}
            <svg className="absolute w-full h-4 -bottom-2 left-0 text-[#8b5a2b] opacity-80" viewBox="0 0 100 10" preserveAspectRatio="none">
              <path d="M0,5 Q50,10 100,5" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="3 2" />
            </svg>
            <p className="font-[family-name:var(--font-caveat)] text-3xl text-[#5e4b3c] absolute -right-24 -bottom-6 transform rotate-[-5deg]">The Tailor's Engine</p>
          </div>

          <p className="text-lg md:text-xl text-[#5e5349] leading-relaxed mb-12 font-[family-name:var(--font-playfair)] italic">
            Pinning 3D inspiration to 2D geometry. <br/> Leave your measurements, and we shall sketch the pattern.
          </p>

          <form onSubmit={handleGenerate} className="space-y-8 p-8 border-2 border-dashed border-[#c1b5a5] rounded-tl-3xl rounded-br-3xl bg-[#f8f4eb] shadow-[5px_5px_0_#e6dfce] relative">
            
            {/* Drawn tape effect in corners */}
            <div className="absolute -top-3 -left-3 w-12 h-6 bg-[#d1c8b7]/50 transform -rotate-45 shadow-sm"></div>
            <div className="absolute -bottom-3 -right-3 w-12 h-6 bg-[#d1c8b7]/50 transform -rotate-45 shadow-sm"></div>

            <div className="relative">
              <label className="block text-xl font-[family-name:var(--font-caveat)] text-[#8b5a2b] mb-1">Upload Reference Sketch</label>
              <input 
                type="file" 
                accept="image/*"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                className="block w-full text-sm text-[#5e5349]
                  file:mr-4 file:py-2 file:px-6
                  file:border-2 file:border-[#8b5a2b] file:bg-[#f8f4eb] file:text-[#8b5a2b]
                  file:font-[family-name:var(--font-playfair)] file:font-semibold file:cursor-pointer
                  hover:file:bg-[#8b5a2b] hover:file:text-[#f8f4eb]
                  transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="relative border-b-2 border-[#8b5a2b]">
                <label className="block text-2xl font-[family-name:var(--font-caveat)] text-[#8b5a2b] absolute -top-8 left-0">Bust (cm)</label>
                <input 
                  type="number" 
                  value={bust}
                  onChange={(e) => setBust(Number(e.target.value))}
                  className="w-full bg-transparent text-2xl font-[family-name:var(--font-playfair)] text-[#2c2825] px-2 py-1 focus:outline-none" 
                />
              </div>
              <div className="relative border-b-2 border-[#8b5a2b]">
                <label className="block text-2xl font-[family-name:var(--font-caveat)] text-[#8b5a2b] absolute -top-8 left-0">Waist (cm)</label>
                <input 
                  type="number" 
                  value={waist}
                  onChange={(e) => setWaist(Number(e.target.value))}
                  className="w-full bg-transparent text-2xl font-[family-name:var(--font-playfair)] text-[#2c2825] px-2 py-1 focus:outline-none" 
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full mt-10 bg-[#2c2825] text-[#f8f4eb] font-[family-name:var(--font-playfair)] text-lg py-4 border-2 border-[#2c2825] hover:bg-transparent hover:text-[#2c2825] transition-all disabled:opacity-50 relative group"
            >
              <span className="relative z-10">{loading ? "Drafting..." : "Draft Pattern"}</span>
              <div className="absolute inset-0 bg-[#8b5a2b] mix-blend-multiply opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </button>
            
            {error && <p className="font-[family-name:var(--font-caveat)] text-red-700 text-xl mt-4 text-center">{error}</p>}
          </form>
        </div>

        {/* Right Side: Execution Canvas */}
        <div className="w-full md:w-1/2 pt-10 md:pt-32 flex flex-col items-center relative">
          
          {uploadedImageUrl && (
            <div className="absolute -left-12 -top-4 md:-left-20 md:top-10 z-30 transform -rotate-12 bg-white p-2 pb-8 shadow-xl border border-neutral-200 w-32 md:w-48 transition-transform hover:rotate-0 hover:scale-110 duration-300">
               <div className="absolute -top-3 shadow-sm left-1/2 -translate-x-1/2 w-4 h-4 bg-yellow-400 rounded-full border-2 border-yellow-500 z-20"></div>
               <img src={uploadedImageUrl} alt="Reference" className="w-full h-auto object-cover grayscale sepia-[.5] mix-blend-multiply opacity-90" />
               <p className="font-[family-name:var(--font-caveat)] text-center text-[#8b5a2b] mt-2 text-xl leading-none">Ref.</p>
            </div>
          )}

          <div className="w-full border-4 border-[#e0d5c1] bg-white p-6 rotate-1 hover:rotate-0 transition-transform duration-500 shadow-[8px_8px_0_rgba(139,90,43,0.15)] relative z-20">
            
            {/* Push pin */}
            <div className="absolute -top-4 shadow-lg left-1/2 -translate-x-1/2 w-6 h-6 bg-red-800 rounded-full border-4 border-red-900 z-20">
               <div className="absolute inset-1 rounded-full bg-red-600"></div>
            </div>

            <div className="w-full h-[400px] border border-[#f0ead8] bg-[#faf8f2] flex flex-col items-center justify-center relative overflow-hidden" style={{ backgroundImage: 'linear-gradient(to right, #f4ecd8 1px, transparent 1px), linear-gradient(to bottom, #f4ecd8 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
               
              {!pdfUrl ? (
                  <div className="text-center p-8">
                    <p className="font-[family-name:var(--font-caveat)] text-4xl text-[#a59886] opacity-70 transform -rotate-6">Awaiting dimensions...</p>
                  </div>
                ) : (
                  <div className="w-full h-full p-4 flex flex-col justify-between items-center z-10 space-y-4">
                     <p className="font-[family-name:var(--font-caveat)] text-3xl text-[#5e4b3c] -rotate-2">Drafted Pattern</p>
                     <img src={pdfUrl} alt="Generated SVG Pattern" className="max-w-full max-h-[250px] object-contain drop-shadow-md mix-blend-multiply sepia-[.3]" />
                     <a 
                       href={pdfUrl} 
                       download="sloper_pattern.svg" 
                       className="px-8 py-2 bg-transparent border-2 border-[#8b5a2b] text-[#8b5a2b] hover:bg-[#8b5a2b] hover:text-[#f8f4eb] font-[family-name:var(--font-playfair)] font-semibold transition-all"
                     >
                       Take to Printer
                     </a>
                  </div>
                )}
            </div>
            
            <p className="absolute bottom-[-15px] right-2 font-[family-name:var(--font-caveat)] text-2xl text-[#8b5a2b] opacity-80 z-20 bg-[#fdfaf3] px-2 outline outline-4 outline-[#fdfaf3]">Fig. 1.0</p>
          </div>
        </div>

      </div>
    </main>
  );
}
