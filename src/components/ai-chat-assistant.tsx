"use client";

import React, { useState } from "react";
import { X, Send, Bot, Sparkles, Sprout } from "lucide-react";

interface ChatMessage {
  sender: "bot" | "user";
  text: string;
  time: string;
}

export default function AiChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "bot",
      text: "Sat Sri Akal! Namaste! I am Krishi Mitra AI. How can I assist your farm today?",
      time: "Just now"
    }
  ]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputMsg;
    if (!text.trim()) return;

    const newMsg: ChatMessage = { sender: "user", text, time: "Just now" };
    setMessages((prev) => [...prev, newMsg]);
    if (!textToSend) setInputMsg("");

    // Simulate AI Agronomist Answer
    setTimeout(() => {
      let botReply = "Thank you for asking. Based on ICAR agronomist guidelines and local weather data in Punjab/Haryana, we recommend checking soil moisture levels and applying balanced N-P-K nutrients.";

      if (text.toLowerCase().includes("wheat") || text.toLowerCase().includes("yellow")) {
        botReply = "Yellowing in wheat leaves is often caused by Stripe Rust (Puccinia striiformis) or Nitrogen deficiency. Check if there are yellow pustule lines. If so, spray Propiconazole 25% EC @ 200ml/acre.";
      } else if (text.toLowerCase().includes("rain") || text.toLowerCase().includes("weather")) {
        botReply = "Live Weather Radar: Rain probability is 80% tomorrow in Mohali & Patiala region. Smart Auto Irrigation has automatically paused pumps on your fields.";
      } else if (text.toLowerCase().includes("solar") || text.toLowerCase().includes("kusum") || text.toLowerCase().includes("scheme")) {
        botReply = "Under PM-KUSUM Scheme, farmers receive up to 80% subsidy for solar water pumps (3HP - 10HP). Apply via our Scheme Finder module with your Land Khatauni & Aadhaar.";
      }

      setMessages((prev) => [...prev, { sender: "bot", text: botReply, time: "Just now" }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 via-agri-500 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-extrabold text-xs px-4 py-3.5 rounded-full shadow-2xl shadow-emerald-950/80 border border-emerald-400/40 transform hover:scale-105 transition-all group"
        >
          <div className="relative">
            <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform text-harvest-400" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
          </div>
          <span>Krishi Mitra AI Assistant</span>
        </button>
      ) : (
        <div className="glass-card max-w-sm sm:max-w-md w-[92vw] sm:w-[380px] h-[520px] rounded-3xl border border-emerald-500/40 shadow-2xl flex flex-col justify-between overflow-hidden animate-in fade-in zoom-in-95">
          
          {/* Header */}
          <div className="bg-earth-900/90 px-4 py-3 border-b border-emerald-500/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                <Bot className="w-5 h-5 text-harvest-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Krishi Mitra AI</span>
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                </h4>
                <p className="text-[10px] text-emerald-400">Online | Agronomist Assistant</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 scrollbar-thin">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 text-xs ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Sprout className="w-3.5 h-3.5" />
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-emerald-600 text-white rounded-tr-none"
                      : "bg-earth-900 border border-emerald-500/20 text-slate-200 rounded-tl-none"
                  }`}
                >
                  <p>{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompt Pills */}
          <div className="px-3 py-2 bg-earth-950 border-t border-emerald-900/40 flex space-x-1.5 overflow-x-auto scrollbar-none text-[10px]">
            <button
              onClick={() => handleSend("Why are wheat leaves turning yellow?")}
              className="bg-earth-900 hover:bg-emerald-950 text-emerald-300 px-2.5 py-1 rounded-full whitespace-nowrap border border-emerald-500/20 shrink-0"
            >
              🌾 Yellow Wheat Leaves?
            </button>
            <button
              onClick={() => handleSend("Is rain expected tomorrow in Mohali?")}
              className="bg-earth-900 hover:bg-emerald-950 text-emerald-300 px-2.5 py-1 rounded-full whitespace-nowrap border border-emerald-500/20 shrink-0"
            >
              🌧️ Rain Forecast?
            </button>
            <button
              onClick={() => handleSend("PM-KUSUM Solar Pump 80% Subsidy process?")}
              className="bg-earth-900 hover:bg-emerald-950 text-emerald-300 px-2.5 py-1 rounded-full whitespace-nowrap border border-emerald-500/20 shrink-0"
            >
              ☀️ Solar Pump Subsidy
            </button>
          </div>

          {/* Input Box */}
          <div className="p-3 bg-earth-900/90 border-t border-emerald-500/20 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about crop disease, sensors, weather, alerts..."
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 bg-earth-950 border border-emerald-500/30 text-white text-xs px-3 py-2 rounded-xl focus:outline-none focus:border-emerald-400"
            />
            <button
              onClick={() => handleSend()}
              className="bg-emerald-600 hover:bg-emerald-500 text-white p-2 rounded-xl"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
