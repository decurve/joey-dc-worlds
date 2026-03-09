"use client";

import { createContext, useContext, useState } from "react";
import type { HeroVisualId } from "./HeroVisuals";

const HeroVisualContext = createContext<{
  visualId: HeroVisualId;
  setVisualId: (id: HeroVisualId) => void;
}>({
  visualId: "original",
  setVisualId: () => {},
});

export function HeroVisualProvider({ children }: { children: React.ReactNode }) {
  const [visualId, setVisualId] = useState<HeroVisualId>("original");
  return (
    <HeroVisualContext.Provider value={{ visualId, setVisualId }}>
      {children}
    </HeroVisualContext.Provider>
  );
}

export function useHeroVisual() {
  return useContext(HeroVisualContext);
}
