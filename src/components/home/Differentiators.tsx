"use client";

import { HOME_DIFFERENTIATORS } from "@/lib/constants";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function Differentiators() {
  const ref = useScrollReveal();

  return (
    <section
      className="flex flex-col items-center px-6 md:px-12 border-t border-white/8"
      style={{
        paddingTop: "clamp(5rem, 8vw, 8rem)",
        paddingBottom: "clamp(5rem, 8vw, 8rem)",
      }}
    >
      <div ref={ref} className="reveal w-full max-w-[1200px]">
        <span className="font-mono text-[0.625rem] tracking-[0.2em] uppercase text-gray-500 mb-4 block">
          [OUR APPROACH]
        </span>
        <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-light text-white uppercase tracking-wide mb-12">
          A different kind of growth partner
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
          {HOME_DIFFERENTIATORS.map((diff, i) => (
            <div key={i}>
              <h3 className="text-[0.875rem] text-white uppercase tracking-wide mb-2 font-medium">
                {diff.title}
              </h3>
              <p className="text-[0.8125rem] text-gray-500 leading-relaxed">
                {diff.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
