"use client";

import { ArrowRight, ArrowUpRight, Plus, FolderOpen, Hash, ChevronRight, Terminal, GitBranch, Cpu, BookOpen, Zap, Layers, Play, Lock, Star, Clock, Users, FileText, Code, Database, Folder, ChevronDown, Grid3x3, BarChart3, Search, Shield, Eye, Compass } from "lucide-react";
import { useState } from "react";

/* ── Shared data ── */
const gpItems = [
  { title: "The Foundational Five", type: "Framework", path: "Foundation", desc: "The five pillars every growth system needs before anything else works." },
  { title: "Growth Catalysts: Finding Your Edge", type: "Deep Dive", path: "Foundation", desc: "Identify the unique advantages that make your growth compounding, not linear." },
  { title: "Building Your Growth Model", type: "Framework", path: "Foundation", desc: "Map inputs to outputs. Know exactly which levers drive revenue." },
  { title: "The Meta Ads Scaling System", type: "Playbook", path: "Acquisition", desc: "From $5k/mo to $500k/mo — the system behind profitable Meta scaling." },
  { title: "Positioning That Converts", type: "Deep Dive", path: "Foundation", desc: "Why most positioning fails and the framework that actually moves numbers." },
  { title: "Channel-Market Fit", type: "Framework", path: "Acquisition", desc: "Stop guessing which channels work. Here's how to find out systematically." },
  { title: "Landing Page Conversion Playbook", type: "Playbook", path: "Acquisition", desc: "The anatomy of pages that convert at 2-5x industry average." },
  { title: "Pricing & Packaging Strategy", type: "Deep Dive", path: "Monetization", desc: "Price is a growth lever. Most companies leave 30-50% of revenue on the table." },
  { title: "Retention Flywheels", type: "Framework", path: "Retention", desc: "The systems that turn one-time buyers into compounding revenue." },
  { title: "The Growth Experimentation Process", type: "Playbook", path: "Strategy", desc: "Run experiments that actually teach you something. Ship faster, learn more." },
];

const gpFilterPaths = [
  { name: "Foundation", count: 12 },
  { name: "Acquisition", count: 18 },
  { name: "Monetization", count: 8 },
  { name: "Retention", count: 6 },
  { name: "Strategy", count: 9 },
];

const gpFilterTypes = [
  { name: "Playbook", count: 14 },
  { name: "Framework", count: 12 },
  { name: "Deep Dive", count: 9 },
  { name: "Template", count: 8 },
  { name: "Workshop", count: 6 },
];

const sectionHeader = {
  tag: "Growth Program",
  title: "Build your own growth system",
  count: "50+",
  subtitle: "50+ playbooks, frameworks, and execution guides. An AI co-pilot that knows your business. Everything you need to build a growth system yourself — at your own pace.",
};

