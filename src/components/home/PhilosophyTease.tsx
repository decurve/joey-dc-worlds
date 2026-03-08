"use client";

import { HOME_PHILOSOPHY } from "@/lib/constants";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function PhilosophyTease() {
  const ref = useScrollReveal();

  return (
    <section
      id="approach"
      className="flex flex-col items-center px-6 md:px-12 border-t border-white/8"
      style={{
        paddingTop: "clamp(5rem, 8vw, 8rem)",
        paddingBottom: "clamp(5rem, 8vw, 8rem)",
      }}
    >
      <div ref={ref} className="reveal w-full max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <div>
            <span className="font-mono text-[0.625rem] tracking-[0.2em] uppercase text-gray-500 mb-6 block">
              [{HOME_PHILOSOPHY.label}]
            </span>
            <h2 className="text-[clamp(1.75rem,3.5vw,3rem)] font-light text-white uppercase tracking-tight leading-[1.05]">
              {HOME_PHILOSOPHY.headline.split("\n").map((line, i) => (
                <span key={i}>
                  {line}
                  {i < HOME_PHILOSOPHY.headline.split("\n").length - 1 && <br />}
                </span>
              ))}
            </h2>
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-gray-400 text-[0.9375rem] leading-relaxed mb-4">
              {HOME_PHILOSOPHY.body}
            </p>
            <p className="text-gray-400 text-[0.9375rem] leading-relaxed mb-4">
              {HOME_PHILOSOPHY.body2}
            </p>
            <p className="text-gray-300 text-[0.9375rem] leading-relaxed mb-8">
              {HOME_PHILOSOPHY.body3}
            </p>

            <div className="flex flex-wrap gap-3">
              {HOME_PHILOSOPHY.pillars.map((pillar) => (
                <span
                  key={pillar}
                  className="font-mono text-[0.5625rem] tracking-[0.2em] uppercase text-white/70 border border-white/15 rounded-full px-4 py-2"
                >
                  {pillar}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
