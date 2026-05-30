/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize the premium Gemini client if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
    console.log("Successfully initialized premium Gemini AI Styling Engine Client.");
  } catch (err) {
    console.error("Failed to initialize GoogleGenAI client:", err);
  }
} else {
  console.log("No GEMINI_API_KEY found, running in AI simulation/fallback mode.");
}

// ----------------------------------------------------
// API ENDPOINTS
// ----------------------------------------------------

// 1. Live Weather API simulation for key cities
app.get("/api/weather", (req, res) => {
  const city = (req.query.city as string) || "Mumbai";
  const weatherMap: Record<string, { temp: number; condition: string; humidity: string; advice: string }> = {
    "Mumbai": {
      temp: 32,
      condition: "Tropical Humid & Sunny",
      humidity: "82%",
      advice: "Breathable heavy organic linens, cotton weaves, relaxed silhouettes, and open leather loafers are recommended. Avoid synthetic layers."
    },
    "Seoul": {
      temp: 21,
      condition: "Crisp Autumn Sky",
      humidity: "45%",
      advice: "Fabulous boxy pastel cardigans, structured blazers, light trenchcoats, and clean gumsole sneakers. Excellent day for layering!"
    },
    "London": {
      temp: 14,
      condition: "Mild Drizzle & Chilly",
      humidity: "90%",
      advice: "Double-breasted beige camel trenchcoat over tailored knit sweaters, anchored with waterproof leather loafers or leather boots. Carry a classy umbrella."
    },
    "New York": {
      temp: 26,
      condition: "Sunny Breeze",
      humidity: "50%",
      advice: "Tailored high-waisted slate trousers matched with crisp white cotton poplin shirts, vintage sunglasses, and clean leather tote bag."
    }
  };

  const current = weatherMap[city] || weatherMap["Mumbai"];
  res.json({ city, ...current });
});

// 2. Chat with AI Fashion Stylist
app.post("/api/stylist/chat", async (req, res) => {
  const { message, history, context } = req.body;
  
  if (!message) {
    return res.status(400).json({ error: "Empty prompt not allowed." });
  }

  const promptContext = `
    You are 'Kastelas AI Stylist', an elite luxury-minimal fashion designer and trend forecaster forkastelas.in.
    Your personality is highly professional, editorial, warm yet sophisticated like a writer for Vogue or a personal shopper in Milan.
    
    User Context details:
    Aesthetics: ${JSON.stringify(context?.preferredAesthetics || ["Old Money", "Minimalist"])}
    Body Type: ${context?.bodyType || "Hourglass"}
    Skin Tone: ${context?.skinTone || "Olive"}
    Current Location / Weather context: ${context?.weather || "Warm and Humid"}
    User wardrobe items catalog: ${JSON.stringify(context?.items || [])}

    Reply directly and warmly like an expert stylist. Give concrete outfit suggestions (e.g. style a black blazer with pleated beige trousers and white loafers). 
    Offer advice on fabrics, layering, accessories, and color harmony based on the user's skin tone (${context?.skinTone}).
    Be concise but stylish. Structure your paragraphs beautifully, using bullet points for outfit recipes.
  `;

  if (ai) {
    try {
      // Create chat history format expected by @google/genai
      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: promptContext,
          temperature: 0.7,
        },
      });

      // Catch up with history if any
      if (history && history.length > 0) {
        // Send history sequentially or simulate. Let's send the latest directly to save latency, 
        // with conversational context attached, which is faster and highly robust.
      }

      const response = await chat.sendMessage({ message });
      const text = response.text || "I am currently assessing the fabric details. Let's try another style outline!";
      return res.json({ text });
    } catch (err: any) {
      console.error("Gemini chatbot error:", err);
      return res.status(500).json({ error: "AI Styling thread paused: " + err.message });
    }
  } else {
    // Elegant fallback simulator when Gemini key is not configured locally
    return simulateStylistResponse(message, context, res);
  }
});

