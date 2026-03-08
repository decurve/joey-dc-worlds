"use client";

import { HOME_HERO } from "@/lib/constants";

export function HomeHero() {
  return (
    <section className="flex flex-col items-center min-h-[85vh] justify-center pt-32 pb-16 px-6 md:px-12">
      <div className="w-full max-w-[1000px]">
        <span className="font-mono text-[0.625rem] tracking-[0.2em] uppercase text-gray-500 mb-8 block animate-fade-in">
          [{HOME_HERO.label}]
        </span>

        <h1 className="text-[clamp(3rem,7vw,6.5rem)] font-light leading-[0.95] tracking-tight text-white uppercase mb-8 animate-fade-in [animation-delay:0.1s]">
          {HOME_HERO.headline.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i < HOME_HERO.headline.split("\n").length - 1 && <br />}
            </span>
          ))}
        </h1>

        <p className="text-[clamp(0.875rem,1.2vw,1.125rem)] text-gray-400 leading-relaxed max-w-[560px] mb-10 animate-fade-in [animation-delay:0.2s]">
          {HOME_HERO.subhead}
        </p>

        <div className="animate-fade-in [animation-delay:0.3s]">
          <a
            href="#programs"
            className="inline-block bg-white text-black font-mono text-[0.6875rem] tracking-[0.15em] uppercase px-8 py-4 rounded-full hover:bg-gray-200 transition-all duration-300 cursor-pointer"
          >
            {HOME_HERO.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
