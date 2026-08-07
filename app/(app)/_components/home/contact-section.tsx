"use client";

import type { Profile } from "@/types/profile";
import { ArrowUpRight, Github, Linkedin, Mail, Twitch, Twitter } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Section } from "./section";

type SubmissionState = "idle" | "submitting" | "success" | "error";

export function ContactSection({ profile }: { profile: Profile | null }) {
  const [submissionState, setSubmissionState] = useState<SubmissionState>("idle");
  const [feedback, setFeedback] = useState("");
  const email = profile?.email || "minhnguyen.dev20@gmail.com";
  const channels = [
    profile?.email
      ? { title: "Email", value: profile.email, href: `mailto:${profile.email}`, icon: Mail }
      : null,
    profile?.socialLinks?.github
      ? {
          title: "GitHub",
          value: profile.socialLinks.github.replace(/^https?:\/\//, ""),
          href: profile.socialLinks.github,
          icon: Github,
        }
      : null,
    profile?.socialLinks?.linkedin
      ? {
          title: "LinkedIn",
          value: profile.socialLinks.linkedin.replace(/^https?:\/\//, ""),
          href: profile.socialLinks.linkedin,
          icon: Linkedin,
        }
      : null,
    profile?.socialLinks?.twitter
      ? {
          title: "Twitter",
          value: profile.socialLinks.twitter.replace(/^https?:\/\//, ""),
          href: profile.socialLinks.twitter,
          icon: Twitter,
        }
      : null,
    profile?.socialLinks?.twitch
      ? {
          title: "Twitch",
          value: profile.socialLinks.twitch.replace(/^https?:\/\//, ""),
          href: profile.socialLinks.twitch,
          icon: Twitch,
        }
      : null,
  ].filter(
    (channel): channel is { title: string; value: string; href: string; icon: typeof Mail } =>
      Boolean(channel),
  );
  const fallbackChannels = [{ title: "Email", value: email, href: `mailto:${email}`, icon: Mail }];
  const visibleChannels = channels.length ? channels.slice(0, 3) : fallbackChannels;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmissionState("submitting");
    setFeedback("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      });
      const result = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(result.error || "Message could not be sent.");
      }

      form.reset();
      setSubmissionState("success");
      setFeedback("Message sent. I will get back to you soon.");
    } catch (error) {
      setSubmissionState("error");
      setFeedback(error instanceof Error ? error.message : "Message could not be sent.");
    }
  }

  return (
    <Section id="contact" label="Contact">
      <div className="grid gap-8">
        <div className="grid border-y sm:grid-cols-3 sm:divide-x">
          {visibleChannels.map(({ title, value, href, icon: Icon }) => (
            <Link
              key={title}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group grid gap-5 border-b py-5 transition-colors last:border-b-0 hover:bg-muted sm:border-b-0 sm:px-5 sm:first:pl-0 sm:last:pr-0"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="grid h-8 w-8 place-items-center rounded-sm border bg-muted text-foreground transition-colors group- group-hover:text-foreground">
                  <Icon className="h-3.5 w-3.5" strokeWidth={1.8} />
                </span>
                <ArrowUpRight
                  className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground"
                  strokeWidth={1.8}
                />
              </div>
              <div>
                <h3 className="font-incognito text-[18px] font-semibold leading-none tracking-[-0.02em] text-foreground">
                  {title}
                </h3>
                <p className="mt-3 break-words text-[13px] font-medium leading-5 text-muted-foreground">
                  {value}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <ContactField label="First name" name="firstName" placeholder="Marcus" required />
            <ContactField label="Last name" name="lastName" placeholder="Nguyen" />
          </div>
          <ContactField
            label="Email"
            name="email"
            type="email"
            placeholder="name@company.com"
            required
          />
          <label className="grid gap-2 text-[13px] font-medium text-muted-foreground">
            Message
            <textarea
              name="message"
              required
              rows={6}
              placeholder="A few lines about the project, role, or conversation you want to have."
              className="min-h-[156px] min-w-0 resize-y rounded-sm border bg-background px-4 py-3 text-[14px] leading-6 text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
            />
          </label>
          <div className="flex flex-wrap items-center gap-4 border-t pt-5">
            <button
              type="submit"
              disabled={submissionState === "submitting"}
              className="inline-flex h-11 items-center rounded-sm bg-primary px-5 text-[14px] font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 active:translate-y-px disabled:pointer-events-none disabled:opacity-60"
            >
              {submissionState === "submitting" ? "Sending..." : "Send message"}
            </button>
            <p
              aria-live="polite"
              className={`text-[13px] font-medium ${
                submissionState === "error" ? "text-destructive" : "text-muted-foreground"
              }`}
            >
              {feedback}
            </p>
          </div>
        </form>
      </div>
    </Section>
  );
}
function ContactField({
  label,
  name,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <label className="grid gap-2 text-[13px] font-medium text-muted-foreground">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="h-11 min-w-0 rounded-sm border bg-background px-4 text-[14px] text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring"
      />
    </label>
  );
}
