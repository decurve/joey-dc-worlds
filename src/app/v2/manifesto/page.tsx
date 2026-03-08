import { ArrowRight } from "lucide-react";
import V2Nav from "../V2Nav";

export const metadata = {
  title: "Manifesto — Demand Curve",
  description:
    "Growth advice is everywhere. Growth systems are rare. Here's why we built Demand Curve.",
};

export default function ManifestoPage() {
  return (
    <div
      className="v2-world v2-bg text-[#1a1a1a] text-sm overflow-x-hidden selection:bg-yellow-200 selection:text-black"
      style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
    >
      <V2Nav currentPage="MANIFESTO" />

      {/* Hero */}
      <header className="max-w-3xl mx-auto pt-24 md:pt-32 px-6">
        <div className="font-mono-ui text-xs tracking-widest uppercase text-neutral-400 mb-8">
          / MANIFESTO
        </div>
        <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-6">
          Building something<br />from nothing is hard.
        </h1>
      </header>

      {/* Body */}
      <article className="max-w-3xl mx-auto px-6 pt-12 pb-24 md:pb-32">
        <div className="space-y-6 text-base md:text-lg font-light text-neutral-700 leading-relaxed">
          <p>
            Taking an idea from zero to one is already brutal. Doing it against companies with 10x your budget and 50x your headcount makes it feel impossible.
          </p>

          <p>
            And nobody&apos;s making it easier. The internet is full of people telling you what to do. Gurus with frameworks. LinkedIn posts about how someone 10x&apos;d their pipeline with one weird trick. Content written by people who&apos;ve never built anything.
          </p>

          <p className="text-black font-medium text-xl md:text-2xl leading-snug py-4">
            Most growth advice is noise dressed up as signal.
          </p>

          <p>
            We&apos;ve spent the last decade inside the problem. Working with startups. Studying what the best companies actually do — not what they say on podcasts, what they do. The internal playbooks. The real mechanics.
          </p>

          <p>
            What we learned: the companies that grow consistently aren&apos;t the ones with the best tactics. They&apos;re the ones that build systems. Positioning reinforces product. Product shapes distribution. Channels feed the model. Brand amplifies everything. When those pieces connect, growth becomes something you can design.
          </p>

          <p className="text-black font-medium text-xl md:text-2xl leading-snug py-4">
            We call these <span className="rainbow-text-hover cursor-default italic">growth systems</span>. Teaching people to build them is core to what we do.
          </p>

          <p>
            But that knowledge has always been locked up inside well-funded companies with massive teams. Startups are expected to compete with them anyway.
          </p>

          <div className="border-l-2 border-black/20 pl-6 py-2">
            <p className="text-black font-medium text-xl md:text-2xl leading-snug">
              Our mission is to level that playing field.
            </p>
          </div>

          <div className="border-t border-black/10 my-8" />

          <p>
            When we started sharing what we knew — openly, without the usual marketing bullshit — something happened. People showed up. Not just for the knowledge. For each other. Founders tired of figuring it out alone. Operators who got laid off and decided to build. Small teams going up against giants.
          </p>

          <p>
            And that changed what this could be.
          </p>

          <div className="border-t border-black/10 my-8" />

          <p>
            A ten-person startup will never out-resource a company with thousands of employees. Growth systems help — they give you leverage you didn&apos;t have before. But even the best system has limits when you&apos;re one team against an army.
          </p>

          <p className="text-black font-medium text-xl md:text-2xl leading-snug py-4">
            Unless you&apos;re not just one team.
          </p>

          <p>
            100,000+ builders sharing what&apos;s working in real time. What the bleeding edge looks like right now. You&apos;re no longer guessing alone — you have the collective intelligence of people fighting the same fight.
          </p>

          <div className="border-l-2 border-black/20 pl-6 py-2">
            <p className="text-black font-medium text-xl md:text-2xl leading-snug">
              The incumbents have headcount. We have each other.
            </p>
          </div>

          <p>
            The systems give you the playbook. The community gives you the edge. That&apos;s what Demand Curve is. A home for the challengers and builders trying to take on the world without the safety net of unlimited resources.
          </p>

          <p className="text-black font-medium text-2xl md:text-3xl leading-snug py-4">
            If that sounds like you, you&apos;re in the right place.
          </p>

          <div className="pt-8">
            <div className="text-black font-medium text-lg">— Justin</div>
            <div className="font-mono-ui text-xs text-neutral-400 mt-1">CEO & Founder, Demand Curve</div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 pt-12 border-t border-black/10 flex flex-col sm:flex-row gap-4">
          <a
            href="/v2#services"
            className="bg-black text-white px-6 py-3 rounded-sm hover:bg-neutral-800 transition-colors font-medium text-sm flex items-center gap-2 w-max"
          >
            Explore Our Services <ArrowRight className="w-4 h-4" />
          </a>
          <a
            href="/v2/growth-program"
            className="rainbow-hover border border-black/20 px-6 py-3 rounded-sm hover:bg-black/5 transition-colors font-medium text-sm w-max"
          >
            Build It Yourself
          </a>
        </div>
      </article>

      {/* Footer */}
      <footer className="border-t border-black/10 py-8">
        <div className="max-w-3xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="font-mono-ui text-xs text-neutral-400">
            &copy; 2026 Demand Curve
          </div>
          <div className="flex gap-6 font-mono-ui text-xs text-neutral-400">
            <a href="/v2" className="rainbow-hover hover:text-black">
              Home
            </a>
            <a href="#" className="rainbow-hover hover:text-black">
              Terms
            </a>
            <a href="#" className="rainbow-hover hover:text-black">
              Privacy
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
