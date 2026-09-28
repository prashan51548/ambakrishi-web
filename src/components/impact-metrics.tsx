"use client";

import React from "react";
import { Droplets, Zap, ShieldCheck, TrendingUp } from "lucide-react";

export default function ImpactMetrics() {
  return (
    <section id="impact" className="py-20 relative bg-earth-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-emerald-500/30 text-xs text-emerald-400 font-semibold">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Proven Field Results</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Measured Field <span className="text-agri-gradient">Impact & Savings</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Verified data collected across 10,000+ test acres in Punjab, Haryana & Uttar Pradesh over 3 harvest cycles.
          </p>
        </div>

        {/* 3 Core Impact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1: 40% Water Saved */}
          <div className="glass-card rounded-3xl p-8 border border-emerald-500/30 text-center space-y-4 shadow-2xl relative overflow-hidden group hover:border-emerald-400 transition">
            <div className="w-16 h-16 rounded-2xl bg-blue-500/20 text-blue-400 border border-blue-500/30 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
              <Droplets className="w-8 h-8" />
            </div>
            <p className="text-4xl sm:text-5xl font-black text-white tracking-tight font-mono">40%</p>
            <h3 className="text-lg font-bold text-emerald-400">Water Saved</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Weather API auto-pause + ESP32 moisture sensors prevent over-irrigation and conserve precious groundwater tables.
            </p>
          </div>

          {/* Card 2: 30% Electricity Saved */}
          <div className="glass-card rounded-3xl p-8 border border-emerald-500/30 text-center space-y-4 shadow-2xl relative overflow-hidden group hover:border-emerald-400 transition">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8" />
            </div>
            <p className="text-4xl sm:text-5xl font-black text-white tracking-tight font-mono">30%</p>
            <h3 className="text-lg font-bold text-harvest-400">Electricity Saved</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Automated pump shutoffs prevent motor idle running during midnight power availability slots.
            </p>
          </div>

          {/* Card 3: 24/7 Crop Protection */}
          <div className="glass-card rounded-3xl p-8 border border-emerald-500/30 text-center space-y-4 shadow-2xl relative overflow-hidden group hover:border-emerald-400 transition">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <p className="text-4xl sm:text-5xl font-black text-white tracking-tight font-mono">24/7</p>
            <h3 className="text-lg font-bold text-emerald-300">Crop Protection</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              PIR motion sirens scare nocturnal wildlife boars, while DHT22 humidity logs send fungicide alerts.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
