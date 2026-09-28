import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ambakrishi Technologies Private Limited | Next-Gen IoT Precision Agriculture & AI Farm OS",
  description: "Ambakrishi Technologies Private Limited is an AgTech startup incubated under RKVY-RAFTAAR and NIDHI PRAYAS at Mohali, Punjab. Automated ESP32 irrigation, PIR animal intruder guards, Wi-Fi weather auto-pause, DHT22 fungal alerts, and AI crop diagnostics.",
  keywords: ["Ambakrishi Technologies Private Limited", "IoT Precision Agriculture", "AI Farm OS", "Smart Irrigation ESP32", "AgTech Punjab Mohali", "RKVY-RAFTAAR", "NIDHI PRAYAS", "PM Kisan Scheme"],
  authors: [{ name: "Ambakrishi Technologies Private Limited R&D Labs" }],
  openGraph: {
    title: "Ambakrishi Technologies Private Limited - Next-Gen IoT Precision Agriculture & AI Farm OS",
    description: "Automate irrigation with ESP32 soil sensors, protect fields with PIR animal alarms, and diagnose crop diseases with AI.",
    images: ["/images/hero-farm.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-earth-950 text-slate-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
