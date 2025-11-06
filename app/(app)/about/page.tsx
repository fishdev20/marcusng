import { PortableBlock } from "@/components/portable-text";
import SectionWrapper from "@/components/ui/section-wrapper";
import { getProfile } from "@/sanity/lib/query";
import {
  Download,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Twitch,
  Twitter,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function AboutPage() {
  const profile = await getProfile();

  if (!profile) {
    return (
      <SectionWrapper>
        <p className="text-center text-muted-foreground">Profile not found.</p>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper>
      <article className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-10">
          {profile.profileImage?.url && (
            <Image
              src={profile.profileImage.url}
              alt={profile.profileImage.alt || profile.fullName}
              width={180}
              height={180}
              className="rounded-xl object-cover shadow-lg"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold">{profile.fullName}</h1>
            {profile.headline && <p className="text-muted-foreground mt-1">{profile.headline}</p>}
            <p className="mt-2 text-sm">
              <Link
                href={profile.currentCompanyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {profile.currentCompany}
              </Link>
            </p>
            <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
              {profile.location && (
                <span className="flex items-center gap-1">
                  <MapPin size={16} /> {profile.location}
                </span>
              )}
              {profile.email && (
                <span className="flex items-center gap-1">
                  <Mail size={16} /> {profile.email}
                </span>
              )}
            </div>
            <div className="flex gap-3 mt-4">
              {profile.socialLinks?.github && (
                <Link href={profile.socialLinks.github} target="_blank" rel="noopener">
                  <Github className="h-5 w-5 hover:text-primary transition-colors" />
                </Link>
              )}
              {profile.socialLinks?.linkedin && (
                <Link href={profile.socialLinks.linkedin} target="_blank" rel="noopener">
                  <Linkedin className="h-5 w-5 hover:text-primary transition-colors" />
                </Link>
              )}
              {profile.socialLinks?.twitter && (
                <Link href={profile.socialLinks.twitter} target="_blank" rel="noopener">
                  <Twitter className="h-5 w-5 hover:text-primary transition-colors" />
                </Link>
              )}
              {profile.socialLinks?.twitch && (
                <Link href={profile.socialLinks.twitch} target="_blank" rel="noopener">
                  <Twitch className="h-5 w-5 hover:text-primary transition-colors" />
                </Link>
              )}
            </div>
          </div>
        </div>

        {profile.fullBio && (
          <div className="prose dark:prose-invert max-w-none mb-10">
            <PortableBlock value={profile.fullBio} />
          </div>
        )}

        {/* {profile.skills && profile.skills.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-sm bg-primary/10 rounded-full text-primary font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )} */}
        {profile.education && profile.education.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xl font-semibold mb-3 flex gap-2">
              <GraduationCap />
              Education
            </h2>
            <div className="space-y-4">
              {profile.education.map((edu, idx) => (
                <div
                  key={idx}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border rounded-lg p-4 bg-muted"
                >
                  {edu.logo?.url && (
                    <Image
                      src={edu.logo.url}
                      alt={edu.logo.alt || edu.school}
                      width={64}
                      height={64}
                      className="rounded-md object-contain bg-background p-1 shadow-sm"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{edu.school}</h3>
                    <p className="text-sm text-muted-foreground">
                      {edu.degree}
                      {edu.major && ` — ${edu.major}`}
                    </p>
                    <div className="flex items-center flex-wrap gap-3 text-sm text-muted-foreground mt-1">
                      {edu.years && <span>{edu.years}</span>}
                      {edu.location && (
                        <span className="flex items-center gap-1">
                          <MapPin size={14} /> {edu.location}
                        </span>
                      )}
                    </div>
                    {edu.details && <p className="text-sm mt-2 leading-relaxed">{edu.details}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {profile.resumeURL && (
          <Link
            href={profile.resumeURL}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
          >
            <Download className="h-4 w-4" />
            Download Resume
          </Link>
        )}
      </article>
    </SectionWrapper>
  );
}
