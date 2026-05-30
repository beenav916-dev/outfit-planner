/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { WardrobeItem, BlogPost, TrendPin, StylePoll, UserStats, UserProfile } from "./types";

// Premium curated fashion images
export const curatingImages = {
  // Tops
  linenShirt: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop&q=80", // White Linen Shirt
  blackTee: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=80", // Premium Black Cotton Tee
  silkBlouse: "https://images.unsplash.com/photo-1548624149-f140c6a57551?w=500&auto=format&fit=crop&q=80", // Ivory Silk Blouse
  cropKnit: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&auto=format&fit=crop&q=80", // Knit Sweaters

  // Bottoms
  pleatedTrousers: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&auto=format&fit=crop&q=80", // Beige Pleated Trousers
  wideJeans: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop&q=80", // Raw Edge Denim
  silkSkirt: "https://images.unsplash.com/photo-1582142306909-195724d33ab5?w=500&auto=format&fit=crop&q=80", // Satin Midi Skirt

  // Jackets & Outerwear
  camelCoat: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=80", // Premium Trench Coat
  oversizedBlazer: "https://images.unsplash.com/photo-1548624149-f140c6a57551?w=500&auto=format&fit=crop&q=80", // Black Structured Blazer
  leatherJacket: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&auto=format&fit=crop&q=80", // Vintage Moto Leather

  // Shoes
  leatherLoafers: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=500&auto=format&fit=crop&q=80", // Classic Black Loafers
  retroSneakers: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=80", // Clean White Sneakers
  strapHeels: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&auto=format&fit=crop&q=80", // Suede Black Strappy Heels

  // Accessories
  chunkyGoldNecklace: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&auto=format&fit=crop&q=80", // Luxury Chains
  leatherTote: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop&q=80", // Minimal Leather Tote
  oversizedSunnies: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&auto=format&fit=crop&q=80", // Tortoise Shell Sunglasses

  // Ethnic Wear
  modernAnarkali: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=80", // Indowestern Tunic
  silkSaree: "https://images.unsplash.com/photo-1610030470298-408a11e138a0?w=500&auto=format&fit=crop&q=80" // Modern Metallic Georgette Saree
};

