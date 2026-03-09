"use client";

import { ArrowRight, ArrowUpRight, ChevronDown, Zap, Target, Search, Compass, Layers, BarChart3 } from "lucide-react";
import { useState } from "react";

/* ── Shared data ── */
const programs = [
  {
    name: "Growth Architecture",
    short: "Full-stack growth system",
    description:
      "We audit, design, and build your complete growth system — market positioning, channel strategy, growth model, and the operating system to scale it.",
    cta: "Start a conversation",
    links: ["How It Works", "See Case Studies"],
    icon: Layers,
    number: "01",
  },
  {
    name: "Paid Acquisition Engines",
    short: "Paid growth at scale",
    description:
      "Your paid growth engine — designed, launched, and scaled. Strategy, creative, media buying, and measurement built as a system, not a collection of campaigns.",
    cta: "Scale your paid channels",
    links: ["How It Works", "See Results"],
    icon: Target,
    number: "02",
  },
  {
    name: "AI Search Engines",
    short: "Own AI discovery",
    description:
      "AI is rewriting how buyers discover products. We build the system that ensures your brand shows up when AI answers your buyers' questions.",
    cta: "Get your AI brand audit",
    links: ["Learn about AI Search", "Visit Saturation"],
    icon: Search,
    number: "03",
  },
  {
    name: "Story Systems",
    short: "Messaging that compounds",
    description:
      "Your positioning and messaging aren't a one-time exercise. They're the operating system your entire go-to-market runs on.",
    cta: "Build your narrative",
    links: ["How Story Systems Work"],
    icon: Compass,
    number: "04",
  },
];

const sectionHeader = { tag: "Growth Studio", title: "The growth systems we design and build", subtitle: "We partner with frontier operators — each one a specialist in their domain — to architect growth systems around your specific business." };

