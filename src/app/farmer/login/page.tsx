"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function FarmerLogin() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );

      router.push("/farmer/dashboard");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#07131a] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-[#0d1f26] border border-emerald-700 rounded-2xl p-8">

        <h1 className="text-4xl font-bold text-emerald-400 text-center mb-2">
          Farmer Login
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Login to Ambakrishi
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-[#132b35] p-3 rounded-lg text-white outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full bg-[#132b35] p-3 rounded-lg text-white outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-3 rounded-lg disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/farmer/signup")}
            className="w-full border border-emerald-500 text-emerald-400 py-3 rounded-lg"
          >
            Create New Account
          </button>
        </form>

      </div>
    </main>
  );
}