"use client";

import { HOME_PROGRAMS } from "@/lib/constants";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function ProgramsGrid() {
  const ref = useScrollReveal();
  const activePrograms = HOME_PROGRAMS.filter((p) => p.status === "Active");
  const comingSoonPrograms = HOME_PROGRAMS.filter((p) => p.status === "Coming Soon");

  return (
    <section
      id="programs"
      className="flex flex-col items-center px-6 md:px-12 border-t border-white/8"
      style={{
        paddingTop: "clamp(5rem, 8vw, 8rem)",
        paddingBottom: "clamp(5rem, 8vw, 8rem)",
      }}
    >
      <div ref={ref} className="reveal w-full max-w-[1200px]">
        <div className="mb-12">
          <span className="font-mono text-[0.625rem] tracking-[0.2em] uppercase text-gray-500 mb-4 block">
            [PROGRAMS]
          </span>
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-light text-white uppercase tracking-wide">
            How we build yours
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {activePrograms.map((program) => {
            const Tag = program.href ? "a" : "div";
            const linkProps = program.href
              ? {
                  href: program.href,
                  ...(program.href.startsWith("http")
                    ? { target: "_blank" as const, rel: "noopener noreferrer" }
                    : {}),
                }
              : {};

            return (
              <Tag
                key={program.id}
                {...linkProps}
                className="group block rounded-xl p-8 transition-all duration-300 no-underline"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-white/50">
                    [{program.status === "Active" ? "Active" : "Coming Soon"}]
                  </span>
                  {program.href && (
                    <span className="font-mono text-[0.5rem] tracking-[0.15em] uppercase text-gray-600 group-hover:text-white/50 transition-colors">
                      &rarr;
                    </span>
                  )}
                </div>
                <h3 className="text-[1.125rem] text-white uppercase tracking-wide mb-3 group-hover:text-gray-200 transition-colors font-light">
                  {program.name}
                </h3>
                <p className="text-[0.8125rem] text-gray-500 leading-relaxed">
                  {program.description}
                </p>
              </Tag>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {comingSoonPrograms.map((program) => (
            <div
              key={program.id}
              className="rounded-xl p-6 transition-all duration-300"
              style={{
                background: "rgba(255,255,255,0.015)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <span className="font-mono text-[0.5rem] tracking-[0.2em] uppercase text-white/30 mb-3 block">
                [Coming Soon]
              </span>
              <h3 className="text-[0.875rem] text-white/60 uppercase tracking-wide mb-2 font-light">
                {program.name}
              </h3>
              <p className="text-[0.75rem] text-gray-600 leading-relaxed">
                {program.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
