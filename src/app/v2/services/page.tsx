import { ArrowRight, ArrowUpRight } from "lucide-react";
import V2Nav from "../V2Nav";

export const metadata = {
  title: "Services — Demand Curve",
  description:
    "The growth systems we design, build, and scale. Eight programs for companies that are done guessing.",
};

const programs = [
  {
    name: "Growth Architecture",
    tagline: "The complete system.",
    description:
      "We audit, design, and build your complete growth system — market positioning, channel strategy, growth model, and the operating system to scale it. This is the engagement for companies that want everything connected.",
    deliverables: [
      "Growth system audit & diagnosis",
      "Market & competitive positioning",
      "Channel strategy & sequencing",
      "Growth model design",
      "Operating system & measurement",
    ],
    ideal: "Series A-B companies ready to professionalize growth",
    accent: "bg-black",
  },
  {
    name: "Paid Acquisition Engine",
    tagline: "Your paid growth engine — designed, launched, and scaled.",
    description:
      "Built and run by a 15-year paid media veteran. Strategy, creative, media buying, and measurement designed as an integrated system — not siloed channel management.",
    deliverables: [
      "Channel strategy & budget allocation",
      "Creative strategy & production",
      "Campaign architecture & launch",
      "Measurement & attribution",
      "Ongoing optimization & scaling",
    ],
    ideal: "Companies spending $20K+/mo on ads (or ready to start)",
    accent: "bg-orange-600",
  },
  {
    name: "AI Search Engine",
    tagline: "Be the answer when AI responds.",
    description:
      "AI is rewriting how buyers discover products. We build the system that ensures your brand is recommended when AI answers your buyers' questions. A joint venture with Galactic Fed — combining DC's strategic intelligence with GFed's technical execution.",
    deliverables: [
      "AI brand visibility audit",
      "Citation & mention strategy",
      "Content architecture for AI discovery",
      "Technical implementation",
      "Monitoring & optimization",
    ],
    ideal: "B2B companies where buyers research before purchasing",
    accent: "bg-violet-600",
  },
  {
    name: "Story System",
    tagline: "Your positioning is your operating system.",
    description:
      "Your positioning and messaging aren't a one-time exercise. They're the operating system your entire go-to-market runs on. We build the narrative architecture that makes everything else — ads, content, sales, product — work harder.",
    deliverables: [
      "Market & audience research",
      "Positioning & differentiation strategy",
      "Messaging architecture",
      "Copy systems & templates",
      "Team enablement & rollout",
    ],
    ideal: "Companies whose growth has stalled despite good product",
    accent: "bg-emerald-600",
  },
  {
    name: "Growth Catalyst",
    tagline: "Rapid experiments that unlock your next phase.",
    description:
      "A focused, time-boxed engagement designed to identify and run the highest-leverage growth experiments for your stage. We diagnose, prioritize, and execute — fast. Built for teams that need momentum, not a 6-month roadmap.",
    deliverables: [
      "Growth diagnosis & opportunity mapping",
      "Experiment prioritization (ICE framework)",
      "Rapid experiment design & execution",
      "Results analysis & next steps",
    ],
    ideal: "Early-stage teams stuck on a plateau",
    accent: "bg-amber-500",
  },
  {
    name: "Growth Model",
    tagline: "Design the math behind your growth engine.",
    description:
      "Most companies can't answer a simple question: what drives growth? We build the quantitative model that connects your inputs to your outputs — so you can forecast, prioritize, and allocate resources with confidence instead of intuition.",
    deliverables: [
      "Unit economics deep dive",
      "Growth loop identification",
      "Quantitative growth model",
      "Scenario planning & forecasting",
      "Dashboard & measurement design",
    ],
    ideal: "Companies preparing for fundraise or board-level reporting",
    accent: "bg-blue-600",
  },
  {
    name: "Revenue System",
    tagline: "Turn revenue into a repeatable, scalable system.",
    description:
      "Pricing, packaging, monetization strategy, and the conversion systems that turn users into revenue. We design the complete revenue architecture — from first touch to expansion and renewal.",
    deliverables: [
      "Pricing & packaging strategy",
      "Monetization model design",
      "Conversion funnel architecture",
      "Expansion & retention systems",
      "Revenue forecasting",
    ],
    ideal: "Companies with product-market fit ready to optimize revenue",
    accent: "bg-rose-600",
  },
  {
    name: "Growth Strategy",
    tagline: "The strategic foundation everything else is built on.",
    description:
      "Before tactics, before channels, before creative — there's strategy. We work with founders and leadership teams to define the growth strategy that everything else ladders up to. The thinking that makes all the doing worthwhile.",
    deliverables: [
      "Market landscape & opportunity analysis",
      "Competitive positioning",
      "Growth motion design",
      "Channel-market fit assessment",
      "Strategic growth roadmap",
    ],
    ideal: "Founders and CEOs who want clarity before committing resources",
    accent: "bg-neutral-800",
  },
];

