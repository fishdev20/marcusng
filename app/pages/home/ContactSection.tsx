"use client";

import Reveal from "@/app/components/animation/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpRight, MailIcon, MessageCircle, PhoneIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type SubmitStatus = {
  type: "success" | "error";
  message: string;
} | null;

const contactChannels = [
  {
    title: "Email",
    description: "Best for project inquiries, collaboration, or anything that needs context.",
    value: "minhnguyen.dev20@gmail.com",
    href: "mailto:minhnguyen.dev20@gmail.com",
    icon: MailIcon,
  },
  {
    title: "WhatsApp",
    description: "Useful for quick back-and-forth when a conversation should move faster.",
    value: "Start a chat",
    href: "https://wa.me/358449824682",
    icon: MessageCircle,
  },
  {
    title: "Phone",
    description: "Available for direct contact when a call makes more sense than email.",
    value: "+358 44 982 4682",
    href: "tel:+358449824682",
    icon: PhoneIcon,
  },
];

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<SubmitStatus>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to send");
      }

      setStatus({
        type: "success",
        message: "Message sent. I will get back to you as soon as I can.",
      });
      form.reset();
    } catch {
      setStatus({
        type: "error",
        message: "Something went wrong while sending the message. Please try email instead.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-6 pb-24 pt-10 md:px-16" id="contact">
      <div className="space-y-8">
        <Reveal
          direction="up"
          className="grid gap-6 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] xl:items-end"
        >
          <div className="space-y-4">
            <p className="text-[0.72rem] uppercase tracking-[0.32em] text-primary">Contact</p>
            <h2 className="max-w-xl font-incognito text-[clamp(2.6rem,5.2vw,4.8rem)] leading-[0.95] tracking-[-0.04em]">
              Open for conversations.
            </h2>
          </div>

          <div className="flex flex-col gap-4 xl:items-end">
            <div className="flex flex-wrap gap-3 xl:justify-end">
              {["reply by email", "project discussions", "freelance and product work"].map(
                (item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border/70 px-4 py-2 text-xs uppercase tracking-[0.22em] text-muted-foreground"
                  >
                    {item}
                  </span>
                ),
              )}
            </div>
          </div>
        </Reveal>

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,0.76fr)_minmax(0,1.24fr)]">
          <Reveal direction="up" delay={0.06} className="flex flex-col gap-4 self-start">
            {contactChannels.map((channel, index) => {
              const Icon = channel.icon;

              return (
                <Link
                  key={channel.title}
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group relative overflow-hidden rounded-[1.9rem] border border-border/70 p-5 transition-transform duration-300 hover:-translate-y-1"
                  style={{
                    background:
                      index % 2 === 0
                        ? "linear-gradient(150deg, color-mix(in oklch, var(--background) 92%, var(--primary) 8%), color-mix(in oklch, var(--background) 98%, var(--primary) 2%))"
                        : "linear-gradient(150deg, color-mix(in oklch, var(--background) 92%, var(--secondary) 8%), color-mix(in oklch, var(--background) 98%, var(--secondary) 2%))",
                  }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/70">
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="space-y-2">
                        <h3 className="font-incognito text-3xl leading-none">{channel.title}</h3>
                      </div>
                    </div>

                    <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </div>

                  <p className="mt-4 text-sm font-medium tracking-[0.02em] text-foreground/90">
                    {channel.value}
                  </p>
                </Link>
              );
            })}
          </Reveal>

          <Reveal
            direction="left"
            distance={28}
            delay={0.12}
            className="relative self-start overflow-hidden rounded-[2.25rem] border border-border/70"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(155deg, color-mix(in oklch, var(--primary) 8%, transparent), transparent 38%, color-mix(in oklch, var(--secondary) 12%, transparent))",
              }}
            />

            <div className="relative z-10 p-5 md:p-7">
              <div className="grid gap-6 lg:grid-cols-[minmax(0,0.62fr)_minmax(0,1.38fr)]">
                <div className="space-y-3">
                  <p className="text-[0.72rem] uppercase tracking-[0.24em] text-muted-foreground">
                    Message form
                  </p>
                  <h3 className="font-incognito text-4xl leading-none md:text-5xl">Send a note</h3>
                  <p className="max-w-[16rem] text-sm leading-6 text-muted-foreground">
                    A short, specific message works best. Tell me what you need and how to follow
                    up.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-5">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input
                        name="firstName"
                        id="firstName"
                        placeholder="Marcus"
                        required
                        className="h-12 rounded-2xl border-border/70 bg-background/70 px-4 transition-all duration-300 focus:-translate-y-0.5 focus:border-primary/45 focus:bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input
                        name="lastName"
                        id="lastName"
                        placeholder="Nguyen"
                        className="h-12 rounded-2xl border-border/70 bg-background/70 px-4 transition-all duration-300 focus:-translate-y-0.5 focus:border-primary/45 focus:bg-background"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      name="email"
                      id="email"
                      type="email"
                      placeholder="name@company.com"
                      required
                      className="h-12 rounded-2xl border-border/70 bg-background/70 px-4 transition-all duration-300 focus:-translate-y-0.5 focus:border-primary/45 focus:bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      name="message"
                      id="message"
                      placeholder="A few lines about the project, role, or conversation you want to have."
                      rows={7}
                      required
                      className="min-h-40 rounded-[1.6rem] border-border/70 bg-background/70 px-4 py-3 transition-all duration-300 focus:-translate-y-0.5 focus:border-primary/45 focus:bg-background"
                    />
                  </div>

                  <div className="flex flex-col gap-3 pt-2">
                    <Button
                      className="h-12 rounded-full px-6 text-sm uppercase tracking-[0.18em] transition-transform duration-300 hover:-translate-y-0.5"
                      size="lg"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send message"}
                    </Button>

                    {status ? (
                      <p
                        className="rounded-2xl border px-4 py-3 text-sm"
                        style={{
                          borderColor:
                            status.type === "success"
                              ? "color-mix(in oklch, var(--primary) 35%, var(--border) 65%)"
                              : "color-mix(in oklch, var(--destructive) 40%, var(--border) 60%)",
                          background:
                            status.type === "success"
                              ? "color-mix(in oklch, var(--primary) 8%, var(--background) 92%)"
                              : "color-mix(in oklch, var(--destructive) 8%, var(--background) 92%)",
                        }}
                      >
                        {status.message}
                      </p>
                    ) : null}
                  </div>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
