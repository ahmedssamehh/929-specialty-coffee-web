import dynamic from 'next/dynamic';
import Hero from "@/components/hero/Hero";

// Lazy load all below-the-fold components for instant initial page load
const Philosophy = dynamic(() => import("@/components/home/Philosophy"));
const TheJourney = dynamic(() => import("@/components/home/TheJourney"));
const BeanCatcherGame = dynamic(() => import("@/components/home/BeanCatcherGame"));
const Collection = dynamic(() => import("@/components/home/Collection"));
const OriginExplorerPreview = dynamic(() => import("@/components/home/OriginExplorerPreview"));
const SpacesSection = dynamic(() => import("@/components/home/SpacesSection"));
const TheRitual = dynamic(() => import("@/components/home/TheRitual"));
const ExperiencesPreview = dynamic(() => import("@/components/home/ExperiencesPreview"));
const JournalPreview = dynamic(() => import("@/components/home/JournalPreview"));
const ClubSection = dynamic(() => import("@/components/home/ClubSection"));
const FinalCTA = dynamic(() => import("@/components/home/FinalCTA"));

export default function HomePage() {
  return (
    <>
      {/* 01 — The signature experience (Loaded instantly) */}
      <Hero />

      {/* 02 — Brand philosophy */}
      <Philosophy />

      {/* 03 — From origin to cup */}
      <TheJourney />

      {/* 05 — Arcade bean catcher game */}
      <BeanCatcherGame />

      {/* 06 — The menu collection */}
      <Collection />

      {/* 07 — Origin explorer teaser */}
      <OriginExplorerPreview />

      {/* 08 — The 929 spaces */}
      <SpacesSection />

      {/* 09 — Interactive rituals */}
      <TheRitual />

      {/* 10 — Experiences teaser */}
      <ExperiencesPreview />

      {/* 11 — Journal teaser */}
      <JournalPreview />

      {/* 12 — 929 Club concept */}
      <ClubSection />

      {/* 13 — Final call to action */}
      <FinalCTA />
    </>
  );
}
