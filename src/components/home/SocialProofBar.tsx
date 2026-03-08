"use client";

import { HOME_SOCIAL_PROOF } from "@/lib/constants";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function SocialProofBar() {
  const ref = useScrollReveal();

  return (
    <section className="flex flex-col items-center px-6 md:px-12 py-12 border-t border-white/8">
      <div ref={ref} className="reveal w-full max-w-[1200px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {HOME_SOCIAL_PROOF.map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="text-[clamp(1.5rem,3vw,2.5rem)] font-light text-white tracking-tight">
                {stat.value}
              </div>
              <div className="font-mono text-[0.625rem] tracking-[0.15em] uppercase text-gray-500 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