export default function ServicesPage() {
  return (
    <div
      className="v2-world v2-bg text-[#1a1a1a] text-sm overflow-x-hidden selection:bg-yellow-200 selection:text-black"
      style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
    >
      <V2Nav currentPage="GROWTH STUDIO" />

      {/* Hero */}
      <header className="max-w-[1600px] mx-auto pt-24 md:pt-32 pb-16 md:pb-24 px-4">
        <div className="font-mono-ui text-xs tracking-widest uppercase text-neutral-400 mb-6">
          / SERVICES
        </div>
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-8">
          The growth systems<br />we build
          <span className="text-2xl align-top ml-1 font-mono-ui text-neutral-400 font-normal tracking-normal">
            ({programs.length})
          </span>
        </h1>
        <p className="text-xl md:text-2xl font-light text-neutral-600 max-w-3xl leading-snug">
          Each program is a complete system — not a channel, not a tactic, not a retainer.
          We architect it, build it, and make sure it runs.
        </p>
      </header>

      {/* Programs Grid */}
      <section className="max-w-[1600px] mx-auto px-4 pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/10">
          {programs.map((program) => (
            <div
              key={program.name}
              className="bg-[#f7f7f4] hover:bg-white p-8 md:p-10 transition-colors duration-300 group flex flex-col"
            >
              {/* Accent bar + label */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-2.5 h-2.5 rounded-full ${program.accent}`} />
                <div className="font-mono-ui text-[10px] tracking-widest text-neutral-400 uppercase">
                  PROGRAM
                </div>
              </div>

              {/* Name + tagline */}
              <h2 className="font-heading text-2xl md:text-3xl font-medium tracking-tight mb-2">
                {program.name}
              </h2>
              <p className="text-neutral-500 font-light text-sm mb-6">
                {program.tagline}
              </p>

              {/* Description */}
              <p className="text-neutral-700 font-light text-sm leading-relaxed mb-8">
                {program.description}
              </p>

              {/* Deliverables */}
              <div className="mb-8 flex-1">
                <div className="font-mono-ui text-[10px] tracking-widest text-neutral-400 mb-3">
                  WHAT WE DELIVER
                </div>
                <div className="space-y-2">
                  {program.deliverables.map((d) => (
                    <div key={d} className="flex items-start gap-2.5 text-sm text-neutral-600">
                      <div className="w-1 h-1 bg-neutral-400 rounded-full mt-2 shrink-0" />
                      {d}
                    </div>
                  ))}
                </div>
              </div>

              {/* Ideal for */}
              <div className="mb-8">
                <div className="font-mono-ui text-[10px] tracking-widest text-neutral-400 mb-2">
                  IDEAL FOR
                </div>
                <p className="text-sm text-neutral-600">{program.ideal}</p>
              </div>

              {/* CTA */}
              <div className="mt-auto pt-4 border-t border-black/10">
                <a
                  href="#"
                  className="rainbow-hover inline-flex items-center gap-2 text-sm font-medium group-hover:text-black transition-colors"
                >
                  Let&apos;s talk <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-black/10">
        <div className="max-w-[1600px] mx-auto px-4 py-20 md:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-5xl tracking-tight mb-6">
              Not sure which program is right?
            </h2>
            <p className="text-neutral-600 font-light text-base leading-relaxed mb-8">
              Most engagements start with a conversation. We&apos;ll diagnose where you are, what&apos;s broken, and which system will have the highest impact — then build a plan together.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#"
                className="bg-black text-white px-6 py-3 rounded-sm hover:bg-neutral-800 transition-colors font-medium text-sm flex items-center gap-2"
              >
                Start a Conversation <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/v2/growth-program"
                className="rainbow-hover border border-black/20 px-6 py-3 rounded-sm transition-colors font-medium text-sm"
              >
                Or build it yourself
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 py-8">
        <div className="max-w-[1600px] mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono-ui text-xs text-neutral-400">
            &copy; 2026 Demand Curve
          </div>
          <div className="flex gap-6 font-mono-ui text-xs text-neutral-400">
            <a href="/v2" className="rainbow-hover hover:text-black">Home</a>
            <a href="#" className="rainbow-hover hover:text-black">Terms</a>
            <a href="#" className="rainbow-hover hover:text-black">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
