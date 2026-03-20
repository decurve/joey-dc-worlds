"use client";

import { createContext, useContext, useState } from "react";
import type { HeroVisualId } from "./HeroVisuals";

const HeroVisualContext = createContext<{
  visualId: HeroVisualId;
  setVisualId: (id: HeroVisualId) => void;
}>({
  visualId: "rocket-morph-full",
  setVisualId: () => {},
});

export function HeroVisualProvider({ children }: { children: React.ReactNode }) {
  const [visualId, setVisualId] = useState<HeroVisualId>("rocket-morph-full");
  return (
    <HeroVisualContext.Provider value={{ visualId, setVisualId }}>
      {children}
    </HeroVisualContext.Provider>
  );
}

export function useHeroVisual() {
  return useContext(HeroVisualContext);
}
