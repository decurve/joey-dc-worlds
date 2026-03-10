import {
  ArrowRight,
} from "lucide-react";
import V2Nav from "./V2Nav";
import GridOverlay from "./GridOverlay";
import HeroSection from "./HeroSection";
import GrowthProgramWindow from "./GrowthProgramWindow";
import { HeroVisualProvider } from "./HeroVisualContext";
import MassiveTypeScroll from "./MassiveTypeScroll";

export const metadata = {
  title: "Demand Curve — We Help Startups Build Growth Systems",
  description:
    "For the founders, operators, and builders competing against companies with 10x their budget. Strategy, systems, and execution from a decade of working with 4,500+ startups.",
};

const studioSubtitle = "We partner with frontier operators — each one a specialist in their domain — to architect growth systems around your specific business. Think of it as a growth team without building one.";

const programs = [
  {
    name: "Growth Architecture",
    short: "Full-stack growth system",
    number: "01",
    description:
      "We audit, design, and build your complete growth system — market positioning, channel strategy, growth model, and the operating system to scale it.",
    cta: "Start a conversation",
    links: ["How It Works", "See Case Studies"],
  },
  {
    name: "Paid Acquisition Engines",
    short: "Paid growth at scale",
    number: "02",
    description:
      "Your paid growth engine — designed, launched, and scaled. Strategy, creative, media buying, and measurement built as a system, not a collection of campaigns.",
    cta: "Scale your paid channels",
    links: ["How It Works", "See Results"],
  },
  {
    name: "AI Search Engines",
    short: "Own AI discovery",
    number: "03",
    description:
      "AI is rewriting how buyers discover products. We build the system that ensures your brand shows up when AI answers your buyers' questions.",
    cta: "Get your AI brand audit",
    links: ["Learn about AI Search", "Visit Saturation"],
  },
  {
    name: "Story Systems",
    short: "Messaging that compounds",
    number: "04",
    description:
      "Your positioning and messaging aren't a one-time exercise. They're the operating system your entire go-to-market runs on.",
    cta: "Build your narrative",
    links: ["How Story Systems Work"],
  },
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
  { title: "Your Growth Experiments Are Lying to You", type: "Tactics", date: "Mar 4", number: "#247", readTime: "6 min" },
  { title: "Stop Pulling the Wrong Growth Levers", type: "Strategy", date: "Feb 25", number: "#246", readTime: "8 min" },
  { title: "How Two Words Generated Millions in Revenue", type: "Case Study", date: "Feb 18", number: "#245", readTime: "5 min" },
  { title: "The Channel Most Startups Pick Wrong", type: "Framework", date: "Feb 11", number: "#244", readTime: "7 min" },
  { title: "Why Your Positioning Isn't Landing", type: "Deep Dive", date: "Feb 4", number: "#243", readTime: "9 min" },
  { title: "The Retention Playbook Nobody Talks About", type: "Playbook", date: "Jan 28", number: "#242", readTime: "7 min" },
  { title: "How to Price When You Have No Idea", type: "Framework", date: "Jan 21", number: "#241", readTime: "6 min" },
  { title: "The Landing Page That Converts at 3x", type: "Case Study", date: "Jan 14", number: "#240", readTime: "5 min" },
];

const newsletterStats = [
  { value: "100K+", label: "Subscribers" },
  { value: "247", label: "Editions" },
  { value: "4,500+", label: "Startups Trained" },
  { value: "Weekly", label: "Every Tuesday" },
];

