import { useEffect, useState } from "react";

export default function useIsSmallScreen() {
  const [isSmall, setIsSmall] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)"); // sm breakpoint
    setIsSmall(mediaQuery.matches);

    const handler = () => setIsSmall(mediaQuery.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return isSmall;
}
