// import Logo from "@/public/logo.png";
import Link from "next/link";
import Theme from "./Theme";
// import UnmountStudio from "./Unmount";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import Logo from "./Logo";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const data = [
    {
      title: "About",
      href: "/about",
    },
    {
      title: "Projects",
      href: "/projects",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "Photos",
      href: "/photos",
    },
  ];

  return (
    <header className="sticky top-0 text-sm py-6 md:px-16 px-6 border-b z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/">
          <Logo />
        </Link>

        <nav className="md:block hidden">
          <ul className="flex items-center gap-x-8">
            {data.map((link, id) => (
              <li key={id}>
                <Link
                  href={link.href}
                  className="font-incognito dark:text-white duration-300 text-base"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4 sm:gap-0">
          <Theme />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-full w-10 h-10 md:hidden">
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-screen">
              <MobileMenu />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
