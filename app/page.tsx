// /app/dashboard/page.tsx

import DashboardHeader from "@/components/Header";
import StatCard from "@/components/StatCard";
import RecentPractice from "@/components/RecentPractice";
import RecommendedPractice from "@/components/RecomendedPractice";
import SectionTitle from "@/components/SectionTitle";
import Navbar from "@/components/Navbar";
import { BackgroundRippleEffect } from "@/components/ui/background-ripple-effect";
import PixelBlast from "@/components/PixelBlast";
import Hero from "@/components/Hero";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import Dither from "@/components/Dither";
import { Calendar, Star } from "lucide-react";
import Button from "@/components/Button";
import InterviewSection from "@/components/InterviewSection";
import { Spotlight } from "@/components/ui/spotlight-new";

export default function DashboardPage() {
  return (
    <div className="min-h-screen pb-20 w-full relative overflow-hidden">
      <BackgroundRippleEffect cols={54} rows={64} cellSize={112} />
      <div className="absolute inset-0 "><Spotlight/></div>
      <div className="container mx-auto px-2">
        <Navbar />
        <Hero />
        <InterviewSection/>
      </div>
    </div>
  );
}
