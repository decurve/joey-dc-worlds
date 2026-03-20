"use client";

import { useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Wrench,
  Bot,
  Users,
  Lock,
  CheckCircle2,
  X,
  Star,
  Shield,
  ChevronDown,
  ChevronRight,
  MapPin,
  Lightbulb,
  BarChart3,
  Rocket,
  Flame,
  Hammer,
  FileText,
  Briefcase,
  Beaker,
  FlaskConical,
  MessageSquare,
  Send,
  Handshake,
  DollarSign,
  Eye,
  Layers,
  Target,
  Palette,
  Search,
  PenTool,
  MonitorSmartphone,
  Sparkles,
} from "lucide-react";
import V2Nav from "../V2Nav";
import GlowButton from "../GlowButton";

/* ─── FadingLines separator ─── */

const fadingLines = [
  { y: 0, opacity: 0.10 }, { y: 3, opacity: 0.09 }, { y: 7, opacity: 0.08 },
  { y: 12, opacity: 0.07 }, { y: 18, opacity: 0.06 }, { y: 25, opacity: 0.05 },
  { y: 33, opacity: 0.04 }, { y: 42, opacity: 0.03 }, { y: 52, opacity: 0.02 },
  { y: 59, opacity: 0.01 },
];
function FadingLines() {
  return (
    <>
      <div className="relative" style={{ height: 60, minHeight: 40, width: "100vw", marginLeft: "calc(-50vw + 50%)" }}>
        {fadingLines.map((line, i) => (
          <div key={i} className="absolute left-0 right-0" style={{ top: line.y, height: 1, backgroundColor: `rgba(0,0,0,${line.opacity})` }} />
        ))}
      </div>
      <div style={{ height: 40 }} />
    </>
  );
}

/* ─── "What You Unlock" toggle data ─── */

const unlockTabs = [
  {
    key: "learn",
    icon: BookOpen,
    title: "Learn",
    description: "The most tactical growth curriculum ever made, tailored to your startup.",
    contentTitle: "Learn and Master Growth",
    contentSub: "Get a growth curriculum tailored to your startup.",
    items: [
      { icon: MapPin, title: "Company Tracks", desc: "Step-by-step growth plans tailored to your business type and stage." },
      { icon: Lightbulb, title: "Solve Any Growth Problem", desc: "55+ playbooks for every major growth tactic, channel, and use case." },
      { icon: BarChart3, title: "Full-Funnel Growth", desc: "Learn acquisition, activation, monetization, retention, and more." },
      { icon: Rocket, title: "Modern Growth Motions", desc: "Product, sales, content, and paid-led acquisition strategies." },
      { icon: Flame, title: "Zero Fluff", desc: "No theory, no filler, just tactical systems that actually work." },
      { icon: Hammer, title: "Built by Operators", desc: "Created by the team behind $1B+ in startup growth." },
    ],
  },
  {
    key: "build",
    icon: Wrench,
    title: "Build",
    description: "Step-by-step projects that tell you exactly what to do.",
    contentTitle: "Build & Execute",
    contentSub: "Actually implement what you learn, with no fluff.",
    items: [
      { icon: FlaskConical, title: "Growth Recipes", desc: "Step-by-step guides to build and ship growth experiments fast." },
      { icon: FileText, title: "Templates & Swipe Files", desc: "Launch faster with 50+ high-converting assets." },
      { icon: BarChart3, title: "Tactical Projects", desc: "Solve channel-specific problems with step-by-step execution plans." },
      { icon: Briefcase, title: "Real Startup Case Studies", desc: "See how the fastest-growing startups solve growth." },
      { icon: CheckCircle2, title: "Validated Tactics", desc: "No theory, no filler, just tactical systems that actually work." },
      { icon: Beaker, title: "Endless Growth Experiments", desc: "400+ proven tactics and ad examples to spark your next big win." },
    ],
  },
  {
    key: "guidance",
    icon: Bot,
    title: "Expert Guidance",
    description: "Coaching from the Demand Curve team and your own AI growth co-pilot.",
    contentTitle: "Expert Guidance",
    contentSub: "Coaching from the DC team, and your own AI growth co-pilot.",
    items: [
      { icon: Sparkles, title: "AI Growth Co-Pilot", desc: "Trained on everything we know. Like having 100+ growth experts at your fingertips." },
      { icon: MessageSquare, title: "1:1 Coaching", desc: "Work directly with the Demand Curve team for personalized strategies." },
      { icon: Eye, title: "Tactical Feedback", desc: "Get detailed critiques on landing pages, ads, positioning and more." },
      { icon: Target, title: "Clarity Without Guesswork", desc: "Avoid costly detours. Get clear direction on what to do, and what to ignore." },
      { icon: Users, title: "Never Alone", desc: "Founders shouldn't go it alone. Expert support is just a message away." },
      { icon: DollarSign, title: "Priced for Startups", desc: "Like hiring a $20K/mo growth team — at a fraction of the cost." },
    ],
  },
  {
    key: "hire",
    icon: Handshake,
    title: "Hire",
    description: "When you're ready to scale, we'll connect you with the right partners.",
    contentTitle: "Hire Growth Talent",
    contentSub: "The easiest way to hire startup growth talent.",
    items: [
      { icon: Search, title: "Vetted for Startup Growth", desc: "Every partner is hand-picked for their ability to drive growth at early-stage startups." },
      { icon: Layers, title: "Full Range of Talent", desc: "From elite agencies to cost-effective experts, only trusted partners make the cut." },
      { icon: DollarSign, title: "Exclusive Member Discounts", desc: "Save thousands with special pricing from select top-tier growth partners." },
      { icon: Shield, title: "Not a Marketplace", desc: "No spam. No agency roulette. Just direct intros to top-fit partners, vetted by us." },
    ],
  },
  {
    key: "vault",
    icon: Lock,
    title: "The Vault",
    description: "Members-only tools & resources that boost your growth advantage.",
    contentTitle: "The Vault",
    contentSub: "Members-only tools & resources.",
    items: [
      { icon: Flame, title: "Growth Vault", desc: "460+ battle-tested growth tactics from top startups and operators." },
      { icon: Palette, title: "Ads Vault", desc: "239+ high-performing startup ads for creative inspiration and analysis." },
      { icon: Send, title: "Newsletter Vault", desc: "Browse 250+ past issues packed with founder-focused growth insights." },
      { icon: DollarSign, title: "Exclusive Discounts", desc: "Save on vetted tools, services, and select agency partners." },
    ],
  },
];

