"use client";

import React from "react";
import { Award, Landmark, MapPin, ShieldCheck, Sparkles, Building2, CheckCircle2 } from "lucide-react";

export default function IncubationAbout() {
  return (
    <section id="about" className="py-20 relative bg-earth-950/80 border-t border-emerald-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Card Box */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-emerald-500/30 relative overflow-hidden shadow-2xl">
          
          {/* Background Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-600/15 blur-[120px] rounded-full pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
            
            {/* Left Column: Story & Incubation Specs */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 font-semibold">
                <Landmark className="w-4 h-4 text-harvest-500" />
                <span>Government Recognized AgTech Venture</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight">
                About Ambakrishi Technologies Private Limited & <span className="text-agri-gradient">Incubation Support</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Ambakrishi Technologies Private Limited is a premier ag-tech startup committed to revolutionizing smallholder farming with affordable solar IoT sensors, automated drip valve controllers, and deep-learning crop vision.
              </p>

              <div className="p-4 rounded-2xl bg-earth-900/90 border border-emerald-500/20 space-y-3">
                <p className="text-xs text-slate-400 font-medium">Govt of India Incubation Schemes:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-earth-950 border border-emerald-900">
                    <Award className="w-5 h-5 text-harvest-500 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">RKVY-RAFTAAR</h4>
                      <p className="text-[11px] text-slate-400">Rashtriya Krishi Vikas Yojana Grant for Agribusiness Incubation</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl bg-earth-950 border border-emerald-900">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-white">NIDHI PRAYAS</h4>
                      <p className="text-[11px] text-slate-400">DST Initiative for Hardware Prototyping & Field Validation</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  <span>R&D Center: <b>Mohali, Punjab, India</b></span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-harvest-400" />
                  <span>Agri-Innovation Lab #PB-MOH</span>
                </div>
              </div>

            </div>

            {/* Right Column: High Impact Highlights */}
            <div className="lg:col-span-5 space-y-4">
              <div className="p-6 rounded-2xl bg-earth-900/90 border border-emerald-500/30 space-y-4 shadow-xl">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-emerald-400" />
                  <span>Our Technological Promises</span>
                </h3>

                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><b>Plug & Play Hardware:</b> ESP32 sensor pods with integrated solar charging panels.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><b>Regional Language Support:</b> Voice alerts in Punjabi, Hindi, Marathi, Telugu, English.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><b>Zero Subscriptions:</b> Lifetime free access to basic sensor monitoring & smart alerts.</span>
                  </li>
                </ul>

                <div className="pt-2 border-t border-emerald-900/40 text-[11px] text-emerald-300 font-medium">
                  Direct Field Support Team based in Mohali serving farmers across Punjab, Haryana, and North India.
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