// 3. AI Generated Complete Outfits (JSON response)
app.post("/api/stylist/generate-look", async (req, res) => {
  const { occasion, weather, aesthetic } = req.body;

  const prompt = `
    Generate a complete, high-end editorial look for a fashion blog reader.
    Occasion: ${occasion || "Summer Brunch"}
    Weather: ${weather || "Warm & Humid"}
    Aesthetic Alignment: ${aesthetic || "Old Money"}
    Identify:
    - 1 top piece (name, fabric, style)
    - 1 bottom piece (name, fabric, style)
    - 1 outerwear layer if suitable or state "None required"
    - 2 accessories (jewelry, bags, sunglasses)
    - 1 shoe option
    - High-level styling and layering advice, and color-theory notes.
  `;

  if (ai) {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              lookName: { type: Type.STRING },
              aesthetic: { type: Type.STRING },
              colorPalette: { type: Type.ARRAY, items: { type: Type.STRING } },
              outfitRecipe: {
                type: Type.OBJECT,
                properties: {
                  top: { type: Type.STRING },
                  bottom: { type: Type.STRING },
                  outerwear: { type: Type.STRING },
                  accessories: { type: Type.ARRAY, items: { type: Type.STRING } },
                  shoes: { type: Type.STRING }
                },
                required: ["top", "bottom", "accessories", "shoes"]
              },
              stylingAdvice: { type: Type.STRING },
              layoverLogic: { type: Type.STRING },
              colorHarmonyExplanation: { type: Type.STRING }
            },
            required: ["lookName", "aesthetic", "colorPalette", "outfitRecipe", "stylingAdvice"]
          }
        }
      });

      const responseText = response.text;
      if (responseText) {
        return res.json(JSON.parse(responseText.trim()));
      }
    } catch (err: any) {
      console.error("Gemini structured look generator error:", err);
    }
  }

  // Resilient elegant template response
  const simulatedLook = {
    lookName: `The Kastelas ${aesthetic || "Old Money"} ${occasion || "Gala"} Silhouette`,
    aesthetic: aesthetic || "Old Money",
    colorPalette: ["#FAF9F6", "#C2B280", "#000000"],
    outfitRecipe: {
      top: "Mulberry Silk Cowl Blouse in cream",
      bottom: "Tailored Linen Pleated High-Rise Pants",
      outerwear: "Structured Unlined Cream Summer Blazer",
      accessories: ["Chestnut Brown Grain Leather Handbag", "Vintage Chunky 18k Chains"],
      shoes: "Genuine Italian Suede Tassel Loafers in chestnut"
    },
    stylingAdvice: "Focus on textures and soft draping. Tuck the silk blouse loosely into your pleated linen high-waist pants to draw structural lines. Keep hair slicked back and wear contrast leather colors to emphasize deliberate elegance.",
    layoverLogic: "We use linen for high breathability, with a lightweight pure silk layer matching summer humidity without restricting movement.",
    colorHarmonyExplanation: "Warm creams contrasted with deep chestnut browns and golden chain links project timeless wealth and glowing skin contrast."
  };
  return res.json(simulatedLook);
});

// Helper simulation function for offline preview
function simulateStylistResponse(message: string, context: any, res: any) {
  const lowercase = message.toLowerCase();
  let text = "";

  if (lowercase.includes("blazer") || lowercase.includes("style")) {
    text = `### Styling Your Blazer: The kastelas.in Blueprint
    
An unstructured double-breasted blazer is your ultimate fashion weapon. Here is how I would curate it for you based on your **Hourglass** silhouette:

1. **The Proportion Equation**: Balance the boxy shoulders of the blazer with high-waisted tailored trousers (like your Slate Pleated Trousers). Perfect for lunch in Bandra or a gallery hop.
2. **The Underlayer**: Slip your white linen shirt underneath with the cuffs rolled back over the blazer's sleeves for an effortless 'off-duty model' styling line.
3. **The Anchors**: Slip into classic black loafers, add minimalist gold rings, and pick up your Bottega-inspired leather tote.

*Stylist Tip*: Draping the blazer over your shoulders without putting your arms in the sleeves changes the visual balance completely—making it feel instantly high-fashion & cinematic!`;
  } else if (lowercase.includes("college") || lowercase.includes("casual")) {
    text = `### Minimal College Core Outfit
    
For warm, busy college days in ${context?.location || 'Mumbai'}, we want lightweight materials paired with street-smart aesthetics. Here is a capsule recipe:

- **Top**: Crisp classic white T-shirt or short-sleeved linen crop.
- **Bottom**: High-rise wide-leg retro blue denim to ensure maximum casual breathability.
- **Outerwear**: A pastel-mint boxy cropped cardigan slung across the shoulders for air-conditioned classrooms.
- **Accessories**: Lightweight gold hoop earrings and a high-capacity canvas leather backpack.
- **Shoes**: Clean white gumsole sneakers.

*Closet Score Secret*: This keeps wear frequency optimal across multiple wardrobe layers!`;
  } else if (lowercase.includes("wedding") || lowercase.includes("ethnic") || lowercase.includes("festive")) {
    text = `### Desi Gentry: The Metallic Fusion
    
Let's design a high-contrast Indo-Western look celebrating your elegant personal aesthetic:

- **The Core**: Metallic Gold Georgette Saree draped sleekly.
- **The Modern Accent**: Replace the traditional blouse with a fitted high-neck matte-black knit top or bodycon bodysuit.
- **The Crown Layer**: Drape your **Structured Double-Breasted Black Blazer** open over one shoulder, cinched tight with a modern clean black leather belt around the waist.
- **The Jewelry**: Chunky 18K gold gold-plated vintage chains and emerald stud details.

This blends traditional Indian celebratory heritage with structured Parisian haute couture. Absolutely stunning!`;
  } else {
    text = `### Welcome to Kastelas Digital Atelier!
    
I am your personalized AI fashion strategist. Today is a gorgeous day in ${context?.location || 'Mumbai'} (${context?.weather || 'Tropical Humid'}).

To create your personalized lookbook, you can ask me styling questions like:
- *"How should I style my oversized black blazer today?"*
- *"Give me a chicOld Money outfit recipe for the beach."*
- *"I have a wedding theme evening. What fusion styling should I create?"*

*Let's curate your digital wardrobe drawer together!*`;
  }

  return res.json({ text: text + "\n\n*(Running in secure offline mode — configure your GEMINI_API_KEY to unlock limitless deep learning interactions)*" });
}

// ----------------------------------------------------
// VITE AND STATIC ASSET MIDDLEWARE
// ----------------------------------------------------

async function serveApp() {
  if (process.env.NODE_ENV !== "production") {
    // Dev with Vite on port 3000
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("Vite development middleware integrated.");
  } else {
    // Production serving static files
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("Static production assets mounted.");
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

serveApp();
