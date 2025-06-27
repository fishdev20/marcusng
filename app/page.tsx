import BlogsSection from "./pages/home/BlogsSection";
import { HeroSection } from "./pages/home/HeroSection";
import ProjectsSection from "./pages/home/ProjectsSection";
import SkillsSection from "./pages/home/SkillsSection";

export default async function Home() {
  return (
    <>
      <HeroSection />
      <ProjectsSection />
      <SkillsSection />
      <BlogsSection />
    </>
  );
}
