"use client";
import { Button } from "@/components/ui/button";
import { MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Theme() {
  const { systemTheme, theme, setTheme } = useTheme();
  const [hasMounted, setHasMounted] = useState(false);
  const currentTheme = theme === "system" ? systemTheme : theme;

  function toggleTheme() {
    return currentTheme === "light" ? setTheme("dark") : setTheme("light");
  }
  useEffect(() => setHasMounted(true), []);

  if (!hasMounted) return <span className="w-10 h-10 animate-pulse p-2 rounded-full border"></span>;

  return (
    <Button
      variant={"outline"}
      onClick={toggleTheme}
      className={` w-10 h-10 cursor-pointer border  rounded-full p-2 duration-300 transition-transform group: ${
        currentTheme === "light" ? "-rotate-180" : "rotate-0"
      }`}
      aria-label="Toggle Theme"
    >
      {currentTheme === "light" ? <MoonStar className="-rotate-180" /> : <Sun />}
    </Button>
  );
}
