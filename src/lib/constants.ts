import type { VaultItem, Pillar, FAQItem, PersonaCard, NavLink, Program, Differentiator, SocialProofStat } from "@/types";

// ─── Navigation ───────────────────────────────────────────────

export const HOME_NAV_LINKS: NavLink[] = [
  { label: "Programs", href: "#programs" },
  { label: "Approach", href: "#approach" },
  { label: "Newsletter", href: "#newsletter" },
];

export const COLLECTIVE_NAV_LINKS: NavLink[] = [
  { label: "Programs", href: "#programs" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Apply", href: "#apply" },
];

export const FRONTIER_NAV_LINKS: NavLink[] = [
  { label: "Research", href: "#preview" },
  { label: "Events", href: "#events" },
  { label: "Tools", href: "#tools" },
  { label: "Launch Pad", href: "#launchpad" },
];

export const SATURATION_NAV_LINKS: NavLink[] = [
  { label: "The Problem", href: "#problem" },
  { label: "Approach", href: "#pillars" },
  { label: "Get Audit", href: "#cta" },
];

// ─── DC Homepage Content ──────────────────────────────────────

export const HOME_HERO = {
  label: "GROWTH ARCHITECTS",
  headline: "We architect\ngrowth.",
  subhead:
    "Most companies stack tactics. We build the system that makes them compound. Growth strategy, systems, and execution for tech companies that are done guessing.",
  cta: "Work With Us",
  ctaSource: "home-hero",
};

export const HOME_SOCIAL_PROOF: SocialProofStat[] = [
  { value: "4,500+", label: "Companies trained" },
  { value: "100K+", label: "Growth operators" },
  { value: "18", label: "Unicorns in network" },
  { value: "10", label: "Years of methodology" },
];

export const HOME_PHILOSOPHY = {
  label: "THE FOUNDATIONAL FIVE",
  headline: "Growth is architecture,\nnot alchemy.",
  body: "Most companies don't have a growth problem. They have a systems problem. They hire for channels, optimize in silos, and wonder why nothing compounds.",
  body2: "A growth engine is different. It's the alignment of five forces — your market, your product, your channels, your model, and your brand — into a system that builds on itself.",
  body3: "We call it the Foundational Five. We've spent 10 years refining it across 4,500+ companies. And it's the lens behind everything we do.",
  pillars: ["Market", "Product", "Channel", "Model", "Brand"],
};

export const HOME_PROGRAMS: Program[] = [
  {
    id: "growth-architecture",
    name: "Growth Architecture",
    description: "We audit, design, and build your complete growth system — market positioning, channel strategy, growth model, and the operating system to scale it.",
    status: "Active",
  },
  {
    id: "paid-acquisition-engines",
    name: "Paid Acquisition Engines",
    description: "Your paid growth motion — designed, launched, and scaled by a 15-year veteran. Strategy, creative, media buying, and measurement built as a system, not a collection of campaigns.",
    status: "Active",
  },
  {
    id: "ai-search-engines",
    name: "AI Search Engines",
    description: "AI is rewriting how buyers discover products. We build your presence across the platforms where AI recommends solutions — before your competitors figure it out.",
    href: "/saturation",
    status: "Active",
  },
  {
    id: "story-systems",
    name: "Story Systems",
    description: "Your positioning and messaging aren't a one-time exercise. They're the operating system your entire go-to-market runs on. We build the narrative framework that makes your growth engine resonate.",
    status: "Active",
  },
  {
    id: "growth-catalysts",
    name: "Growth Catalysts",
    description: "The specific levers that unlock your next phase of growth. We identify, prioritize, and activate the highest-impact opportunities hiding in your engine.",
    status: "Coming Soon",
  },
  {
    id: "growth-models",
    name: "Growth Models",
    description: "Your pricing, packaging, and monetization strategy aren't just business decisions — they're growth levers. We build the model that makes everything else compound.",
    status: "Coming Soon",
  },
  {
    id: "growth-systems",
    name: "Growth Systems",
    description: "The operating system that turns strategy into execution. Processes, metrics, cadences, and tooling that make growth repeatable — not dependent on heroics.",
    status: "Coming Soon",
  },
  {
    id: "intelligence-systems",
    name: "Intelligence Systems",
    description: "Competitive intelligence, market analysis, and ongoing research that keeps your growth engine ahead of the market. The signal, without the noise.",
    status: "Coming Soon",
  },
];

export const HOME_DIFFERENTIATORS: Differentiator[] = [
  {
    title: "Strategy-first",
    description: "We diagnose before we prescribe. Every engagement starts with understanding how your engine actually works.",
  },
  {
    title: "Framework-driven",
    description: "10 years of methodology across 4,500+ companies. Not guesswork. Not best practices. A system.",
  },
  {
    title: "Senior operators only",
    description: "No juniors. No handoffs. You work with people who've been architecting growth for a decade or more.",
  },
  {
    title: "No lock-ins",
    description: "90-day minimum, then month-to-month. We earn it every month.",
  },
  {
    title: "Frontier intelligence",
    description: "Insights from our 100,000+ operator community and years of proprietary research keep your engine ahead of the market.",
  },
];

export const HOME_LEARN = {
  label: "BUILD IT YOURSELF",
  headline: "Want to learn how\nwe architect growth?",
  description: "Join 4,500+ founders and operators who use our methodology to build their own. The same Foundational Five framework. The same playbooks. The same systems we use with our clients — taught step by step.",
  cta: "Explore the Growth Program",
  href: "https://www.demandcurve.com/growth-program",
};

// ─── The Collective Content ───────────────────────────────────

export const COLLECTIVE_HERO = {
  label: "THE COLLECTIVE",
  headline: "Growth programs built\nwith frontier operators.",
  subhead:
    "Each program is led by a specialist who's done this before — at scale, with real budgets, for companies you've heard of. We don't outsource. We co-build.",
};

export const COLLECTIVE_PROGRAMS = [
  {
    id: "paid-acquisition",
    label: "PAID ACQUISITION",
    title: "Scale paid channels without burning cash.",
    description:
      "Meta, Google, LinkedIn — full-funnel strategy, creative testing, and budget optimization from operators who've scaled $1M+ monthly budgets.",
    partner: "Led by PixelFolk",
    status: "Active" as const,
    accentColor: "#ff6b35",
  },
  {
    id: "ai-search-strategy",
    label: "AI SEARCH STRATEGY",
    title: "Own your brand in AI search results.",
    description:
      "How ChatGPT, Perplexity, and Gemini describe your brand isn't an SEO problem — it's a content problem. Purpose-built for the AI search era.",
    partner: "Led by Saturation",
    status: "Active" as const,
    accentColor: "#ff6b35",
    href: "/saturation",
  },
  {
    id: "growth-pair",
    label: "GROWTH TALENT",
    title: "Full-time growth operators. $4K/mo. Simple.",
    description:
      "Need reliable hands to execute your growth strategy? Growth Pair places vetted, full-time offshore growth operators on your team. Predictable cost, proven talent.",
    partner: "Powered by Growth Pair",
    status: "Active" as const,
    accentColor: "#ff6b35",
    href: "https://www.growthpair.com/",
  },
  {
    id: "messaging-positioning",
    label: "MESSAGING & POSITIONING",
    title: "Say what your customers need to hear.",
    description:
      "Positioning, messaging hierarchy, value props, and landing page strategy from practitioners who've repositioned companies from Series A through IPO.",
    partner: "Coming Soon",
    status: "Coming Soon" as const,
    accentColor: "#ff6b35",
  },
];

export const COLLECTIVE_HOW_IT_WORKS = [
  {
    step: "01",
    title: "Tell us what you need",
    description: "Your company, your growth challenges, what you've already tried, and where you want to go.",
  },
  {
    step: "02",
    title: "We recommend a program",
    description: "Based on your situation, we route you to the right program — or tell you honestly if we're not the fit.",
  },
  {
    step: "03",
    title: "The team executes",
    description: "Each program has its own dedicated team. Strategy, execution, and results — not slide decks.",
  },
];

// ─── The Frontier Content ─────────────────────────────────────

export const FRONTIER_HERO = {
  label: "THE FRONTIER",
  headline: "Your edge in\nstartup growth.",
  subhead:
    "Curated research, tools, events, and insights to keep you on the frontier. From the operators who've built the companies you study.",
};

export const FRONTIER_WHATS_INSIDE = [
  {
    title: "Teardowns",
    description:
      "Deep dives into how real companies acquire, convert, and retain — with the receipts.",
    icon: "01",
  },
  {
    title: "Playbooks",
    description:
      "Step-by-step systems you can deploy this week. No theory. Just the moves.",
    icon: "02",
  },
  {
    title: "Research",
    description:
      "Original data and analysis on what's working now — across ads, funnels, messaging, and channels.",
    icon: "03",
  },
  {
    title: "Frameworks",
    description:
      "Mental models for growth decisions. The thinking tools behind the tactics.",
    icon: "04",
  },
];

export const FRONTIER_OPERATORS = [
  { name: "Elena Verna", role: "Growth, Miro / Amplitude / Dropbox" },
  { name: "Andrew Chen", role: "Growth, a16z / Uber" },
  { name: "Casey Winters", role: "Growth, Eventbrite / Pinterest / Grubhub" },
  { name: "Lenny Rachitsky", role: "Product & Growth, Airbnb" },
  { name: "Hiten Shah", role: "Founder, FYI / Crazy Egg / KISSmetrics" },
  { name: "Kieran Flanagan", role: "Growth, HubSpot / Zapier" },
  { name: "Guillaume Cabane", role: "Growth, Drift / Segment" },
  { name: "Daphne Tideman", role: "Growth, Stitcher / Wondery" },
  { name: "Sean Ellis", role: "Growth, Dropbox / Eventbrite" },
  { name: "Brian Balfour", role: "CEO, Reforge / VP Growth, HubSpot" },
  { name: "Camille Ricketts", role: "Marketing, Notion / First Round" },
  { name: "Adam Fishman", role: "Growth, Lyft / Patreon / Imperfect Foods" },
];

export const FRONTIER_EVENTS = [
  {
    title: "SaaStr Annual 2026",
    date: "Sep 10–12",
    location: "San Francisco",
    tag: "Conference",
    url: "#",
  },
  {
    title: "Growth Summit by Reforge",
    date: "Mar 18",
    location: "Virtual",
    tag: "Virtual",
    url: "#",
  },
  {
    title: "Product-Led Summit",
    date: "Apr 8–9",
    location: "New York",
    tag: "Conference",
    url: "#",
  },
  {
    title: "Pavilion CMO Summit",
    date: "May 6",
    location: "Austin",
    tag: "Invite-Only",
    url: "#",
  },
];

export const FRONTIER_TOOLS = [
  {
    name: "Clay",
    description: "AI-powered data enrichment and outbound sequencing.",
    tag: "Outbound",
    url: "#",
  },
  {
    name: "Positional",
    description: "Content analytics and SEO tooling purpose-built for startups.",
    tag: "SEO",
    url: "#",
  },
  {
    name: "Snitcher",
    description: "Website visitor identification. See which companies visit your site.",
    tag: "Analytics",
    url: "#",
  },
  {
    name: "Arcade",
    description: "Interactive product demos for landing pages and sales.",
    tag: "Product-Led",
    url: "#",
  },
  {
    name: "Perplexity",
    description: "AI search that's changing how buyers discover products.",
    tag: "AI",
    url: "#",
  },
  {
    name: "Lovable",
    description: "AI-first web app builder. Ship MVPs in hours, not weeks.",
    tag: "AI",
    url: "#",
  },
];

export const FRONTIER_LAUNCHPAD = {
  headline: "Launch Pad",
  description:
    "Built something for startups? Submit your product to be featured in front of 100K+ growth operators. Free.",
  cta: "Submit Your Product",
  featured: [
    { name: "Stellate", tagline: "GraphQL CDN for faster APIs", tag: "Developer Tools" },
    { name: "Mintlify", tagline: "Beautiful docs that convert", tag: "Developer Tools" },
    { name: "Fathom Analytics", tagline: "Privacy-first website analytics", tag: "Analytics" },
  ],
};

// ─── DC Premium / Vault Content (legacy, used by Frontier) ───

export const DC_HERO = {
  label: "DEMAND CURVE",
  headline: "Where the best growth\noperators sharpen\ntheir edge.",
  subhead:
    "Original research, teardowns, and frameworks from the operators who've scaled the companies you study.",
  cta: "Get Early Access",
  ctaSource: "dc-hero",
};

export const WHATS_INSIDE = [
  {
    title: "Teardowns",
    description:
      "Deep dives into how real companies acquire, convert, and retain — with the receipts.",
    icon: "01",
  },
  {
    title: "Playbooks",
    description:
      "Step-by-step systems you can deploy this week. No theory. Just the moves.",
    icon: "02",
  },
  {
    title: "Research",
    description:
      "Original data and analysis on what's working now — across ads, funnels, messaging, and channels.",
    icon: "03",
  },
  {
    title: "Frameworks",
    description:
      "Mental models for growth decisions. The thinking tools behind the tactics.",
    icon: "04",
  },
];

export const VAULT_ITEMS: VaultItem[] = [
  {
    id: "v1",
    title: "How Notion Built a $10B Bottom-Up Engine",
    description:
      "Full teardown of Notion's PLG motion — viral loops, template marketplace, community-led growth.",
    category: "teardown",
    type: "teardown",
    locked: true,
  },
  {
    id: "v2",
    title: "The Meta Ads Scaling Playbook",
    description:
      "How to go from $5K to $500K/mo in Meta spend without killing your ROAS. Real numbers, real campaigns.",
    category: "playbook",
    type: "playbook",
    locked: true,
  },
  {
    id: "v3",
    title: "Positioning That Converts: 47 Examples",
    description:
      "We analyzed 47 high-growth startups' positioning. Here's what separates the best from the rest.",
    category: "research",
    type: "research",
    locked: true,
  },
  {
    id: "v4",
    title: "The Foundational Five Framework",
    description:
      "Market, Product, Brand, Model, Channel — the DNA lens for diagnosing any company's growth.",
    category: "framework",
    type: "framework",
    locked: true,
  },
  {
    id: "v5",
    title: "How Linear Wins Without Marketing",
    description:
      "Linear barely markets. They still win. A teardown of product-led growth done with taste.",
    category: "teardown",
    type: "teardown",
    locked: true,
  },
  {
    id: "v6",
    title: "Cold Outbound That Actually Works",
    description:
      "The outbound sequences getting 30%+ reply rates in 2026. Templates, timing, and targeting.",
    category: "playbook",
    type: "playbook",
    locked: true,
  },
  {
    id: "v7",
    title: "Landing Page Conversion Benchmarks 2026",
    description:
      "What good looks like across 12 industries. Median, top-quartile, and top-decile conversion rates.",
    category: "research",
    type: "research",
    locked: true,
  },
  {
    id: "v8",
    title: "The Channel-Market Fit Model",
    description:
      "Not every channel works for every business. A framework for picking the right ones first.",
    category: "framework",
    type: "framework",
    locked: true,
  },
  {
    id: "v9",
    title: "Stripe's Developer Marketing Machine",
    description:
      "How Stripe turned developer experience into the most effective growth channel in fintech.",
    category: "teardown",
    type: "teardown",
    locked: true,
  },
];

export const VAULT_CATEGORIES = [
  "all",
  "teardown",
  "playbook",
  "research",
  "framework",
];

// ─── Saturation Content ───────────────────────────────────────

export const SATURATION_HERO = {
  label: "SATURATION",
  headline: "Search changed.\nYour agency didn't.",
  subhead:
    "Most agencies added AI search to their menu. We built an agency around it.",
  cta: "Get Your AI Brand Audit",
  ctaSource: "saturation-audit",
};

export const SATURATION_PROBLEM = {
  label: "THE PROBLEM",
  headline: "AI doesn't rank your page.\nIt tells your story.",
  body: [
    "Most agencies treat AI search like SEO with new keywords. But AI doesn't just show your link — it tells your story, positions you, compares you, recommends you.",
    "That's not a search problem. That's a content problem.",
    "For two decades, companies accepted a trade-off: let the SEO team write off-brand content for Google's algorithm, hide it from real customers, and call it a necessary evil. Now AI is reading all of that content and using it to describe your brand to every future customer.",
    "The filler you buried on your blog is shaping how ChatGPT introduces you.",
    "85% of the information AI uses to describe your brand comes from outside your website. That's not a threat — that's 85% more surface area to tell your story the right way.",
  ],
};

export const SATURATION_PILLARS: Pillar[] = [
  {
    id: "p1",
    number: 1,
    title: "The Great Reset",
    headline:
      "For the first time since search engines existed, incumbents are losing their structural advantage.",
    body: "For nearly three decades, search has been a compounding game. The longer you'd been building authority — backlinks, domain authority, content volume — the harder you were to catch. AI search breaks that dynamic. LLMs don't weight tenure the way Google's algorithm does — they weight clarity, relevance, and signal quality across the information ecosystem. The brands that move first into this new landscape set the terms.",
    whyItWorks:
      "This is the FOMO driver. It frames inaction as missing a historic window. Speaks directly to well-funded disruptors who want to take market share from entrenched incumbents.",
  },
  {
    id: "p2",
    number: 2,
    title: "85% More Surface Area",
    headline:
      "You're no longer confined to three blue links. 85% of the information AI uses to describe your brand comes from outside your website.",
    body: "In traditional search, you fought for 3 truly visible organic spots. In AI search, a typical response mentions 3-8 brands by name with contextual descriptions and comparisons, provides 5-15 source citations, and the user can ask follow-ups. That's not '10 results down to 1' — AI search creates more inventory, not less. You just got a massive new surface area to shape how the world discovers you.",
    whyItWorks:
      "Reframes the stat as opportunity, not threat. Counters the fear-based 'AI search is winner-take-all' narrative.",
  },
  {
    id: "p3",
    number: 3,
    title: "Purpose-Built, Not Bolted On",
    headline:
      "Everyone else added AI search to their menu. We built the agency around it.",
    body: "Most agencies offering 'AEO' or 'GEO' aren't doing anything meaningfully different. Same SEO team, same process, same deliverables, new line item on the invoice. Ask your AEO agency what they're actually doing differently from your old SEO retainer. If the answer sounds familiar, it is. Saturation was built from the ground up — specifically for a world where the answer IS the result.",
    whyItWorks:
      "Structural differentiator and a confrontational hook. Calls out the industry's repackaging problem directly.",
  },
  {
    id: "p4",
    number: 4,
    title: "Brand, Not Just Presence",
    headline:
      "When have you ever let your SEO team build your brand? That's what's happening right now.",
    body: "AI search doesn't just decide IF you appear. It decides HOW you appear — what you're known for, who you're compared to, whether you're recommended or dismissed. Most companies spent years accepting that SEO content compromises their brand. AI doesn't know your blog is 'just for SEO.' It treats all that content as representative of who you are. The compromise that was tolerable for Google is actively damaging in AI search.",
    whyItWorks:
      "Makes the brand angle concrete and visceral. Everyone has experienced off-brand SEO content.",
  },
  {
    id: "p5",
    number: 5,
    title: "Bigger Than Search",
    headline:
      "Today it's AI answers. Tomorrow it's AI agents making purchase decisions.",
    body: "AI search is the entry point, but the real shift is agentic commerce — AI agents evaluating vendors, comparing products, and making buying recommendations on behalf of humans. How your brand is represented in AI systems isn't a marketing channel. It's becoming infrastructure. Early movers build the foundation now.",
    whyItWorks:
      "Forward-looking, creates urgency for early investment, positions Saturation as thinking further ahead than competitors.",
  },
  {
    id: "p6",
    number: 6,
    title: "AEO Is Content Marketing",
    headline:
      "AEO sounds complicated. It's not. It's content marketing — done by the wrong people.",
    body: "Strip away the jargon: shaping how AI describes your brand means creating great content and placing it strategically across the ecosystem. That's content marketing. The agencies making it sound like a complex technical discipline are the SEO shops who need it to feel new and specialized. The technical components are real — but they're ~20% of the work. The other 80% is content strategy and execution.",
    whyItWorks:
      "The most confrontational pillar. Demystifies the entire category and positions Saturation as the honest alternative.",
  },
];

export const SATURATION_PERSONAS: PersonaCard[] = [
  {
    title: "The Disruptor",
    subtitle: "Series B / Series C",
    description:
      "Well-funded. Growing fast. Wants to own their market. Sees AI search as the window to leapfrog incumbents.",
    traits: [
      "50-500 employees",
      "$10-100M revenue",
      "Has marketing team",
      "Offensive mindset",
    ],
    mindset: "How do we win?",
  },
  {
    title: "The Disrupted Incumbent",
    subtitle: "Mid to Upper Mid-Market",
    description:
      "Established SEO. Starting to see cracks. Unexplained traffic drops. AI answers cannibalizing content.",
    traits: [
      "500-5,000 employees",
      "$50M-500M revenue",
      "Heavy SEO investment",
      "Defensive mindset",
    ],
    mindset: "We're losing something and don't understand why.",
  },
  {
    title: "The Early-Stage Challenger",
    subtitle: "Seed / Series A",
    description:
      "Scrappy. Limited budget. Sees AI search as a way to punch above their weight without years of SEO authority.",
    traits: [
      "10-50 employees",
      "$1-10M revenue",
      "Limited marketing budget",
      "Opportunistic mindset",
    ],
    mindset: "Is this my shortcut?",
  },
];

export const SATURATION_STATS = [
  { value: "100K+", label: "Growth operators in our network" },
  { value: "600+", label: "Clients served across both teams" },
  { value: "85%", label: "Of AI brand info is off-site" },
  { value: "94%", label: "Of CMOs increasing AEO spend in 2026" },
];

export const SATURATION_FAQ: FAQItem[] = [
  {
    question: "What exactly is AI search strategy?",
    answer:
      "It's the discipline of shaping how AI systems — ChatGPT, Perplexity, Gemini, Google AI Overviews — describe, recommend, and position your brand. Unlike traditional SEO, which optimizes for page rankings, AI search strategy orchestrates your brand presence across the entire information ecosystem that AI models read.",
  },
  {
    question: "How is this different from SEO?",
    answer:
      "SEO optimizes your website for Google's ranking algorithm. AI search strategy shapes how language models understand and represent your brand — which pulls from your entire digital footprint, not just your website. 85% of the information AI uses comes from third-party sources. Same goal, fundamentally different discipline.",
  },
  {
    question: "What's included in the AI Brand Audit?",
    answer:
      "A comprehensive diagnostic of how your brand appears across ChatGPT, Perplexity, Gemini, and Google AI Overviews. We analyze where you're mentioned, how you're positioned, who you're compared to, what's missing, and where competitors are outperforming you in AI search results.",
  },
  {
    question: "Who is Saturation for?",
    answer:
      "Primarily Series B-C startups who want to take market share from incumbents, and mid-market companies who are seeing unexplained traffic drops. If you have strong Google rankings but suspect AI search is changing the landscape — we should talk.",
  },
  {
    question: "What does 'Demand Curve x Galactic Fed' mean?",
    answer:
      "Saturation is a joint venture between Demand Curve (100K+ growth operators, proprietary frameworks) and Galactic Fed (600+ clients, deep search expertise). DC brings the strategic intelligence. GFed brings the operators and infrastructure. Neither could build this alone.",
  },
  {
    question: "Can't our existing SEO agency handle this?",
    answer:
      "Ask them what they'd do differently for AI search versus traditional SEO. If the answer sounds like your current retainer with new labels, that's your answer. Most 'AEO' offerings are repackaged SEO. Saturation was purpose-built for AI search from day one.",
  },
];