export default function V2Page() {
  return (
    <HeroVisualProvider>
    <div className="v2-world v2-bg text-[#1a1a1a] text-sm selection:bg-yellow-200 selection:text-black" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", position: "relative", zIndex: 2, overflowX: "clip" }}>
      {/* ── Side borders + checkerboard (hex.tech style) ── */}
      {/* Single border line 16px from each viewport edge, checkerboard fills 0-16px strip */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 50 }}>
        {/* Left border */}
        <div className="absolute top-0 bottom-0" style={{ left: 16, borderLeft: "1px solid rgba(0,0,0,0.10)" }} />
        {/* Right border */}
        <div className="absolute top-0 bottom-0" style={{ right: 16, borderRight: "1px solid rgba(0,0,0,0.10)" }} />
        {/* Left checkerboard strip */}
        <div
          className="absolute top-0 bottom-0 left-0"
          style={{
            width: 16,
            background: "repeating-conic-gradient(#e4e8ec 0% 25%, #eef1f4 0% 50%) 0 0 / 5px 5px",
          }}
        />
        {/* Right checkerboard strip */}
        <div
          className="absolute top-0 bottom-0 right-0"
          style={{
            width: 16,
            background: "repeating-conic-gradient(#e4e8ec 0% 25%, #eef1f4 0% 50%) 0 0 / 5px 5px",
          }}
        />
      </div>

      {/* 1. NAVIGATION */}
      <V2Nav />

      {/* Fixed DEMAND CURVE teaser — sits behind main content, peeks through after footer */}
      <div
        className="fixed bottom-0 left-0 right-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 1, paddingBottom: 48 }}
      >
        <span
          style={{
            fontFamily: "'PP Mondwest', monospace",
            fontWeight: 700,
            fontSize: `clamp(36px, 4.5vw, 58px)`,
            letterSpacing: "-0.01em",
            color: "#000",
          }}
        >
          DEMAND CURVE
        </span>
      </div>

      {/* Main content — everything lives inside the 16px side borders */}
      {/* z-index: 3 so it sits ABOVE the fixed teaser. v2-bg so it has its own background to cover the teaser. */}
      <div className="relative v2-bg" style={{ margin: "0 17px", zIndex: 3 }}>

        {/* 2. HERO — grid-aligned hero with staircase image */}
        <div className="relative" style={{ marginTop: -40 }}>
          <GridOverlay columns={7} gapSize={16} sidePadding={24} maxWidth={9999} lineColor="rgba(0,0,0,0.06)" className="">
            <HeroSection />
          </GridOverlay>
        </div>

        {/* Fading lines under marquee — full viewport width */}
        <div className="relative" style={{ height: 60, minHeight: 40, width: "100vw", marginLeft: "calc(-50vw + 50%)" }}>
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
        <div style={{ height: 40 }} />

        {/* Padded content below hero */}
        <div className="px-6">

        {/* 4. MANIFESTO BLOCK — grid-framed container with corner marks */}
        <section className="py-20 md:py-28">
          {/* Grid frame — edge-only squares with corner caps. 50px cells, 1300×800 = 26×16 perfect grid */}
          <div
            className="relative mx-auto max-w-[1300px] min-h-[500px] md:min-h-[800px]"
          >
            {/* Grid pattern — masked to show only the 1-cell-thick border frame. Hidden on small screens. */}
            <div
              className="absolute inset-0 pointer-events-none border-r border-b border-black/[0.08] hidden md:block"
              style={{
                backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.08) 1px, transparent 1px)",
                backgroundSize: "50px 50px",
                WebkitMaskImage: "linear-gradient(to bottom, black 51px, transparent 51px, transparent calc(100% - 51px), black calc(100% - 51px)), linear-gradient(to right, black 51px, transparent 51px, transparent calc(100% - 51px), black calc(100% - 51px))",
                WebkitMaskComposite: "source-over",
                maskImage: "linear-gradient(to bottom, black 51px, transparent 51px, transparent calc(100% - 51px), black calc(100% - 51px)), linear-gradient(to right, black 51px, transparent 51px, transparent calc(100% - 51px), black calc(100% - 51px))",
                maskComposite: "add",
              }}
            />

            {/* Noise fill inside the edge squares — hidden on small screens */}
            <div
              className="absolute inset-0 pointer-events-none hidden md:block"
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

            {/* Corner marks — hidden on small screens */}
            <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-black hidden md:block" />
            <div className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-black hidden md:block" />
            <div className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-black hidden md:block" />
            <div className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-black hidden md:block" />

            {/* Content — centered vertically */}
            <div className="flex items-center justify-center min-h-[500px] md:min-h-[800px]">
              <div className="px-6 md:px-16 py-12 md:py-16 text-center">
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
        <section id="studio" className="border-t border-black/10">
          <div className="flex flex-col md:flex-row">
            {/* Left sticky column — header lives here */}
            <div className="md:w-[38%] shrink-0 border-b md:border-b-0 md:border-r border-black/10">
              <div className="sticky top-16 p-6 md:p-8 md:py-16">
                <div className="section-tag mb-4">Growth Studio</div>
                <h2 className="font-heading text-4xl md:text-5xl tracking-tight mb-4">
                  The growth systems we design and build
                </h2>
                <p className="text-neutral-500 font-light text-base mb-8">
                  {studioSubtitle}
                </p>
                <a href="/v2/services" className="rainbow-hover inline-flex items-center gap-2 text-sm font-semibold hover:text-black transition-colors">
                  View all programs <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right scrolling column — rows with dividers and stripe hover */}
            <div className="flex-1">
              {programs.map((program) => (
                <div
                  key={program.name}
                  className="border-b border-black/10 p-6 md:px-8 md:py-10 group program-row-hover cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono-ui text-xs text-neutral-400">{program.number}</span>
                    <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">{program.short}</span>
                  </div>
                  <h3 className="font-heading text-2xl md:text-3xl font-medium mb-3">{program.name}</h3>
                  <p className="text-neutral-600 font-light leading-relaxed mb-6">{program.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 group-hover:text-black transition-colors">
                    {program.cta} <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              ))}

              <a href="/v2/services" className="rainbow-row-hover p-4 md:p-8 font-mono-ui text-xs text-neutral-400 hover:text-black transition-colors flex items-center gap-2">
                <span className="font-semibold text-black">Explore all programs (8)</span>
                <ArrowRight className="w-4 h-4 text-black" />
              </a>
            </div>
          </div>
        </section>

        {/* 6. GROWTH PROGRAM */}
        <section id="growth-program" className="pt-24 pb-0">
          <div className="mb-14">
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

          <GrowthProgramWindow />
        </section>

        {/* 7. SOCIAL PROOF — close px-6 wrapper, break out to full viewport */}
        </div>{/* end px-6 */}
        </div>{/* end margin:0 17px wrapper */}
        <div className="v2-bg relative" style={{ zIndex: 3 }}>
        <div style={{ height: 48 }} />
        <section className="border-y border-black/10 py-16 md:py-20 relative">
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
        </div>{/* end v2-bg wrapper around social proof */}

        {/* Reopen wrappers after social proof */}
        <div className="relative v2-bg" style={{ margin: "0 17px", zIndex: 3 }}>
        <div className="px-6">

        {/* 8. NEWSLETTER SIGNUP — V32 Broadsheet */}
        <section id="newsletter" className="py-20 md:py-28">
          <div className="relative mx-auto max-w-[1300px]">

            {/* Micro metadata */}
            <div className="flex items-center justify-between mb-1 px-1">
              <span className="font-mono-ui text-[7px] text-neutral-400 uppercase tracking-widest">Sheet 1/1</span>
              <span className="font-mono-ui text-[7px] text-neutral-400 uppercase tracking-widest">Demand Curve — Growth Newsletter — Vol. VII · Edition 247</span>
              <span className="font-mono-ui text-[7px] text-neutral-400 uppercase tracking-widest">Proof: Final</span>
            </div>

            {/* Main container with grid bg + corner caps */}
            <div className="relative border border-black/15 overflow-hidden">

              {/* Bold corner caps */}
              <div className="absolute -top-[2px] -left-[2px] w-6 h-6 border-t-[3px] border-l-[3px] border-black z-10" />
              <div className="absolute -top-[2px] -right-[2px] w-6 h-6 border-t-[3px] border-r-[3px] border-black z-10" />
              <div className="absolute -bottom-[2px] -left-[2px] w-6 h-6 border-b-[3px] border-l-[3px] border-black z-10" />
              <div className="absolute -bottom-[2px] -right-[2px] w-6 h-6 border-b-[3px] border-r-[3px] border-black z-10" />
              {/* Mid-edge marks */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 border-t-2 border-black z-10" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 border-b-2 border-black z-10" />

              <div className="relative z-[5]" style={{
                background: `linear-gradient(135deg,
                  hsla(calc(var(--rainbow-hue, 0) + 0), 70%, 97%, 0.18) 0%,
                  hsla(calc(var(--rainbow-hue, 0) + 30), 60%, 96%, 0.18) 25%,
                  hsla(calc(var(--rainbow-hue, 0) + 60), 65%, 97%, 0.18) 50%,
                  hsla(calc(var(--rainbow-hue, 0) + 90), 55%, 96%, 0.18) 75%,
                  hsla(calc(var(--rainbow-hue, 0) + 120), 70%, 97%, 0.18) 100%)`,
              }}>
                {/* Ornamental top rule */}
                <div className="flex items-center gap-2 px-6 pt-6 mb-4">
                  <div className="flex-1 h-px bg-black/80" />
                  <div className="w-1.5 h-1.5 border border-black rotate-45" />
                  <div className="w-1.5 h-1.5 bg-black rotate-45" />
                  <div className="w-1.5 h-1.5 border border-black rotate-45" />
                  <div className="flex-1 h-px bg-black/80" />
                </div>

                {/* Masthead */}
                <div className="text-center px-6 pb-4">
                  <div className="flex items-center justify-center gap-4 mb-2">
                    <span className="font-mono-ui text-[8px] uppercase tracking-[0.4em] text-neutral-400">Est. 2020</span>
                    <span className="text-[8px] text-neutral-300">✦</span>
                    <span className="font-mono-ui text-[8px] uppercase tracking-[0.4em] text-neutral-400">Published Weekly</span>
                    <span className="text-[8px] text-neutral-300">✦</span>
                    <span className="font-mono-ui text-[8px] uppercase tracking-[0.4em] text-neutral-400">100,000+ Readers</span>
                  </div>
                  <h2 className="font-heading text-5xl md:text-7xl tracking-tight">The Growth Newsletter</h2>
                </div>

                {/* Ornamental mid rule */}
                <div className="flex items-center gap-3 px-6 mb-4">
                  <div className="flex-1 border-t border-black/30" />
                  <span className="text-[9px] text-neutral-400">✦</span>
                  <div className="flex-1 border-t border-black/30" />
                </div>

                {/* Marquee ticker */}
                <div className="border-t border-b border-black/10 py-2 overflow-hidden mb-0">
                  <div className="marquee-content whitespace-nowrap font-mono-ui text-[9px] uppercase tracking-widest text-neutral-500">
                    {[0, 1].map((rep) => (
                      <span key={rep} className="flex">
                        {recentNewsletters.map((item, j) => (
                          <span key={`${rep}-${j}`} className="contents">
                            <span className="px-5 flex items-center gap-2">
                              <span className="marquee-square" style={{ animationDelay: `${j * 0.5}s` }} />
                              Edition {item.number} — {item.title}
                            </span>
                            |
                          </span>
                        ))}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Three-column layout */}
                <div className="grid md:grid-cols-5 divide-x divide-black/10">
                  {/* Lead article — 3 cols */}
                  <div className="md:col-span-3 p-6 md:p-8">
                    <div className="section-tag mb-3" style={{ display: "inline-flex" }}>Most Recent Edition</div>
                    <h3 className="font-heading text-2xl md:text-3xl tracking-tight mb-3">{recentNewsletters[0].title}</h3>
                    <p className="text-sm text-neutral-600 font-light leading-relaxed mb-6">Growth experiments should be your most powerful tool. But most teams run them wrong — optimizing for velocity over learning, testing the wrong variables, and declaring winners based on hope.</p>

                    {/* Sub-editions in classified style */}
                    <div className="border-t-2 border-b border-black/80 py-1 mb-4">
                      <div className="border-b border-black/30" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {recentNewsletters.slice(1, 3).map((item, i) => (
                        <div key={i} className="border border-black/10 p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-mono-ui text-[9px] text-neutral-400">{item.number}</span>
                            <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                            <span className="font-mono-ui text-[9px] text-neutral-400 uppercase">{item.type}</span>
                          </div>
                          <div className="text-sm font-medium leading-snug">{item.title}</div>
                          <div className="font-mono-ui text-[9px] text-neutral-400 mt-1">{item.readTime} read</div>
                        </div>
                      ))}
                    </div>

                    {/* More editions in dense list */}
                    <div className="mt-4">
                      {recentNewsletters.slice(3).map((item, i) => (
                        <div key={i} className="flex items-center justify-between py-2 border-b border-black/10 last:border-b-0">
                          <div className="flex items-center gap-2">
                            <span className="font-mono-ui text-[9px] text-neutral-400">{item.number}</span>
                            <span className="text-sm font-medium">{item.title}</span>
                          </div>
                          <span className="section-tag" style={{ display: "inline-flex", fontSize: 8, padding: "1px 6px" }}>{item.type}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Subscribe sidebar — 2 cols */}
                  <div className="md:col-span-2 p-6">
                    <h3 className="font-heading text-xl tracking-tight mb-2">Never miss an edition</h3>
                    <p className="text-sm text-neutral-500 font-light leading-relaxed mb-6">Growth systems, tactics, and insights. Delivered straight from the frontier every Tuesday.</p>
                    <div className="space-y-3 mb-4">
                      <input type="email" placeholder="your@email.com" className="w-full border border-black/15 rounded-sm px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black/20 placeholder:text-neutral-400" />
                      <button className="w-full bg-black text-white py-2.5 rounded-sm hover:bg-neutral-800 transition-colors text-sm font-medium">Subscribe — Free</button>
                    </div>
                    <p className="text-[10px] text-neutral-400 mb-6">No spam. Unsubscribe anytime.</p>

                    {/* Stats */}
                    <div className="border-t border-black/10 pt-4 space-y-3">
                      {newsletterStats.map((s) => (
                        <div key={s.label} className="flex items-center justify-between">
                          <span className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest">{s.label}</span>
                          <span className="font-heading text-lg">{s.value}</span>
                        </div>
                      ))}
                    </div>

                    {/* Testimonial */}
                    <div className="mt-6 pt-4 border-t border-black/10">
                      <p className="text-xs font-light text-neutral-500 leading-relaxed italic">&ldquo;This is the only newsletter I actually read every single time it hits my inbox. No fluff — just real tactics I can use that week.&rdquo;</p>
                      <div className="font-mono-ui text-[9px] text-neutral-400 mt-2">— VP of Marketing, Series A SaaS</div>
                    </div>
                  </div>
                </div>

                {/* Ornamental bottom rule */}
                <div className="flex items-center gap-2 px-6 pb-5 pt-2">
                  <div className="flex-1 h-px bg-black/80" />
                  <div className="w-1.5 h-1.5 border border-black rotate-45" />
                  <div className="w-1.5 h-1.5 bg-black rotate-45" />
                  <div className="w-1.5 h-1.5 border border-black rotate-45" />
                  <div className="flex-1 h-px bg-black/80" />
                </div>
              </div>
            </div>

            {/* Micro metadata bottom */}
            <div className="flex items-center justify-between mt-1 px-1">
              <span className="font-mono-ui text-[7px] text-neutral-400 uppercase tracking-widest">Trim line</span>
              <span className="font-mono-ui text-[7px] text-neutral-400 uppercase tracking-widest">© Demand Curve 2026 · All rights reserved</span>
              <span className="font-mono-ui text-[7px] text-neutral-400 uppercase tracking-widest">Bleed: 3mm</span>
            </div>

          </div>
        </section>

        {/* Fading lines between newsletter and pre-footer — full viewport width */}
        <div className="relative" style={{ height: 60, minHeight: 40, width: "100vw", marginLeft: "calc(-50vw + 50%)" }}>
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
        <div style={{ height: 40 }} />

        {/* 9. PRE-FOOTER */}
        <section className="grid grid-cols-1 md:grid-cols-2 min-h-[400px]">
          <div className="p-8 md:p-12 border-r border-black/10 flex flex-col justify-between">
            <div>
              <div className="section-tag mb-6">Start Building</div>
              <h3 className="font-heading text-3xl font-light leading-snug max-w-md">
                Whether you want us to build your growth system or you want to build it yourself — we&apos;ve got you covered.
              </h3>
            </div>
            <div className="mt-12 flex items-center gap-6">
              <a href="/v2/services" className="glow-btn relative px-6 py-2.5 rounded-md text-sm font-medium overflow-hidden inline-flex items-center justify-center shrink-0">
                <span className="relative z-10">Talk to the Growth Studio</span>
              </a>
              <a href="/v2/growth-program" className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-500 hover:text-black transition-colors rainbow-hover shrink-0">
                Explore the Growth Program <ArrowRight className="w-3.5 h-3.5" />
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

        {/* 10. FOOTER — small links */}
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

        </div>{/* end padded content */}
      </div>{/* end main content container */}

      {/* Massive Type Footer — pulled up so animation starts while footer is still visible */}
      {/* Canvas z-index:2 sits behind main content z-index:3, revealed as footer scrolls away */}
      <div style={{ marginTop: -900 }}>
        <MassiveTypeScroll />
      </div>
    </div>
    </HeroVisualProvider>
  );
}
