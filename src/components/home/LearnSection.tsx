"use client";

import { HOME_LEARN } from "@/lib/constants";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function LearnSection() {
  const ref = useScrollReveal();

  return (
    <section
      className="flex flex-col items-center px-6 md:px-12 border-t border-white/8"
      style={{
        paddingTop: "clamp(5rem, 8vw, 8rem)",
        paddingBottom: "clamp(5rem, 8vw, 8rem)",
      }}
    >
      <div ref={ref} className="reveal w-full max-w-[800px] text-center">
        <span className="font-mono text-[0.625rem] tracking-[0.2em] uppercase text-gray-500 mb-6 block">
          [{HOME_LEARN.label}]
        </span>

        <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-light text-white uppercase tracking-wide mb-6">
          {HOME_LEARN.headline.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i < HOME_LEARN.headline.split("\n").length - 1 && <br />}
            </span>
          ))}
        </h2>

        <p className="text-gray-400 text-[0.9375rem] leading-relaxed mb-10 max-w-[600px] mx-auto">
          {HOME_LEARN.description}
        </p>

        <a
          href={HOME_LEARN.href}
          className="inline-block font-mono text-[0.6875rem] tracking-[0.15em] uppercase border border-white/20 text-white px-8 py-4 rounded-full hover:bg-white/5 transition-all duration-300"
        >
          {HOME_LEARN.cta}
        </a>
      </div>
    </section>
  );
}
