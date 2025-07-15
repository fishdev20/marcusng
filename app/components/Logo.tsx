"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import black_logo from "../../assets/images/black_logo.png";
import white_logo from "../../assets/images/white_logo.png";

export default function Logo() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Image
      src={resolvedTheme === "dark" ? white_logo : black_logo}
      width={35}
      height={35}
      alt="logo"
    />
  );
}