export const INITIAL_WARDROBE: WardrobeItem[] = [
  {
    id: "w1",
    name: "Classic Beige Camel Trench Coat",
    category: "Jackets",
    imageUrl: curatingImages.camelCoat,
    colors: ["#C2B280", "#E1D9D1"],
    style: "Old Money",
    occasion: ["Classic Workwear", "Formal Dinner", "Travel"],
    weatherSuitable: ["Cold", "Mild"],
    wearCount: 18,
    lastWorn: "2026-05-15",
    purchaseDate: "2025-10-12",
    price: 349,
    brand: "ZARA Studio",
    isFavorite: true
  },
  {
    id: "w2",
    name: "Pleated High-Waisted Tailored Slate Trousers",
    category: "Bottoms",
    imageUrl: curatingImages.pleatedTrousers,
    colors: ["#708090", "#8F9E8B"],
    style: "Minimalist",
    occasion: ["Office", "Casual Brunch", "Elegant Evening"],
    weatherSuitable: ["Mild", "Hot", "Cold"],
    wearCount: 29,
    lastWorn: "2026-05-27",
    purchaseDate: "2025-11-05",
    price: 120,
    brand: "kastelas.in Label",
    isFavorite: true
  },
  {
    id: "w3",
    name: "Oversized Structured Double-Breasted Black Blazer",
    category: "Jackets",
    imageUrl: curatingImages.oversizedBlazer,
    colors: ["#000000"],
    style: "Luxury Fashion",
    occasion: ["Met Gala", "Night Out", "Business Formal"],
    weatherSuitable: ["Mild", "Cold"],
    wearCount: 32,
    lastWorn: "2026-05-24",
    purchaseDate: "2025-08-20",
    price: 195,
    brand: "Vogue Premium",
    isFavorite: true
  },
  {
    id: "w4",
    name: "Relaxed White Organic Linen Resort Shirt",
    category: "Tops",
    imageUrl: curatingImages.linenShirt,
    colors: ["#FFFFFF"],
    style: "Casual Chic",
    occasion: ["Beachside", "Summer Brunch", "Weekend Hangouts"],
    weatherSuitable: ["Hot", "Mild"],
    wearCount: 42,
    lastWorn: "2026-05-26",
    purchaseDate: "2025-05-10",
    price: 75,
    brand: "H&M Premium Selection",
    isFavorite: false
  },
  {
    id: "w5",
    name: "Sleek Matte Calfskin Leather Loafers",
    category: "Shoes",
    imageUrl: curatingImages.leatherLoafers,
    colors: ["#000000", "#1E1E24"],
    style: "Old Money",
    occasion: ["Daily Commute", "Gallery Opening", "Office"],
    weatherSuitable: ["Mild", "Cold", "Hot"],
    wearCount: 51,
    lastWorn: "2026-05-25",
    purchaseDate: "2024-09-01",
    price: 210,
    brand: "Kastelas Tailored",
    isFavorite: true
  },
  {
    id: "w6",
    name: "Ivory Heavy Mulberry Silk Cowl Blouse",
    category: "Tops",
    imageUrl: curatingImages.silkBlouse,
    colors: ["#FFFFF0", "#EAE6DF"],
    style: "Korean Fashion",
    occasion: ["Dinner Date", "Cocktail Hour", "Fashion Week"],
    weatherSuitable: ["Hot", "Mild"],
    wearCount: 6,
    lastWorn: "2026-05-18",
    purchaseDate: "2026-03-22",
    price: 145,
    brand: "Zara Woman",
    isFavorite: false
  },
  {
    id: "w7",
    name: "Vintage Distressed Indigo Raw Denim Wide-Leg",
    category: "Bottoms",
    imageUrl: curatingImages.wideJeans,
    colors: ["#3F51B5", "#2C3E50"],
    style: "Y2K",
    occasion: ["Concert", "Street Cafe", "Casual Travel"],
    weatherSuitable: ["Mild", "Cold", "Rainy"],
    wearCount: 47,
    lastWorn: "2026-05-22",
    purchaseDate: "2024-12-15",
    price: 90,
    brand: "Levi's Curated",
    isFavorite: false
  },
  {
    id: "w8",
    name: "Retro Cream-White Suede Gumsole Sneakers",
    category: "Shoes",
    imageUrl: curatingImages.retroSneakers,
    colors: ["#F5F5DC", "#FFFFFF"],
    style: "Streetwear",
    occasion: ["Travel", "Running Errals", "Street Chic"],
    weatherSuitable: ["Mild", "Hot", "Rainy"],
    wearCount: 78,
    lastWorn: "2026-05-28",
    purchaseDate: "2024-05-01",
    price: 110,
    brand: "Adidas Premium",
    isFavorite: true
  },
  {
    id: "w9",
    name: "Handmade Premium Soft Leather City Tote",
    category: "Bags",
    imageUrl: curatingImages.leatherTote,
    colors: ["#3E2723", "#A52A2A"],
    style: "Luxury Fashion",
    occasion: ["Office", "Flight Cabin", "Shopping"],
    weatherSuitable: ["Mild", "Hot", "Cold", "Rainy"],
    wearCount: 104,
    lastWorn: "2026-05-28",
    purchaseDate: "2023-11-20",
    price: 490,
    brand: "Bottega Inspired",
    isFavorite: true
  },
  {
    id: "w10",
    name: "Chunky 18K Gold Plated Vintage Chain Necklace",
    category: "Accessories",
    imageUrl: curatingImages.chunkyGoldNecklace,
    colors: ["#FFD700"],
    style: "Old Money",
    occasion: ["Everyday styling", "Party night", "Brunch"],
    weatherSuitable: ["Mild", "Hot", "Cold", "Rainy"],
    wearCount: 140,
    lastWorn: "2026-05-28",
    purchaseDate: "2024-04-18",
    price: 85,
    brand: "Kastelas Curated Jewel",
    isFavorite: true
  }
];

