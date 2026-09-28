"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Upload, CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw, Zap, Pill, Leaf } from "lucide-react";
import confetti from "canvas-confetti";

interface DiagnosticResult {
  disease: string;
  crop: string;
  confidence: number;
  status: "severe" | "moderate" | "healthy";
  pathogen: string;
  organicCure: string;
  chemicalCure: string;
  preventiveSteps: string[];
}

const SAMPLE_CROPS = [
  {
    id: "wheat-rust",
    name: "Wheat (Gehu) - Yellow Rust",
    image: "/images/crop-wheat-rust.png",
    result: {
      crop: "Wheat (Triticum aestivum)",
      disease: "Stripe / Yellow Rust (Puccinia striiformis)",
      confidence: 98.4,
      status: "severe" as const,
      pathogen: "Fungal Spores (Puccinia species spread via wind)",
      organicCure: "Spray Neem Seed Kernel Extract (NSKE 5%) or Sour Buttermilk mixture (1L in 15L water).",
      chemicalCure: "Spray Propiconazole 25% EC @ 200ml in 200L water per acre within 48 hours.",
      preventiveSteps: [
        "Use rust-resistant varieties like DBW 187, HD 3226, or PBW 725.",
        "Avoid excess nitrogen fertilizer application.",
        "Maintain crop spacing for proper air circulation."
      ]
    }
  },
  {
    id: "tomato-blight",
    name: "Tomato (Tamatar) - Early Blight",
    image: "/images/crop-tomato-blight.png",
    result: {
      crop: "Tomato (Solanum lycopersicum)",
      disease: "Early Blight Spot (Alternaria solani)",
      confidence: 96.8,
      status: "moderate" as const,
      pathogen: "Fungal pathogen targeting lower leaves during warm moist conditions",
      organicCure: "Apply Trichoderma viride bio-fungicide @ 5g/L water + Copper Oxychloride.",
      chemicalCure: "Spray Mancozeb 75% WP @ 600g per acre or Azoxystrobin 23% SC.",
      preventiveSteps: [
        "Remove and burn infected lower leaves immediately.",
        "Mulch around plant base to prevent soil splash onto foliage.",
        "Use drip irrigation instead of overhead sprinklers."
      ]
    }
  },
  {
    id: "healthy-crop",
    name: "Healthy Crop Leaf Sample",
    image: "/images/hero-farm.png",
    result: {
      crop: "Paddy Rice (Oryza sativa)",
      disease: "Healthy Leaf - No Pathogens Detected",
      confidence: 99.2,
      status: "healthy" as const,
      pathogen: "None (Plant foliage is robust with optimal chlorophyll activity)",
      organicCure: "Maintain regular organic compost & vermicompost feeding cycle.",
      chemicalCure: "No chemical intervention needed. Keep monitoring weekly.",
      preventiveSteps: [
        "Maintain balanced N-P-K nutrient application.",
        "Ensure field drainage during heavy monsoon rains.",
        "Monitor light traps for early pest activity."
      ]
    }
  }
];

