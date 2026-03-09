"use client";

import { ArrowRight, ArrowUpRight, Mail, Send, Inbox, BookOpen, Zap, TrendingUp, Sparkles, Star, Clock, Users, FileText, ChevronDown, ChevronRight, Bell, Newspaper, Radio, Rss, ExternalLink, Check, Quote, Play, Hash } from "lucide-react";
import { useState } from "react";

/* ── Shared data ── */
const recentEditions = [
  { title: "Your Growth Experiments Are Lying to You", type: "Tactics", date: "Mar 4", number: "#247", readTime: "6 min" },
  { title: "Stop Pulling the Wrong Growth Levers", type: "Strategy", date: "Feb 25", number: "#246", readTime: "8 min" },
  { title: "How Two Words Generated Millions in Revenue", type: "Case Study", date: "Feb 18", number: "#245", readTime: "5 min" },
  { title: "The Channel Most Startups Pick Wrong", type: "Framework", date: "Feb 11", number: "#244", readTime: "7 min" },
  { title: "Why Your Positioning Isn't Landing", type: "Deep Dive", date: "Feb 4", number: "#243", readTime: "9 min" },
  { title: "The Retention Playbook Nobody Talks About", type: "Playbook", date: "Jan 28", number: "#242", readTime: "7 min" },
  { title: "How to Price When You Have No Idea", type: "Framework", date: "Jan 21", number: "#241", readTime: "6 min" },
  { title: "The Landing Page That Converts at 3x", type: "Case Study", date: "Jan 14", number: "#240", readTime: "5 min" },
];

const topics = [
  { name: "Positioning", count: 24 },
  { name: "Paid Acquisition", count: 31 },
  { name: "Pricing", count: 18 },
  { name: "Retention", count: 15 },
  { name: "Landing Pages", count: 22 },
  { name: "Experiments", count: 19 },
];

const testimonials = [
  { quote: "This is the only newsletter I actually read every single time it hits my inbox. No fluff — just real tactics I can use that week.", author: "VP of Marketing", company: "Series A SaaS" },
  { quote: "Demand Curve consistently delivers frameworks I can implement the same day. It's my Monday morning ritual.", author: "Head of Growth", company: "B2B Marketplace" },
  { quote: "I've tried 50+ growth newsletters. This one actually changes how I think about problems.", author: "Founder & CEO", company: "PLG Startup" },
];

const stats = [
  { value: "100K+", label: "Subscribers" },
  { value: "247", label: "Editions" },
  { value: "4,500+", label: "Startups Trained" },
  { value: "Weekly", label: "Every Tuesday" },
];

const sectionHeader = {
  tag: "The Community",
  title: "The Growth Newsletter",
  subtitle: "Join 100,000+ operators receiving growth systems, tactics, and insights delivered straight from the frontier.",
  cta: "Subscribe — it's free",
};

