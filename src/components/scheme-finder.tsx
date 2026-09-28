"use client";

import React, { useState } from "react";
import { Landmark, Search, ExternalLink, Sparkles } from "lucide-react";

interface Scheme {
  id: string;
  name: string;
  category: "Direct Cash" | "Crop Insurance" | "Solar Energy" | "Mechanization" | "Soil & Fertilizer";
  benefit: string;
  eligibility: string;
  landSize: "all" | "small" | "medium";
  documents: string[];
  department: string;
  portalUrl: string;
}

const SCHEMES_DATA: Scheme[] = [
  {
    id: "s1",
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    category: "Direct Cash",
    benefit: "₹6,000 per year directly transferred in 3 equal installments into bank account",
    eligibility: "All landholding farmer families across India holding cultivable land title",
    landSize: "all",
    documents: ["Aadhaar Card", "Land Khatauni/Khasra Copy", "Active Bank Passbook", "e-KYC Status"],
    department: "Ministry of Agriculture & Farmers Welfare, GoI",
    portalUrl: "https://pmkisan.gov.in/"
  },
  {
    id: "s2",
    name: "PM-KUSUM Component B & C (Solar Agriculture Pump Subsidy)",
    category: "Solar Energy",
    benefit: "Up to 80% subsidy for installing 3HP to 10HP Off-Grid & Grid-Connected Solar Water Pumps",
    eligibility: "Individual farmers, Water User Associations, and Cooperatives with tubewell setup",
    landSize: "all",
    documents: ["Electricity Connection ID", "Aadhaar Card", "Land Ownership Proof", "Bank Account Details"],
    department: "Ministry of New and Renewable Energy (MNRE)",
    portalUrl: "https://pmkusum.mnre.gov.in/"
  },
  {
    id: "s3",
    name: "PMFBY (Pradhan Mantri Fasal Bima Yojana)",
    category: "Crop Insurance",
    benefit: "Comprehensive risk coverage against crop loss due to drought, flood, pests at 1.5% - 2% premium",
    eligibility: "All farmers growing notified crops in notified areas (Laoanee & Non-loanee)",
    landSize: "all",
    documents: ["Sowing Certificate", "Land Registry Copy", "Bank Passbook", "Aadhaar Card"],
    department: "Department of Agriculture and Farmers Welfare",
    portalUrl: "https://pmfby.gov.in/"
  },
  {
    id: "s4",
    name: "SMAM (Sub-Mission on Agricultural Mechanization / Agri Drone Subsidy)",
    category: "Mechanization",
    benefit: "50% to 80% financial assistance for purchasing Tractors, Harvesters & Agricultural Drones",
    eligibility: "Small & Marginal Farmers, Women Farmers, SC/ST, Custom Hiring Centers",
    landSize: "small",
    documents: ["Custom Hiring Center Registration", "Aadhaar", "Land Record", "Bank Account"],
    department: "ICAR & State Directorates of Agriculture",
    portalUrl: "https://agrimachinery.nic.in/"
  },
  {
    id: "s5",
    name: "Soil Health Card Scheme (National Mission for Sustainable Agriculture)",
    category: "Soil & Fertilizer",
    benefit: "Free testing of 12 soil parameters (N, P, K, pH, EC, Organic Carbon) with customized fertilizer advice",
    eligibility: "Every agricultural land owner issued a revised card every 3 years",
    landSize: "all",
    documents: ["Khasra Number", "Farmer Aadhaar", "Mobile Number"],
    department: "Soil Health Portal, Government of India",
    portalUrl: "https://soilhealth.dac.gov.in/"
  }
];

export default function SchemeFinder() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredSchemes = SCHEMES_DATA.filter((scheme) => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          scheme.benefit.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="schemes" className="py-20 relative bg-earth-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-emerald-500/30 text-xs text-emerald-400 font-semibold">
            <Landmark className="w-4 h-4 text-emerald-400" />
            <span>Government Subsidies & Benefits Portal</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Agriculture <span className="text-agri-gradient">Scheme Finder</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Instantly discover government subsidies, direct cash transfers, solar pump grants, and crop insurance tailored for Indian farmers.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="glass-card p-4 rounded-2xl border border-emerald-500/20 mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-emerald-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search PM-KISAN, Solar Pump, Insurance..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-earth-900 border border-emerald-500/30 text-slate-200 text-xs pl-10 pr-4 py-2.5 rounded-xl focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div className="flex space-x-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {["All", "Direct Cash", "Solar Energy", "Crop Insurance", "Mechanization", "Soil & Fertilizer"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat
                    ? "bg-emerald-600 text-white shadow"
                    : "bg-earth-900 text-slate-300 hover:text-white border border-emerald-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Schemes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredSchemes.map((scheme) => (
            <div
              key={scheme.id}
              className="glass-card rounded-2xl p-6 border border-emerald-500/30 space-y-4 hover:border-emerald-400/50 transition-all shadow-xl flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-3">
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-1 rounded-md border border-emerald-500/30">
                    {scheme.category.toUpperCase()}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{scheme.department}</span>
                </div>

                <h3 className="text-lg font-bold text-white leading-snug">{scheme.name}</h3>

                {/* Financial Benefit Callout */}
                <div className="p-3.5 rounded-xl bg-earth-900/90 border border-emerald-500/20 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-harvest-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs text-slate-400 font-medium">Financial Benefit:</p>
                    <p className="text-xs font-bold text-emerald-300 mt-0.5">{scheme.benefit}</p>
                  </div>
                </div>

                {/* Eligibility & Documents */}
                <div className="space-y-2 text-xs">
                  <p className="text-slate-300">
                    <b className="text-slate-400">Eligibility:</b> {scheme.eligibility}
                  </p>
                  
                  <div>
                    <span className="text-slate-400 font-bold block mb-1">Required Documents:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {scheme.documents.map((doc, idx) => (
                        <span
                          key={idx}
                          className="bg-earth-950 text-slate-300 text-[10px] px-2 py-0.5 rounded border border-emerald-900/60"
                        >
                          ✓ {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-emerald-900/40 flex items-center justify-between">
                <span className="text-[11px] text-emerald-400 font-medium">Verified Govt Portal</span>
                <a
                  href={scheme.portalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 transition"
                >
                  <span>Apply on Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
