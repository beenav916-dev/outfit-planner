/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type FashionAesthetic =
  | "Streetwear"
  | "Old Money"
  | "Korean Fashion"
  | "Casual Chic"
  | "Y2K"
  | "Minimalist"
  | "Luxury Fashion"
  | "Ethnic Wear";

export type ClothingCategory =
  | "Tops"
  | "Bottoms"
  | "Shoes"
  | "Accessories"
  | "Jackets"
  | "Bags"
  | "Ethnic Wear";

export interface WardrobeItem {
  id: string;
  name: string;
  category: ClothingCategory;
  imageUrl: string;
  colors: string[];
  style: FashionAesthetic;
  occasion: string[];
  weatherSuitable: string[]; // "Hot", "Cold", "Rainy", "Mild"
  wearCount: number;
  lastWorn?: string;
  purchaseDate?: string;
  price?: number;
  brand?: string;
  isFavorite: boolean;
}

export interface ScheduledOutfit {
  id: string;
  date: string; // YYYY-MM-DD
  timeOfDay: "Morning" | "Afternoon" | "Evening";
  itemIds: string[];
  occasion: string;
  mood?: string;
  aesthetic: FashionAesthetic;
  weatherNotes?: string;
  isDraft: boolean;
  notes?: string;
}

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  createdAt: string;
  suggestedItems?: WardrobeItem[];
  meta?: {
    aesthetic?: FashionAesthetic;
    weather?: string;
    bodyAnalysis?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  publishedAt: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  tags: string[];
  shoppableItems: {
    id: string;
    brand: string;
    name: string;
    price: string;
    link: string;
    imageUrl: string;
  }[];
}

export interface TrendPin {
  id: string;
  title: string;
  imageUrl: string;
  creator: {
    name: string;
    avatar: string;
    isVerified: boolean;
    followers: string;
  };
  aesthetic: FashionAesthetic;
  likes: number;
  saves: number;
  comments: number;
  hasLiked?: boolean;
  hasSaved?: boolean;
  linkedOutfits?: string[];
  description: string;
}

export interface StylePoll {
  id: string;
  question: string;
  optionA: { text: string; votes: number; imageUrl: string };
  optionB: { text: string; votes: number; imageUrl: string };
  userVoted?: "A" | "B";
  totalVotes: number;
  endsIn: string;
}

export interface UserStats {
  points: number;
  streak: number;
  closetScore: number; // 0-100 rating based on wardrobe diversity and wear rates
  badges: {
    id: string;
    name: string;
    icon: string;
    description: string;
    unlockedAt: string;
  }[];
  challengeParticipation: {
    id: string;
    title: string;
    status: "active" | "completed" | "joined";
    expiry: string;
  }[];
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  preferredAesthetics: FashionAesthetic[];
  bodyType?: "Hourglass" | "Rectangle" | "Pear" | "Inverted Triangle" | "Oval";
  skinTone?: "Fair" | "Light" | "Medium" | "Olive" | "Tan" | "Deep";
  location: string;
  premiumStatus: "Free" | "VIP Stylist" | "Brand Ambassador";
  metrics: {
    height?: string;
    size?: string;
  };
}
