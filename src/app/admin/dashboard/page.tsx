"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import {
  ref,
  onValue,
  update,
  push,
  serverTimestamp,
  query,
  limitToLast,
} from "firebase/database";
import { useRouter } from "next/navigation";
import { auth, database } from "@/lib/firebase";

type FarmData = {
  deviceStatus?: string;
  soilMoisture?: number;
  humidity?: number;
  fungalRisk?: string;
  irrigation?: string;
  motion?: boolean;
  buzzer?: boolean;
  soilRaw?: number;
  temperature?: number;
  soilStatus?: string;
  commands?: {
    pump?: boolean;
    buzzer?: boolean;
  };
};

type ActivityLog = {
  id: string;
  device?: string;
  action?: string;
  user?: string;
  timestamp?: number;
};

export default function AdminDashboard() {
  const router = useRouter();

  const [userEmail, setUserEmail] = useState("");
  const [farm, setFarm] = useState<FarmData | null>(null);
  const [loading, setLoading] = useState(true);
  const [commandLoading, setCommandLoading] = useState("");
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);

  // =========================================
  // AUTH + LIVE FARM DATA
  // =========================================

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.replace("/admin/login");
        return;
      }

      setUserEmail(user.email || "Admin");
      setLoading(false);
    });

    const farmRef = ref(database, "farm");

    const unsubscribeDatabase = onValue(farmRef, (snapshot) => {
      setFarm(snapshot.val());
    });

    return () => {
      unsubscribeAuth();
      unsubscribeDatabase();
    };
  }, [router]);

  // =========================================
  // ACTIVITY HISTORY
  // =========================================

  useEffect(() => {
    const logsRef = query(
      ref(database, "activityLogs"),
      limitToLast(20)
    );

    const unsubscribeLogs = onValue(logsRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        setActivityLogs([]);
        return;
      }

      const logs: ActivityLog[] = Object.entries(data).map(
        ([id, value]) => ({
          id,
          ...(value as Omit<ActivityLog, "id">),
        })
      );

      logs.sort(
        (a, b) => (b.timestamp || 0) - (a.timestamp || 0)
      );

      setActivityLogs(logs);
    });

    return () => {
      unsubscribeLogs();
    };
  }, []);

  // =========================================
  // SEND CONTROL COMMAND
  // =========================================

  const sendCommand = async (
    command: "pump" | "buzzer",
    value: boolean
  ) => {
    try {
      setCommandLoading(command);

      // Command sent to ESP32
      await update(ref(database, "farm/commands"), {
        [command]: value,
      });

      // Save permanent activity history
      await push(ref(database, "activityLogs"), {
        device:
          command === "pump"
            ? "Irrigation Pump"
            : "Farm Buzzer",

        action: value ? "ON" : "OFF",

        user: userEmail || "Admin",

        timestamp: serverTimestamp(),
      });

      console.log(`${command} command sent:`, value);
    } catch (error) {
      console.error("Command failed:", error);

      alert(
        "Command failed. Please check Firebase connection/rules."
      );
    } finally {
      setCommandLoading("");
    }
  };

  // =========================================
  // LOGOUT
  // =========================================

  const logout = async () => {
    await signOut(auth);
    router.replace("/admin/login");
  };

  // =========================================
  // LOADING
  // =========================================

  if (loading) {
    return (
      <main className="min-h-screen bg-[#020817] text-white flex items-center justify-center">
        <p className="text-emerald-400 text-xl">
          Loading Admin Dashboard...
        </p>
      </main>
    );
  }

  // =========================================
  // SENSOR CARDS
  // =========================================

  const cards = [
    ["Device Status", farm?.deviceStatus ?? "--"],

    [
      "Soil Moisture",
      farm?.soilMoisture != null
        ? `${farm.soilMoisture}%`
        : "--",
    ],

    [
      "Humidity",
      farm?.humidity != null
        ? `${farm.humidity}%`
        : "--",
    ],

    ["Fungal Risk", farm?.fungalRisk ?? "--"],

    ["Irrigation", farm?.irrigation ?? "--"],

    [
      "Motion",
      farm?.motion === true
        ? "DETECTED"
        : farm?.motion === false
        ? "CLEAR"
        : "--",
    ],

    [
      "Buzzer",
      farm?.buzzer === true
        ? "ON"
        : farm?.buzzer === false
        ? "OFF"
        : "--",
    ],

    ["Soil Raw", farm?.soilRaw ?? "--"],
  ];

  const pumpCommand =
    farm?.commands?.pump ?? false;

  const buzzerCommand =
    farm?.commands?.buzzer ?? false;

  // =========================================
  // FORMAT TIME
  // =========================================

  const formatTime = (timestamp?: number) => {
    if (!timestamp) {
      return "Just now";
    }

    return new Date(timestamp).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <main className="min-h-screen bg-[#020817] text-white">

      {/* HEADER */}

      <header className="border-b border-emerald-900 bg-[#071713] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <div>
            <h1 className="text-2xl font-bold">
              KRISHI{" "}
              <span className="text-emerald-400">
                KALYAN
              </span>
            </h1>

            <p className="text-sm text-gray-400">
              Admin Control Center
            </p>
          </div>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg font-semibold"
          >
            Logout
          </button>

        </div>
      </header>

      <section className="max-w-7xl mx-auto p-6">

        {/* ADMIN */}

        <div className="mb-8">
          <p className="text-gray-400">
            Logged in as
          </p>

          <h2 className="text-xl font-semibold text-emerald-400">
            {userEmail}
          </h2>
        </div>

        {/* LIVE DASHBOARD */}

        <div className="mb-8">
          <h2 className="text-3xl font-bold">
            Live Farm Dashboard
          </h2>

          <p className="text-gray-400 mt-2">
            Real-time ESP32 & Firebase sensor monitoring
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {cards.map(([title, value]) => (
            <div
              key={String(title)}
              className="bg-[#081a19] border border-emerald-900 rounded-xl p-5"
            >
              <p className="text-gray-400 text-sm">
                {title}
              </p>

              <p className="text-2xl font-bold text-emerald-400 mt-2">
                {String(value)}
              </p>
            </div>
          ))}

        </div>

        {/* CONTROL CENTER */}

        <div className="mt-8">

          <h2 className="text-2xl font-bold">
            Farm Control Center
          </h2>

          <p className="text-gray-400 mt-1">
            Send commands to the ESP32 through Firebase
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-5">

          {/* PUMP */}

          <div className="bg-[#081a19] border border-emerald-900 rounded-xl p-6">

            <div className="flex justify-between items-center mb-5">

              <div>
                <h3 className="text-xl font-bold">
                  Irrigation Pump
                </h3>

                <p className="text-gray-400 text-sm mt-1">
                  Manual water pump control
                </p>
              </div>

              <span
                className={`px-4 py-2 rounded-full text-sm font-bold ${
                  pumpCommand
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {pumpCommand ? "ON" : "OFF"}
              </span>

            </div>

            <div className="flex gap-3">

              <button
                disabled={commandLoading === "pump"}
                onClick={() =>
                  sendCommand("pump", true)
                }
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-black font-bold py-3 rounded-lg"
              >
                Pump ON
              </button>

              <button
                disabled={commandLoading === "pump"}
                onClick={() =>
                  sendCommand("pump", false)
                }
                className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-50 font-bold py-3 rounded-lg"
              >
                Pump OFF
              </button>

            </div>

          </div>

          {/* BUZZER */}

          <div className="bg-[#081a19] border border-emerald-900 rounded-xl p-6">

            <div className="flex justify-between items-center mb-5">

              <div>
                <h3 className="text-xl font-bold">
                  Farm Buzzer
                </h3>

                <p className="text-gray-400 text-sm mt-1">
                  Manual alert buzzer control
                </p>
              </div>

              <span
                className={`px-4 py-2 rounded-full text-sm font-bold ${
                  buzzerCommand
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {buzzerCommand ? "ON" : "OFF"}
              </span>

            </div>

            <div className="flex gap-3">

              <button
                disabled={
                  commandLoading === "buzzer"
                }
                onClick={() =>
                  sendCommand("buzzer", true)
                }
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-black font-bold py-3 rounded-lg"
              >
                Buzzer ON
              </button>

              <button
                disabled={
                  commandLoading === "buzzer"
                }
                onClick={() =>
                  sendCommand("buzzer", false)
                }
                className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-50 font-bold py-3 rounded-lg"
              >
                Buzzer OFF
              </button>

            </div>

          </div>

        </div>

        {/* =================================
            RECENT ACTIVITY
        ================================= */}

        <div className="mt-8 bg-[#081a19] border border-emerald-900 rounded-xl p-6">

          <div className="flex items-center justify-between mb-5">

            <div>
              <h3 className="text-xl font-bold">
                Recent Activity
              </h3>

              <p className="text-gray-400 text-sm mt-1">
                Latest admin control actions
              </p>
            </div>

            <span className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full">
              LIVE
            </span>

          </div>

          {activityLogs.length === 0 ? (

            <div className="text-center py-8 text-gray-500">
              No activity recorded yet.
            </div>

          ) : (

            <div className="space-y-3">

              {activityLogs.map((log) => (

                <div
                  key={log.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-[#020817] border border-gray-800 rounded-lg px-4 py-4"
                >

                  <div className="flex items-center gap-4">

                    <div
                      className={`w-3 h-3 rounded-full ${
                        log.action === "ON"
                          ? "bg-emerald-400"
                          : "bg-red-400"
                      }`}
                    />

                    <div>

                      <p className="font-semibold">
                        {log.device || "Farm Device"}{" "}
                        <span
                          className={
                            log.action === "ON"
                              ? "text-emerald-400"
                              : "text-red-400"
                          }
                        >
                          {log.action}
                        </span>
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        By {log.user || "Admin"}
                      </p>

                    </div>

                  </div>

                  <p className="text-sm text-gray-400">
                    {formatTime(log.timestamp)}
                  </p>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* SYSTEM STATUS */}

        <div className="mt-8 bg-[#081a19] border border-emerald-900 rounded-xl p-6">

          <h3 className="text-xl font-bold mb-4">
            System Status
          </h3>

          <div className="flex items-center gap-3">

            <span className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse" />

            <span>
              Firebase Realtime Database Connected
            </span>

          </div>

          <p className="text-gray-400 mt-3 text-sm">
            Sensor values update automatically whenever
            ESP32 updates Firebase.
          </p>

        </div>

      </section>

    </main>
  );
}