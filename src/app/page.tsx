import React from "react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import SuperPowers from "@/components/superpowers";
import AiCropDoctor from "@/components/ai-crop-doctor";
import IotDashboard from "@/components/iot-dashboard";
import SchemeFinder from "@/components/scheme-finder";
import IncubationAbout from "@/components/incubation-about";
import ImpactMetrics from "@/components/impact-metrics";
import ContactForm from "@/components/contact-form";
import AiChatAssistant from "@/components/ai-chat-assistant";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-earth-950 text-slate-100 selection:bg-emerald-500 selection:text-white font-sans">
      <Navbar />
      <main>
        <Hero />
        <SuperPowers />
        <ImpactMetrics />
        <AiCropDoctor />
        <IotDashboard />
        <SchemeFinder />
        <IncubationAbout />
        <ContactForm />
      </main>
      <Footer />
      <AiChatAssistant />
    </div>
  );
}