/* ─── Course Library tab data ─── */

const mostPopularCourses = [
  { tag: "ACQUISITION", tagColor: "blue", title: "Community-Based Outreach", desc: "Build trust through social DMs: join communities, spark natural chats, and turn them into users." },
  { tag: "ACQUISITION", tagColor: "blue", title: "Sales Strategy Fundamentals", desc: "The 80/20 sales system that gets early-stage founders from zero to first revenue fast." },
  { tag: "ACQUISITION", tagColor: "blue", title: "Acquisition Strategy", desc: "Build your acquisition strategy by scoring channels, picking flywheels, and sequencing a testing roadmap." },
  { tag: "ACQUISITION", tagColor: "blue", title: "Design Your Growth Engine", desc: "Design a growth engine by aligning motions into flywheels that drive sustainable, compounding growth." },
  { tag: "STRATEGY", tagColor: "red", title: "The Foundational Five: Overview", desc: "The five aligned pillars of growth: market, product, model, brand, and channel." },
  { tag: "STRATEGY", tagColor: "red", title: "The DC Growth System", desc: "Stop chasing random marketing tactics. Build a systematic growth engine using five foundational pillars." },
  { tag: "ACQUISITION", tagColor: "blue", title: "Cold Email", desc: "Most cold emails get ignored. We'll show you how to write ones your leads are excited to reply to." },
  { tag: "ACQUISITION", tagColor: "blue", title: "Organic LinkedIn: Getting Started", desc: "Our members have amassed 4M+ followers using our content systems." },
  { tag: "ACQUISITION", tagColor: "blue", title: "SEO Fundamentals", desc: "The old SEO playbooks are fading. Learn how to grow search traffic in an AI-first world." },
  { tag: "ACQUISITION", tagColor: "blue", title: "Meta Ads (FB + IG)", desc: "Run profitable Meta ads using proven creative formats, targeting strategies, and optimization frameworks." },
  { tag: "ACQUISITION", tagColor: "blue", title: "Google Search Ads", desc: "Launch and scale Google search campaigns using conversion-first strategies." },
  { tag: "CREATIVE", tagColor: "blue", title: "Make High-Converting Ad Creatives", desc: "Make high-performing ads that stop the scroll — even if you're not a designer." },
  { tag: "CONVERSION", tagColor: "blue", title: "Make High-Converting Landing Pages", desc: "Use our proven playbooks and templates to build landing pages that convert — fast." },
  { tag: "CONVERSION", tagColor: "blue", title: "Copywriting Fundamentals", desc: "Write headlines, product copy, and CTAs that convert across landing pages, ads, and onboarding." },
  { tag: "CONVERSION", tagColor: "blue", title: "The Complete Onboarding System", desc: "Design onboarding experiences that activate users quickly and increase long-term retention." },
  { tag: "STRATEGY", tagColor: "red", title: "Monetization & Pricing Strategy", desc: "Smart pricing avoids guessing — define value metrics, choose a clear structure, and adjust often." },
];

