"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode } from "react";
import { GlossaryPopup } from "@/components/ui/GlossaryPopup";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <GlossaryPopup />
    </NextThemesProvider>
  );
}
