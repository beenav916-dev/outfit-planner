/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { 
  Briefcase, Database, Cpu, Layers, DollarSign, ListOrdered, 
  TrendingUp, Award, HelpCircle, Compass, Shield, Users, RefreshCw
} from "lucide-react";

export default function StrategyDeck() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 py-6 px-4 font-sans text-neutral-800">
      {/* Editorial Title */}
      <div className="text-center space-y-4">
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">Boardroom Presentation Pitch</span>
        <h1 className="font-serif text-4xl md:text-5xl italic font-normal text-neutral-900 leading-tight">
          kastelas.in — The Fashion Tech Stratum
        </h1>
        <p className="max-w-xl mx-auto font-sans text-sm text-neutral-600 font-light leading-relaxed">
          The structural formula for a billion-dollar AI-powered fashion outfit planner, digital wardrobe manager, and editorial ecosystem.
        </p>
        <div className="flex justify-center gap-4 text-xs font-mono text-neutral-400">
          <span>PROJECT ID: K-916</span>
          <span>•</span>
          <span>VALUATION ARCHITECTURE: MVP PHASE</span>
          <span>•</span>
          <span>SYSTEM TIME: 2026 UTC</span>
        </div>
      </div>

      {/* Grid of Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* 1. Curated Product Strategy */}
        <div className="border border-neutral-200 p-6 bg-white rounded-lg space-y-4 shadow-xs">
          <div className="flex items-center gap-3 border-b border-neutral-100 pb-3">
            <Briefcase className="w-5 h-5 text-neutral-700" />
            <h2 className="font-serif text-lg font-medium text-neutral-900">01. Product Strategy & Vision</h2>
          </div>
          <p className="text-xs text-neutral-600 leading-relaxed font-light">
            <strong>Target Market Position:</strong> Positioning at the structural center of Pinterest inspiration, Vogue editorial relevance, and Stylebook wardrobe utility. 
            Unlike traditional retail list apps, <strong>kastelas.in</strong> moves users from continuous consumerist purchase impulses to circular wardrobe life optimization through advanced predictive algorithms.
          </p>
          <ul className="text-xs text-neutral-600 space-y-2 list-disc list-inside font-light">
            <li><strong>Value Proposition:</strong> Visualizing, arranging, and stylizing pre-owned clothes before spending capital on new ones.</li>
            <li><strong>Adoption Catalyst:</strong> The 'OOTD Community Streak Engine' drives viral social sharing on Instagram, capturing Gen-Z microcultures.</li>
            <li><strong>Growth Flywheel:</strong> Intelligent Outfit Recommendations → High-conversion affiliate checkouts → Wardrobe integration logs.</li>
          </ul>
        </div>

        {/* 2. Platform Architecture */}
        <div className="border border-neutral-200 p-6 bg-white rounded-lg space-y-4 shadow-xs">
          <div className="flex items-center gap-3 border-b border-neutral-100 pb-3">
            <Layers className="w-5 h-5 text-neutral-700" />
            <h2 className="font-serif text-lg font-medium text-neutral-900">02. App Architecture & Stack</h2>
          </div>
          <div className="space-y-3">
            <div className="bg-neutral-50 p-3 rounded text-xs font-mono text-neutral-700 space-y-1">
              <div><strong>Frontend Core:</strong> React & Vite (Cross-Platform SPA / React Native Hybrid)</div>
              <div><strong>Backend Core:</strong> Express / Node.js Router (Modular Routing Schema)</div>
              <div><strong>Database Hub:</strong> Persistent Firestore / Supabase PostegreSQL</div>
              <div><strong>AI Intelligence:</strong> Google GenAI SDK (gemini-3.5-flash)</div>
            </div>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              <strong>Technical Segregation:</strong> All API key operations, image manipulations (like segmenting the white background), and Gemini chat histories run strictly within our Express server-side wrapper to prohibit client-side leaks and avoid high browser latency.
            </p>
          </div>
        </div>

        {/* 3. Database Schema */}
        <div className="border border-neutral-200 p-6 bg-white rounded-lg space-y-4 shadow-xs md:col-span-2">
          <div className="flex items-center gap-3 border-b border-neutral-100 pb-3">
            <Database className="w-5 h-5 text-neutral-700" />
            <h2 className="font-serif text-lg font-medium text-neutral-900">03. High-Fidelity Database Schema</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-[10px] text-neutral-700">
            <div className="bg-neutral-50 p-3 rounded border border-neutral-200 space-y-2">
              <span className="font-semibold text-neutral-900 uppercase">Collection: Users</span>
              <ul className="space-y-1 list-none pl-0">
                <li>uid: STRING (PK)</li>
                <li>email: STRING</li>
                <li>premiumStatus: "VIP" | "Free"</li>
                <li>preferredAesthetics: ARRAY</li>
                <li>customMetrics: OBJECT</li>
                <li>bodyType: STRING</li>
                <li>skinTone: STRING</li>
              </ul>
            </div>
            <div className="bg-neutral-50 p-3 rounded border border-neutral-200 space-y-2">
              <span className="font-semibold text-neutral-900 uppercase">Collection: WardrobeItems</span>
              <ul className="space-y-1 list-none pl-0">
                <li>itemId: STRING (PK)</li>
                <li>ownerId: STRING (FK)</li>
                <li>category: STRING</li>
                <li>imageUrl: STRING</li>
                <li>style: STRING</li>
                <li>wearCount: INTEGER</li>
                <li>purchasePrice: NUMBER</li>
                <li>colors: ARRAY</li>
              </ul>
            </div>
            <div className="bg-neutral-50 p-3 rounded border border-neutral-200 space-y-2">
              <span className="font-semibold text-neutral-900 uppercase">Collection: Outfits</span>
              <ul className="space-y-1 list-none pl-0">
                <li>outfitId: STRING (PK)</li>
                <li>datePlanned: DATE</li>
                <li>itemIds: ARRAY_OF_FK</li>
                <li>aesthetic: STRING</li>
                <li>weatherConditions: STRING</li>
                <li>status: "Draft" | "Final"</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. User Flow & AI Workflows */}
        <div className="border border-neutral-200 p-6 bg-white rounded-lg space-y-4 shadow-xs">
          <div className="flex items-center gap-3 border-b border-neutral-100 pb-3">
            <Cpu className="w-5 h-5 text-neutral-700" />
            <h2 className="font-serif text-lg font-medium text-neutral-900">04. AI Styling Workflow</h2>
          </div>
          <div className="space-y-3 text-xs text-neutral-600 font-light leading-relaxed">
            <p>
              Our styling pipeline combines real-time user state parameters with state-of-the-art multimodal reasoning models.
            </p>
            <div className="relative pl-4 border-l-2 border-neutral-300 space-y-3 font-mono text-[10px]">
              <div>
                <span className="font-semibold text-neutral-900">1. INPUT ACCUMULATOR</span>
                <p className="font-sans text-neutral-500">Retrieves location + live weather temperature + user’s favorite aesthetic tags.</p>
              </div>
              <div>
                <span className="font-semibold text-neutral-900">2. CLOSET RECONCILIATION</span>
                <p className="font-sans text-neutral-500">Injects custom database wardrobe items categorizations in text form to Gemini.</p>
              </div>
              <div>
                <span className="font-semibold text-neutral-900">3. ORCHESTRATION LAYER</span>
                <p className="font-sans text-neutral-500">Calls Gemini via server-side schema request producing clean, structured JSON looks.</p>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Monetization Strategy */}
        <div className="border border-neutral-200 p-6 bg-white rounded-lg space-y-4 shadow-xs">
          <div className="flex items-center gap-3 border-b border-neutral-100 pb-3">
            <DollarSign className="w-5 h-5 text-neutral-700" />
            <h2 className="font-serif text-lg font-medium text-neutral-900">05. Monetization Framework</h2>
          </div>
          <ul className="text-xs text-neutral-600 space-y-3 list-none pl-0 font-light">
            <li className="flex items-start gap-2">
              <span className="bg-neutral-100 px-2 py-0.5 rounded text-[10px] font-mono text-neutral-800">VIP Membership</span>
              <p className="text-neutral-600">Rs. 899/month for unlimited real-time AI background removal, smart weather alerts, and automatic packing layout builder.</p>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-neutral-100 px-2 py-0.5 rounded text-[10px] font-mono text-neutral-800">Affiliate Loop</span>
              <p className="text-neutral-600">Dynamic 8%-14% commission cut via Zara, H&M, and Sabyasachi partnerships integrated into the "Get the Look" blog panel.</p>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-neutral-100 px-2 py-0.5 rounded text-[10px] font-mono text-neutral-800">Consultation Cut</span>
              <p className="text-neutral-600">A curated marketplace linking elite stylists with users for premium bespoke weddings or digital design assessments (20% commission).</p>
            </li>
          </ul>
        </div>

        {/* 6. Wireframe Blueprint & Core UI Design */}
        <div className="border border-neutral-200 p-6 bg-white rounded-lg space-y-4 shadow-xs md:col-span-2">
          <div className="flex items-center gap-3 border-b border-neutral-100 pb-3">
            <Compass className="w-5 h-5 text-neutral-700" />
            <h2 className="font-serif text-lg font-medium text-neutral-900">06. Wireframe Layout & Design System</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-600 font-light">
            <div className="space-y-2">
              <h4 className="font-mono text-xs font-semibold uppercase text-neutral-800">A. TYPOGRAPHY MATRICES</h4>
              <p className="leading-relaxed">
                <strong>Headers:</strong> Playfair Display Medium with tracking tight to imply editorial Zara/Bazaar sophistication.<br />
                <strong>Body:</strong> Inter regular with robust line-height for seamless phone reading.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-mono text-xs font-semibold uppercase text-neutral-800">B. COLOUR CODES</h4>
              <p className="leading-relaxed">
                <strong>Canvas Background:</strong> Neutral off-white cream (#FAF9F5)<br />
                <strong>Primary Accent:</strong> Soft beige tan (#C2B280)<br />
                <strong>Text Core:</strong> Slate charcoal (#1C1A17)
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-mono text-xs font-semibold uppercase text-neutral-800">C. WIREFRAME CONTAINER STYLING</h4>
              <p className="leading-relaxed">
                Glassmorphic containers with thin light borders (1px border, 40% white) layered on an off-white grid creating lightweight elegance. Large visual photos carry 16px soft border radii.
              </p>
            </div>
          </div>
        </div>

        {/* 7. MVP Roadmap */}
        <div className="border border-neutral-200 p-6 bg-white rounded-lg space-y-4 shadow-xs md:col-span-2">
          <div className="flex items-center gap-3 border-b border-neutral-100 pb-3">
            <ListOrdered className="w-5 h-5 text-neutral-700" />
            <h2 className="font-serif text-lg font-medium text-neutral-900">07. MVP Roadmap & Future Scaling Phases</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-light">
            <div className="border-l-2 border-neutral-900 pl-3 space-y-1 bg-neutral-50/50 p-2 rounded">
              <span className="font-mono text-[10px] font-bold text-neutral-800 block">PHASE 1: THE CORE (MO. 1-2)</span>
              <p className="text-neutral-600 block text-[11px]">Deploy the responsive web MVP with standard category upload drawers, Gemini AI chatbot stylist, and the kastelas.in blog feeds.</p>
            </div>
            <div className="border-l-2 border-neutral-500 pl-3 space-y-1 bg-neutral-50/50 p-2 rounded">
              <span className="font-mono text-[10px] font-bold text-neutral-800 block">PHASE 2: CIRCULAR CLOSET (MO. 3-4)</span>
              <p className="text-neutral-600 block text-[11px]">Integrate background auto-segmentation, live weather forecasting, and complete capsule calculation matching wardrobes.</p>
            </div>
            <div className="border-l-2 border-neutral-300 pl-3 space-y-1 bg-neutral-50/50 p-2 rounded">
              <span className="font-mono text-[10px] font-bold text-neutral-800 block">PHASE 3: SOCIAL WEAVING (MO. 5-6)</span>
              <p className="text-neutral-600 block text-[11px]">Launch public OOTD voting polls, verified creator programs, style leaderboards, and gamified fashion badges.</p>
            </div>
            <div className="border-l-2 border-neutral-200 pl-3 space-y-1 bg-neutral-50/50 p-2 rounded">
              <span className="font-mono text-[10px] font-bold text-neutral-800 block">PHASE 4: VIRTUAL TRY-ON (FUTURE)</span>
              <p className="text-neutral-600 block text-[11px]">Integrate augmented reality try-on and depth body camera measurements directly mapping 3D textures in-app.</p>
            </div>
          </div>
        </div>

      </div>

      {/* Corporate Sign-off */}
      <div className="border-t border-neutral-200 pt-6 text-center text-xs font-mono text-neutral-400">
        CONFIDENTIAL INTELLECTUAL PROPERTY © 2026 KASTELAS FASHION TECHNOLOGY INTERACTIVE GROUP INC.
      </div>
    </div>
  );
}