const companyPaths = [
  { title: "Core Growth Path", duration: "8 weeks", desc: "The essential growth system every startup needs to build." },
  { title: "B2C Tech Path", duration: "8 weeks", desc: "Consumer-focused growth strategies for B2C tech companies." },
  { title: "B2B Tech Path", duration: "8 weeks", desc: "Enterprise and SMB growth motions for B2B startups." },
  { title: "Education Path", duration: "8 weeks", desc: "Growth systems designed for education and edtech companies." },
  { title: "Mobile Apps Path", duration: "8 weeks", desc: "Acquisition and retention strategies for mobile-first products." },
  { title: "Services Path", duration: "8 weeks", desc: "Growth playbooks for service-based and agency businesses." },
];

const acquisitionCourses = [
  { tag: "OUTBOUND", tagColor: "blue", title: "Cold Outreach (Partnerships & PR)", desc: "Turn cold contacts into warm partnerships and press coverage." },
  { tag: "SALES", tagColor: "blue", title: "Sales Strategy Fundamentals", desc: "The 80/20 sales system for early-stage founders." },
  { tag: "PLG", tagColor: "blue", title: "Product Virality", desc: "Build viral loops and referral mechanics into your product." },
  { tag: "NETWORK", tagColor: "blue", title: "Tap Your Network", desc: "Leverage your existing network for initial traction." },
  { tag: "LAUNCH", tagColor: "blue", title: "Launching on Product Hunt", desc: "Maximize your Product Hunt launch for lasting growth." },
  { tag: "SOCIAL", tagColor: "blue", title: "Organic Instagram", desc: "Build an engaged audience on Instagram without paid ads." },
  { tag: "SEO", tagColor: "blue", title: "SEO: Build Your Foundation", desc: "Technical and content SEO fundamentals that compound." },
  { tag: "CONTENT", tagColor: "blue", title: "Content Marketing Fundamentals", desc: "Create content that drives organic growth and builds trust." },
  { tag: "INFLUENCER", tagColor: "blue", title: "Influencer Marketing", desc: "Find, vet, and partner with influencers that drive results." },
  { tag: "ACQUISITION", tagColor: "blue", title: "Identify Your Acquisition Motion", desc: "Pick the right acquisition channels for your stage and model." },
  { tag: "PAID", tagColor: "blue", title: "Meta Ads (FB + IG)", desc: "Run profitable Meta ad campaigns from day one." },
  { tag: "PAID", tagColor: "blue", title: "Google Search Ads", desc: "Launch and scale Google campaigns using conversion-first strategies." },
];

const conversionCourses = [
  { tag: "ONBOARDING", tagColor: "green", title: "The Complete Onboarding System", desc: "Design experiences that activate users quickly." },
  { tag: "ONBOARDING", tagColor: "green", title: "B2B Complete Onboarding System", desc: "Enterprise onboarding flows that drive activation." },
  { tag: "RETENTION", tagColor: "green", title: "Identify Your Retention Motion", desc: "Find the levers that keep users coming back." },
  { tag: "MONETIZATION", tagColor: "green", title: "Identify Your Monetization Motion", desc: "Pick the pricing model that maximizes lifetime value." },
  { tag: "RESEARCH", tagColor: "green", title: "User Surveys", desc: "Design surveys that surface actionable growth insights." },
  { tag: "RESEARCH", tagColor: "green", title: "Screen Recordings & Heatmaps", desc: "Identify UX friction points killing your conversion." },
  { tag: "TESTING", tagColor: "green", title: "Landing Page A/B Tests", desc: "Run rigorous A/B tests that actually improve conversion." },
  { tag: "CONVERSION", tagColor: "green", title: "Copywriting Fundamentals", desc: "Write copy that converts across every touchpoint." },
];

const testimonials = [
  { quote: "The Growth Program is phenomenal and I would 100% recommend you do it.", name: "Marc Thomas", title: "Founder, Doopoll", stat: "800% MRR increase", category: "Consumer SaaS" },
  { quote: "I've never experienced a training program that moved this quickly while also delivering high-impact content.", name: "Gil Akos", title: "Founder, Astra", stat: "500% MAU increase", category: "B2B" },
  { quote: "Kept me on track, and gave me the confidence to implement a lot of new strategies.", name: "Luciana Torous", title: "Founder, 3 Leaf Tea", stat: "2x conversions, -50% bounces", category: "Ecommerce" },
];

const moreTestimonials = [
  { quote: "We landed two big meetings using their cold outreach strategy — while we were still in the course.", name: "Wayne Anderson", title: "Co-Founder, SmartAlto" },
  { quote: "When I wrote the growth book Traction, I hoped someone would build a course like this.", name: "Justin Mares", title: "Founder, Kettle & Fire" },
  { quote: "This is the team you want to learn growth from. They know every channel and every tactic.", name: "Elie Schoppik", title: "Education, Anthropic" },
  { quote: "The DC course might be the most valuable thing I've done for my career.", name: "Candace Kim", title: "Marketing, Scanwell" },
  { quote: "If you're lagging behind on your growth skills, let them teach you what you're missing.", name: "Alex Kracov", title: "Founder, Dock" },
  { quote: "I've learned so much that probably would have taken months and considerable stress.", name: "Brent Jensen", title: "Growth, Hopper" },
];