function SectionLabel({ n, title }: { n: number; title?: string }) {
  return (
    <div className="sticky top-0 z-20 bg-[#f9f9f8] border-b border-black/10 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">Variation</span>
        <span className="font-heading text-2xl">{n}</span>
        {title && <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400 ml-4">{title}</span>}
      </div>
      <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">Newsletter</span>
    </div>
  );
}

function EmailInput({ dark = false }: { dark?: boolean }) {
  return (
    <div className="flex max-w-md gap-2">
      <input
        type="email"
        placeholder="your@email.com"
        className={`flex-1 border rounded-sm px-4 py-3 text-sm focus:outline-none focus:ring-1 placeholder:text-neutral-400 ${
          dark
            ? "border-white/15 bg-white/[0.06] text-white focus:ring-white/20 placeholder:text-neutral-500"
            : "border-black/15 bg-white focus:ring-black/20"
        }`}
      />
      <button className={`px-5 py-3 rounded-sm transition-colors text-sm font-medium shrink-0 ${
        dark ? "bg-white text-black hover:bg-neutral-200" : "bg-black text-white hover:bg-neutral-800"
      }`}>
        Subscribe
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 1: Two-Column Split (current style refined)
   ═══════════════════════════════════════════════════ */
function V1() {
  return (
    <div>
      <SectionLabel n={1} title="Two-Column Split" />
      <div className="px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-0">
          <div className="flex-1 md:pr-12 md:border-r border-black/10">
            <div className="section-tag mb-6">{sectionHeader.tag}</div>
            <h2 className="font-heading text-4xl md:text-6xl tracking-tight mb-4">{sectionHeader.title}</h2>
            <p className="text-neutral-600 font-light text-base leading-relaxed mb-8">{sectionHeader.subtitle}</p>
            <EmailInput />
            <p className="text-xs text-neutral-400 mt-3">Free. No spam. Unsubscribe anytime.</p>

            <div className="mt-12">
              <div className="font-mono-ui text-[10px] tracking-widest text-neutral-400 mb-3 uppercase">Recent Editions</div>
              <div className="border-t border-black/10">
                {recentEditions.map((item, i) => (
                  <a key={item.title} href="#" className="feed-row flex items-center border-b border-black/10 px-4 py-3 group cursor-pointer" style={{ "--row-hue": `${(i * 60 + 20) % 360}` } as React.CSSProperties}>
                    <div className="flex-1 text-sm md:text-base font-medium leading-tight">{item.title}</div>
                    <span className="feed-type-badge inline-block rounded-sm px-2 py-0.5 text-[9px] font-mono-ui uppercase tracking-widest border border-black/10 bg-white transition-colors">{item.type}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-shrink-0 md:w-[340px] lg:w-[400px] md:pl-12 pt-12 md:pt-0 flex flex-col justify-center">
            <p className="text-lg font-light text-neutral-600 leading-relaxed italic">
              &ldquo;{testimonials[0].quote}&rdquo;
            </p>
            <div className="font-mono-ui text-xs text-neutral-400 mt-4">— {testimonials[0].author}, {testimonials[0].company}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 2: Centered Hero (big typography)
   ═══════════════════════════════════════════════════ */
function V2() {
  return (
    <div>
      <SectionLabel n={2} title="Centered Hero" />
      <div className="px-6 py-20 md:py-32 text-center">
        <div className="section-tag mb-4 justify-center">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-8xl tracking-tight mb-6">{sectionHeader.title}</h2>
        <p className="text-neutral-500 font-light text-lg max-w-2xl mx-auto mb-10">{sectionHeader.subtitle}</p>
        <div className="flex max-w-md gap-2 mx-auto mb-3">
          <input type="email" placeholder="your@email.com" className="flex-1 border border-black/15 rounded-sm px-4 py-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black/20 placeholder:text-neutral-400" />
          <button className="bg-black text-white px-5 py-3 rounded-sm hover:bg-neutral-800 transition-colors text-sm font-medium shrink-0">Subscribe</button>
        </div>
        <p className="text-xs text-neutral-400 mb-12">Free. No spam. Unsubscribe anytime.</p>

        <div className="flex justify-center gap-10 md:gap-16">
          {stats.map(s => (
            <div key={s.label}>
              <div className="font-heading text-3xl md:text-4xl tracking-tight">{s.value}</div>
              <div className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 3: Inbox / Email Client UI
   ═══════════════════════════════════════════════════ */
function V3() {
  return (
    <div>
      <SectionLabel n={3} title="Email Client" />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-4">{sectionHeader.title}</h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-8">{sectionHeader.subtitle}</p>

        <div className="border border-black/10 max-w-3xl">
          {/* Toolbar */}
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-black/10 bg-neutral-50">
            <Inbox className="w-4 h-4 text-neutral-400" />
            <span className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest">Inbox — Demand Curve</span>
            <span className="ml-auto font-mono-ui text-[10px] text-neutral-400">{recentEditions.length} unread</span>
          </div>
          {recentEditions.map((item, i) => (
            <div key={i} className="flex items-center border-b border-black/10 last:border-b-0 px-4 py-4 group program-row-hover cursor-pointer">
              <div className="w-2 h-2 rounded-full bg-black mr-3 shrink-0" />
              <span className="font-mono-ui text-[10px] text-neutral-400 w-16 shrink-0">{item.date}</span>
              <div className="flex-1 text-sm font-medium leading-tight">{item.title}</div>
              <span className="font-mono-ui text-[10px] text-neutral-400 ml-4">{item.readTime}</span>
            </div>
          ))}
          {/* Subscribe bar */}
          <div className="px-4 py-4 bg-neutral-50 border-t border-black/10">
            <div className="flex max-w-md gap-2">
              <input type="email" placeholder="your@email.com" className="flex-1 border border-black/15 rounded-sm px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black/20 placeholder:text-neutral-400" />
              <button className="bg-black text-white px-4 py-2 rounded-sm hover:bg-neutral-800 transition-colors text-sm font-medium flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> Subscribe</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 4: Dark Mode CTA Block
   ═══════════════════════════════════════════════════ */
function V4() {
  return (
    <div>
      <SectionLabel n={4} title="Dark Block" />
      <div className="px-6 py-16 md:py-24">
        <div className="bg-[#0a0a0a] text-white px-8 md:px-16 py-16 md:py-24 rounded-sm">
          <div className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-500 mb-4">{sectionHeader.tag}</div>
          <h2 className="font-heading text-4xl md:text-7xl tracking-tight mb-4">{sectionHeader.title}</h2>
          <p className="text-neutral-400 font-light text-base max-w-2xl mb-10">{sectionHeader.subtitle}</p>
          <EmailInput dark />
          <p className="text-xs text-neutral-500 mt-3">Free. No spam. Unsubscribe anytime.</p>

          <div className="mt-16 flex gap-10 md:gap-16">
            {stats.map(s => (
              <div key={s.label}>
                <div className="font-heading text-2xl md:text-3xl tracking-tight text-white">{s.value}</div>
                <div className="font-mono-ui text-[10px] text-neutral-500 uppercase tracking-widest mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 5: Terminal / CLI Subscribe
   ═══════════════════════════════════════════════════ */
function V5() {
  return (
    <div>
      <SectionLabel n={5} title="Terminal CLI" />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-4">{sectionHeader.title}</h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-8">{sectionHeader.subtitle}</p>

        <div className="border border-black/10 max-w-2xl font-mono-ui text-xs">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-black/10 bg-neutral-50">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <span className="text-[10px] text-neutral-400 ml-2">~/demand-curve/newsletter</span>
          </div>
          <div className="p-4 space-y-2 text-neutral-600">
            <div><span className="text-neutral-400">$</span> dc newsletter --status</div>
            <div className="text-neutral-400">→ 247 editions published</div>
            <div className="text-neutral-400">→ 100,000+ active subscribers</div>
            <div className="text-neutral-400">→ 4,500+ startups trained through our systems</div>
            <div className="mt-4"><span className="text-neutral-400">$</span> dc newsletter --recent</div>
            {recentEditions.map((item, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-neutral-400 shrink-0">{item.number}</span>
                <span className="text-black">{item.title}</span>
                <span className="text-neutral-300 ml-auto shrink-0">{item.type}</span>
              </div>
            ))}
            <div className="mt-4"><span className="text-neutral-400">$</span> dc subscribe --email <span className="text-black">_</span></div>
          </div>
          <div className="px-4 py-3 bg-neutral-50 border-t border-black/10">
            <EmailInput />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 6: Magazine / Editorial Layout
   ═══════════════════════════════════════════════════ */
function V6() {
  return (
    <div>
      <SectionLabel n={6} title="Magazine Editorial" />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-12">{sectionHeader.title}</h2>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Feature article */}
          <div className="md:col-span-2 border border-black/10 p-8">
            <div className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400 mb-3">Latest Edition — {recentEditions[0].number}</div>
            <h3 className="font-heading text-3xl md:text-4xl tracking-tight mb-4">{recentEditions[0].title}</h3>
            <p className="text-neutral-600 font-light leading-relaxed mb-6">Growth experiments should be your most powerful tool. But most teams run them wrong — they optimize for speed instead of learning, test the wrong variables, and declare winners too early.</p>
            <a href="#" className="text-sm font-medium flex items-center gap-2 hover:text-neutral-600 transition-colors">Read this edition <ArrowRight className="w-3.5 h-3.5" /></a>
          </div>

          {/* Sidebar articles */}
          <div className="border border-black/10 flex flex-col">
            {recentEditions.slice(1, 4).map((item, i) => (
              <a key={i} href="#" className="flex-1 p-5 border-b border-black/10 last:border-b-0 hover:bg-neutral-50 transition-colors">
                <div className="font-mono-ui text-[10px] text-neutral-400 mb-1">{item.number} · {item.type}</div>
                <div className="text-sm font-medium leading-snug">{item.title}</div>
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-black/10 pt-8 flex flex-col md:flex-row md:items-center gap-6">
          <p className="text-neutral-600 font-light text-base">{sectionHeader.subtitle}</p>
          <div className="shrink-0">
            <EmailInput />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 7: Stat Banner + Testimonials
   ═══════════════════════════════════════════════════ */
function V7() {
  return (
    <div>
      <SectionLabel n={7} title="Stats + Testimonials" />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-4">{sectionHeader.title}</h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-8">{sectionHeader.subtitle}</p>
        <EmailInput />
        <p className="text-xs text-neutral-400 mt-3">Free. No spam. Unsubscribe anytime.</p>

        {/* Stat bar */}
        <div className="mt-16 flex border-t border-b border-black/10 divide-x divide-black/10">
          {stats.map(s => (
            <div key={s.label} className="flex-1 py-6 px-4 text-center">
              <div className="font-heading text-3xl tracking-tight">{s.value}</div>
              <div className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonials row */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="border-l-2 border-black/10 pl-6">
              <p className="text-sm font-light text-neutral-600 leading-relaxed italic mb-4">&ldquo;{t.quote}&rdquo;</p>
              <div className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest">— {t.author}, {t.company}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 8: Bento Grid
   ═══════════════════════════════════════════════════ */
function V8() {
  return (
    <div>
      <SectionLabel n={8} title="Bento Grid" />
      <div className="px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-4">
          {/* Main CTA */}
          <div className="md:col-span-2 md:row-span-2 border border-black/10 p-8 md:p-12 flex flex-col justify-between">
            <div>
              <div className="section-tag mb-4">{sectionHeader.tag}</div>
              <h2 className="font-heading text-4xl md:text-6xl tracking-tight mb-4">{sectionHeader.title}</h2>
              <p className="text-neutral-500 font-light text-base max-w-xl mb-8">{sectionHeader.subtitle}</p>
            </div>
            <div>
              <EmailInput />
              <p className="text-xs text-neutral-400 mt-3">Free. No spam. Unsubscribe anytime.</p>
            </div>
          </div>

          {/* Stats cards */}
          {stats.slice(0, 2).map(s => (
            <div key={s.label} className="border border-black/10 p-6 flex flex-col justify-center">
              <div className="font-heading text-4xl tracking-tight">{s.value}</div>
              <div className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest mt-1">{s.label}</div>
            </div>
          ))}

          {/* Testimonial */}
          <div className="border border-black/10 p-6 bg-neutral-50">
            <Quote className="w-5 h-5 text-neutral-300 mb-3" />
            <p className="text-sm font-light text-neutral-600 leading-relaxed italic">&ldquo;{testimonials[0].quote}&rdquo;</p>
            <div className="font-mono-ui text-[10px] text-neutral-400 mt-3">— {testimonials[0].author}</div>
          </div>

          {/* Topic pills */}
          <div className="md:col-span-2 border border-black/10 p-6">
            <div className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest mb-3">Topics We Cover</div>
            <div className="flex flex-wrap gap-2">
              {topics.map(t => (
                <span key={t.name} className="px-3 py-1.5 text-xs font-mono-ui border border-black/10 rounded-sm">{t.name} <span className="text-neutral-400">({t.count})</span></span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 9: Full-Width Banner
   ═══════════════════════════════════════════════════ */
function V9() {
  return (
    <div>
      <SectionLabel n={9} title="Full-Width Banner" />
      <div className="border-t border-b border-black/10 bg-neutral-50">
        <div className="px-6 py-16 md:py-20 flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6" />
              <h2 className="font-heading text-3xl md:text-5xl tracking-tight">{sectionHeader.title}</h2>
            </div>
            <p className="text-neutral-600 font-light text-base leading-relaxed max-w-xl">{sectionHeader.subtitle}</p>
          </div>
          <div className="shrink-0">
            <EmailInput />
            <p className="text-xs text-neutral-400 mt-3">Free. No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 10: Accordion Topics
   ═══════════════════════════════════════════════════ */
function V10() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      <SectionLabel n={10} title="Accordion Topics" />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-4">{sectionHeader.title}</h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-8">{sectionHeader.subtitle}</p>
        <EmailInput />
        <p className="text-xs text-neutral-400 mt-3 mb-12">Free. No spam. Unsubscribe anytime.</p>

        <div className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400 mb-3">What You&apos;ll Learn</div>
        <div className="border-t border-black/10">
          {topics.map((topic, i) => (
            <div key={topic.name} className="border-b border-black/10">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between py-5 text-left group program-row-hover">
                <div className="flex items-center gap-4">
                  <span className="font-mono-ui text-xs text-neutral-400">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="text-lg font-medium">{topic.name}</h3>
                  <span className="font-mono-ui text-[10px] text-neutral-400">{topic.count} articles</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-300 ${open === i ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open === i ? "max-h-[200px] pb-5" : "max-h-0"}`}>
                <div className="pl-12 space-y-2">
                  {recentEditions.filter(e => i === 0 ? true : i < 3).slice(0, 2).map((e, j) => (
                    <a key={j} href="#" className="flex items-center gap-3 text-sm text-neutral-600 hover:text-black transition-colors">
                      <ArrowRight className="w-3 h-3" /> {e.title}
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
   VARIATION 11: Notification / Alert Style
   ═══════════════════════════════════════════════════ */
function V11() {
  return (
    <div>
      <SectionLabel n={11} title="Notification Alert" />
      <div className="px-6 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          {/* Notification card */}
          <div className="border border-black/10 rounded-sm overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-3 bg-neutral-50 border-b border-black/10">
              <Bell className="w-4 h-4 text-neutral-500" />
              <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-500">New from Demand Curve</span>
              <span className="ml-auto font-mono-ui text-[10px] text-neutral-400">Every Tuesday</span>
            </div>
            <div className="p-6 md:p-10">
              <h2 className="font-heading text-3xl md:text-5xl tracking-tight mb-4">{sectionHeader.title}</h2>
              <p className="text-neutral-600 font-light text-base leading-relaxed mb-8">{sectionHeader.subtitle}</p>
              <EmailInput />
              <p className="text-xs text-neutral-400 mt-3">Free. No spam. Unsubscribe anytime.</p>

              <div className="mt-10 pt-6 border-t border-black/10 flex flex-wrap gap-6">
                {stats.map(s => (
                  <div key={s.label}>
                    <span className="font-heading text-xl">{s.value}</span>
                    <span className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest ml-2">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 12: RSS Feed Style
   ═══════════════════════════════════════════════════ */
function V12() {
  return (
    <div>
      <SectionLabel n={12} title="RSS Feed" />
      <div className="px-6 py-16 md:py-24">
        <div className="flex items-center gap-3 mb-8">
          <Rss className="w-5 h-5 text-neutral-400" />
          <div className="section-tag mb-0">{sectionHeader.tag}</div>
        </div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-4">{sectionHeader.title}</h2>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-10">{sectionHeader.subtitle}</p>

        {/* Feed */}
        <div className="max-w-3xl space-y-0">
          {recentEditions.map((item, i) => (
            <div key={i} className="border-b border-black/10 py-6 group">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-mono-ui text-[10px] text-neutral-400">{item.date}</span>
                <span className="w-1 h-1 rounded-full bg-neutral-300" />
                <span className="font-mono-ui text-[10px] text-neutral-400">{item.number}</span>
                <span className="w-1 h-1 rounded-full bg-neutral-300" />
                <span className="font-mono-ui text-[10px] text-neutral-400">{item.readTime} read</span>
              </div>
              <h3 className="text-lg md:text-xl font-medium mb-2 group-hover:text-neutral-600 transition-colors cursor-pointer">{item.title}</h3>
              <div className="flex items-center gap-3">
                <span className="inline-block rounded-sm px-2 py-0.5 text-[9px] font-mono-ui uppercase tracking-widest border border-black/10">{item.type}</span>
                <a href="#" className="text-xs text-neutral-400 hover:text-black transition-colors flex items-center gap-1">Read <ExternalLink className="w-3 h-3" /></a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-black/10">
          <p className="text-sm text-neutral-500 mb-4">Get every edition in your inbox.</p>
          <EmailInput />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 13: Minimal Card
   ═══════════════════════════════════════════════════ */
function V13() {
  return (
    <div>
      <SectionLabel n={13} title="Minimal Card" />
      <div className="px-6 py-16 md:py-24 flex justify-center">
        <div className="max-w-lg w-full border border-black/10 p-8 md:p-12">
          <Mail className="w-8 h-8 mb-6" />
          <h2 className="font-heading text-3xl tracking-tight mb-3">{sectionHeader.title}</h2>
          <p className="text-neutral-600 font-light text-sm leading-relaxed mb-8">{sectionHeader.subtitle}</p>
          <div className="space-y-3">
            <input type="email" placeholder="your@email.com" className="w-full border border-black/15 rounded-sm px-4 py-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black/20 placeholder:text-neutral-400" />
            <button className="w-full bg-black text-white py-3 rounded-sm hover:bg-neutral-800 transition-colors text-sm font-medium">Subscribe — it&apos;s free</button>
          </div>
          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-black/10">
            <Check className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-xs text-neutral-400">100,000+ subscribers</span>
            <Check className="w-3.5 h-3.5 text-neutral-400" />
            <span className="text-xs text-neutral-400">4,500+ startups</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 14: Big Number Emphasis
   ═══════════════════════════════════════════════════ */
function V14() {
  return (
    <div>
      <SectionLabel n={14} title="Big Number" />
      <div className="px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-end">
          <div>
            <div className="section-tag mb-4">{sectionHeader.tag}</div>
            <div className="font-heading text-[120px] md:text-[180px] leading-[0.85] tracking-tighter text-black/10">100K</div>
          </div>
          <div className="flex-1 pb-4">
            <h2 className="font-heading text-3xl md:text-5xl tracking-tight mb-4">{sectionHeader.title}</h2>
            <p className="text-neutral-600 font-light text-base leading-relaxed mb-8 max-w-lg">{sectionHeader.subtitle}</p>
            <EmailInput />
            <p className="text-xs text-neutral-400 mt-3">Free. No spam. Unsubscribe anytime.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 15: Horizontal Scroll Editions
   ═══════════════════════════════════════════════════ */
function V15() {
  return (
    <div>
      <SectionLabel n={15} title="Horizontal Scroll" />
      <div className="px-6 py-16 md:py-24">
        <div className="section-tag mb-4">{sectionHeader.tag}</div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
          <h2 className="font-heading text-5xl md:text-7xl tracking-tight">{sectionHeader.title}</h2>
          <div className="mt-4 md:mt-0 shrink-0">
            <EmailInput />
          </div>
        </div>
        <p className="text-neutral-500 font-light text-base max-w-3xl mb-10">{sectionHeader.subtitle}</p>

        {/* Horizontal scroll */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x">
          {recentEditions.map((item, i) => (
            <a key={i} href="#" className="min-w-[280px] border border-black/10 p-6 shrink-0 snap-start hover:bg-neutral-50 transition-colors group">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono-ui text-[10px] text-neutral-400">{item.number}</span>
                <span className="inline-block rounded-sm px-2 py-0.5 text-[9px] font-mono-ui uppercase tracking-widest border border-black/10">{item.type}</span>
              </div>
              <h3 className="text-base font-medium leading-snug mb-3">{item.title}</h3>
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>{item.date}</span>
                <span>{item.readTime} read</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 16: Newspaper Front Page
   ═══════════════════════════════════════════════════ */
function V16() {
  return (
    <div>
      <SectionLabel n={16} title="Newspaper" />
      <div className="px-6 py-16 md:py-24">
        <div className="border border-black/10 max-w-4xl mx-auto">
          {/* Masthead */}
          <div className="text-center py-6 border-b border-black/10">
            <div className="font-mono-ui text-[10px] uppercase tracking-[0.3em] text-neutral-400 mb-2">Est. 2020 · Published Weekly · Free</div>
            <h2 className="font-heading text-5xl md:text-7xl tracking-tight">{sectionHeader.title}</h2>
            <div className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400 mt-2">&ldquo;The growth tactics operators actually use&rdquo;</div>
          </div>

          {/* Columns */}
          <div className="grid md:grid-cols-2 divide-x divide-black/10">
            <div className="p-6 md:p-8">
              <div className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest mb-2">Lead Story</div>
              <h3 className="font-heading text-2xl tracking-tight mb-3">{recentEditions[0].title}</h3>
              <p className="text-sm text-neutral-600 font-light leading-relaxed mb-4">Growth experiments should be your most powerful tool. But most teams run them wrong — they optimize for speed instead of learning...</p>
              <a href="#" className="text-xs font-medium flex items-center gap-1 hover:text-neutral-600">Continue reading <ArrowRight className="w-3 h-3" /></a>
            </div>
            <div className="p-6 md:p-8">
              <div className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest mb-4">Also This Week</div>
              <div className="space-y-4">
                {recentEditions.slice(1).map((item, i) => (
                  <div key={i} className="border-b border-black/10 last:border-b-0 pb-4 last:pb-0">
                    <div className="text-sm font-medium mb-1">{item.title}</div>
                    <div className="font-mono-ui text-[10px] text-neutral-400">{item.type} · {item.readTime}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Subscribe footer */}
          <div className="border-t border-black/10 px-6 md:px-8 py-6 flex flex-col md:flex-row md:items-center gap-4">
            <p className="text-sm text-neutral-500 flex-1">Delivered to your inbox every Tuesday.</p>
            <EmailInput />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 17: Social Proof Wall
   ═══════════════════════════════════════════════════ */
function V17() {
  return (
    <div>
      <SectionLabel n={17} title="Social Proof Wall" />
      <div className="px-6 py-16 md:py-24">
        <div className="text-center mb-12">
          <div className="section-tag mb-4 justify-center">{sectionHeader.tag}</div>
          <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-4">{sectionHeader.title}</h2>
          <p className="text-neutral-500 font-light text-base max-w-2xl mx-auto">{sectionHeader.subtitle}</p>
        </div>

        {/* Testimonial wall */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {testimonials.map((t, i) => (
            <div key={i} className="border border-black/10 p-6">
              <div className="flex gap-1 mb-4">
                {[0,1,2,3,4].map(j => <Star key={j} className="w-3.5 h-3.5 fill-black" />)}
              </div>
              <p className="text-sm font-light text-neutral-600 leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
              <div className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest">{t.author} · {t.company}</div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="flex max-w-md gap-2 mx-auto mb-3">
            <input type="email" placeholder="your@email.com" className="flex-1 border border-black/15 rounded-sm px-4 py-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black/20 placeholder:text-neutral-400" />
            <button className="bg-black text-white px-5 py-3 rounded-sm hover:bg-neutral-800 transition-colors text-sm font-medium">Subscribe</button>
          </div>
          <p className="text-xs text-neutral-400">Join 100,000+ operators. Free forever.</p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 18: Sticky CTA Bar
   ═══════════════════════════════════════════════════ */
function V18() {
  return (
    <div>
      <SectionLabel n={18} title="Sticky CTA Bar" />
      <div className="px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Content side */}
          <div className="flex-1">
            <div className="section-tag mb-4">{sectionHeader.tag}</div>
            <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-8">{sectionHeader.title}</h2>

            <div className="space-y-6">
              {recentEditions.map((item, i) => (
                <a key={i} href="#" className="block border border-black/10 p-5 hover:bg-neutral-50 transition-colors group">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono-ui text-[10px] text-neutral-400">{item.number} · {item.date}</span>
                    <ArrowUpRight className="w-4 h-4 text-neutral-300 group-hover:text-black transition-colors" />
                  </div>
                  <h3 className="text-lg font-medium mb-1">{item.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className="inline-block rounded-sm px-2 py-0.5 text-[9px] font-mono-ui uppercase tracking-widest border border-black/10">{item.type}</span>
                    <span className="text-xs text-neutral-400">{item.readTime} read</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Sticky subscribe */}
          <div className="md:w-[320px] shrink-0">
            <div className="md:sticky md:top-20 border border-black/10 p-6">
              <Mail className="w-6 h-6 mb-4" />
              <h3 className="font-heading text-xl tracking-tight mb-2">Never miss an edition</h3>
              <p className="text-sm text-neutral-500 font-light mb-6">Every Tuesday. Free. The growth tactics that actually work.</p>
              <div className="space-y-3">
                <input type="email" placeholder="your@email.com" className="w-full border border-black/15 rounded-sm px-4 py-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black/20 placeholder:text-neutral-400" />
                <button className="w-full bg-black text-white py-3 rounded-sm hover:bg-neutral-800 transition-colors text-sm font-medium">Subscribe</button>
              </div>
              <div className="mt-6 pt-4 border-t border-black/10 space-y-2">
                {stats.slice(0, 3).map(s => (
                  <div key={s.label} className="flex items-center justify-between text-xs">
                    <span className="text-neutral-400">{s.label}</span>
                    <span className="font-medium">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 19: Podcast / Radio Style
   ═══════════════════════════════════════════════════ */
function V19() {
  return (
    <div>
      <SectionLabel n={19} title="Podcast / Radio" />
      <div className="px-6 py-16 md:py-24 bg-[#0a0a0a] text-white">
        <div className="flex items-center gap-3 mb-6">
          <Radio className="w-5 h-5 text-neutral-500" />
          <div className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-500">On Air — Every Tuesday</div>
        </div>
        <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-4">{sectionHeader.title}</h2>
        <p className="text-neutral-400 font-light text-base max-w-3xl mb-10">Join 100,000+ operators receiving growth systems, tactics, and insights delivered straight from the frontier.</p>

        {/* Playlist-style editions */}
        <div className="max-w-3xl border border-white/10 rounded-sm overflow-hidden mb-10">
          {recentEditions.map((item, i) => (
            <div key={i} className="flex items-center border-b border-white/10 last:border-b-0 px-4 py-4 hover:bg-white/[0.03] transition-colors cursor-pointer group">
              <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center mr-4 shrink-0 group-hover:bg-white group-hover:text-black transition-colors">
                <Play className="w-3 h-3 ml-0.5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-medium">{item.title}</div>
                <div className="text-xs text-neutral-500 mt-0.5">{item.number} · {item.type}</div>
              </div>
              <span className="text-xs text-neutral-500">{item.readTime}</span>
            </div>
          ))}
        </div>

        <EmailInput dark />
        <p className="text-xs text-neutral-500 mt-3">Free. No spam. Unsubscribe anytime.</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 20: Checklist / Benefits
   ═══════════════════════════════════════════════════ */
function V20() {
  const benefits = [
    "Battle-tested growth tactics from 4,500+ startups",
    "Frameworks you can implement the same day",
    "Case studies with real numbers, not vanity metrics",
    "Positioning and pricing strategies that actually convert",
    "Weekly — takes 6 minutes to read",
    "100,000+ operators already subscribe",
  ];

  return (
    <div>
      <SectionLabel n={20} title="Benefits Checklist" />
      <div className="px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row gap-12 md:gap-20">
          <div className="flex-1">
            <div className="section-tag mb-4">{sectionHeader.tag}</div>
            <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-4">{sectionHeader.title}</h2>
            <p className="text-neutral-500 font-light text-base max-w-xl mb-10">Not another marketing newsletter. A growth operating system delivered to your inbox.</p>

            <div className="space-y-4 mb-10">
              {benefits.map((b, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-0.5 w-5 h-5 rounded-sm bg-black flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-sm text-neutral-700">{b}</span>
                </div>
              ))}
            </div>

            <EmailInput />
            <p className="text-xs text-neutral-400 mt-3">Free. No spam. Unsubscribe anytime.</p>
          </div>

          {/* Right: large testimonial */}
          <div className="md:w-[380px] shrink-0 flex flex-col justify-center">
            <div className="border border-black/10 p-8 bg-neutral-50">
              <div className="flex gap-1 mb-4">
                {[0,1,2,3,4].map(j => <Star key={j} className="w-4 h-4 fill-black" />)}
              </div>
              <p className="text-base font-light text-neutral-600 leading-relaxed italic mb-6">&ldquo;{testimonials[1].quote}&rdquo;</p>
              <div className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest">— {testimonials[1].author}</div>
              <div className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest">{testimonials[1].company}</div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              {stats.slice(0, 2).map(s => (
                <div key={s.label} className="border border-black/10 p-4 text-center">
                  <div className="font-heading text-2xl tracking-tight">{s.value}</div>
                  <div className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest mt-1">{s.label}</div>
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
   VARIATION 21: Newspaper + Corner Caps Frame
   — Grid-framed broadsheet with L-shaped corner marks
   ═══════════════════════════════════════════════════ */
function V21() {
  return (
    <div>
      <SectionLabel n={21} title="Newspaper + Corner Caps" />
      <div className="px-6 py-16 md:py-24">
        <div className="relative mx-auto max-w-4xl" style={{ minHeight: 700 }}>
          {/* Grid frame — edge-only squares with noise fill */}
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
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "512px 512px",
              opacity: 0.12,
              mixBlendMode: "multiply",
              WebkitMaskImage: "linear-gradient(to bottom, black 51px, transparent 51px, transparent calc(100% - 51px), black calc(100% - 51px)), linear-gradient(to right, black 51px, transparent 51px, transparent calc(100% - 51px), black calc(100% - 51px))",
              WebkitMaskComposite: "source-over",
              maskImage: "linear-gradient(to bottom, black 51px, transparent 51px, transparent calc(100% - 51px), black calc(100% - 51px)), linear-gradient(to right, black 51px, transparent 51px, transparent calc(100% - 51px), black calc(100% - 51px))",
              maskComposite: "add",
            }}
          />
          {/* Corner marks */}
          <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-black" />
          <div className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-black" />
          <div className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-black" />
          <div className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-black" />

          {/* Newspaper inside */}
          <div className="relative z-10 px-12 md:px-20 py-12">
            {/* Masthead */}
            <div className="text-center border-b border-black/10 pb-6 mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">Est. 2020</span>
                <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">Published Weekly</span>
                <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">Free Forever</span>
              </div>
              <h2 className="font-heading text-5xl md:text-7xl tracking-tight">{sectionHeader.title}</h2>
              <div className="font-mono-ui text-[10px] uppercase tracking-[0.3em] text-neutral-400 mt-3">&ldquo;The growth tactics operators actually use&rdquo;</div>
            </div>

            {/* Lead + sidebar */}
            <div className="grid md:grid-cols-5 gap-8 mb-10">
              <div className="md:col-span-3">
                <div className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest mb-2">Lead Story — {recentEditions[0].number}</div>
                <h3 className="font-heading text-3xl tracking-tight mb-3">{recentEditions[0].title}</h3>
                <p className="text-sm text-neutral-600 font-light leading-relaxed mb-4">Growth experiments should be your most powerful tool. But most teams run them wrong — they optimize for speed instead of learning, test the wrong variables, and declare winners too early.</p>
                <a href="#" className="text-xs font-medium flex items-center gap-1 hover:text-neutral-600 transition-colors">Continue reading <ArrowRight className="w-3 h-3" /></a>
              </div>
              <div className="md:col-span-2 border-l border-black/10 pl-6">
                <div className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest mb-4">Also This Week</div>
                {recentEditions.slice(1).map((item, i) => (
                  <div key={i} className="border-b border-black/10 last:border-b-0 pb-3 mb-3 last:mb-0 last:pb-0">
                    <div className="text-sm font-medium mb-1">{item.title}</div>
                    <div className="font-mono-ui text-[10px] text-neutral-400">{item.type} · {item.readTime}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscribe bar */}
            <div className="border-t border-black/10 pt-6 flex flex-col md:flex-row md:items-center gap-4">
              <p className="text-sm text-neutral-500 flex-1">Delivered to your inbox every Tuesday. Join 100,000+ operators.</p>
              <EmailInput />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 22: Dark Broadsheet — S800H Fund inspired
   — Dark background, star accents, ruler tick marks
   ═══════════════════════════════════════════════════ */
function V22() {
  return (
    <div>
      <SectionLabel n={22} title="Dark Broadsheet" />
      <div className="px-6 py-16 md:py-24">
        <div className="bg-[#0a0a0a] text-white relative overflow-hidden">
          {/* Tick marks along top and bottom */}
          <div className="absolute top-0 left-0 right-0 h-5 flex items-end px-4" style={{ backgroundImage: "repeating-linear-gradient(to right, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 1px, transparent 1px, transparent 20px)", backgroundSize: "20px 100%" }}>
            <div className="absolute left-4 top-1 font-mono-ui text-[8px] text-neutral-600">★</div>
            <div className="absolute right-4 top-1 font-mono-ui text-[8px] text-neutral-600">★</div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-5" style={{ backgroundImage: "repeating-linear-gradient(to right, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 1px, transparent 1px, transparent 20px)", backgroundSize: "20px 100%" }}>
            <div className="absolute left-4 bottom-1 font-mono-ui text-[8px] text-neutral-600">★</div>
            <div className="absolute right-4 bottom-1 font-mono-ui text-[8px] text-neutral-600">★</div>
          </div>

          <div className="px-8 md:px-16 py-12 pt-10">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-500">Demand Curve</span>
              <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-500">Systems for Smarter Growth</span>
              <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-500">Growth Division</span>
            </div>

            {/* Giant headline */}
            <h2 className="font-heading text-6xl md:text-8xl lg:text-[100px] tracking-tight leading-[0.9] mb-6">{sectionHeader.title}</h2>

            {/* Two info boxes */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <div className="border border-white/15 px-4 py-3">
                <p className="text-sm text-neutral-300 font-light">{sectionHeader.subtitle}</p>
              </div>
              <div className="border border-white/15 px-4 py-3">
                <p className="text-sm text-neutral-300 font-light">Battle-tested frameworks from 4,500+ startups. 4,500+ startups. Read by the operators actually building things.</p>
              </div>
            </div>

            {/* Edition list */}
            <div className="border-t border-white/10 mb-8">
              {recentEditions.map((item, i) => (
                <div key={i} className="flex items-center border-b border-white/10 py-3 hover:bg-white/[0.03] transition-colors cursor-pointer">
                  <span className="font-mono-ui text-[10px] text-neutral-500 w-14 shrink-0">{item.number}</span>
                  <span className="flex-1 text-sm font-medium">{item.title}</span>
                  <span className="font-mono-ui text-[10px] text-neutral-500 ml-4">{item.type}</span>
                </div>
              ))}
            </div>

            <EmailInput dark />
            <p className="text-xs text-neutral-500 mt-3">Free. Every Tuesday. Unsubscribe anytime.</p>

            {/* Footer bar */}
            <div className="mt-10 pt-4 border-t border-white/10 text-center">
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.3em] text-neutral-600">From the frontier of growth</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 23: Newspaper + Grid Boxes Frame
   — Boxes from manifesto section surrounding broadsheet
   ═══════════════════════════════════════════════════ */
function V23() {
  return (
    <div>
      <SectionLabel n={23} title="Grid Boxes + Broadsheet" />
      <div className="px-6 py-16 md:py-24">
        <div className="relative mx-auto max-w-4xl border border-black/10">
          {/* Grid background — visible in the border zone */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Corner caps — larger, bolder */}
          <div className="absolute -top-[2px] -left-[2px] w-6 h-6 border-t-[3px] border-l-[3px] border-black" />
          <div className="absolute -top-[2px] -right-[2px] w-6 h-6 border-t-[3px] border-r-[3px] border-black" />
          <div className="absolute -bottom-[2px] -left-[2px] w-6 h-6 border-b-[3px] border-l-[3px] border-black" />
          <div className="absolute -bottom-[2px] -right-[2px] w-6 h-6 border-b-[3px] border-r-[3px] border-black" />

          {/* Mid-edge marks */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 border-t-2 border-black" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 border-b-2 border-black" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 border-l-2 border-black" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-r-2 border-black" />

          <div className="relative z-10 bg-[#f9f9f8]/90">
            {/* Masthead */}
            <div className="text-center py-8 border-b border-black/10">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="w-8 h-px bg-black/30" />
                <span className="font-mono-ui text-[9px] uppercase tracking-[0.4em] text-neutral-400">Demand Curve · Est. 2020 · Weekly · Free</span>
                <div className="w-8 h-px bg-black/30" />
              </div>
              <h2 className="font-heading text-5xl md:text-7xl tracking-tight">{sectionHeader.title}</h2>
              <div className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400 mt-2">100,000+ Operators · 247 Editions · 4,500+ Startups Trained</div>
            </div>

            {/* Three-column layout */}
            <div className="grid md:grid-cols-3 divide-x divide-black/10">
              {/* Feature */}
              <div className="md:col-span-2 p-6 md:p-8">
                <div className="section-tag mb-3" style={{ display: "inline-flex" }}>Lead Story</div>
                <h3 className="font-heading text-2xl md:text-3xl tracking-tight mb-3">{recentEditions[0].title}</h3>
                <p className="text-sm text-neutral-600 font-light leading-relaxed mb-6">Growth experiments should be your most powerful tool. But most teams run them wrong — they optimize for speed instead of learning, and declare winners based on hope rather than statistics.</p>

                <div className="border-t border-black/10 pt-4">
                  <div className="grid grid-cols-2 gap-4">
                    {recentEditions.slice(1, 3).map((item, i) => (
                      <div key={i}>
                        <div className="font-mono-ui text-[10px] text-neutral-400 mb-1">{item.number} · {item.type}</div>
                        <div className="text-sm font-medium leading-snug">{item.title}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar with subscribe */}
              <div className="p-6">
                <div className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400 mb-4">Subscribe</div>
                <p className="text-sm text-neutral-600 font-light leading-relaxed mb-6">Growth systems, tactics, and insights. Delivered straight from the frontier.</p>
                <div className="space-y-3">
                  <input type="email" placeholder="your@email.com" className="w-full border border-black/15 rounded-sm px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black/20 placeholder:text-neutral-400" />
                  <button className="w-full bg-black text-white py-2.5 rounded-sm hover:bg-neutral-800 transition-colors text-sm font-medium">Subscribe</button>
                </div>
                <p className="text-[10px] text-neutral-400 mt-3">Free. No spam. Every Tuesday.</p>

                <div className="mt-6 pt-4 border-t border-black/10 space-y-3">
                  {recentEditions.slice(3).map((item, i) => (
                    <div key={i}>
                      <div className="font-mono-ui text-[10px] text-neutral-400 mb-0.5">{item.number}</div>
                      <div className="text-xs font-medium leading-snug">{item.title}</div>
                    </div>
                  ))}
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
   VARIATION 24: Vintage Letterpress — Noisy texture
   — Ornamental rules, heavy typographic hierarchy
   ═══════════════════════════════════════════════════ */
function V24() {
  return (
    <div>
      <SectionLabel n={24} title="Vintage Letterpress" />
      <div className="px-6 py-16 md:py-24">
        <div className="relative mx-auto max-w-3xl">
          {/* Noise overlay on entire section */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "512px 512px",
              opacity: 0.08,
              mixBlendMode: "multiply",
            }}
          />

          <div className="relative z-10">
            {/* Ornamental top rule */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex-1 h-px bg-black" />
              <div className="w-2 h-2 border border-black rotate-45" />
              <div className="w-2 h-2 bg-black rotate-45" />
              <div className="w-2 h-2 border border-black rotate-45" />
              <div className="flex-1 h-px bg-black" />
            </div>

            {/* Top meta */}
            <div className="flex items-center justify-between mb-4">
              <span className="font-mono-ui text-[9px] uppercase tracking-[0.4em] text-neutral-400">Volume VII · No. 247</span>
              <span className="font-mono-ui text-[9px] uppercase tracking-[0.4em] text-neutral-400">Every Tuesday · Free</span>
            </div>

            {/* Headline */}
            <div className="text-center mb-2">
              <div className="font-mono-ui text-[10px] uppercase tracking-[0.5em] text-neutral-400 mb-4">— Demand Curve Presents —</div>
              <h2 className="font-heading text-6xl md:text-8xl tracking-tight leading-[0.85]">The Growth<br />Newsletter</h2>
            </div>

            {/* Ornamental mid rule */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 border-t border-black/30" />
              <span className="font-mono-ui text-[10px] text-neutral-400">✦</span>
              <div className="flex-1 border-t border-black/30" />
            </div>

            {/* Subtitle */}
            <p className="text-center text-base font-light text-neutral-600 leading-relaxed max-w-lg mx-auto mb-8">{sectionHeader.subtitle}</p>

            {/* Subscribe in center */}
            <div className="flex justify-center mb-10">
              <EmailInput />
            </div>

            {/* Double rule */}
            <div className="border-t-2 border-b border-black/80 py-1 mb-8">
              <div className="border-b border-black/30" />
            </div>

            {/* Editions in columns */}
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              {recentEditions.map((item, i) => (
                <div key={i} className={`pb-4 ${i < recentEditions.length - 1 ? "border-b border-black/10" : ""}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono-ui text-[9px] text-neutral-400 uppercase">{item.number}</span>
                    <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                    <span className="font-mono-ui text-[9px] text-neutral-400 uppercase">{item.type}</span>
                  </div>
                  <h4 className="text-base font-medium leading-snug">{item.title}</h4>
                </div>
              ))}
            </div>

            {/* Bottom ornament */}
            <div className="flex items-center gap-2 mt-8">
              <div className="flex-1 h-px bg-black" />
              <div className="w-2 h-2 border border-black rotate-45" />
              <div className="w-2 h-2 bg-black rotate-45" />
              <div className="w-2 h-2 border border-black rotate-45" />
              <div className="flex-1 h-px bg-black" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 25: Classified Ad — Dense typography grid
   — Column rules, tight tracking, ad-block layout
   ═══════════════════════════════════════════════════ */
function V25() {
  return (
    <div>
      <SectionLabel n={25} title="Classified Ads" />
      <div className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          {/* Thick rule + masthead */}
          <div className="border-t-4 border-b-2 border-black py-3 mb-0">
            <div className="flex items-center justify-between">
              <span className="font-heading text-3xl md:text-4xl tracking-tight">{sectionHeader.title}</span>
              <div className="flex items-center gap-4">
                <span className="font-mono-ui text-[9px] uppercase tracking-widest text-neutral-400">Weekly</span>
                <span className="font-mono-ui text-[9px] uppercase tracking-widest text-neutral-400">100K+ Readers</span>
                <span className="font-mono-ui text-[9px] uppercase tracking-widest text-neutral-400">Free</span>
              </div>
            </div>
          </div>

          {/* Date bar */}
          <div className="flex items-center justify-between border-b border-black/20 py-2 mb-6">
            <span className="font-mono-ui text-[9px] uppercase tracking-widest text-neutral-500">Tuesday, March 4, 2026</span>
            <span className="font-mono-ui text-[9px] uppercase tracking-widest text-neutral-500">Edition {recentEditions[0].number}</span>
          </div>

          {/* 4-column classified grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
            {/* Main CTA — 2 cols */}
            <div className="col-span-2 border border-black/20 p-4 md:p-6">
              <div className="font-mono-ui text-[9px] uppercase tracking-[0.3em] text-neutral-400 mb-2 text-center">— Announcement —</div>
              <div className="border-t border-b border-black py-3 mb-4 text-center">
                <h3 className="font-heading text-2xl tracking-tight">Subscribe Today</h3>
              </div>
              <p className="text-xs text-neutral-600 font-light leading-relaxed mb-4 text-center">{sectionHeader.subtitle}</p>
              <div className="space-y-2">
                <input type="email" placeholder="your@email.com" className="w-full border border-black/15 px-3 py-2 text-xs bg-white focus:outline-none placeholder:text-neutral-400" />
                <button className="w-full bg-black text-white py-2 text-xs font-medium hover:bg-neutral-800 transition-colors">Subscribe — Free</button>
              </div>
            </div>

            {/* Edition blocks */}
            {recentEditions.slice(0, 2).map((item, i) => (
              <div key={i} className="border border-black/20 border-l-0 p-4">
                <div className="font-mono-ui text-[9px] uppercase tracking-widest text-neutral-400 mb-2">{item.type}</div>
                <div className="border-t border-black/20 pt-2 mb-2">
                  <h4 className="text-sm font-medium leading-snug">{item.title}</h4>
                </div>
                <div className="font-mono-ui text-[9px] text-neutral-400">{item.number} · {item.readTime}</div>
              </div>
            ))}

            {/* Bottom row — remaining editions + stats */}
            {recentEditions.slice(2).map((item, i) => (
              <div key={i} className="border border-black/20 border-t-0 p-4">
                <div className="font-mono-ui text-[9px] uppercase tracking-widest text-neutral-400 mb-1">{item.type}</div>
                <h4 className="text-xs font-medium leading-snug mb-1">{item.title}</h4>
                <div className="font-mono-ui text-[9px] text-neutral-400">{item.readTime}</div>
              </div>
            ))}
            <div className="border border-black/20 border-t-0 border-l-0 p-4">
              <div className="font-mono-ui text-[9px] uppercase tracking-[0.3em] text-neutral-400 mb-2 text-center">Stats</div>
              <div className="space-y-2 text-center">
                {stats.map(s => (
                  <div key={s.label}>
                    <div className="font-heading text-lg">{s.value}</div>
                    <div className="font-mono-ui text-[8px] text-neutral-400 uppercase">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 26: Dark Broadsheet + Corner Caps + Scanlines
   — Combines dark, corner marks, and CRT scanlines
   ═══════════════════════════════════════════════════ */
function V26() {
  return (
    <div>
      <SectionLabel n={26} title="Dark + Caps + Scanlines" />
      <div className="px-6 py-16 md:py-24">
        <div className="relative mx-auto max-w-4xl bg-[#0a0a0a] text-white overflow-hidden">
          {/* CRT scanlines */}
          <div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 3px)",
            }}
          />

          {/* Corner marks — white on dark */}
          <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-white/40 z-20" />
          <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-white/40 z-20" />
          <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-white/40 z-20" />
          <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-white/40 z-20" />

          <div className="relative z-10 px-10 md:px-16 py-10">
            {/* Top bar */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-8">
              <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-500">Demand Curve</span>
              <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-500">Systems for Growth</span>
              <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-500">Weekly Transmission</span>
            </div>

            <h2 className="font-heading text-5xl md:text-8xl tracking-tight leading-[0.85] mb-4">{sectionHeader.title}</h2>

            <div className="grid md:grid-cols-2 gap-px bg-white/10 mb-8">
              <div className="bg-[#0a0a0a] p-4">
                <p className="text-sm text-neutral-300 font-light leading-relaxed">{sectionHeader.subtitle}</p>
              </div>
              <div className="bg-[#0a0a0a] p-4">
                <div className="flex flex-wrap gap-4">
                  {stats.map(s => (
                    <div key={s.label}>
                      <div className="font-heading text-xl text-white">{s.value}</div>
                      <div className="font-mono-ui text-[9px] text-neutral-500 uppercase tracking-widest">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Editions */}
            <div className="border-t border-white/10">
              {recentEditions.map((item, i) => (
                <div key={i} className="flex items-center border-b border-white/10 py-3 hover:bg-white/[0.03] transition-colors cursor-pointer">
                  <span className="font-mono-ui text-[10px] text-neutral-500 w-14">{item.number}</span>
                  <span className="flex-1 text-sm font-medium">{item.title}</span>
                  <span className="inline-block px-2 py-0.5 text-[9px] font-mono-ui uppercase tracking-widest border border-white/15">{item.type}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <EmailInput dark />
              <p className="text-xs text-neutral-500 mt-3">Free. Every Tuesday. Unsubscribe anytime.</p>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 text-center">
              <span className="font-mono-ui text-[9px] uppercase tracking-[0.4em] text-neutral-600">★ From the frontier of growth ★</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 27: Broadsheet + Marquee Ticker
   — Newspaper with scrolling headline marquee
   ═══════════════════════════════════════════════════ */
function V27() {
  return (
    <div>
      <SectionLabel n={27} title="Broadsheet + Marquee" />
      <div className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl border border-black/10">
          {/* Masthead */}
          <div className="text-center py-6 border-b border-black/10">
            <div className="font-mono-ui text-[9px] uppercase tracking-[0.4em] text-neutral-400 mb-2">Est. 2020 · Demand Curve · Free</div>
            <h2 className="font-heading text-5xl md:text-7xl tracking-tight">{sectionHeader.title}</h2>
          </div>

          {/* Marquee ticker */}
          <div className="border-b border-black/10 py-2.5 overflow-hidden">
            <div className="marquee-content whitespace-nowrap font-mono-ui text-[10px] uppercase tracking-widest text-neutral-500">
              {[0, 1].map(i => (
                <span key={i} className="flex">
                  {recentEditions.map((item, j) => (
                    <span key={`${i}-${j}`} className="contents">
                      <span className="px-6 flex items-center gap-2">
                        <span className="marquee-square" style={{ animationDelay: `${j * 0.5}s` }} />
                        {item.number} — {item.title}
                      </span>
                      |
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="grid md:grid-cols-5 divide-x divide-black/10">
            {/* Main article */}
            <div className="md:col-span-3 p-6 md:p-8">
              <div className="section-tag mb-3" style={{ display: "inline-flex" }}>This Week</div>
              <h3 className="font-heading text-3xl tracking-tight mb-4">{recentEditions[0].title}</h3>
              <p className="text-sm text-neutral-600 font-light leading-relaxed mb-6">Growth experiments should be your most powerful tool. But most teams run them wrong — they optimize for speed instead of learning, test the wrong variables, and declare winners too early.</p>

              <div className="border-t border-black/10 pt-4 grid grid-cols-2 gap-4">
                {recentEditions.slice(1, 3).map((item, i) => (
                  <a key={i} href="#" className="group">
                    <div className="font-mono-ui text-[10px] text-neutral-400 mb-1">{item.number}</div>
                    <div className="text-sm font-medium leading-snug group-hover:text-neutral-600 transition-colors">{item.title}</div>
                  </a>
                ))}
              </div>
            </div>

            {/* Subscribe sidebar */}
            <div className="md:col-span-2 p-6">
              <h3 className="font-heading text-xl tracking-tight mb-2">Never miss an edition</h3>
              <p className="text-sm text-neutral-500 font-light mb-6">{sectionHeader.subtitle}</p>
              <div className="space-y-3">
                <input type="email" placeholder="your@email.com" className="w-full border border-black/15 rounded-sm px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black/20 placeholder:text-neutral-400" />
                <button className="w-full bg-black text-white py-2.5 rounded-sm hover:bg-neutral-800 transition-colors text-sm font-medium">Subscribe</button>
              </div>
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-black/10 flex-wrap">
                {stats.map(s => (
                  <div key={s.label} className="text-center">
                    <div className="font-heading text-lg">{s.value}</div>
                    <div className="font-mono-ui text-[8px] text-neutral-400 uppercase tracking-widest">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 28: Dispatch / Field Report
   — Military-style briefing aesthetic, dashed borders
   ═══════════════════════════════════════════════════ */
function V28() {
  return (
    <div>
      <SectionLabel n={28} title="Field Dispatch" />
      <div className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          {/* Classification header */}
          <div className="border-2 border-dashed border-black/30 p-1 mb-0">
            <div className="border border-black/20 px-6 py-4 flex items-center justify-between">
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.3em] text-neutral-400">Field Report</span>
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.3em]">The Growth Dispatch</span>
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.3em] text-neutral-400">Demand Curve HQ</span>
            </div>
          </div>

          {/* Main body */}
          <div className="border-l-2 border-r-2 border-dashed border-black/30 px-8 md:px-12 py-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-black" />
              <h2 className="font-heading text-4xl md:text-6xl tracking-tight">{sectionHeader.title}</h2>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest">Frequency: Weekly</span>
              <span className="w-1 h-1 bg-neutral-400 rounded-full" />
              <span className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest">Recipients: 100,000+</span>
              <span className="w-1 h-1 bg-neutral-400 rounded-full" />
              <span className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest">Classification: Open</span>
            </div>

            <p className="text-neutral-600 font-light text-base leading-relaxed mb-8 border-l-2 border-black/20 pl-4">{sectionHeader.subtitle}</p>

            {/* Dispatch log */}
            <div className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400 mb-3">Recent Dispatches</div>
            <div className="space-y-0">
              {recentEditions.map((item, i) => (
                <div key={i} className="flex items-center gap-4 py-3 border-t border-dashed border-black/15 hover:bg-neutral-50 transition-colors cursor-pointer">
                  <span className="font-mono-ui text-[10px] text-neutral-400 w-12">{item.date}</span>
                  <span className="font-mono-ui text-[10px] text-neutral-400 w-12">{item.number}</span>
                  <span className="flex-1 text-sm font-medium">{item.title}</span>
                  <span className="section-tag" style={{ display: "inline-flex", fontSize: 9, padding: "2px 8px" }}>{item.type}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-dashed border-black/15">
              <div className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400 mb-3">Enlist</div>
              <EmailInput />
              <p className="text-xs text-neutral-400 mt-3">No cost. No spam. Withdraw anytime.</p>
            </div>
          </div>

          {/* Bottom stamp */}
          <div className="border-2 border-dashed border-black/30 p-1">
            <div className="border border-black/20 px-6 py-3 text-center">
              <span className="font-mono-ui text-[9px] uppercase tracking-[0.4em] text-neutral-400">★ End of Dispatch ★ Demand Curve Growth Division ★</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 29: Tabloid Front Page
   — Big bold headline, stacked sections, high contrast
   ═══════════════════════════════════════════════════ */
function V29() {
  return (
    <div>
      <SectionLabel n={29} title="Tabloid Front Page" />
      <div className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-3xl">
          {/* Name plate */}
          <div className="bg-black text-white py-3 px-6 flex items-center justify-between mb-0">
            <span className="font-mono-ui text-[10px] uppercase tracking-widest">Demand Curve</span>
            <span className="font-heading text-xl md:text-2xl">THE GROWTH REPORT</span>
            <span className="font-mono-ui text-[10px] uppercase tracking-widest">{recentEditions[0].number}</span>
          </div>

          {/* Giant headline */}
          <div className="border-l-4 border-r-4 border-black px-6 md:px-10 py-8 border-b-4 border-t-0">
            <h2 className="font-heading text-5xl md:text-7xl lg:text-8xl tracking-tight leading-[0.85] mb-4">{recentEditions[0].title}</h2>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-black text-white px-2 py-0.5 font-mono-ui text-[10px] uppercase tracking-widest">{recentEditions[0].type}</span>
              <span className="font-mono-ui text-[10px] text-neutral-400">{recentEditions[0].readTime} read</span>
              <span className="font-mono-ui text-[10px] text-neutral-400">{recentEditions[0].date}</span>
            </div>
            <p className="text-base text-neutral-600 font-light leading-relaxed max-w-xl">Growth experiments should be your most powerful tool. But most teams are running them wrong and making decisions based on broken data.</p>

            {/* Sub stories */}
            <div className="mt-8 pt-6 border-t-2 border-black grid grid-cols-2 gap-6">
              {recentEditions.slice(1, 3).map((item, i) => (
                <div key={i}>
                  <span className="bg-black text-white px-2 py-0.5 font-mono-ui text-[9px] uppercase tracking-widest">{item.type}</span>
                  <h4 className="text-lg font-heading tracking-tight mt-2 mb-1">{item.title}</h4>
                  <span className="font-mono-ui text-[10px] text-neutral-400">{item.readTime}</span>
                </div>
              ))}
            </div>

            {/* More headlines */}
            <div className="mt-6 pt-4 border-t border-black/20">
              {recentEditions.slice(3).map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-black/10 last:border-b-0">
                  <span className="text-sm font-medium">{item.title}</span>
                  <span className="font-mono-ui text-[9px] text-neutral-400 shrink-0 ml-4">{item.type}</span>
                </div>
              ))}
            </div>

            {/* Subscribe CTA */}
            <div className="mt-8 bg-neutral-50 border border-black/10 p-6 text-center">
              <h3 className="font-heading text-2xl tracking-tight mb-2">Get every edition</h3>
              <p className="text-sm text-neutral-500 mb-4">100,000+ growth operators read it. Join them.</p>
              <div className="flex max-w-sm gap-2 mx-auto">
                <input type="email" placeholder="your@email.com" className="flex-1 border border-black/15 px-3 py-2.5 text-sm bg-white focus:outline-none placeholder:text-neutral-400" />
                <button className="bg-black text-white px-4 py-2.5 text-sm font-medium hover:bg-neutral-800 transition-colors">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 30: Registration Marks / Print Sheet
   — Crop marks, color bars, print production aesthetic
   ═══════════════════════════════════════════════════ */
function V30() {
  return (
    <div>
      <SectionLabel n={30} title="Print Registration Sheet" />
      <div className="px-6 py-16 md:py-24">
        <div className="relative mx-auto max-w-4xl">
          {/* Crop/registration marks */}
          {/* Top-left */}
          <div className="absolute -top-4 -left-4 w-8 h-8">
            <div className="absolute top-0 left-3 w-px h-4 bg-black/40" />
            <div className="absolute top-3 left-0 w-4 h-px bg-black/40" />
            <div className="absolute top-2 left-2 w-2 h-2 rounded-full border border-black/30" />
          </div>
          {/* Top-right */}
          <div className="absolute -top-4 -right-4 w-8 h-8">
            <div className="absolute top-0 right-3 w-px h-4 bg-black/40" />
            <div className="absolute top-3 right-0 w-4 h-px bg-black/40" />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full border border-black/30" />
          </div>
          {/* Bottom-left */}
          <div className="absolute -bottom-4 -left-4 w-8 h-8">
            <div className="absolute bottom-0 left-3 w-px h-4 bg-black/40" />
            <div className="absolute bottom-3 left-0 w-4 h-px bg-black/40" />
            <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full border border-black/30" />
          </div>
          {/* Bottom-right */}
          <div className="absolute -bottom-4 -right-4 w-8 h-8">
            <div className="absolute bottom-0 right-3 w-px h-4 bg-black/40" />
            <div className="absolute bottom-3 right-0 w-4 h-px bg-black/40" />
            <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full border border-black/30" />
          </div>

          {/* Color bar strip — top */}
          <div className="flex h-2 mb-2">
            {["#000", "#333", "#666", "#999", "#ccc", "#eee", "#fff", "#eee", "#ccc", "#999", "#666", "#333", "#000"].map((c, i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: c, border: c === "#fff" ? "1px solid #eee" : "none" }} />
            ))}
          </div>

          {/* Metadata strip */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono-ui text-[8px] text-neutral-400 uppercase tracking-widest">CMYK 100% · Sheet 1 of 1</span>
            <span className="font-mono-ui text-[8px] text-neutral-400 uppercase tracking-widest">Demand Curve — Growth Newsletter — Vol. VII · No. 247</span>
            <span className="font-mono-ui text-[8px] text-neutral-400 uppercase tracking-widest">Proof: Final</span>
          </div>

          {/* Main newspaper content */}
          <div className="border border-black/15">
            {/* Masthead */}
            <div className="text-center py-6 border-b border-black/15 bg-white">
              <div className="font-mono-ui text-[9px] uppercase tracking-[0.3em] text-neutral-400 mb-2">Est. 2020 · Published Weekly · Demand Curve</div>
              <h2 className="font-heading text-5xl md:text-7xl tracking-tight">{sectionHeader.title}</h2>
              <div className="flex items-center justify-center gap-4 mt-2">
                {stats.map(s => (
                  <span key={s.label} className="font-mono-ui text-[9px] text-neutral-400">{s.value} {s.label}</span>
                ))}
              </div>
            </div>

            {/* Two columns */}
            <div className="grid md:grid-cols-3 divide-x divide-black/10">
              <div className="md:col-span-2 p-6 md:p-8">
                <div className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest mb-2">Lead</div>
                <h3 className="font-heading text-2xl md:text-3xl tracking-tight mb-3">{recentEditions[0].title}</h3>
                <p className="text-sm text-neutral-600 font-light leading-relaxed mb-4">Growth experiments should be your most powerful tool. But most teams run them wrong — optimizing for velocity over learning.</p>
                <div className="grid grid-cols-2 gap-4 border-t border-black/10 pt-4">
                  {recentEditions.slice(1, 3).map((item, i) => (
                    <div key={i}>
                      <div className="text-sm font-medium leading-snug">{item.title}</div>
                      <div className="font-mono-ui text-[9px] text-neutral-400 mt-1">{item.type} · {item.readTime}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-6">
                <div className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest mb-3">Subscribe</div>
                <p className="text-xs text-neutral-500 font-light mb-4">Every Tuesday. Free. The growth tactics that work.</p>
                <div className="space-y-2">
                  <input type="email" placeholder="your@email.com" className="w-full border border-black/15 px-3 py-2 text-xs focus:outline-none placeholder:text-neutral-400" />
                  <button className="w-full bg-black text-white py-2 text-xs font-medium hover:bg-neutral-800 transition-colors">Subscribe</button>
                </div>
                <div className="mt-4 pt-3 border-t border-black/10">
                  {recentEditions.slice(3).map((item, i) => (
                    <div key={i} className="text-xs font-medium mb-2">{item.title}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Color bar strip — bottom */}
          <div className="flex h-2 mt-2">
            {["#000", "#333", "#666", "#999", "#ccc", "#eee", "#fff", "#eee", "#ccc", "#999", "#666", "#333", "#000"].map((c, i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: c, border: c === "#fff" ? "1px solid #eee" : "none" }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 31: The Artificial Times — Full Experience
   — Combines everything: dark, grid, caps, tick marks,
     scanlines, noise, columns, marquee, section tags
   ═══════════════════════════════════════════════════ */
function V31() {
  return (
    <div>
      <SectionLabel n={31} title="The Full Experience" />
      <div className="px-6 py-16 md:py-24">
        <div className="relative mx-auto max-w-4xl bg-[#080808] text-white overflow-hidden">
          {/* CRT scanlines */}
          <div
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.025) 2px, rgba(255,255,255,0.025) 3px)",
            }}
          />
          {/* Noise */}
          <div
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "512px 512px",
              opacity: 0.06,
            }}
          />

          {/* Grid background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Corner caps */}
          <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-white/30 z-30" />
          <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-white/30 z-30" />
          <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-white/30 z-30" />
          <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-white/30 z-30" />

          {/* Tick marks along top */}
          <div className="absolute top-0 left-6 right-6 h-4 z-10" style={{ backgroundImage: "repeating-linear-gradient(to right, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 16px)", backgroundSize: "16px 100%" }} />
          {/* Tick marks along bottom */}
          <div className="absolute bottom-0 left-6 right-6 h-4 z-10" style={{ backgroundImage: "repeating-linear-gradient(to right, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 16px)", backgroundSize: "16px 100%" }} />

          <div className="relative z-10 px-10 md:px-14 py-10 pt-8">
            {/* Top bar with stars */}
            <div className="flex items-center justify-between mb-4 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-neutral-500">★</span>
                <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-500">Demand Curve</span>
              </div>
              <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-500">Systems for Compounding Growth</span>
              <div className="flex items-center gap-2">
                <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-500">Growth Division</span>
                <span className="text-[10px] text-neutral-500">★</span>
              </div>
            </div>

            {/* Masthead */}
            <div className="text-center border-t border-b border-white/15 py-6 mb-6">
              <h2 className="font-heading text-6xl md:text-8xl lg:text-[96px] tracking-tight leading-[0.85]">{sectionHeader.title}</h2>
            </div>

            {/* Info boxes — S800H style */}
            <div className="grid md:grid-cols-3 gap-px bg-white/10 mb-6">
              <div className="bg-[#080808] p-4">
                <p className="text-xs text-neutral-300 font-light leading-relaxed">{sectionHeader.subtitle}</p>
              </div>
              <div className="bg-[#080808] p-4">
                <p className="text-xs text-neutral-300 font-light leading-relaxed">Battle-tested frameworks from 4,500+ startups. 4,500+ startups. Read by the operators actually building things.</p>
              </div>
              <div className="bg-[#080808] p-4 flex items-center justify-center">
                <div className="space-y-2">
                  <input type="email" placeholder="your@email.com" className="w-full border border-white/15 bg-white/[0.05] px-3 py-2 text-xs text-white focus:outline-none placeholder:text-neutral-500" />
                  <button className="w-full bg-white text-black py-2 text-xs font-medium hover:bg-neutral-200 transition-colors">Subscribe</button>
                </div>
              </div>
            </div>

            {/* Column headers */}
            <div className="flex items-center border-b border-white/15 pb-2 mb-0">
              <div className="font-mono-ui text-[9px] uppercase tracking-widest text-neutral-500 flex-1">Recent Dispatches</div>
              <div className="font-mono-ui text-[9px] uppercase tracking-widest text-neutral-500 w-20 text-right">Type</div>
              <div className="font-mono-ui text-[9px] uppercase tracking-widest text-neutral-500 w-16 text-right">Time</div>
            </div>

            {/* Editions with rainbow-style row hovers */}
            <div>
              {recentEditions.map((item, i) => (
                <div
                  key={i}
                  className="feed-row flex items-center border-b border-white/10 py-3 cursor-pointer"
                  style={{ "--row-hue": `${(i * 50 + 200) % 360}` } as React.CSSProperties}
                >
                  <span className="font-mono-ui text-[10px] text-neutral-500 w-12 shrink-0">{item.number}</span>
                  <span className="font-mono-ui text-[10px] text-neutral-500 w-14 shrink-0">{item.date}</span>
                  <span className="flex-1 text-sm font-medium">{item.title}</span>
                  <span className="font-mono-ui text-[10px] text-neutral-500 w-20 text-right">{item.type}</span>
                  <span className="font-mono-ui text-[10px] text-neutral-500 w-16 text-right">{item.readTime}</span>
                </div>
              ))}
            </div>

            {/* Stats bar */}
            <div className="mt-6 grid grid-cols-4 gap-px bg-white/10">
              {stats.map(s => (
                <div key={s.label} className="bg-[#080808] py-4 text-center">
                  <div className="font-heading text-2xl text-white">{s.value}</div>
                  <div className="font-mono-ui text-[8px] text-neutral-500 uppercase tracking-widest mt-1">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Bottom marquee */}
            <div className="mt-6 pt-4 border-t border-white/10 overflow-hidden">
              <div className="marquee-content whitespace-nowrap font-mono-ui text-[9px] uppercase tracking-[0.3em] text-neutral-600">
                {[0, 1].map(i => (
                  <span key={i}>
                    <span className="px-6">★ From the frontier of growth ★</span>
                    <span className="px-6">Est. 2020</span>
                    <span className="px-6">100,000+ Operators</span>
                    <span className="px-6">Every Tuesday</span>
                    <span className="px-6">Free Forever</span>
                    <span className="px-6">★ Systems, not guesswork ★</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 32: The Ultimate — All favorites combined
   — 23's grid+caps, 24's ornaments, 25's classified density,
     27's marquee+headline, 30's crop marks+color bars
   ═══════════════════════════════════════════════════ */
function V32() {
  return (
    <div>
      <SectionLabel n={32} title="The Ultimate Mashup" />
      <div className="px-6 py-16 md:py-24">
        <div className="relative mx-auto max-w-4xl">
          {/* Crop/registration marks */}
          <div className="absolute -top-5 -left-5 w-8 h-8">
            <div className="absolute top-0 left-3.5 w-px h-5 bg-black/30" />
            <div className="absolute top-3.5 left-0 w-5 h-px bg-black/30" />
            <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 rounded-full border border-black/25" />
          </div>
          <div className="absolute -top-5 -right-5 w-8 h-8">
            <div className="absolute top-0 right-3.5 w-px h-5 bg-black/30" />
            <div className="absolute top-3.5 right-0 w-5 h-px bg-black/30" />
            <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full border border-black/25" />
          </div>
          <div className="absolute -bottom-5 -left-5 w-8 h-8">
            <div className="absolute bottom-0 left-3.5 w-px h-5 bg-black/30" />
            <div className="absolute bottom-3.5 left-0 w-5 h-px bg-black/30" />
            <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 rounded-full border border-black/25" />
          </div>
          <div className="absolute -bottom-5 -right-5 w-8 h-8">
            <div className="absolute bottom-0 right-3.5 w-px h-5 bg-black/30" />
            <div className="absolute bottom-3.5 right-0 w-5 h-px bg-black/30" />
            <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 rounded-full border border-black/25" />
          </div>

          {/* Color bar — top */}
          <div className="flex h-1.5 mb-1">
            {["#000","#222","#444","#666","#888","#aaa","#ccc","#ddd","#eee","#ddd","#ccc","#aaa","#888","#666","#444","#222","#000"].map((c,i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>

          {/* Micro metadata */}
          <div className="flex items-center justify-between mb-1 px-1">
            <span className="font-mono-ui text-[7px] text-neutral-400 uppercase tracking-widest">Sheet 1/1 · CMYK 100%</span>
            <span className="font-mono-ui text-[7px] text-neutral-400 uppercase tracking-widest">Demand Curve — Growth Newsletter — Vol. VII · Edition 247</span>
            <span className="font-mono-ui text-[7px] text-neutral-400 uppercase tracking-widest">Proof: Final · Weekly</span>
          </div>

          {/* Main container with grid bg + corner caps */}
          <div className="relative border border-black/15 overflow-hidden">
            {/* Grid background */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }} />

            {/* Bold corner caps */}
            <div className="absolute -top-[2px] -left-[2px] w-6 h-6 border-t-[3px] border-l-[3px] border-black z-10" />
            <div className="absolute -top-[2px] -right-[2px] w-6 h-6 border-t-[3px] border-r-[3px] border-black z-10" />
            <div className="absolute -bottom-[2px] -left-[2px] w-6 h-6 border-b-[3px] border-l-[3px] border-black z-10" />
            <div className="absolute -bottom-[2px] -right-[2px] w-6 h-6 border-b-[3px] border-r-[3px] border-black z-10" />
            {/* Mid-edge marks */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 border-t-2 border-black z-10" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 border-b-2 border-black z-10" />

            <div className="relative z-[5] bg-[#f9f9f8]/90">
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
                <h2 className="font-heading text-5xl md:text-7xl tracking-tight">{sectionHeader.title}</h2>
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
                  {[0, 1].map(i => (
                    <span key={i} className="flex">
                      {recentEditions.map((item, j) => (
                        <span key={`${i}-${j}`} className="contents">
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
                  <h3 className="font-heading text-2xl md:text-3xl tracking-tight mb-3">{recentEditions[0].title}</h3>
                  <p className="text-sm text-neutral-600 font-light leading-relaxed mb-6">Growth experiments should be your most powerful tool. But most teams run them wrong — optimizing for velocity over learning, testing the wrong variables, and declaring winners based on hope.</p>

                  {/* Sub-editions in classified style */}
                  <div className="border-t-2 border-b border-black/80 py-1 mb-4">
                    <div className="border-b border-black/30" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {recentEditions.slice(1, 3).map((item, i) => (
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
                    {recentEditions.slice(3).map((item, i) => (
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
                    {stats.map(s => (
                      <div key={s.label} className="flex items-center justify-between">
                        <span className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest">{s.label}</span>
                        <span className="font-heading text-lg">{s.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* Testimonial */}
                  <div className="mt-6 pt-4 border-t border-black/10">
                    <p className="text-xs font-light text-neutral-500 leading-relaxed italic">&ldquo;{testimonials[0].quote}&rdquo;</p>
                    <div className="font-mono-ui text-[9px] text-neutral-400 mt-2">— {testimonials[0].author}, {testimonials[0].company}</div>
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

          {/* Color bar — bottom */}
          <div className="flex h-1.5 mt-1">
            {["#000","#222","#444","#666","#888","#aaa","#ccc","#ddd","#eee","#ddd","#ccc","#aaa","#888","#666","#444","#222","#000"].map((c,i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 33: Dark Ultimate — V32 but dark mode
   ═══════════════════════════════════════════════════ */
function V33() {
  return (
    <div>
      <SectionLabel n={33} title="Dark Ultimate" />
      <div className="px-6 py-16 md:py-24">
        <div className="relative mx-auto max-w-4xl">
          {/* Crop marks — light on dark context */}
          <div className="absolute -top-5 -left-5 w-8 h-8">
            <div className="absolute top-0 left-3.5 w-px h-5 bg-neutral-600" />
            <div className="absolute top-3.5 left-0 w-5 h-px bg-neutral-600" />
            <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 rounded-full border border-neutral-600" />
          </div>
          <div className="absolute -top-5 -right-5 w-8 h-8">
            <div className="absolute top-0 right-3.5 w-px h-5 bg-neutral-600" />
            <div className="absolute top-3.5 right-0 w-5 h-px bg-neutral-600" />
            <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full border border-neutral-600" />
          </div>
          <div className="absolute -bottom-5 -left-5 w-8 h-8">
            <div className="absolute bottom-0 left-3.5 w-px h-5 bg-neutral-600" />
            <div className="absolute bottom-3.5 left-0 w-5 h-px bg-neutral-600" />
            <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 rounded-full border border-neutral-600" />
          </div>
          <div className="absolute -bottom-5 -right-5 w-8 h-8">
            <div className="absolute bottom-0 right-3.5 w-px h-5 bg-neutral-600" />
            <div className="absolute bottom-3.5 right-0 w-5 h-px bg-neutral-600" />
            <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 rounded-full border border-neutral-600" />
          </div>

          {/* Color bar — inverted */}
          <div className="flex h-1.5 mb-1">
            {["#fff","#ddd","#bbb","#999","#777","#555","#333","#222","#111","#222","#333","#555","#777","#999","#bbb","#ddd","#fff"].map((c,i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>

          <div className="flex items-center justify-between mb-1 px-1">
            <span className="font-mono-ui text-[7px] text-neutral-500 uppercase tracking-widest">Sheet 1/1 · Inverse proof</span>
            <span className="font-mono-ui text-[7px] text-neutral-500 uppercase tracking-widest">Demand Curve — Growth Newsletter — Vol. VII</span>
            <span className="font-mono-ui text-[7px] text-neutral-500 uppercase tracking-widest">Dark variant</span>
          </div>

          <div className="relative border border-white/10 bg-[#0a0a0a] text-white overflow-hidden">
            {/* CRT scanlines */}
            <div className="absolute inset-0 pointer-events-none z-20" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 3px)" }} />
            {/* Grid */}
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            {/* Corner caps */}
            <div className="absolute -top-[2px] -left-[2px] w-6 h-6 border-t-[3px] border-l-[3px] border-white/30 z-10" />
            <div className="absolute -top-[2px] -right-[2px] w-6 h-6 border-t-[3px] border-r-[3px] border-white/30 z-10" />
            <div className="absolute -bottom-[2px] -left-[2px] w-6 h-6 border-b-[3px] border-l-[3px] border-white/30 z-10" />
            <div className="absolute -bottom-[2px] -right-[2px] w-6 h-6 border-b-[3px] border-r-[3px] border-white/30 z-10" />

            <div className="relative z-[5]">
              {/* Ornamental top */}
              <div className="flex items-center gap-2 px-6 pt-6 mb-4">
                <div className="flex-1 h-px bg-white/20" />
                <div className="w-1.5 h-1.5 border border-white/30 rotate-45" />
                <div className="w-1.5 h-1.5 bg-white/40 rotate-45" />
                <div className="w-1.5 h-1.5 border border-white/30 rotate-45" />
                <div className="flex-1 h-px bg-white/20" />
              </div>

              <div className="text-center px-6 pb-3">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <span className="font-mono-ui text-[8px] uppercase tracking-[0.4em] text-neutral-500">★ Est. 2020</span>
                  <span className="font-mono-ui text-[8px] uppercase tracking-[0.4em] text-neutral-500">Published Weekly</span>
                  <span className="font-mono-ui text-[8px] uppercase tracking-[0.4em] text-neutral-500">100,000+ Readers ★</span>
                </div>
                <h2 className="font-heading text-5xl md:text-7xl tracking-tight">{sectionHeader.title}</h2>
              </div>

              <div className="flex items-center gap-3 px-6 mb-3">
                <div className="flex-1 border-t border-white/10" />
                <span className="text-[9px] text-neutral-500">✦</span>
                <div className="flex-1 border-t border-white/10" />
              </div>

              {/* Marquee */}
              <div className="border-t border-b border-white/10 py-2 overflow-hidden">
                <div className="marquee-content whitespace-nowrap font-mono-ui text-[9px] uppercase tracking-widest text-neutral-600">
                  {[0, 1].map(i => (
                    <span key={i} className="flex">
                      {recentEditions.map((item, j) => (
                        <span key={`${i}-${j}`} className="contents">
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

              {/* Three columns */}
              <div className="grid md:grid-cols-5 divide-x divide-white/10">
                <div className="md:col-span-3 p-6 md:p-8">
                  <div className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Most Recent Edition</div>
                  <h3 className="font-heading text-2xl md:text-3xl tracking-tight mb-3">{recentEditions[0].title}</h3>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">Growth experiments should be your most powerful tool. But most teams run them wrong — optimizing for velocity over learning.</p>
                  <div className="border-t border-white/10 pt-4 grid grid-cols-2 gap-4">
                    {recentEditions.slice(1, 3).map((item, i) => (
                      <div key={i} className="border border-white/10 p-3">
                        <div className="font-mono-ui text-[9px] text-neutral-500 mb-1">{item.number} · {item.type}</div>
                        <div className="text-sm font-medium">{item.title}</div>
                      </div>
                    ))}
                  </div>
                  {recentEditions.slice(3).map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-2.5 border-b border-white/10 last:border-b-0 mt-0 first:mt-4">
                      <span className="text-sm font-medium">{item.title}</span>
                      <span className="font-mono-ui text-[9px] text-neutral-500">{item.type}</span>
                    </div>
                  ))}
                </div>
                <div className="md:col-span-2 p-6">
                  <h3 className="font-heading text-xl tracking-tight mb-2">Never miss an edition</h3>
                  <p className="text-sm text-neutral-400 font-light mb-6">Delivered from the frontier every Tuesday.</p>
                  <div className="space-y-3 mb-4">
                    <input type="email" placeholder="your@email.com" className="w-full border border-white/15 bg-white/[0.05] rounded-sm px-3 py-2.5 text-sm text-white focus:outline-none placeholder:text-neutral-500" />
                    <button className="w-full bg-white text-black py-2.5 rounded-sm hover:bg-neutral-200 transition-colors text-sm font-medium">Subscribe — Free</button>
                  </div>
                  <div className="border-t border-white/10 pt-4 space-y-3">
                    {stats.map(s => (
                      <div key={s.label} className="flex items-center justify-between">
                        <span className="font-mono-ui text-[10px] text-neutral-500 uppercase tracking-widest">{s.label}</span>
                        <span className="font-heading text-lg">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 px-6 pb-5 pt-2">
                <div className="flex-1 h-px bg-white/20" />
                <div className="w-1.5 h-1.5 border border-white/30 rotate-45" />
                <div className="w-1.5 h-1.5 bg-white/40 rotate-45" />
                <div className="w-1.5 h-1.5 border border-white/30 rotate-45" />
                <div className="flex-1 h-px bg-white/20" />
              </div>
            </div>
          </div>

          <div className="flex h-1.5 mt-1">
            {["#fff","#ddd","#bbb","#999","#777","#555","#333","#222","#111","#222","#333","#555","#777","#999","#bbb","#ddd","#fff"].map((c,i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 34: Wide Classified — Full-width grid edition cards
   — Classified density across the full width, ornamental rules
   ═══════════════════════════════════════════════════ */
function V34() {
  return (
    <div>
      <SectionLabel n={34} title="Wide Classified" />
      <div className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-5xl">
          {/* Ornamental top */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex-1 h-px bg-black" />
            <div className="w-1.5 h-1.5 bg-black rotate-45" />
            <span className="font-mono-ui text-[9px] uppercase tracking-[0.4em] text-neutral-400 px-2">Demand Curve · The Growth Newsletter · Est. 2020</span>
            <div className="w-1.5 h-1.5 bg-black rotate-45" />
            <div className="flex-1 h-px bg-black" />
          </div>

          {/* Thick rule + headline */}
          <div className="border-t-4 border-b-2 border-black py-4 mb-4">
            <div className="flex items-end justify-between">
              <h2 className="font-heading text-5xl md:text-7xl tracking-tight leading-[0.85]">Never Miss<br />an Edition</h2>
              <div className="text-right hidden md:block">
                <div className="font-heading text-4xl tracking-tight text-black/15">100K+</div>
                <div className="font-mono-ui text-[9px] text-neutral-400 uppercase tracking-widest">Operators subscribed</div>
              </div>
            </div>
          </div>

          {/* Subscribe + description row */}
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <p className="flex-1 text-sm text-neutral-600 font-light leading-relaxed">{sectionHeader.subtitle}</p>
            <div className="shrink-0">
              <EmailInput />
              <p className="text-[10px] text-neutral-400 mt-2">Free. Every Tuesday. No spam.</p>
            </div>
          </div>

          {/* Diamond rule */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 border-t border-black/30" />
            <span className="text-[8px] text-neutral-400">✦</span>
            <span className="font-mono-ui text-[9px] text-neutral-400 uppercase tracking-widest">Recent Editions</span>
            <span className="text-[8px] text-neutral-400">✦</span>
            <div className="flex-1 border-t border-black/30" />
          </div>

          {/* Classified grid — 3 columns */}
          <div className="grid md:grid-cols-3 gap-px bg-black/10">
            {recentEditions.map((item, i) => (
              <div key={i} className="bg-[#f9f9f8] p-5 hover:bg-neutral-50 transition-colors cursor-pointer group">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono-ui text-[9px] text-neutral-400 uppercase tracking-widest">Edition {item.number}</span>
                  <span className="section-tag" style={{ display: "inline-flex", fontSize: 8, padding: "1px 6px" }}>{item.type}</span>
                </div>
                <h4 className="text-base font-medium leading-snug mb-2 group-hover:text-neutral-600 transition-colors">{item.title}</h4>
                <div className="flex items-center gap-3 font-mono-ui text-[9px] text-neutral-400">
                  <span>{item.date}</span>
                  <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                  <span>{item.readTime} read</span>
                </div>
              </div>
            ))}
            {/* CTA card */}
            <div className="bg-black text-white p-5 flex flex-col justify-center">
              <div className="font-mono-ui text-[9px] uppercase tracking-widest text-neutral-500 mb-2">Subscribe Today</div>
              <h4 className="font-heading text-xl tracking-tight mb-2">Join 100,000+ operators</h4>
              <p className="text-xs text-neutral-400 font-light">Every edition, straight to your inbox.</p>
            </div>
          </div>

          {/* Ornamental bottom */}
          <div className="flex items-center gap-2 mt-4">
            <div className="flex-1 h-px bg-black" />
            <div className="w-1.5 h-1.5 bg-black rotate-45" />
            <div className="w-1.5 h-1.5 border border-black rotate-45" />
            <div className="w-1.5 h-1.5 bg-black rotate-45" />
            <div className="flex-1 h-px bg-black" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 35: Compact Broadsheet — Tight newspaper
   — Dense, no wasted space, everything above the fold
   ═══════════════════════════════════════════════════ */
function V35() {
  return (
    <div>
      <SectionLabel n={35} title="Compact Broadsheet" />
      <div className="px-6 py-16 md:py-24">
        <div className="relative mx-auto max-w-3xl border border-black/15">
          {/* Corner caps */}
          <div className="absolute -top-[2px] -left-[2px] w-5 h-5 border-t-[3px] border-l-[3px] border-black" />
          <div className="absolute -top-[2px] -right-[2px] w-5 h-5 border-t-[3px] border-r-[3px] border-black" />
          <div className="absolute -bottom-[2px] -left-[2px] w-5 h-5 border-b-[3px] border-l-[3px] border-black" />
          <div className="absolute -bottom-[2px] -right-[2px] w-5 h-5 border-b-[3px] border-r-[3px] border-black" />

          {/* Nameplate */}
          <div className="flex items-center justify-between px-5 py-2 border-b border-black/15">
            <span className="font-mono-ui text-[8px] uppercase tracking-[0.3em] text-neutral-400">Vol. VII No. 247</span>
            <span className="font-heading text-xl tracking-tight">The Growth Newsletter</span>
            <span className="font-mono-ui text-[8px] uppercase tracking-[0.3em] text-neutral-400">Free · Weekly</span>
          </div>

          {/* Marquee */}
          <div className="border-b border-black/10 py-1.5 overflow-hidden">
            <div className="marquee-content whitespace-nowrap font-mono-ui text-[8px] uppercase tracking-widest text-neutral-500">
              {[0, 1].map(i => (
                <span key={i} className="flex">
                  {recentEditions.map((item, j) => (
                    <span key={`${i}-${j}`} className="contents">
                      <span className="px-4">Edition {item.number}: {item.title}</span>|
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>

          {/* Two-column content */}
          <div className="grid md:grid-cols-3 divide-x divide-black/10">
            <div className="md:col-span-2 p-5">
              {/* Editions as dense list */}
              {recentEditions.map((item, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5 border-b border-black/10 last:border-b-0 cursor-pointer hover:bg-neutral-50 transition-colors -mx-5 px-5">
                  <span className="font-mono-ui text-[10px] text-neutral-400 w-10 shrink-0">{item.number}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium leading-snug">{item.title}</div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono-ui text-[9px] text-neutral-400">{item.readTime}</span>
                    <span className="inline-block px-1.5 py-0.5 text-[8px] font-mono-ui uppercase tracking-widest border border-black/10">{item.type}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Subscribe */}
            <div className="p-5">
              <h3 className="font-heading text-lg tracking-tight mb-1">Never miss an edition</h3>
              <p className="text-xs text-neutral-500 font-light leading-relaxed mb-4">100,000+ operators. Every Tuesday.</p>
              <div className="space-y-2">
                <input type="email" placeholder="your@email.com" className="w-full border border-black/15 px-3 py-2 text-xs bg-white focus:outline-none placeholder:text-neutral-400" />
                <button className="w-full bg-black text-white py-2 text-xs font-medium hover:bg-neutral-800 transition-colors">Subscribe</button>
              </div>
              <div className="mt-4 pt-3 border-t border-black/10 grid grid-cols-2 gap-2">
                {stats.slice(0, 4).map(s => (
                  <div key={s.label} className="text-center">
                    <div className="font-heading text-base">{s.value}</div>
                    <div className="font-mono-ui text-[7px] text-neutral-400 uppercase">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 36: Oversized Masthead — Massive type, minimal
   — Giant headline with crop marks, ornaments, subscribe below
   ═══════════════════════════════════════════════════ */
function V36() {
  return (
    <div>
      <SectionLabel n={36} title="Oversized Masthead" />
      <div className="px-6 py-16 md:py-24">
        <div className="relative mx-auto max-w-4xl">
          {/* Registration marks */}
          <div className="absolute -top-4 -left-4 w-6 h-6">
            <div className="absolute top-0 left-2.5 w-px h-3 bg-black/30" />
            <div className="absolute top-2.5 left-0 w-3 h-px bg-black/30" />
            <div className="absolute top-1.5 left-1.5 w-2 h-2 rounded-full border border-black/25" />
          </div>
          <div className="absolute -top-4 -right-4 w-6 h-6">
            <div className="absolute top-0 right-2.5 w-px h-3 bg-black/30" />
            <div className="absolute top-2.5 right-0 w-3 h-px bg-black/30" />
            <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full border border-black/25" />
          </div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6">
            <div className="absolute bottom-0 left-2.5 w-px h-3 bg-black/30" />
            <div className="absolute bottom-2.5 left-0 w-3 h-px bg-black/30" />
            <div className="absolute bottom-1.5 left-1.5 w-2 h-2 rounded-full border border-black/25" />
          </div>
          <div className="absolute -bottom-4 -right-4 w-6 h-6">
            <div className="absolute bottom-0 right-2.5 w-px h-3 bg-black/30" />
            <div className="absolute bottom-2.5 right-0 w-3 h-px bg-black/30" />
            <div className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full border border-black/25" />
          </div>

          {/* Thin color bar */}
          <div className="flex h-1 mb-2">
            {["#000","#333","#666","#999","#ccc","#eee","#ccc","#999","#666","#333","#000"].map((c,i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>

          {/* Top metadata */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono-ui text-[8px] text-neutral-400 uppercase tracking-widest">Demand Curve</span>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 border border-black/30 rotate-45" />
              <span className="font-mono-ui text-[8px] text-neutral-400 uppercase tracking-widest">Free · Weekly · Est. 2020</span>
              <div className="w-1.5 h-1.5 border border-black/30 rotate-45" />
            </div>
            <span className="font-mono-ui text-[8px] text-neutral-400 uppercase tracking-widest">Edition 247</span>
          </div>

          {/* MASSIVE headline */}
          <div className="border-t-4 border-b-4 border-black py-6 md:py-10 text-center mb-6">
            <h2 className="font-heading text-7xl md:text-9xl lg:text-[140px] tracking-tighter leading-[0.8]">The Growth<br/>Newsletter</h2>
          </div>

          {/* Three info blocks */}
          <div className="grid md:grid-cols-3 gap-px bg-black/10 mb-6">
            <div className="bg-[#f9f9f8] p-5 text-center">
              <div className="font-heading text-3xl tracking-tight">{stats[0].value}</div>
              <div className="font-mono-ui text-[9px] text-neutral-400 uppercase tracking-widest mt-1">{stats[0].label}</div>
            </div>
            <div className="bg-[#f9f9f8] p-5">
              <p className="text-sm text-neutral-600 font-light leading-relaxed text-center">{sectionHeader.subtitle}</p>
            </div>
            <div className="bg-[#f9f9f8] p-5 text-center">
              <div className="font-heading text-3xl tracking-tight">{stats[2].value}</div>
              <div className="font-mono-ui text-[9px] text-neutral-400 uppercase tracking-widest mt-1">{stats[2].label}</div>
            </div>
          </div>

          {/* Subscribe centered */}
          <div className="text-center mb-6">
            <h3 className="font-heading text-xl tracking-tight mb-3">Never miss an edition</h3>
            <div className="flex max-w-md gap-2 mx-auto">
              <input type="email" placeholder="your@email.com" className="flex-1 border border-black/15 rounded-sm px-4 py-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black/20 placeholder:text-neutral-400" />
              <button className="bg-black text-white px-5 py-3 rounded-sm hover:bg-neutral-800 transition-colors text-sm font-medium">Subscribe</button>
            </div>
            <p className="text-[10px] text-neutral-400 mt-2">Free. No spam. Every Tuesday.</p>
          </div>

          {/* Editions as marquee */}
          <div className="border-t border-b border-black/10 py-2 overflow-hidden mb-4">
            <div className="marquee-content whitespace-nowrap font-mono-ui text-[9px] uppercase tracking-widest text-neutral-500">
              {[0, 1].map(i => (
                <span key={i} className="flex">
                  {recentEditions.map((item, j) => (
                    <span key={`${i}-${j}`} className="contents">
                      <span className="px-5 flex items-center gap-2">
                        <span className="marquee-square" style={{ animationDelay: `${j * 0.5}s` }} />
                        {item.number} — {item.title} ({item.type})
                      </span>
                      |
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom ornament + color bar */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex-1 h-px bg-black/80" />
            <div className="w-1.5 h-1.5 border border-black rotate-45" />
            <div className="w-1.5 h-1.5 bg-black rotate-45" />
            <div className="w-1.5 h-1.5 border border-black rotate-45" />
            <div className="flex-1 h-px bg-black/80" />
          </div>
          <div className="flex h-1">
            {["#000","#333","#666","#999","#ccc","#eee","#ccc","#999","#666","#333","#000"].map((c,i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 37: Bulletin Board — Pinned cards on grid
   — Classified cards pinned at angles, grid background
   ═══════════════════════════════════════════════════ */
function V37() {
  const rotations = [-1.2, 0.8, -0.5, 1.1, -0.8];
  return (
    <div>
      <SectionLabel n={37} title="Bulletin Board" />
      <div className="px-6 py-16 md:py-24">
        <div className="relative mx-auto max-w-4xl">
          {/* Corner caps */}
          <div className="absolute -top-px -left-px w-5 h-5 border-t-2 border-l-2 border-black z-10" />
          <div className="absolute -top-px -right-px w-5 h-5 border-t-2 border-r-2 border-black z-10" />
          <div className="absolute -bottom-px -left-px w-5 h-5 border-b-2 border-l-2 border-black z-10" />
          <div className="absolute -bottom-px -right-px w-5 h-5 border-b-2 border-r-2 border-black z-10" />

          <div className="relative border border-black/10 overflow-hidden">
            {/* Grid background */}
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

            <div className="relative z-10 p-8 md:p-12">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-3">
                  <div className="w-8 h-px bg-black/40" />
                  <span className="font-mono-ui text-[9px] uppercase tracking-[0.4em] text-neutral-400">Demand Curve · Weekly Dispatch</span>
                  <div className="w-8 h-px bg-black/40" />
                </div>
                <h2 className="font-heading text-5xl md:text-6xl tracking-tight mb-3">{sectionHeader.title}</h2>
                <p className="text-sm text-neutral-500 font-light max-w-lg mx-auto">{sectionHeader.subtitle}</p>
              </div>

              {/* Ornament */}
              <div className="flex items-center gap-2 mb-8">
                <div className="flex-1 h-px bg-black/20" />
                <div className="w-1.5 h-1.5 bg-black rotate-45" />
                <div className="flex-1 h-px bg-black/20" />
              </div>

              {/* "Pinned" edition cards */}
              <div className="grid md:grid-cols-3 gap-5 mb-8">
                {recentEditions.slice(0, 3).map((item, i) => (
                  <div
                    key={i}
                    className="bg-white border border-black/10 p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative"
                    style={{ transform: `rotate(${rotations[i]}deg)` }}
                  >
                    {/* Pin dot */}
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-black/80 border-2 border-white" />
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono-ui text-[9px] text-neutral-400">Edition {item.number}</span>
                      <span className="font-mono-ui text-[9px] text-neutral-400">{item.date}</span>
                    </div>
                    <h4 className="text-sm font-medium leading-snug mb-2">{item.title}</h4>
                    <div className="flex items-center gap-2">
                      <span className="section-tag" style={{ display: "inline-flex", fontSize: 8, padding: "1px 6px" }}>{item.type}</span>
                      <span className="font-mono-ui text-[8px] text-neutral-400">{item.readTime}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Remaining editions as dense row */}
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {recentEditions.slice(3).map((item, i) => (
                  <div
                    key={i}
                    className="bg-white border border-black/10 p-4 shadow-sm relative"
                    style={{ transform: `rotate(${rotations[i + 3]}deg)` }}
                  >
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-black/80 border-2 border-white" />
                    <div className="flex items-center gap-3">
                      <span className="font-mono-ui text-[9px] text-neutral-400">{item.number}</span>
                      <span className="text-sm font-medium flex-1">{item.title}</span>
                      <span className="section-tag" style={{ display: "inline-flex", fontSize: 8, padding: "1px 6px" }}>{item.type}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Subscribe card — centered, no rotation */}
              <div className="max-w-md mx-auto bg-white border-2 border-black p-6 text-center relative">
                <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-black border-2 border-white" />
                <h3 className="font-heading text-xl tracking-tight mb-2">Never miss an edition</h3>
                <p className="text-xs text-neutral-500 mb-4">Every Tuesday. 100,000+ operators. Free.</p>
                <div className="flex gap-2">
                  <input type="email" placeholder="your@email.com" className="flex-1 border border-black/15 px-3 py-2.5 text-sm bg-white focus:outline-none placeholder:text-neutral-400" />
                  <button className="bg-black text-white px-4 py-2.5 text-sm font-medium hover:bg-neutral-800 transition-colors">Subscribe</button>
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
   VARIATION 38: The Gazette — Rainbow-hover edition rows
   — Newspaper layout with rainbow feed rows, marquee,
     ornaments, corner caps, and classified subscribe
   ═══════════════════════════════════════════════════ */
function V38() {
  return (
    <div>
      <SectionLabel n={38} title="The Gazette — Rainbow Rows" />
      <div className="px-6 py-16 md:py-24">
        <div className="relative mx-auto max-w-4xl">
          {/* Registration marks */}
          <div className="absolute -top-4 -left-4 w-6 h-6">
            <div className="absolute top-0 left-2.5 w-px h-3 bg-black/30" />
            <div className="absolute top-2.5 left-0 w-3 h-px bg-black/30" />
          </div>
          <div className="absolute -top-4 -right-4 w-6 h-6">
            <div className="absolute top-0 right-2.5 w-px h-3 bg-black/30" />
            <div className="absolute top-2.5 right-0 w-3 h-px bg-black/30" />
          </div>
          <div className="absolute -bottom-4 -left-4 w-6 h-6">
            <div className="absolute bottom-0 left-2.5 w-px h-3 bg-black/30" />
            <div className="absolute bottom-2.5 left-0 w-3 h-px bg-black/30" />
          </div>
          <div className="absolute -bottom-4 -right-4 w-6 h-6">
            <div className="absolute bottom-0 right-2.5 w-px h-3 bg-black/30" />
            <div className="absolute bottom-2.5 right-0 w-3 h-px bg-black/30" />
          </div>

          <div className="border border-black/15">
            {/* Corner caps */}
            <div className="absolute -top-[2px] -left-[2px] w-5 h-5 border-t-[3px] border-l-[3px] border-black z-10" />
            <div className="absolute -top-[2px] -right-[2px] w-5 h-5 border-t-[3px] border-r-[3px] border-black z-10" />
            <div className="absolute -bottom-[2px] -left-[2px] w-5 h-5 border-b-[3px] border-l-[3px] border-black z-10" />
            <div className="absolute -bottom-[2px] -right-[2px] w-5 h-5 border-b-[3px] border-r-[3px] border-black z-10" />

            {/* Ornamental top */}
            <div className="flex items-center gap-2 px-6 pt-5 mb-3">
              <div className="flex-1 h-px bg-black/80" />
              <div className="w-1.5 h-1.5 border border-black rotate-45" />
              <div className="w-1.5 h-1.5 bg-black rotate-45" />
              <div className="w-1.5 h-1.5 border border-black rotate-45" />
              <div className="flex-1 h-px bg-black/80" />
            </div>

            {/* Masthead */}
            <div className="text-center px-6 pb-4">
              <div className="flex items-center justify-center gap-4 mb-2">
                <span className="font-mono-ui text-[8px] uppercase tracking-[0.3em] text-neutral-400">Est. 2020</span>
                <span className="text-[8px] text-neutral-300">✦</span>
                <span className="font-mono-ui text-[8px] uppercase tracking-[0.3em] text-neutral-400">Weekly</span>
                <span className="text-[8px] text-neutral-300">✦</span>
                <span className="font-mono-ui text-[8px] uppercase tracking-[0.3em] text-neutral-400">100,000+ Readers</span>
              </div>
              <h2 className="font-heading text-5xl md:text-7xl tracking-tight">The Growth Gazette</h2>
              <div className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400 mt-2">&ldquo;Systems, not guesswork&rdquo; — Demand Curve</div>
            </div>

            {/* Double rule */}
            <div className="mx-6 border-t-2 border-b border-black/80 py-0.5 mb-0">
              <div className="border-b border-black/30" />
            </div>

            {/* Marquee ticker */}
            <div className="border-b border-black/10 py-2 overflow-hidden">
              <div className="marquee-content whitespace-nowrap font-mono-ui text-[9px] uppercase tracking-widest text-neutral-500">
                {[0, 1].map(i => (
                  <span key={i} className="flex">
                    {recentEditions.map((item, j) => (
                      <span key={`${i}-${j}`} className="contents">
                        <span className="px-5 flex items-center gap-2">
                          <span className="marquee-square" style={{ animationDelay: `${j * 0.5}s` }} />
                          Edition {item.number}: {item.title}
                        </span>
                        |
                      </span>
                    ))}
                  </span>
                ))}
              </div>
            </div>

            {/* Rainbow-hover edition rows */}
            <div className="border-b border-black/10">
              {recentEditions.map((item, i) => (
                <a
                  key={i}
                  href="#"
                  className="feed-row flex items-center border-b border-black/10 last:border-b-0 px-6 py-4 cursor-pointer"
                  style={{ "--row-hue": `${(i * 55 + 15) % 360}` } as React.CSSProperties}
                >
                  <span className="font-mono-ui text-[10px] text-neutral-400 w-14 shrink-0">{item.number}</span>
                  <span className="font-mono-ui text-[10px] text-neutral-400 w-16 shrink-0">{item.date}</span>
                  <span className="flex-1 text-base font-medium leading-tight">{item.title}</span>
                  <span className="feed-type-badge inline-block rounded-sm px-2 py-0.5 text-[9px] font-mono-ui uppercase tracking-widest border border-black/10 bg-white transition-colors ml-4">{item.type}</span>
                  <span className="font-mono-ui text-[10px] text-neutral-400 ml-4">{item.readTime}</span>
                </a>
              ))}
            </div>

            {/* Subscribe section */}
            <div className="grid md:grid-cols-2 divide-x divide-black/10">
              <div className="p-6">
                <h3 className="font-heading text-2xl tracking-tight mb-2">Never miss an edition</h3>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">{sectionHeader.subtitle}</p>
              </div>
              <div className="p-6 flex flex-col justify-center">
                <div className="flex gap-2 mb-2">
                  <input type="email" placeholder="your@email.com" className="flex-1 border border-black/15 rounded-sm px-3 py-2.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black/20 placeholder:text-neutral-400" />
                  <button className="bg-black text-white px-4 py-2.5 rounded-sm hover:bg-neutral-800 transition-colors text-sm font-medium">Subscribe</button>
                </div>
                <p className="text-[10px] text-neutral-400">Free. Every Tuesday. Unsubscribe anytime.</p>
              </div>
            </div>

            {/* Bottom ornament */}
            <div className="flex items-center gap-2 px-6 pb-5">
              <div className="flex-1 h-px bg-black/80" />
              <div className="w-1.5 h-1.5 border border-black rotate-45" />
              <div className="w-1.5 h-1.5 bg-black rotate-45" />
              <div className="w-1.5 h-1.5 border border-black rotate-45" />
              <div className="flex-1 h-px bg-black/80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 39: V32 + Rainbow Rows
   — The Ultimate but with rainbow-hover edition rows from V38
   ═══════════════════════════════════════════════════ */
function V39() {
  return (
    <div>
      <SectionLabel n={39} title="Ultimate + Rainbow Rows" />
      <div className="px-6 py-16 md:py-24">
        <div className="relative mx-auto max-w-4xl">
          {/* Crop marks */}
          <div className="absolute -top-5 -left-5 w-8 h-8">
            <div className="absolute top-0 left-3.5 w-px h-5 bg-black/30" />
            <div className="absolute top-3.5 left-0 w-5 h-px bg-black/30" />
            <div className="absolute top-2.5 left-2.5 w-2.5 h-2.5 rounded-full border border-black/25" />
          </div>
          <div className="absolute -top-5 -right-5 w-8 h-8">
            <div className="absolute top-0 right-3.5 w-px h-5 bg-black/30" />
            <div className="absolute top-3.5 right-0 w-5 h-px bg-black/30" />
            <div className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full border border-black/25" />
          </div>
          <div className="absolute -bottom-5 -left-5 w-8 h-8">
            <div className="absolute bottom-0 left-3.5 w-px h-5 bg-black/30" />
            <div className="absolute bottom-3.5 left-0 w-5 h-px bg-black/30" />
            <div className="absolute bottom-2.5 left-2.5 w-2.5 h-2.5 rounded-full border border-black/25" />
          </div>
          <div className="absolute -bottom-5 -right-5 w-8 h-8">
            <div className="absolute bottom-0 right-3.5 w-px h-5 bg-black/30" />
            <div className="absolute bottom-3.5 right-0 w-5 h-px bg-black/30" />
            <div className="absolute bottom-2.5 right-2.5 w-2.5 h-2.5 rounded-full border border-black/25" />
          </div>

          {/* Color bar */}
          <div className="flex h-1.5 mb-1">
            {["#000","#222","#444","#666","#888","#aaa","#ccc","#ddd","#eee","#ddd","#ccc","#aaa","#888","#666","#444","#222","#000"].map((c,i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>
          <div className="flex items-center justify-between mb-1 px-1">
            <span className="font-mono-ui text-[7px] text-neutral-400 uppercase tracking-widest">Sheet 1/1</span>
            <span className="font-mono-ui text-[7px] text-neutral-400 uppercase tracking-widest">Demand Curve — Growth Newsletter — Vol. VII</span>
            <span className="font-mono-ui text-[7px] text-neutral-400 uppercase tracking-widest">Proof: Final</span>
          </div>

          <div className="relative border border-black/15 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="absolute -top-[2px] -left-[2px] w-6 h-6 border-t-[3px] border-l-[3px] border-black z-10" />
            <div className="absolute -top-[2px] -right-[2px] w-6 h-6 border-t-[3px] border-r-[3px] border-black z-10" />
            <div className="absolute -bottom-[2px] -left-[2px] w-6 h-6 border-b-[3px] border-l-[3px] border-black z-10" />
            <div className="absolute -bottom-[2px] -right-[2px] w-6 h-6 border-b-[3px] border-r-[3px] border-black z-10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 border-t-2 border-black z-10" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 border-b-2 border-black z-10" />

            <div className="relative z-[5] bg-[#f9f9f8]/90">
              {/* Ornamental top */}
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
                <h2 className="font-heading text-5xl md:text-7xl tracking-tight">{sectionHeader.title}</h2>
              </div>

              {/* Double rule */}
              <div className="mx-6 border-t-2 border-b border-black/80 py-0.5 mb-0">
                <div className="border-b border-black/30" />
              </div>

              {/* Marquee */}
              <div className="border-b border-black/10 py-2 overflow-hidden">
                <div className="marquee-content whitespace-nowrap font-mono-ui text-[9px] uppercase tracking-widest text-neutral-500">
                  {[0, 1].map(i => (
                    <span key={i} className="flex">
                      {recentEditions.map((item, j) => (
                        <span key={`${i}-${j}`} className="contents">
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

              {/* Rainbow-hover edition rows */}
              <div>
                {recentEditions.map((item, i) => (
                  <a key={i} href="#" className="feed-row flex items-center border-b border-black/10 px-6 py-4 cursor-pointer" style={{ "--row-hue": `${(i * 55 + 15) % 360}` } as React.CSSProperties}>
                    <span className="font-mono-ui text-[10px] text-neutral-400 w-14 shrink-0">{item.number}</span>
                    <span className="font-mono-ui text-[10px] text-neutral-400 w-16 shrink-0">{item.date}</span>
                    <span className="flex-1 text-base font-medium leading-tight">{item.title}</span>
                    <span className="feed-type-badge inline-block rounded-sm px-2 py-0.5 text-[9px] font-mono-ui uppercase tracking-widest border border-black/10 bg-white transition-colors ml-4">{item.type}</span>
                    <span className="font-mono-ui text-[10px] text-neutral-400 ml-4">{item.readTime}</span>
                  </a>
                ))}
              </div>

              {/* Subscribe footer */}
              <div className="grid md:grid-cols-2 divide-x divide-black/10">
                <div className="p-6">
                  <h3 className="font-heading text-2xl tracking-tight mb-2">Never miss an edition</h3>
                  <p className="text-sm text-neutral-500 font-light leading-relaxed">{sectionHeader.subtitle}</p>
                </div>
                <div className="p-6 flex flex-col justify-center">
                  <EmailInput />
                  <p className="text-[10px] text-neutral-400 mt-2">Free. Every Tuesday. Unsubscribe anytime.</p>
                </div>
              </div>

              {/* Ornamental bottom */}
              <div className="flex items-center gap-2 px-6 pb-5">
                <div className="flex-1 h-px bg-black/80" />
                <div className="w-1.5 h-1.5 border border-black rotate-45" />
                <div className="w-1.5 h-1.5 bg-black rotate-45" />
                <div className="w-1.5 h-1.5 border border-black rotate-45" />
                <div className="flex-1 h-px bg-black/80" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-1 px-1">
            <span className="font-mono-ui text-[7px] text-neutral-400 uppercase tracking-widest">Trim</span>
            <span className="font-mono-ui text-[7px] text-neutral-400 uppercase tracking-widest">© Demand Curve 2026</span>
            <span className="font-mono-ui text-[7px] text-neutral-400 uppercase tracking-widest">Bleed: 3mm</span>
          </div>
          <div className="flex h-1.5 mt-1">
            {["#000","#222","#444","#666","#888","#aaa","#ccc","#ddd","#eee","#ddd","#ccc","#aaa","#888","#666","#444","#222","#000"].map((c,i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 40: Ultimate Centered — Symmetrical broadsheet
   — Centered masthead, centered subscribe, editions flanked
   ═══════════════════════════════════════════════════ */
function V40() {
  return (
    <div>
      <SectionLabel n={40} title="Ultimate Centered" />
      <div className="px-6 py-16 md:py-24">
        <div className="relative mx-auto max-w-4xl">
          {/* Crop marks */}
          {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
            <div key={`${v}${h}`} className={`absolute -${v}-5 -${h}-5 w-8 h-8`}>
              <div className={`absolute ${v}-0 ${h === "left" ? "left-3.5" : "right-3.5"} w-px h-5 bg-black/30`} />
              <div className={`absolute ${v === "top" ? "top-3.5" : "bottom-3.5"} ${h}-0 w-5 h-px bg-black/30`} />
              <div className={`absolute ${v === "top" ? "top-2.5" : "bottom-2.5"} ${h === "left" ? "left-2.5" : "right-2.5"} w-2.5 h-2.5 rounded-full border border-black/25`} />
            </div>
          ))}

          <div className="flex h-1.5 mb-1">
            {["#000","#222","#444","#666","#888","#aaa","#ccc","#ddd","#eee","#ddd","#ccc","#aaa","#888","#666","#444","#222","#000"].map((c,i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>

          <div className="relative border border-black/15 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            <div className="absolute -top-[2px] -left-[2px] w-6 h-6 border-t-[3px] border-l-[3px] border-black z-10" />
            <div className="absolute -top-[2px] -right-[2px] w-6 h-6 border-t-[3px] border-r-[3px] border-black z-10" />
            <div className="absolute -bottom-[2px] -left-[2px] w-6 h-6 border-b-[3px] border-l-[3px] border-black z-10" />
            <div className="absolute -bottom-[2px] -right-[2px] w-6 h-6 border-b-[3px] border-r-[3px] border-black z-10" />

            <div className="relative z-[5] bg-[#f9f9f8]/90">
              {/* Ornament */}
              <div className="flex items-center gap-2 px-6 pt-6 mb-3">
                <div className="flex-1 h-px bg-black/80" />
                <div className="w-1.5 h-1.5 border border-black rotate-45" />
                <div className="w-1.5 h-1.5 bg-black rotate-45" />
                <div className="w-1.5 h-1.5 border border-black rotate-45" />
                <div className="flex-1 h-px bg-black/80" />
              </div>

              {/* Centered masthead */}
              <div className="text-center px-6 pb-6">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <span className="font-mono-ui text-[8px] uppercase tracking-[0.4em] text-neutral-400">Demand Curve · Est. 2020 · Free</span>
                </div>
                <h2 className="font-heading text-6xl md:text-8xl tracking-tight leading-[0.85] mb-4">{sectionHeader.title}</h2>
                <p className="text-neutral-500 font-light text-base max-w-xl mx-auto mb-6">{sectionHeader.subtitle}</p>
                <div className="flex max-w-md gap-2 mx-auto mb-2">
                  <input type="email" placeholder="your@email.com" className="flex-1 border border-black/15 rounded-sm px-4 py-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black/20 placeholder:text-neutral-400" />
                  <button className="bg-black text-white px-5 py-3 rounded-sm hover:bg-neutral-800 transition-colors text-sm font-medium">Subscribe</button>
                </div>
                <p className="text-[10px] text-neutral-400">Free. Every Tuesday. Unsubscribe anytime.</p>
              </div>

              {/* Diamond rule */}
              <div className="flex items-center gap-3 px-6 mb-0">
                <div className="flex-1 border-t border-black/30" />
                <span className="text-[8px] text-neutral-400">✦</span>
                <span className="font-mono-ui text-[9px] uppercase tracking-widest text-neutral-400">Recent Editions</span>
                <span className="text-[8px] text-neutral-400">✦</span>
                <div className="flex-1 border-t border-black/30" />
              </div>

              {/* Marquee */}
              <div className="border-b border-black/10 py-2 overflow-hidden">
                <div className="marquee-content whitespace-nowrap font-mono-ui text-[9px] uppercase tracking-widest text-neutral-500">
                  {[0, 1].map(i => (
                    <span key={i} className="flex">
                      {recentEditions.map((item, j) => (
                        <span key={`${i}-${j}`} className="contents">
                          <span className="px-5 flex items-center gap-2">
                            <span className="marquee-square" style={{ animationDelay: `${j * 0.5}s` }} />
                            Edition {item.number} — {item.title}
                          </span>|
                        </span>
                      ))}
                    </span>
                  ))}
                </div>
              </div>

              {/* Edition cards — classified grid */}
              <div className="grid md:grid-cols-3 gap-px bg-black/10">
                {recentEditions.map((item, i) => (
                  <a key={i} href="#" className="feed-row bg-[#f9f9f8] p-5 cursor-pointer" style={{ "--row-hue": `${(i * 55 + 15) % 360}` } as React.CSSProperties}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono-ui text-[9px] text-neutral-400">Edition {item.number}</span>
                      <span className="feed-type-badge inline-block rounded-sm px-2 py-0.5 text-[9px] font-mono-ui uppercase tracking-widest border border-black/10 bg-white transition-colors">{item.type}</span>
                    </div>
                    <h4 className="text-sm font-medium leading-snug mb-2">{item.title}</h4>
                    <div className="flex items-center gap-2 font-mono-ui text-[9px] text-neutral-400">
                      <span>{item.date}</span>
                      <span className="w-1 h-1 bg-neutral-300 rounded-full" />
                      <span>{item.readTime} read</span>
                    </div>
                  </a>
                ))}
                {/* Stats card */}
                <div className="bg-[#f9f9f8] p-5">
                  <div className="font-mono-ui text-[9px] text-neutral-400 uppercase tracking-widest mb-3">By the Numbers</div>
                  {stats.map(s => (
                    <div key={s.label} className="flex items-center justify-between py-1.5 border-b border-black/10 last:border-b-0">
                      <span className="font-mono-ui text-[9px] text-neutral-400">{s.label}</span>
                      <span className="font-heading text-base">{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom ornament */}
              <div className="flex items-center gap-2 px-6 py-5">
                <div className="flex-1 h-px bg-black/80" />
                <div className="w-1.5 h-1.5 border border-black rotate-45" />
                <div className="w-1.5 h-1.5 bg-black rotate-45" />
                <div className="w-1.5 h-1.5 border border-black rotate-45" />
                <div className="flex-1 h-px bg-black/80" />
              </div>
            </div>
          </div>

          <div className="flex h-1.5 mt-1">
            {["#000","#222","#444","#666","#888","#aaa","#ccc","#ddd","#eee","#ddd","#ccc","#aaa","#888","#666","#444","#222","#000"].map((c,i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 41: Ultimate Tabloid — Bold + loud version
   — Thick black borders, reversed nameplate, big type
   ═══════════════════════════════════════════════════ */
function V41() {
  return (
    <div>
      <SectionLabel n={41} title="Ultimate Tabloid" />
      <div className="px-6 py-16 md:py-24">
        <div className="relative mx-auto max-w-4xl">
          {/* Crop marks */}
          {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
            <div key={`${v}${h}`} className={`absolute -${v}-4 -${h}-4 w-6 h-6`}>
              <div className={`absolute ${v}-0 ${h === "left" ? "left-2.5" : "right-2.5"} w-px h-3 bg-black/30`} />
              <div className={`absolute ${v === "top" ? "top-2.5" : "bottom-2.5"} ${h}-0 w-3 h-px bg-black/30`} />
            </div>
          ))}

          <div className="flex h-1.5 mb-1">
            {["#000","#333","#666","#999","#ccc","#eee","#ccc","#999","#666","#333","#000"].map((c,i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>

          {/* Black nameplate */}
          <div className="bg-black text-white flex items-center justify-between px-6 py-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px]">★</span>
              <span className="font-mono-ui text-[10px] uppercase tracking-widest">Demand Curve</span>
            </div>
            <span className="font-heading text-2xl md:text-3xl tracking-tight">THE GROWTH NEWSLETTER</span>
            <div className="flex items-center gap-2">
              <span className="font-mono-ui text-[10px] uppercase tracking-widest">Est. 2020</span>
              <span className="text-[10px]">★</span>
            </div>
          </div>

          <div className="relative border-l-4 border-r-4 border-b-4 border-black overflow-hidden">
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

            <div className="relative z-[5]">
              {/* Marquee */}
              <div className="border-b border-black/10 py-2 overflow-hidden">
                <div className="marquee-content whitespace-nowrap font-mono-ui text-[9px] uppercase tracking-widest text-neutral-500">
                  {[0, 1].map(i => (
                    <span key={i} className="flex">
                      {recentEditions.map((item, j) => (
                        <span key={`${i}-${j}`} className="contents">
                          <span className="px-5 flex items-center gap-2">
                            <span className="marquee-square" style={{ animationDelay: `${j * 0.5}s` }} />
                            Edition {item.number}: {item.title}
                          </span>|
                        </span>
                      ))}
                    </span>
                  ))}
                </div>
              </div>

              {/* Giant lead + sidebar */}
              <div className="grid md:grid-cols-3 divide-x divide-black/10">
                <div className="md:col-span-2 p-6 md:p-8">
                  <h3 className="font-heading text-4xl md:text-5xl tracking-tight leading-[0.9] mb-4">{recentEditions[0].title}</h3>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-black text-white px-2 py-0.5 font-mono-ui text-[9px] uppercase tracking-widest">{recentEditions[0].type}</span>
                    <span className="font-mono-ui text-[10px] text-neutral-400">Edition {recentEditions[0].number} · {recentEditions[0].readTime}</span>
                  </div>
                  <p className="text-sm text-neutral-600 font-light leading-relaxed mb-6">Growth experiments should be your most powerful tool. But most teams run them wrong — optimizing for velocity over learning, testing the wrong variables, and declaring winners based on hope.</p>

                  {/* Sub-editions */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex-1 h-px bg-black/20" />
                    <div className="w-1.5 h-1.5 bg-black rotate-45" />
                    <div className="flex-1 h-px bg-black/20" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {recentEditions.slice(1, 3).map((item, i) => (
                      <div key={i}>
                        <span className="bg-black text-white px-1.5 py-0.5 font-mono-ui text-[8px] uppercase tracking-widest">{item.type}</span>
                        <h4 className="text-base font-heading tracking-tight mt-2 mb-1">{item.title}</h4>
                        <span className="font-mono-ui text-[9px] text-neutral-400">{item.readTime}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Subscribe sidebar */}
                <div className="p-6 flex flex-col">
                  <h3 className="font-heading text-xl tracking-tight mb-2">Never miss an edition</h3>
                  <p className="text-xs text-neutral-500 font-light leading-relaxed mb-4">{sectionHeader.subtitle}</p>
                  <div className="space-y-2 mb-4">
                    <input type="email" placeholder="your@email.com" className="w-full border border-black/15 px-3 py-2.5 text-sm bg-white focus:outline-none placeholder:text-neutral-400" />
                    <button className="w-full bg-black text-white py-2.5 text-sm font-medium hover:bg-neutral-800 transition-colors">Subscribe — Free</button>
                  </div>

                  <div className="mt-auto pt-4 border-t border-black/10 space-y-2">
                    {recentEditions.slice(3).map((item, i) => (
                      <a key={i} href="#" className="flex items-center justify-between text-xs group">
                        <span className="font-medium group-hover:text-neutral-600 transition-colors">{item.title}</span>
                        <span className="font-mono-ui text-[8px] text-neutral-400 shrink-0 ml-2">{item.number}</span>
                      </a>
                    ))}
                  </div>

                  <div className="mt-4 pt-3 border-t border-black/10 grid grid-cols-2 gap-2">
                    {stats.slice(0, 2).map(s => (
                      <div key={s.label} className="text-center">
                        <div className="font-heading text-lg">{s.value}</div>
                        <div className="font-mono-ui text-[7px] text-neutral-400 uppercase">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex h-1.5 mt-1">
            {["#000","#333","#666","#999","#ccc","#eee","#ccc","#999","#666","#333","#000"].map((c,i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 42: Ultimate Wide — Horizontal layout
   — Full-width, subscribe left, editions right as rows
   ═══════════════════════════════════════════════════ */
function V42() {
  return (
    <div>
      <SectionLabel n={42} title="Ultimate Wide" />
      <div className="px-6 py-16 md:py-24">
        <div className="relative mx-auto max-w-5xl">
          <div className="flex h-1.5 mb-1">
            {["#000","#222","#444","#666","#888","#aaa","#ccc","#ddd","#eee","#ddd","#ccc","#aaa","#888","#666","#444","#222","#000"].map((c,i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>
          <div className="flex items-center justify-between mb-1 px-1">
            <span className="font-mono-ui text-[7px] text-neutral-400 uppercase tracking-widest">Demand Curve</span>
            <span className="font-mono-ui text-[7px] text-neutral-400 uppercase tracking-widest">The Growth Newsletter · Vol. VII · Weekly</span>
            <span className="font-mono-ui text-[7px] text-neutral-400 uppercase tracking-widest">Est. 2020</span>
          </div>

          <div className="relative border border-black/15">
            <div className="absolute -top-[2px] -left-[2px] w-6 h-6 border-t-[3px] border-l-[3px] border-black z-10" />
            <div className="absolute -top-[2px] -right-[2px] w-6 h-6 border-t-[3px] border-r-[3px] border-black z-10" />
            <div className="absolute -bottom-[2px] -left-[2px] w-6 h-6 border-b-[3px] border-l-[3px] border-black z-10" />
            <div className="absolute -bottom-[2px] -right-[2px] w-6 h-6 border-b-[3px] border-r-[3px] border-black z-10" />

            {/* Ornamental top */}
            <div className="flex items-center gap-2 px-6 pt-5 mb-3">
              <div className="flex-1 h-px bg-black/80" />
              <div className="w-1.5 h-1.5 border border-black rotate-45" />
              <div className="w-1.5 h-1.5 bg-black rotate-45" />
              <div className="w-1.5 h-1.5 border border-black rotate-45" />
              <div className="flex-1 h-px bg-black/80" />
            </div>

            <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-black/10">
              {/* Left: masthead + subscribe */}
              <div className="md:w-[38%] shrink-0 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono-ui text-[8px] uppercase tracking-[0.3em] text-neutral-400">Est. 2020 · Free · Weekly</span>
                </div>
                <h2 className="font-heading text-4xl md:text-5xl tracking-tight leading-[0.9] mb-4">{sectionHeader.title}</h2>
                <p className="text-sm text-neutral-500 font-light leading-relaxed mb-6">{sectionHeader.subtitle}</p>
                <div className="space-y-3 mb-3">
                  <input type="email" placeholder="your@email.com" className="w-full border border-black/15 rounded-sm px-4 py-3 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-black/20 placeholder:text-neutral-400" />
                  <button className="w-full bg-black text-white py-3 rounded-sm hover:bg-neutral-800 transition-colors text-sm font-medium">Subscribe — Free</button>
                </div>
                <p className="text-[10px] text-neutral-400 mb-6">No spam. Unsubscribe anytime.</p>
                <div className="border-t border-black/10 pt-4 grid grid-cols-2 gap-3">
                  {stats.slice(0, 2).map(s => (
                    <div key={s.label}>
                      <div className="font-heading text-2xl">{s.value}</div>
                      <div className="font-mono-ui text-[8px] text-neutral-400 uppercase tracking-widest">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: editions with rainbow rows */}
              <div className="flex-1">
                <div className="font-mono-ui text-[9px] uppercase tracking-widest text-neutral-400 px-6 pt-6 pb-2">Recent Editions</div>
                {recentEditions.map((item, i) => (
                  <a key={i} href="#" className="feed-row flex items-center border-b border-black/10 px-6 py-4 cursor-pointer" style={{ "--row-hue": `${(i * 55 + 15) % 360}` } as React.CSSProperties}>
                    <span className="font-mono-ui text-[10px] text-neutral-400 w-14 shrink-0">{item.number}</span>
                    <span className="font-mono-ui text-[10px] text-neutral-400 w-16 shrink-0">{item.date}</span>
                    <span className="flex-1 text-base font-medium leading-tight">{item.title}</span>
                    <span className="feed-type-badge inline-block rounded-sm px-2 py-0.5 text-[9px] font-mono-ui uppercase tracking-widest border border-black/10 bg-white transition-colors ml-4">{item.type}</span>
                    <span className="font-mono-ui text-[10px] text-neutral-400 ml-4">{item.readTime}</span>
                  </a>
                ))}
                {/* Testimonial at bottom */}
                <div className="px-6 py-5">
                  <p className="text-xs font-light text-neutral-500 italic leading-relaxed">&ldquo;{testimonials[0].quote}&rdquo;</p>
                  <div className="font-mono-ui text-[9px] text-neutral-400 mt-2">— {testimonials[0].author}, {testimonials[0].company}</div>
                </div>
              </div>
            </div>

            {/* Marquee at bottom */}
            <div className="border-t border-black/10 py-2 overflow-hidden">
              <div className="marquee-content whitespace-nowrap font-mono-ui text-[9px] uppercase tracking-widest text-neutral-500">
                {[0, 1].map(i => (
                  <span key={i} className="flex">
                    {recentEditions.map((item, j) => (
                      <span key={`${i}-${j}`} className="contents">
                        <span className="px-5 flex items-center gap-2">
                          <span className="marquee-square" style={{ animationDelay: `${j * 0.5}s` }} />
                          Edition {item.number} — {item.title}
                        </span>|
                      </span>
                    ))}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom ornament */}
            <div className="flex items-center gap-2 px-6 pb-5 pt-2">
              <div className="flex-1 h-px bg-black/80" />
              <div className="w-1.5 h-1.5 border border-black rotate-45" />
              <div className="w-1.5 h-1.5 bg-black rotate-45" />
              <div className="w-1.5 h-1.5 border border-black rotate-45" />
              <div className="flex-1 h-px bg-black/80" />
            </div>
          </div>

          <div className="flex h-1.5 mt-1">
            {["#000","#222","#444","#666","#888","#aaa","#ccc","#ddd","#eee","#ddd","#ccc","#aaa","#888","#666","#444","#222","#000"].map((c,i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 43: Dossier — Dispatch + V32 fusion
   — Dashed borders, classified cards, ornamental rules
   ═══════════════════════════════════════════════════ */
function V43() {
  return (
    <div>
      <SectionLabel n={43} title="Dossier" />
      <div className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          {/* Dossier header */}
          <div className="border-2 border-dashed border-black/25 p-1 mb-0">
            <div className="border border-black/15 px-6 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-black" />
                <span className="font-mono-ui text-[10px] uppercase tracking-[0.3em]">Growth Dispatch</span>
              </div>
              <span className="font-heading text-xl">The Growth Newsletter</span>
              <span className="font-mono-ui text-[10px] uppercase tracking-[0.3em] text-neutral-400">Demand Curve HQ</span>
            </div>
          </div>

          {/* Body */}
          <div className="border-l-2 border-r-2 border-dashed border-black/25">
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

              <div className="relative z-10 px-8 md:px-12 py-8">
                {/* Status line */}
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                  <span className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest">Frequency: Weekly</span>
                  <span className="w-1 h-1 bg-neutral-400 rounded-full" />
                  <span className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest">Recipients: 100,000+</span>
                  <span className="w-1 h-1 bg-neutral-400 rounded-full" />
                  <span className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest">Classification: Open</span>
                  <span className="w-1 h-1 bg-neutral-400 rounded-full" />
                  <span className="font-mono-ui text-[10px] text-neutral-400 uppercase tracking-widest">Est. 2020</span>
                </div>

                {/* Subscribe + description */}
                <div className="flex flex-col md:flex-row gap-8 mb-8">
                  <div className="flex-1">
                    <h2 className="font-heading text-4xl md:text-5xl tracking-tight mb-3">Never miss an edition</h2>
                    <p className="text-sm text-neutral-600 font-light leading-relaxed">{sectionHeader.subtitle}</p>
                  </div>
                  <div className="md:w-[320px] shrink-0">
                    <EmailInput />
                    <p className="text-[10px] text-neutral-400 mt-2">Free. No spam. Withdraw anytime.</p>
                  </div>
                </div>

                {/* Diamond rule */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex-1 h-px bg-black/80" />
                  <div className="w-1.5 h-1.5 border border-black rotate-45" />
                  <div className="w-1.5 h-1.5 bg-black rotate-45" />
                  <div className="w-1.5 h-1.5 border border-black rotate-45" />
                  <div className="flex-1 h-px bg-black/80" />
                </div>

                {/* Classified edition cards */}
                <div className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400 mb-3">Recent Dispatches</div>
                <div className="grid md:grid-cols-3 gap-px bg-black/10 mb-6">
                  {recentEditions.map((item, i) => (
                    <a key={i} href="#" className="feed-row bg-[#f9f9f8] p-4 cursor-pointer" style={{ "--row-hue": `${(i * 55 + 15) % 360}` } as React.CSSProperties}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono-ui text-[9px] text-neutral-400">Edition {item.number}</span>
                        <span className="section-tag" style={{ display: "inline-flex", fontSize: 8, padding: "1px 6px" }}>{item.type}</span>
                      </div>
                      <h4 className="text-sm font-medium leading-snug mb-1">{item.title}</h4>
                      <div className="font-mono-ui text-[9px] text-neutral-400">{item.date} · {item.readTime}</div>
                    </a>
                  ))}
                  {/* Stats card */}
                  <div className="bg-[#f9f9f8] p-4">
                    <div className="font-mono-ui text-[9px] text-neutral-400 uppercase tracking-widest mb-2">Intel</div>
                    {stats.map(s => (
                      <div key={s.label} className="flex justify-between py-1 border-b border-dashed border-black/10 last:border-b-0">
                        <span className="font-mono-ui text-[9px] text-neutral-400">{s.label}</span>
                        <span className="font-heading text-sm">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Marquee */}
                <div className="border-t border-dashed border-black/15 py-2 overflow-hidden">
                  <div className="marquee-content whitespace-nowrap font-mono-ui text-[9px] uppercase tracking-widest text-neutral-500">
                    {[0, 1].map(i => (
                      <span key={i} className="flex">
                        {recentEditions.map((item, j) => (
                          <span key={`${i}-${j}`} className="contents">
                            <span className="px-5 flex items-center gap-2">
                              <span className="marquee-square" style={{ animationDelay: `${j * 0.5}s` }} />
                              {item.number}: {item.title}
                            </span>|
                          </span>
                        ))}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer stamp */}
          <div className="border-2 border-dashed border-black/25 p-1">
            <div className="border border-black/15 px-6 py-3 text-center">
              <span className="font-mono-ui text-[9px] uppercase tracking-[0.4em] text-neutral-400">★ End of Dispatch ★ Demand Curve Growth Division ★</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 44: Dark Wide — Dark version of V42
   ═══════════════════════════════════════════════════ */
function V44() {
  return (
    <div>
      <SectionLabel n={44} title="Dark Wide" />
      <div className="px-6 py-16 md:py-24">
        <div className="relative mx-auto max-w-5xl">
          <div className="flex h-1.5 mb-1">
            {["#fff","#ddd","#bbb","#999","#777","#555","#333","#222","#111","#222","#333","#555","#777","#999","#bbb","#ddd","#fff"].map((c,i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>

          <div className="relative border border-white/10 bg-[#0a0a0a] text-white overflow-hidden">
            {/* Scanlines */}
            <div className="absolute inset-0 pointer-events-none z-20" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 3px)" }} />
            {/* Grid */}
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            {/* Corner caps */}
            <div className="absolute -top-[2px] -left-[2px] w-6 h-6 border-t-[3px] border-l-[3px] border-white/25 z-10" />
            <div className="absolute -top-[2px] -right-[2px] w-6 h-6 border-t-[3px] border-r-[3px] border-white/25 z-10" />
            <div className="absolute -bottom-[2px] -left-[2px] w-6 h-6 border-b-[3px] border-l-[3px] border-white/25 z-10" />
            <div className="absolute -bottom-[2px] -right-[2px] w-6 h-6 border-b-[3px] border-r-[3px] border-white/25 z-10" />

            <div className="relative z-[5]">
              {/* Ornament */}
              <div className="flex items-center gap-2 px-6 pt-5 mb-3">
                <div className="flex-1 h-px bg-white/20" />
                <div className="w-1.5 h-1.5 border border-white/30 rotate-45" />
                <div className="w-1.5 h-1.5 bg-white/40 rotate-45" />
                <div className="w-1.5 h-1.5 border border-white/30 rotate-45" />
                <div className="flex-1 h-px bg-white/20" />
              </div>

              <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/10">
                {/* Left: subscribe */}
                <div className="md:w-[38%] shrink-0 p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-[10px] text-neutral-500">★</span>
                    <span className="font-mono-ui text-[8px] uppercase tracking-[0.3em] text-neutral-500">Est. 2020 · Free · Weekly</span>
                  </div>
                  <h2 className="font-heading text-4xl md:text-5xl tracking-tight leading-[0.9] mb-4">{sectionHeader.title}</h2>
                  <p className="text-sm text-neutral-400 font-light leading-relaxed mb-6">{sectionHeader.subtitle}</p>
                  <div className="space-y-3 mb-3">
                    <input type="email" placeholder="your@email.com" className="w-full border border-white/15 bg-white/[0.05] rounded-sm px-4 py-3 text-sm text-white focus:outline-none placeholder:text-neutral-500" />
                    <button className="w-full bg-white text-black py-3 rounded-sm hover:bg-neutral-200 transition-colors text-sm font-medium">Subscribe — Free</button>
                  </div>
                  <p className="text-[10px] text-neutral-500 mb-6">No spam. Unsubscribe anytime.</p>
                  <div className="border-t border-white/10 pt-4 grid grid-cols-2 gap-3">
                    {stats.slice(0, 2).map(s => (
                      <div key={s.label}>
                        <div className="font-heading text-2xl">{s.value}</div>
                        <div className="font-mono-ui text-[8px] text-neutral-500 uppercase tracking-widest">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right: rainbow rows */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 px-6 pt-6 pb-2">
                    <span className="font-mono-ui text-[9px] uppercase tracking-widest text-neutral-500">Recent Editions</span>
                    <span className="text-[8px] text-neutral-600">✦</span>
                    <div className="flex-1 border-t border-white/10" />
                  </div>
                  {recentEditions.map((item, i) => (
                    <a key={i} href="#" className="feed-row flex items-center border-b border-white/10 px-6 py-4 cursor-pointer" style={{ "--row-hue": `${(i * 55 + 200) % 360}` } as React.CSSProperties}>
                      <span className="font-mono-ui text-[10px] text-neutral-500 w-14 shrink-0">{item.number}</span>
                      <span className="flex-1 text-base font-medium leading-tight">{item.title}</span>
                      <span className="feed-type-badge inline-block rounded-sm px-2 py-0.5 text-[9px] font-mono-ui uppercase tracking-widest border border-white/15 bg-white/[0.05] transition-colors ml-4">{item.type}</span>
                    </a>
                  ))}
                  <div className="px-6 py-4">
                    <p className="text-xs font-light text-neutral-500 italic">&ldquo;{testimonials[0].quote}&rdquo;</p>
                    <div className="font-mono-ui text-[9px] text-neutral-600 mt-1">— {testimonials[0].author}</div>
                  </div>
                </div>
              </div>

              {/* Marquee */}
              <div className="border-t border-white/10 py-2 overflow-hidden">
                <div className="marquee-content whitespace-nowrap font-mono-ui text-[9px] uppercase tracking-widest text-neutral-600">
                  {[0, 1].map(i => (
                    <span key={i} className="flex">
                      <span className="px-6">★ From the frontier of growth ★</span>
                      <span className="px-6">100,000+ Operators</span>
                      <span className="px-6">Every Tuesday</span>
                      <span className="px-6">Free Forever</span>
                      <span className="px-6">★ Systems, not guesswork ★</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 px-6 pb-5 pt-2">
                <div className="flex-1 h-px bg-white/20" />
                <div className="w-1.5 h-1.5 border border-white/30 rotate-45" />
                <div className="w-1.5 h-1.5 bg-white/40 rotate-45" />
                <div className="w-1.5 h-1.5 border border-white/30 rotate-45" />
                <div className="flex-1 h-px bg-white/20" />
              </div>
            </div>
          </div>

          <div className="flex h-1.5 mt-1">
            {["#fff","#ddd","#bbb","#999","#777","#555","#333","#222","#111","#222","#333","#555","#777","#999","#bbb","#ddd","#fff"].map((c,i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   VARIATION 45: The Definitive — Best of everything,
   maximum polish, noise + ornaments + rainbow + marquee
   ═══════════════════════════════════════════════════ */
function V45() {
  return (
    <div>
      <SectionLabel n={45} title="The Definitive" />
      <div className="px-6 py-16 md:py-24">
        <div className="relative mx-auto max-w-4xl">
          {/* Crop marks */}
          {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h]) => (
            <div key={`${v}${h}`} className={`absolute -${v}-5 -${h}-5 w-8 h-8`}>
              <div className={`absolute ${v}-0 ${h === "left" ? "left-3.5" : "right-3.5"} w-px h-5 bg-black/30`} />
              <div className={`absolute ${v === "top" ? "top-3.5" : "bottom-3.5"} ${h}-0 w-5 h-px bg-black/30`} />
              <div className={`absolute ${v === "top" ? "top-2.5" : "bottom-2.5"} ${h === "left" ? "left-2.5" : "right-2.5"} w-2.5 h-2.5 rounded-full border border-black/25`} />
            </div>
          ))}

          <div className="flex h-1.5 mb-1">
            {["#000","#222","#444","#666","#888","#aaa","#ccc","#ddd","#eee","#ddd","#ccc","#aaa","#888","#666","#444","#222","#000"].map((c,i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>
          <div className="flex items-center justify-between mb-1 px-1">
            <span className="font-mono-ui text-[7px] text-neutral-400 uppercase tracking-widest">Sheet 1/1 · Final proof</span>
            <span className="font-mono-ui text-[7px] text-neutral-400 uppercase tracking-widest">Demand Curve — The Growth Newsletter</span>
            <span className="font-mono-ui text-[7px] text-neutral-400 uppercase tracking-widest">Bleed: 3mm</span>
          </div>

          <div className="relative border border-black/15 overflow-hidden">
            {/* Grid bg */}
            <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
            {/* Noise */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: "512px 512px", opacity: 0.05, mixBlendMode: "multiply",
            }} />
            {/* Corner caps */}
            <div className="absolute -top-[2px] -left-[2px] w-6 h-6 border-t-[3px] border-l-[3px] border-black z-10" />
            <div className="absolute -top-[2px] -right-[2px] w-6 h-6 border-t-[3px] border-r-[3px] border-black z-10" />
            <div className="absolute -bottom-[2px] -left-[2px] w-6 h-6 border-b-[3px] border-l-[3px] border-black z-10" />
            <div className="absolute -bottom-[2px] -right-[2px] w-6 h-6 border-b-[3px] border-r-[3px] border-black z-10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 border-t-2 border-black z-10" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 border-b-2 border-black z-10" />
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 border-l-2 border-black z-10" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 border-r-2 border-black z-10" />

            <div className="relative z-[5] bg-[#f9f9f8]/90">
              {/* Ornamental top */}
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
                <h2 className="font-heading text-5xl md:text-7xl tracking-tight mb-4">{sectionHeader.title}</h2>
                <p className="text-neutral-500 font-light text-sm max-w-xl mx-auto">{sectionHeader.subtitle}</p>
              </div>

              {/* Double rule */}
              <div className="mx-6 border-t-2 border-b border-black/80 py-0.5 mb-0">
                <div className="border-b border-black/30" />
              </div>

              {/* Marquee */}
              <div className="border-b border-black/10 py-2 overflow-hidden">
                <div className="marquee-content whitespace-nowrap font-mono-ui text-[9px] uppercase tracking-widest text-neutral-500">
                  {[0, 1].map(i => (
                    <span key={i} className="flex">
                      {recentEditions.map((item, j) => (
                        <span key={`${i}-${j}`} className="contents">
                          <span className="px-5 flex items-center gap-2">
                            <span className="marquee-square" style={{ animationDelay: `${j * 0.5}s` }} />
                            Edition {item.number} — {item.title}
                          </span>|
                        </span>
                      ))}
                    </span>
                  ))}
                </div>
              </div>

              {/* Three-column: lead, editions, subscribe */}
              <div className="grid md:grid-cols-6 divide-x divide-black/10">
                {/* Lead article — 3 cols */}
                <div className="md:col-span-3 p-6">
                  <div className="section-tag mb-3" style={{ display: "inline-flex" }}>Most Recent Edition</div>
                  <h3 className="font-heading text-2xl md:text-3xl tracking-tight mb-3">{recentEditions[0].title}</h3>
                  <p className="text-sm text-neutral-600 font-light leading-relaxed mb-4">Growth experiments should be your most powerful tool. But most teams run them wrong — optimizing for velocity over learning.</p>
                  <a href="#" className="text-xs font-medium flex items-center gap-1 hover:text-neutral-600 transition-colors">Read this edition <ArrowRight className="w-3 h-3" /></a>
                </div>

                {/* More editions — 1.5 cols */}
                <div className="md:col-span-2 p-5">
                  <div className="font-mono-ui text-[9px] uppercase tracking-widest text-neutral-400 mb-3">Also This Week</div>
                  {recentEditions.slice(1).map((item, i) => (
                    <a key={i} href="#" className="feed-row block border-b border-black/10 last:border-b-0 py-3 cursor-pointer" style={{ "--row-hue": `${(i * 55 + 15) % 360}` } as React.CSSProperties}>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-mono-ui text-[9px] text-neutral-400">{item.number}</span>
                        <span className="feed-type-badge inline-block rounded-sm px-1.5 py-0.5 text-[8px] font-mono-ui uppercase tracking-widest border border-black/10 bg-white transition-colors">{item.type}</span>
                      </div>
                      <div className="text-sm font-medium leading-snug">{item.title}</div>
                    </a>
                  ))}
                </div>

                {/* Subscribe — 1.5 cols */}
                <div className="md:col-span-1 p-5 flex flex-col">
                  <div className="font-mono-ui text-[9px] uppercase tracking-widest text-neutral-400 mb-3">Subscribe</div>
                  <p className="text-xs text-neutral-500 font-light leading-relaxed mb-4">Every Tuesday. Free forever.</p>
                  <div className="space-y-2">
                    <input type="email" placeholder="Email" className="w-full border border-black/15 px-3 py-2 text-xs bg-white focus:outline-none placeholder:text-neutral-400" />
                    <button className="w-full bg-black text-white py-2 text-xs font-medium hover:bg-neutral-800 transition-colors">Go</button>
                  </div>
                  <div className="mt-auto pt-4 border-t border-black/10 space-y-1.5">
                    {stats.slice(0, 3).map(s => (
                      <div key={s.label} className="flex justify-between">
                        <span className="font-mono-ui text-[8px] text-neutral-400 uppercase">{s.label}</span>
                        <span className="font-heading text-xs">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Testimonial bar */}
              <div className="border-t border-black/10 px-6 py-4 flex items-center gap-4">
                <span className="text-[9px] text-neutral-400">✦</span>
                <p className="text-xs font-light text-neutral-500 italic flex-1">&ldquo;{testimonials[0].quote}&rdquo; — {testimonials[0].author}, {testimonials[0].company}</p>
                <span className="text-[9px] text-neutral-400">✦</span>
              </div>

              {/* Bottom ornament */}
              <div className="flex items-center gap-2 px-6 pb-5">
                <div className="flex-1 h-px bg-black/80" />
                <div className="w-1.5 h-1.5 border border-black rotate-45" />
                <div className="w-1.5 h-1.5 bg-black rotate-45" />
                <div className="w-1.5 h-1.5 border border-black rotate-45" />
                <div className="flex-1 h-px bg-black/80" />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-1 px-1">
            <span className="font-mono-ui text-[7px] text-neutral-400 uppercase tracking-widest">Trim line</span>
            <span className="font-mono-ui text-[7px] text-neutral-400 uppercase tracking-widest">© Demand Curve 2026</span>
            <span className="font-mono-ui text-[7px] text-neutral-400 uppercase tracking-widest">Bleed: 3mm</span>
          </div>
          <div className="flex h-1.5 mt-1">
            {["#000","#222","#444","#666","#888","#aaa","#ccc","#ddd","#eee","#ddd","#ccc","#aaa","#888","#666","#444","#222","#000"].map((c,i) => (
              <div key={i} className="flex-1" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE EXPORT
   ═══════════════════════════════════════════════════ */
export default function NewsletterExplorePage() {
  return (
    <div className="min-h-screen bg-[#f9f9f8] text-black" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}>
      {/* Header */}
      <div className="border-b border-black/10 px-6 py-8">
        <a href="/v2/explore" className="font-mono-ui text-xs text-neutral-400 hover:text-black transition-colors flex items-center gap-2 mb-4">
          <ArrowRight className="w-3 h-3 rotate-180" /> Back to explore
        </a>
        <h1 className="font-heading text-3xl tracking-tight">Newsletter Section</h1>
        <p className="font-mono-ui text-xs text-neutral-400 mt-2">45 variations — 1–20 general, 21–31 newspaper, 32–45 best-of mashups</p>
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
      <div className="h-px bg-black/20" />

      {/* Newspaper iterations banner */}
      <div className="border-t-2 border-b border-black/20 px-6 py-6 bg-neutral-50">
        <div className="flex items-center gap-3">
          <span className="font-heading text-2xl">21–31</span>
          <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">Newspaper / Broadsheet Iterations</span>
        </div>
      </div>

      <V21 />
      <div className="h-px bg-black/20" />
      <V22 />
      <div className="h-px bg-black/20" />
      <V23 />
      <div className="h-px bg-black/20" />
      <V24 />
      <div className="h-px bg-black/20" />
      <V25 />
      <div className="h-px bg-black/20" />
      <V26 />
      <div className="h-px bg-black/20" />
      <V27 />
      <div className="h-px bg-black/20" />
      <V28 />
      <div className="h-px bg-black/20" />
      <V29 />
      <div className="h-px bg-black/20" />
      <V30 />
      <div className="h-px bg-black/20" />
      <V31 />
      <div className="h-px bg-black/20" />

      {/* Best-of mashups banner */}
      <div className="border-t-2 border-b border-black/20 px-6 py-6 bg-neutral-50">
        <div className="flex items-center gap-3">
          <span className="font-heading text-2xl">32–38</span>
          <span className="font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">Best-Of Mashups — Your Favorites Combined</span>
        </div>
      </div>

      <V32 />
      <div className="h-px bg-black/20" />
      <V33 />
      <div className="h-px bg-black/20" />
      <V34 />
      <div className="h-px bg-black/20" />
      <V35 />
      <div className="h-px bg-black/20" />
      <V36 />
      <div className="h-px bg-black/20" />
      <V37 />
      <div className="h-px bg-black/20" />
      <V38 />
      <div className="h-px bg-black/20" />
      <V39 />
      <div className="h-px bg-black/20" />
      <V40 />
      <div className="h-px bg-black/20" />
      <V41 />
      <div className="h-px bg-black/20" />
      <V42 />
      <div className="h-px bg-black/20" />
      <V43 />
      <div className="h-px bg-black/20" />
      <V44 />
      <div className="h-px bg-black/20" />
      <V45 />

      {/* Footer */}
      <div className="border-t border-black/10 px-6 py-12 text-center">
        <p className="font-mono-ui text-xs text-neutral-400 uppercase tracking-widest">End of Newsletter variations</p>
        <a href="/v2" className="mt-4 inline-flex items-center gap-2 text-sm font-medium hover:text-neutral-600 transition-colors">
          <ArrowRight className="w-3 h-3 rotate-180" /> Back to main site
        </a>
      </div>
    </div>
  );
}
