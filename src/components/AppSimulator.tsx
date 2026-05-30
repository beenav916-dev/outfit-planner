/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Sparkles, Award, Calendar, FolderHeart, MessageCircle, Newspaper, 
  MapPin, CloudSun, User, Plus, Trash2, Heart, Bookmark, Eye, 
  ChevronRight, ArrowRight, Check, Dumbbell, Zap, Gift, RefreshCw, 
  Camera, Palette, ShoppingBag, SlidersHorizontal, Lock, CheckCircle2, Star, StarOff,
  Compass
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { 
  WardrobeItem, ScheduledOutfit, ChatMessage, BlogPost, 
  TrendPin, StylePoll, UserStats, UserProfile, FashionAesthetic 
} from "../types";
import { 
  INITIAL_WARDROBE, INITIAL_KASTELAS_BLOGS, INITIAL_TREND_FEED, 
  STYLE_POLLS_DATA, INITIAL_USER_STATS, CuratedUserProfile, CuratedAestheticsInfo,
  curatingImages
} from "../data";

export default function AppSimulator() {
  // --- Global App State ---
  const [currentScreen, setCurrentScreen] = useState<string>("splash"); // splash, onboarding, login, home, wardrobe, planner, stylist, trend, capsule, blog, profile, settings
  const [wardrobe, setWardrobe] = useState<WardrobeItem[]>(INITIAL_WARDROBE);
  const [schedule, setSchedule] = useState<ScheduledOutfit[]>([
    {
      id: "sch1",
      date: "2026-05-28",
      timeOfDay: "Morning",
      itemIds: ["w4", "w2", "w5"],
      occasion: "Casual Brunch",
      aesthetic: "Casual Chic",
      mood: "Confident",
      weatherNotes: "Tropical Hot day",
      isDraft: false
    },
    {
      id: "sch2",
      date: "2026-05-29",
      timeOfDay: "Evening",
      itemIds: ["w3", "w6", "w10"],
      occasion: "Gallery Opening",
      aesthetic: "Korean Fashion",
      mood: "Artistic",
      isDraft: true
    }
  ]);
  const [profile, setProfile] = useState<UserProfile>(CuratedUserProfile);
  const [userStats, setUserStats] = useState<UserStats>(INITIAL_USER_STATS);
  const [trendPins, setTrendPins] = useState<TrendPin[]>(INITIAL_TREND_FEED);
  const [stylePolls, setStylePolls] = useState<StylePoll[]>(STYLE_POLLS_DATA);
  const [currentCity, setCurrentCity] = useState<string>("Mumbai");
  const [weatherInfo, setWeatherInfo] = useState({
    temp: 32,
    condition: "Tropical Humid & Sunny",
    humidity: "82%",
    advice: "Breathable heavy organic linens, cotton weaves, relaxed silhouettes, and open leather loafers are recommended."
  });
  
  // --- Form & Interaction States ---
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [scanningBg, setScanningBg] = useState(false);
  const [scannedImage, setScannedImage] = useState<string>("");
  const [newItemName, setNewItemName] = useState("");
  const [newItemCategory, setNewItemCategory] = useState<string>("Tops");
  const [newItemAesthetic, setNewItemAesthetic] = useState<FashionAesthetic>("Minimalist");
  const [newItemColors, setNewItemColors] = useState<string>("#FFFFFF");
  const [newItemOccasion, setNewItemOccasion] = useState("Daily Wear");
  const [newItemPrice, setNewItemPrice] = useState("1200");
  const [newItemBrand, setNewItemBrand] = useState("kastelas Label");

  // --- AI Chat States ---
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: "m1",
      sender: "ai",
      text: "Bonjour Sneha! I am your bespoke Kastelas digital stylist, analyzing your wardrobe drawer of 10 items. How shall we style your closet parameters today? Try selecting one of our instant prompt lines below!",
      createdAt: new Date().toLocaleTimeString()
    }
  ]);
  const [chatLoading, setChatLoading] = useState(false);

  // --- Dynamic generated look lookup ---
  const [generatedLook, setGeneratedLook] = useState<any>(null);
  const [generatingLook, setGeneratingLook] = useState(false);
  const [plannerOccasion, setPlannerOccasion] = useState("Summer Brunch");
  const [plannerAesthetic, setPlannerAesthetic] = useState<FashionAesthetic>("Old Money");

  // --- Capsule Packer Wizard State ---
  const [capsuleDestination, setCapsuleDestination] = useState<string>("Resort Vacation");
  const [capsuleDays, setCapsuleDays] = useState<number>(5);
  const [capsuleResult, setCapsuleResult] = useState<any>(null);
  const [buildingCapsule, setBuildingCapsule] = useState(false);

  // --- Active styling poll votes ---
  const [votedPolls, setVotedPolls] = useState<Record<string, string>>({});

  // --- Onboarding selections ---
  const [selectedOnboardingAesthetics, setSelectedOnboardingAesthetics] = useState<FashionAesthetic[]>([]);
  const [onboardingStep, setOnboardingStep] = useState(1);

  // --- Real-time Weather Fetcher Trigger ---
  useEffect(() => {
    fetchWeather();
  }, [currentCity]);

  const fetchWeather = async () => {
    try {
      const res = await fetch(`/api/weather?city=${currentCity}`);
      if (res.ok) {
        const data = await res.json();
        setWeatherInfo({
          temp: data.temp,
          condition: data.condition,
          humidity: data.humidity,
          advice: data.advice
        });
      }
    } catch (e) {
      console.warn("Weather integration fell back to mock data:", e);
    }
  };

  // --- Smart Background Segmenter Simulator ---
  const handleSimulateBgRemoval = (imgKey: keyof typeof curatingImages) => {
    setScanningBg(true);
    setScannedImage("Scanning...");
    setTimeout(() => {
      setScannedImage(INITIAL_WARDROBE[Math.floor(Math.random() * INITIAL_WARDROBE.length)].imageUrl);
      setScanningBg(false);
    }, 1800);
  };

  const createWardrobeItem = () => {
    if (!newItemName) return;
    const finalImage = scannedImage || "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500";
    const item: WardrobeItem = {
      id: "w-new-" + Date.now(),
      name: newItemName,
      category: newItemCategory as any,
      imageUrl: finalImage,
      colors: [newItemColors],
      style: newItemAesthetic,
      occasion: [newItemOccasion],
      weatherSuitable: ["Mild", "Hot"],
      wearCount: 0,
      price: Number(newItemPrice),
      brand: newItemBrand,
      isFavorite: false
    };

    setWardrobe([item, ...wardrobe]);
    setNewItemName("");
    setScannedImage("");
    setAddModalOpen(false);

    // Reward fashion points!
    setUserStats(prev => ({
      ...prev,
      points: prev.points + 50,
      closetScore: Math.min(100, prev.closetScore + 2)
    }));
  };

  // --- AI Chat message dispatch ---
  const sendChatMessage = async (textToSend: string) => {
    const text = textToSend || chatInput;
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      sender: "user",
      text: text,
      createdAt: new Date().toLocaleTimeString()
    };

    setChatMessages(prev => [...prev, userMsg]);
    if (!textToSend) setChatInput("");
    setChatLoading(true);

    try {
      const response = await fetch("/api/stylist/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          context: {
            preferredAesthetics: profile.preferredAesthetics,
            bodyType: profile.bodyType,
            skinTone: profile.skinTone,
            location: profile.location,
            weather: `${weatherInfo.condition}, ${weatherInfo.temp}°C. Advice: ${weatherInfo.advice}`,
            items: wardrobe.map(i => ({ name: i.name, category: i.category, style: i.style }))
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const aiMsg: ChatMessage = {
          id: "ai-" + Date.now(),
          sender: "ai",
          text: data.text,
          createdAt: new Date().toLocaleTimeString()
        };
        setChatMessages(prev => [...prev, aiMsg]);
      } else {
        throw new Error("Chat api request issue");
      }
    } catch (e) {
      // offline robust fallback
      console.warn("Express chatbot unavailable, displaying luxury simulator layout.");
      setTimeout(() => {
        const fallbackText = "### Curated Editorial Pairing\n\nI love your preferred aesthetic tags! Based on your target coordinates, you should pair a cropped knit with tailored linen trousers, then secure it at the waist with gold details. Keep items breathable and elegant.";
        setChatMessages(prev => [...prev, {
          id: "ai-fallback",
          sender: "ai",
          text: fallbackText,
          createdAt: new Date().toLocaleTimeString()
        }]);
      }, 1000);
    } finally {
      setChatLoading(false);
    }
  };

  // --- Outfit Generator Orchestrator ---
  const handleGenerateOutfitLook = async () => {
    setGeneratingLook(true);
    try {
      const response = await fetch("/api/stylist/generate-look", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          occasion: plannerOccasion,
          weather: `${weatherInfo.temp}°C, ${weatherInfo.condition}`,
          aesthetic: plannerAesthetic
        })
      });

      if (response.ok) {
        const data = await response.json();
        setGeneratedLook(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setGeneratingLook(false);
    }
  };

  // --- Live Capsule Packing Engine ---
  const handleBuildCapsulePack = () => {
    setBuildingCapsule(true);
    setTimeout(() => {
      const packs: Record<string, any> = {
        "Resort Vacation": {
          ratio: "10 Items, 22 Outfit options",
          list: [
            { item: "White Silk Cowl Blouse", reason: "Reflects light, premium drape" },
            { item: "Relaxed Organic Linen Shirt", reason: "Max breathability for beach brunches" },
            { item: "Linen Pleated High-Waisted Slacks", reason: "Symmetric tailoring without sweat" },
            { item: "Beige Camel Trench Coat", reason: "For chilly airport commutes" },
            { item: "Clean White Gumsole Sneakers", reason: "Heavy exploration comfort" },
            { item: "Suede Leather Loafers", reason: "Classy yacht dinners" },
            { item: "Chunky Gold Chain", reason: "Instant luxury dress up accent" }
          ],
          tips: "Roll fabrics instead of folding to preserve silk molecules, and wear your bulkiest item (the trenchcoat) during transit flights."
        },
        "Business Summit": {
          ratio: "8 Items, 14 Outfits",
          list: [
            { item: "Double-Breasted Premium Black Blazer", reason: "Indisputable board impact" },
            { item: "Slate Tailored Trousers", reason: "Cohesive grey tonal balance" },
            { item: "Mulberry Silk Cowl Blouse", reason: "Luxe under-layer texture" },
            { item: "Calfskin Leather Loafers", reason: "Sleek professional locomotion" },
            { item: "Premium Leather City Tote", reason: "Fits MacBook Pro + documents" }
          ],
          tips: "Utilize structured outerwear to assert authority, keeping accessories limited to premium golden statement chains."
        },
        "Weekend Getaway": {
          ratio: "6 Items, 8 Outfits",
          list: [
            { item: "Raw Denim Wide Leg Indigo Jeans", reason: "Hardy, dirt resistant, retro vibe" },
            { item: "White Linen Resort Shirt", reason: "Effortless casual draping" },
            { item: "Black Classic T-Shirt", reason: "Understated baseline layout" },
            { item: "Retro Suede Sneakers", reason: "Trekking across urban spots" }
          ],
          tips: "Wear the heavy denim during travel. Pack the linen shirt rolled up tight to keep iron lines intact."
        }
      };

      setCapsuleResult(packs[capsuleDestination] || packs["Resort Vacation"]);
      setBuildingCapsule(false);
      setUserStats(prev => ({ ...prev, points: prev.points + 100 }));
    }, 1500);
  };

  // --- Social Poll Voting Mechanism ---
  const handlePollVote = (pollId: string, option: "A" | "B") => {
    if (votedPolls[pollId]) return;
    setVotedPolls(prev => ({ ...prev, [pollId]: option }));
    setStylePolls(prev => prev.map(p => {
      if (p.id === pollId) {
        const plusA = option === "A" ? 1 : 0;
        const plusB = option === "B" ? 1 : 0;
        return {
          ...p,
          optionA: { ...p.optionA, votes: p.optionA.votes + plusA },
          optionB: { ...p.optionB, votes: p.optionB.votes + plusB },
          totalVotes: p.totalVotes + 1,
          userVoted: option
        };
      }
      return p;
    }));

    setUserStats(prev => ({ ...prev, points: prev.points + 25 }));
  };

  const togglePinLike = (id: string) => {
    setTrendPins(prev => prev.map(p => {
      if (p.id === id) {
        const liked = !p.hasLiked;
        return {
          ...p,
          hasLiked: liked,
          likes: p.likes + (liked ? 1 : -1)
        };
      }
      return p;
    }));
  };

  const togglePinSave = (id: string) => {
    setTrendPins(prev => prev.map(p => {
      if (p.id === id) {
        const saved = !p.hasSaved;
        return {
          ...p,
          hasSaved: saved,
          saves: p.saves + (saved ? 1 : -1)
        };
      }
      return p;
    }));
  };

  // --- Blog Dress Replica integration ---
  const handleRecreateBlogOutfit = (blogId: string) => {
    alert("Replicating Blog Looks... Checking overlaps in your Wardrobe Database.");
    setCurrentScreen("wardrobe");
    setSelectedCategory("All");
    // Show a small matching highlight or auto filter
  };

  // --- Onboarding selections ---
  const handleOnboardingToggleAesthetic = (aesthetic: FashionAesthetic) => {
    if (selectedOnboardingAesthetics.includes(aesthetic)) {
      setSelectedOnboardingAesthetics(selectedOnboardingAesthetics.filter(a => a !== aesthetic));
    } else {
      setSelectedOnboardingAesthetics([...selectedOnboardingAesthetics, aesthetic]);
    }
  };

  const handleFinishOnboarding = () => {
    setProfile(prev => ({
      ...prev,
      preferredAesthetics: selectedOnboardingAesthetics.length > 0 ? selectedOnboardingAesthetics : prev.preferredAesthetics
    }));
    setCurrentScreen("home");
  };

  // --- Custom constants ---
  const CATEGORIES = ["All", "Tops", "Bottoms", "Jackets", "Shoes", "Bags", "Accessories", "Ethnic Wear"];

  return (
    <div className="w-full min-h-screen bg-neutral-50 flex flex-col font-sans text-neutral-800">
      
      {/* ---------------------------------------------------- */}
      {/* SPLASH VIEW */}
      {/* ---------------------------------------------------- */}
      {currentScreen === "splash" && (
        <div id="splash-view" className="flex-1 flex flex-col justify-center items-center bg-[#151412] text-[#FAF8F5] px-6 py-20 text-center relative overflow-hidden">
          {/* Faded Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(194,178,128,0.08),transparent_50%)]" />
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-6 max-w-lg z-10"
          >
            <div className="flex justify-center">
              <span className="font-mono text-xs uppercase tracking-widest text-amber-100/60 border border-amber-100/20 px-3 py-1 rounded-full">
                AI Fashion Platform
              </span>
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl italic font-normal tracking-tight text-amber-50">
              kastelas.in
            </h1>
            
            <p className="font-sans text-sm md:text-base font-light text-neutral-400 leading-relaxed max-w-sm mx-auto">
              Welcome to your digital atelier, where premium editorial blogs meet intelligent wardrobe matching algorithms.
            </p>
            
            <div className="pt-8 flex flex-col gap-3 justify-center items-center">
              <button 
                id="btn-onboarding-start"
                onClick={() => setCurrentScreen("onboarding")}
                className="w-full sm:w-64 bg-[#E2D8C1] hover:bg-white text-neutral-950 font-semibold py-3 px-8 rounded-full transition-all flex items-center justify-center gap-2 text-sm tracking-wide shadow-lg"
              >
                Access Atelier <ArrowRight className="w-4 h-4" />
              </button>
              
              <button 
                id="btn-skip-login"
                onClick={() => setCurrentScreen("home")}
                className="text-xs font-mono text-neutral-400 hover:text-white transition-colors underline underline-offset-4"
              >
                Launch Live Sandbox
              </button>
            </div>
          </motion.div>

          {/* Footer branding */}
          <div className="absolute bottom-8 left-0 right-0 text-center z-10">
            <p className="font-mono text-[9px] tracking-widest text-neutral-600 uppercase">
              PARIS • SEOUL • SEOUL STREETWEAR • QUIET LUXURY ESPORTS
            </p>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* ONBOARDING FLOW */}
      {/* ---------------------------------------------------- */}
      {currentScreen === "onboarding" && (
        <div id="onboarding-flow" className="flex-1 flex flex-col justify-center items-center bg-[#FAF9F5] px-6 py-12">
          <div className="w-full max-w-xl bg-white border border-neutral-200/60 p-8 rounded-2xl shadow-xl space-y-8 relative">
            
            {/* Step Indicators */}
            <div className="flex justify-between items-center text-xs text-neutral-400 font-mono border-b border-neutral-100 pb-4">
              <span>ONBOARDING WIZARD</span>
              <span>STEP {onboardingStep} OF 3</span>
            </div>

            {onboardingStep === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="space-y-2">
                  <h2 className="font-serif text-3xl text-neutral-900 leading-tight">Define Your Stylist Persona</h2>
                  <p className="text-xs text-neutral-500 font-light">Tell us how people describe your daily stylistic priorities.</p>
                </div>
                
                <div className="space-y-3">
                  <label className="text-xs font-mono text-neutral-400 uppercase block">My Full Name</label>
                  <input 
                    type="text" 
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full border border-neutral-200 bg-white p-3 rounded-lg text-sm focus:outline-none focus:border-amber-600 transition" 
                    placeholder="Enter your name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono text-neutral-400 uppercase block mb-1">Body Architecture</label>
                    <select 
                      value={profile.bodyType}
                      onChange={(e: any) => setProfile({ ...profile, bodyType: e.target.value })}
                      className="w-full border border-neutral-200 bg-white p-3 rounded-lg text-sm"
                    >
                      <option value="Hourglass">Hourglass</option>
                      <option value="Rectangle">Rectangle</option>
                      <option value="Pear">Pear</option>
                      <option value="Inverted Triangle">Inverted Triangle</option>
                      <option value="Oval">Oval</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-mono text-neutral-400 uppercase block mb-1">Skin Tone Tone</label>
                    <select 
                      value={profile.skinTone}
                      onChange={(e: any) => setProfile({ ...profile, skinTone: e.target.value })}
                      className="w-full border border-neutral-200 bg-white p-3 rounded-lg text-sm"
                    >
                      <option value="Fair">Fair (Chilly blush)</option>
                      <option value="Light">Light (Vanilla warmth)</option>
                      <option value="Medium">Medium (Honey glow)</option>
                      <option value="Olive">Olive (Calm gold)</option>
                      <option value="Tan">Tan (Rich walnut)</option>
                      <option value="Deep">Deep (Ebony sheen)</option>
                    </select>
                  </div>
                </div>

                <button 
                  onClick={() => setOnboardingStep(2)}
                  className="w-full bg-[#1A1A1A] hover:bg-black text-[#FAF9F5] py-3.5 rounded-lg text-sm font-medium tracking-wide transition flex items-center justify-center gap-2"
                >
                  Confirm & Continue <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}

            {onboardingStep === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div className="space-y-2">
                  <h2 className="font-serif text-3xl text-neutral-900 leading-tight">Curate Your Aesthetics</h2>
                  <p className="text-xs text-neutral-500 font-light">Select multiple visual aesthetics to tailor the AI Stylist recommendation parameters.</p>
                </div>

                <div className="grid grid-cols-2 gap-3 max-h-60 overflow-y-auto pr-1">
                  {(Object.keys(CuratedAestheticsInfo) as FashionAesthetic[]).map(aes => {
                    const selected = selectedOnboardingAesthetics.includes(aes);
                    return (
                      <button
                        key={aes}
                        onClick={() => handleOnboardingToggleAesthetic(aes)}
                        className={`p-3 rounded-lg text-left text-xs transition border flex items-center justify-between ${
                          selected 
                            ? "border-[#C2B280] bg-[#FAF8F2] text-neutral-950 font-medium" 
                            : "border-neutral-200 hover:border-neutral-400 text-neutral-600 bg-white"
                        }`}
                      >
                        <span>{aes}</span>
                        {selected && <Check className="w-3.5 h-3.5 text-amber-700" />}
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setOnboardingStep(1)}
                    className="w-1/3 border border-neutral-300 hover:bg-neutral-50 text-neutral-700 py-3 rounded-lg text-sm font-medium transition"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setOnboardingStep(3)}
                    className="w-2/3 bg-[#1A1A1A] hover:bg-black text-[#FAF9F5] py-3.5 rounded-lg text-sm font-medium tracking-wide transition flex items-center justify-center gap-2"
                  >
                    Lock-In Choices <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {onboardingStep === 3 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 text-center py-4">
                <div className="flex justify-center">
                  <div className="bg-amber-50 text-amber-800 p-4 rounded-full">
                    <Sparkles className="w-10 h-10 animate-pulse" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="font-serif text-3xl text-neutral-900 leading-tight">Atelier Calibrated!</h2>
                  <p className="text-xs text-neutral-500 font-light max-w-sm mx-auto">
                    Kastelas AI has synchronized with your {profile.bodyType} body architecture, {profile.skinTone} skin canvas, and visual lifestyle choices.
                  </p>
                </div>

                <div className="bg-neutral-50 p-4 rounded-lg space-y-1 inline-block text-left border border-neutral-100 text-xs text-neutral-600 font-mono">
                  <div>• Initialized 10 closet items</div>
                  <div>• Connected to kastelas.in blog hub</div>
                  <div>• Loaded Live Weather feed indicators</div>
                </div>

                <button 
                  id="btn-goto-hub"
                  onClick={handleFinishOnboarding}
                  className="w-full bg-neutral-950 hover:bg-black text-[#FAF9F5] py-3.5 rounded-lg text-sm font-semibold tracking-wide transition"
                >
                  Enter Platform Dashboard
                </button>
              </motion.div>
            )}

          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* MAIN APPLICATION FRAMEWORK (HEADER / NAV / BODY) */}
      {/* ---------------------------------------------------- */}
      {["splash", "onboarding"].indexOf(currentScreen) === -1 && (
        <div className="flex-1 flex flex-col md:flex-row">
          
          {/* LEFT PANELS: NAVIGATION RAIL */}
          <aside className="w-full md:w-64 bg-white border-r border-neutral-200/80 flex flex-col">
            {/* Brand Logo Header */}
            <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
              <div 
                onClick={() => setCurrentScreen("home")} 
                className="cursor-pointer space-y-1"
                id="brand-header-link"
              >
                <h1 className="font-serif text-2xl font-normal text-neutral-900 italic tracking-tight">
                  kastelas.in
                </h1>
                <p className="text-[9px] font-mono tracking-widest text-[#C2B280] uppercase">
                  Fashion Tech Lab
                </p>
              </div>

              {/* Verified Premium Tag badge */}
              <span className="text-[10px] font-mono bg-neutral-950 text-amber-100 px-2.5 py-1 rounded">
                VIP
              </span>
            </div>

            {/* Main Menu Links */}
            <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
              <span className="px-3 text-[9px] font-mono tracking-widest text-neutral-400 uppercase block mb-2">MY SPACE</span>
              
              <button 
                onClick={() => setCurrentScreen("home")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                  currentScreen === "home" ? "bg-amber-50/70 text-amber-900 font-semibold" : "text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                <Compass className="w-4 h-4" />
                <span>Atelier Screen</span>
              </button>

              <button 
                id="tab-wardrobe"
                onClick={() => setCurrentScreen("wardrobe")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                  currentScreen === "wardrobe" ? "bg-amber-50/70 text-amber-900 font-semibold" : "text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                <FolderHeart className="w-4 h-4" />
                <span>Wardrobe Drawer</span>
                <span className="ml-auto font-mono text-[10px] bg-neutral-100 text-neutral-500 px-2 py-0.5 rounded-full">
                  {wardrobe.length}
                </span>
              </button>

              <button 
                onClick={() => setCurrentScreen("planner")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                  currentScreen === "planner" ? "bg-amber-50/70 text-amber-900 font-semibold" : "text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Outfit Calendar</span>
              </button>

              <button 
                onClick={() => setCurrentScreen("capsule")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                  currentScreen === "capsule" ? "bg-amber-50/70 text-amber-900 font-semibold" : "text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Capsule Builder</span>
              </button>

              <span className="px-3 text-[9px] font-mono tracking-widest text-neutral-400 uppercase block pt-4 mb-2">AI STYLIST</span>
              
              <button 
                id="tab-ai-stylist"
                onClick={() => setCurrentScreen("stylist")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition relative ${
                  currentScreen === "stylist" ? "bg-amber-50/70 text-amber-900 font-semibold" : "text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                <MessageCircle className="w-4 h-4 text-amber-700 animate-pulse" />
                <span>Stylist Atelier Chat</span>
                <span className="absolute right-3 w-2 h-2 rounded-full bg-amber-600" />
              </button>

              <span className="px-3 text-[9px] font-mono tracking-widest text-neutral-400 uppercase block pt-4 mb-2">SOCIAL DISCOVERY</span>

              <button 
                onClick={() => setCurrentScreen("trend")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                  currentScreen === "trend" ? "bg-amber-50/70 text-amber-900 font-semibold" : "text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Pinterest Trend Pins</span>
              </button>

              <button 
                onClick={() => setCurrentScreen("blog")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                  currentScreen === "blog" ? "bg-amber-50/70 text-amber-900 font-semibold" : "text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                <Newspaper className="w-4 h-4" />
                <span>kastelas.in Blog</span>
              </button>

              <span className="px-3 text-[9px] font-mono tracking-widest text-neutral-400 uppercase block pt-4 mb-2">PROFILE</span>

              <button 
                onClick={() => setCurrentScreen("profile")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                  currentScreen === "profile" ? "bg-amber-50/70 text-amber-900 font-semibold" : "text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                <User className="w-4 h-4" />
                <span>Streak, Badges & Size</span>
              </button>

              <button 
                onClick={() => setCurrentScreen("settings")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                  currentScreen === "settings" ? "bg-amber-50/70 text-amber-900 font-semibold" : "text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                <SlidersHorizontal className="w-4 h-4" />
                <span>Consultations & VIP</span>
              </button>

            </nav>

            {/* Quick Profile Widget */}
            <div className="p-4 border-t border-neutral-100 flex items-center gap-3 bg-neutral-50">
              <img 
                src={profile.avatar} 
                className="w-10 h-10 rounded-full object-cover border border-neutral-300"
                alt="Avatar"
              />
              <div className="text-left space-y-0.5">
                <p className="text-xs font-semibold text-neutral-800">{profile.name}</p>
                <p className="text-[10px] font-mono text-amber-700 font-medium">Daily Streak: {userStats.streak} Days 🔥</p>
              </div>
            </div>
          </aside>

          {/* RIGHT PANELS: MAIN APP CONTENT AREA */}
          <main className="flex-1 overflow-y-auto bg-[#FAF9F5] p-6 space-y-8">
            
            {/* Header Notification bar & Weather Widget */}
            <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-neutral-400 tracking-wider">MUMBAI LUXURY HEADQUARTERS</span>
                <h1 className="font-serif text-3xl font-medium italic text-neutral-900">
                  {currentScreen === "home" && "Atelier Home Screen"}
                  {currentScreen === "wardrobe" && "Digital Wardrobe Drawer"}
                  {currentScreen === "planner" && "Outfit Planner Grid"}
                  {currentScreen === "capsule" && "Minimalist Capsule Lab"}
                  {currentScreen === "stylist" && "Atelier Style Chatbot AI"}
                  {currentScreen === "trend" && "Pinterest Trendboard Feed"}
                  {currentScreen === "blog" && "kastelas.in Editorial Blog"}
                  {currentScreen === "profile" && "Gamification & Metrics"}
                  {currentScreen === "settings" && "VIP Booking & Consultations"}
                </h1>
              </div>

              {/* Weather sync box */}
              <div className="flex items-center gap-3 bg-white border border-neutral-200 p-3 rounded-xl shadow-xs">
                <div className="bg-amber-50 p-2 rounded-lg text-[#C2B280]">
                  <CloudSun className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <select 
                      value={currentCity}
                      onChange={(e) => setCurrentCity(e.target.value)}
                      className="text-xs font-mono font-semibold bg-transparent border-none p-0 focus:outline-none focus:ring-0"
                    >
                      <option value="Mumbai">Mumbai</option>
                      <option value="Seoul">Seoul</option>
                      <option value="London">London</option>
                      <option value="New York">New York</option>
                    </select>
                    <span className="text-[11.5px] font-mono font-semibold text-neutral-800 bg-neutral-100 px-1.5 py-0.5 rounded">{weatherInfo.temp}°C</span>
                  </div>
                  <p className="text-[10px] text-neutral-500 font-light mt-0.5">{weatherInfo.condition}</p>
                </div>
              </div>
            </header>

            {/* ---------------------------------------------------- */}
            {/* HUB HOME SCREEN */}
            {/* ---------------------------------------------------- */}
            {currentScreen === "home" && (
              <div className="space-y-8">
                
                {/* Weather advice widget */}
                <div className="bg-neutral-900 text-[#FAF9F5] p-6 rounded-2xl relative overflow-hidden shadow-xl">
                  <div className="absolute right-0 bottom-0 opacity-15 text-white pr-4 pb-4">
                    <Sparkles className="w-40 h-40" />
                  </div>
                  <div className="max-w-xl space-y-4">
                    <span className="text-[10px] bg-white/20 text-[#E2D8C1] font-mono px-2.5 py-1 rounded-full uppercase tracking-widest">
                      AI Active Weather Advisory
                    </span>
                    <h3 className="font-serif text-2xl font-light italic">
                      "Style is an architecture that adapts to the pressure of weather."
                    </h3>
                    <p className="text-xs text-neutral-300 font-light leading-relaxed">
                      {weatherInfo.advice}
                    </p>
                    <div className="pt-2 flex flex-wrap gap-2">
                      <button 
                        onClick={() => setCurrentScreen("planner")}
                        className="bg-[#C2B280] hover:bg-[#b09e6c] text-neutral-900 text-xs px-4 py-2 font-medium rounded-lg transition"
                      >
                        Plan Today's Looks
                      </button>
                      <button 
                        onClick={() => setCurrentScreen("stylist")}
                        className="bg-white/10 hover:bg-white/20 text-white text-xs px-4 py-2 font-light rounded-lg transition"
                      >
                        Ask Outfit Ideas
                      </button>
                    </div>
                  </div>
                </div>

                {/* Dashboard stats layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Streak widget */}
                  <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-neutral-400 block uppercase">STREAK STRENGTH</span>
                      <p className="font-serif text-2xl italic font-semibold text-neutral-900">{userStats.streak} Days Live</p>
                      <p className="text-[11px] text-neutral-500 font-light">+25 pts tomorrow on OOTD log</p>
                    </div>
                    <div className="bg-amber-50 p-3.5 rounded-full text-amber-700">
                      <Zap className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Closet diversity score */}
                  <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-neutral-400 block uppercase">CLOSET SCORE</span>
                      <p className="font-serif text-2xl italic font-semibold text-neutral-900">{userStats.closetScore}% Eco-Curation</p>
                      <p className="text-[11px] text-emerald-600 font-light">Efficient wear-count distribution</p>
                    </div>
                    <div className="bg-emerald-50 p-3.5 rounded-full text-emerald-800">
                      <Award className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Streak points available */}
                  <div className="bg-white p-5 rounded-2xl border border-neutral-200 shadow-xs flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-neutral-400 block uppercase">FASHION XP ACCOUNT</span>
                      <p className="font-serif text-2xl italic font-semibold text-neutral-900">{userStats.points} XP</p>
                      <p className="text-[11px] text-amber-600 font-light">VIP Stylist status unlocked</p>
                    </div>
                    <div className="bg-indigo-50 p-3.5 rounded-full text-indigo-800">
                      <Gift className="w-6 h-6" />
                    </div>
                  </div>
                </div>

                {/* Wardrobe Quick summary list & fast buttons */}
                <div className="bg-white p-6 rounded-2xl border border-neutral-200 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h3 className="font-serif text-xl italic text-neutral-900">Wardrobe Hot Summary</h3>
                      <p className="text-xs text-neutral-500 font-light">Manage your garments or run background removal algorithms on new catalog pieces.</p>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedCategory("All");
                        setCurrentScreen("wardrobe");
                      }}
                      className="text-xs font-mono text-[#C2B280] font-semibold flex items-center gap-1 hover:underline"
                    >
                      Open Closet Drawer <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    {wardrobe.slice(0, 5).map(item => (
                      <div key={item.id} className="group relative border border-neutral-200/80 rounded-xl overflow-hidden bg-neutral-50/50 hover:shadow-md transition">
                        <img 
                          src={item.imageUrl} 
                          className="w-full h-36 object-cover object-center group-hover:scale-105 transition duration-300"
                          alt={item.name}
                          referrerPolicy="no-referrer"
                        />
                        <div className="p-2 space-y-1 bg-white">
                          <p className="text-[10px] font-mono text-gray-400 uppercase">{item.category}</p>
                          <p className="text-[11px] text-neutral-800 font-medium truncate">{item.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mini Editorial Spot blog slider */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Community Daily Styling Poll */}
                  <div className="bg-white p-6 rounded-2xl border border-neutral-200 space-y-4">
                    <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">DAILY ATELIER POLL</span>
                      <span className="text-[10px] font-mono text-amber-600 font-medium bg-amber-50 px-2 py-0.5 rounded">Active</span>
                    </div>

                    {stylePolls.slice(0, 1).map(poll => {
                      const userVote = votedPolls[poll.id];
                      return (
                        <div key={poll.id} className="space-y-4">
                          <h4 className="font-serif text-base italic leading-snug">{poll.question}</h4>
                          
                          <div className="grid grid-cols-2 gap-4 pt-2">
                            {/* Option A */}
                            <button 
                              disabled={!!userVote}
                              onClick={() => handlePollVote(poll.id, "A")}
                              className={`text-left p-3 rounded-xl border relative overflow-hidden transition ${
                                userVote === "A" 
                                  ? "border-[#C2B280] bg-[#FAF8F2]" 
                                  : "border-neutral-200 hover:border-neutral-300 bg-white"
                              }`}
                            >
                              <img src={poll.optionA.imageUrl} className="w-full h-20 object-cover rounded-md mb-2" alt="A" />
                              <p className="text-[11.5px] font-medium leading-tight line-clamp-2">{poll.optionA.text}</p>
                              {userVote && (
                                <div className="mt-2 text-xs font-mono font-semibold text-neutral-800">
                                  {Math.round((poll.optionA.votes / poll.totalVotes) * 100)}% Votes
                                </div>
                              )}
                            </button>

                            {/* Option B */}
                            <button 
                              disabled={!!userVote}
                              onClick={() => handlePollVote(poll.id, "B")}
                              className={`text-left p-3 rounded-xl border relative overflow-hidden transition ${
                                userVote === "B" 
                                  ? "border-[#C2B280] bg-[#FAF8F2]" 
                                  : "border-neutral-200 hover:border-neutral-300 bg-white"
                              }`}
                            >
                              <img src={poll.optionB.imageUrl} className="w-full h-20 object-cover rounded-md mb-2" alt="B" />
                              <p className="text-[11.5px] font-medium leading-tight line-clamp-2">{poll.optionB.text}</p>
                              {userVote && (
                                <div className="mt-2 text-xs font-mono font-semibold text-neutral-800">
                                  {Math.round((poll.optionB.votes / poll.totalVotes) * 100)}% Votes
                                </div>
                              )}
                            </button>
                          </div>

                          <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400">
                            <span>TOTAL VOTES: {poll.totalVotes}</span>
                            <span>{poll.endsIn}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Fast Action Blog teaser */}
                  <div className="bg-[#FAF8F2] p-6 rounded-2xl border border-[#E9E4DC] relative overflow-hidden flex flex-col justify-between">
                    <div className="space-y-3">
                      <span className="text-[10px] font-mono text-[#A19163] tracking-wider uppercase block">Kastelas.in Editor's Picks</span>
                      <h3 className="font-serif text-2xl font-light italic text-neutral-900 leading-snug">
                        "Invest in linen. Ditch the temporary fast-fashion cycle."
                      </h3>
                      <p className="text-xs text-neutral-600 font-light leading-relaxed">
                        Read Radhika's latest investment list mapping quiet luxury capsule trends directly to Gen-Z pocketbooks.
                      </p>
                    </div>

                    <div className="pt-6 flex gap-3">
                      <button 
                        onClick={() => setCurrentScreen("blog")}
                        className="bg-[#1A1A1A] hover:bg-black text-white text-xs px-5 py-2.5 rounded-lg transition tracking-wide font-medium"
                      >
                        Read Full Article
                      </button>
                      <button 
                        onClick={() => setCurrentScreen("trend")}
                        className="border border-[#C2B280] text-amber-900 hover:bg-[#FAF5EA] text-xs px-5 py-2.5 rounded-lg transition font-medium"
                      >
                        Explore Moodboards
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* WARDROBE MANAGER */}
            {/* ---------------------------------------------------- */}
            {currentScreen === "wardrobe" && (
              <div className="space-y-6">
                
                {/* Drawer stats header */}
                <div className="bg-white p-5 rounded-xl border border-neutral-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="text-left space-y-1">
                    <h3 className="text-lg font-serif italic text-neutral-900">Virtual Closet Analysis</h3>
                    <p className="text-xs text-neutral-500 font-light">Mix & match generator metrics using your pre-owned clothes catalog.</p>
                  </div>
                  
                  {/* Category switcher */}
                  <div className="flex flex-wrap gap-1.5">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-mono transition ${
                          selectedCategory === cat 
                            ? "bg-neutral-900 text-white font-medium" 
                            : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  <button 
                    id="btn-add-garment"
                    onClick={() => setAddModalOpen(true)}
                    className="bg-[#151412] hover:bg-black text-[#FAF9F5] text-xs px-4 py-2.5 rounded-lg font-medium tracking-wide flex items-center gap-1.5"
                  >
                    <Plus className="w-4 h-4" /> Add Garment
                  </button>
                </div>

                {/* Closet grid representation */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {wardrobe
                    .filter(item => selectedCategory === "All" || item.category === selectedCategory)
                    .map(item => (
                      <div key={item.id} className="group bg-white border border-neutral-200/80 rounded-xl overflow-hidden hover:shadow-lg transition flex flex-col h-full relative">
                        {/* Favorite badge toggle */}
                        <button 
                          onClick={() => {
                            setWardrobe(wardrobe.map(w => w.id === item.id ? { ...w, isFavorite: !w.isFavorite } : w));
                          }}
                          className="absolute right-3 top-3 bg-white/75 hover:bg-white p-1.5 rounded-full text-neutral-600 shadow-sm z-10 transition"
                        >
                          <Heart className={`w-3.5 h-3.5 ${item.isFavorite ? "fill-rose-500 text-rose-500" : "text-neutral-500"}`} />
                        </button>
                        
                        <div className="aspect-[4/5] overflow-hidden relative bg-neutral-100">
                          <img 
                            src={item.imageUrl} 
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                            alt={item.name}
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        <div className="p-3.5 text-left flex-1 flex flex-col justify-between space-y-2 bg-white">
                          <div className="space-y-1">
                            <span className="text-[9px] font-mono tracking-wider text-[#A19163] uppercase block">{item.brand || "ZARA"}</span>
                            <h4 className="text-xs font-semibold text-neutral-800 line-clamp-2 md:h-8 leading-tight">{item.name}</h4>
                          </div>

                          <div className="border-t border-neutral-100 pt-2 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                            <span>Aesthetic: {item.style}</span>
                            <span className="bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded">Worn: {item.wearCount}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>

                {/* Empty state details */}
                {wardrobe.filter(item => selectedCategory === "All" || item.category === selectedCategory).length === 0 && (
                  <div className="text-center py-20 bg-white rounded-xl border border-neutral-200 space-y-4">
                    <FolderHeart className="w-12 h-12 mx-auto text-neutral-300" />
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold text-neutral-700">No clothes catalogued here yet</h4>
                      <p className="text-xs text-neutral-500 font-light">Add an item to get AI recommendations aligned with this drawer categories.</p>
                    </div>
                  </div>
                )}

                {/* Add Garment Modal Dialog */}
                {addModalOpen && (
                  <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl max-w-lg w-full p-6 border border-neutral-200 shadow-2xl relative space-y-6">
                      
                      <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                        <h3 className="font-serif text-lg font-medium text-neutral-900 italic">Digitize New Wardrobe Piece</h3>
                        <button 
                          onClick={() => setAddModalOpen(false)}
                          className="text-xs font-mono text-neutral-400 hover:text-neutral-800"
                        >
                          Cancel
                        </button>
                      </div>

                      {/* Photo scanner simulator */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border-2 border-dashed border-neutral-200 p-4 rounded-xl flex flex-col justify-center items-center text-center space-y-3 bg-neutral-50 min-h-60 relative overflow-hidden">
                          {scanningBg ? (
                            <div className="space-y-3 z-10">
                              <RefreshCw className="w-8 h-8 text-neutral-700 animate-spin mx-auto" />
                              <span className="text-[10px] uppercase font-mono font-bold text-neutral-600 tracking-wider">Removing Background in AI Model...</span>
                            </div>
                          ) : scannedImage ? (
                            <img src={scannedImage} className="w-full h-full object-cover rounded-md" alt="Scanned" />
                          ) : (
                            <div className="space-y-3">
                              <Camera className="w-8 h-8 text-neutral-400 mx-auto" />
                              <p className="text-[11px] text-neutral-500 font-light leading-snug">Simulate your photo background remover upload</p>
                              
                              <button
                                onClick={() => handleSimulateBgRemoval("linenShirt")}
                                className="bg-neutral-950 text-white text-[10px] font-mono py-1.5 px-3 rounded-md hover:bg-neutral-800 transition"
                              >
                                Try White Linen Shirt
                              </button>
                              <button
                                onClick={() => handleSimulateBgRemoval("cropKnit")}
                                className="bg-neutral-900 text-white text-[10px] font-mono py-1.5 px-3 rounded-md hover:bg-neutral-800 transition"
                              >
                                Try Cotton Crop Knit
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Garment fields */}
                        <div className="space-y-3 text-left">
                          <div>
                            <label className="text-[10px] font-mono text-neutral-400 uppercase">Garment Name</label>
                            <input 
                              type="text" 
                              value={newItemName}
                              onChange={(e) => setNewItemName(e.target.value)}
                              className="w-full border border-neutral-200 bg-white p-2 rounded-lg text-xs" 
                              placeholder="e.g., Casual Silk Crop Blouse"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-mono text-neutral-400 uppercase">Category</label>
                            <select 
                              value={newItemCategory}
                              onChange={(e) => setNewItemCategory(e.target.value)}
                              className="w-full border border-neutral-200 bg-white p-2 rounded-lg text-xs"
                            >
                              <option value="Tops">Tops</option>
                              <option value="Bottoms">Bottoms</option>
                              <option value="Jackets">Jackets</option>
                              <option value="Shoes">Shoes</option>
                              <option value="Bags">Bags</option>
                              <option value="Accessories">Accessories</option>
                              <option value="Ethnic Wear">Ethnic Wear</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-[10px] font-mono text-neutral-400 uppercase">Aesthetic</label>
                            <select 
                              value={newItemAesthetic}
                              onChange={(e: any) => setNewItemAesthetic(e.target.value)}
                              className="w-full border border-neutral-200 bg-white p-2 rounded-lg text-xs"
                            >
                              <option value="Minimalist">Minimalist</option>
                              <option value="Old Money">Old Money</option>
                              <option value="Korean Fashion">Korean Fashion</option>
                              <option value="Streetwear">Streetwear</option>
                              <option value="Casual Chic">Casual Chic</option>
                              <option value="Luxury Fashion">Luxury Fashion</option>
                              <option value="Ethnic Wear">Ethnic Wear</option>
                            </select>
                          </div>

                          <div>
                            <label className="text-[10px] font-mono text-neutral-400 uppercase">Dominant Color Code</label>
                            <input 
                              type="color" 
                              value={newItemColors}
                              onChange={(e) => setNewItemColors(e.target.value)}
                              className="w-full h-8 p-1 bg-white border border-neutral-200 rounded-lg cursor-pointer"
                            />
                          </div>
                        </div>
                      </div>

                      <button 
                        onClick={createWardrobeItem}
                        disabled={!newItemName}
                        className="w-full bg-neutral-950 hover:bg-black text-[#FAF9F5] py-3 rounded-lg text-xs font-semibold uppercase tracking-wide transition disabled:opacity-50"
                      >
                        Add to Wardrobe Drawer & Remove Background
                      </button>

                    </div>
                  </div>
                )}

              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* OUTFIT PLANNER GRID */}
            {/* ---------------------------------------------------- */}
            {currentScreen === "planner" && (
              <div className="space-y-6">
                
                {/* Weather advice widget */}
                <div className="bg-[#FAF8F2] border border-[#EBE6DD] p-5 rounded-2xl flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
                  <div className="text-left space-y-1">
                    <span className="text-[9px] font-mono text-[#D4AF37] font-semibold bg-amber-50 px-2 py-0.5 rounded uppercase">Forecast Advice</span>
                    <h3 className="font-serif text-lg font-medium text-neutral-900 italic">Plan for {currentCity} ({weatherInfo.temp}°C)</h3>
                    <p className="text-xs text-neutral-600 font-light leading-relaxed max-w-xl">
                      <strong>AI styling recommendation today:</strong> {weatherInfo.advice}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Calendar controller */}
                  <div className="md:col-span-2 bg-white p-6 rounded-xl border border-neutral-200 space-y-6">
                    <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
                      <h4 className="font-serif text-base italic font-semibold text-neutral-900">May Outfit Calendar</h4>
                      <span className="text-xs font-mono text-neutral-400">MAY 2026</span>
                    </div>

                    {/* Simple Weekly Grid */}
                    <div className="grid grid-cols-7 gap-2 text-center text-xs font-mono pb-2 border-b border-neutral-100 text-neutral-400">
                      <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      {Array.from({ length: 31 }, (_, i) => {
                        const dayNum = i + 1;
                        const dateStr = `2026-05-${dayNum < 10 ? "0" + dayNum : dayNum}`;
                        const isScheduled = schedule.some(s => s.date === dateStr);
                        const isToday = dateStr === "2026-05-28";
                        
                        return (
                          <div 
                            key={dayNum} 
                            onClick={() => {
                              if (!isScheduled) {
                                // Add draft look
                                const newSchedule: ScheduledOutfit = {
                                  id: "sch-" + Date.now(),
                                  date: dateStr,
                                  timeOfDay: "Morning",
                                  itemIds: ["w1", "w2"],
                                  occasion: "Bespoke look",
                                  aesthetic: "Minimalist",
                                  isDraft: true
                                };
                                setSchedule([...schedule, newSchedule]);
                              }
                            }}
                            className={`p-3 rounded-lg text-xs flex flex-col justify-between items-center cursor-pointer min-h-[5rem] transition relative border ${
                              isScheduled 
                                ? "bg-amber-50/70 border-amber-300 text-neutral-950 font-bold" 
                                : isToday 
                                  ? "border-neutral-950 bg-[#FAF9F5]" 
                                  : "border-neutral-100 hover:border-neutral-400 bg-white"
                            }`}
                          >
                            <span className="font-mono text-[10px] text-neutral-400 self-start">{dayNum}</span>
                            {isScheduled && (
                              <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2" />
                            )}
                            {isToday && (
                              <span className="text-[8px] font-mono bg-neutral-900 text-[#FAF9F5] px-1 rounded absolute right-1">Today</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Smart Style Generation Machine */}
                  <div className="bg-white p-6 rounded-xl border border-neutral-200 flex flex-col justify-between">
                    <div className="space-y-4 text-left">
                      <div className="border-b border-neutral-100 pb-3 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-[#C2B280]" />
                        <h4 className="font-serif text-base italic font-semibold text-neutral-900">One-Tap AI Outfit Maker</h4>
                      </div>

                      <p className="text-xs text-neutral-500 font-light">Generate complete luxurious outfits recipes mapped to weather & aesthetics.</p>
                      
                      <div className="space-y-3 pt-2">
                        <div>
                          <label className="text-[10px] font-mono text-neutral-400 uppercase">Occasion</label>
                          <select 
                            value={plannerOccasion} 
                            onChange={(e) => setPlannerOccasion(e.target.value)}
                            className="w-full border border-neutral-200 bg-white p-2.5 rounded-lg text-xs mt-1"
                          >
                            <option value="Summer Brunch">Summer Brunch</option>
                            <option value="Formal Wedding Guest">Wedding Guest look</option>
                            <option value="Old Money Yacht Party">Yacht Party</option>
                            <option value="Minimal Airport Outfit">Minimal Airport Outfit</option>
                            <option value="Street Coffee Lounge">Coffee Date</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[10px] font-mono text-neutral-400 uppercase">Aesthetic Choice</label>
                          <select 
                            value={plannerAesthetic} 
                            onChange={(e: any) => setPlannerAesthetic(e.target.value)}
                            className="w-full border border-neutral-200 bg-white p-2.5 rounded-lg text-xs mt-1"
                          >
                            <option value="Old Money">Old Money</option>
                            <option value="Minimalist">Minimalist</option>
                            <option value="Korean Fashion">Korean Fashion</option>
                            <option value="Streetwear">Streetwear</option>
                            <option value="Ethnic Wear">Ethnic Wear</option>
                          </select>
                        </div>
                      </div>

                      <button 
                        id="btn-generate-outfit-ai"
                        onClick={handleGenerateOutfitLook}
                        disabled={generatingLook}
                        className="w-full bg-[#1A1A1A] hover:bg-black text-[#FAF9F5] py-3 rounded-lg text-xs font-semibold uppercase tracking-wide transition flex items-center justify-center gap-2 mt-4"
                      >
                        {generatingLook ? "Orchestrating Style Look..." : "Orchestrate Outfit Recipe"}
                      </button>
                    </div>

                    {/* Generated look response panel */}
                    {generatedLook && (
                      <div className="border border-neutral-200 bg-[#FAF9F5] rounded-xl p-4 mt-6 text-left space-y-3">
                        <div className="flex items-center justify-between border-b border-light-200 pb-1.5">
                          <span className="text-[10px] font-mono font-bold text-[#A52A2A] uppercase">{generatedLook.lookName}</span>
                          <span className="text-[9px] font-mono bg-amber-50 text-amber-900 border border-amber-200 px-1.5 py-0.5 rounded">{generatedLook.aesthetic}</span>
                        </div>
                        
                        <div className="space-y-1 text-xs">
                          <p><strong>Top:</strong> {generatedLook.outfitRecipe?.top}</p>
                          <p><strong>Bottom:</strong> {generatedLook.outfitRecipe?.bottom}</p>
                          <p><strong>Overcoat:</strong> {generatedLook.outfitRecipe?.outerwear || "None"}</p>
                          <p><strong>Shoes:</strong> {generatedLook.outfitRecipe?.shoes}</p>
                        </div>

                        <p className="text-[11px] text-neutral-500 italic mt-2 leading-relaxed">
                          <strong>Stylist notes:</strong> {generatedLook.stylingAdvice}
                        </p>
                      </div>
                    )}
                  </div>

                </div>

              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* CAPSULE WARDROBE BUILDER */}
            {/* ---------------------------------------------------- */}
            {currentScreen === "capsule" && (
              <div className="space-y-6">
                
                <div className="bg-white p-6 rounded-2xl border border-neutral-200 space-y-6">
                  <div className="text-left space-y-1">
                    <h3 className="font-serif text-2xl italic font-medium text-neutral-900">Minimalist Packing Capsule Builder</h3>
                    <p className="text-xs text-neutral-500 font-light">Generate optimized "30 outfits from 10 items" formulas based on capsule logistics.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-left">
                    
                    {/* Controller */}
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-mono text-neutral-400 uppercase">Trip Destination Vibe</label>
                        <select 
                          value={capsuleDestination}
                          onChange={(e) => setCapsuleDestination(e.target.value)}
                          className="w-full border border-neutral-200 bg-white p-3 rounded-lg text-xs mt-1"
                        >
                          <option value="Resort Vacation">Resort Vacation (Goa/Maldives)</option>
                          <option value="Business Summit">Creative Business Summit (Milan)</option>
                          <option value="Weekend Getaway">Weekend Café Getaway (Seoul)</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] font-mono text-neutral-400 uppercase">Target garments count limit</label>
                        <select
                          value={capsuleDays}
                          onChange={(e) => setCapsuleDays(Number(e.target.value))}
                          className="w-full border border-neutral-200 bg-white p-3 rounded-lg text-xs mt-1"
                        >
                          <option value={5}>Minimal packing list (8 garments)</option>
                          <option value={10}>Mid packing list (12 garments)</option>
                        </select>
                      </div>

                      <button 
                        onClick={handleBuildCapsulePack}
                        disabled={buildingCapsule}
                        className="w-full bg-[#1A1A1A] hover:bg-black text-[#FAF9F5] py-3.5 rounded-lg text-xs font-semibold uppercase tracking-wide transition flex items-center justify-center gap-2"
                      >
                        {buildingCapsule ? "Synthesizing Capsule formula..." : "Synthesize Packing Formula"}
                      </button>
                    </div>

                    {/* Result outputs */}
                    <div className="md:col-span-2 border border-neutral-200 bg-neutral-50/50 rounded-xl p-6 relative min-h-60">
                      {buildingCapsule ? (
                        <div className="flex flex-col justify-center items-center text-center h-full space-y-4 py-8 absolute inset-0 bg-white/80 z-20">
                          <RefreshCw className="w-8 h-8 text-neutral-400 animate-spin mx-auto" />
                          <p className="text-xs font-mono">Formulating travel assets...</p>
                        </div>
                      ) : null}

                      {capsuleResult ? (
                        <div className="space-y-5">
                          <div className="flex justify-between items-center border-b border-neutral-200 pb-2">
                            <span className="font-serif text-lg italic text-[#2F4F4F]">Curated Outfit Proportions: {capsuleResult.ratio}</span>
                            <span className="text-[10px] font-mono bg-neutral-900 text-white px-2 py-0.5 rounded">Optimal Pack</span>
                          </div>

                          <div className="space-y-3">
                            {capsuleResult.list.map((c: any, index: number) => (
                              <div key={index} className="flex justify-between items-start text-xs border-b border-neutral-100 pb-2">
                                <div className="space-y-0.5">
                                  <p className="font-semibold text-neutral-800">{c.item}</p>
                                  <p className="text-[11px] text-neutral-500 font-light">{c.reason}</p>
                                </div>
                                <span className="text-[10px] font-mono bg-neutral-100 text-[#555] px-2 py-0.5 rounded">Item {index + 1}</span>
                              </div>
                            ))}
                          </div>

                          <p className="text-xs text-neutral-600 font-light italic leading-relaxed pt-2 border-t border-neutral-200">
                            <strong>Transit Layout Secret:</strong> {capsuleResult.tips}
                          </p>
                        </div>
                      ) : (
                        <div className="flex flex-col justify-center items-center text-center h-full space-y-4 py-8">
                          <SlidersHorizontal className="w-10 h-10 text-neutral-300" />
                          <div className="space-y-1">
                            <p className="text-xs font-semibold text-neutral-600">Formulate your travel itinerary above</p>
                            <p className="text-xs text-neutral-400 font-light">The AI capsule compositor will filter high durability clothing layers mapped from your closet metrics.</p>
                          </div>
                        </div>
                      )}
                    </div>

                  </div>
                </div>

              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* AI STYLIST CHATBOT VIEW */}
            {/* ---------------------------------------------------- */}
            {currentScreen === "stylist" && (
              <div className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  
                  {/* Sidebar Suggestions */}
                  <div className="space-y-4">
                    <div className="bg-white p-5 rounded-xl border border-neutral-200 text-left space-y-3">
                      <h4 className="font-serif text-sm italic font-semibold text-neutral-900 border-b border-neutral-100 pb-2">Instant Style Enquiries</h4>
                      
                      <div className="flex flex-col gap-2">
                        <button 
                          onClick={() => sendChatMessage("Give me a quiet luxury outfit using minimal blazers")}
                          className="text-left text-xs bg-neutral-50 hover:bg-[#FAF8F2] p-2.5 rounded-lg border border-neutral-100 transition line-clamp-1 h-9"
                        >
                          “Style my black blazer”
                        </button>
                        <button 
                          onClick={() => sendChatMessage("Suggest clothing options for warm humid campus college days")}
                          className="text-left text-xs bg-neutral-50 hover:bg-[#FAF8F2] p-2.5 rounded-lg border border-neutral-100 transition line-clamp-1 h-9"
                        >
                          “Outfit for college”
                        </button>
                        <button 
                          onClick={() => sendChatMessage("How should I style a modern metallic saree overlay over tailored trousers for a festive dinner")}
                          className="text-left text-xs bg-neutral-50 hover:bg-[#FAF8F2] p-2.5 rounded-lg border border-neutral-100 transition line-clamp-1 h-9"
                        >
                          “Festive IndoWestern look”
                        </button>
                      </div>
                    </div>

                    {/* Skin Tone harmony guide block */}
                    <div className="bg-neutral-900 text-[#FAF9F5] p-5 rounded-xl text-left space-y-3 shadow-md">
                      <span className="text-[9px] font-mono text-amber-200/60 uppercase block">Color Harmony Model</span>
                      <h4 className="font-serif text-sm italic font-semibold">{profile.skinTone} Tone Balance</h4>
                      <p className="text-[11px] text-neutral-300 font-light leading-relaxed">
                        With an <strong>{profile.skinTone}</strong> base canvas, you look spectacular in <strong>rich ochres, sand tones, warm chocolate, and metallic bronze</strong> accents.
                      </p>
                    </div>
                  </div>

                  {/* Main chat terminal */}
                  <div className="md:col-span-3 bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-lg flex flex-col h-[32rem]">
                    
                    {/* Terminal Header */}
                    <div className="p-4 bg-neutral-900 text-[#FAF9F5] flex items-center justify-between border-b border-neutral-800">
                      <div className="flex items-center gap-3">
                        <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping" />
                        <div className="text-left">
                          <p className="text-xs font-semibold">Kastelas.in Personal Stylist</p>
                          <p className="text-[9px] text-[#C2B280] font-mono tracking-wider">AI ATELIER PROCESSOR V3.5</p>
                        </div>
                      </div>
                      
                      <span className="text-[10px] font-mono text-neutral-400">100% SECURE CHAT</span>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-neutral-50/50">
                      {chatMessages.map(msg => (
                        <div 
                          key={msg.id} 
                          className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          <div className={`max-w-md p-4 rounded-xl text-xs leading-relaxed text-left space-y-2 ${
                            msg.sender === "user" 
                              ? "bg-neutral-950 text-[#FAF9F5] rounded-br-none" 
                              : "bg-white text-neutral-800 border border-neutral-200 rounded-bl-none shadow-xs"
                          }`}>
                            <p className="whitespace-pre-line">{msg.text}</p>
                            <span className="text-[9px] text-neutral-400 font-mono block text-right pt-1">{msg.createdAt}</span>
                          </div>
                        </div>
                      ))}

                      {chatLoading && (
                        <div className="flex justify-start">
                          <div className="bg-white border border-neutral-200 p-4 rounded-xl flex items-center gap-2 text-xs font-mono text-neutral-500">
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Stylist is scanning closet drapes...</span>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Chat Input panel */}
                    <div className="p-3 bg-white border-t border-neutral-200 flex gap-2">
                      <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") sendChatMessage("");
                        }}
                        placeholder="Style my black blazer for an old money resort luxury..."
                        className="flex-1 border border-neutral-200 p-3 rounded-lg text-xs focus:outline-none focus:border-amber-600 focus:ring-0 bg-neutral-50"
                      />
                      <button 
                        id="btn-chat-send"
                        onClick={() => sendChatMessage("")}
                        className="bg-neutral-950 hover:bg-black text-white px-5 rounded-lg text-xs font-semibold tracking-wide"
                      >
                        Ask AI
                      </button>
                    </div>

                  </div>

                </div>

              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* PINTEREST TREND PINS SCREEN */}
            {/* ---------------------------------------------------- */}
            {currentScreen === "trend" && (
              <div className="space-y-6">
                
                {/* Community Section Teaser */}
                <div className="bg-neutral-900 text-[#FAF9F5] p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="text-left space-y-1">
                    <span className="text-[10px] font-mono text-[#C2B280] tracking-widest block uppercase">THE STYLE CONDUIT</span>
                    <h3 className="font-serif text-2xl italic">Pinterest-Inspired Grid discovery</h3>
                    <p className="text-xs text-neutral-300 font-light">Explore viral looks uploaded by kastelas designers. Click like to build daily streak multipliers!</p>
                  </div>
                  
                  <button 
                    onClick={() => alert("Upload your OOTD is premium VIP tier. Complete organization guidelines to qualify!")}
                    className="bg-white text-neutral-950 hover:bg-neutral-100 text-xs px-4 py-2.5 rounded-lg font-semibold transition"
                  >
                    Post Daily OOTD (+100 XP)
                  </button>
                </div>

                {/* Pinterest Columns Layout */}
                <div className="columns-1 sm:columns-2 md:columns-4 gap-6 space-y-6">
                  {trendPins.map(pin => (
                    <div key={pin.id} className="break-inside-avoid bg-white border border-neutral-200 rounded-xl overflow-hidden hover:shadow-lg transition space-y-3 p-4 flex flex-col">
                      
                      {/* Creator avatar line heading */}
                      <div className="flex items-center justify-between text-left pb-1">
                        <div className="flex items-center gap-2">
                          <img src={pin.creator.avatar} className="w-8 h-8 rounded-full border border-neutral-200 object-cover" alt="Avatar" />
                          <div className="text-xs">
                            <p className="font-semibold text-neutral-800">{pin.creator.name}</p>
                            <span className="text-[9px] text-[#A19163] font-medium">{pin.creator.followers} followers</span>
                          </div>
                        </div>

                        <span className="text-[9px] font-mono text-neutral-400 bg-neutral-100 px-2 py-0.5 rounded">{pin.aesthetic}</span>
                      </div>

                      <div className="relative overflow-hidden rounded-lg bg-neutral-100">
                        <img 
                          src={pin.imageUrl} 
                          className="w-full h-auto max-h-80 object-cover" 
                          alt="Pin Title"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="text-left space-y-2">
                        <h4 className="text-xs font-bold text-neutral-900 leading-tight">{pin.title}</h4>
                        <p className="text-[11px] text-neutral-500 font-light leading-relaxed">{pin.description}</p>
                      </div>

                      {/* Interactive Buttons footer */}
                      <div className="border-t border-neutral-100 pt-3 flex items-center justify-between text-neutral-500">
                        <button 
                          onClick={() => togglePinLike(pin.id)}
                          className="flex items-center gap-1.5 text-xs hover:text-neutral-950 transition"
                        >
                          <Heart className={`w-4 h-4 ${pin.hasLiked ? "fill-rose-500 text-rose-500" : ""}`} />
                          <span className="font-mono text-[10px]">{pin.likes}</span>
                        </button>
                        
                        <button 
                          onClick={() => togglePinSave(pin.id)}
                          className="flex items-center gap-1.5 text-xs hover:text-neutral-950 transition"
                        >
                          <Bookmark className={`w-4 h-4 ${pin.hasSaved ? "fill-amber-500 text-amber-500" : ""}`} />
                          <span className="font-mono text-[10px]">{pin.saves}</span>
                        </button>

                        <button 
                          onClick={() => {
                            // Copy look to client
                            alert("Mapping styled items to your wardrobe planner!");
                          }}
                          className="text-[10px] font-mono text-[#C2B280] font-semibold hover:underline"
                        >
                          Copy Look Recipe
                        </button>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* KASTELAS NEWS EDITORIAL BLOGS */}
            {/* ---------------------------------------------------- */}
            {currentScreen === "blog" && (
              <div className="space-y-8">
                
                {/* Curated Blog Posts Editorial Columns */}
                <div className="space-y-10">
                  {INITIAL_KASTELAS_BLOGS.map(post => (
                    <div key={post.id} className="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-lg p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 text-left">
                      
                      {/* Meta author column Left */}
                      <div className="md:col-span-4 flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <img src={post.author.avatar} className="w-10 h-10 rounded-full border" alt="Author" />
                            <div>
                              <p className="text-xs font-semibold text-neutral-900">{post.author.name}</p>
                              <p className="text-[10px] text-neutral-400">{post.author.role}</p>
                            </div>
                          </div>

                          <span className="text-[10px] font-mono text-[#A19163] uppercase border border-[#E9E4DC] px-2.5 py-1 rounded bg-[#FAF8F5] block w-fit">
                            {post.tags[0]}
                          </span>
                        </div>

                        {/* Shoppable Products */}
                        <div className="space-y-3 bg-[#FAF9F5] p-4 rounded-xl border border-neutral-200/60">
                          <p className="text-[10px] font-mono font-bold tracking-wider text-neutral-400 uppercase">GET THE LOOK SHOP</p>
                          
                          <div className="space-y-2">
                            {post.shoppableItems.map(shop => (
                              <div key={shop.id} className="flex items-center gap-3 bg-white p-2 border border-neutral-100 rounded-lg">
                                <img src={shop.imageUrl} className="w-10 h-10 object-cover rounded" alt="shop" />
                                <div className="text-left flex-1 min-w-0">
                                  <p className="text-[11px] font-semibold truncate">{shop.name}</p>
                                  <p className="text-[10px] text-[#C2B280] font-mono">{shop.price}</p>
                                </div>
                                <ShoppingBag className="w-4 h-4 text-neutral-400 hover:text-neutral-950 cursor-pointer" onClick={() => alert(`Redirecting to affiliate checkout: ${shop.link}`)} />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Cover Image & Article right */}
                      <div className="md:col-span-8 space-y-4 flex flex-col justify-between">
                        <div className="space-y-3">
                          <span className="text-xs text-neutral-400 font-mono">{post.publishedAt} • {post.readTime}</span>
                          <h2 className="font-serif text-2xl md:text-3xl italic tracking-tight text-neutral-900 font-medium">{post.title}</h2>
                          <p className="text-xs font-semibold text-neutral-600 line-clamp-2 leading-relaxed">{post.excerpt}</p>
                          
                          <div className="text-xs text-neutral-500 font-light leading-relaxed prose prose-neutral pt-2 line-clamp-5">
                            {post.content}
                          </div>
                        </div>

                        <div className="pt-4 border-t border-neutral-100 flex gap-3">
                          <button 
                            onClick={() => handleRecreateBlogOutfit(post.id)}
                            className="bg-[#1A1A1A] hover:bg-black text-[#FAF9F5] text-xs px-5 py-2.5 rounded-lg transition tracking-wide font-medium flex items-center gap-1.5"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-[#C2B280]" /> AI Recreate Look From Closet
                          </button>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* GAMIFICATION & USER METRICS SCREEN */}
            {/* ---------------------------------------------------- */}
            {currentScreen === "profile" && (
              <div className="space-y-6">
                
                <div className="bg-white p-6 rounded-2xl border border-neutral-200 text-left space-y-6">
                  
                  {/* Title heading */}
                  <div className="border-b border-neutral-100 pb-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="font-serif text-2xl italic font-semibold text-neutral-900">Wardrobe Streak & Style Certifications</h3>
                      <p className="text-xs text-neutral-500 font-light">Synthesize achievements by logging daily outfit configurations.</p>
                    </div>

                    <div className="bg-[#FAF8F2] border border-[#E9E4DC] p-3 rounded-xl flex items-center gap-4 text-xs font-mono">
                      <div>
                        <p className="text-neutral-400">XP POINTS</p>
                        <p className="font-bold text-neutral-900 text-sm">{userStats.points}</p>
                      </div>
                      <div className="border-l border-neutral-200 pl-4">
                        <p className="text-neutral-400">ACTIVE STREAK</p>
                        <p className="font-bold text-[#A52A2A] text-sm">{userStats.streak} Days 🔥</p>
                      </div>
                    </div>
                  </div>

                  {/* Body shape picker & skin picker */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-mono text-xs font-bold text-neutral-700 uppercase tracking-widest border-b border-neutral-100 pb-2">BODY MEASUREMENTS PROFILE</h4>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1 text-xs">
                          <span className="text-neutral-400 block">Height Index</span>
                          <p className="font-mono font-semibold">{profile.metrics.height || "168 cm"}</p>
                        </div>
                        <div className="space-y-1 text-xs">
                          <span className="text-neutral-400 block">Digital Jacket Size</span>
                          <p className="font-mono font-semibold">{profile.metrics.size || "S / UK 8"}</p>
                        </div>
                        <div className="space-y-1 text-xs">
                          <span className="text-neutral-400 block">Body Architecture Silhouette</span>
                          <p className="font-mono font-semibold">{profile.bodyType}</p>
                        </div>
                        <div className="space-y-1 text-xs">
                          <span className="text-neutral-400 block">Preferred Aesthetics</span>
                          <p className="font-sans font-semibold text-[#A52A2A]">{profile.preferredAesthetics.join(", ")}</p>
                        </div>
                      </div>
                    </div>

                    {/* Smart badging list */}
                    <div className="space-y-4">
                      <h4 className="font-mono text-xs font-bold text-neutral-700 uppercase tracking-widest border-b border-neutral-100 pb-2">EARNED FASHION BADGES</h4>
                      
                      <div className="flex flex-wrap gap-2">
                        {userStats.badges.map(badge => (
                          <div key={badge.id} className="bg-neutral-50 border border-neutral-200 px-3.5 py-2.5 rounded-xl text-left flex items-start gap-2 max-w-sm">
                            <div className="bg-amber-50 text-[#C2B280] p-1.5 rounded-full mt-0.5">
                              <Star className="w-3.5 h-3.5 fill-[#C2B280]" />
                            </div>
                            <div className="text-xs">
                              <p className="font-semibold text-neutral-800">{badge.name}</p>
                              <p className="text-[10px] text-neutral-400 font-light mt-0.5">{badge.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* ---------------------------------------------------- */}
            {/* VIP SYSTEM CONSULTATIONS & SETTINGS */}
            {/* ---------------------------------------------------- */}
            {currentScreen === "settings" && (
              <div className="space-y-6">
                
                <div className="bg-white p-6 rounded-2xl border border-neutral-200 text-left space-y-6">
                  
                  <div className="border-b border-neutral-100 pb-4">
                    <h3 className="font-serif text-2xl italic font-semibold text-neutral-900">VIP Digital Stylist Membership</h3>
                    <p className="text-xs text-neutral-500 font-light pt-1">Booking premium consultations, commercial checks, and toggling augmented reality setups.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-light leading-relaxed">
                    
                    {/* VIP tier options */}
                    <div className="space-y-4 border-r border-neutral-100 pr-4">
                      <h4 className="font-mono text-xs font-bold text-neutral-700 uppercase tracking-widest pb-1">PARTNERSHIP CHANNELS</h4>
                      
                      <div className="space-y-3">
                        <div className="p-4 bg-[#FAF8F5] border border-neutral-200 rounded-xl space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-serif font-semibold italic text-neutral-900">Virtual AR Try-On Model</span>
                            <span className="bg-emerald-50 text-emerald-800 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase">Optimized</span>
                          </div>
                          <p className="text-[11px] text-neutral-500">Camera frame permissions calibrated inside metadata parameters. Enables instant 3D layering over scanned silhouettes.</p>
                          <button onClick={() => alert("Calibrating AR Camera parameters... Ensure frame capabilities are permitted in settings.")} className="text-[11px] font-semibold text-amber-700 hover:underline">Activate AR preview now →</button>
                        </div>

                        <div className="p-4 bg-white border border-neutral-200 rounded-xl space-y-2 shadow-xs">
                          <div className="flex items-center justify-between">
                            <span className="font-serif font-semibold italic text-neutral-900">Bespoke Milan Consultation</span>
                            <span className="font-mono text-[10px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded font-bold">Rs. 2,999/session</span>
                          </div>
                          <p className="text-[11px] text-neutral-500">Connect with expert style coaches for a 1-on-1 wedding or haute couture capsule consultation.</p>
                          <button onClick={() => alert("Consulting slot reservation initialized.")} className="bg-neutral-950 hover:bg-black text-white text-[10px] py-1.5 px-3 rounded-lg font-mono">Book Slot Now</button>
                        </div>
                      </div>
                    </div>

                    {/* Affiliate stats and brands */}
                    <div className="space-y-4">
                      <h4 className="font-mono text-xs font-bold text-neutral-700 uppercase tracking-widest pb-1">COMMERCIAL INTEGRATIONS</h4>
                      
                      <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200 space-y-3 font-mono text-[10px] text-neutral-600">
                        <div className="flex justify-between">
                          <span>AFFILIATE COMMISSIONS PREVIEW RATE</span>
                          <span className="font-bold text-neutral-900">8.5% - 14.0%</span>
                        </div>
                        <div className="flex justify-between">
                          <span>INTEGRATED BRAND CHANNELS</span>
                          <span className="font-bold text-neutral-950">Zara, H&M, Vogue Store</span>
                        </div>
                        <div className="flex justify-between border-t border-neutral-200 pt-2 text-neutral-800">
                          <span>ESTIMATED CONVERSIONS (MAY 2026)</span>
                          <span className="font-bold">Rs. 84,200</span>
                        </div>
                      </div>

                      <p className="text-xs text-neutral-500">
                        This sandbox models the entire affiliate blogging loop from kastelas.in editorials directly into shoppable commissions checks tracking.
                      </p>
                    </div>

                  </div>

                </div>

              </div>
            )}

          </main>
        </div>
      )}

    </div>
  );
}
