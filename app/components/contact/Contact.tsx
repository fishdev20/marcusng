import { FadeUp } from "@/app/components/animation/FadeUp";
import GlassWrapper from "@/components/ui/glass-wrapper";
import { personal } from "@/constants/personal";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function Contact() {
  return (
    <GlassWrapper className="p-6">
      <FadeUp
        direction="up"
        className="flex-col flex space-y-0 md:flex-row gap-6 md:items-center"
        staggerChildren={0.25}
      >
        <h3 className="text-xl md:text-3xl font-semibold text-left">Contact</h3>
        <div className="flex w-full gap-4 flex-wrap">
          <div className="flex flex-wrap gap-4">
            <a
              href={`mailto:${personal.email}`}
              className="border border-border p-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-500"
            >
              <Mail size={28} className="text-red-600" />
            </a>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`tel:${personal.phone}`}
              className="border border-border p-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-500"
            >
              <Phone size={28} className="text-green-600" />
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={personal.github}
              target="_blank"
              className="border border-border p-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-500"
            >
              <Github size={28} className="text-black dark:text-white" />{" "}
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Link
              href={personal.linkedIn}
              target="_blank"
              className="border border-border p-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-500"
            >
              <Linkedin size={28} className="text-[#0077B5]" />
            </Link>
          </div>
        </div>
      </FadeUp>
    </GlassWrapper>
  );
}
