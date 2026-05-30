/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import AppSimulator from "./components/AppSimulator";
import StrategyDeck from "./components/StrategyDeck";
import { Sparkles, BarChart2, Laptop, ArrowRightLeft, Cpu } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"simulator" | "strategy">("simulator");

  return (
    <div id="app-workspace" className="min-h-screen bg-[#FAF9F5] text-neutral-800 font-sans flex flex-col relative selection:bg-amber-100 selection:text-neutral-900">
      
      {/* GLOBAL PERSISTENT HEADER SPLIT */}
      <div className="bg-[#12110F] text-[#FAF9F5] px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-b border-neutral-800 z-30 shadow-md">
        <div className="flex items-center gap-3">
          <div className="bg-amber-500/10 border border-amber-500/30 p-2 rounded-lg text-[#C2B280]">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div className="text-left">
            <h2 className="font-serif text-lg leading-tight tracking-wide font-normal italic">
              kastelas.in <span className="font-sans text-[10px] font-bold tracking-widest uppercase bg-amber-500 text-neutral-950 px-1.5 py-0.5 rounded ml-2">SYSTEM SANDBOX</span>
            </h2>
            <p className="text-[9px] font-mono tracking-wider text-neutral-400">AI FASHION ENGINE • 2026 ARCHITECTURE DEMO</p>
          </div>
        </div>

        {/* Dynamic Dual Tab Controls */}
        <div className="flex items-center gap-2 mt-4 sm:mt-0 bg-[#1F1E1B] p-1 rounded-xl border border-neutral-800/80">
          <button 
            id="tab-btn-simulator"
            onClick={() => setActiveTab("simulator")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium tracking-wide transition ${
              activeTab === "simulator" 
                ? "bg-[#C2B280] text-neutral-950 font-semibold shadow-xs" 
                : "text-neutral-400 hover:text-[#FAF9F5]"
            }`}
          >
            <Laptop className="w-3.5 h-3.5" />
            <span>Interactive App Vibe</span>
          </button>
          
          <button 
            id="tab-btn-strategy"
            onClick={() => setActiveTab("strategy")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium tracking-wide transition ${
              activeTab === "strategy" 
                ? "bg-[#C2B280] text-neutral-950 font-semibold shadow-xs" 
                : "text-neutral-400 hover:text-[#FAF9F5]"
            }`}
          >
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Brand Strategy Deck</span>
          </button>
        </div>
      </div>

      {/* CORE VIEWPORT LAYER */}
      <main className="flex-1 flex flex-col">
        {activeTab === "simulator" ? (
          <AppSimulator />
        ) : (
          <div className="flex-1 bg-white border-t border-neutral-100 overflow-y-auto">
            <StrategyDeck />
          </div>
        )}
      </main>

      {/* GLOBAL FOOTER BRAND INJECTS */}
      <footer className="bg-neutral-950 text-neutral-500 py-6 px-8 border-t border-neutral-900 flex flex-col md:flex-row items-center justify-between text-xs font-mono tracking-wide">
        <p>© 2026 kastelas.in • Designed for gen-Z and high gentry gentry fashion-tech audiences.</p>
        <div className="flex gap-4 mt-4 md:mt-0">
          <span className="hover:text-neutral-300 cursor-pointer">PREMIUM CONSULTANCY</span>
          <span>•</span>
          <span className="hover:text-neutral-300 cursor-pointer text-[#C2B280]">VIP ACCESS ACTIVE</span>
        </div>
      </footer>

    </div>
  );
}
