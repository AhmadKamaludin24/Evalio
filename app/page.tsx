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
import {TakeInterviewSection, InterviewSection} from "@/components/InterviewSection";
import { Spotlight } from "@/components/ui/spotlight-new";
import { getCurrentUser } from "@/lib/auth.action";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  return (
    <div className="min-h-screen pb-20 w-full relative overflow-hidden">
        <BackgroundRippleEffect cols={54} rows={64} cellSize={112} />

        <Spotlight />
      
      <div className="container z-30 mx-auto px-2">
        <Navbar name={user?.name} />
        <Hero />
        <InterviewSection user={user}/>
      
      </div>
    </div>
  );
}
