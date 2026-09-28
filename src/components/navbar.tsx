"use client";

import React, { useState } from "react";
import { Sprout, PhoneCall, Languages, Menu, X, ShieldCheck, Sparkles, Activity } from "lucide-react";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी (Hindi)" },
  { code: "pb", name: "ਪੰਜਾਬੀ (Punjabi)" },
  { code: "mr", name: "मराठी (Marathi)" },
  { code: "te", name: "తెలుగు (Telugu)" },
];

export default function Navbar() {
  const [selectedLang, setSelectedLang] = useState("en");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHelplineOpen, setIsHelplineOpen] = useState(false);

  return (
    <>
      {/* Top Banner Alert */}
      <div className="bg-gradient-to-r from-agri-950 via-agri-900 to-agri-950 border-b border-agri-500/20 text-xs py-2 px-4 text-emerald-200">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium text-emerald-400">PM Kisan Samman Nidhi Update:</span>
            <span>17th Kist Released. Check Status via Scheme Finder.</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-harvest-500">
              <Activity className="w-3.5 h-3.5" /> ESP32 + AI Brain + Smart Alerts
            </span>
            <button 
              onClick={() => setIsHelplineOpen(true)}
              className="text-emerald-400 hover:text-white underline transition font-medium"
            >
              24/7 Krishi Helpline: 1800-180-1551
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Nav */}
      <header className="sticky top-0 z-50 glass-card border-b border-emerald-500/10 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 via-agri-600 to-emerald-900 p-0.5 shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-earth-950 rounded-[10px] flex items-center justify-center">
                  <Sprout className="w-6 h-6 text-emerald-400 group-hover:rotate-12 transition-transform" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-bold tracking-tight text-white font-sans">
                    AMBA <span className="text-agri-gradient">KRISHI</span>
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                    TECH
                  </span>
                </div>
                <p className="text-[11px] text-emerald-400/80 font-medium">Smart Agriculture Technologies</p>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              <a href="#ai-doctor" className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-emerald-400" /> AI Crop Doctor
              </a>
              <a href="#iot-dashboard" className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition">
                IoT Precision
              </a>
              <a href="#ai-brain" className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition">
                AI Brain
              </a>
              <a href="#schemes" className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition">
                Govt Schemes
              </a>
              <a href="#alerts" className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition">
                SMS & Calling
              </a>
              <a href="#impact" className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition">
                Impact Stories
              </a>
            </nav>

            {/* Actions: Language & Helpline */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Language Selector */}
              <div className="relative flex items-center gap-1.5 bg-earth-900/80 border border-emerald-500/20 rounded-lg px-3 py-1.5 text-xs text-slate-200">
                <Languages className="w-4 h-4 text-emerald-400" />
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="bg-transparent text-emerald-200 focus:outline-none cursor-pointer font-medium"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-earth-900 text-slate-200">
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Call Helpline CTA */}
              <button
                onClick={() => setIsHelplineOpen(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-agri-500 hover:from-emerald-500 hover:to-agri-400 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-md shadow-emerald-900/40 hover:shadow-emerald-500/20 transition-all active:scale-95"
              >
                <PhoneCall className="w-4 h-4 animate-bounce" />
                <span>Kisan Helpline</span>
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-300 hover:text-emerald-400 rounded-lg bg-earth-900 border border-emerald-500/20"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-earth-950/95 border-b border-emerald-500/20 px-4 pt-3 pb-6 space-y-3 backdrop-blur-xl">
            <a
              href="#ai-doctor"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-200 hover:text-emerald-400 py-2 border-b border-emerald-900/30 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-400" /> AI Crop Doctor Diagnostic
            </a>
            <a
              href="#iot-dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-200 hover:text-emerald-400 py-2 border-b border-emerald-900/30"
            >
              IoT Smart Farming Dashboard
            </a>
            <a
              href="#ai-brain"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-200 hover:text-emerald-400 py-2 border-b border-emerald-900/30"
            >
              AI Brain & Field Decisions
            </a>
            <a
              href="#schemes"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-200 hover:text-emerald-400 py-2 border-b border-emerald-900/30"
            >
              Govt Schemes & Subsidies
            </a>
            <a
              href="#alerts"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-200 hover:text-emerald-400 py-2 border-b border-emerald-900/30"
            >
              SMS & Voice Call Alerts
            </a>
            <a
              href="#impact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-sm font-medium text-slate-200 hover:text-emerald-400 py-2 border-b border-emerald-900/30"
            >
              Farmer Success Stories
            </a>

            <div className="pt-2 flex flex-col gap-3">
              <div className="flex items-center gap-2 bg-earth-900 border border-emerald-500/20 rounded-lg p-2.5">
                <Languages className="w-4 h-4 text-emerald-400" />
                <select
                  value={selectedLang}
                  onChange={(e) => setSelectedLang(e.target.value)}
                  className="bg-transparent text-emerald-200 text-xs w-full focus:outline-none"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code} className="bg-earth-900 text-slate-200">
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsHelplineOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-600 to-agri-500 text-white font-semibold text-xs py-3 rounded-lg shadow-md"
              >
                <PhoneCall className="w-4 h-4" /> 24/7 Kisan Helpline Modal
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Helpline Modal Popup */}
      {isHelplineOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-earth-950/80 backdrop-blur-md">
          <div className="glass-card max-w-md w-full rounded-2xl p-6 border border-emerald-500/30 relative shadow-2xl animate-in fade-in zoom-in">
            <button
              onClick={() => setIsHelplineOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <PhoneCall className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Ambakrishi Emergency Helpline</h3>
                <p className="text-xs text-emerald-400">Free 24x7 Expert Agronomist Support</p>
              </div>
            </div>

            <div className="space-y-3 my-4">
              <div className="p-3 rounded-xl bg-earth-900/90 border border-emerald-500/20 flex justify-between items-center">
                <div>
                  <p className="text-xs text-slate-400">Toll-Free Kisan Call Center</p>
                  <p className="text-lg font-bold text-white tracking-wide">1800-180-1551</p>
                </div>
                <a
                  href="tel:18001801551"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold px-3 py-2 rounded-lg"
                >
                  Call Now
                </a>
              </div>

              <div className="p-3 rounded-xl bg-earth-900/90 border border-emerald-500/20 flex justify-between items-center">
                <div>
                  <p className="text-xs text-slate-400">WhatsApp Crop Doctor Bot</p>
                  <p className="text-sm font-bold text-emerald-300">+91 98765 43210</p>
                </div>
                <a
                  href="https://wa.me/919876543210?text=Hi%20Krishi%20Kalyan%20Doctor"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold px-3 py-2 rounded-lg"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 border-t border-emerald-900/40">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Available in Hindi, English, Punjabi, Marathi, Telugu & Tamil</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
