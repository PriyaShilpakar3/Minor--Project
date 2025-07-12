import { BotMessageSquare, BatteryCharging, Fingerprint, ShieldHalf, PlugZap, GlobeLock } from "lucide-react";

// Replace with your actual image imports
import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";

export const navItems = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
];

export const testimonials = [
  {
    user: "John Doe",
    company: "Stellar Solutions",
    image: user1,
    text: "This caption generator saved me hours of work! The AI understands exactly what my photos need.",
  },
  // Add other testimonials...
];

export const features = [
  {
    icon: <BotMessageSquare />,
    text: "AI-Powered Captions",
    description: "Get smart, context-aware captions generated instantly.",
  },
  // Add other features...
];

export const howItWorksSteps = [
  {
    title: "Upload Your Picture",
    description: "Drag & drop or select an image",
    emoji: "📤",
  },
  // Add other steps...
];

export const useCases = [
  {
    title: "Social Media Influencers",
    description: "Boost engagement with catchy captions",
    emoji: "📱",
    bgColor: "bg-pink-100",
  },
  // Add other use cases...
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  // Add other links...
];

export const platformLinks = [
  { href: "#", text: "Features" },
  // Add other links...
];

export const communityLinks = [
  { href: "#", text: "Instagram" },
  // Add other links...
];