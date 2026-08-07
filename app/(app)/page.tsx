import { AboutSection } from "./_components/home/about-section";
import { BlogSection } from "./_components/home/blog-section";
import { ContactSection } from "./_components/home/contact-section";
import { ExperienceSection } from "./_components/home/experience-section";
import { loadPortfolioData } from "./_components/home/helpers";
import { HeroSection } from "./_components/home/hero-section";
import { ProjectsSection } from "./_components/home/projects-section";
import { StackSection } from "./_components/home/stack-section";
import { TrustedBySection } from "./_components/home/trusted-by-section";
import { TestimonialsSection } from "./_components/home/testimonials-section";
export const metadata = {
  title: "Marcus Nguyen | Software Engineer",
  description: "Marcus Nguyen's portfolio showcasing his software engineering work.",
};
export default async function HomePage() {
  const { profile, experiences, skills, projects, posts, testimonials } = await loadPortfolioData();
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto min-h-dvh w-full max-w-310 bg-background px-3 sm:px-5 lg:px-8">
        <div className="relative mx-auto min-h-dvh w-full max-w-230 border-x px-4 sm:px-8 lg:px-12">
          <HeroSection profile={profile} /> <TrustedBySection experiences={experiences} />
          <AboutSection profile={profile} />
          <StackSection skills={skills} />
          <ExperienceSection experiences={experiences} /> <ProjectsSection projects={projects} />
          <TestimonialsSection testimonials={testimonials} /> <BlogSection posts={posts} />
          <ContactSection profile={profile} />
        </div>
      </div>
    </main>
  );
}
