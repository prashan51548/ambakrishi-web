"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function AdminLogin() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020817] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-[#071711] border border-emerald-900 rounded-2xl p-8 shadow-2xl">

        <div className="text-center mb-8">
          <div className="text-4xl mb-3">🌱</div>

          <h1 className="text-3xl font-bold text-white">
            Krishi <span className="text-emerald-400">Kalyan</span>
          </h1>

          <p className="text-gray-400 mt-2">
            Admin Control Center
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Admin Email
            </label>

            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full px-4 py-3 rounded-lg bg-[#020817] border border-gray-700 text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Password
            </label>

            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-lg bg-[#020817] border border-gray-700 text-white outline-none focus:border-emerald-500"
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-950/40 border border-red-900 rounded-lg p-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Signing in..." : "Login to Admin Dashboard"}
          </button>

        </form>

        <p className="text-center text-xs text-gray-600 mt-7">
          Ambakrishi Technologies Private Limited • Secure Admin Access
        </p>

      </div>
    </main>
  );
}
