import {
  ArrowRight,
  FolderOpen,
  Hash,
  Plus,
} from "lucide-react";
import V2Nav from "./V2Nav";
import GridOverlay from "./GridOverlay";
import HeroSection from "./HeroSection";

export const metadata = {
  title: "Demand Curve — We Help Startups Build Growth Systems",
  description:
    "For the founders, operators, and builders competing against companies with 10x their budget. Strategy, systems, and execution from a decade of working with 4,500+ startups.",
};

const programs = [
  {
    name: "Growth Architecture",
    description:
      "We audit, design, and build your complete growth system — market positioning, channel strategy, growth model, and the operating system to scale it.",
    cta: "Start a conversation",
    links: ["How It Works", "See Case Studies"],
  },
  {
    name: "Paid Acquisition Engines",
    description:
      "Your paid growth engine — designed, launched, and scaled. Strategy, creative, media buying, and measurement built as a system, not a collection of campaigns.",
    cta: "Scale your paid channels",
    links: ["How It Works", "See Results"],
  },
  {
    name: "AI Search Engines",
    description:
      "AI is rewriting how buyers discover products. We build the system that ensures your brand shows up when AI answers your buyers' questions.",
    cta: "Get your AI brand audit",
    links: ["Learn about AI Search", "Visit Saturation"],
  },
  {
    name: "Story Systems",
    description:
      "Your positioning and messaging aren't a one-time exercise. They're the operating system your entire go-to-market runs on.",
    cta: "Build your narrative",
    links: ["How Story Systems Work"],
  },
];


const gpItems = [
  { title: "The Foundational Five", type: "Framework", path: "Foundation" },
  { title: "Growth Catalysts: Finding Your Edge", type: "Deep Dive", path: "Foundation" },
  { title: "Building Your Growth Model", type: "Framework", path: "Foundation" },
  { title: "The Meta Ads Scaling System", type: "Playbook", path: "Acquisition" },
  { title: "Positioning That Converts", type: "Deep Dive", path: "Foundation" },
  { title: "Channel-Market Fit", type: "Framework", path: "Acquisition" },
  { title: "Landing Page Conversion Playbook", type: "Playbook", path: "Acquisition" },
  { title: "Pricing & Packaging Strategy", type: "Deep Dive", path: "Monetization" },
  { title: "Retention Flywheels", type: "Framework", path: "Retention" },
  { title: "The Growth Experimentation Process", type: "Playbook", path: "Strategy" },
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
  { name: "Deep Dive", count: 10 },
  { name: "Worksheet", count: 8 },
  { name: "Case Study", count: 6 },
];

const socialProofLogos = [
  "Envoy", "Clearbit", "Segment", "Framer", "Superhuman", "OpenPhone",
  "Notion", "Linear", "Vercel", "Figma", "Loom", "Airtable", "Retool",
  "Webflow", "Supabase", "PostHog", "Resend", "Cal.com", "Clerk",
  "Raycast", "Descript", "Pitch", "Miro", "Coda", "Rows",
  "Spline", "Railway", "Fly.io", "Render", "Neon", "Prisma",
  "Stytch", "WorkOS", "Hightouch", "Census", "Algolia", "Typesense",
  "Inngest", "Trigger.dev", "Knock", "Loops", "Attio", "Clay",
  "Vanta", "Drata", "Secureframe", "Ramp", "Brex", "Mercury",
  "Deel", "Remote", "Rippling",
];

const recentNewsletters = [
  { title: "Your Growth Experiments Are Lying to You", type: "Tactics" },
  { title: "Stop Pulling the Wrong Growth Levers", type: "Strategy" },
  { title: "How Two Words Generated Millions in Revenue", type: "Case Study" },
  { title: "The Channel Most Startups Pick Wrong", type: "Framework" },
  { title: "Why Your Positioning Isn't Landing", type: "Deep Dive" },
];

