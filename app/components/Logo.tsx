"use client";

import black_logo from "../../assets/images/black_logo.png";
import white_logo from "../../assets/images/white_logo.png";

import { useTheme } from "next-themes";
import Image from "next/image";

export default function Logo() {
  const { theme } = useTheme();
  if (theme === "dark") {
    return <Image src={white_logo} width={35} height={35} alt="logo" />;
  }

  return <Image src={black_logo} width={35} height={35} alt="logo" />;
}
