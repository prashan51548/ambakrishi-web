"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { ref, onValue, update } from "firebase/database";
import { useRouter } from "next/navigation";
import { auth, database } from "@/lib/firebase";

export default function AdminDashboard() {
  const router = useRouter();

  const [userEmail, setUserEmail] = useState("");
  const [farm, setFarm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [commandLoading, setCommandLoading] = useState("");

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

  const sendCommand = async (
    command: "pump" | "buzzer",
    value: boolean
  ) => {
    try {
      setCommandLoading(command);

      await update(ref(database, "farm/commands"), {
        [command]: value,
      });

      console.log(`${command} command sent:`, value);
    } catch (error) {
      console.error("Command failed:", error);
      alert("Command failed. Check Firebase rules.");
    } finally {
      setCommandLoading("");
    }
  };

  const logout = async () => {
    await signOut(auth);
    router.replace("/admin/login");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#020817] text-white flex items-center justify-center">
        <p className="text-emerald-400 text-xl">
          Loading Admin Dashboard...
        </p>
      </main>
    );
  }

  const cards = [
    ["Device Status", farm?.deviceStatus ?? "--"],
    [
      "Soil Moisture",
      farm?.soilMoisture != null ? `${farm.soilMoisture}%` : "--",
    ],
    [
      "Humidity",
      farm?.humidity != null ? `${farm.humidity}%` : "--",
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

  const pumpCommand = farm?.commands?.pump ?? false;
  const buzzerCommand = farm?.commands?.buzzer ?? false;

  return (
    <main className="min-h-screen bg-[#020817] text-white">
      <header className="border-b border-emerald-900 bg-[#071713] px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              KRISHI{" "}
              <span className="text-emerald-400">KALYAN</span>
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

        <div className="mb-8">
          <p className="text-gray-400">Logged in as</p>

          <h2 className="text-xl font-semibold text-emerald-400">
            {userEmail}
          </h2>
        </div>

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
              key={title}
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

        <div className="mt-8">
          <h2 className="text-2xl font-bold">
            Farm Control Center
          </h2>

          <p className="text-gray-400 mt-1">
            Send commands to the ESP32 through Firebase
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-5">

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
                onClick={() => sendCommand("pump", true)}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-black font-bold py-3 rounded-lg"
              >
                Pump ON
              </button>

              <button
                disabled={commandLoading === "pump"}
                onClick={() => sendCommand("pump", false)}
                className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-50 font-bold py-3 rounded-lg"
              >
                Pump OFF
              </button>
            </div>
          </div>

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
                disabled={commandLoading === "buzzer"}
                onClick={() => sendCommand("buzzer", true)}
                className="flex-1 bg-yellow-500 hover:bg-yellow-600 disabled:opacity-50 text-black font-bold py-3 rounded-lg"
              >
                Buzzer ON
              </button>

              <button
                disabled={commandLoading === "buzzer"}
                onClick={() => sendCommand("buzzer", false)}
                className="flex-1 bg-red-500 hover:bg-red-600 disabled:opacity-50 font-bold py-3 rounded-lg"
              >
                Buzzer OFF
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-[#081a19] border border-emerald-900 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">
            System Status
          </h3>

          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></span>

            <span>
              Firebase Realtime Database Connected
            </span>
          </div>

          <p className="text-gray-400 mt-3 text-sm">
            Sensor values update automatically whenever ESP32 updates Firebase.
          </p>
        </div>

      </section>
    </main>
  );
}
