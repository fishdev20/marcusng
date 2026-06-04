"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, useReducedMotion } from "motion/react";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";
import Theme from "./Theme";

const navItems = [
  { title: "About", href: "/about" },
  { title: "Projects", href: "/projects" },
  { title: "Blog", href: "/blog" },
];

export default function Navbar() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.header
      className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6 md:pt-5"
      initial={prefersReducedMotion ? false : { opacity: 0, y: -18, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: prefersReducedMotion ? 0.01 : 0.65,
        delay: prefersReducedMotion ? 0 : 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="pointer-events-auto mx-auto flex w-full max-w-6xl items-center justify-between gap-4 rounded-[1.7rem] border border-border/70 bg-background/88 px-4 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/72 md:px-5">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <Logo />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-2 px-2 py-1.5">
            {navItems.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-flex rounded-full px-4 py-2 text-[0.78rem] uppercase tracking-[0.22em] text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-foreground"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="shrink-0">
            <Theme />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full md:hidden"
                aria-label="Open menu"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-screen border-none bg-background/96 p-0 shadow-none">
              <MobileMenu />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