const fitItems = [
  "You've launched a product, but no one's showing up",
  "You're stuck in analysis paralysis — second-guessing every move",
  "You're doing a million things, but nothing seems to be working",
  "You've hit a wall, and the needle just won't move",
  "You don't have budget for a $10K/month marketing hire",
  "You want to build growth in-house and empower your team with systems",
];

const notFitItems = [
  "You'd rather outsource growth than lead it yourself",
  "You're looking to land a job, not scale a startup",
  "You want high-level theory instead of tactical execution",
  "You're a late-stage company with a fully scaled growth engine",
];

const faqs = [
  { q: "What is the Growth Program?", a: "A modern growth platform that helps startups build and scale their entire growth engine — from acquisition and conversion to monetization and beyond. Whether you're defining your growth model, building your first acquisition channel, or optimizing your funnel, the program gives you the guidance, structure, and tools to do it." },
  { q: "What topics are covered?", a: "50+ strategic and tactical playbooks across every major aspect of startup growth. Positioning, brand strategy, paid acquisition, conversion flows, pricing, monetization, and all major growth motions (paid, content, sales, PLG). As far as we know, this is the most comprehensive startup growth education program available." },
  { q: "How much time should I plan to spend?", a: "Totally flexible. If you're solving a specific problem, you'll get value immediately — most playbooks help you ship in hours. If you're building your entire growth engine, some dedicate a few hours a week, others sprint for 10-20 hours when growth is the priority." },
  { q: "How is this better than courses or hiring?", a: "We combine expert guidance via our AI Growth Co-Pilot and 1:1 coaching with the exact playbooks we've used to help hundreds of fast-growing startups. You get the strategic depth of hiring experts without the cost, and unlike courses, we don't just tell you what to do — we show you exactly how." },
];

const includedFeatures = [
  "Full Startup Growth Curriculum — 50+ strategic and tactical playbooks",
  "Tactical Projects and Templates — guided execution, not just theory",
  "AI Growth Co-Pilot — strategic guidance and tactical feedback on demand",
  "The Vault — tools, services, and resources, only for members",
  "Company-Specific Growth Paths — tailored to your business and goals",
  "Talent Collective — vetted growth agencies and experts when you're ready",
];

const companyLogos = ["Envoy", "Clearbit", "Microsoft", "Segment", "Sentry", "Zendesk", "Framer", "Outschool", "Superhuman", "OpenPhone"];

/* ─── Course card component ─── */

function CourseCard({ tag, tagColor, title, desc, index }: { tag: string; tagColor: string; title: string; desc: string; index: number }) {
  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    red: "bg-red-50 text-red-600 border-red-200",
    green: "bg-green-50 text-green-600 border-green-200",
  };
  return (
    <div className="border border-black/10 rounded-sm p-5 program-row-hover cursor-pointer group transition-colors">
      <div className="flex items-center gap-2 mb-4">
        <span className="gp-square" style={{ animationDelay: `${index * 0.3}s` }} />
        <span className={`text-[10px] font-mono-ui tracking-widest px-2 py-0.5 border ${colorMap[tagColor] || colorMap.blue}`}>
          {tag}
        </span>
      </div>
      <h4 className="font-heading text-base font-semibold mb-2 group-hover:text-black transition-colors">{title}</h4>
      <p className="text-neutral-500 text-xs leading-relaxed">{desc}</p>
    </div>
  );
}

/* ─── Path card component ─── */

function PathCard({ title, duration, desc }: { title: string; duration: string; desc: string }) {
  return (
    <div className="border border-black/10 rounded-sm p-6 program-row-hover cursor-pointer group transition-colors">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-heading text-lg font-semibold group-hover:text-black transition-colors">{title}</h4>
        <span className="font-mono-ui text-[10px] tracking-widest text-neutral-400 shrink-0 ml-4">{duration}</span>
      </div>
      <p className="text-neutral-500 text-sm leading-relaxed">{desc}</p>
      <div className="mt-4 font-mono-ui text-[10px] tracking-widest text-neutral-300">COMING SOON</div>
    </div>
  );
}

/* ─── Main page ─── */

