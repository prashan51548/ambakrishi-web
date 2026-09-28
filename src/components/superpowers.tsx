"use client";

import React, { useState } from "react";
import { Cpu, Droplets, ShieldAlert, CloudRain, Thermometer, CheckCircle2, AlertTriangle, Volume2, ShieldCheck } from "lucide-react";

export default function SuperPowers() {
  // Feature 1: Smart Auto Irrigation State
  const [moisture, setMoisture] = useState<number>(38);
  const [isPumpOn, setIsPumpOn] = useState<boolean>(true);

  // Feature 2: Intruder Guard Alarm Simulator State
  const [isAlarmActive, setIsAlarmActive] = useState<boolean>(false);
  const [motionDetected, setMotionDetected] = useState<boolean>(false);

  // Feature 3: Weather Auto Pause State
  const [rainForecast, setRainForecast] = useState<boolean>(true);

  // Feature 4: DHT22 Fungal Risk State
  const [humidityHours, setHumidityHours] = useState<number>(6.5);

  const togglePumpSimulator = () => {
    if (moisture < 50) {
      setMoisture(75);
      setIsPumpOn(false);
    } else {
      setMoisture(35);
      setIsPumpOn(true);
    }
  };

  const triggerMotionGuard = () => {
    setMotionDetected(true);
    setIsAlarmActive(true);
    setTimeout(() => {
      setMotionDetected(false);
    }, 4000);
  };

  return (
    <section id="superpowers" className="py-24 relative bg-earth-950/90 border-t border-emerald-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-emerald-500/30 text-xs text-emerald-400 font-semibold shadow-lg">
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Hardware & AI Innovation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white">
            Core <span className="text-agri-gradient">4 Super-Powers</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Engineered with industrial ESP32 microcontrollers, PIR motion guards, Wi-Fi weather hooks, and DHT22 microclimate telemetry for total farm automation.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Super-Power 1: Smart Auto Irrigation */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/30 space-y-6 hover:border-emerald-400/50 transition-all shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shadow-inner">
                  <Droplets className="w-7 h-7" />
                </div>
                <span className="bg-emerald-500/10 text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-500/30 font-mono">
                  ESP32 Microcontroller
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">1. Smart Auto Irrigation</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  ESP32 + Capacitive Soil Moisture sensor logic. Automatically triggers motor pump ON when soil drops below 40% threshold, and stops when optimal hydration is reached.
                </p>
              </div>

              {/* Interactive ESP32 Simulator Box */}
              <div className="p-4 rounded-2xl bg-earth-900/90 border border-emerald-500/20 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">Soil Moisture Level:</span>
                  <span className={`font-mono font-bold ${moisture < 50 ? "text-amber-400" : "text-emerald-400"}`}>
                    {moisture}% ({moisture < 50 ? "Low - Pump Triggered" : "Optimal"})
                  </span>
                </div>

                <div className="w-full bg-earth-950 rounded-full h-3 overflow-hidden border border-emerald-900">
                  <div
                    className={`h-full transition-all duration-700 ${moisture < 50 ? "bg-amber-400" : "bg-emerald-400"}`}
                    style={{ width: `${moisture}%` }}
                  />
                </div>

                <div className="flex justify-between items-center text-xs pt-1">
                  <span className="text-slate-300 font-semibold flex items-center gap-1.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${isPumpOn ? "bg-blue-400 animate-ping" : "bg-slate-600"}`} />
                    Pump Status: <b className={isPumpOn ? "text-blue-400" : "text-slate-400"}>{isPumpOn ? "ON (Pumping)" : "OFF"}</b>
                  </span>

                  <button
                    onClick={togglePumpSimulator}
                    className="text-[11px] font-bold text-emerald-300 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 px-3 py-1.5 rounded-lg transition"
                  >
                    Simulate Soil Hydration
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-900/40 text-xs text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Prevents root rot & conserves groundwater automatically</span>
            </div>
          </div>

          {/* Super-Power 2: Intruder & Animal Guard */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/30 space-y-6 hover:border-emerald-400/50 transition-all shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-inner">
                  <ShieldAlert className="w-7 h-7" />
                </div>
                <span className="bg-amber-500/10 text-amber-300 text-[11px] font-bold px-3 py-1 rounded-full border border-amber-500/30 font-mono">
                  PIR Sensor + Siren
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">2. Intruder & Animal Guard</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  PIR Motion Sensor + High-Decibel Night Alarm. Detects wild boars, nilgai, stray cattle, and unauthorized perimeter trespassers during night hours.
                </p>
              </div>

              {/* Interactive PIR Motion Simulator */}
              <div className="p-4 rounded-2xl bg-earth-900/90 border border-amber-500/20 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">Perimeter Defense Status:</span>
                  <span className={`font-bold ${motionDetected ? "text-rose-400 animate-pulse" : "text-emerald-400"}`}>
                    {motionDetected ? "⚠️ ANIMAL INTRUSION DETECTED" : "ARMED & SECURE"}
                  </span>
                </div>

                <div className={`p-3 rounded-xl border flex items-center justify-between text-xs transition-all ${
                  motionDetected ? "bg-rose-950/80 border-rose-500 text-rose-200" : "bg-earth-950 border-emerald-900/50 text-slate-300"
                }`}>
                  <div className="flex items-center gap-2">
                    <Volume2 className={`w-4 h-4 ${motionDetected ? "text-rose-400 animate-bounce" : "text-slate-500"}`} />
                    <span>Night Siren Alarm (110 dB): <b>{isAlarmActive && motionDetected ? "BLARING" : "STANDBY"}</b></span>
                  </div>
                  <button
                    onClick={triggerMotionGuard}
                    className="bg-amber-500 hover:bg-amber-400 text-earth-950 font-bold text-[11px] px-3 py-1.5 rounded-lg transition"
                  >
                    Simulate Intrusion
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-900/40 text-xs text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero crop destruction from nocturnal wildlife attacks</span>
            </div>
          </div>

          {/* Super-Power 3: Rain & Weather Intelligence */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/30 space-y-6 hover:border-emerald-400/50 transition-all shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 rounded-2xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center shadow-inner">
                  <CloudRain className="w-7 h-7" />
                </div>
                <span className="bg-sky-500/10 text-sky-300 text-[11px] font-bold px-3 py-1 rounded-full border border-sky-500/30 font-mono">
                  Wi-Fi Weather API
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">3. Rain & Weather Intelligence</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Live Wi-Fi Weather API integration automatically pauses scheduled pump irrigation before rain strikes, saving thousands of liters of water & electricity bill costs.
                </p>
              </div>

              {/* Interactive Weather API Toggle Box */}
              <div className="p-4 rounded-2xl bg-earth-900/90 border border-sky-500/20 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">Live Weather Hook:</span>
                  <span className="text-sky-300 font-semibold">OpenWeather MAP API v3.0</span>
                </div>

                <div className="p-3 rounded-xl bg-earth-950 border border-sky-900/50 flex justify-between items-center text-xs">
                  <div>
                    <p className="text-slate-300 font-bold">
                      {rainForecast ? "🌧️ Heavy Rainfall Predicted (Next 4 Hours)" : "☀️ Clear Sunny Sky"}
                    </p>
                    <p className="text-[11px] text-emerald-400 mt-0.5">
                      {rainForecast ? "Auto-Pause Logic: IRRIGATION HALTED" : "Irrigation Running on Normal Schedule"}
                    </p>
                  </div>

                  <button
                    onClick={() => setRainForecast(!rainForecast)}
                    className="bg-sky-600 hover:bg-sky-500 text-white font-bold text-[11px] px-3 py-1.5 rounded-lg transition"
                  >
                    Toggle Weather
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-900/40 text-xs text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Saves up to 40% water & 30% electricity costs every month</span>
            </div>
          </div>

          {/* Super-Power 4: Fungal Disease Early Warning */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-emerald-500/30 space-y-6 hover:border-emerald-400/50 transition-all shadow-2xl relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shadow-inner">
                  <Thermometer className="w-7 h-7" />
                </div>
                <span className="bg-emerald-500/10 text-emerald-300 text-[11px] font-bold px-3 py-1 rounded-full border border-emerald-500/30 font-mono">
                  DHT22 Sensor Analytics
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">4. Fungal Disease Early Warning</h3>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  DHT22 Temperature & Humidity tracking. Triggers automated fungicide alert if relative humidity stays above 85% for 6+ consecutive hours, halting fungal spores before crop leaves show spots.
                </p>
              </div>

              {/* Interactive DHT22 6-Hour Risk Timer */}
              <div className="p-4 rounded-2xl bg-earth-900/90 border border-emerald-500/20 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-medium">Consecutive High Humidity Hours:</span>
                  <span className="text-amber-400 font-extrabold font-mono">{humidityHours} Hours (&gt;85% RH)</span>
                </div>

                <div className="p-3 rounded-xl bg-earth-950 border border-amber-500/30 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2 text-amber-300 font-bold">
                    <AlertTriangle className="w-4 h-4 text-amber-400 animate-pulse" />
                    <span>Early Fungicide Alert Triggered!</span>
                  </div>

                  <button
                    onClick={() => setHumidityHours(humidityHours >= 6 ? 2.5 : 6.5)}
                    className="bg-emerald-700 hover:bg-emerald-600 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg"
                  >
                    Reset Sensor Logs
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-900/40 text-xs text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Stops Late Blight, Rust & Powdery Mildew 48 hours before outbreak</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
