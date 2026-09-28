"use client";

import React from "react";
import { Sprout, PhoneCall, Mail, MapPin, ShieldCheck } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-earth-950 border-t border-emerald-500/20 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-900/40">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-900 p-0.5 shadow-lg">
                <div className="w-full h-full bg-earth-950 rounded-[10px] flex items-center justify-center">
                  <Sprout className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <div>
                <span className="text-lg font-extrabold text-white tracking-tight">
                  AMBA <span className="text-agri-gradient">KRISHI</span>
                </span>
                <span className="ml-2 bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  TECH
                </span>
                <p className="text-[11px] text-emerald-400">Next-Gen IoT Precision Agriculture & AI Farm OS</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Empowering farmers with solar ESP32 moisture hardware, weather API irrigation auto-pause, PIR intruder guards, and deep-learning crop vision.
            </p>

            <div className="p-3 rounded-xl bg-earth-900/80 border border-emerald-500/20 space-y-1">
              <p className="text-[11px] font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-harvest-500" />
                <span>Govt Incubation Support:</span>
              </p>
              <p className="text-[11px] text-slate-300">
                Supported under <b>RKVY-RAFTAAR</b> (MoA&FW) & <b>NIDHI PRAYAS</b> (DST, GoI).
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider">AgTech Solutions</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#superpowers" className="hover:text-emerald-400 transition">Smart Auto Irrigation (ESP32)</a></li>
              <li><a href="#superpowers" className="hover:text-emerald-400 transition">PIR Intruder & Animal Guard</a></li>
              <li><a href="#superpowers" className="hover:text-emerald-400 transition">Wi-Fi Weather API Auto-Pause</a></li>
              <li><a href="#superpowers" className="hover:text-emerald-400 transition">DHT22 Fungal Disease Warning</a></li>
              <li><a href="#ai-doctor" className="hover:text-emerald-400 transition">AI Vision Crop Doctor</a></li>
            </ul>
          </div>

          {/* Farmer Portals */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider">Farmer Tools</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#ai-brain" className="hover:text-emerald-400 transition">AI Brain Decision Engine</a></li>
              <li><a href="#schemes" className="hover:text-emerald-400 transition">PM-KISAN Scheme Finder</a></li>
              <li><a href="#schemes" className="hover:text-emerald-400 transition">PM-KUSUM Solar Pump Subsidy</a></li>
              <li><a href="#alerts" className="hover:text-emerald-400 transition">SMS & Voice Call Alerts</a></li>
              <li><a href="#impact" className="hover:text-emerald-400 transition">Farmer Impact Stories</a></li>
            </ul>
          </div>

          {/* Contact & Location */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white tracking-wider">R&D Center</h4>
            <div className="space-y-2 text-xs text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Sector 81, Knowledge City, Mohali, Punjab - 160055</span>
              </p>
              <p className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1800-180-1551 (Toll-Free)</span>
              </p>
              <p className="flex items-center gap-2 font-mono text-[11px]">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>ambakrishi@gmail.com</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Ambakrishi Technologies Private Limited. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Built with precision in Mohali, Punjab 🇮🇳</span>
            <span>|</span>
            <a href="#privacy" className="hover:text-emerald-400">Privacy Policy</a>
            <a href="#terms" className="hover:text-emerald-400">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
