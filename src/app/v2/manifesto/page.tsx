import { ArrowRight } from "lucide-react";
import V2Nav from "../V2Nav";
import GlowButton from "../GlowButton";

export const metadata = {
  title: "Manifesto — Demand Curve",
  description:
    "Growth advice is everywhere. Growth systems are rare. Here's why we built Demand Curve.",
};

export default function ManifestoPage() {
  return (
    <div
      className="v2-world v2-bg text-[#1a1a1a] text-sm selection:bg-yellow-200 selection:text-black"
      style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", position: "relative", zIndex: 2, overflowX: "clip" }}
    >
      {/* ── Side borders + checkerboard ── */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 50 }}>
        <div className="absolute top-0 bottom-0" style={{ left: 16, borderLeft: "1px solid rgba(0,0,0,0.10)" }} />
        <div className="absolute top-0 bottom-0" style={{ right: 16, borderRight: "1px solid rgba(0,0,0,0.10)" }} />
        <div
          className="absolute top-0 bottom-0 left-0"
          style={{ width: 16, background: "repeating-conic-gradient(#e4e8ec 0% 25%, #eef1f4 0% 50%) 0 0 / 5px 5px" }}
        />
        <div
          className="absolute top-0 bottom-0 right-0"
          style={{ width: 16, background: "repeating-conic-gradient(#e4e8ec 0% 25%, #eef1f4 0% 50%) 0 0 / 5px 5px" }}
        />
      </div>

      <V2Nav currentPage="MANIFESTO" />

      {/* Main content */}
      <div className="relative v2-bg" style={{ margin: "0 17px", zIndex: 3 }}>
        <div className="px-6">

          {/* Hero — clean, editorial */}
          <header className="max-w-3xl mx-auto pt-24 md:pt-32 pb-12">
            <div className="section-tag mb-8">Manifesto</div>
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight">
              Building something<br />from nothing is hard.
            </h1>
          </header>

          {/* Broadsheet-style article container */}
          <section className="max-w-[900px] mx-auto pb-20 md:pb-28">

            {/* Ornamental top rule — borrowed from newsletter aesthetic */}
            <div className="flex items-center gap-2 mb-10">
              <div className="flex-1 h-px bg-black/80" />
              <div className="w-1.5 h-1.5 border border-black rotate-45" />
              <span className="diamond-cycle" />
              <div className="w-1.5 h-1.5 border border-black rotate-45" />
              <div className="flex-1 h-px bg-black/80" />
            </div>

            {/* Article body */}
            <article>
              <div className="space-y-6 text-base md:text-lg font-light text-neutral-700 leading-relaxed">
                <p>
                  Taking an idea from zero to one is already brutal. Doing it against companies with 10x your budget and 50x your headcount makes it feel impossible.
                </p>

                <p>
                  And nobody&apos;s making it easier. The internet is full of people telling you what to do. Gurus with frameworks. LinkedIn posts about how someone 10x&apos;d their pipeline with one weird trick. Content written by people who&apos;ve never built anything.
                </p>

                <p className="text-black font-heading text-xl md:text-2xl leading-snug py-4">
                  Most growth advice is noise dressed up as signal.
                </p>

                <p>
                  We&apos;ve spent the last decade inside the problem. Working with startups. Studying what the best companies actually do — not what they say on podcasts, what they do. The internal playbooks. The real mechanics.
                </p>

                <p>
                  What we learned: the companies that grow consistently aren&apos;t the ones with the best tactics. They&apos;re the ones that build systems. Positioning reinforces product. Product shapes distribution. Channels feed the model. Brand amplifies everything. When those pieces connect, growth becomes something you can design.
                </p>

                <p className="text-black font-heading text-xl md:text-2xl leading-snug py-4">
                  We call these <span className="rainbow-text-hover cursor-default italic">growth systems</span>. Teaching people to build them is core to what we do.
                </p>

                <p>
                  But that knowledge has always been locked up inside well-funded companies with massive teams. Startups are expected to compete with them anyway.
                </p>

                <div className="border-l-2 border-black/20 pl-6 py-2 hover:bg-[length:6px_6px] transition-all" style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 2px, rgba(0,0,0,0.015) 2px, rgba(0,0,0,0.015) 4px)" }}>
                  <p className="text-black font-heading text-xl md:text-2xl leading-snug">
                    Our mission is to level that playing field.
                  </p>
                </div>

                {/* Ornamental divider */}
                <div className="flex items-center gap-2 my-10">
                  <div className="flex-1 h-px bg-black/20" />
                  <span className="diamond-cycle" />
                  <div className="flex-1 h-px bg-black/20" />
                </div>

                <p>
                  When we started sharing what we knew — openly, without the usual marketing bullshit — something happened. People showed up. Not just for the knowledge. For each other. Founders tired of figuring it out alone. Operators who got laid off and decided to build. Small teams going up against giants.
                </p>

                <p>
                  And that changed what this could be.
                </p>

                {/* Ornamental divider */}
                <div className="flex items-center gap-2 my-10">
                  <div className="flex-1 h-px bg-black/20" />
                  <span className="diamond-cycle" />
                  <div className="flex-1 h-px bg-black/20" />
                </div>

                <p>
                  A ten-person startup will never out-resource a company with thousands of employees. Growth systems help — they give you leverage you didn&apos;t have before. But even the best system has limits when you&apos;re one team against an army.
                </p>

                <p className="text-black font-heading text-xl md:text-2xl leading-snug py-4">
                  Unless you&apos;re not just one team.
                </p>

                <p>
                  100,000+ builders sharing what&apos;s working in real time. What the bleeding edge looks like right now. You&apos;re no longer guessing alone — you have the collective intelligence of people fighting the same fight.
                </p>

                <div className="border-l-2 border-black/20 pl-6 py-2 hover:bg-[length:6px_6px] transition-all" style={{ backgroundImage: "repeating-linear-gradient(135deg, transparent, transparent 2px, rgba(0,0,0,0.015) 2px, rgba(0,0,0,0.015) 4px)" }}>
                  <p className="text-black font-heading text-xl md:text-2xl leading-snug">
                    The incumbents have headcount. We have each other.
                  </p>
                </div>

                <p>
                  The systems give you the playbook. The community gives you the edge. That&apos;s what Demand Curve is. A home for the challengers and builders trying to take on the world without the safety net of unlimited resources.
                </p>

                <p className="text-black font-heading text-2xl md:text-3xl leading-snug py-4">
                  If that sounds like you, you&apos;re in the right place.
                </p>

                <div className="pt-8">
                  <div className="text-black font-medium text-lg">— Justin</div>
                  <div className="font-mono-ui text-xs text-neutral-400 mt-1">CEO & Founder, Demand Curve</div>
                </div>
              </div>

              {/* Ornamental bottom rule */}
              <div className="flex items-center gap-2 mt-16 mb-10">
                <div className="flex-1 h-px bg-black/80" />
                <div className="w-1.5 h-1.5 border border-black rotate-45" />
                <span className="diamond-cycle" />
                <div className="w-1.5 h-1.5 border border-black rotate-45" />
                <div className="flex-1 h-px bg-black/80" />
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <GlowButton href="/v2#studio" className="px-6 py-3">
                  Explore the Growth Studio <ArrowRight className="w-4 h-4" />
                </GlowButton>
                <a
                  href="/v2/growth-program"
                  className="rainbow-hover inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-neutral-500 hover:text-black transition-colors"
                >
                  Build It Yourself <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </article>
          </section>

          {/* Footer */}
          <footer className="border-t border-black/10 pt-8 pb-8">
            <div className="flex justify-between items-end font-mono-ui text-xs text-neutral-500 uppercase">
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 rounded-full border border-black/20 flex items-center justify-center">
                  <span className="text-[8px] font-serif font-bold">D</span>
                </div>
                <span>&copy; 2026 Demand Curve</span>
              </div>
              <div className="flex gap-6">
                <a href="/v2" className="rainbow-hover hover:text-black">Home</a>
                <a href="#" className="rainbow-hover hover:text-black">Privacy</a>
                <a href="#" className="rainbow-hover hover:text-black">Terms</a>
              </div>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
}