export default function V2Page() {
  return (
    <div className="v2-world v2-bg text-[#1a1a1a] text-sm overflow-x-hidden selection:bg-yellow-200 selection:text-black" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", position: "relative", zIndex: 2 }}>
      {/* Outer vertical lines — 16px outside the 1440px barrier lines, full page height */}
      {/* Checkerboard — 1px squares filling everything past the outer lines + 16px gap */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Outer vertical lines */}
        <div className="absolute top-0 bottom-0 left-1/2 pointer-events-none" style={{ width: "1440px", marginLeft: "-720px" }}>
          <div className="absolute top-0 bottom-0" style={{ left: -16, borderLeft: "1px solid rgba(0,0,0,0.06)" }} />
          <div className="absolute top-0 bottom-0" style={{ left: -32, borderLeft: "1px solid rgba(0,0,0,0.06)" }} />
          <div className="absolute top-0 bottom-0" style={{ right: -16, borderRight: "1px solid rgba(0,0,0,0.06)" }} />
          <div className="absolute top-0 bottom-0" style={{ right: -32, borderRight: "1px solid rgba(0,0,0,0.06)" }} />
        </div>
        {/* Viewport edge lines — 16px and 32px from each viewport edge */}
        <div className="absolute top-0 bottom-0" style={{ left: 16, borderLeft: "1px solid rgba(0,0,0,0.06)" }} />
        <div className="absolute top-0 bottom-0" style={{ left: 32, borderLeft: "1px solid rgba(0,0,0,0.06)" }} />
        <div className="absolute top-0 bottom-0" style={{ right: 16, borderRight: "1px solid rgba(0,0,0,0.06)" }} />
        <div className="absolute top-0 bottom-0" style={{ right: 32, borderRight: "1px solid rgba(0,0,0,0.06)" }} />

        {/* Left checkerboard — between viewport edge lines and 1440 outer lines */}
        <div
          className="absolute top-0 bottom-0"
          style={{
            left: 32,
            width: "calc((100% - 1440px) / 2 - 64px)",
            background: "repeating-conic-gradient(#e4e8ec 0% 25%, #eef1f4 0% 50%) 0 0 / 5px 5px",
          }}
        />
        {/* Right checkerboard */}
        <div
          className="absolute top-0 bottom-0"
          style={{
            right: 32,
            width: "calc((100% - 1440px) / 2 - 64px)",
            background: "repeating-conic-gradient(#e4e8ec 0% 25%, #eef1f4 0% 50%) 0 0 / 5px 5px",
          }}
        />
        {/* Drop shadows — casting inward onto the checkerboard from both line pairs */}
        {/* From left viewport lines, casting right */}
        <div
          className="absolute top-0 bottom-0"
          style={{
            left: 32,
            width: 16,
            background: "linear-gradient(to right, rgba(0,0,0,0.015), transparent)",
            pointerEvents: "none",
          }}
        />
        {/* From left 1440 lines, casting left */}
        <div
          className="absolute top-0 bottom-0"
          style={{
            left: "calc((100% - 1440px) / 2 - 48px)",
            width: 16,
            background: "linear-gradient(to left, rgba(0,0,0,0.015), transparent)",
            pointerEvents: "none",
          }}
        />
        {/* From right 1440 lines, casting right */}
        <div
          className="absolute top-0 bottom-0"
          style={{
            left: "calc((100% + 1440px) / 2 + 32px)",
            width: 16,
            background: "linear-gradient(to right, rgba(0,0,0,0.015), transparent)",
            pointerEvents: "none",
          }}
        />
        {/* From right viewport lines, casting left */}
        <div
          className="absolute top-0 bottom-0"
          style={{
            right: 32,
            width: 16,
            background: "linear-gradient(to left, rgba(0,0,0,0.015), transparent)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* 1. NAVIGATION */}
      <V2Nav />

      {/* 1440px master container — 16px padding so horizontal lines don't touch barrier lines */}
      <div className="max-w-[1440px] mx-auto px-4 relative">
        {/* Barrier lines — vertical edges */}
        <div className="absolute inset-0 pointer-events-none border-r border-b border-black/[0.08]" style={{ zIndex: 3 }}>
          <div className="absolute left-0 top-0 bottom-0" style={{ borderLeft: "1px solid rgba(0,0,0,0.06)" }} />
          <div className="absolute right-0 top-0 bottom-0" style={{ borderRight: "1px solid rgba(0,0,0,0.06)" }} />
        </div>

        {/* 2. HERO — grid-aligned hero with staircase image */}
        <div className="relative">
          {/* Horizontal line fills in the side gutters (between grid edge lines and 1440px barrier). */}
          <div
            className="absolute pointer-events-none"
            style={{
              left: 0,
              width: "clamp(16px, calc((100% - 1380px) / 2), 30px)",
              top: 64,
              bottom: 26,
              zIndex: 0,
              backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 6px)",
            }}
          />
          <div
            className="absolute pointer-events-none"
            style={{
              right: 0,
              width: "clamp(16px, calc((100% - 1380px) / 2), 30px)",
              top: 64,
              bottom: 26,
              zIndex: 0,
              backgroundImage: "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0px, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 6px)",
            }}
          />

          <GridOverlay columns={7} gapSize={16} sidePadding={24} maxWidth={1380} lineColor="rgba(0,0,0,0.06)" className="">
            <HeroSection />
          </GridOverlay>
        </div>

        {/* Line section — lines that start dense and spread out, fading in opacity */}
        <div
          className="relative"
          style={{
            marginLeft: -16,
            marginRight: -16,
            height: 60,
            minHeight: 40,
          }}
        >
          {[
            { y: 0, opacity: 0.10 },
            { y: 3, opacity: 0.09 },
            { y: 7, opacity: 0.08 },
            { y: 12, opacity: 0.07 },
            { y: 18, opacity: 0.06 },
            { y: 25, opacity: 0.05 },
            { y: 33, opacity: 0.04 },
            { y: 42, opacity: 0.03 },
            { y: 52, opacity: 0.02 },
            { y: 59, opacity: 0.01 },
          ].map((line, i) => (
            <div
              key={i}
              className="absolute left-0 right-0"
              style={{
                top: line.y,
                height: 1,
                backgroundColor: `rgba(0,0,0,${line.opacity})`,
              }}
            />
          ))}
        </div>

        {/* 4. MANIFESTO BLOCK — grid-framed container with corner marks */}
        <section className="py-20 md:py-28">
          {/* Grid frame — edge-only squares with corner caps. 50px cells, 1300×800 = 26×16 perfect grid */}
          <div
            className="relative mx-auto max-w-[1300px]"
            style={{ height: 800 }}
          >
            {/* Grid pattern — masked to show only the 1-cell-thick border frame */}
            <div
              className="absolute inset-0 pointer-events-none border-r border-b border-black/[0.08]"
              style={{
                backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px)",
                backgroundSize: "50px 50px",
                WebkitMaskImage: "linear-gradient(to bottom, black 51px, transparent 51px, transparent calc(100% - 51px), black calc(100% - 51px)), linear-gradient(to right, black 51px, transparent 51px, transparent calc(100% - 51px), black calc(100% - 51px))",
                WebkitMaskComposite: "source-over",
                maskImage: "linear-gradient(to bottom, black 51px, transparent 51px, transparent calc(100% - 51px), black calc(100% - 51px)), linear-gradient(to right, black 51px, transparent 51px, transparent calc(100% - 51px), black calc(100% - 51px))",
                maskComposite: "add",
              }}
            />

            {/* Noise fill inside the edge squares — same mask as grid */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: "512px 512px",
                opacity: 0.15,
                mixBlendMode: "multiply",
                WebkitMaskImage: "linear-gradient(to bottom, black 51px, transparent 51px, transparent calc(100% - 51px), black calc(100% - 51px)), linear-gradient(to right, black 51px, transparent 51px, transparent calc(100% - 51px), black calc(100% - 51px))",
                WebkitMaskComposite: "source-over",
                maskImage: "linear-gradient(to bottom, black 51px, transparent 51px, transparent calc(100% - 51px), black calc(100% - 51px)), linear-gradient(to right, black 51px, transparent 51px, transparent calc(100% - 51px), black calc(100% - 51px))",
                maskComposite: "add",
              }}
            />

            {/* Corner marks — black L-shaped caps at each corner */}
            <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-black" />
            <div className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-black" />
            <div className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-black" />
            <div className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-black" />

            {/* Content — centered vertically */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="px-8 md:px-16 py-16 text-center">
              <div className="section-tag mb-8">What We Believe</div>
              <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6">
                Built on{" "}
                <span className="font-serif-display italic">systems,</span>
                <br />
                not guesswork
              </h2>
              <div className="max-w-2xl mx-auto space-y-6 text-base md:text-lg font-light text-neutral-600 leading-relaxed">
                <p>
                  Building something from nothing is hard. The internet is full of people telling you what to do — most of whom have never built anything themselves.
                </p>
                <p>
                  We&apos;ve spent a decade studying what the best companies actually do. The ones that grow consistently aren&apos;t the ones with the best tactics. They&apos;re the ones that build systems.
                </p>
              </div>
              <p className="text-black font-medium text-base md:text-lg mt-8 max-w-2xl mx-auto">
                100,000+ builders. The incumbents have headcount. We have <span className="italic">each other.</span>
              </p>
              <div className="mt-10">
                <a href="/v2/manifesto" className="rainbow-hover inline-flex items-center gap-2 text-sm font-medium hover:text-black transition-colors">
                  Read our manifesto <ArrowRight className="w-4 h-4" />
                </a>
              </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. GROWTH STUDIO */}
        <div id="studio" className="py-16 md:py-24">
          <div className="section-tag mb-4">Growth Studio</div>
          <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-4">
            The growth systems we design and build
          </h2>
          <p className="text-neutral-500 font-light text-base max-w-3xl">
            We partner with frontier operators — each one a specialist in their domain — to architect growth systems around your specific business. Think of it as a growth team without building one.
          </p>
        </div>

        <section className="border-t border-black/10 bg-transparent">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[800px]">
            {/* Left Illustration */}
            <div className="lg:col-span-4 p-4 md:p-8 border-r border-black/10 hidden lg:block">
              <div className="sticky top-24">
                <div className="section-tag mb-4">Growth Systems</div>
                <div className="border border-black/10 bg-white aspect-square w-full flex items-center justify-center p-12">
                  <svg
                    width="100%"
                    height="100%"
                    viewBox="0 0 300 300"
                    className="text-neutral-900 stroke-current"
                  >
                    <defs>
                      <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="black" strokeWidth="0.5" opacity="0.1" />
                      </pattern>
                    </defs>
                    <rect width="300" height="300" fill="url(#grid)" />
                    <circle cx="150" cy="150" r="100" fill="none" strokeWidth="1" />
                    <circle cx="150" cy="150" r="40" fill="none" strokeWidth="1" />
                    <line x1="150" y1="50" x2="150" y2="250" strokeWidth="0.5" />
                    <line x1="50" y1="150" x2="250" y2="150" strokeWidth="0.5" />
                    <text x="10" y="20" fontFamily="monospace" fontSize="10" fill="#999">
                      [ FIG. 42 ]
                    </text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 divide-y divide-black/10">
                <div className="p-4 md:p-8">
                  <span className="section-tag">Programs</span>
                </div>

                {programs.map((program) => (
                  <div
                    key={program.name}
                    className="p-6 md:p-12 transition-colors group program-row-hover"
                  >
                    <div className="flex flex-col md:flex-row md:justify-between gap-8">
                      <div className="md:w-1/2">
                        <h3 className="font-heading text-2xl font-medium mb-3">
                          {program.name}
                        </h3>
                        <p className="text-neutral-600 font-light leading-relaxed mb-6">
                          {program.description}
                        </p>
                        <button className="border border-black/20 rounded-full px-5 py-2 text-sm font-medium group-hover:bg-black group-hover:text-white transition-colors">
                          {program.cta}
                        </button>
                      </div>
                      <div className="md:w-1/3 flex flex-col gap-3 pt-2">
                        {program.links.map((link) => (
                          <a
                            key={link}
                            href="#"
                            className="rainbow-hover flex items-center gap-2 text-xs font-mono-ui uppercase tracking-wide transition-colors"
                          >
                            <div className="w-1.5 h-1.5 bg-neutral-300 group-hover:bg-neutral-600" />
                            {link}
                            <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                <a href="/v2/services" className="rainbow-row-hover p-4 md:p-8 font-mono-ui text-xs text-neutral-400 hover:text-black transition-colors flex items-center gap-2">
                  <span className="font-semibold text-black">Explore all programs (8)</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 6. GROWTH PROGRAM */}
        <section id="growth-program" className="pt-24 pb-0">
          <div className="mb-4">
            <div className="section-tag mb-4">Growth Program</div>
            <h2 className="font-heading text-5xl md:text-7xl tracking-tight">
              Build your own growth system
              <span className="text-2xl align-top ml-1 font-mono-ui text-neutral-400 font-normal tracking-normal">
                (50+)
              </span>
            </h2>
            <p className="text-neutral-500 font-light text-lg mt-4 max-w-2xl">
              50+ playbooks, frameworks, and execution guides. An AI co-pilot that knows your business. Everything you need to build a growth system yourself — at your own pace.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <a href="/v2/growth-program" className="glow-btn relative px-6 py-3 rounded-md font-medium text-sm flex items-center gap-2 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">Explore the Growth Program <ArrowRight className="w-4 h-4" /></span>
              </a>
              <a href="#" className="rainbow-hover text-sm font-medium flex items-center gap-2 hover:text-black transition-colors">
                Start with a 7-day free trial <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="border-t border-black/10 flex flex-col lg:flex-row mt-8">
            {/* Filters Sidebar */}
            <div className="w-full lg:w-[420px] border-b lg:border-b-0 lg:border-r border-black/10 shrink-0">
              {/* Filter Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-black/10 font-mono-ui text-xs font-medium tracking-wide">
                <span className="section-tag">Filter</span>
                <button className="text-neutral-400 hover:text-black transition-colors tracking-widest">
                  CLEAR FILTERS
                </button>
              </div>

              {/* Filter Columns */}
              <div className="flex divide-x divide-black/10">
                {/* Path Column */}
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-2 mb-4 text-xs font-semibold">
                    <FolderOpen className="w-3.5 h-3.5" /> Path
                  </div>
                  <div className="space-y-2.5">
                    {gpFilterPaths.map((path) => (
                      <label key={path.name} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="hidden custom-checkbox" />
                        <div className="w-4 h-4 border border-black/20 rounded-sm flex items-center justify-center transition-colors">
                          <svg className="w-2.5 h-2.5 text-white hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-neutral-600 group-hover:text-black transition-colors">
                          {path.name}
                          <span className="text-neutral-400 ml-1">({path.count})</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Type Column */}
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-2 mb-4 text-xs font-semibold">
                    <Hash className="w-3.5 h-3.5" /> Type
                  </div>
                  <div className="space-y-2.5">
                    {gpFilterTypes.map((type) => (
                      <label key={type.name} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" className="hidden custom-checkbox" />
                        <div className="w-4 h-4 border border-black/20 rounded-sm flex items-center justify-center transition-colors">
                          <svg className="w-2.5 h-2.5 text-white hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-neutral-600 group-hover:text-black transition-colors">
                          {type.name}
                          <span className="text-neutral-400 ml-1">({type.count})</span>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Figure below filters */}
              <div className="border-t border-black/10 p-6 hidden lg:block">
                <div className="border border-black/10 bg-white rounded-sm overflow-hidden">
                  <div className="border-b border-black/10 px-3 py-1.5 flex justify-between items-center bg-[#fafafa]">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full border border-black/20" />
                      <div className="w-2 h-2 rounded-full border border-black/20" />
                    </div>
                    <div className="font-mono-ui text-[10px] text-neutral-400">
                      [ FIG. 3 ]
                    </div>
                  </div>
                  <div className="aspect-[3/2] p-6 flex items-center justify-center">
                    <svg width="100%" height="100%" viewBox="0 0 300 200" className="text-neutral-800 stroke-current opacity-60">
                      <defs>
                        <pattern id="dotgrid" width="15" height="15" patternUnits="userSpaceOnUse">
                          <circle cx="1" cy="1" r="0.5" fill="#ccc" />
                        </pattern>
                      </defs>
                      <rect width="300" height="200" fill="url(#dotgrid)" />
                      <path d="M20 180 Q 80 170, 120 120 T 200 60 T 280 30" fill="none" strokeWidth="1.5" />
                      <circle cx="120" cy="120" r="3" fill="currentColor" />
                      <circle cx="200" cy="60" r="3" fill="currentColor" />
                      <circle cx="280" cy="30" r="3" fill="currentColor" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Table */}
            <div className="flex-1 overflow-x-auto">
              <div className="min-w-[600px] w-full">
                {/* Header Row */}
                <div className="flex items-center border-b border-black/10 text-xs font-mono-ui text-neutral-400 px-6 py-4 uppercase tracking-wide">
                  <div className="w-28 shrink-0">/ Path</div>
                  <div className="flex-1">/ Module</div>
                  <div className="w-28 text-right">/ Type</div>
                  <div className="w-10" />
                </div>

                {gpItems.map((item, i) => (
                  <div
                    key={`${item.title}-${i}`}
                    className="feed-row flex items-center border-b border-black/10 px-6 py-5 group cursor-pointer"
                    style={{ "--row-hue": `${(i * 36) % 360}` } as React.CSSProperties}
                  >
                    <div className="w-28 shrink-0 text-xs font-mono-ui flex items-center gap-2.5">
                      <div className="w-2 h-2 bg-black shrink-0" />
                      {item.path}
                    </div>
                    <div className="flex-1 text-xl md:text-2xl font-medium leading-tight">
                      {item.title}
                    </div>
                    <div className="w-28 text-right shrink-0">
                      <span className="feed-type-badge inline-block rounded-sm px-2 py-1 text-[10px] font-mono-ui uppercase tracking-widest border border-black/10 bg-white transition-colors">
                        {item.type}
                      </span>
                    </div>
                    <div className="w-10 text-right text-neutral-400 group-hover:text-black transition-colors">
                      <Plus className="w-5 h-5 inline-block" />
                    </div>
                  </div>
                ))}
              </div>

              {/* See All */}
              <div className="border-b border-black/10">
                <a href="/v2/growth-program" className="block py-8 px-6 hover:bg-white text-sm font-medium transition-colors text-center">
                  See all 50+ modules <ArrowRight className="w-4 h-4 inline-block ml-1" />
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>{/* temporarily close 1440px container for full-width social proof */}

      {/* 7. SOCIAL PROOF — full viewport width, outside the 1440px container */}
      <div style={{ height: 48 }} />
      <section className="v2-bg border-y border-black/10 py-16 md:py-20 w-full relative z-[3]">
        {/* Inner horizontal lines — 16px inset from top and bottom borders */}
        <div className="absolute left-0 right-0 pointer-events-none" style={{ top: 16, height: 1, backgroundColor: "rgba(0,0,0,0.06)" }} />
        <div className="absolute left-0 right-0 pointer-events-none" style={{ bottom: 16, height: 1, backgroundColor: "rgba(0,0,0,0.06)" }} />
        {/* Darkened noise zone — only between the inner 16px lines */}
        <div
          className="absolute pointer-events-none overflow-hidden"
          style={{ top: 16, bottom: 16, left: 0, right: 0 }}
        >
          {/* Grayscale noise — dark pixels on light bg using multiply */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "512px 512px",
              opacity: 0.18,
              mixBlendMode: "multiply",
            }}
          />
        </div>
        <div className="max-w-[1600px] mx-auto px-8 md:px-16">
          <div className="mb-4">
            <div className="section-tag mb-8">Trusted By</div>
          </div>

          {/* Scrolling logo wall — full width bleed */}
          <div className="overflow-hidden mb-16" style={{ marginLeft: "-2rem", marginRight: "-2rem" }}>
            <div className="marquee-content whitespace-nowrap">
              {[0, 1].map((i) => (
                <span key={i} className="flex items-center">
                  {socialProofLogos.map((logo, j) => (
                    <span key={`${i}-${j}`} className="px-8 md:px-10 font-heading text-xl md:text-2xl font-medium text-neutral-500 tracking-tight">
                      {logo}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>

          {/* Testimonials — two columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
            <div>
              <p className="text-lg md:text-xl font-light text-neutral-600 leading-relaxed italic">
                &ldquo;Demand Curve changed how we think about growth. We went from guessing to having a real system.&rdquo;
              </p>
              <div className="font-mono-ui text-xs text-neutral-400 mt-4">
                — Growth Lead, Series B SaaS
              </div>
            </div>
            <div>
              <p className="text-lg md:text-xl font-light text-neutral-600 leading-relaxed italic">
                &ldquo;We tried three agencies before DC. The difference is they actually understand how the pieces fit together — not just individual channels.&rdquo;
              </p>
              <div className="font-mono-ui text-xs text-neutral-400 mt-4">
                — CEO, Seed-Stage Fintech
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reopen 1440px container for remaining sections */}
      <div className="max-w-[1440px] mx-auto px-4 relative">

        {/* 8. NEWSLETTER SIGNUP */}
        <section id="newsletter">
          <div className="py-20 md:py-28">
            <div className="flex flex-col md:flex-row gap-0">
              {/* Left column — newsletter content */}
              <div className="flex-1 md:pr-12 md:border-r border-black/10">
                <div className="section-tag mb-6">The Community</div>
                <h2 className="font-heading text-4xl md:text-6xl tracking-tight mb-4">
                  The Growth Newsletter
                </h2>
                <p className="text-neutral-600 font-light text-base leading-relaxed mb-8">
                  Join 100,000+ operators receiving growth systems, tactics, and insights delivered straight from the frontier.
                </p>
                <div className="flex max-w-md gap-2 mb-3">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 border border-black/15 rounded-sm px-4 py-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black/20 placeholder:text-neutral-400"
                  />
                  <button className="bg-black text-white px-5 py-3 rounded-sm hover:bg-neutral-800 transition-colors text-sm font-medium shrink-0">
                    Subscribe
                  </button>
                </div>
                <p className="text-xs text-neutral-400">
                  Free. No spam. Unsubscribe anytime.
                </p>

                {/* Mini feed rows — recent editions */}
                <div className="mt-12">
                  <div className="font-mono-ui text-[10px] tracking-widest text-neutral-400 mb-3 uppercase">Recent Editions</div>
                  <div className="border-t border-black/10">
                    {recentNewsletters.map((item, i) => (
                      <a
                        key={item.title}
                        href="#"
                        className="feed-row flex items-center border-b border-black/10 px-4 py-3 group cursor-pointer"
                        style={{ "--row-hue": `${(i * 60 + 20) % 360}` } as React.CSSProperties}
                      >
                        <div className="flex-1 text-sm md:text-base font-medium leading-tight">
                          {item.title}
                        </div>
                        <span className="feed-type-badge inline-block rounded-sm px-2 py-0.5 text-[9px] font-mono-ui uppercase tracking-widest border border-black/10 bg-white transition-colors">
                          {item.type}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column — testimonial */}
              <div className="flex-shrink-0 md:w-[340px] lg:w-[400px] md:pl-12 pt-12 md:pt-0 flex flex-col justify-center">
                <p className="text-lg font-light text-neutral-600 leading-relaxed italic">
                  &ldquo;This is the only newsletter I actually read every single time it hits my inbox. No fluff — just real tactics I can use that week.&rdquo;
                </p>
                <div className="font-mono-ui text-xs text-neutral-400 mt-4">
                  — VP of Marketing, Series A SaaS
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 9. PRE-FOOTER */}
        <section className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
          <div className="p-8 md:p-12 border-r border-black/10 flex flex-col justify-between">
            <div>
              <div className="section-tag mb-6">Start Building</div>
              <h3 className="font-heading text-3xl font-light leading-snug max-w-md">
                Whether you want us to build your growth system or you want to build it yourself — we&apos;ve got you covered.
              </h3>
            </div>
            <div className="mt-12 flex flex-col sm:flex-row gap-3">
              <a href="/v2/services" className="glow-btn relative px-8 py-3 rounded-md text-sm font-medium overflow-hidden inline-flex items-center justify-center">
                <span className="relative z-10">Talk to the Growth Studio</span>
              </a>
              <a href="/v2/growth-program" className="glow-btn relative px-8 py-3 rounded-md text-sm font-medium overflow-hidden inline-flex items-center justify-center">
                <span className="relative z-10">Explore the Growth Program</span>
              </a>
            </div>
          </div>
          <div className="grid grid-rows-2 divide-y divide-black/10">
            <div className="p-8 md:p-12">
              <div className="section-tag mb-6">Social</div>
              <div className="flex gap-4 text-xs font-mono-ui uppercase">
                <a href="#" className="border border-black/10 px-2 py-1 hover:bg-black hover:text-white transition-colors">
                  LinkedIn
                </a>
                <a href="#" className="border border-black/10 px-2 py-1 hover:bg-black hover:text-white transition-colors">
                  Twitter/X
                </a>
                <a href="#" className="border border-black/10 px-2 py-1 hover:bg-black hover:text-white transition-colors">
                  Newsletter
                </a>
              </div>
            </div>
            <div className="p-8 md:p-12">
              <div className="section-tag mb-6">Resources</div>
              <div className="flex gap-4 text-xs font-mono-ui uppercase">
                <a href="/v2/growth-program" className="border border-black/10 px-2 py-1 hover:bg-black hover:text-white transition-colors">
                  Growth Program
                </a>
                <a href="#" className="border border-black/10 px-2 py-1 hover:bg-black hover:text-white transition-colors">
                  Newsletter Archive
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 10. FOOTER — small links (inside container, barrier lines stop here) */}
        <footer className="border-t border-black/10 pt-8 pb-4">
          <div className="flex justify-between items-end mb-8 font-mono-ui text-xs text-neutral-500 uppercase">
            <div className="flex items-center gap-4">
              <div className="w-4 h-4 rounded-full border border-black/20 flex items-center justify-center">
                <span className="text-[8px] font-serif font-bold">D</span>
              </div>
              <span>© 2026 Demand Curve</span>
            </div>
            <div className="flex gap-6">
              <a href="#" className="rainbow-hover hover:text-black">Privacy</a>
              <a href="#" className="rainbow-hover hover:text-black">Terms</a>
              <a href="#" className="rainbow-hover hover:text-black">DemandCurve.com</a>
            </div>
          </div>
        </footer>

      </div>{/* end 1440px container — barrier lines stop here */}

      {/* Massive Type Footer — lives outside the 1440px container, full width */}
      <div className="w-full overflow-hidden pb-4 px-4">
        <h1 className="font-mondwest architects-text w-full text-center tracking-tighter select-none rainbow-text-hover cursor-default">
          DEMAND CURVE
        </h1>
      </div>
    </div>
  );
}
