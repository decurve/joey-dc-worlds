import { Nav } from "@/components/shared/Nav";
import { Footer } from "@/components/shared/Footer";
import { HomeHero } from "@/components/home/HomeHero";
import { SocialProofBar } from "@/components/home/SocialProofBar";
import { PhilosophyTease } from "@/components/home/PhilosophyTease";
import { ProgramsGrid } from "@/components/home/ProgramsGrid";
import { Differentiators } from "@/components/home/Differentiators";
import { LearnSection } from "@/components/home/LearnSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";
import { HOME_NAV_LINKS } from "@/lib/constants";

export default function Home() {
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <Nav brand="DEMAND CURVE" links={HOME_NAV_LINKS} mode="dark" />
      <main>
        <HomeHero />
        <SocialProofBar />
        <PhilosophyTease />
        <ProgramsGrid />
        <Differentiators />
        <LearnSection />
        <NewsletterSection />
      </main>
      <Footer mode="dark" />
    </div>
  );
}