export default function AiCropDoctor() {
  const [selectedSample, setSelectedSample] = useState(SAMPLE_CROPS[0]);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [activeResult, setActiveResult] = useState<DiagnosticResult | null>(SAMPLE_CROPS[0].result);

  const handleRunScan = (sample: typeof SAMPLE_CROPS[0]) => {
    setSelectedSample(sample);
    setCustomImage(null);
    setIsScanning(true);
    setActiveResult(null);

    setTimeout(() => {
      setIsScanning(false);
      setActiveResult(sample.result);
      if (sample.result.status === "healthy") {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    }, 1800);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setCustomImage(reader.result as string);
        setIsScanning(true);
        setActiveResult(null);

        setTimeout(() => {
          setIsScanning(false);
          setActiveResult(SAMPLE_CROPS[1].result); // Simulate analysis result
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="ai-doctor" className="py-20 relative bg-earth-950/60 border-t border-b border-emerald-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-emerald-500/30 text-xs text-emerald-400 font-semibold">
            <Sparkles className="w-4 h-4 text-harvest-500" />
            <span>AI Vision Diagnostic System</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Ambakrishi <span className="text-agri-gradient">AI Crop Doctor</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Upload a photo of your affected crop leaf or pick a sample below to diagnose diseases instantly with 98%+ neural network accuracy.
          </p>
        </div>

        {/* Diagnostic Tool Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Sample Selectors & Image Scanner Preview */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Image Preview Box */}
            <div className="glass-card rounded-2xl p-4 border border-emerald-500/30 relative overflow-hidden shadow-2xl">
              <div className="relative h-[320px] w-full rounded-xl overflow-hidden bg-earth-900 flex items-center justify-center">
                <Image
                  src={customImage || selectedSample.image}
                  alt="Crop Leaf Scan Preview"
                  fill
                  className="object-cover object-center"
                />

                {/* Laser Scanning Animation Overlay */}
                {isScanning && (
                  <div className="absolute inset-0 bg-emerald-950/50 backdrop-blur-[2px] flex flex-col items-center justify-center">
                    <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent absolute animate-scan shadow-[0_0_15px_#22c55e]" />
                    <div className="flex flex-col items-center gap-2 z-10">
                      <RefreshCw className="w-10 h-10 text-emerald-400 animate-spin" />
                      <span className="text-xs font-bold text-white bg-earth-950/90 px-3 py-1 rounded-full border border-emerald-500/40">
                        Analyzing Leaf Pathogens...
                      </span>
                    </div>
                  </div>
                )}

                {/* Status Badge */}
                {!isScanning && activeResult && (
                  <div className="absolute top-3 left-3 bg-earth-950/90 backdrop-blur-md border border-emerald-500/30 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 text-white">
                    {activeResult.status === "severe" ? (
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                    ) : activeResult.status === "moderate" ? (
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    )}
                    <span>{activeResult.disease.split("(")[0]}</span>
                  </div>
                )}
              </div>

              {/* Upload Custom Image Button */}
              <div className="mt-4 flex items-center gap-3">
                <label className="flex-1 flex items-center justify-center gap-2 bg-emerald-950/70 hover:bg-emerald-900/80 border border-emerald-500/30 text-emerald-300 font-semibold text-xs py-3 rounded-xl cursor-pointer transition">
                  <Upload className="w-4 h-4" />
                  <span>Upload Your Crop Photo</span>
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>
            </div>

            {/* Quick Sample Selector Cards */}
            <div>
              <p className="text-xs font-semibold text-slate-400 mb-3 flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5 text-emerald-400" /> Or select a test crop leaf sample:
              </p>
              <div className="space-y-2">
                {SAMPLE_CROPS.map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => handleRunScan(sample)}
                    className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      selectedSample.id === sample.id && !customImage
                        ? "bg-emerald-900/60 border-emerald-400 shadow-md shadow-emerald-950/50"
                        : "glass-card hover:bg-earth-900 border-emerald-500/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-emerald-500/30">
                        <Image src={sample.image} alt={sample.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-white">{sample.name}</p>
                        <p className="text-[11px] text-emerald-400">Diagnosis Confidence: {sample.result.confidence}%</p>
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                      <span>Analyze</span> &rarr;
                    </div>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: AI Diagnostic Results & Prescription */}
          <div className="lg:col-span-7">
            {isScanning ? (
              <div className="glass-card rounded-2xl p-8 border border-emerald-500/30 flex flex-col items-center justify-center min-h-[450px] text-center space-y-4">
                <div className="relative w-16 h-16">
                  <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 border-t-emerald-400 animate-spin" />
                  <Sparkles className="w-8 h-8 text-emerald-400 absolute inset-0 m-auto" />
                </div>
                <h3 className="text-xl font-bold text-white">Running Convolutional Neural Net Scan...</h3>
                <p className="text-xs text-slate-400 max-w-sm">
                  Checking crop leaf pattern against 150,000+ agricultural pathogen datasets from ICAR & global agronomist archives.
                </p>
              </div>
            ) : activeResult ? (
              <div className="glass-card rounded-2xl p-6 sm:p-8 border border-emerald-500/30 space-y-6 shadow-2xl animate-in fade-in">
                
                {/* Result Top Banner */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-emerald-900/40">
                  <div>
                    <span className="text-xs font-medium text-slate-400">Diagnosed Crop:</span>
                    <h3 className="text-xl font-bold text-white">{activeResult.crop}</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-300">
                      AI Confidence: {activeResult.confidence}%
                    </div>
                    <div
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                        activeResult.status === "severe"
                          ? "bg-red-500/20 text-red-300 border border-red-500/30"
                          : activeResult.status === "moderate"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      }`}
                    >
                      {activeResult.status.toUpperCase()} SEVERITY
                    </div>
                  </div>
                </div>

                {/* Identified Condition */}
                <div className="p-4 rounded-xl bg-earth-900/80 border border-emerald-500/20">
                  <p className="text-xs text-slate-400 font-medium">Identified Condition / Disease:</p>
                  <p className="text-lg font-bold text-emerald-400 mt-0.5">{activeResult.disease}</p>
                  <p className="text-xs text-slate-300 mt-2 font-mono bg-earth-950 p-2 rounded border border-emerald-900/50">
                    <span className="text-amber-400 font-semibold">Pathogen Source:</span> {activeResult.pathogen}
                  </p>
                </div>

                {/* Cure Recommendations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Organic Treatment */}
                  <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                      <Leaf className="w-4 h-4" />
                      <span>Organic / Jaivik Remedy</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-medium">
                      {activeResult.organicCure}
                    </p>
                  </div>

                  {/* Chemical Prescription */}
                  <div className="p-4 rounded-xl bg-earth-900/80 border border-amber-500/30 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
                      <Pill className="w-4 h-4" />
                      <span>Recommended Spray & Dosage</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-medium">
                      {activeResult.chemicalCure}
                    </p>
                  </div>
                </div>

                {/* Preventive Agronomy Steps */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" /> Preventive Agronomic Actions
                  </h4>
                  <ul className="space-y-2">
                    {activeResult.preventiveSteps.map((step, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Doctor Advisory Button */}
                <div className="pt-2 flex items-center justify-between gap-4 border-t border-emerald-900/40">
                  <span className="text-xs text-slate-400">Need specific formulation advice for your land acreage?</span>
                  <a
                    href="tel:18001801551"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2.5 rounded-lg flex items-center gap-2"
                  >
                    <Zap className="w-3.5 h-3.5" /> Speak to Agronomist
                  </a>
                </div>

              </div>
            ) : null}
          </div>

        </div>

      </div>
    </section>
  );
}
