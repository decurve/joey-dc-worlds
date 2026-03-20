"use client";

import { useEffect, useState } from "react";

const SPARKLE_COUNT = 6;

function Sparkles() {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    setSparkles(
      Array.from({ length: SPARKLE_COUNT }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 3,
      }))
    );
  }, []);

  return (
    <>
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="sparkle-dot"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </>
  );
}

export default function GlowButton({
  href,
  children,
  className = "",
  as = "a",
}: {
  href?: string;
  children: React.ReactNode;
  className?: string;
  as?: "a" | "button";
}) {
  const base = `glow-btn relative rounded-md font-medium text-sm inline-flex items-center justify-center shrink-0 ${className}`;

  if (as === "button") {
    return (
      <button className={base}>
        <Sparkles />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    );
  }

  return (
    <a href={href} className={base}>
      <Sparkles />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </a>
  );
}
