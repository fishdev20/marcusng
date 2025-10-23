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
      href: "https://marcusng-blog.vercel.app/",
    },
    {
      title: "Photos",
      href: "/photos",
    },
  ];

  return (
    <header className="flex justify-center items-center fixed top-3 w-full z-50 px-6">
      <div className="w-full max-w-6xl mx-auto items-center justify-between flex gap-1 p-2 border dark:border-white/20 border-black/20 rounded-lg bg-background/80 backdrop-blur-lg supports-[backdrop-filter]:bg-background/30 shadow-lg">
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