export default function GrowthProgramPage() {
  const [activeUnlock, setActiveUnlock] = useState("learn");
  const [activeLibraryTab, setActiveLibraryTab] = useState("popular");

  const activeUnlockData = unlockTabs.find((t) => t.key === activeUnlock)!;

  const libraryTabs = [
    { key: "popular", label: "Most Popular" },
    { key: "paths", label: "Company Paths" },
    { key: "acquisition", label: "Customer Acquisition" },
    { key: "conversion", label: "Conversion & Monetization" },
  ];

  return (
    <div className="v2-world v2-bg text-[#1a1a1a] text-sm selection:bg-yellow-200 selection:text-black" style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace", position: "relative", zIndex: 2, overflowX: "clip" }}>
      {/* ── Side borders + checkerboard ── */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 50 }}>
        <div className="absolute top-0 bottom-0" style={{ left: 16, borderLeft: "1px solid rgba(0,0,0,0.10)" }} />
        <div className="absolute top-0 bottom-0" style={{ right: 16, borderRight: "1px solid rgba(0,0,0,0.10)" }} />
        <div
          className="absolute top-0 bottom-0 left-0"
          style={{
            width: 16,
            background: "repeating-conic-gradient(#e4e8ec 0% 25%, #eef1f4 0% 50%) 0 0 / 5px 5px",
          }}
        />
        <div
          className="absolute top-0 bottom-0 right-0"
          style={{
            width: 16,
            background: "repeating-conic-gradient(#e4e8ec 0% 25%, #eef1f4 0% 50%) 0 0 / 5px 5px",
          }}
        />
      </div>

      <V2Nav currentPage="GROWTH PROGRAM" />

      {/* Main content inside 17px side borders */}
      <div className="relative v2-bg" style={{ margin: "0 17px", zIndex: 3 }}>
        <div className="px-6">

      {/* Hero */}
      <header className="md:pt-32 md:pb-24 max-w-[1200px] mx-auto pt-24 pb-20 relative">
        <div className="section-tag mb-8">Growth Program</div>
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight mb-8">
          Build your<br />growth system
        </h1>
        <p className="text-lg md:text-xl font-light text-neutral-600 max-w-2xl leading-relaxed mb-10">
          Everything you need to architect and launch your startup&apos;s growth — strategy, channels, messaging, and more. The DIY path to a repeatable growth engine.
        </p>
        <div className="flex flex-wrap gap-4 mb-16">
          <a href="#pricing" className="glow-btn relative px-6 py-3 rounded-md font-medium text-sm flex items-center gap-2 overflow-hidden">
            <span className="relative z-10 flex items-center gap-2">Get Started <ArrowRight className="w-4 h-4" /></span>
          </a>
          <a href="#library" className="rainbow-hover border border-black/20 px-6 py-3 rounded-sm hover:bg-black/5 transition-colors font-medium text-base">
            Explore the Curriculum
          </a>
        </div>
        <div className="flex flex-wrap gap-6 font-mono-ui text-xs tracking-wide text-neutral-500">
          <span className="flex items-center gap-2"><Shield className="w-3.5 h-3.5" /> Backed by Y Combinator</span>
          <span className="flex items-center gap-2"><Users className="w-3.5 h-3.5" /> 3,500+ Startups</span>
          <span className="flex items-center gap-2"><Star className="w-3.5 h-3.5" /> 4.9/5 Rating (4,000+ Reviews)</span>
        </div>
      </header>

      {/* Logo Wall — scrolling marquee */}
      <div className="border-y border-black/10 py-4 overflow-hidden">
        <div className="marquee-content whitespace-nowrap">
          {[0, 1].map((i) => (
            <span key={i} className="flex items-center">
              {companyLogos.map((logo, j) => (
                <span key={`${i}-${j}`} className="px-8 font-heading text-lg font-medium text-neutral-400 tracking-tight">{logo}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <FadingLines />

      {/* Why We Built DC */}
      <section className="max-w-[1200px] mx-auto py-20 md:py-28">
        <div className="section-tag mb-6">Why We Built This</div>
        <div className="max-w-3xl">
          <h2 className="font-heading text-3xl md:text-5xl leading-tight tracking-tight mb-8">
            &ldquo;The traditional paths to growth were broken.&rdquo;
          </h2>
          <div className="space-y-4 text-neutral-600 font-light text-base leading-relaxed">
            <p>Our team has spent years leading growth at successful startups and working with hundreds more through our agency. Over time, we noticed a clear pattern: most founders don&apos;t struggle because they lack intelligence or hustle. They struggle because the traditional paths to growth are broken.</p>
            <p>Hiring elite marketers or agencies isn&apos;t in the cards for most startups. That leaves one option — trying to figure it out alone. And that&apos;s a very risky road.</p>
            <p className="text-black font-medium">That&apos;s why we built Demand Curve — to offer startups a better path.</p>
          </div>
          <div className="mt-8 font-mono-ui text-xs text-neutral-400">— Justin Setzer, Founder</div>
        </div>
      </section>

      {/* ═══ WHAT YOU UNLOCK — Toggle Section ═══ */}
      <section className="max-w-[1200px] mx-auto pb-20 md:pb-28">
        <div className="section-tag mb-6">What You Unlock</div>
        <h2 className="font-heading text-3xl md:text-4xl tracking-tight mb-12">
          What you unlock with your Demand Curve membership
        </h2>

        <div className="relative">
          {/* Corner caps */}
          <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-black" />
          <div className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-black" />
          <div className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-black" />
          <div className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-black" />

          <div className="grid grid-cols-1 md:grid-cols-[340px_1fr] gap-0 border border-black/[0.07] rounded-sm overflow-hidden">
            {/* Left column — toggles */}
            <div className="border-r border-black/[0.07] bg-gradient-to-b from-white/60 to-transparent">
              {unlockTabs.map((tab, tabIdx) => {
                const isActive = activeUnlock === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveUnlock(tab.key)}
                    className={`w-full text-left px-6 py-5 flex items-start gap-4 border-b border-black/[0.05] last:border-b-0 transition-colors duration-200 group ${
                      isActive ? "bg-white/80" : "hover:bg-white/40"
                    }`}
                  >
                    <span className="gp-square mt-1.5 shrink-0" style={{ animationDelay: `${tabIdx * 0.4}s` }} />
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-semibold mb-0.5 transition-colors ${isActive ? "text-black" : "text-neutral-600"}`}>
                        {tab.title}
                      </div>
                      <div className="text-neutral-400 text-xs leading-relaxed">{tab.description}</div>
                    </div>
                    <ChevronRight className={`w-4 h-4 mt-1 shrink-0 transition-colors ${isActive ? "text-neutral-400" : "text-neutral-200"}`} />
                  </button>
                );
              })}
            </div>

            {/* Right column — content */}
            <div className="p-8 md:p-10">
              <h3 className="font-heading text-2xl md:text-3xl font-medium tracking-tight mb-2">
                {activeUnlockData.contentTitle}
              </h3>
              <p className="text-neutral-500 text-sm mb-8">{activeUnlockData.contentSub}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeUnlockData.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-neutral-50 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-neutral-500" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold mb-0.5">{item.title}</div>
                      <div className="text-neutral-500 text-xs leading-relaxed">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof — Stats */}
      <section className="max-w-[1200px] mx-auto py-20 md:py-28 border-t border-black/10">
        <div className="section-tag mb-8">Results</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="border border-black/10 rounded-sm p-6 program-row-hover cursor-pointer transition-colors duration-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="gp-square" style={{ animationDelay: `${i * 0.5}s` }} />
                <span className="font-mono-ui text-[10px] tracking-widest text-neutral-400">{t.category.toUpperCase()}</span>
              </div>
              <div className="text-2xl md:text-3xl font-medium mb-4 tracking-tight">{t.stat}</div>
              <p className="text-neutral-600 text-sm mb-6 italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="font-mono-ui text-xs text-neutral-400">{t.name} — {t.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ COURSE LIBRARY — Tabbed Section ═══ */}
      <section id="library" className="border-y border-black/10">
        <div className="max-w-[1200px] mx-auto py-20 md:py-28">
          <h2 className="font-heading text-3xl md:text-5xl tracking-tight mb-4 text-center">
            Everything you need to build a growth engine
          </h2>
          <p className="text-neutral-500 font-light text-base mb-10 max-w-2xl mx-auto text-center">
            Unlock a growing library of 50+ premium courses, 560+ proven tactics, and 290+ deep-dive playbooks.
          </p>

          {/* Tab bar — editorial style */}
          <div className="flex border-b border-black/10 mb-10">
            {libraryTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveLibraryTab(tab.key)}
                className={`px-5 py-3 text-sm font-mono-ui border-r border-black/10 transition-colors ${
                  activeLibraryTab === tab.key
                    ? "bg-white text-black font-medium relative -mb-px border-b border-white"
                    : "text-neutral-400 hover:text-black"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          {activeLibraryTab === "popular" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {mostPopularCourses.map((c, i) => (
                <CourseCard key={i} {...c} index={i} />
              ))}
            </div>
          )}

          {activeLibraryTab === "paths" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {companyPaths.map((p, i) => (
                <PathCard key={i} {...p} />
              ))}
            </div>
          )}

          {activeLibraryTab === "acquisition" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {acquisitionCourses.map((c, i) => (
                <CourseCard key={i} {...c} index={i} />
              ))}
            </div>
          )}

          {activeLibraryTab === "conversion" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {conversionCourses.map((c, i) => (
                <CourseCard key={i} {...c} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* More Testimonials */}
      <section className="max-w-[1200px] mx-auto py-20 md:py-28">
        <div className="section-tag mb-8">What Founders Are Saying</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {moreTestimonials.map((t, i) => (
            <div key={i} className="border border-black/10 rounded-sm p-6 program-row-hover cursor-pointer transition-colors duration-300">
              <div className="flex items-center gap-2 mb-4">
                <span className="gp-square" style={{ animationDelay: `${i * 0.4}s` }} />
              </div>
              <p className="text-neutral-700 text-sm mb-6 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div className="font-mono-ui text-xs text-neutral-400">{t.name} — {t.title}</div>
            </div>
          ))}
        </div>
      </section>

      <FadingLines />

      {/* Comparison */}
      <section className="border-y border-black/10">
        <div className="max-w-[1200px] mx-auto py-20 md:py-28">
          <div className="section-tag mb-6">Compare</div>
          <h2 className="font-heading text-3xl md:text-4xl tracking-tight mb-12">There&apos;s a better way to grow your startup</h2>
          <div className="relative">
            <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-black" />
            <div className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-black" />
            <div className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-black" />
            <div className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-black" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-black/10 border border-black/10 rounded-sm overflow-hidden">
              <div className="bg-[#f7f7f4] p-6">
                <div className="font-mono-ui text-[10px] tracking-widest text-neutral-400 mb-4">THE OLD WAY</div>
                <h3 className="font-heading text-lg font-medium mb-6">Growth Advisors</h3>
                <div className="space-y-4 text-xs text-neutral-600">
                  <div><div className="font-mono-ui text-[10px] text-neutral-400 mb-1">COST</div>$5,000-15,000/month for strategic guidance. No execution.</div>
                  <div><div className="font-mono-ui text-[10px] text-neutral-400 mb-1">TIME TO VALUE</div>2-4 months to see if advice translates to results.</div>
                  <div><div className="font-mono-ui text-[10px] text-neutral-400 mb-1">RISK</div>Medium-high. Great advice means nothing if you can&apos;t execute.</div>
                </div>
              </div>
              <div className="bg-[#f7f7f4] p-6">
                <div className="font-mono-ui text-[10px] tracking-widest text-neutral-400 mb-4">THE OLD WAY</div>
                <h3 className="font-heading text-lg font-medium mb-6">Courses</h3>
                <div className="space-y-4 text-xs text-neutral-600">
                  <div><div className="font-mono-ui text-[10px] text-neutral-400 mb-1">COST</div>$100-$2,000. But your time is the real cost.</div>
                  <div><div className="font-mono-ui text-[10px] text-neutral-400 mb-1">TIME TO VALUE</div>Slow. Weeks of learning, very little doing.</div>
                  <div><div className="font-mono-ui text-[10px] text-neutral-400 mb-1">RISK</div>High. Generic advice, zero personalization.</div>
                </div>
              </div>
              <div className="bg-white p-6 ring-1 ring-black/20">
                <div className="font-mono-ui text-[10px] tracking-widest text-black mb-4">THE NEW WAY</div>
                <h3 className="font-heading text-lg font-medium mb-6">Demand Curve</h3>
                <div className="space-y-4 text-xs text-neutral-600">
                  <div><div className="font-mono-ui text-[10px] text-neutral-400 mb-1">COST</div><span className="text-black font-medium">$995/year</span> (or $300/quarter)</div>
                  <div><div className="font-mono-ui text-[10px] text-neutral-400 mb-1">TIME TO VALUE</div><span className="text-black font-medium">Day one.</span> Your path tells you what to do.</div>
                  <div><div className="font-mono-ui text-[10px] text-neutral-400 mb-1">RISK</div><span className="text-black font-medium">Low.</span> 7-day money-back guarantee.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Is It Right For You */}
      <section className="max-w-[1200px] mx-auto py-20 md:py-28">
        <div className="section-tag mb-6">Fit Check</div>
        <h2 className="font-heading text-3xl md:text-4xl tracking-tight mb-12">Is the Growth Program right for you?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <div className="font-mono-ui text-xs tracking-widest text-neutral-400 mb-4">YOU&apos;RE A FIT IF</div>
            <div className="space-y-3">
              {fitItems.map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="gp-square mt-1 shrink-0" style={{ animationDelay: `${i * 0.4}s` }} />
                  <span className="text-neutral-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="font-mono-ui text-xs tracking-widest text-neutral-400 mb-4">WHO&apos;S NOT A FIT</div>
            <div className="space-y-3">
              {notFitItems.map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <X className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                  <span className="text-neutral-500 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-y border-black/10">
        <div className="max-w-[1200px] mx-auto py-20 md:py-28">
          <div className="section-tag mb-6">Pricing</div>
          <h2 className="font-heading text-3xl md:text-4xl tracking-tight mb-4">One simple, flexible membership</h2>
          <p className="text-neutral-600 font-light text-base mb-12">Start building your growth strategy today.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            <div className="border border-black/10 rounded-sm p-6 bg-[#f7f7f4] hover:bg-white transition-colors">
              <div className="font-mono-ui text-[10px] tracking-widest text-neutral-400 mb-4">QUARTERLY</div>
              <div className="text-4xl font-medium mb-1">$100<span className="text-lg text-neutral-400 font-light">/mo</span></div>
              <div className="text-neutral-500 text-xs mb-6">Billed quarterly ($300/quarter)</div>
              <a href="#" className="glow-btn relative w-full py-3 rounded-md font-medium text-sm flex items-center justify-center gap-2 overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">Get Started <ArrowRight className="w-4 h-4" /></span>
              </a>
            </div>
            <div className="relative">
              {/* Corner caps on annual card */}
              <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-black" />
              <div className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-black" />
              <div className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-black" />
              <div className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-black" />
              <div className="border border-black/20 rounded-sm p-6 bg-white ring-1 ring-black/10 relative">
                <div className="absolute -top-3 right-4 font-mono-ui text-[10px] tracking-widest bg-black text-white px-2 py-0.5 rounded-sm">SAVE 17%</div>
                <div className="font-mono-ui text-[10px] tracking-widest text-neutral-400 mb-4">ANNUAL</div>
                <div className="text-4xl font-medium mb-1">$83<span className="text-lg text-neutral-400 font-light">/mo</span></div>
                <div className="text-neutral-500 text-xs mb-6">Billed annually ($995/year — save $205)</div>
                <a href="#" className="glow-btn relative w-full py-3 rounded-md font-medium text-sm flex items-center justify-center gap-2 overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">Get Started <ArrowRight className="w-4 h-4" /></span>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 max-w-3xl">
            <div className="font-mono-ui text-[10px] tracking-widest text-neutral-400 mb-4">INCLUDED IN BOTH PLANS</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {includedFeatures.map((f, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                  <span className="text-neutral-700 text-sm">{f}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 border border-black/10 rounded-sm p-6 max-w-md bg-[#f7f7f4]">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-4 h-4" />
              <span className="font-mono-ui text-[10px] tracking-widest">GUARANTEE</span>
            </div>
            <p className="text-neutral-600 text-sm">You have 7 days to assess if this program is for you. If you want a refund before the 7 days are up, you&apos;ll get one. No questions asked.</p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="max-w-[1200px] mx-auto py-20 md:py-28">
        <div className="section-tag mb-6">FAQs</div>
        <h2 className="font-heading text-3xl md:text-4xl tracking-tight mb-12">Everything you need to know</h2>
        <div className="max-w-3xl space-y-0 divide-y divide-black/10">
          {faqs.map((faq, i) => (
            <details key={i} className="group py-6 cursor-pointer">
              <summary className="rainbow-hover flex items-center list-none gap-3">
                <span className="gp-square shrink-0" style={{ animationDelay: `${i * 0.5}s` }} />
                <span className="font-heading text-base font-medium pr-4 flex-1">{faq.q}</span>
                <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0 group-open:rotate-180 transition-transform" />
              </summary>
              <p className="mt-4 ml-7 text-neutral-600 text-sm leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      <FadingLines />

      {/* Newsletter CTA */}
      <section className="border-t border-black/10">
        <div className="max-w-[1200px] mx-auto py-20 md:py-28 text-center">
          {/* Ornamental top rule */}
          <div className="flex items-center gap-2 mb-8 max-w-md mx-auto">
            <div className="flex-1 h-px bg-black/80" />
            <div className="w-1.5 h-1.5 border border-black rotate-45" />
            <span className="diamond-cycle" />
            <div className="w-1.5 h-1.5 border border-black rotate-45" />
            <div className="flex-1 h-px bg-black/80" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl tracking-tight mb-4">Not ready yet? Learn from us for free.</h2>
          <p className="text-neutral-600 font-light text-base mb-8 max-w-xl mx-auto flex items-center justify-center gap-2">
            <span className="marquee-square" />
            Join 90,000+ founders getting weekly insights that actually help them grow.
          </p>
          <div className="flex max-w-md mx-auto gap-2">
            <input type="email" placeholder="you@company.com" className="flex-1 border border-black/15 rounded-sm px-4 py-3 text-sm bg-transparent focus:outline-none focus:ring-1 focus:ring-black/20 placeholder:text-neutral-400" />
            <a className="glow-btn relative px-5 py-3 rounded-md text-sm font-medium shrink-0 flex items-center overflow-hidden cursor-pointer">
              <span className="relative z-10">Subscribe</span>
            </a>
          </div>
          {/* Ornamental bottom rule */}
          <div className="flex items-center gap-2 mt-8 max-w-md mx-auto">
            <div className="flex-1 h-px bg-black/80" />
            <div className="w-1.5 h-1.5 border border-black rotate-45" />
            <span className="diamond-cycle" />
            <div className="w-1.5 h-1.5 border border-black rotate-45" />
            <div className="flex-1 h-px bg-black/80" />
          </div>
        </div>
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

        </div>{/* end px-6 */}
      </div>{/* end margin wrapper */}
    </div>
  );
}
