"use client";

import { useState, useEffect, useCallback } from "react";
import StarField from "./StarField";
import {
  ArrowRight,
  BookOpen,
  Bot,
  Users,
  FileText,
  MessageSquare,
  BarChart3,
  Mail,
  Sparkles,
  ChevronRight,
  ChevronDown,
  Lock,
  Briefcase,
  Play,
  Megaphone,
  Eye,
  Gift,
  LayoutGrid,
  Bookmark,
  BookmarkCheck,
  Library,
  ScanSearch,
  Ticket,
  Handshake,
  Menu,
  Settings,
} from "lucide-react";

/* ─── Skeleton Component ─── */

function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-white/[0.06] rounded-lg animate-pulse ${className}`}
    />
  );
}

function SkeletonFloppyCard() {
  return (
    <div className="floppy">
      <div className="floppy-slider">
        <Skeleton className="h-2 w-12" />
      </div>
      <div className="floppy-label">
        <Skeleton className="h-4 w-3/4 mb-2" />
        <Skeleton className="h-2 w-full mb-1" />
        <Skeleton className="h-2 w-2/3" />
      </div>
    </div>
  );
}
import V2Nav from "../V2Nav";
import { skillData, sopData, playbookData, teardownData, newsletterData, buildSearchIndex } from "./data";
import { SkillDetail, SOPDetail, PlaybookDetail, TeardownDetail, NewsletterDetail, AdDetail } from "./components/DetailViews";
import SubscribeModal from "./components/SubscribeModal";
import SettingsPanel from "./components/SettingsPanel";
import SearchBar from "./components/SearchBar";

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
  | "saved"
  | "skill-detail"
  | "sop-detail"
  | "playbook-detail"
  | "teardown-detail"
  | "newsletter-detail"
  | "ad-detail";

/* ─── Data ─── */

const featuredResources = [
  { tag: "Skill", color: "bg-white/[0.08] text-white border-white/[0.15]", title: "Story Systems", desc: "Build your brand's master messaging hub — positioning, value props, and copy hooks.", icon: MessageSquare, image: "/frontier/story-systems.png" },
  { tag: "Skill", color: "bg-white/[0.08] text-white border-white/[0.15]", title: "Growth Strategy", desc: "Your master growth playbook — channels, funnels, unit economics, and compounding motions.", icon: BarChart3, image: "/frontier/growth-strategy.png" },
  { tag: "SOP", color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20", title: "Cold Outreach", desc: "The exact process to book 50+ qualified calls per month.", icon: Mail, image: "/frontier/cold-outreach.png" },
  { tag: "Playbook", color: "bg-violet-500/10 text-violet-400 border-violet-500/20", title: "Above the Fold", desc: "The most important real estate on your page — the 5-component framework.", icon: Eye, image: "/frontier/above-the-fold.png" },
  { tag: "Newsletter", color: "bg-teal-500/10 text-teal-400 border-teal-500/20", title: "Welcome to the Frontier", desc: "#314 — New era of tactical + strategic growth intelligence.", icon: Mail, image: "/frontier/welcome-frontier.png" },
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
        className="file-tab"
      >
        <Icon className="w-[15px] h-[15px] shrink-0" />
        <span className="text-[12px] flex-1">{label}</span>
        <span className={`text-[10px] opacity-30 transition-transform ${open ? "rotate-90" : ""}`}>▸</span>
      </button>
      {open && (
        <div className="ml-[29px] border-l border-white/[0.06] pl-3 py-1">
          {items.map((item) => (
            <button
              key={item.name}
              onClick={() => item.active !== false && onItemClick?.(item.name)}
              className={`block w-full text-left px-2 py-2.5 text-[11px] transition-colors ${
                item.active === false
                  ? "text-neutral-700 cursor-default"
                  : "text-neutral-500 hover:text-white"
              }`}
            >
              {item.active !== false && <span className="opacity-30 mr-1.5">└</span>}
              {item.name}
              {item.active === false && (
                <span className="ml-1.5 text-[9px] text-neutral-700">—</span>
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
  const [detailName, setDetailName] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [viewHistory, setViewHistory] = useState<{ view: ViewId; sub: string }[]>([]);
  const [bookmarks, setBookmarks] = useState<{ view: string; sub: string }[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<{ view: string; sub: string; title: string }[]>([]);
  const [subscribeOpen, setSubscribeOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [scrollPositions, setScrollPositions] = useState<Record<string, number>>({});
  const [toast, setToast] = useState<{ message: string; undo?: () => void } | null>(null);
  const [toastTimer, setToastTimer] = useState<NodeJS.Timeout | null>(null);

  const searchItems = buildSearchIndex();

  // Loading state — defaults to false (local data). Ready for API fetching later.
  const [loading] = useState(false);

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("dc-bookmarks");
    if (saved) setBookmarks(JSON.parse(saved));
  }, []);

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem("dc-bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Navigate to a view
  const navigate = useCallback((view: ViewId | string, sub?: string) => {
    // Save scroll position of current view
    const scrollEl = document.querySelector(".frontier-scroll");
    if (scrollEl) {
      setScrollPositions(prev => ({ ...prev, [activeView + (detailName || "")]: scrollEl.scrollTop }));
    }

    setViewHistory(prev => [...prev, { view: activeView, sub: detailName }]);
    setActiveView(view as ViewId);
    setDetailName(sub || "");
    setSidebarOpen(false);

    // Add to recently viewed for detail pages
    if (sub && view.includes("detail")) {
      setRecentlyViewed(prev => {
        const filtered = prev.filter(r => !(r.view === view && r.sub === sub));
        return [{ view, sub, title: sub }, ...filtered].slice(0, 5);
      });
    }

    // Restore scroll or scroll to top
    setTimeout(() => {
      const el = document.querySelector(".frontier-scroll");
      if (el) {
        const savedPos = scrollPositions[view + (sub || "")];
        el.scrollTop = savedPos || 0;
      }
    }, 50);
  }, [activeView, detailName, scrollPositions]);

  // Go back
  const goBack = useCallback(() => {
    const last = viewHistory[viewHistory.length - 1];
    if (last) {
      setViewHistory(prev => prev.slice(0, -1));
      setActiveView(last.view);
      setDetailName(last.sub);
    }
  }, [viewHistory]);

  // Escape key to go back or close modals
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (subscribeOpen) { setSubscribeOpen(false); return; }
        if (settingsOpen) { setSettingsOpen(false); return; }
        if (activeView.includes("detail")) { goBack(); return; }
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [subscribeOpen, settingsOpen, activeView, goBack]);

  // Show toast helper
  function showToast(message: string, undo?: () => void) {
    if (toastTimer) clearTimeout(toastTimer);
    setToast({ message, undo });
    const timer = setTimeout(() => setToast(null), 4000);
    setToastTimer(timer);
  }

  // Toggle bookmark
  function toggleBookmark(view: string, sub: string) {
    setBookmarks(prev => {
      const exists = prev.some(b => b.view === view && b.sub === sub);
      if (exists) {
        const removed = { view, sub };
        showToast("Removed from saved. Undo?", () => {
          setBookmarks(p => [...p, removed]);
        });
        return prev.filter(b => !(b.view === view && b.sub === sub));
      }
      return [...prev, { view, sub }];
    });
  }

  function isBookmarked(view: string, sub: string) {
    return bookmarks.some(b => b.view === view && b.sub === sub);
  }

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
        className={`file-tab ${isActive ? "file-tab-active" : ""}`}
      >
        <Icon className="w-[15px] h-[15px] shrink-0" />
        <span className="text-[12px]">{label}</span>
        {badge && (
          <span className="ml-auto text-[9px] px-2 py-0.5 border border-white/[0.1] text-neutral-500">
            {badge}
          </span>
        )}
      </button>
    );
  };

  /* Floppy Disk card wrapper */
  const FloppyCard = ({ type, image, children, onClick }: { type?: string; image?: string; children: React.ReactNode; onClick?: () => void }) => (
    <div className="floppy group" onClick={onClick}>
      <div className="floppy-scan" />
      {image && (
        <div className="w-full aspect-[16/10] overflow-hidden bg-black">
          <img src={image} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
        </div>
      )}
      <div className="floppy-slider">
        {type && <span className="text-[8px] tracking-[0.2em] uppercase text-white/20">{type}</span>}
      </div>
      <div className="floppy-label">
        {children}
      </div>
    </div>
  );

  /* Keep old card refs working */
  const card = "frontier-card";
  const cardStatic = "frontier-card";

  return (
    <div
      className="flex flex-col h-screen overflow-hidden text-white relative retro-cursor"
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
      <V2Nav currentPage="THE FRONTIER" variant="dark" minimal searchSlot={
        <SearchBar
          items={[
            ...searchItems,
            { title: "Settings", type: "Action", view: "__action", sub: "settings" },
            { title: "Subscribe", type: "Action", view: "__action", sub: "subscribe" },
            { title: "Go to Dashboard", type: "Action", view: "dashboard" },
            { title: "Go to Playbooks", type: "Action", view: "playbooks" },
            { title: "Go to Newsletter Archives", type: "Action", view: "newsletters" },
            { title: "Go to Claude Skills", type: "Action", view: "claude-skills" },
            { title: "Go to SOP Library", type: "Action", view: "sop-library" },
            { title: "Go to Teardowns", type: "Action", view: "teardowns" },
            { title: "Go to Ad Examples", type: "Action", view: "ad-examples" },
            { title: "Go to Saved", type: "Action", view: "saved" },
            { title: "Go to Partner Deals", type: "Action", view: "deals" },
            { title: "Go to Services", type: "Action", view: "services" },
          ]}
          onNavigate={(view, sub) => {
            if (view === "__action") {
              if (sub === "settings") setSettingsOpen(true);
              else if (sub === "subscribe") setSubscribeOpen(true);
            } else {
              navigate(view as ViewId, sub);
            }
          }}
        />
      } />

      <div className="relative z-10 flex flex-1 overflow-hidden" style={{
        backgroundColor: '#111113',
        backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)',
      }}>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`frontier-panel fixed lg:static inset-y-0 left-0 z-40 w-64 border-r border-white/[0.08] flex flex-col h-full shrink-0 transition-transform lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ backgroundColor: '#141416' }}
      >
        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-4 space-y-8 pt-16 pb-4 hide-scrollbar">
          {/* Main */}
          <div>
            {navItem("dashboard", LayoutGrid, "Dashboard")}
            {navItem("saved", Bookmark, "Saved")}
            {navItem("playbooks", BookOpen, "The Playbooks")}
            {navItem("newsletters", Library, "Newsletter Archives")}
            {navItem("community", Users, "Community", "Soon")}
          </div>

          {/* Resources */}
          <div>
            <div className="drawer-label">Resources</div>
            <div>
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
            <div className="drawer-label">Member Perks</div>
            <div>
              {navItem("deals", Ticket, "Partner Deals")}
              {navItem("services", Handshake, "Services")}
            </div>
          </div>
        </nav>

        {/* Services callout */}
        <div className="px-3 py-4 border-t border-white/[0.04]">
          <div className="os-window" onClick={() => setActiveView("services")} style={{ cursor: 'pointer' }}>
            <div className="os-window-bar">
              <span className="os-window-title">Services</span>
              <div className="os-window-controls">
                <span className="win98-btn" aria-hidden="true">
                  <svg width="9" height="2" viewBox="0 0 9 2" fill="currentColor"><rect width="9" height="2"/></svg>
                </span>
                <span className="win98-btn" aria-hidden="true">
                  <svg width="9" height="8" viewBox="0 0 9 8" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="0.75" y="0.75" width="7.5" height="6.5"/></svg>
                </span>
                <span className="win98-btn" aria-hidden="true">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="1" y1="1" x2="7" y2="7"/><line x1="7" y1="1" x2="1" y2="7"/></svg>
                </span>
              </div>
            </div>
            <div className="os-window-body">
              <p className="text-[11px] text-white mb-1">Need hands-on help?</p>
              <p className="text-[10px] text-neutral-500 mb-2 leading-relaxed">Our growth experts work 1:1 with you.</p>
              <span className="text-[10px] text-neutral-400 inline-flex items-center gap-1 hover:text-white transition-colors">
                Explore Services <ArrowRight className="w-2.5 h-2.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>

        {/* Block character decoration */}
        <div className="px-4 py-2 border-t border-white/[0.08] text-[9px] tracking-[0.15em] text-white/[0.07] overflow-hidden whitespace-nowrap">
          ░▒▓█▓▒░·:·░▒▓█▓▒░·:·░▒▓█▓▒░
        </div>

        {/* User */}
        <button onClick={() => setSettingsOpen(true)} className="flex items-center gap-3 w-full px-5 py-4 border-t border-white/[0.08] hover:bg-white/[0.04] transition-colors cursor-pointer text-left">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neutral-400 to-neutral-600 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Ezzie Cat</p>
            <p className="text-xs text-neutral-500 truncate">Premium Member</p>
          </div>
          <ChevronDown className="w-4 h-4 text-neutral-600 shrink-0" />
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <header className="frontier-panel h-16 border-b border-white/[0.08] flex items-center justify-between px-6 shrink-0" style={{ backgroundColor: '#141416' }}>
          {/* Mobile menu */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 text-neutral-400 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSettingsOpen(true)}
              className="p-2 text-neutral-500 hover:text-white transition-colors"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
            <span className="hidden lg:block text-[9px] tracking-[0.15em] text-white/[0.07] whitespace-nowrap">
              █▓▒░·:·░▒▓
            </span>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto retro-scrollbar frontier-scroll">

          {/* ===== DASHBOARD VIEW ===== */}
          {activeView === "dashboard" && (
            <div>
              {/* CRT hero section */}
              <div className="crt-container">
                <div className="crt-scanlines-overlay" />
                <div className="crt-scanbar" />
                <div className="p-6 md:p-10 lg:p-12 pb-16 relative" style={{ zIndex: 5 }}>
                  <div className="max-w-[1400px] mx-auto">
                    {/* Breadcrumb */}
                    <div className="text-xs text-neutral-500 mb-6 flex items-center gap-2">
                      <button onClick={() => navigate("dashboard")} className="rainbow-hover-dark transition-colors">
                        Dashboard
                      </button>
                    </div>

                    {/* Hero */}
                    <div className="py-12 md:py-20">
                      <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-8">
                        THE GROWTH FRONTIER
                      </div>
                      <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl leading-[0.9] tracking-tight text-white mb-8 crt-text" style={{ position: 'relative', zIndex: 10, display: 'inline-block' }}>
                        Welcome to the<br /><span className="blink-cursor">Growth Frontier</span>
                      </h1>
                      <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mb-10">
                        We share the top strategies and tactics used by fast-growing startups.
                      </p>
                      <div className="flex flex-wrap gap-8 text-[10px] tracking-[0.15em] uppercase text-neutral-500 mb-12">
                        <span className="flex items-center gap-2.5"><span className="text-white">[✓]</span> Tactics and Strategies</span>
                        <span className="flex items-center gap-2.5"><span className="text-white">[✓]</span> For Free</span>
                        <span className="flex items-center gap-2.5"><span className="text-white">[✓]</span> Join 100,000+ Startups</span>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-3 max-w-lg">
                        <input
                          type="email"
                          placeholder="email@demandcurve.com"
                          className="flex-1 bg-white/[0.05] border border-white/[0.1] rounded-lg px-4 py-3.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/25 transition-colors"
                        />
                        <button onClick={() => setSubscribeOpen(true)} className="glow-btn-dark px-6 py-3.5 rounded-lg text-sm font-semibold shrink-0 relative">
                          <span className="relative z-10">Subscribe</span>
                        </button>
                      </div>
                      <p className="text-neutral-600 text-xs mt-4">
                        You&apos;ll receive your first issue in a few minutes. Unsubscribe anytime.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* TV bezel — bottom of the CRT screen */}
              <div className="crt-bezel" />

              {/* Below the TV — normal content */}
              <div className="p-6 md:p-10 lg:p-12">
              <div className="max-w-[1400px] mx-auto">

                {/* Trusted By — compact, quiet */}
                <div className="mb-4 pt-2 text-center">
                  <div className="text-[9px] tracking-[0.25em] uppercase text-neutral-700 mb-4">
                    &gt; Trusted by marketers at
                  </div>
                  <div className="flex flex-wrap justify-center gap-6 text-neutral-600 text-xs tracking-wide">
                    {["Shopify", "Stripe", "Webflow", "Loom", "Mercury", "Deel", "Notion", "Vercel"].map((co) => (
                      <span key={co}>{co}</span>
                    ))}
                  </div>
                </div>

                <hr className="frontier-divider mb-8" />

                {/* Featured Resources — the main attraction, generous space */}
                <div className="mb-16 pb-8 rounded-2xl px-6 py-8 -mx-6" style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="font-heading text-2xl font-semibold text-white tracking-tight">Featured Resources</h2>
                    <span className="text-[9px] tracking-[0.2em] uppercase text-neutral-700">5 Items</span>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {loading ? (
                      <>
                        {[1, 2, 3, 4, 5].map((i) => <SkeletonFloppyCard key={i} />)}
                      </>
                    ) : null}
                    {!loading && featuredResources.map((r) => {
                      const viewMap: Record<string, ViewId> = { Skill: "skill-detail", SOP: "sop-detail", Playbook: "playbook-detail", Newsletter: "newsletter-detail" };
                      const targetView = viewMap[r.tag] || "dashboard";
                      const sub = r.tag === "Newsletter" ? "314" : r.title;
                      return (
                        <FloppyCard
                          key={r.title}
                          type={r.tag}
                          image={r.image}
                          onClick={() => navigate(targetView, sub)}
                        >
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleBookmark(targetView, sub); }}
                            className="absolute top-0 right-0 w-11 h-11 flex items-center justify-center text-neutral-600 hover:text-white transition-colors z-20"
                            aria-label="Bookmark"
                          >
                            {isBookmarked(targetView, sub) ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                          </button>
                          <h3 className="font-semibold text-[13px] mb-1 text-white">
                            {r.title}
                          </h3>
                          <p className="text-[10px] text-neutral-500 leading-relaxed">{r.desc}</p>
                        </FloppyCard>
                      );
                    })}
                  </div>
                </div>

                <hr className="frontier-divider mb-12" />

                {/* Learning Paths — secondary, tighter */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-sm font-medium text-white tracking-wide uppercase">Learning Paths</h2>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <FloppyCard type="PATH 01">
                      <h3 className="font-heading text-base mb-2 text-white tracking-tight">Story Systems Path</h3>
                      <p className="text-[10px] text-neutral-500 leading-relaxed">Messaging foundation &rarr; Launch. Build your complete brand story system.</p>
                    </FloppyCard>
                    <FloppyCard type="PATH 02">
                      <h3 className="font-heading text-base mb-2 text-white tracking-tight">Cold Outreach Mastery</h3>
                      <p className="text-[10px] text-neutral-500 leading-relaxed">Email templates &rarr; Sales execution. Book 50+ calls per month.</p>
                    </FloppyCard>
                  </div>
                </div>
              </div>
              </div>
            </div>
          )}

          {/* Non-dashboard views get their own padding */}
          {activeView !== "dashboard" && (
          <div className="p-6 md:p-10 lg:p-12">
            <div className="max-w-[1400px] mx-auto">
            {/* Breadcrumb */}
            <div className="text-xs text-neutral-500 mb-6 flex items-center gap-2">
              <button onClick={() => navigate("dashboard")} className="rainbow-hover-dark transition-colors">
                Dashboard
              </button>
              <span>&rsaquo;</span>
              {detailName ? (
                <>
                  <button onClick={goBack} className="hover:text-white transition-colors capitalize">
                    {activeView.replace(/-detail/, "s").replace(/-/g, " ")}
                  </button>
                  <span className="text-neutral-700">&rsaquo;</span>
                  <span className="text-neutral-300">{detailName}</span>
                </>
              ) : (
                <span className="text-neutral-300 capitalize">{activeView.replace(/-/g, " ")}</span>
              )}
            </div>

            {/* ===== PLAYBOOKS VIEW ===== */}
            {activeView === "playbooks" && (
              <div>
                <h1 className="font-heading text-3xl md:text-4xl tracking-tight mb-4 text-white">The Playbooks</h1>
                <p className="text-neutral-400 mb-8">In-depth guides and frameworks you can apply today.</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-in">
                  {playbooks.map((pb) => (
                    <div key={pb.title} className={`group ${card} p-5 cursor-pointer`} onClick={() => navigate("playbook-detail", pb.title)}>
                      <span className="text-[10px] tracking-widest px-2 py-0.5 rounded border bg-violet-500/10 text-violet-400 border-violet-500/20 mb-3 inline-block">
                        {pb.topic}
                      </span>
                      <h3 className="font-medium text-sm mb-2 text-white rainbow-hover-dark">{pb.title}</h3>
                      <p className="text-xs text-neutral-500 leading-relaxed">{pb.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== NEWSLETTERS VIEW ===== */}
            {activeView === "newsletters" && (
              <div>
                <h1 className="font-heading text-3xl md:text-4xl tracking-tight mb-4 text-white">Newsletter Archives</h1>
                <p className="text-neutral-400 mb-8">Every edition of the Demand Curve newsletter.</p>
                <div className="space-y-2 stagger-in">
                  {newsletters.map((nl) => (
                    <div key={nl.number} className={`group flex items-center gap-4 p-4 ${card} cursor-pointer`} onClick={() => navigate("newsletter-detail", nl.number.replace("#", ""))}>
                      <div className="w-10 h-10 shrink-0 rounded-lg bg-teal-500/10 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-teal-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-white rainbow-hover-dark">{nl.title}</div>
                        <div className="text-xs text-neutral-500 tabular-nums">{nl.number} &middot; {nl.date} &middot; {nl.topic}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== CLAUDE SKILLS VIEW ===== */}
            {activeView === "claude-skills" && (
              <div>
                <h1 className="font-heading text-3xl md:text-4xl tracking-tight mb-4 text-white">Claude Skills</h1>
                <p className="text-neutral-400 mb-8">AI-powered growth systems — use with Claude, ChatGPT, or any LLM.</p>
                <div className="grid md:grid-cols-2 gap-4 stagger-in">
                  {claudeSkills.map((skill) => (
                    <div key={skill.name} className={`group ${card} p-5 cursor-pointer`} onClick={() => navigate("skill-detail", skill.name)}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-white/[0.08] flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-[10px] tracking-widest px-2 py-0.5 rounded border bg-white/[0.08] text-white border-white/[0.15]">
                          SKILL
                        </span>
                      </div>
                      <h3 className="font-medium text-sm mb-2 text-white rainbow-hover-dark">{skill.name}</h3>
                      <p className="text-xs text-neutral-500 leading-relaxed">{skill.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== SOP LIBRARY VIEW ===== */}
            {activeView === "sop-library" && (
              <div>
                <h1 className="font-heading text-3xl md:text-4xl tracking-tight mb-4 text-white">SOP Templates</h1>
                <p className="text-neutral-400 mb-8">Copy, customize, and execute. Standard operating procedures for growth teams.</p>
                <div className="space-y-2 stagger-in">
                  {sopTemplates.map((sop) => (
                    <div key={sop.name} className={`group flex items-center gap-4 p-4 ${card} cursor-pointer`} onClick={() => navigate("sop-detail", sop.name)}>
                      <div className="w-10 h-10 shrink-0 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <FileText className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-white rainbow-hover-dark">{sop.name}</div>
                        <div className="text-xs text-neutral-500">{sop.desc}</div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== TEARDOWNS VIEW ===== */}
            {activeView === "teardowns" && (
              <div>
                <h1 className="font-heading text-3xl md:text-4xl tracking-tight mb-4 text-white">Teardowns</h1>
                <p className="text-neutral-400 mb-8">Landing page psychology and UX breakdowns from real companies.</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-in">
                  {teardowns.map((name) => (
                    <div key={name} className={`group ${card} p-5 cursor-pointer`} onClick={() => navigate("teardown-detail", name)}>
                      <div className="w-full h-32 rounded-lg bg-white/[0.03] mb-4 flex items-center justify-center">
                        <ScanSearch className="w-8 h-8 text-neutral-600" />
                      </div>
                      <h3 className="font-medium text-sm mb-1 text-white rainbow-hover-dark">{name}</h3>
                      <p className="text-xs text-neutral-500">Landing page teardown &middot; Psychology & conversion</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== AD EXAMPLES VIEW ===== */}
            {activeView === "ad-examples" && (
              <div>
                <h1 className="font-heading text-3xl md:text-4xl tracking-tight mb-4 text-white">Ad Examples</h1>
                <p className="text-neutral-400 mb-8">Real ads from top brands — Meta, Google, LinkedIn, and more.</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 stagger-in">
                  {adBrands.map((brand) => (
                    <div key={brand} className={`group ${card} overflow-hidden cursor-pointer`} onClick={() => navigate("ad-detail", brand)}>
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
                <h1 className="font-heading text-3xl md:text-4xl tracking-tight mb-4 text-white">Partner Deals & Perks</h1>
                <p className="text-neutral-400 mb-8">$840+ in exclusive savings for Frontier members.</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-in">
                  {deals.map((deal) => (
                    <div key={deal.name} className={`${card} p-5 cursor-pointer`}>
                      <Gift className="w-6 h-6 text-neutral-500 mb-3" />
                      <h3 className="font-medium text-sm mb-1 text-white rainbow-hover-dark">{deal.name}</h3>
                      <span className="text-[10px] tracking-widest text-neutral-500">{deal.category.toUpperCase()}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== SERVICES VIEW ===== */}
            {activeView === "services" && (
              <div>
                <h1 className="font-heading text-3xl md:text-4xl tracking-tight mb-4 text-white">Services & Audits</h1>
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
                      <div className="text-2xl font-semibold mb-1 text-white tabular-nums">{stat.value}</div>
                      <div className="text-xs text-neutral-500">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* Audits */}
                <h2 className="font-heading text-xl mb-6 text-white tracking-tight">Expert Audits</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
                  {audits.map((audit) => (
                    <div key={audit.name} className={`${card} p-5`}>
                      <h3 className="font-medium text-sm mb-2 text-white rainbow-hover-dark">{audit.name}</h3>
                      <p className="text-xs text-neutral-400 leading-relaxed mb-3">{audit.desc}</p>
                      <div className="text-[10px] tracking-widest text-neutral-600">
                        PAIRS WITH: {audit.skill.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Done-with-you */}
                <h2 className="font-heading text-xl mb-6 text-white tracking-tight">Done-With-You Services</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { name: "Paid Acquisition", desc: "Strategy, leadership, execution for Meta, Google, TikTok, LinkedIn." },
                    { name: "Creative Services", desc: "Ad creative strategy, production, and iteration — ads that convert." },
                    { name: "AEO Agency", desc: "Full-service AI search ranking — ChatGPT, Perplexity, Gemini." },
                  ].map((svc) => (
                    <div key={svc.name} className={`${card} p-5`}>
                      <h3 className="font-medium text-sm mb-2 text-white rainbow-hover-dark">{svc.name}</h3>
                      <p className="text-xs text-neutral-400 leading-relaxed">{svc.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== COMMUNITY VIEW ===== */}
            {activeView === "community" && (
              <div>
                <h1 className="font-heading text-3xl md:text-4xl tracking-tight mb-4 text-white">Community</h1>
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
                <h1 className="font-heading text-3xl md:text-4xl tracking-tight mb-4 text-white">Saved Resources</h1>
                <p className="text-neutral-400 mb-8">Your bookmarked content.</p>
                {bookmarks.length === 0 ? (
                  <div className={`${cardStatic} p-12 text-center`}>
                    <Bookmark className="w-8 h-8 text-neutral-600 mx-auto mb-3" />
                    <p className="text-sm text-neutral-500">No saved resources yet. Click the bookmark icon on any resource to save it here.</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {bookmarks.map((b) => (
                      <div
                        key={`${b.view}-${b.sub}`}
                        className={`${card} p-5 cursor-pointer`}
                        onClick={() => navigate(b.view as ViewId, b.sub)}
                      >
                        <span className="frontier-tag mb-3 inline-block">{b.view.replace(/-detail/, "").replace(/-/g, " ")}</span>
                        <h3 className="font-semibold text-sm text-white">{b.sub}</h3>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ===== DETAIL VIEWS ===== */}

            {activeView === "skill-detail" && detailName && skillData[detailName] && (
              <SkillDetail
                skill={{ name: detailName, category: skillData[detailName].tag, ...skillData[detailName] }}
                onBack={goBack}
              />
            )}

            {activeView === "sop-detail" && detailName && sopData[detailName] && (
              <SOPDetail
                sop={{ name: detailName, ...sopData[detailName] }}
                onBack={goBack}
                onNavigate={(view, sub) => navigate(view as ViewId, sub)}
              />
            )}

            {activeView === "playbook-detail" && detailName && playbookData[detailName] && (
              <PlaybookDetail
                playbook={{
                  title: detailName,
                  topic: playbookData[detailName].tag,
                  desc: playbookData[detailName].about,
                  sections: playbookData[detailName].content.split("\n\n").reduce((acc: { title: string; content: string }[], para, i) => {
                    if (i % 2 === 0) acc.push({ title: para, content: "" });
                    else if (acc.length > 0) acc[acc.length - 1].content = para;
                    return acc;
                  }, []),
                }}
                onBack={goBack}
              />
            )}

            {activeView === "teardown-detail" && detailName && teardownData[detailName] && (
              <TeardownDetail
                teardown={{ name: detailName, ...teardownData[detailName] }}
                onBack={goBack}
              />
            )}

            {activeView === "newsletter-detail" && detailName && newsletterData[detailName] && (
              <NewsletterDetail
                newsletter={{
                  ...newsletterData[detailName],
                  number: `#${detailName}`,
                  summary: newsletterData[detailName].takeaways?.join(". ") || "",
                }}
                onBack={goBack}
              />
            )}

            {activeView === "ad-detail" && detailName && (
              <AdDetail brand={detailName} onBack={goBack} />
            )}
          </div>
          </div>
          )}
        </div>
      </main>
      </div>

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-4 bg-[#1a1a1c] border border-white/[0.1] rounded-lg px-4 py-3 shadow-2xl">
          <span className="text-sm text-neutral-300">{toast.message}</span>
          {toast.undo && (
            <button
              onClick={() => { toast.undo?.(); setToast(null); }}
              className="text-sm font-semibold text-white hover:text-neutral-300 transition-colors"
            >
              Undo
            </button>
          )}
        </div>
      )}

      {/* Modals */}
      <SubscribeModal open={subscribeOpen} onClose={() => setSubscribeOpen(false)} />
      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}
