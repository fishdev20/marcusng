import type { Metadata } from "next";
import { Funnel_Sans } from "next/font/google";
import { gitlabmono } from "../assets/font/font";
import "./globals.css";

const funnelSans = Funnel_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-funnel-sans",
});

export const metadata: Metadata = {
  title: "Marcus Nguyen | Software Engineer",
  description: "Marcus Nguyen's portfolio showcasing his work as a software engineer.",
  openGraph: {
    title: "Marcus Nguyen | Software Engineer",
    description: "Marcus Nguyen's portfolio showcasing his work as a software engineer.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${funnelSans.variable} ${funnelSans.className} ${gitlabmono.variable} relative`}
      >
        {children}
      </body>
    </html>
  );
}
