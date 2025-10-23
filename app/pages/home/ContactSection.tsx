"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MailIcon, MessageCircle, PhoneIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    console.log(res);

    if (res.ok) {
      setStatus("✅ Message sent successfully!");
      //   e.currentTarget.reset();
    } else {
      setStatus("❌ Failed to send message. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="h-full flex items-center justify-center py-16">
      <div className="w-full max-w-5xl mx-auto px-6 xl:px-0">
        <h1 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">Let's Talk</h1>
        <p className="mt-3 text-base sm:text-lg text-muted-foreground">
          I&apos;d love to hear from you. Please fill out this form or shoot me an email.
        </p>

        <div className="mt-24 grid lg:grid-cols-2 gap-16 md:gap-10">
          {/* Left side info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
            <div>
              <div className="h-12 w-12 flex items-center justify-center bg-primary/5 dark:bg-primary/10 text-primary rounded-full">
                <MailIcon />
              </div>
              <h3 className="mt-6 font-semibold text-xl">Email</h3>
              <p className="my-2.5 text-muted-foreground">Send me through</p>
              <Link className="font-medium text-primary" href="mailto:minhnguyen.dev20@gmail.com">
                minhnguyen.dev20@gmail.com
              </Link>
            </div>
            <div>
              <div className="h-12 w-12 flex items-center justify-center bg-primary/5 dark:bg-primary/10 text-primary rounded-full">
                <MessageCircle />
              </div>
              <h3 className="mt-6 font-semibold text-xl">Whatsapp</h3>
              <p className="my-2.5 text-muted-foreground">Send me direct message</p>
              <Link className="font-medium text-primary" href="#">
                Start new chat
              </Link>
            </div>
            <div>
              <div className="h-12 w-12 flex items-center justify-center bg-primary/5 dark:bg-primary/10 text-primary rounded-full">
                <PhoneIcon />
              </div>
              <h3 className="mt-6 font-semibold text-xl">Phone</h3>
              <p className="my-2.5 text-muted-foreground">Anytime.</p>
              <Link className="font-medium text-primary" href="tel:+358449824682">
                +358 44 982 4682
              </Link>
            </div>
          </div>

          {/* Contact form */}
          <Card className="bg-none shadow-none py-0">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input name="firstName" id="firstName" placeholder="First name" required />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input name="lastName" id="lastName" placeholder="Last name" />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input name="email" id="email" type="email" placeholder="Email" required />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea name="message" id="message" placeholder="Message" rows={6} required />
                  </div>
                </div>
                <Button className="mt-6 w-full" size="lg" disabled={loading}>
                  {loading ? "Sending..." : "Submit"}
                </Button>
                {status && (
                  <p className="mt-4 text-center text-sm text-muted-foreground">{status}</p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