export const INITIAL_KASTELAS_BLOGS: BlogPost[] = [
  {
    id: "b1",
    title: "10 Timeless Old Money Wardrobe Investments for Summer 2026",
    slug: "old-money-summer-wardrobe-investments",
    excerpt: "Break away from microtrends. Discover the classic, clean, linen and neutral pairings that convey high-society status with modern comfort.",
    readTime: "5 min read",
    coverImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80",
    publishedAt: "May 25, 2026",
    author: {
      name: "Radhika K.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      role: "Editor-in-Chief, kastelas.in"
    },
    tags: ["Old Money", "Capsule", "Editorial", "Summer Trends"],
    content: `
      The 'Old Money' aesthetic has matured into something far grander than a transit TikTok trend. It's a statement about architectural minimalism, durable silks, relaxed heavy organic linen, and tailored tailoring. 
      
      At **kastelas.in**, we believe luxury is in the silhouette and material. Here's our definitive list of investments:
      
      1. **Heavyweight Neutral Pleated Trousers**: They flow effortlessly down and elongate the legs. Pair with structured loafers to highlight modern polish.
      2. **Silk Cowl-Neck Blouses**: Provide subtle light refraction under outdoor sunshine.
      3. **Unstructured Double-Breasted Blazers** in soft ivory or warm sand.
      
      ### Recreate this Look:
      Simply click the "AI Recreate Look" button below to map our suggested outfit pieces dynamically into your own digital wardrobe drawer categories!
    `,
    shoppableItems: [
      {
        id: "shop-1",
        brand: "kastelas.in Collection",
        name: "Linen Pleated Drape Pants",
        price: "Rs. 4,999",
        link: "https://kastelas.in/shop/linen-pleated",
        imageUrl: curatingImages.pleatedTrousers
      },
      {
        id: "shop-2",
        brand: "Zara Woman",
        name: "Satin Finish Drapey Blazer",
        price: "Rs. 7,490",
        link: "https://zara.com/woman/blazer",
        imageUrl: curatingImages.oversizedBlazer
      }
    ]
  },
  {
    id: "b2",
    title: "The Ultimate Korean Fashion Cheatcode: Proportions, Pastels, and Platinum Knits",
    slug: "korean-fashion-proportions-pastels",
    excerpt: "Seoul streetwear is taking over. Learn how the boxy-top paired with slender cropped trouser layout creates instantaneous editorial synergy.",
    readTime: "4 min read",
    coverImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&auto=format&fit=crop&q=80",
    publishedAt: "May 20, 2026",
    author: {
      name: "Siddharth Verma",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
      role: "Lead Fashion Tech Stylist"
    },
    tags: ["Korean Fashion", "Seoul Streetwear", "Boxy Crop"],
    content: `
      Proportional geometry is the baseline equation of modern Korean fashion. Contrast oversized outerwear coats with slender denim crops, or boxy textured knits with floaty silk skirts.
      
      Keep color palettes restricted to ice-blue, cream, charcoal, and warm clay for that curated, high-end editorial contrast. Adding a simple Bottega-inspired tote is your final premium layer.
    `,
    shoppableItems: [
      {
        id: "shop-3",
        brand: "H&M Premium Selection",
        name: "Lycra Blend Boxy Knit Cardigan",
        price: "Rs. 3,299",
        link: "https://hm.com",
        imageUrl: curatingImages.cropKnit
      }
    ]
  },
  {
    id: "b3",
    title: "Indo-Western Fusion: The Metallic Saree Overlay",
    slug: "indowestern-metallic-saree-fusion",
    excerpt: "Ditch traditional styling rules. Our runway guides show how to style metallic georgette sarees with a structured double-breasted tuxedo black blazer.",
    readTime: "6 min read",
    coverImage: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80",
    publishedAt: "May 14, 2026",
    author: {
      name: "Radhika K.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
      role: "Editor-in-Chief, kastelas.in"
    },
    tags: ["Ethnic Wear", "Fusion Outfit", "Blazer Glamour", "Trend Alert"],
    content: `
      Fusion wear is where high art meets deep cultural roots. Layer a classic metallic gold georgette ethnic saree over high-rise leather leggings or pleated trousers, topped off with a sharp black structured dinner blazer.
      
      This architectural visual breaks the traditional silhouette in favor of a bold, futuristic style line suitable for everything from celebrity art openings to upscale wedding parties.
    `,
    shoppableItems: [
      {
        id: "shop-4",
        brand: "Sabyasachi Bridal & Couture",
        name: "Gold-Weave Modern Saree Blend",
        price: "Rs. 45,000",
        link: "https://sabyasachi.com",
        imageUrl: curatingImages.silkSaree
      },
      {
        id: "shop-5",
        brand: "Kastelas Premium Black Blazer",
        name: "Double Breasted Velvet Tux Jacket",
        price: "Rs. 12,999",
        link: "https://kastelas.in/velvet-blazer",
        imageUrl: curatingImages.oversizedBlazer
      }
    ]
  }
];

