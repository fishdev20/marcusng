import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { CircleUserRound, FolderKanban, Newspaper, X } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";

const navItems = [
  {
    title: "About",
    href: "/about",
    icon: CircleUserRound,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    title: "Blog",
    href: "/blog",
    icon: Newspaper,
  },
];

export default function MobileMenu() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex items-center justify-between border-b border-border/70 px-6 py-5">
        <Link href="/" className="flex items-center gap-3">
          <Logo />
        </Link>

        <SheetClose asChild>
          <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
            <X />
          </Button>
        </SheetClose>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] opacity-90"
        style={{
          background:
            "radial-gradient(circle at 18% 12%, color-mix(in oklch, var(--primary) 16%, transparent), transparent 28%), radial-gradient(circle at 82% 18%, color-mix(in oklch, var(--secondary) 14%, transparent), transparent 28%)",
        }}
      />

      <div className="relative flex flex-1 flex-col justify-between px-6 py-8">
        <div className="space-y-3">
          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  prefetch={false}
                  className="group flex items-center justify-between border-b border-border/65 py-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-background/70 text-muted-foreground transition-colors group-hover:text-foreground">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-incognito text-[2rem] leading-none tracking-[-0.03em]">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-[0.72rem] uppercase tracking-[0.22em] text-muted-foreground transition-colors group-hover:text-foreground">
                    Open
                  </span>
                </Link>
              </SheetClose>
            );
          })}
        </div>

        <div className="space-y-4 border-t border-border/65 pt-6">
          <p className="max-w-sm text-sm leading-7 text-muted-foreground">
            Browse selected work, writing, and the rest of the portfolio from here.
          </p>
          <SheetClose asChild>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 text-[0.78rem] uppercase tracking-[0.22em] text-primary"
            >
              Contact
            </Link>
          </SheetClose>
        </div>
      </div>
    </div>
  );
}
