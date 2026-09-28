"use client";

import React from "react";
import Image from "next/image";
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Droplets, Thermometer, Radio, MapPin, Zap } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-12 pb-24 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-emerald-600/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-harvest-500/15 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Incubation Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-card border border-emerald-500/30 text-xs font-semibold text-emerald-300 shadow-xl shadow-emerald-950/60">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Incubated at Mohali, Punjab</span>
            <span className="text-slate-500">|</span>
            <span className="text-harvest-400 font-bold">RKVY-RAFTAAR & NIDHI PRAYAS</span>
          </div>
        </div>

        {/* Hero Heading & Subheading */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
            Ambakrishi <span className="text-agri-gradient">Technologies</span>
          </h1>

          <p className="text-xl sm:text-3xl font-extrabold text-emerald-300 tracking-wide font-sans">
            Next-Gen IoT Precision Agriculture & AI Farm OS
          </p>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Automate irrigation with ESP32 soil moisture sensors, protect fields with PIR animal alarms, 
            and predict fungal outbreaks using DHT22 humidity analytics.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
            <a
              href="#superpowers"
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-500 via-agri-600 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-xl shadow-xl shadow-emerald-950/60 hover:shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:scale-95"
            >
              <Cpu className="w-5 h-5 text-harvest-400" />
              <span>Explore Solution</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>

            <a
              href="#contact"
              className="flex items-center gap-2 glass-card hover:bg-emerald-950/50 text-slate-200 hover:text-white font-bold text-sm sm:text-base px-8 py-4 rounded-xl border border-emerald-500/30 transition-all transform hover:-translate-y-0.5"
            >
              <Sparkles className="w-5 h-5 text-emerald-400" />
              <span>Request Demo</span>
            </a>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap justify-center items-center gap-8 pt-6 text-xs text-slate-300 font-semibold border-t border-emerald-900/40 max-w-2xl mx-auto">
            <span className="flex items-center gap-2 text-emerald-400">
              <Droplets className="w-4 h-4 text-blue-400" /> 40% Water Saved
            </span>
            <span className="flex items-center gap-2 text-harvest-400">
              <Zap className="w-4 h-4 text-amber-400" /> 30% Electricity Saved
            </span>
            <span className="flex items-center gap-2 text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 24/7 Crop Protection
            </span>
          </div>
        </div>

        {/* Hero Interactive IoT Gateway Box */}
        <div className="mt-12 relative rounded-3xl overflow-hidden glass-card border border-emerald-500/30 p-2 sm:p-4 shadow-2xl">
          <div className="relative h-[320px] sm:h-[460px] w-full rounded-2xl overflow-hidden">
            <Image
              src="/images/hero-farm.png"
              alt="Ambakrishi Technologies Private Limited IoT Precision Farm OS"
              fill
              className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-earth-950 via-earth-950/30 to-transparent" />

            {/* Floating IoT Gateway Status Overlay */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 flex flex-wrap gap-3">
              <div className="glass-card bg-earth-950/90 px-3.5 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-2.5 border border-emerald-500/40 shadow-lg">
                <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
                <div>
                  <p className="text-[10px] text-slate-400">ESP32 Hardware Mesh</p>
                  <p className="text-emerald-400">ONLINE (Node #PB-MOH-01)</p>
                </div>
              </div>

              <div className="glass-card bg-earth-950/90 px-3.5 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-2.5 border border-emerald-500/40 shadow-lg">
                <Thermometer className="w-4 h-4 text-amber-400" />
                <div>
                  <p className="text-[10px] text-slate-400">DHT22 Fungal Sensor</p>
                  <p className="text-emerald-300">Temp: 26°C | Hum: 68%</p>
                </div>
              </div>
            </div>

            {/* Bottom Floating Bar */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 glass-card bg-earth-950/95 p-4 rounded-xl border border-emerald-500/30 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-extrabold text-sm">
                  IoT
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">AI Farm OS Telemetry Gateway</h4>
                  <p className="text-xs text-slate-300">ESP32 soil moisture logic + Weather API auto-pause active</p>
                </div>
              </div>

              <a
                href="#iot-dashboard"
                className="text-xs font-bold text-emerald-400 hover:text-white flex items-center gap-1.5 bg-emerald-500/10 px-3 py-2 rounded-lg border border-emerald-500/30"
              >
                <span>Open Live Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