function SectionLabel({ n, title }: { n: number; title?: string }) {
  return (
    <div className="sticky top-0 z-20 bg-[#f9f9f8] border-b border-black/10 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">Variation</span>
        <span className="font-heading text-2xl">{n}</span>
        {title && <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400 ml-4">{title}</span>}
      </div>
      <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">Growth Program</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 1: Terminal / CLI (current style refined)
   — File-system aesthetic with path/type columns
   ═══════════════════════════════════════════════════ */
function V1() {
  return (
    <div>
      <SectionLabel n={1} title="Terminal CLI" />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-2">
          {sectionHeader.title} <span className="text-2xl align-top ml-1 font-mono-ui text-neutral-400 font-normal">({sectionHeader.count})</span>
        </h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-8">{sectionHeader.subtitle}</p>

        <div className="border border-black/10">
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-black/10 bg-neutral-50">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <span className="font-mono-ui text-[10px] text-neutral-400 ml-2">~/demand-curve/growth-program</span>
          </div>
          {/* Column headers */}
          <div className="flex items-center border-b border-black/10 px-6 py-3 font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">
            <div className="w-28 shrink-0">/ Path</div>
            <div className="flex-1">/ Module</div>
            <div className="w-28 text-right">/ Type</div>
          </div>
          {gpItems.map((item, i) => (
            <div key={i} className="flex items-center border-b border-black/10 last:border-b-0 px-6 py-5 group program-row-hover cursor-pointer">
              <div className="w-28 shrink-0 text-xs font-mono-ui flex items-center gap-2">
                <div className="w-2 h-2 bg-black shrink-0" /> {item.path}
              </div>
              <div className="flex-1 text-lg md:text-xl font-medium leading-tight">{item.title}</div>
              <div className="w-28 text-right shrink-0">
                <span className="inline-block rounded-sm px-2 py-1 text-[10px] font-mono-ui uppercase tracking-widest border border-black/10 bg-white">{item.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 2: Card Grid — Notion-style database view
   ═══════════════════════════════════════════════════ */
function V2() {
  return (
    <div>
      <SectionLabel n={2} title="Notion Database Cards" />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-2">
          {sectionHeader.title} <span className="text-2xl align-top ml-1 font-mono-ui text-neutral-400 font-normal">({sectionHeader.count})</span>
        </h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-12">{sectionHeader.subtitle}</p>

        {/* Path filter pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button className="px-3 py-1.5 text-xs font-mono-ui uppercase tracking-widest bg-black text-white rounded-sm">All</button>
          {gpFilterPaths.map(p => (
            <button key={p.name} className="px-3 py-1.5 text-xs font-mono-ui uppercase tracking-widest border border-black/10 rounded-sm hover:bg-black hover:text-white transition-colors">
              {p.name} <span className="text-neutral-400 ml-1">{p.count}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gpItems.map((item, i) => (
            <div key={i} className="border border-black/10 p-6 group hover:border-black/30 transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-mono-ui uppercase tracking-widest text-neutral-400 border border-black/10 px-2 py-0.5 rounded-sm">{item.path}</span>
                <span className="text-[10px] font-mono-ui uppercase tracking-widest text-neutral-400">{item.type}</span>
              </div>
              <h3 className="font-heading text-lg font-medium mb-2 group-hover:underline">{item.title}</h3>
              <p className="text-neutral-500 font-light text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 3: Git Log — commit-history aesthetic
   ═══════════════════════════════════════════════════ */
function V3() {
  return (
    <div>
      <SectionLabel n={3} title="Git Log" />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-2">
          {sectionHeader.title} <span className="text-2xl align-top ml-1 font-mono-ui text-neutral-400 font-normal">({sectionHeader.count})</span>
        </h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-12">{sectionHeader.subtitle}</p>

        <div className="relative pl-8 md:pl-12">
          {/* Vertical line */}
          <div className="absolute left-3 md:left-5 top-0 bottom-0 w-px bg-black/10" />

          {gpItems.map((item, i) => (
            <div key={i} className="relative mb-8 last:mb-0 group cursor-pointer">
              {/* Dot on the line */}
              <div className="absolute -left-5 md:-left-7 top-2 w-3 h-3 rounded-full border-2 border-black/20 bg-white group-hover:bg-black group-hover:border-black transition-colors" />
              {/* Branch line */}
              <div className="absolute -left-2 md:-left-4 top-[13px] w-5 md:w-7 h-px bg-black/10" />

              <div className="border border-black/10 p-5 md:p-6 program-row-hover transition-colors">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="font-mono-ui text-[10px] text-neutral-400">
                    <GitBranch className="w-3 h-3 inline-block mr-1" />{item.path.toLowerCase()}/main
                  </span>
                  <span className="font-mono-ui text-[10px] uppercase tracking-widest border border-black/10 px-2 py-0.5 rounded-sm text-neutral-400">{item.type}</span>
                </div>
                <h3 className="font-heading text-xl md:text-2xl font-medium mb-2">{item.title}</h3>
                <p className="text-neutral-500 font-light text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 4: Blueprint / Schematic — technical drawing feel
   ═══════════════════════════════════════════════════ */
function V4() {
  return (
    <div>
      <SectionLabel n={4} title="Blueprint Schematic" />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-2">
          {sectionHeader.title} <span className="text-2xl align-top ml-1 font-mono-ui text-neutral-400 font-normal">({sectionHeader.count})</span>
        </h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-12">{sectionHeader.subtitle}</p>

        <div className="border-2 border-black/10 p-6 md:p-10 relative"
          style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
          {/* Corner marks */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-black/20" />
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-black/20" />
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-black/20" />
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-black/20" />

          <div className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest mb-6">[ SPEC SHEET — GROWTH PROGRAM v3.2 ]</div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gpItems.map((item, i) => (
              <div key={i} className="flex gap-4 group cursor-pointer program-row-hover p-3 -m-3 transition-colors">
                <div className="shrink-0 w-10 h-10 border border-black/20 flex items-center justify-center font-mono-ui text-xs text-neutral-400">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400 mb-1">{item.path} — {item.type}</div>
                  <h3 className="font-heading text-lg font-medium mb-1">{item.title}</h3>
                  <p className="text-neutral-500 font-light text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-dashed border-black/10 font-mono-ui text-[10px] text-neutral-400 flex justify-between">
            <span>TOTAL MODULES: 50+ | PATHS: 5 | TYPES: 5</span>
            <span>REV. 2026.03</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 5: Kanban Board — path-grouped columns
   ═══════════════════════════════════════════════════ */
function V5() {
  const paths = ["Foundation", "Acquisition", "Monetization", "Retention", "Strategy"];
  return (
    <div>
      <SectionLabel n={5} title="Kanban Board" />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-2">
          {sectionHeader.title} <span className="text-2xl align-top ml-1 font-mono-ui text-neutral-400 font-normal">({sectionHeader.count})</span>
        </h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-12">{sectionHeader.subtitle}</p>

        <div className="flex gap-4 overflow-x-auto pb-4">
          {paths.map(path => {
            const items = gpItems.filter(g => g.path === path);
            return (
              <div key={path} className="min-w-[280px] flex-1 border border-black/10">
                <div className="px-4 py-3 border-b border-black/10 bg-neutral-50 flex items-center justify-between">
                  <span className="font-mono-ui text-xs font-semibold uppercase tracking-wide">{path}</span>
                  <span className="font-mono-ui text-[10px] text-neutral-400">{gpFilterPaths.find(p => p.name === path)?.count}</span>
                </div>
                <div className="p-3 space-y-3">
                  {items.map((item, i) => (
                    <div key={i} className="border border-black/10 p-4 bg-white group hover:border-black/30 cursor-pointer transition-colors">
                      <span className="text-[10px] font-mono-ui uppercase tracking-widest text-neutral-400">{item.type}</span>
                      <h3 className="font-heading text-base font-medium mt-1">{item.title}</h3>
                    </div>
                  ))}
                  {items.length === 0 && (
                    <div className="text-neutral-300 text-xs font-mono-ui text-center py-6">+ more modules</div>
                  )}
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
   VARIATION 6: Dark Mode IDE — VSCode-inspired
   ═══════════════════════════════════════════════════ */
function V6() {
  return (
    <div>
      <SectionLabel n={6} title="Dark IDE" />
      <div className="bg-[#1e1e1e] text-white px-6 py-16 md:py-24">
        <div className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-500 mb-4 border border-neutral-700 inline-block px-2 py-1">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-2 text-white">
          {sectionHeader.title} <span className="text-2xl align-top ml-1 font-mono-ui text-neutral-500 font-normal">({sectionHeader.count})</span>
        </h2>
        <p className="text-neutral-400 font-light text-base max-w-3xl mb-12">{sectionHeader.subtitle}</p>

        <div className="border border-neutral-700 bg-[#252526]">
          {/* Tab bar */}
          <div className="flex border-b border-neutral-700">
            {gpFilterPaths.slice(0, 4).map((p, i) => (
              <div key={p.name} className={`px-4 py-2.5 text-xs font-mono-ui border-r border-neutral-700 cursor-pointer ${i === 0 ? "bg-[#1e1e1e] text-white border-t-2 border-t-blue-500" : "text-neutral-500 hover:text-white"}`}>
                <FileText className="w-3 h-3 inline-block mr-1.5 opacity-50" />{p.name.toLowerCase()}.md
              </div>
            ))}
          </div>
          {/* Line numbers + content */}
          <div className="font-mono-ui text-sm">
            {gpItems.map((item, i) => (
              <div key={i} className="flex border-b border-neutral-700/50 last:border-b-0 hover:bg-white/[0.04] cursor-pointer group transition-colors">
                <div className="w-12 shrink-0 text-right pr-4 py-4 text-neutral-600 text-xs select-none">{i + 1}</div>
                <div className="flex-1 py-4 pr-6">
                  <div className="flex items-center gap-3">
                    <span className="text-blue-400">const</span>
                    <span className="text-yellow-300">{item.title.replace(/[^a-zA-Z]/g, "").slice(0, 20)}</span>
                    <span className="text-neutral-500">=</span>
                    <span className="text-green-400">&quot;{item.path}&quot;</span>
                    <span className="text-neutral-600 ml-auto text-xs">// {item.type}</span>
                  </div>
                  <p className="text-neutral-500 text-xs mt-1 pl-0 opacity-0 group-hover:opacity-100 transition-opacity">{item.desc}</p>
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
   VARIATION 7: Periodic Table — element-style grid
   ═══════════════════════════════════════════════════ */
function V7() {
  const symbols = ["Ga", "Gc", "Gm", "Ma", "Pc", "Cm", "Lp", "Pp", "Rf", "Ge"];
  return (
    <div>
      <SectionLabel n={7} title="Periodic Table" />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-2">
          {sectionHeader.title} <span className="text-2xl align-top ml-1 font-mono-ui text-neutral-400 font-normal">({sectionHeader.count})</span>
        </h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-12">{sectionHeader.subtitle}</p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {gpItems.map((item, i) => (
            <div key={i} className="border border-black/10 p-4 group hover:border-black/40 cursor-pointer transition-colors aspect-square flex flex-col justify-between program-row-hover">
              <div>
                <div className="flex justify-between items-start">
                  <span className="font-mono-ui text-[10px] text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">{item.type}</span>
                </div>
                <div className="font-heading text-3xl md:text-4xl font-medium mt-2">{symbols[i]}</div>
              </div>
              <div>
                <div className="font-heading text-sm font-medium">{item.title}</div>
                <div className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400 mt-1">{item.path}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 8: API Reference — endpoint docs style
   ═══════════════════════════════════════════════════ */
function V8() {
  const methods = ["GET", "POST", "GET", "POST", "GET", "GET", "POST", "GET", "GET", "POST"];
  const methodColors: Record<string, string> = { GET: "text-green-600 bg-green-50 border-green-200", POST: "text-blue-600 bg-blue-50 border-blue-200" };
  return (
    <div>
      <SectionLabel n={8} title="API Reference" />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-2">
          {sectionHeader.title} <span className="text-2xl align-top ml-1 font-mono-ui text-neutral-400 font-normal">({sectionHeader.count})</span>
        </h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-12">{sectionHeader.subtitle}</p>

        <div className="border border-black/10">
          <div className="px-6 py-3 border-b border-black/10 bg-neutral-50 font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">
            API v3 — Growth Program Endpoints
          </div>
          {gpItems.map((item, i) => (
            <div key={i} className="flex items-start gap-4 border-b border-black/10 last:border-b-0 px-6 py-5 group program-row-hover cursor-pointer">
              <span className={`shrink-0 font-mono-ui text-[10px] font-semibold uppercase px-2 py-1 rounded border ${methodColors[methods[i]]}`}>
                {methods[i]}
              </span>
              <div className="flex-1">
                <div className="font-mono-ui text-sm text-neutral-600 mb-1">
                  /v3/{item.path.toLowerCase()}/{item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}
                </div>
                <h3 className="font-heading text-lg font-medium">{item.title}</h3>
                <p className="text-neutral-500 font-light text-sm mt-1">{item.desc}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-black transition-colors shrink-0 mt-1" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 9: Newspaper / Broadsheet — editorial columns
   ═══════════════════════════════════════════════════ */
function V9() {
  return (
    <div>
      <SectionLabel n={9} title="Newspaper Broadsheet" />
      <div className="px-6 py-16 md:py-24">
        {/* Masthead */}
        <div className="text-center border-b-2 border-black pb-4 mb-6">
          <div className="font-mono-ui text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-2">The Demand Curve Dispatch — Volume III</div>
          <h2 className="font-heading text-5xl md:text-7xl tracking-tight">{sectionHeader.title}</h2>
          <div className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400 mt-2">{sectionHeader.count} modules across 5 disciplines</div>
        </div>
        <div className="border-b border-black/10 mb-8 pb-4">
          <p className="text-neutral-500 font-light text-base max-w-3xl mx-auto text-center italic">{sectionHeader.subtitle}</p>
        </div>

        {/* 3-column newspaper layout */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8" style={{ columnRule: "1px solid rgba(0,0,0,0.1)" }}>
          {gpItems.map((item, i) => (
            <div key={i} className="break-inside-avoid mb-6 group cursor-pointer">
              <div className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400 mb-1">{item.path} — {item.type}</div>
              <h3 className="font-heading text-xl font-medium mb-2 group-hover:underline">{item.title}</h3>
              <p className="text-neutral-600 font-light text-sm leading-relaxed">{item.desc}</p>
              {i < 3 && <div className="border-b border-black/10 mt-6" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 10: Accordion FAQ — expand to reveal
   ═══════════════════════════════════════════════════ */
function V10() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      <SectionLabel n={10} title="Accordion FAQ" />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-2">
          {sectionHeader.title} <span className="text-2xl align-top ml-1 font-mono-ui text-neutral-400 font-normal">({sectionHeader.count})</span>
        </h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-12">{sectionHeader.subtitle}</p>

        <div className="border-t border-black/10">
          {gpItems.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-black/10">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-6 px-2 text-left group program-row-hover"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono-ui text-xs text-neutral-400 w-6">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="font-heading text-xl md:text-2xl font-medium">{item.title}</h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden md:inline font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">{item.type}</span>
                    <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </div>
                </button>
                {isOpen && (
                  <div className="pb-6 px-2 pl-12">
                    <div className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400 mb-2">{item.path}</div>
                    <p className="text-neutral-600 font-light leading-relaxed max-w-2xl">{item.desc}</p>
                    <a href="#" className="mt-4 inline-flex items-center gap-2 text-sm font-medium hover:text-black transition-colors">
                      Start this module <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 11: Circuit Board — connected nodes
   ═══════════════════════════════════════════════════ */
function V11() {
  return (
    <div>
      <SectionLabel n={11} title="Circuit Board" />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-2">
          {sectionHeader.title} <span className="text-2xl align-top ml-1 font-mono-ui text-neutral-400 font-normal">({sectionHeader.count})</span>
        </h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-12">{sectionHeader.subtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border border-black/10">
          {gpItems.map((item, i) => (
            <div key={i} className={`p-6 border-b border-black/10 ${i % 2 === 0 ? "md:border-r" : ""} group cursor-pointer program-row-hover relative`}>
              {/* Node indicator */}
              <div className="absolute top-6 left-6 w-2.5 h-2.5 rounded-full border-2 border-black/20 group-hover:bg-black group-hover:border-black transition-colors" />
              <div className="pl-6">
                <div className="flex items-center gap-2 mb-2">
                  <Cpu className="w-3.5 h-3.5 text-neutral-400" />
                  <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">{item.path} / {item.type}</span>
                </div>
                <h3 className="font-heading text-lg font-medium mb-1">{item.title}</h3>
                <p className="text-neutral-500 font-light text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 12: Playlist / Queue — Spotify-style
   ═══════════════════════════════════════════════════ */
function V12() {
  return (
    <div>
      <SectionLabel n={12} title="Playlist Queue" />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-2">
          {sectionHeader.title} <span className="text-2xl align-top ml-1 font-mono-ui text-neutral-400 font-normal">({sectionHeader.count})</span>
        </h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-12">{sectionHeader.subtitle}</p>

        <div className="border border-black/10">
          {/* Header row */}
          <div className="hidden md:flex items-center px-6 py-3 border-b border-black/10 font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">
            <div className="w-10">#</div>
            <div className="flex-1">Title</div>
            <div className="w-32">Path</div>
            <div className="w-24 text-right">Type</div>
            <div className="w-12 text-right"><Clock className="w-3 h-3 inline-block" /></div>
          </div>
          {gpItems.map((item, i) => (
            <div key={i} className="flex items-center px-6 py-4 border-b border-black/10 last:border-b-0 group program-row-hover cursor-pointer">
              <div className="w-10 shrink-0 font-mono-ui text-sm text-neutral-400 group-hover:hidden">{i + 1}</div>
              <div className="w-10 shrink-0 hidden group-hover:block"><Play className="w-4 h-4" /></div>
              <div className="flex-1 min-w-0">
                <h3 className="font-heading text-base font-medium truncate">{item.title}</h3>
                <p className="text-neutral-500 text-xs truncate md:hidden">{item.path} · {item.type}</p>
              </div>
              <div className="hidden md:block w-32 text-sm text-neutral-500">{item.path}</div>
              <div className="hidden md:block w-24 text-right">
                <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">{item.type}</span>
              </div>
              <div className="w-12 text-right font-mono-ui text-xs text-neutral-400">{15 + i * 3}m</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 13: Map / Atlas — geographic exploration
   ═══════════════════════════════════════════════════ */
function V13() {
  return (
    <div>
      <SectionLabel n={13} title="Atlas Explorer" />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-2">
          {sectionHeader.title} <span className="text-2xl align-top ml-1 font-mono-ui text-neutral-400 font-normal">({sectionHeader.count})</span>
        </h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-12">{sectionHeader.subtitle}</p>

        {/* Path "regions" */}
        {gpFilterPaths.map(path => {
          const items = gpItems.filter(g => g.path === path.name);
          if (items.length === 0) return null;
          return (
            <div key={path.name} className="mb-10 last:mb-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 border border-black/20 flex items-center justify-center">
                  <Compass className="w-4 h-4 text-neutral-400" />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-medium">{path.name}</h3>
                  <span className="font-mono-ui text-[10px] text-neutral-400">{path.count} modules in region</span>
                </div>
                <div className="flex-1 h-px bg-black/10 ml-4" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-11">
                {items.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 border border-black/10 group cursor-pointer hover:border-black/30 transition-colors program-row-hover">
                    <div className="w-1.5 h-1.5 rounded-full bg-black/20 mt-2 group-hover:bg-black shrink-0" />
                    <div>
                      <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">{item.type}</span>
                      <h4 className="font-heading text-base font-medium">{item.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 14: Recipe Cards — cooking instruction feel
   ═══════════════════════════════════════════════════ */
function V14() {
  return (
    <div>
      <SectionLabel n={14} title="Recipe Cards" />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-2">
          {sectionHeader.title} <span className="text-2xl align-top ml-1 font-mono-ui text-neutral-400 font-normal">({sectionHeader.count})</span>
        </h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-12">{sectionHeader.subtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {gpItems.map((item, i) => (
            <div key={i} className="border border-black/10 group cursor-pointer hover:border-black/30 transition-colors">
              <div className="px-5 py-3 border-b border-black/10 bg-neutral-50 flex items-center justify-between">
                <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">Recipe #{String(i + 1).padStart(2, "0")}</span>
                <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">{item.path}</span>
              </div>
              <div className="p-5">
                <h3 className="font-heading text-xl font-medium mb-2">{item.title}</h3>
                <p className="text-neutral-500 font-light text-sm leading-relaxed mb-4">{item.desc}</p>
                <div className="flex items-center gap-4 text-[10px] font-mono-ui uppercase tracking-widest text-neutral-400">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {15 + i * 5}min</span>
                  <span className="flex items-center gap-1"><Layers className="w-3 h-3" /> {item.type}</span>
                  <span className="flex items-center gap-1"><BarChart3 className="w-3 h-3" /> Intermediate</span>
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
   VARIATION 15: Skill Tree — game-style progression
   ═══════════════════════════════════════════════════ */
function V15() {
  return (
    <div>
      <SectionLabel n={15} title="Skill Tree" />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-2">
          {sectionHeader.title} <span className="text-2xl align-top ml-1 font-mono-ui text-neutral-400 font-normal">({sectionHeader.count})</span>
        </h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-12">{sectionHeader.subtitle}</p>

        <div className="space-y-1">
          {gpItems.map((item, i) => {
            const unlocked = i < 3;
            return (
              <div key={i} className={`flex items-center gap-4 p-5 border border-black/10 group cursor-pointer transition-colors ${unlocked ? "program-row-hover" : "opacity-60"}`}>
                <div className={`w-10 h-10 rounded-full border-2 flex items-center justify-center shrink-0 ${unlocked ? "border-black bg-black text-white" : "border-black/10 bg-white text-neutral-300"}`}>
                  {unlocked ? <Zap className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="font-heading text-lg font-medium">{item.title}</h3>
                    {unlocked && <span className="text-[10px] font-mono-ui text-green-600 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded-sm uppercase">Unlocked</span>}
                  </div>
                  <p className="text-neutral-500 font-light text-sm truncate">{item.desc}</p>
                </div>
                <div className="hidden md:flex items-center gap-3 shrink-0">
                  <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">{item.path}</span>
                  <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400 border border-black/10 px-2 py-0.5 rounded-sm">{item.type}</span>
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
   VARIATION 16: Lab Report — scientific documentation
   ═══════════════════════════════════════════════════ */
function V16() {
  return (
    <div>
      <SectionLabel n={16} title="Lab Report" />
      <div className="px-6 py-16 md:py-24">
        <div className="border border-black/10 p-6 md:p-10">
          <div className="flex justify-between items-start mb-8 border-b border-black/10 pb-6">
            <div>
              <div className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400 mb-2">DEMAND CURVE RESEARCH LAB — REPORT #{String(new Date().getFullYear()).slice(2)}-003</div>
              <h2 className="font-heading text-4xl md:text-5xl tracking-tight">{sectionHeader.title}</h2>
            </div>
            <div className="font-mono-ui text-[10px] text-neutral-400 text-right">
              <div>CLASSIFICATION: OPEN</div>
              <div>MODULES: {sectionHeader.count}</div>
              <div>STATUS: ACTIVE</div>
            </div>
          </div>

          <div className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400 mb-2">ABSTRACT</div>
          <p className="text-neutral-600 font-light text-base mb-10 max-w-3xl border-l-2 border-black/10 pl-4">{sectionHeader.subtitle}</p>

          <div className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400 mb-4">FINDINGS</div>
          <div className="space-y-4">
            {gpItems.map((item, i) => (
              <div key={i} className="flex gap-4 group cursor-pointer program-row-hover p-3 -mx-3 border-b border-dotted border-black/10 last:border-b-0 transition-colors">
                <div className="font-mono-ui text-xs text-neutral-400 shrink-0 w-8 pt-0.5">§{i + 1}</div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-heading text-lg font-medium">{item.title}</h3>
                    <span className="font-mono-ui text-[10px] text-neutral-400 border border-black/10 px-1.5 py-0.5">{item.type}</span>
                  </div>
                  <p className="text-neutral-500 font-light text-sm">{item.desc}</p>
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
   VARIATION 17: Trading Dashboard — Bloomberg-style
   ═══════════════════════════════════════════════════ */
function V17() {
  return (
    <div>
      <SectionLabel n={17} title="Trading Dashboard" />
      <div className="bg-[#0a0a0a] text-white px-6 py-16 md:py-24">
        <div className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-600 mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-2">
          {sectionHeader.title} <span className="text-2xl align-top ml-1 font-mono-ui text-neutral-600 font-normal">({sectionHeader.count})</span>
        </h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-12">{sectionHeader.subtitle}</p>

        {/* Stats bar */}
        <div className="flex flex-wrap gap-6 mb-8 py-4 border-y border-neutral-800 font-mono-ui text-xs">
          {gpFilterPaths.map(p => (
            <div key={p.name} className="flex items-center gap-2">
              <span className="text-neutral-600">{p.name.toUpperCase()}</span>
              <span className="text-green-400">{p.count}</span>
              <span className="text-green-400 text-[10px]">▲</span>
            </div>
          ))}
        </div>

        {/* Ticker-style rows */}
        <div className="border border-neutral-800">
          {gpItems.map((item, i) => (
            <div key={i} className="flex items-center border-b border-neutral-800 last:border-b-0 px-4 py-4 hover:bg-white/[0.03] cursor-pointer group transition-colors">
              <div className="w-10 font-mono-ui text-xs text-neutral-600">{String(i + 1).padStart(2, "0")}</div>
              <div className="flex-1">
                <div className="font-heading text-base font-medium text-white">{item.title}</div>
                <div className="font-mono-ui text-[10px] text-neutral-600 mt-0.5">{item.path.toUpperCase()}</div>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <span className="font-mono-ui text-xs text-neutral-500 border border-neutral-800 px-2 py-0.5">{item.type}</span>
                <span className="font-mono-ui text-xs text-green-400">ACTIVE</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 18: Museum Exhibit — gallery labels
   ═══════════════════════════════════════════════════ */
function V18() {
  return (
    <div>
      <SectionLabel n={18} title="Museum Gallery" />
      <div className="px-6 py-16 md:py-24">
        <div className="text-center mb-16">
          <div className="section-tag mb-4 inline-block">{sectionHeader.tag}</div>
          <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-4">{sectionHeader.title}</h2>
          <p className="text-neutral-500 font-light text-base max-w-2xl mx-auto">{sectionHeader.subtitle}</p>
        </div>

        <div className="space-y-16 max-w-3xl mx-auto">
          {gpItems.map((item, i) => (
            <div key={i} className="group cursor-pointer">
              {/* Exhibit placeholder */}
              <div className="aspect-[16/7] border border-black/10 mb-6 flex items-center justify-center program-row-hover transition-colors"
                style={{ backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)", backgroundSize: "16px 16px" }}>
                <span className="font-mono-ui text-neutral-300 text-[10px] uppercase tracking-[0.3em]">[ Exhibit {String(i + 1).padStart(2, "0")} ]</span>
              </div>
              {/* Label */}
              <div className="max-w-lg">
                <h3 className="font-heading text-2xl font-medium mb-2">{item.title}</h3>
                <p className="text-neutral-600 font-light text-sm leading-relaxed mb-3">{item.desc}</p>
                <div className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">
                  {item.path} — {item.type} — Module {String(i + 1).padStart(2, "0")} of {sectionHeader.count}
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
   VARIATION 19: Inventory / RPG — item list with stats
   ═══════════════════════════════════════════════════ */
function V19() {
  const rarities = ["Common", "Uncommon", "Rare", "Epic", "Uncommon", "Rare", "Epic", "Legendary", "Rare", "Epic"];
  const rarityColors: Record<string, string> = {
    Common: "text-neutral-400 border-neutral-200",
    Uncommon: "text-green-600 border-green-200",
    Rare: "text-blue-600 border-blue-200",
    Epic: "text-purple-600 border-purple-200",
    Legendary: "text-amber-600 border-amber-200",
  };
  return (
    <div>
      <SectionLabel n={19} title="RPG Inventory" />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-2">
          {sectionHeader.title} <span className="text-2xl align-top ml-1 font-mono-ui text-neutral-400 font-normal">({sectionHeader.count})</span>
        </h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-12">{sectionHeader.subtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {gpItems.map((item, i) => {
            const rarity = rarities[i];
            return (
              <div key={i} className={`border p-5 group cursor-pointer program-row-hover transition-colors ${rarityColors[rarity]}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-mono-ui text-[10px] uppercase tracking-widest ${rarityColors[rarity].split(" ")[0]}`}>{rarity}</span>
                  <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">{item.type}</span>
                </div>
                <h3 className="font-heading text-lg font-medium text-black mb-1">{item.title}</h3>
                <p className="text-neutral-500 font-light text-sm mb-3">{item.desc}</p>
                <div className="flex gap-4 font-mono-ui text-[10px] text-neutral-400">
                  <span>PWR {20 + i * 8}</span>
                  <span>DEF {10 + i * 3}</span>
                  <span>+{item.path}</span>
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
   VARIATION 20: Radio Dial — frequency-tuning aesthetic
   ═══════════════════════════════════════════════════ */
function V20() {
  return (
    <div>
      <SectionLabel n={20} title="Radio Frequencies" />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-2">
          {sectionHeader.title} <span className="text-2xl align-top ml-1 font-mono-ui text-neutral-400 font-normal">({sectionHeader.count})</span>
        </h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-12">{sectionHeader.subtitle}</p>

        <div className="space-y-0">
          {gpItems.map((item, i) => {
            const freq = (88.1 + i * 2.2).toFixed(1);
            return (
              <div key={i} className="flex items-stretch border-b border-black/10 first:border-t group cursor-pointer program-row-hover">
                {/* Frequency dial */}
                <div className="w-20 md:w-28 shrink-0 border-r border-black/10 flex flex-col items-center justify-center py-5">
                  <span className="font-heading text-xl md:text-2xl font-medium">{freq}</span>
                  <span className="font-mono-ui text-[10px] text-neutral-400">FM</span>
                </div>
                {/* Signal strength bars */}
                <div className="w-12 md:w-16 shrink-0 border-r border-black/10 flex items-end justify-center gap-0.5 py-5 px-2">
                  {[1, 2, 3, 4, 5].map(bar => (
                    <div key={bar} className={`w-1.5 rounded-sm transition-colors ${bar <= 3 + (i % 3) ? "bg-black/60 group-hover:bg-black" : "bg-black/10"}`} style={{ height: `${bar * 5}px` }} />
                  ))}
                </div>
                {/* Content */}
                <div className="flex-1 py-5 px-5 md:px-6">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-heading text-lg font-medium">{item.title}</h3>
                  </div>
                  <div className="flex items-center gap-3 font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">
                    <span>{item.path}</span>
                    <span>·</span>
                    <span>{item.type}</span>
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
export default function GrowthProgramExplorePage() {
  return (
    <div className="v2-bg text-[#1a1a1a] text-sm" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}>
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#f9f9f8]/90 backdrop-blur-sm border-b border-black/10">
        <div className="px-6 py-6 flex items-center justify-between">
          <div>
            <h1 className="font-heading text-2xl">Growth Program — 20 Variations</h1>
            <p className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400 mt-1">Scroll to browse, pick what you like</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="/v2/explore" className="font-mono-ui text-xs uppercase tracking-wide text-neutral-500 hover:text-black flex items-center gap-2">
              Growth Studio variations
            </a>
            <a href="/v2" className="font-mono-ui text-xs uppercase tracking-wide text-neutral-500 hover:text-black flex items-center gap-2">
              <ArrowRight className="w-3 h-3 rotate-180" /> Back to v2
            </a>
          </div>
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
        <p className="font-mono-ui text-xs text-neutral-400 uppercase tracking-widest">End of Growth Program variations</p>
        <a href="/v2" className="mt-4 inline-flex items-center gap-2 text-sm font-medium hover:text-neutral-600 transition-colors">
          <ArrowRight className="w-3 h-3 rotate-180" /> Back to main site
        </a>
      </div>
    </div>
  );
}
