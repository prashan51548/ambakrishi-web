"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Activity,
  BellRing,
  BrainCircuit,
  Droplets,
  Radio,
  ShieldAlert,
  Thermometer,
  Wind,
} from "lucide-react";

import { ref, onValue } from "firebase/database";
import { database } from "@/lib/firebase";

type FarmData = {
  temperature?: number;
  humidity?: number;
  soilMoisture?: number;
  soilStatus?: string;
  irrigation?: string;
  fungalRisk?: string;
  motion?: boolean;
  buzzer?: boolean;
  deviceStatus?: string;
};

export default function IotDashboard() {
  const [farm, setFarm] = useState<FarmData | null>(null);
  const [loading, setLoading] = useState(true);

  // =========================================
  // FIREBASE REALTIME LISTENER
  // =========================================

  useEffect(() => {
    const farmRef = ref(database, "farm");

    const unsubscribe = onValue(
      farmRef,
      (snapshot) => {
        const data = snapshot.val();

        setFarm(data);
        setLoading(false);
      },
      (error) => {
        console.error("Firebase read error:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // =========================================
  // LIVE FIREBASE VALUES
  // =========================================

  const moisture =
    typeof farm?.soilMoisture === "number"
      ? farm.soilMoisture
      : 0;

  const temperature =
    typeof farm?.temperature === "number"
      ? farm.temperature
      : 0;

  const humidity =
    typeof farm?.humidity === "number"
      ? farm.humidity
      : 0;

  const motion = farm?.motion === true;

  const buzzer = farm?.buzzer === true;

  const deviceOnline =
    farm?.deviceStatus === "ONLINE";

  // Use ESP32/Firebase values when available.
  // Fallback calculations remain for safety.

  const fungalRisk =
    farm?.fungalRisk ??
    (humidity > 80
      ? "HIGH"
      : humidity > 65
      ? "MEDIUM"
      : "LOW");

  const soilStatus =
    farm?.soilStatus ??
    (moisture < 30
      ? "DRY"
      : moisture < 70
      ? "NORMAL"
      : "WET");

  const irrigation =
    farm?.irrigation ??
    (moisture < 30
      ? "REQUIRED"
      : "NOT REQUIRED");

  // =========================================
  // AI BRAIN
  // =========================================

  const brain = useMemo(() => {
    if (motion) {
      return {
        level: "CRITICAL",
        text:
          "Field movement detected. Local alarm active; SMS and voice-call alert are ready to trigger.",
      };
    }

    if (fungalRisk === "HIGH") {
      return {
        level: "WARNING",
        text:
          "High humidity is creating fungal-risk conditions. Inspect crop leaves and avoid unnecessary watering.",
      };
    }

    if (moisture < 30) {
      return {
        level: "ACTION",
        text:
          "Soil moisture is low. Irrigation is recommended; automatic pump control can be enabled after relay validation.",
      };
    }

    return {
      level: "HEALTHY",
      text:
        "Field conditions are stable. Continue monitoring sensor trends.",
    };
  }, [motion, fungalRisk, moisture]);

  return (
    <section
      id="iot-dashboard"
      className="py-20 px-4 sm:px-6"
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-10">

          <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold mb-3">
            <Radio className="w-5 h-5" />
            ESP32 Field Node
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Live Farm Intelligence Dashboard
          </h2>

          <p className="text-slate-400 mt-3 max-w-3xl">
            Real-time ESP32 monitoring using Firebase
            Realtime Database — DHT11 temperature and
            humidity, soil moisture, PIR field security
            and buzzer alarm.
          </p>

          {/* DEVICE STATUS */}

          <div className="mt-4">

            {loading ? (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold">
                CONNECTING TO FIELD NODE...
              </span>
            ) : deviceOnline ? (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                DEVICE ONLINE · LIVE
              </span>
            ) : (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-bold">
                DEVICE OFFLINE
              </span>
            )}

          </div>

        </div>

        {/* =====================================
            LIVE SENSOR CARDS
        ===================================== */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

          <Metric
            icon={
              <Thermometer className="w-5 h-5 text-amber-400" />
            }
            label="Temperature"
            value={`${temperature.toFixed(1)} °C`}
          />

          <Metric
            icon={
              <Wind className="w-5 h-5 text-sky-400" />
            }
            label="Humidity"
            value={`${humidity.toFixed(1)} %`}
          />

          <Metric
            icon={
              <Droplets className="w-5 h-5 text-blue-400" />
            }
            label="Soil Moisture"
            value={`${moisture}%`}
            sub={`${soilStatus} · Irrigation ${irrigation}`}
          />

          <Metric
            icon={
              <ShieldAlert
                className={`w-5 h-5 ${
                  motion
                    ? "text-rose-400"
                    : "text-emerald-400"
                }`}
              />
            }
            label="Field Security"
            value={motion ? "MOTION" : "SAFE"}
            sub={`Buzzer: ${buzzer ? "ON" : "OFF"}`}
          />

        </div>

        {/* =====================================
            AI + ALERT CENTER
        ===================================== */}

        <div className="grid lg:grid-cols-5 gap-6">

          {/* AI BRAIN */}

          <div
            id="ai-brain"
            className="lg:col-span-3 glass-card rounded-3xl border border-emerald-500/30 p-6 sm:p-8"
          >

            <div className="flex items-center gap-3 mb-5">

              <div className="w-12 h-12 rounded-2xl bg-violet-500/15 border border-violet-400/30 flex items-center justify-center">
                <BrainCircuit className="w-6 h-6 text-violet-300" />
              </div>

              <div>
                <p className="text-xs text-violet-300 font-bold">
                  KRISHI AI BRAIN
                </p>

                <h3 className="text-xl font-bold text-white">
                  Sensor Fusion & Decision Engine
                </h3>
              </div>

            </div>

            <div className="bg-earth-950/80 border border-emerald-900/60 rounded-2xl p-5">

              <div className="flex items-center justify-between gap-3 mb-3">

                <span className="text-xs text-slate-400">
                  Current AI assessment
                </span>

                <span className="text-xs font-black text-amber-300">
                  {brain.level}
                </span>

              </div>

              <p className="text-sm text-slate-200 leading-relaxed">
                {brain.text}
              </p>

            </div>

            <div className="grid sm:grid-cols-3 gap-3 mt-4 text-xs">

              <Status
                label="Fungal Risk"
                value={fungalRisk}
              />

              <Status
                label="Irrigation"
                value={irrigation}
              />

              <Status
                label="Security"
                value={motion ? "ALERT" : "ARMED"}
              />

            </div>

          </div>

          {/* SMART ALERT CENTER */}

          <div
            id="alerts"
            className="lg:col-span-2 glass-card rounded-3xl border border-emerald-500/30 p-6 sm:p-8"
          >

            <div className="flex items-center gap-3 mb-5">

              <BellRing className="w-6 h-6 text-amber-400" />

              <div>
                <p className="text-xs text-amber-300 font-bold">
                  SMART ALERT CENTER
                </p>

                <h3 className="text-xl font-bold text-white">
                  SMS + Voice Calling
                </h3>
              </div>

            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-5">
              Critical AI decisions can be routed through
              a secure cloud backend to the farmer. The
              website never exposes provider secrets or
              API keys.
            </p>

            <div className="space-y-3 text-xs">

              <AlertRow
                title="SMS Alert"
                detail="Dry soil, fungal risk and security warnings"
              />

              <AlertRow
                title="Voice Call"
                detail="Escalation for critical field-security events"
              />

              <AlertRow
                title="Local Alarm"
                detail={
                  buzzer
                    ? "ESP32 buzzer currently active"
                    : "ESP32 buzzer currently inactive"
                }
              />

            </div>

          </div>

        </div>

        {/* =====================================
            LIVE FIREBASE STATUS
        ===================================== */}

        <div className="mt-6 glass-card rounded-2xl border border-emerald-500/20 p-4 flex flex-wrap items-center gap-3 text-xs text-slate-300">

          <Activity className="w-4 h-4 text-emerald-400" />

          <b className="text-white">
            Firebase Live Feed:
          </b>

          <span>
            Soil {moisture}%
          </span>

          <span>•</span>

          <span>
            Humidity {humidity.toFixed(1)}%
          </span>

          <span>•</span>

          <span>
            Temperature {temperature.toFixed(1)}°C
          </span>

          <span>•</span>

          <span>
            Motion {motion ? "DETECTED" : "SAFE"}
          </span>

          <span>•</span>

          <span>
            Buzzer {buzzer ? "ON" : "OFF"}
          </span>

        </div>

      </div>
    </section>
  );
}


// =========================================
// METRIC CARD
// =========================================

function Metric({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="glass-card rounded-2xl border border-emerald-500/20 p-5">

      <div className="flex items-center gap-2 text-slate-400 text-xs mb-3">
        {icon}
        <span>{label}</span>
      </div>

      <p className="text-2xl font-bold text-white">
        {value}
      </p>

      {sub && (
        <p className="text-xs text-slate-400 mt-2">
          {sub}
        </p>
      )}

    </div>
  );
}


// =========================================
// STATUS CARD
// =========================================

function Status({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-earth-950/60 border border-emerald-900/50 rounded-xl p-3">

      <p className="text-slate-500">
        {label}
      </p>

      <p className="text-white font-bold mt-1">
        {value}
      </p>

    </div>
  );
}


// =========================================
// ALERT ROW
// =========================================

function AlertRow({
  title,
  detail,
}: {
  title: string;
  detail: string;
}) {
  return (
    <div className="bg-earth-950/60 border border-emerald-900/50 rounded-xl p-3">

      <div className="flex items-center justify-between gap-3">

        <p className="text-white font-semibold">
          {title}
        </p>

        <span className="text-[10px] text-emerald-400 font-bold">
          BACKEND READY
        </span>

      </div>

      <p className="text-slate-400 mt-1">
        {detail}
      </p>

    </div>
  );
}