function SectionLabel({ n }: { n: number }) {
  return (
    <div className="sticky top-0 z-20 bg-[#f9f9f8] border-b border-black/10 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">Variation</span>
        <span className="font-heading text-2xl">{n}</span>
      </div>
      <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">Growth Studio</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 1: Accordion Rows (Anthropic-style)
   ═══════════════════════════════════════════════════ */
function V1() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      <SectionLabel n={1} />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-4">{sectionHeader.title}</h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-12">{sectionHeader.subtitle}</p>

        <div className="border-t border-black/10">
          {programs.map((p, i) => (
            <div key={p.name} className="border-b border-black/10">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between py-6 md:py-8 text-left group program-row-hover"
              >
                <div className="flex items-center gap-6">
                  <span className="font-mono-ui text-xs text-neutral-400">{p.number}</span>
                  <h3 className="font-heading text-2xl md:text-3xl font-medium group-hover:text-neutral-600 transition-colors">{p.name}</h3>
                </div>
                <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-[400px] pb-8" : "max-h-0"}`}>
                <div className="flex flex-col md:flex-row gap-8 pl-12">
                  <p className="text-neutral-600 font-light leading-relaxed max-w-xl">{p.description}</p>
                  <div className="flex flex-col gap-2">
                    {p.links.map(l => (
                      <a key={l} href="#" className="text-xs font-mono-ui uppercase tracking-wide text-neutral-500 hover:text-black flex items-center gap-2">
                        <ArrowRight className="w-3 h-3" /> {l}
                      </a>
                    ))}
                    <button className="mt-4 border border-black/20 rounded-full px-5 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors self-start">
                      {p.cta}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 2: Bento Grid (mixed card sizes)
   ═══════════════════════════════════════════════════ */
function V2() {
  return (
    <div>
      <SectionLabel n={2} />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-4">{sectionHeader.title}</h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-12">{sectionHeader.subtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Big card */}
          <div className="md:row-span-2 border border-black/10 p-8 md:p-12 flex flex-col justify-between bg-white group hover:border-black/20 transition-colors">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 border border-black/10 flex items-center justify-center">
                  <Layers className="w-5 h-5" />
                </div>
                <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">01</span>
              </div>
              <h3 className="font-heading text-3xl md:text-4xl font-medium mb-4">{programs[0].name}</h3>
              <p className="text-neutral-600 font-light leading-relaxed">{programs[0].description}</p>
            </div>
            <button className="mt-8 border border-black/20 rounded-full px-5 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors self-start group-hover:border-black/40">
              {programs[0].cta} <ArrowRight className="w-4 h-4 inline-block ml-1" />
            </button>
          </div>

          {/* Smaller cards */}
          {programs.slice(1).map((p) => (
            <div key={p.name} className="border border-black/10 p-8 flex flex-col justify-between bg-white group hover:border-black/20 transition-colors">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 border border-black/10 flex items-center justify-center">
                    <p.icon className="w-4 h-4" />
                  </div>
                  <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">{p.number}</span>
                </div>
                <h3 className="font-heading text-xl font-medium mb-2">{p.name}</h3>
                <p className="text-neutral-600 font-light text-sm leading-relaxed">{p.description}</p>
              </div>
              <button className="mt-6 text-sm font-medium flex items-center gap-2 hover:text-neutral-600 transition-colors">
                {p.cta} <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 3: Big Numbers (editorial style)
   ═══════════════════════════════════════════════════ */
function V3() {
  return (
    <div>
      <SectionLabel n={3} />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-16">{sectionHeader.title}</h2>

        <div className="space-y-0">
          {programs.map((p) => (
            <div key={p.name} className="border-t border-black/10 py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-6 group program-row-hover">
              <div className="md:col-span-2">
                <span className="font-heading text-6xl md:text-8xl text-neutral-200 group-hover:text-neutral-400 transition-colors">{p.number}</span>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-heading text-2xl md:text-3xl font-medium mb-2">{p.name}</h3>
                <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">{p.short}</span>
              </div>
              <div className="md:col-span-4">
                <p className="text-neutral-600 font-light leading-relaxed">{p.description}</p>
              </div>
              <div className="md:col-span-2 flex items-start justify-end">
                <a href="#" className="w-10 h-10 border border-black/10 flex items-center justify-center hover:bg-black hover:text-white hover:border-black transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
          <div className="border-t border-black/10" />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 4: Full-Width Horizontal Cards
   ═══════════════════════════════════════════════════ */
function V4() {
  return (
    <div>
      <SectionLabel n={4} />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-4">{sectionHeader.title}</h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-12">{sectionHeader.subtitle}</p>

        <div className="space-y-4">
          {programs.map((p) => (
            <div key={p.name} className="border border-black/10 bg-white p-6 md:p-10 flex flex-col md:flex-row md:items-center gap-6 group hover:border-black/20 transition-colors program-row-hover">
              <div className="md:w-16 shrink-0">
                <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center">
                  <p.icon className="w-5 h-5 text-neutral-600" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-heading text-xl md:text-2xl font-medium">{p.name}</h3>
                <p className="text-neutral-500 font-light text-sm mt-1 max-w-xl">{p.description}</p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                {p.links.map(l => (
                  <span key={l} className="hidden lg:inline font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">{l}</span>
                ))}
                <button className="border border-black/20 rounded-full px-5 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors whitespace-nowrap">
                  {p.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 5: Tabs Interface
   ═══════════════════════════════════════════════════ */
function V5() {
  const [active, setActive] = useState(0);
  const p = programs[active];
  return (
    <div>
      <SectionLabel n={5} />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-12">{sectionHeader.title}</h2>

        <div className="border border-black/10 bg-white">
          {/* Tab bar */}
          <div className="flex border-b border-black/10 overflow-x-auto">
            {programs.map((prog, i) => (
              <button
                key={prog.name}
                onClick={() => setActive(i)}
                className={`flex-1 px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
                  active === i ? "border-black text-black" : "border-transparent text-neutral-400 hover:text-neutral-600"
                }`}
              >
                {prog.name}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-8 md:p-16 min-h-[320px]">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="md:w-1/2">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-neutral-100 flex items-center justify-center">
                    <p.icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono-ui text-xs uppercase tracking-widest text-neutral-400">{p.number}</span>
                </div>
                <h3 className="font-heading text-3xl md:text-4xl font-medium mb-4">{p.name}</h3>
                <p className="text-neutral-600 font-light leading-relaxed text-lg">{p.description}</p>
                <button className="mt-8 border border-black/20 rounded-full px-6 py-3 text-sm font-medium hover:bg-black hover:text-white transition-colors">
                  {p.cta} <ArrowRight className="w-4 h-4 inline-block ml-1" />
                </button>
              </div>
              <div className="md:w-1/2">
                <div className="aspect-[4/3] bg-neutral-100 border border-black/10 flex items-center justify-center">
                  <div className="text-center">
                    <p.icon className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
                    <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-300">[ Illustration ]</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 6: Dark Contrast Section
   ═══════════════════════════════════════════════════ */
function V6() {
  return (
    <div>
      <SectionLabel n={6} />
      <div className="bg-neutral-950 text-white px-6 py-16 md:py-24">
        <div className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-500 border border-dashed border-neutral-700 rounded px-2.5 py-1 inline-block mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-4">{sectionHeader.title}</h2>
        <p className="text-neutral-400 font-light text-base max-w-3xl mb-16">{sectionHeader.subtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10">
          {programs.map((p) => (
            <div key={p.name} className="bg-neutral-950 p-8 md:p-12 group">
              <div className="flex items-center gap-3 mb-6">
                <p.icon className="w-5 h-5 text-neutral-500 group-hover:text-white transition-colors" />
                <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-600">{p.number}</span>
              </div>
              <h3 className="font-heading text-2xl font-medium mb-3 group-hover:text-white/90">{p.name}</h3>
              <p className="text-neutral-400 font-light leading-relaxed mb-6 text-sm">{p.description}</p>
              <a href="#" className="text-sm font-medium text-white/60 hover:text-white flex items-center gap-2 transition-colors">
                {p.cta} <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#" className="inline-flex items-center gap-2 border border-white/20 rounded-full px-6 py-3 text-sm font-medium hover:bg-white hover:text-black transition-colors">
            Explore all programs (8) <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 7: Timeline / Steps
   ═══════════════════════════════════════════════════ */
function V7() {
  return (
    <div>
      <SectionLabel n={7} />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-4">{sectionHeader.title}</h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-16">{sectionHeader.subtitle}</p>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-black/10" />

          <div className="space-y-0">
            {programs.map((p, i) => (
              <div key={p.name} className="relative flex gap-8 md:gap-12 pb-16 last:pb-0">
                {/* Dot */}
                <div className="relative z-10 shrink-0">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white border border-black/10 flex items-center justify-center">
                    <span className="font-mono-ui text-xs text-neutral-400">{p.number}</span>
                  </div>
                </div>
                {/* Content */}
                <div className="flex-1 pt-2">
                  <h3 className="font-heading text-2xl md:text-3xl font-medium mb-2">{p.name}</h3>
                  <p className="text-neutral-600 font-light leading-relaxed max-w-xl mb-4">{p.description}</p>
                  <div className="flex flex-wrap gap-3">
                    <button className="border border-black/20 rounded-full px-4 py-1.5 text-xs font-medium hover:bg-black hover:text-white transition-colors">
                      {p.cta}
                    </button>
                    {p.links.map(l => (
                      <a key={l} href="#" className="text-xs font-mono-ui uppercase tracking-wide text-neutral-400 hover:text-black flex items-center gap-1">
                        {l} <ArrowRight className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 8: Minimal 2x2 Equal Grid
   ═══════════════════════════════════════════════════ */
function V8() {
  return (
    <div>
      <SectionLabel n={8} />
      <div className="px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="section-tag mb-4 inline-block">{sectionHeader.tag}</div>
          <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-4">{sectionHeader.title}</h2>
          <p className="text-neutral-500 font-light text-base">{sectionHeader.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programs.map((p) => (
            <div key={p.name} className="border border-black/10 bg-white p-8 md:p-10 group hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-8">
                <div className="w-12 h-12 bg-neutral-50 border border-black/10 flex items-center justify-center">
                  <p.icon className="w-5 h-5 text-neutral-600" />
                </div>
                <a href="#" className="w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
              <h3 className="font-heading text-xl font-medium mb-2">{p.name}</h3>
              <p className="text-neutral-500 font-light text-sm leading-relaxed mb-6">{p.description}</p>
              <div className="flex flex-wrap gap-2">
                {p.links.map(l => (
                  <span key={l} className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400 bg-neutral-100 border border-dashed border-neutral-300 rounded px-2.5 py-1">{l}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#" className="inline-flex items-center gap-2 text-sm font-medium hover:text-neutral-600 transition-colors">
            Explore all programs (8) <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 9: Magazine / Editorial Split
   ═══════════════════════════════════════════════════ */
function V9() {
  return (
    <div>
      <SectionLabel n={9} />
      <div className="px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Left sticky column */}
          <div className="md:col-span-5">
            <div className="md:sticky md:top-24">
              <div className="section-tag mb-4">{sectionHeader.tag}</div>
              <h2 className="font-heading text-4xl md:text-6xl tracking-tight mb-4">{sectionHeader.title}</h2>
              <p className="text-neutral-500 font-light text-base mb-8">{sectionHeader.subtitle}</p>
              <a href="/v2/services" className="inline-flex items-center gap-2 border border-black/20 rounded-full px-6 py-3 text-sm font-medium hover:bg-black hover:text-white transition-colors">
                View all programs <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right scrolling column */}
          <div className="md:col-span-7">
            <div className="space-y-8">
              {programs.map((p) => (
                <div key={p.name} className="border-l-2 border-black/10 pl-8 py-4 hover:border-black/40 transition-colors group">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono-ui text-xs text-neutral-400">{p.number}</span>
                    <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">{p.short}</span>
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl font-medium mb-3">{p.name}</h3>
                  <p className="text-neutral-600 font-light leading-relaxed mb-4">{p.description}</p>
                  <a href="#" className="text-sm font-medium flex items-center gap-2 text-neutral-500 hover:text-black transition-colors">
                    {p.cta} <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 10: Hover Reveal List
   ═══════════════════════════════════════════════════ */
function V10() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div>
      <SectionLabel n={10} />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-16">{sectionHeader.title}</h2>

        <div className="border-t border-black/10">
          {programs.map((p, i) => (
            <div
              key={p.name}
              className="border-b border-black/10 py-6 md:py-8 cursor-pointer group program-row-hover"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-8">
                  <span className="font-mono-ui text-xs text-neutral-300 w-8">{p.number}</span>
                  <h3 className={`font-heading text-3xl md:text-5xl tracking-tight transition-all duration-300 ${
                    hovered !== null && hovered !== i ? "text-neutral-300" : "text-black"
                  }`}>
                    {p.name}
                  </h3>
                </div>
                <ArrowRight className={`w-5 h-5 transition-all duration-300 ${
                  hovered === i ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
                }`} />
              </div>

              {/* Reveal on hover */}
              <div className={`overflow-hidden transition-all duration-300 ${
                hovered === i ? "max-h-[200px] mt-4 opacity-100" : "max-h-0 opacity-0"
              }`}>
                <div className="pl-16 flex flex-col md:flex-row gap-8">
                  <p className="text-neutral-500 font-light text-sm leading-relaxed max-w-lg">{p.description}</p>
                  <button className="border border-black/20 rounded-full px-5 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors self-start whitespace-nowrap shrink-0">
                    {p.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 11: Stacked Cards w/ Index Number + Stripe Hover
   ═══════════════════════════════════════════════════ */
function V11() {
  return (
    <div>
      <SectionLabel n={11} />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-4">{sectionHeader.title}</h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-12">{sectionHeader.subtitle}</p>
        <div className="space-y-3">
          {programs.map((p) => (
            <div key={p.name} className="border border-black/10 bg-white group program-row-hover transition-colors">
              <div className="flex">
                <div className="w-20 md:w-28 shrink-0 border-r border-black/10 flex items-center justify-center bg-neutral-50 group-hover:bg-neutral-100 transition-colors">
                  <span className="font-heading text-3xl md:text-4xl text-neutral-300 group-hover:text-neutral-500 transition-colors">{p.number}</span>
                </div>
                <div className="flex-1 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="font-heading text-xl md:text-2xl font-medium">{p.name}</h3>
                    <p className="text-neutral-500 font-light text-sm mt-1 hidden md:block max-w-lg">{p.description}</p>
                  </div>
                  <button className="border border-black/20 rounded-full px-5 py-2 text-sm font-medium group-hover:bg-black group-hover:text-white transition-colors shrink-0 self-start">
                    {p.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 12: Marquee-style scrolling tags + detail below
   ═══════════════════════════════════════════════════ */
function V12() {
  const [active, setActive] = useState(0);
  const p = programs[active];
  return (
    <div>
      <SectionLabel n={12} />
      <div className="py-16 md:py-24">
        <div className="px-6">
          <div className="section-tag mb-4">{sectionHeader.tag}</div>
          <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-12">{sectionHeader.title}</h2>
        </div>

        {/* Horizontal pill selector */}
        <div className="border-y border-black/10 px-6 py-4 flex gap-3 overflow-x-auto">
          {programs.map((prog, i) => (
            <button
              key={prog.name}
              onClick={() => setActive(i)}
              className={`shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                active === i ? "bg-black text-white" : "border border-black/10 text-neutral-500 hover:border-black/30 hover:text-black"
              }`}
            >
              {prog.name}
            </button>
          ))}
        </div>

        {/* Detail area */}
        <div className="px-6 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <p.icon className="w-6 h-6 text-neutral-400" />
                <span className="font-mono-ui text-xs text-neutral-400">{p.number} / {String(programs.length).padStart(2, "0")}</span>
              </div>
              <h3 className="font-heading text-3xl md:text-5xl font-medium mb-4">{p.name}</h3>
              <p className="text-neutral-600 font-light leading-relaxed text-lg mb-8">{p.description}</p>
              <div className="flex flex-wrap gap-3">
                <button className="border border-black/20 rounded-full px-6 py-3 text-sm font-medium hover:bg-black hover:text-white transition-colors">
                  {p.cta} <ArrowRight className="w-4 h-4 inline-block ml-1" />
                </button>
                {p.links.map(l => (
                  <a key={l} href="#" className="font-mono-ui text-xs uppercase tracking-wide text-neutral-400 hover:text-black flex items-center gap-1 px-4 py-3">
                    {l} <ArrowUpRight className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
            <div className="aspect-square bg-neutral-100 border border-black/10 flex items-center justify-center">
              <p.icon className="w-20 h-20 text-neutral-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 13: Staggered Offset Cards
   ═══════════════════════════════════════════════════ */
function V13() {
  return (
    <div>
      <SectionLabel n={13} />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-4">{sectionHeader.title}</h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-16">{sectionHeader.subtitle}</p>

        <div className="space-y-6">
          {programs.map((p, i) => (
            <div key={p.name} className="group" style={{ marginLeft: i % 2 === 1 ? "8%" : 0, marginRight: i % 2 === 0 ? "8%" : 0 }}>
              <div className="border border-black/10 bg-white p-8 md:p-10 program-row-hover transition-colors">
                <div className="flex flex-col md:flex-row gap-6 md:gap-12">
                  <div className="md:w-16 shrink-0 flex items-start">
                    <span className="font-heading text-5xl text-neutral-200 group-hover:text-neutral-400 transition-colors">{p.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-2xl md:text-3xl font-medium mb-2">{p.name}</h3>
                    <p className="text-neutral-600 font-light leading-relaxed max-w-xl">{p.description}</p>
                  </div>
                  <div className="flex items-center shrink-0">
                    <a href="#" className="w-12 h-12 border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors">
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 14: Two-Column with Hover Image Swap
   ═══════════════════════════════════════════════════ */
function V14() {
  const [active, setActive] = useState(0);
  const p = programs[active];
  return (
    <div>
      <SectionLabel n={14} />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-12">{sectionHeader.title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-black/10">
          {/* Left: list */}
          <div className="border-r border-black/10">
            {programs.map((prog, i) => (
              <div
                key={prog.name}
                className={`p-6 md:p-8 border-b border-black/10 last:border-b-0 cursor-pointer transition-colors program-row-hover ${
                  active === i ? "bg-neutral-50" : ""
                }`}
                onMouseEnter={() => setActive(i)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <span className="font-mono-ui text-xs text-neutral-400">{prog.number}</span>
                    <h3 className={`font-heading text-xl md:text-2xl font-medium transition-colors ${active === i ? "text-black" : "text-neutral-400"}`}>
                      {prog.name}
                    </h3>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-opacity ${active === i ? "opacity-100" : "opacity-0"}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Right: detail */}
          <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
            <p.icon className="w-10 h-10 text-neutral-300 mb-6" />
            <h3 className="font-heading text-2xl md:text-3xl font-medium mb-3">{p.name}</h3>
            <p className="text-neutral-600 font-light leading-relaxed mb-6">{p.description}</p>
            <button className="border border-black/20 rounded-full px-5 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors self-start">
              {p.cta}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 15: Process Flow (horizontal steps on desktop)
   ═══════════════════════════════════════════════════ */
function V15() {
  return (
    <div>
      <SectionLabel n={15} />
      <div className="px-6 py-16 md:py-24">
        <div className="text-center mb-16">
          <div className="section-tag mb-4 inline-block">{sectionHeader.tag}</div>
          <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-4">{sectionHeader.title}</h2>
          <p className="text-neutral-500 font-light text-base max-w-2xl mx-auto">{sectionHeader.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
          {programs.map((p, i) => (
            <div key={p.name} className={`relative p-6 md:p-8 group program-row-hover ${i < programs.length - 1 ? "border-b md:border-b-0 md:border-r border-black/10" : ""}`}>
              {/* Step connector arrow (desktop) */}
              {i < programs.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-[#f9f9f8] border border-black/10 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-3 h-3 text-neutral-400" />
                </div>
              )}
              <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400 mb-4 block">Step {p.number}</span>
              <div className="w-10 h-10 bg-neutral-100 border border-black/10 flex items-center justify-center mb-4">
                <p.icon className="w-5 h-5 text-neutral-600" />
              </div>
              <h3 className="font-heading text-lg font-medium mb-2">{p.name}</h3>
              <p className="text-neutral-500 font-light text-sm leading-relaxed mb-4">{p.description}</p>
              <a href="#" className="text-xs font-medium flex items-center gap-1 text-neutral-500 hover:text-black transition-colors">
                {p.cta} <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 16: Minimal List with Border-Bottom Accent
   ═══════════════════════════════════════════════════ */
function V16() {
  return (
    <div>
      <SectionLabel n={16} />
      <div className="px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 gap-4">
          <div>
            <div className="section-tag mb-4">{sectionHeader.tag}</div>
            <h2 className="font-heading text-5xl md:text-7xl tracking-tight">{sectionHeader.title}</h2>
          </div>
          <a href="/v2/services" className="inline-flex items-center gap-2 border border-black/20 rounded-full px-6 py-3 text-sm font-medium hover:bg-black hover:text-white transition-colors shrink-0 self-start md:self-auto">
            All programs <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="border-t-2 border-black">
          {programs.map((p) => (
            <div key={p.name} className="border-b border-black/10 py-8 md:py-10 flex flex-col md:flex-row md:items-start gap-6 md:gap-12 group program-row-hover">
              <div className="md:w-1/3 shrink-0">
                <div className="flex items-center gap-3 mb-1">
                  <p.icon className="w-4 h-4 text-neutral-400" />
                  <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">{p.short}</span>
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-medium">{p.name}</h3>
              </div>
              <div className="flex-1">
                <p className="text-neutral-600 font-light leading-relaxed">{p.description}</p>
              </div>
              <div className="shrink-0">
                <button className="border border-black/20 rounded-full px-5 py-2 text-sm font-medium group-hover:bg-black group-hover:text-white transition-colors whitespace-nowrap">
                  {p.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 17: Overlapping Cards (z-stack)
   ═══════════════════════════════════════════════════ */
function V17() {
  return (
    <div>
      <SectionLabel n={17} />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-4">{sectionHeader.title}</h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-12">{sectionHeader.subtitle}</p>

        <div className="space-y-[-1px]">
          {programs.map((p, i) => (
            <div
              key={p.name}
              className="relative bg-white border border-black/10 p-8 md:p-12 group program-row-hover hover:z-10 hover:shadow-lg hover:border-black/20 transition-all"
              style={{ zIndex: i }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex items-center gap-4 md:w-1/3 shrink-0">
                  <div className="w-10 h-10 bg-neutral-50 border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white group-hover:border-black transition-colors">
                    <p.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading text-xl md:text-2xl font-medium">{p.name}</h3>
                </div>
                <p className="text-neutral-500 font-light text-sm leading-relaxed flex-1">{p.description}</p>
                <button className="border border-black/20 rounded-full px-5 py-2 text-sm font-medium group-hover:bg-black group-hover:text-white transition-colors shrink-0 self-start">
                  {p.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 18: Alternating Left/Right Blocks
   ═══════════════════════════════════════════════════ */
function V18() {
  return (
    <div>
      <SectionLabel n={18} />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-4">{sectionHeader.title}</h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-16">{sectionHeader.subtitle}</p>

        <div className="space-y-12">
          {programs.map((p, i) => (
            <div key={p.name} className={`flex flex-col md:flex-row gap-8 items-stretch ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
              {/* Image placeholder */}
              <div className="md:w-1/2 aspect-[3/2] bg-neutral-100 border border-black/10 flex items-center justify-center shrink-0">
                <div className="text-center">
                  <p.icon className="w-12 h-12 text-neutral-200 mx-auto mb-2" />
                  <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-300">[ FIG. {p.number} ]</span>
                </div>
              </div>
              {/* Content */}
              <div className="md:w-1/2 flex flex-col justify-center">
                <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400 mb-3">{p.number} — {p.short}</span>
                <h3 className="font-heading text-2xl md:text-4xl font-medium mb-3">{p.name}</h3>
                <p className="text-neutral-600 font-light leading-relaxed mb-6">{p.description}</p>
                <div className="flex flex-wrap items-center gap-4">
                  <button className="border border-black/20 rounded-full px-5 py-2 text-sm font-medium hover:bg-black hover:text-white transition-colors">
                    {p.cta}
                  </button>
                  {p.links.map(l => (
                    <a key={l} href="#" className="text-xs font-mono-ui uppercase tracking-wide text-neutral-400 hover:text-black flex items-center gap-1">
                      {l} <ArrowRight className="w-3 h-3" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 19: Compact Table/Spreadsheet Style
   ═══════════════════════════════════════════════════ */
function V19() {
  const noiseUrl = `url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;
  return (
    <div>
      <SectionLabel n={19} />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-4">{sectionHeader.title}</h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-12">{sectionHeader.subtitle}</p>

        <div className="border border-black/10 overflow-hidden relative">
          {/* Noise texture behind the table */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: noiseUrl,
              backgroundSize: "512px 512px",
              opacity: 0.18,
              mixBlendMode: "multiply",
            }}
          />
          {/* Header row */}
          <div className="hidden md:flex items-center border-b border-black/10 px-6 py-3 font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400 relative">
            <div className="w-12">#</div>
            <div className="w-1/4">Program</div>
            <div className="flex-1">Description</div>
            <div className="w-40 text-right">Action</div>
          </div>

          {programs.map((p) => (
            <div key={p.name} className="flex flex-col md:flex-row md:items-center border-b border-black/10 last:border-b-0 px-6 py-5 group program-row-hover cursor-pointer relative">
              <div className="hidden md:block w-12 font-mono-ui text-xs text-neutral-400">{p.number}</div>
              <div className="md:w-1/4">
                <h3 className="font-heading text-lg font-medium">{p.name}</h3>
              </div>
              <div className="flex-1 mt-2 md:mt-0">
                <p className="text-neutral-500 font-light text-sm leading-relaxed">{p.description}</p>
              </div>
              <div className="md:w-40 mt-4 md:mt-0 md:text-right">
                <button className="border border-black/20 rounded-full px-4 py-1.5 text-xs font-medium group-hover:bg-black group-hover:text-white transition-colors">
                  {p.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 20: Full-Bleed Hero Cards (one at a time feel)
   ═══════════════════════════════════════════════════ */
function V20() {
  return (
    <div>
      <SectionLabel n={20} />
      <div className="py-16 md:py-24">
        <div className="px-6 mb-12">
          <div className="section-tag mb-4">{sectionHeader.tag}</div>
          <h2 className="font-heading text-5xl md:text-7xl tracking-tight">{sectionHeader.title}</h2>
        </div>

        <div className="space-y-0">
          {programs.map((p, i) => {
            const bgShades = ["bg-neutral-50", "bg-white", "bg-neutral-50", "bg-white"];
            return (
              <div key={p.name} className={`${bgShades[i]} border-t border-black/10 px-6 py-16 md:py-24 group program-row-hover`}>
                <div className="max-w-5xl mx-auto">
                  <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
                    <div className="md:w-1/2">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-14 h-14 border border-black/10 flex items-center justify-center bg-white">
                          <p.icon className="w-6 h-6 text-neutral-600" />
                        </div>
                        <div>
                          <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400 block">{p.number}</span>
                          <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">{p.short}</span>
                        </div>
                      </div>
                      <h3 className="font-heading text-3xl md:text-5xl font-medium mb-4 tracking-tight">{p.name}</h3>
                      <p className="text-neutral-600 font-light leading-relaxed text-base md:text-lg">{p.description}</p>
                    </div>
                    <div className="md:w-1/2 flex flex-col gap-4">
                      <div className="aspect-[4/3] bg-neutral-100 border border-black/10 flex items-center justify-center">
                        <p.icon className="w-16 h-16 text-neutral-200" />
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <button className="border border-black/20 rounded-full px-6 py-3 text-sm font-medium group-hover:bg-black group-hover:text-white transition-colors">
                          {p.cta} <ArrowRight className="w-4 h-4 inline-block ml-1" />
                        </button>
                        {p.links.map(l => (
                          <a key={l} href="#" className="text-xs font-mono-ui uppercase tracking-wide text-neutral-400 hover:text-black flex items-center gap-1">
                            {l} <ArrowUpRight className="w-3 h-3" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */
export default function ExplorePage() {
  return (
    <div className="v2-bg text-[#1a1a1a] text-sm" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}>
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#f9f9f8]/90 backdrop-blur-sm border-b border-black/10">
        <div className="px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl">Growth Studio — 20 Variations</h1>
            <p className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400 mt-1">Scroll to browse, pick what you like</p>
          </div>
          <a href="/v2" className="font-mono-ui text-xs uppercase tracking-wide text-neutral-500 hover:text-black flex items-center gap-2">
            <ArrowRight className="w-3 h-3 rotate-180" /> Back to v2
          </a>
        </div>
      </div>

      <V1 />
      <div className="h-px bg-black/20" />
      <V2 />
      <div className="h-px bg-black/20" />
      <V3 />
      <div className="h-px bg-black/20" />
      <V4 />
      <div className="h-px bg-black/20" />
      <V5 />
      <div className="h-px bg-black/20" />
      <V6 />
      <div className="h-px bg-black/20" />
      <V7 />
      <div className="h-px bg-black/20" />
      <V8 />
      <div className="h-px bg-black/20" />
      <V9 />
      <div className="h-px bg-black/20" />
      <V10 />
      <div className="h-px bg-black/20" />
      <V11 />
      <div className="h-px bg-black/20" />
      <V12 />
      <div className="h-px bg-black/20" />
      <V13 />
      <div className="h-px bg-black/20" />
      <V14 />
      <div className="h-px bg-black/20" />
      <V15 />
      <div className="h-px bg-black/20" />
      <V16 />
      <div className="h-px bg-black/20" />
      <V17 />
      <div className="h-px bg-black/20" />
      <V18 />
      <div className="h-px bg-black/20" />
      <V19 />
      <div className="h-px bg-black/20" />
      <V20 />

      {/* Footer */}
      <div className="border-t border-black/10 px-6 py-12 text-center">
        <p className="font-mono-ui text-xs text-neutral-400 uppercase tracking-widest">End of Growth Studio variations</p>
        <a href="/v2" className="mt-4 inline-flex items-center gap-2 text-sm font-medium hover:text-neutral-600 transition-colors">
          <ArrowRight className="w-3 h-3 rotate-180" /> Back to main site
        </a>
      </div>
    </div>
  );
}
