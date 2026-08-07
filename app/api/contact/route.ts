import { ContactEmail } from "@/app/components/ContactEmail";
import { NextResponse } from "next/server";
import { Resend } from "resend";

type ContactRequest = {
  firstName?: string;
  lastName?: string;
  email?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactRequest;
    const firstName = body.firstName?.trim();
    const lastName = body.lastName?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!firstName || !email || !message) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Email service is not configured." }, { status: 503 });
    }

    const fullName = [firstName, lastName].filter(Boolean).join(" ");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Minh Nguyen <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "minhfish20hp@gmail.com",
      subject: `New message from ${fullName}`,
      react: ContactEmail({ fullName, email, message }),
      replyTo: email,
    });

    if (error) {
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Resend contact error:", error);
    return NextResponse.json(
      { error: "Message could not be sent. Please try again." },
      { status: 500 },
    );
  }
}