export const INITIAL_TREND_FEED: TrendPin[] = [
  {
    id: "p1",
    title: "Off-Duty Model: Beige Trench & High-Rise Slacks",
    imageUrl: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=700&auto=format&fit=crop&q=80",
    creator: {
      name: "Alisha Sen",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
      isVerified: true,
      followers: "124K"
    },
    aesthetic: "Old Money",
    likes: 1240,
    saves: 452,
    comments: 48,
    hasLiked: false,
    hasSaved: false,
    description: "An understated luxury pairing utilizing negative space. Vintage heavy beige trench coupled with high rise wide-leg linen pants, chunky sneakers and black Bottega sunglasses. Captured in London.",
    linkedOutfits: ["w1", "w2", "w8", "w10"]
  },
  {
    id: "p2",
    title: "Seoul Café Core: Boxy Knits and Silk Movement",
    imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&auto=format&fit=crop&q=80",
    creator: {
      name: "Nico Shin",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80",
      isVerified: false,
      followers: "18.5K"
    },
    aesthetic: "Korean Fashion",
    likes: 832,
    saves: 320,
    comments: 14,
    hasLiked: false,
    hasSaved: false,
    description: "Cozy proportions with flowy movement. Ice-blue oversized mohair crewneck knit tucked lightly into an ivory silk midi skirt. Anchored by heavy black combat boots.",
    linkedOutfits: ["w6", "w5"]
  },
  {
    id: "p3",
    title: "Brooklyn Cargo Streetwear: Heavy Utility Layering",
    imageUrl: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700&auto=format&fit=crop&q=80",
    creator: {
      name: "Devon Carter",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
      isVerified: true,
      followers: "310K"
    },
    aesthetic: "Streetwear",
    likes: 4920,
    saves: 2190,
    comments: 112,
    hasLiked: true,
    hasSaved: true,
    description: "Multi-pocket heavy cotton cargo slate pants paired with cropped ribbed black tank, vintage high-top leather sneakers, and an oversized racing varsity jacket.",
    linkedOutfits: ["w7", "w8"]
  },
  {
    id: "p4",
    title: "Old Money Yacht Brunch: Tailored Luxury",
    imageUrl: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=700&auto=format&fit=crop&q=80",
    creator: {
      name: "Zara Mehra",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80",
      isVerified: true,
      followers: "45K"
    },
    aesthetic: "Minimalist",
    likes: 1910,
    saves: 710,
    comments: 29,
    hasLiked: false,
    hasSaved: false,
    description: "Understated elegance. Crisp white organic heavy linen shirt styled open with striped silk trousers, leather loafers, and gold watches.",
    linkedOutfits: ["w4", "w5", "w10"]
  }
];

export const STYLE_POLLS_DATA: StylePoll[] = [
  {
    id: "poll1",
    question: "How should we style our brand-new Kastelas Linen High-Waisted Slacks?",
    optionA: {
      text: "Old Money Silk Blazer & Loafers",
      votes: 342,
      imageUrl: curatingImages.oversizedBlazer
    },
    optionB: {
      text: "Streetwear Crop Knit & Suede Sneakers",
      votes: 216,
      imageUrl: curatingImages.cropKnit
    },
    totalVotes: 558,
    endsIn: "18h left"
  },
  {
    id: "poll2",
    question: "Which aesthetic rules the summer brunch moodboard?",
    optionA: {
      text: "Minimalist Linen Ivory",
      votes: 890,
      imageUrl: curatingImages.linenShirt
    },
    optionB: {
      text: "IndoWestern Fusion Crop Saree",
      votes: 1120,
      imageUrl: curatingImages.silkSaree
    },
    totalVotes: 2010,
    endsIn: "2 days left"
  }
];

