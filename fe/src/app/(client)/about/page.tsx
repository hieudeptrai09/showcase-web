"use client";

import { shopInfo } from "@/lib/shopInfo";
import { useScrollAnimation } from "./_hooks/useScrollAnimation";
import HeroSection from "./_components/HeroSection";
import FullWidthImage from "./_components/FullWidthImage";
import StorySection from "./_components/StorySection";
import ValuesSection from "./_components/ValueSection";
import MissionVisionSection from "./_components/MissionVisionSection";
import StatsSection from "./_components/StatsSection";

export default function AboutPage() {
  const visibleSections = useScrollAnimation();

  return (
    <div className="pb-12">
      <HeroSection tagline={shopInfo.tagline} />
      <FullWidthImage />

      <div className="container-custom">
        <StorySection visibleSections={visibleSections} />
        <ValuesSection visibleSections={visibleSections} />
        <MissionVisionSection visibleSections={visibleSections} />
        <StatsSection visibleSections={visibleSections} />
      </div>
    </div>
  );
}
