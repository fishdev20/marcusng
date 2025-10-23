import CharacterFadeUpText from "@/app/components/animation/CharacterFadupText";
import { PixelImage } from "@/components/ui/pixel-image";
import { getProfile } from "@/sanity/lib/query";
import { ArrowRight, Building2, Earth, Github, Linkedin, Twitch, Twitter } from "lucide-react";
import Link from "next/link";

export async function HeroSection() {
  const profile = await getProfile();

  return (
    <section className="w-full h-full flex flex-col lg:flex-row justify-center md:justify-between gap-10 max-w-6xl mx-auto px-6 my-32">
      <div className="flex flex-1 flex-col text-left max-w-xl space-y-10 mt-0 md:mt-20">
        <div className="space-y-4 leading-[0.9]">
          <h1 className="font-extrabold leading-[0.9] tracking-tight">
            {/* Desktop / Tablet layout */}
            <span className="hidden sm:block text-5xl md:text-6xl lg:text-8xl uppercase">
              <span className="block">Software</span>
              <span className="flex items-center gap-3 ml-6 md:ml-12">Engineer.</span>
            </span>

            {/* Mobile layout */}
            <span className="block sm:hidden text-3xl font-bold normal-case">
              Software Engineer{" "}
              {profile.currentCompany && (
                <Link
                  href={profile.currentCompanyLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-blue-500 hover:underline"
                >
                  @{profile.currentCompany}
                </Link>
              )}
            </span>
          </h1>
        </div>

        <Link
          href={`mailto:${profile.email}`}
          className="inline-flex items-center gap-2 text-lg font-medium underline underline-offset-4 hover:no-underline transition"
        >
          Let&apos;s Talk
          <ArrowRight size={18} />
        </Link>
      </div>

      <div className="flex flex-col items-center lg:items-end lg:mt-0 w-full">
        <div className="max-w-md w-full">
          <div className="flex flex-row gap-4">
            {profile.profileImage?.url && <PixelImage src={profile.profileImage.url} />}

            <ul className="text-sm text-muted-foreground space-y-1 mt-4">
              <li>
                <Link href="#about" className="hover:text-neutral-800 dark:hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="#projects" className="hover:text-neutral-800 dark:hover:text-white">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#blog" className="hover:text-neutral-800 dark:hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-neutral-800 dark:hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="p-6 space-y-3">
            <h2 className="text-xl font-bold uppercase text-neutral-900 dark:text-white">
              <CharacterFadeUpText text={profile.fullName} stagger={0.04} delay={0.5} />
            </h2>

            {/* Bio */}
            <p className="text-sm text-neutral-600 dark:text-neutral-300">{profile.shortBio}</p>

            {/* Company & Location */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-muted-foreground pt-2">
              <div className="flex items-center gap-1">
                <Earth className="h-4 w-4 text-blue-500" />
                <span>{profile.location}</span>
              </div>

              {profile.currentCompany && (
                <Link
                  href={profile.currentCompanyLink || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline flex gap-1"
                >
                  <Building2 className="h-4 w-4" />
                  {profile.currentCompany}
                </Link>
              )}
            </div>

            <div className="flex items-center gap-4 pt-4">
              {profile.socialLinks?.github && (
                <Link
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </Link>
              )}
              {profile.socialLinks?.linkedin && (
                <Link
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              )}
              {profile.socialLinks?.twitter && (
                <Link
                  href={profile.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
              )}
              {profile.socialLinks?.twitch && (
                <Link
                  href={profile.socialLinks.twitch}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition"
                  aria-label="Twitch"
                >
                  <Twitch className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
