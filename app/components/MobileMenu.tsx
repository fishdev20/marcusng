"use client";
import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { Camera, CircleUserRound, FolderKanban, Newspaper, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
// import Logo from "../../../public/logo.png";

export default function MobileMenu() {
  const [navShow, setNavShow] = useState(false);
  const data = [
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
    {
      title: "Photos",
      href: "/photos",
      icon: Camera,
    },
  ];

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = "auto";
      } else {
        document.body.style.overflow = "hidden";
      }
      return !status;
    });
  };

  return (
    <div>
      <div className="w-full flex items-center justify-between text-sm py-6 md:px-16 px-6 border-b z-30">
        <Link href={"/"}>
          <Logo />
        </Link>
        <SheetClose>
          <Button variant="outline" size="icon" className="rounded-full w-10 h-10">
            <X />
          </Button>
        </SheetClose>
      </div>

      <div className="grid gap-4 p-4">
        {data.map((item) => {
          return (
            <Link
              href={item.href}
              className="font-incognito text-sm font-medium flex gap-2 items-center"
              prefetch={false}
            >
              <item.icon aria-hidden="true" />
              {item.title}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
