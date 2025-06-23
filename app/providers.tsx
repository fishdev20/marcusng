"use client";

import { ThemeProvider } from "next-themes";
import ClickSpark from "./animation/ClickSpark";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <ClickSpark sparkSize={15} sparkRadius={15} sparkCount={8} duration={400}>
        {children}
      </ClickSpark>
    </ThemeProvider>
  );
}
