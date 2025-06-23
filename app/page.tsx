import ScrollingBanner from "./animation/ScrollingBanner";
import ExperienceSection from "./pages/home/ExperienceSection";
import { HeroSection } from "./pages/home/HeroSection";
import Skills from "./pages/home/Skills";

export default async function Home() {
  return (
    <main>
      <div className="max-w-7xl mx-auto md:px-16 px-6">
        <HeroSection />
      </div>

      <ScrollingBanner baseVelocity={-100} key={"experience"}>
        Experience
      </ScrollingBanner>

      <ExperienceSection />

      <ScrollingBanner baseVelocity={-100} key={"skills"}>
        Skills
      </ScrollingBanner>

      <Skills />
    </main>
  );
}
