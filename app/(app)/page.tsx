import BlogsSection from "../pages/home/BlogsSection";
import ContactSection from "../pages/home/ContactSection";
import ExperienceSection from "../pages/home/ExperienceSection";
import { HeroSection } from "../pages/home/HeroSection";
import ProjectsSection from "../pages/home/ProjectsSection";
import SkillsSection from "../pages/home/SkillsSection";

export default function Home() {
  return (
    <div className="relative">
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <SkillsSection />
      <BlogsSection />
      <ContactSection />
    </div>
  );
}
