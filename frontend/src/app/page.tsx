"use client";

import { useState } from "react";

export default function Home() {
  const [bust, setBust] = useState<number>(90);
  const [waist, setWaist] = useState<number>(70);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setPdfUrl(null);

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
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-fuchsia-500 selection:text-white">
      {/* Navbar Minimal */}
      <nav className="w-full py-6 px-10 border-b border-white/10 flex justify-between items-center backdrop-blur-md sticky top-0 z-50">
        <h1 className="text-2xl font-bold tracking-tighter bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">Sloper.</h1>
        <p className="text-sm text-neutral-400 font-medium">Vision-to-Vector Patterns MVP</p>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-16 md:pt-32 md:pb-24 max-w-6xl mx-auto flex flex-col items-center text-center">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-fuchsia-600/20 blur-[120px] rounded-full pointer-events-none" />
        
        <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
          Unwrap 3D Fashion <br /> into <span className="underline decoration-cyan-500 underline-offset-8">2D Geometry.</span>
        </h2>
        <p className="text-xl text-neutral-400 max-w-2xl mb-12">
          Upload an inspiration snippet, dial in your body measurements, and let our parametric engine draft a completely custom sewing pattern.
        </p>

        {/* Dashboard Builder */}
        <div className="w-full max-w-4xl bg-neutral-900/50 border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl backdrop-blur-sm grid grid-cols-1 md:grid-cols-2 gap-12 text-left relative z-10">
          
          {/* Controls */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Parametric Setup</h3>
            <form onSubmit={handleGenerate} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-400 mb-2">Inspiration Image (Optional)</label>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                  className="block w-full text-sm text-neutral-300
                    file:mr-4 file:py-3 file:px-4
                    file:rounded-xl file:border-0
                    file:text-sm file:font-semibold
                    file:bg-neutral-800 file:text-white
                    hover:file:bg-neutral-700 hover:file:cursor-pointer
                    border border-white/10 rounded-xl bg-neutral-950 p-1 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Bust (cm)</label>
                  <input 
                    type="number" 
                    value={bust}
                    onChange={(e) => setBust(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-fuchsia-500 focus:outline-none transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-400 mb-2">Waist (cm)</label>
                  <input 
                    type="number" 
                    value={waist}
                    onChange={(e) => setWaist(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-fuchsia-500 focus:outline-none transition-all" 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-neutral-200 transition-all active:scale-[0.98] disabled:opacity-50 mt-4 flex justify-center items-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.1)]"
              >
                {loading ? "Generating Topology..." : "Compile Pattern"}
              </button>
              {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
            </form>
          </div>

          {/* Visualizer output */}
          <div className="bg-neutral-950 border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden group">
            {!pdfUrl ? (
                <div className="text-center">
                  <div className="w-16 h-16 border-2 border-neutral-700/50 rounded-full mx-auto mb-4 flex items-center justify-center text-neutral-600">
                     <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                  </div>
                  <p className="text-neutral-500 font-medium">Output visualizer awaits execution.</p>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col justify-between items-center z-10 space-y-4">
                   <div className="font-semibold text-lg text-cyan-400">Pattern Compiled Successfully</div>
                   <img src={pdfUrl} alt="Generated SVG Pattern" className="max-w-full max-h-[250px] object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.5)] border border-white/10 rounded-lg bg-neutral-900 p-2" />
                   <a 
                     href={pdfUrl} 
                     download="sloper_pattern.svg" 
                     className="px-6 py-2 bg-neutral-800 hover:bg-neutral-700 text-white rounded-full text-sm font-semibold transition-all shadow-md"
                   >
                     Download SVG Vector
                   </a>
                </div>
              )}
              {/* Background accent */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-cyan-900/10 to-fuchsia-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          </div>

        </div>
      </section>
    </main>
  );
}
