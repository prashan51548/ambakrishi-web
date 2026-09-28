"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, database } from "@/lib/firebase";

export default function FarmerSignup() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    farmName: "",
    village: "",
    district: "",
    state: "",
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

  const handleSignup = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.phone ||
      !form.farmName ||
      !form.village ||
      !form.district ||
      !form.state ||
      !form.email ||
      !form.password
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          form.email,
          form.password
        );

      const uid = userCredential.user.uid;

      await set(ref(database, `farmers/${uid}`), {
        profile: {
          uid,
          name: form.name,
          phone: form.phone,
          farmName: form.farmName,
          village: form.village,
          district: form.district,
          state: form.state,
          email: form.email,
          createdAt: Date.now(),
        },

        farm: {
          deviceStatus: "OFFLINE",
          soilMoisture: 0,
          humidity: 0,
          temperature: 0,
          fungalRisk: "LOW",
          irrigation: "NOT REQUIRED",
          motion: false,
          buzzer: false,
          soilRaw: 0,

          commands: {
            pump: false,
            buzzer: false,
          },

          lastUpdated: Date.now(),
        },
      });

      alert("Farmer account created successfully.");

      router.push("/farmer/login");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#07131a] flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-[#0d1f26] border border-emerald-700 rounded-2xl p-8">
        <h1 className="text-4xl font-bold text-emerald-400 text-center mb-2">
          Farmer Signup
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Create your Ambakrishi account
        </p>

        <form
          onSubmit={handleSignup}
          className="grid md:grid-cols-2 gap-4"
        >
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="bg-[#132b35] p-3 rounded-lg text-white"
          />

          <input
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className="bg-[#132b35] p-3 rounded-lg text-white"
          />

          <input
            name="farmName"
            placeholder="Farm Name"
            value={form.farmName}
            onChange={handleChange}
            className="bg-[#132b35] p-3 rounded-lg text-white"
          />

          <input
            name="village"
            placeholder="Village"
            value={form.village}
            onChange={handleChange}
            className="bg-[#132b35] p-3 rounded-lg text-white"
          />

          <input
            name="district"
            placeholder="District"
            value={form.district}
            onChange={handleChange}
            className="bg-[#132b35] p-3 rounded-lg text-white"
          />

          <input
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className="bg-[#132b35] p-3 rounded-lg text-white"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="bg-[#132b35] p-3 rounded-lg text-white md:col-span-2"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="bg-[#132b35] p-3 rounded-lg text-white md:col-span-2"
          />

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-emerald-500 hover:bg-emerald-600 rounded-lg py-3 font-bold text-black disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/farmer/login")}
            className="md:col-span-2 border border-emerald-500 text-emerald-400 rounded-lg py-3"
          >
            Already have an account? Login
          </button>
        </form>
      </div>
    </main>
  );
}