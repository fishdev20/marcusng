import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { gitlabmono, incognito } from "../assets/font/font";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--inter",
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
      <body className={`${incognito.variable} ${inter.className} ${gitlabmono.variable} relative`}>
        {children}
      </body>
    </html>
  );
}
