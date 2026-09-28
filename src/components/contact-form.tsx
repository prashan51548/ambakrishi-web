"use client";

import React, { useState } from "react";
import { Mail, PhoneCall, MapPin, Send, CheckCircle2, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    state: "Punjab",
    acres: "5-10 Acres",
    interest: "ESP32 IoT Sensor Kit",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <section id="contact" className="py-20 relative bg-earth-950/90 border-t border-emerald-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Contact Details & Office Address */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-emerald-500/30 text-xs text-emerald-400 font-semibold">
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>Get In Touch</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Request a Field Demo or <span className="text-agri-gradient">IoT Installation</span>
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed">
              Have questions about solar sensor kits, weather API setup, or dealer partnerships? 
              Our agronomist team in Mohali will call you back within 2 hours.
            </p>

            <div className="space-y-4 pt-2">
              <div className="glass-card p-4 rounded-2xl border border-emerald-500/20 flex items-start gap-3">
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">R&D Innovation Hub</h4>
                  <p className="text-xs text-slate-300">Sector 81, Knowledge City, Mohali, Punjab - 160055</p>
                  <p className="text-[11px] text-harvest-400 font-semibold mt-1">Incubated under RKVY-RAFTAAR & NIDHI PRAYAS</p>
                </div>
              </div>

              <div className="glass-card p-4 rounded-2xl border border-emerald-500/20 flex items-start gap-3">
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Direct Farmer Helpline</h4>
                  <p className="text-sm font-bold text-emerald-300">1800-180-1551 (Toll-Free)</p>
                  <p className="text-xs text-slate-400">Mon - Sat: 8:00 AM to 8:00 PM IST</p>
                </div>
              </div>

              <div className="glass-card p-4 rounded-2xl border border-emerald-500/20 flex items-start gap-3">
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Email Desk</h4>
                  <p className="text-xs text-slate-300 font-mono">ambakrishi@gmail.com</p>
                  <p className="text-[11px] text-slate-400">Inquiries, Subsidies & Dealerships</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/30 shadow-2xl relative">
              
              {isSubmitted ? (
                <div className="py-12 text-center space-y-4 animate-in fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Demo Request Received!</h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Thank you <b>{formData.name}</b>. Our Ambakrishi agronomist team from Mohali, Punjab will reach out to <b>{formData.phone}</b> shortly.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-white border-b border-emerald-900/40 pb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-harvest-500" />
                    <span>Inquiry & Field Demo Form</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Gurpreet Singh"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-earth-900 border border-emerald-500/30 text-white text-xs p-3 rounded-xl focus:outline-none focus:border-emerald-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Phone / WhatsApp Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-earth-900 border border-emerald-500/30 text-white text-xs p-3 rounded-xl focus:outline-none focus:border-emerald-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Select State *</label>
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full bg-earth-900 border border-emerald-500/30 text-white text-xs p-3 rounded-xl focus:outline-none focus:border-emerald-400"
                      >
                        <option value="Punjab">Punjab</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Other">Other State</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-300">Total Farm Acreage *</label>
                      <select
                        value={formData.acres}
                        onChange={(e) => setFormData({ ...formData, acres: e.target.value })}
                        className="w-full bg-earth-900 border border-emerald-500/30 text-white text-xs p-3 rounded-xl focus:outline-none focus:border-emerald-400"
                      >
                        <option value="Under 2 Acres">Under 2 Acres (Small)</option>
                        <option value="2-5 Acres">2 - 5 Acres</option>
                        <option value="5-10 Acres">5 - 10 Acres</option>
                        <option value="Above 10 Acres">Above 10 Acres</option>
                        <option value="Agri-Cooperative / CHC">Agri Cooperative / CHC</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Primary Area of Interest *</label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full bg-earth-900 border border-emerald-500/30 text-white text-xs p-3 rounded-xl focus:outline-none focus:border-emerald-400"
                    >
                      <option value="ESP32 IoT Sensor Kit">ESP32 Smart Auto Irrigation Kit</option>
                      <option value="PIR Animal Guard Siren">PIR Animal Guard & Night Siren</option>
                      <option value="AI Crop Vision Scanner">AI Crop Doctor Vision Scanner</option>
                      <option value="Govt Subsidy Assistance">RKVY / PM-KUSUM Subsidy Guidance</option>
                      <option value="Dealership & Distribution">Distributor / Dealer Partnership</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-300">Additional Field Details / Message</label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about your crop type, tubewell motor HP, or specific farm challenge..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-earth-900 border border-emerald-500/30 text-white text-xs p-3 rounded-xl focus:outline-none focus:border-emerald-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-emerald-600 to-agri-500 hover:from-emerald-500 hover:to-agri-400 text-white font-extrabold text-sm py-4 rounded-xl shadow-lg shadow-emerald-950/60 transition flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Demo Request</span>
                  </button>

                  <p className="text-[11px] text-center text-slate-400">
                    🔒 Your contact information is kept strictly confidential under Ambakrishi Privacy Policy.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
