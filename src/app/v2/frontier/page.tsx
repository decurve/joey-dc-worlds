"use client";

import { useState } from "react";
import StarField from "./StarField";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Users,
  Star,
  Shield,
  Zap,
  FileText,
  Target,
  Layers,
  MessageSquare,
  BarChart3,
  Mail,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Lock,
  Globe,
  Briefcase,
  Award,
  CheckCircle2,
  Play,
  Megaphone,
  PenTool,
  Eye,
  TrendingUp,
  Gift,
  LayoutGrid,
  Bookmark,
  Library,
  ScanSearch,
  Ticket,
  Handshake,
  Bell,
  Menu,
} from "lucide-react";
import V2Nav from "../V2Nav";

/* ─── Types ─── */

type ViewId =
  | "dashboard"
  | "playbooks"
  | "newsletters"
  | "community"
  | "claude-skills"
  | "sop-library"
  | "teardowns"
  | "ad-examples"
  | "deals"
  | "services"
  | "saved";

/* ─── Data ─── */

const featuredResources = [
  { tag: "Skill", color: "bg-white/[0.08] text-white border-white/[0.15]", title: "Story Systems", desc: "Build your brand's master messaging hub — positioning, value props, and copy hooks.", icon: MessageSquare },
  { tag: "Skill", color: "bg-white/[0.08] text-white border-white/[0.15]", title: "Growth Strategy", desc: "Your master growth playbook — channels, funnels, unit economics, and compounding motions.", icon: BarChart3 },
  { tag: "SOP", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", title: "Cold Outreach", desc: "The exact process to book 50+ qualified calls per month.", icon: Mail },
  { tag: "Playbook", color: "bg-violet-500/10 text-violet-400 border-violet-500/20", title: "Above the Fold", desc: "The most important real estate on your page — the 5-component framework.", icon: Eye },
  { tag: "Newsletter", color: "bg-teal-500/10 text-teal-400 border-teal-500/20", title: "Welcome to the Frontier", desc: "#314 — New era of tactical + strategic growth intelligence.", icon: Mail },
];

const claudeSkills = [
  { name: "Story Systems", desc: "Positioning, archetypes, voice, personas, value props, hooks, CTAs" },
  { name: "Growth Strategy", desc: "Foundational Five, fit mechanics, catalysts, guardrails, motions" },
  { name: "Content & SEO", desc: "Content strategy, search optimization, editorial systems" },
  { name: "Paid Ads", desc: "Campaign strategy, copy, targeting, budget optimization" },
  { name: "CRO & Funnels", desc: "Conversion optimization, funnel design, page performance" },
  { name: "Email & Lifecycle", desc: "Email sequences, drip campaigns, retention programs" },
];

const sopTemplates = [
  { name: "Cold Outreach", desc: "Book 50+ qualified calls/month" },
  { name: "Content Production", desc: "Scale without chaos" },
  { name: "Ad Creative Pipeline", desc: "Weekly winning creatives" },
  { name: "Launch Checklist", desc: "47-point pre-launch checklist" },
  { name: "Onboarding Flows", desc: "Turn signups into active users" },
];

const teardownCategories = [
  { name: "Landing Pages", active: true },
  { name: "UX Breakdowns", active: false },
  { name: "Copywriting", active: false },
  { name: "Psychology & Persuasion", active: false },
  { name: "Email & Funnels", active: false },
];

const adCategories = [
  { name: "Meta Ads", active: true },
  { name: "Google Ads", active: false },
  { name: "LinkedIn Ads", active: false },
  { name: "YouTube Ads", active: false },
  { name: "Display & Native", active: false },
];

const playbooks = [
  { title: "Above the Fold", desc: "5-component framework for your most important page section", topic: "CRO" },
  { title: "Marketing Psychology", desc: "Behavioral patterns applied to growth and conversion", topic: "Strategy" },
  { title: "Content-Led SEO", desc: "Modern SEO without relying on backlinks or keyword stuffing", topic: "Content" },
  { title: "LinkedIn Organic", desc: "Audience building and customer acquisition on LinkedIn", topic: "Social" },
  { title: "Personalization Tactics", desc: "Data-driven personalization strategies", topic: "CRO" },
  { title: "Influencer Marketing", desc: "Leveraging creator recommendations for growth", topic: "Channel" },
  { title: "12 Great Copywriting Examples", desc: "Real-world copy with breakdowns", topic: "Copy" },
];

const newsletters = [
  { title: "Welcome to the Frontier", number: "#314", date: "Feb 19, 2026", topic: "Growth Strategy" },
  { title: "How to identify your highest-impact growth opportunities", number: "#313", date: "Feb 12, 2026", topic: "Strategy" },
  { title: "How to win on Reddit in 2026", number: "#312", date: "Feb 5, 2026", topic: "Content" },
  { title: "How two words generated millions in new revenue", number: "#311", date: "Jan 29, 2026", topic: "CRO" },
  { title: "Your Growth Experiments Are Lying to You", number: "#310", date: "Jan 22, 2026", topic: "Strategy" },
  { title: "Do your ads look the way you think they do?", number: "#309", date: "Jan 15, 2026", topic: "Ads" },
  { title: "Is your checkout bleeding revenue?", number: "#308", date: "Jan 8, 2026", topic: "CRO" },
  { title: "When does a growth advantage turn into a flywheel?", number: "#307", date: "Jan 1, 2026", topic: "Strategy" },
];

const teardowns = ["Zapier", "Segment", "Adaface", "Customer.io", "Ahrefs", "ClickUp"];

const adBrands = ["Squarespace", "RxBar", "KitKat", "Porsche", "Liquid Death", "Surreal", "Oatly", "Harry's", "Shopify", "Spotify", "Duolingo", "Robinhood"];

const deals = [
  { name: "$50k AWS Credits", category: "Cloud" },
  { name: "6 Months Notion Plus", category: "Tools" },
  { name: "3 Months Figma Pro", category: "Design" },
  { name: "Beehiiv Discount", category: "Newsletter" },
  { name: "Ahrefs Discount", category: "SEO" },
  { name: "Heatmaps Discount", category: "Analytics" },
];

const audits = [
  { name: "Positioning Audit", desc: "Messaging, value props, brand story review + 30-min call", skill: "Story Systems" },
  { name: "Growth Strategy Audit", desc: "Channels, funnel, unit economics deep-dive + roadmap", skill: "Growth Strategy" },
  { name: "Funnel Audit", desc: "Page-by-page conversion analysis of your site", skill: "CRO & Funnels" },
  { name: "Paid Media Audit", desc: "Ad account, campaigns, creative efficiency review", skill: "Paid Ads" },
  { name: "AEO Search Audit", desc: "AI search visibility across ChatGPT, Perplexity, Gemini", skill: "AI Search" },
];

/* ─── Sidebar Dropdown ─── */

function SidebarDropdown({
  icon: Icon,
  label,
  items,
  onItemClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  items: { name: string; active?: boolean; onClick?: () => void }[];
  onItemClick?: (name: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/[0.05] transition-colors text-neutral-400"
      >
        <div className="flex items-center gap-3">
          <Icon className="w-[18px] h-[18px]" />
          <span className="text-sm">{label}</span>
        </div>
        <ChevronDown className={`w-4 h-4 opacity-40 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="ml-10 mt-1 space-y-0.5">
          {items.map((item) => (
            <button
              key={item.name}
              onClick={() => item.active !== false && onItemClick?.(item.name)}
              className={`block w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors ${
                item.active === false
                  ? "text-neutral-600 cursor-default"
                  : "text-neutral-400 hover:text-white hover:bg-white/[0.05] rainbow-hover-dark"
              }`}
            >
              {item.name}
              {item.active === false && (
                <span className="ml-2 text-[10px] text-neutral-600">Soon</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Dark aurora background style ─── */

const darkAuroraBg = {
  backgroundColor: '#0a0a0b',
  backgroundImage: [
    'radial-gradient(ellipse at 85% 5%, rgba(38, 74, 255, 0.28) 0%, transparent 50%)',
    'radial-gradient(ellipse at 65% 20%, rgba(38, 74, 255, 0.12) 0%, transparent 40%)',
    'radial-gradient(ellipse at 15% 60%, rgba(80, 40, 160, 0.10) 0%, transparent 50%)',
    'radial-gradient(ellipse at 30% 85%, rgba(38, 74, 255, 0.08) 0%, transparent 40%)',
    'radial-gradient(ellipse at 50% 40%, rgba(20, 40, 120, 0.10) 0%, transparent 60%)',
  ].join(', '),
  backgroundAttachment: 'fixed' as const,
};

/* ─── Main Component ─── */

export default function FrontierPage() {
  const [activeView, setActiveView] = useState<ViewId>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItem = (
    view: ViewId,
    icon: React.ComponentType<{ className?: string }>,
    label: string,
    badge?: string
  ) => {
    const Icon = icon;
    const isActive = activeView === view;
    return (
      <button
        key={view}
        onClick={() => { setActiveView(view); setSidebarOpen(false); }}
        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors w-full text-left ${
          isActive
            ? "bg-white/[0.08] text-white font-medium"
            : "text-neutral-400 hover:bg-white/[0.05] hover:text-neutral-200 rainbow-hover-dark"
        }`}
      >
        <Icon className="w-[18px] h-[18px]" />
        <span className="text-sm">{label}</span>
        {badge && (
          <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-white/[0.1] text-white font-medium">
            {badge}
          </span>
        )}
      </button>
    );
  };

  /* Card style helper — transparent, defined by borders only */
  const card = "border border-white/[0.08] rounded-xl hover:border-white/[0.15] transition-all";
  const cardStatic = "border border-white/[0.08] rounded-xl";

  return (
    <div
      className="flex flex-col h-screen overflow-hidden text-white relative"
      style={{
        fontFamily: "'IBM Plex Mono', ui-monospace, monospace",
        backgroundColor: '#0a0a0b',
        backgroundImage: [
          'radial-gradient(ellipse at 74% 2%, rgba(38, 74, 255, 0.40) 0%, transparent 28%)',
          'radial-gradient(ellipse at 94% 12%, rgba(60, 200, 100, 0.28) 0%, transparent 24%)',
          'radial-gradient(ellipse at 84% 7%, rgba(20, 160, 210, 0.22) 0%, transparent 20%)',
        ].join(', '),
      }}
    >
      <StarField />
      <V2Nav currentPage="THE FRONTIER" variant="dark" />

      <div className="relative z-10 flex flex-1 overflow-hidden" style={{ backgroundColor: '#0a0a0b' }}>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-72 border-r border-white/[0.08] flex flex-col h-full shrink-0 transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="pt-14 px-6 pb-6 flex items-center gap-3">
          <a href="/v2" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-black" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white">DEMAND CURVE</span>
          </a>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-4 space-y-8 py-2">
          {/* Main */}
          <div className="space-y-1">
            {navItem("dashboard", LayoutGrid, "Dashboard")}
            {navItem("saved", Bookmark, "Saved")}
            {navItem("playbooks", BookOpen, "The Playbooks")}
            {navItem("newsletters", Library, "Newsletter Archives")}
            {navItem("community", Users, "Community", "Soon")}
          </div>

          {/* Resources */}
          <div>
            <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-2">
              Resources
            </h3>
            <div className="space-y-1">
              <SidebarDropdown
                icon={Bot}
                label="Claude Skills"
                items={[
                  { name: "View All" },
                  ...claudeSkills.map((s) => ({ name: s.name })),
                ]}
                onItemClick={() => setActiveView("claude-skills")}
              />
              <SidebarDropdown
                icon={FileText}
                label="SOP Templates"
                items={[
                  { name: "View All" },
                  ...sopTemplates.map((s) => ({ name: s.name })),
                ]}
                onItemClick={() => setActiveView("sop-library")}
              />
              <SidebarDropdown
                icon={ScanSearch}
                label="Teardowns"
                items={teardownCategories}
                onItemClick={() => setActiveView("teardowns")}
              />
              <SidebarDropdown
                icon={Megaphone}
                label="Ad Examples"
                items={adCategories}
                onItemClick={() => setActiveView("ad-examples")}
              />
            </div>
          </div>

          {/* Member Perks */}
          <div>
            <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-2">
              Member Perks
            </h3>
            <div className="space-y-1">
              {navItem("deals", Ticket, "Partner Deals")}
              {navItem("services", Handshake, "Services")}
            </div>
          </div>
        </nav>

        {/* Services callout */}
        <div className="px-5 py-4 border-t border-white/[0.08]">
          <button
            onClick={() => setActiveView("services")}
            className="w-full border border-white/[0.08] rounded-xl p-4 text-left hover:border-white/[0.2] transition-all group"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">Need hands-on help?</span>
            </div>
            <p className="text-xs text-neutral-500 mb-3">Our growth experts work 1:1 with you.</p>
            <span className="text-xs font-medium text-white inline-flex items-center gap-1 rainbow-hover-dark transition-colors">
              Explore Services <ArrowRight className="w-3 h-3" />
            </span>
          </button>
        </div>

        {/* User */}
        <div className="p-4 border-t border-white/[0.08]">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/[0.05] transition-colors cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neutral-400 to-neutral-600" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Ezzie Cat</p>
              <p className="text-xs text-neutral-500 truncate">Premium Member</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-white/[0.08] flex items-center justify-between px-6 shrink-0">
          {/* Mobile menu */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 text-neutral-400 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1" />
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-[1400px] mx-auto">
            {/* Breadcrumb */}
            <div className="text-xs text-neutral-500 mb-6 flex items-center gap-2">
              <button onClick={() => setActiveView("dashboard")} className="rainbow-hover-dark transition-colors">
                Dashboard
              </button>
              {activeView !== "dashboard" && (
                <>
                  <span>&rsaquo;</span>
                  <span className="text-neutral-300 capitalize">
                    {activeView.replace(/-/g, " ")}
                  </span>
                </>
              )}
            </div>

            {/* ===== DASHBOARD VIEW ===== */}
            {activeView === "dashboard" && (
              <div>
                {/* Hero */}
                <div className="py-12 md:py-20 mb-10 border-b border-white/[0.08]">
                  <div className="text-xs tracking-widest uppercase text-white mb-6">
                    GROWTH NEWSLETTER
                  </div>
                  <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-white mb-6">
                    Welcome to the<br />Growth Frontier
                  </h1>
                  <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mb-8">
                    We share the top strategies and tactics used by fast-growing startups.
                  </p>
                  <div className="flex flex-wrap gap-6 text-xs tracking-wide text-neutral-500 mb-10">
                    <span className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-white" /> TACTICS AND STRATEGIES</span>
                    <span className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-white" /> FOR FREE</span>
                    <span className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-white" /> JOIN 100,000+ STARTUPS</span>
                  </div>
                  <div className="flex items-center gap-3 max-w-lg">
                    <input
                      type="email"
                      placeholder="email@demandcurve.com"
                      className="flex-1 bg-white/[0.05] border border-white/[0.1] rounded-lg px-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/25 transition-colors"
                    />
                    <button className="bg-white text-black px-6 py-3.5 rounded-lg text-sm font-semibold hover:bg-neutral-200 transition-colors shrink-0">
                      Subscribe
                    </button>
                  </div>
                  <p className="text-neutral-600 text-xs mt-4">
                    You&apos;ll receive your first issue in a few minutes. Unsubscribe anytime.
                  </p>
                </div>

                {/* Trusted By */}
                <div className="mb-12 text-center">
                  <div className="text-[10px] tracking-widest uppercase text-neutral-600 mb-4">
                    TRUSTED BY MARKETERS AT
                  </div>
                  <div className="flex flex-wrap justify-center gap-6 text-neutral-500 font-medium text-sm">
                    {["Shopify", "Stripe", "Webflow", "Loom", "Mercury", "Deel", "Notion", "Vercel"].map((co) => (
                      <span key={co}>{co}</span>
                    ))}
                  </div>
                </div>

                {/* Featured Resources */}
                <div className="mb-12">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-semibold text-lg text-white">Featured Resources</h2>
                    <span className="text-xs text-neutral-500">5 ITEMS</span>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {featuredResources.map((r) => (
                      <div
                        key={r.title}
                        className={`group ${card} p-5 cursor-pointer`}
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-9 h-9 rounded-lg bg-white/[0.05] flex items-center justify-center">
                            <r.icon className="w-4 h-4 text-neutral-400" />
                          </div>
                          <span className={`text-[10px] tracking-widest px-2 py-0.5 rounded border ${r.color}`}>
                            {r.tag}
                          </span>
                        </div>
                        <h3 className="font-semibold text-sm mb-1.5 text-white rainbow-hover-dark group-hover:text-white transition-colors">
                          {r.title}
                        </h3>
                        <p className="text-xs text-neutral-500 leading-relaxed">{r.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Learning Paths */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="font-semibold text-lg text-white">Learning Paths</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className={`${cardStatic} p-5`}>
                      <div className="text-[10px] tracking-widest text-white mb-2">PATH 1</div>
                      <h3 className="font-semibold text-sm mb-1 text-white">Story Systems Path</h3>
                      <p className="text-xs text-neutral-500">Messaging foundation &rarr; Launch. Build your complete brand story system.</p>
                    </div>
                    <div className={`${cardStatic} p-5`}>
                      <div className="text-[10px] tracking-widest text-emerald-400 mb-2">PATH 2</div>
                      <h3 className="font-semibold text-sm mb-1 text-white">Cold Outreach Mastery</h3>
                      <p className="text-xs text-neutral-500">Email templates &rarr; Sales execution. Book 50+ calls per month.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ===== PLAYBOOKS VIEW ===== */}
            {activeView === "playbooks" && (
              <div>
                <h1 className="text-3xl tracking-tight mb-2 text-white">The Playbooks</h1>
                <p className="text-neutral-400 mb-8">In-depth guides and frameworks you can apply today.</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {playbooks.map((pb) => (
                    <div key={pb.title} className={`group ${card} p-5 cursor-pointer`}>
                      <span className="text-[10px] tracking-widest px-2 py-0.5 rounded border bg-violet-500/10 text-violet-400 border-violet-500/20 mb-3 inline-block">
                        {pb.topic}
                      </span>
                      <h3 className="font-semibold text-sm mb-1.5 text-white rainbow-hover-dark">{pb.title}</h3>
                      <p className="text-xs text-neutral-500 leading-relaxed">{pb.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== NEWSLETTERS VIEW ===== */}
            {activeView === "newsletters" && (
              <div>
                <h1 className="text-3xl tracking-tight mb-2 text-white">Newsletter Archives</h1>
                <p className="text-neutral-400 mb-8">Every edition of the Demand Curve newsletter.</p>
                <div className="space-y-2">
                  {newsletters.map((nl) => (
                    <div key={nl.number} className={`group flex items-center gap-4 p-4 ${card} cursor-pointer`}>
                      <div className="w-10 h-10 shrink-0 rounded-lg bg-teal-500/10 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-teal-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-white rainbow-hover-dark">{nl.title}</div>
                        <div className="text-xs text-neutral-500">{nl.number} &middot; {nl.date} &middot; {nl.topic}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== CLAUDE SKILLS VIEW ===== */}
            {activeView === "claude-skills" && (
              <div>
                <h1 className="text-3xl tracking-tight mb-2 text-white">Claude Skills</h1>
                <p className="text-neutral-400 mb-8">AI-powered growth systems — use with Claude, ChatGPT, or any LLM.</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {claudeSkills.map((skill) => (
                    <div key={skill.name} className={`group ${card} p-5 cursor-pointer`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-white/[0.08] flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-[10px] tracking-widest px-2 py-0.5 rounded border bg-white/[0.08] text-white border-white/[0.15]">
                          SKILL
                        </span>
                      </div>
                      <h3 className="font-semibold text-sm mb-1.5 text-white rainbow-hover-dark">{skill.name}</h3>
                      <p className="text-xs text-neutral-500 leading-relaxed">{skill.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== SOP LIBRARY VIEW ===== */}
            {activeView === "sop-library" && (
              <div>
                <h1 className="text-3xl tracking-tight mb-2 text-white">SOP Templates</h1>
                <p className="text-neutral-400 mb-8">Copy, customize, and execute. Standard operating procedures for growth teams.</p>
                <div className="space-y-2">
                  {sopTemplates.map((sop) => (
                    <div key={sop.name} className={`group flex items-center gap-4 p-4 ${card} cursor-pointer`}>
                      <div className="w-10 h-10 shrink-0 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-white rainbow-hover-dark">{sop.name}</div>
                        <div className="text-xs text-neutral-500">{sop.desc}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== TEARDOWNS VIEW ===== */}
            {activeView === "teardowns" && (
              <div>
                <h1 className="text-3xl tracking-tight mb-2 text-white">Teardowns</h1>
                <p className="text-neutral-400 mb-8">Landing page psychology and UX breakdowns from real companies.</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {teardowns.map((name) => (
                    <div key={name} className={`group ${card} p-5 cursor-pointer`}>
                      <div className="w-full h-32 rounded-lg bg-white/[0.03] mb-4 flex items-center justify-center">
                        <ScanSearch className="w-8 h-8 text-neutral-600" />
                      </div>
                      <h3 className="font-semibold text-sm mb-1 text-white rainbow-hover-dark">{name}</h3>
                      <p className="text-xs text-neutral-500">Landing page teardown &middot; Psychology & conversion</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== AD EXAMPLES VIEW ===== */}
            {activeView === "ad-examples" && (
              <div>
                <h1 className="text-3xl tracking-tight mb-2 text-white">Ad Examples</h1>
                <p className="text-neutral-400 mb-8">Real ads from top brands — Meta, Google, LinkedIn, and more.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {adBrands.map((brand) => (
                    <div key={brand} className={`group ${card} overflow-hidden cursor-pointer`}>
                      <div className="w-full aspect-square bg-white/[0.03] flex items-center justify-center">
                        <Megaphone className="w-8 h-8 text-neutral-600" />
                      </div>
                      <div className="p-3">
                        <h3 className="font-semibold text-xs text-white rainbow-hover-dark">{brand}</h3>
                        <p className="text-[10px] text-neutral-500">Meta Ad</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== DEALS VIEW ===== */}
            {activeView === "deals" && (
              <div>
                <h1 className="text-3xl tracking-tight mb-2 text-white">Partner Deals & Perks</h1>
                <p className="text-neutral-400 mb-8">$840+ in exclusive savings for Frontier members.</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {deals.map((deal) => (
                    <div key={deal.name} className={`${card} p-5 cursor-pointer`}>
                      <Gift className="w-6 h-6 text-neutral-500 mb-3" />
                      <h3 className="font-semibold text-sm mb-1 text-white rainbow-hover-dark">{deal.name}</h3>
                      <span className="text-[10px] tracking-widest text-neutral-500">{deal.category.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== SERVICES VIEW ===== */}
            {activeView === "services" && (
              <div>
                <h1 className="text-3xl tracking-tight mb-2 text-white">Services & Audits</h1>
                <p className="text-neutral-400 mb-8">Senior growth operators working 1:1 with your team. 20% off for Frontier members.</p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                  {[
                    { value: "10+", label: "Years experience minimum" },
                    { value: "$3B+", label: "Revenue generated" },
                    { value: "28 days", label: "Avg time to results" },
                    { value: "$450M+", label: "Media spend managed" },
                  ].map((stat) => (
                    <div key={stat.label} className={`${cardStatic} p-4 text-center`}>
                      <div className="text-2xl font-semibold mb-1 text-white">{stat.value}</div>
                      <div className="text-xs text-neutral-500">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Audits */}
                <h2 className="font-semibold text-lg mb-4 text-white">Expert Audits</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                  {audits.map((audit) => (
                    <div key={audit.name} className={`${card} p-5`}>
                      <h3 className="font-semibold text-sm mb-2 text-white rainbow-hover-dark">{audit.name}</h3>
                      <p className="text-xs text-neutral-400 leading-relaxed mb-3">{audit.desc}</p>
                      <div className="text-[10px] tracking-widest text-neutral-600">
                        PAIRS WITH: {audit.skill.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Done-with-you */}
                <h2 className="font-semibold text-lg mb-4 text-white">Done-With-You Services</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { name: "Paid Acquisition", desc: "Strategy, leadership, execution for Meta, Google, TikTok, LinkedIn." },
                    { name: "Creative Services", desc: "Ad creative strategy, production, and iteration — ads that convert." },
                    { name: "AEO Agency", desc: "Full-service AI search ranking — ChatGPT, Perplexity, Gemini." },
                  ].map((svc) => (
                    <div key={svc.name} className={`${card} p-5`}>
                      <h3 className="font-semibold text-sm mb-2 text-white rainbow-hover-dark">{svc.name}</h3>
                      <p className="text-xs text-neutral-400 leading-relaxed">{svc.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== COMMUNITY VIEW ===== */}
            {activeView === "community" && (
              <div>
                <h1 className="text-3xl tracking-tight mb-2 text-white">Community</h1>
                <p className="text-neutral-400 mb-8">Growth operators, founders, and marketers sharing real playbooks and honest feedback.</p>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { icon: Play, title: "Weekly AMAs", desc: "Live sessions with growth leaders from top startups." },
                    { icon: MessageSquare, title: "Peer Feedback", desc: "Get eyes on your landing page, ad copy, or growth strategy." },
                    { icon: Briefcase, title: "Job Board", desc: "Exclusive roles from community companies." },
                    { icon: Lock, title: "Early Access", desc: "First access to new tools, features, and research." },
                  ].map((item) => (
                    <div key={item.title} className={`${cardStatic} p-5`}>
                      <item.icon className="w-5 h-5 text-neutral-500 mb-3" />
                      <h3 className="font-semibold text-sm mb-1 text-white">{item.title}</h3>
                      <p className="text-xs text-neutral-500 leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-6 border border-white/[0.08] rounded-xl text-center">
                  <p className="text-sm text-white font-medium">Community features coming soon.</p>
                </div>
              </div>
            )}

            {/* ===== SAVED VIEW ===== */}
            {activeView === "saved" && (
              <div>
                <h1 className="text-3xl tracking-tight mb-2 text-white">Saved Resources</h1>
                <p className="text-neutral-400 mb-8">Your bookmarked content.</p>
                <div className={`${cardStatic} p-12 text-center`}>
                  <Bookmark className="w-8 h-8 text-neutral-600 mx-auto mb-3" />
                  <p className="text-sm text-neutral-500">No saved resources yet. Click the bookmark icon on any resource to save it here.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}