export const CuratedAestheticsInfo = {
  "Streetwear": {
    heading: "Streetwear Culture",
    palette: ["#1A1A1A", "#64748B", "#F1F5F9", "#DC2626"],
    desc: "Bold proportions, heavy utility layering, oversized statement graphics, and retro sneakers. Inspired by youth subcultures of Tokyo and Brooklyn.",
    scoreImprovement: "Provides urban relevance and active wear rate utility."
  },
  "Old Money": {
    heading: "Quiet Luxury / Gentry Heritage",
    palette: ["#C2B280", "#1E3A8A", "#FFFFFF", "#2F4F4F"],
    desc: "Timeless tailoring, organic fiber linens, understated neutral layers, high-end calfskin loafers, and zero loud logos. Inspired by European coastal estates.",
    scoreImprovement: "Maximizes closet life value due to zero trend decay rate."
  },
  "Korean Fashion": {
    heading: "Seoul Café Minimalist",
    palette: ["#EADAC2", "#7CCD7C", "#708090", "#4A3B32"],
    desc: "Aesthetic pastel sweaters, oversized blazers over slim ankle crops, flowy silks, and minimalist platforms. Combining soft comfort with cute structure.",
    scoreImprovement: "Enables elegant office-to-brunch style versatility."
  },
  "Casual Chic": {
    heading: "Laidback Editorial Style",
    palette: ["#000000", "#FFFFFF", "#D2B48C", "#4682B4"],
    desc: "Effortless high-low styling. Classic dark denim matched with silk drapes, premium white tees under premium trenchcoats, and elegant minimal jewelry.",
    scoreImprovement: "Excellent for rapid outfits transition cycles."
  },
  "Y2K": {
    heading: "Cyber Retro Futurist",
    palette: ["#FF69B4", "#40E0D0", "#3E3E3E", "#D8BFD8"],
    desc: "Loud baby tees, distressed wide-leg jeans, silver metallic hardware, tinted shades, and tech sportswear. Reviving late 90s cyberculture.",
    scoreImprovement: "Adds high-energy character options for dynamic events."
  },
  "Minimalist": {
    heading: "Zen White and Charcoal Space",
    palette: ["#000000", "#FFFFFF", "#808080", "#F5F5DC"],
    desc: "Strict 'less is grander' curation. Clean lines, monochromatic colorways, high quality organic stitching, and multipurpose capsule layers.",
    scoreImprovement: "The absolute baseline foundation of your closet score."
  },
  "Luxury Fashion": {
    heading: "Haute Couture Avant-Garde",
    palette: ["#000000", "#FFD700", "#800020", "#333333"],
    desc: "High drama silhouettes, sculptural blazers, bottega leather shapes, statement gold, and premium fabrics built to dominate visual spaces.",
    scoreImprovement: "Drives critical fashion scores up for elite VIP events."
  },
  "Ethnic Wear": {
    heading: "Desi Fusion Gentry",
    palette: ["#800080", "#E0115F", "#FF8C00", "#E6C229"],
    desc: "Traditional rich cotton weaves, modern indowestern metallic saree overlays, handcrafted prints, styled cleanly with luxury blazers or boots.",
    scoreImprovement: "Essential for festive-heritage and social statement weeks."
  }
};

export const INITIAL_USER_STATS: UserStats = {
  points: 1450,
  streak: 8,
  closetScore: 84,
  badges: [
    {
      id: "badge1",
      name: "Capsule Curator",
      icon: "Sparkles",
      description: "Successfully built a travel Packing list with less than 12 versatile garments.",
      unlockedAt: "May 10, 2026"
    },
    {
      id: "badge2",
      name: "Stylist Visionary",
      icon: "Award",
      description: "Received a 95%+ Style Score feedback rating from AI analysis of an ethnic fusion outfit.",
      unlockedAt: "May 22, 2026"
    },
    {
      id: "badge3",
      name: "Old Money Connoisseur",
      icon: "Gem",
      description: "Maintained a 7-day streak organizing neutral tailored linens.",
      unlockedAt: "May 27, 2026"
    }
  ],
  challengeParticipation: [
    {
      id: "c1",
      title: "1-Item styled 3 ways",
      status: "active",
      expiry: "1 day left"
    },
    {
      id: "c2",
      title: "Monochrome Minimalist Wedding Guest",
      status: "joined",
      expiry: "4 days left"
    },
    {
      id: "c3",
      title: "The Zero-Purchase Eco Wardrobe Week",
      status: "completed",
      expiry: "Ended"
    }
  ]
};

export const CuratedUserProfile: UserProfile = {
  name: "Sneha kastela",
  email: "sneha@kastelas.in",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
  preferredAesthetics: ["Old Money", "Minimalist", "Casual Chic", "Ethnic Wear"],
  bodyType: "Hourglass",
  skinTone: "Olive",
  location: "Mumbai, India",
  premiumStatus: "VIP Stylist",
  metrics: {
    height: "168 cm",
    size: "S / UK 8"
  }
};
