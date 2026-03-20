/* ═══════════════════════════════════════════════
   FRONTIER DATA — Ported from DC Premium
   ═══════════════════════════════════════════════ */

export type SkillData = {
  tag: string;
  subtitle: string;
  about: string;
  helps: string[];
  prompts: string[];
  greeting: string;
  greeting2: string;
};

export type TeardownData = {
  tag: string;
  subtitle: string;
  about: string;
  learns: string[];
  tags: string[];
  content: string;
};

export type PlaybookData = {
  type?: string;
  tag: string;
  subtitle: string;
  about: string;
  learns: string[];
  tags: string[];
  content: string;
};

export type NewsletterData = {
  title: string;
  date: string;
  topic: string;
  url: string;
  takeaways?: string[];
  content: string;
};

export type SOPData = {
  category: string;
  tags: string[];
  author: string;
  overview: string;
  whenToUse: string[];
  tools: { name: string; desc: string }[];
  steps: { title: string; content: string }[];
  template?: { label: string; content: string };
  tips: { icon: "tip" | "warning"; title: string; content: string }[];
  stats: { value: string; label: string }[];
  related: { type: string; name: string; desc: string; view: string }[];
};

/* ─── Skills ─── */

export const skillData: Record<string, SkillData> = {
  "Story Systems": {
    tag: "Messaging",
    subtitle: "Build your complete brand messaging foundation — the master playbook that powers all your downstream marketing.",
    about: "Story Systems walks you through 12 components to build a reusable messaging foundation: Core Story, Brand Archetype, Voice & Tone, Personas, Core Problems, Value Propositions, Persona Value Props, Hooks, Funnel Messaging Map, CTAs, Ad Copy, and Landing Page Copy. Think of it like a box of Lego blocks — modular messaging pieces you assemble into different experiences for different people across different touchpoints.",
    helps: [
      "Core Story — why you exist, who you help, how you help them",
      "Brand Archetype & Voice — how you show up and sound",
      "Personas — based on Jobs-to-be-Done, not demographics",
      "Value Propositions — using the PISB framework (Problem, Implications, Solution, Benefits)",
      "Copy Hooks — 10 frameworks x 3 hooks per persona = dozens of angles",
      "Funnel Messaging Map — what to say at each stage of the buyer journey",
      "CTAs, Ad Funnel Copy & Landing Page Copy",
    ],
    prompts: [
      "Build me a complete Story System for my SaaS product from scratch",
      "Create 3 personas based on Jobs-to-be-Done for my B2B tool",
      "Generate value proposition hooks using all 10 hook frameworks",
      "Map my messaging across the funnel — awareness, consideration, decision, retention",
    ],
    greeting: "Hey! I'm your brand messaging specialist. I help you build a complete Story System — the master messaging hub that powers all your marketing.",
    greeting2: "Tell me about your product and who it's for, and I'll walk you through each piece one at a time.",
  },
  "Growth Strategy": {
    tag: "Strategy",
    subtitle: "Build your master growth playbook — how to acquire, monetize, and retain customers with a complete strategic framework.",
    about: "Growth Strategy helps you build a complete, reusable growth playbook across 8 components: the Foundational Five (Market, Product, Brand, Model, Channel — each scored 1-5), Fit Mechanics between those pillars, Growth Catalysts (structural advantages that compound), Growth Guardrails (North Star metric, SMART goals, unit economics), Growth Motions (Acquisition, Monetization, Retention), Strategy Synthesis, Acquisition Strategy, and Monetization & Pricing Strategy.",
    helps: [
      "Foundational Five — score your Market, Product, Brand, Model, and Channel fit (1-5)",
      "Fit Mechanics — assess alignment between all 6 pairs of foundational elements",
      "Growth Catalysts — identify structural advantages (Network Effects, Switching Costs, Scale Economies, etc.)",
      "Growth Guardrails — North Star metric, SMART goals, constraints, unit economics",
      "Growth Motions — Acquisition, Monetization, and Retention mechanisms",
      "Strategy Synthesis — diagnosis and plan of attack (Good Strategy / Bad Strategy framework)",
      "Acquisition channels, flywheels, and monetization/pricing strategy",
    ],
    prompts: [
      "Score my Foundational Five and tell me where I'm weakest",
      "Build a complete growth strategy for my early-stage SaaS product",
      "Help me define my North Star metric and set SMART growth goals",
      "Design my acquisition, monetization, and retention motions",
    ],
    greeting: "Hey! I'm your growth strategy specialist. I help you build a complete Growth Strategy — the master playbook that defines how to acquire, monetize, and retain customers.",
    greeting2: "Tell me about your product, your market, and where you are right now, and I'll walk you through each section.",
  },
  "Content & SEO": {
    tag: "Content",
    subtitle: "Plan your content strategy, write outlines, and optimize for search engines.",
    about: "Content & SEO helps you plan what to write, how to structure it, and how to make sure it ranks. Covers topic clusters, keyword strategy, content calendars, and on-page SEO optimization.",
    helps: [
      "Content strategy and topic planning",
      "Keyword research and clustering",
      "Blog post outlines and structures",
      "On-page SEO optimization",
      "Content calendar creation",
    ],
    prompts: [
      "Plan a content strategy for my B2B SaaS blog",
      "Build a topic cluster around my main keyword",
      "Write an SEO-optimized outline for this topic",
    ],
    greeting: "Hey! I'm your content and SEO specialist. I can help you plan what content to create, structure it for search, and build a strategy that drives organic traffic.",
    greeting2: "What's your product or site about? I'll help you figure out what to write and how to rank for it.",
  },
  "Paid Ads": {
    tag: "Ads",
    subtitle: "Campaign strategy, ad copy, audience targeting, and budget optimization across all major platforms.",
    about: "Paid Ads helps you build and optimize ad campaigns across Google, Meta, LinkedIn, and more. Covers campaign structure, ad copy, audience targeting, budget allocation, and performance optimization.",
    helps: [
      "Campaign strategy and structure",
      "Ad copy and creative direction",
      "Audience targeting and segmentation",
      "Budget allocation and bidding strategy",
      "Performance optimization and ROAS improvement",
    ],
    prompts: [
      "Build a Meta ads campaign strategy for my SaaS launch",
      "Write ad copy variations for my top 3 value propositions",
      "Help me structure my Google Ads account for better ROAS",
    ],
    greeting: "Hey! I'm your paid ads specialist. I help with campaign strategy, ad copy, targeting, and optimization across Google, Meta, LinkedIn, and more.",
    greeting2: "Tell me about your product, your budget, and what platforms you're running on. I'll help build a campaign strategy that converts.",
  },
  "CRO & Funnels": {
    tag: "CRO",
    subtitle: "Optimize pages, forms, and conversion flows to turn more visitors into customers.",
    about: "CRO & Funnels helps you identify and fix conversion bottlenecks across your entire funnel — from landing pages and signup flows to onboarding and upgrade screens.",
    helps: [
      "Landing page conversion optimization",
      "Signup and registration flow improvements",
      "Form optimization and friction reduction",
      "Onboarding and activation rate improvements",
      "A/B test planning and hypothesis design",
    ],
    prompts: [
      "Audit my landing page and suggest conversion improvements",
      "Optimize my signup flow to reduce dropoff",
      "Help me plan an A/B test for my pricing page",
    ],
    greeting: "Hey! I'm your conversion optimization specialist. I help you find and fix the leaks in your funnel.",
    greeting2: "Share a page URL or describe your current funnel, and I'll help you identify what's killing your conversion rate.",
  },
  "Email & Lifecycle": {
    tag: "Email",
    subtitle: "Email sequences, drip campaigns, and lifecycle programs that retain and convert.",
    about: "Email & Lifecycle helps you build automated email sequences for every stage — welcome series, nurture campaigns, re-engagement flows, and upgrade sequences. Covers subject lines, timing, segmentation, and copy.",
    helps: [
      "Welcome and onboarding email sequences",
      "Nurture and drip campaigns",
      "Re-engagement and win-back flows",
      "Upgrade and expansion email sequences",
      "Subject line optimization and send timing",
    ],
    prompts: [
      "Build a 7-email welcome sequence for new signups",
      "Write a re-engagement sequence for churned users",
      "Help me plan a lifecycle email program from signup to upgrade",
    ],
    greeting: "Hey! I'm your email and lifecycle specialist. I help you build automated email sequences that guide people from signup through activation, retention, and upgrade.",
    greeting2: "Tell me about your product and where in the lifecycle you need help — onboarding, nurture, re-engagement, or upgrade.",
  },
};

/* ─── Teardowns ─── */

export const teardownData: Record<string, TeardownData> = {
  Zapier: {
    tag: "SaaS",
    subtitle: "A psychological, UX, and copywriting breakdown of Zapier's landing page.",
    about: "Zapier is a no-code automation tool connecting 5,000+ apps. This teardown examines how their landing page uses clarity, social proof, and smart CTAs to convert visitors.",
    learns: ["Above-the-fold headline hierarchy", "Social proof placement strategy", "CTA copy that reduces friction", "How they handle complex product messaging", "Visual hierarchy and scanning patterns"],
    tags: ["SaaS", "Automation", "B2B"],
    content: "The Hero Section\n\nZapier leads with an incredibly clear value proposition: \"Automate your work across 5,000+ apps.\" No jargon, no fluff. The subhead immediately answers \"how\" — by connecting your favorite tools without writing code.\n\nSocial Proof Strategy\n\nBelow the fold, Zapier doesn't just list logos — they show the number of companies using the platform. This quantified social proof is more persuasive than a generic logo bar because it implies scale and reliability.\n\nCTA Analysis\n\nThe primary CTA \"Start free with email\" reduces friction by making it clear there's no credit card required. The secondary CTA \"Start free with Google\" adds a one-click option for even lower friction.",
  },
  Segment: {
    tag: "Data",
    subtitle: "How Segment uses clear messaging to sell a complex data product.",
    about: "Segment is a customer data platform by Twilio. Their landing page turns a highly technical product into a clear, compelling story.",
    learns: ["Simplifying complex products", "Feature-benefit framing", "Trust signals for enterprise", "Progressive disclosure of information", "Handling multiple audiences"],
    tags: ["SaaS", "Data", "Enterprise"],
    content: "Making Complex Simple\n\nSegment's hero doesn't try to explain their entire platform. Instead, it focuses on a single benefit: \"Clean, reliable customer data.\" This is smart because CDPs are notoriously hard to explain.\n\nThe Trust Stack\n\nEnterprise buyers need reassurance. Segment layers trust signals: Fortune 500 logos, specific metrics (\"25,000+ companies\"), and a security/compliance section. Each layer addresses a different objection.",
  },
  Adaface: {
    tag: "HR Tech",
    subtitle: "How Adaface uses psychology and UX to drive sign-ups for their assessment platform.",
    about: "Adaface builds AI-powered candidate assessments. Their page uses clever psychological techniques to drive conversions.",
    learns: ["Fear-of-missing-out triggers", "Comparison positioning", "Interactive demo CTAs", "Benefit-driven headlines"],
    tags: ["SaaS", "HR Tech"],
    content: "Positioning Against the Status Quo\n\nAdaface positions against traditional assessments immediately: \"Candidates love Adaface.\" This flips the script — instead of focusing on what employers get, they lead with candidate experience, which is the #1 pain point in hiring.",
  },
  "Customer.io": {
    tag: "Email Marketing",
    subtitle: "A breakdown of how Customer.io structures their landing page for conversions.",
    about: "Customer.io is a messaging platform for targeted communications. Their page balances technical capability with approachability.",
    learns: ["Feature showcase hierarchy", "Use case segmentation", "Technical trust signals", "Demo-first conversion strategy"],
    tags: ["SaaS", "Email Marketing"],
    content: "Leading with Capability\n\nCustomer.io's hero immediately communicates power: \"Send data-driven emails, push notifications, and SMS.\" They don't hide behind vague benefits — they tell you exactly what the product does.",
  },
  Ahrefs: {
    tag: "SEO",
    subtitle: "How Ahrefs uses clear value props and social proof to dominate SEO tool positioning.",
    about: "Ahrefs is one of the leading SEO toolsets. Their landing page is a masterclass in clear value props and social proof.",
    learns: ["Data-driven social proof", "Feature comparison strategy", "Trust through transparency", "Multi-audience targeting"],
    tags: ["SaaS", "SEO"],
    content: "The Power of Specificity\n\nAhrefs doesn't say \"the best SEO tool.\" They say \"With Ahrefs, you don't have to be an SEO pro to rank higher and get more traffic.\" This democratizes their product and expands their addressable market.",
  },
  ClickUp: {
    tag: "Productivity",
    subtitle: "How ClickUp packs maximum information while keeping conversion paths clear.",
    about: "ClickUp is an all-in-one productivity platform. Their landing page manages to communicate a vast feature set without overwhelming visitors.",
    learns: ["Information density balance", "Feature categorization", "Competitive positioning", "Multi-CTA strategy"],
    tags: ["SaaS", "Productivity"],
    content: "The All-in-One Challenge\n\nClickUp's biggest challenge is communicating that they replace multiple tools. Their hero solves this brilliantly: \"One app to replace them all.\" It's bold, memorable, and immediately positions against tool sprawl.",
  },
};

/* ─── Playbooks ─── */

export const playbookData: Record<string, PlaybookData> = {
  "Above the Fold": {
    tag: "CRO",
    subtitle: "Master the most important real estate on your landing page.",
    about: "Your \"above the fold\" section is the part of your site visible before scrolling. It's where visitors decide in seconds whether to stay or leave.",
    learns: ["Hero section anatomy", "Headline formulas that convert", "CTA placement strategy", "Visual hierarchy principles", "Mobile-first above the fold"],
    tags: ["Landing Pages", "CRO"],
    content: "Why Above the Fold Matters\n\nStudies show you have roughly 5 seconds to convince visitors to stay on your page. That means your above-the-fold section isn't just important — it's everything.\n\nThe 5 Components\n\nEvery high-converting above-the-fold section has five components: (1) A clear headline that communicates your value prop, (2) A supporting subheadline with specifics, (3) A primary CTA that's impossible to miss, (4) Social proof that builds instant trust, and (5) A visual that reinforces your message.\n\nHeadline Formulas\n\nThe best headlines follow one of three formulas: Result-Based (\"Get 3x more leads without spending more on ads\"), Problem-Agitation (\"Tired of losing customers to slow load times?\"), or Social Proof (\"Join 50,000+ marketers who use [Product]\").",
  },
  "Marketing Psychology": {
    tag: "Psychology",
    subtitle: "The psychological principles that drive buying decisions.",
    about: "When supermarket owner Sylvan Goldman invented the first shopping cart in 1937, customers didn't want to use them. This playbook covers the psychology behind why people buy.",
    learns: ["Social proof mechanisms", "Scarcity and urgency triggers", "Anchoring and framing effects", "Loss aversion in copy", "Cognitive biases in UX"],
    tags: ["Psychology", "Persuasion"],
    content: "The Shopping Cart Problem\n\nWhen Sylvan Goldman introduced the shopping cart, nobody used it. Men thought it looked unmanly. Women thought it resembled a baby carriage. So Goldman hired actors to push carts around the store. Once shoppers saw others using them, adoption skyrocketed. This is social proof in action — and it's one of the most powerful forces in marketing.",
  },
  "Content-Led SEO": {
    tag: "Content",
    subtitle: "How to build an SEO strategy that actually drives pipeline.",
    about: "Backlinks aren't as important as they used to be. This playbook covers the modern approach to content-driven SEO.",
    learns: ["Topic cluster strategy", "Content quality signals", "Search intent mapping", "Internal linking architecture", "Content refresh frameworks"],
    tags: ["SEO", "Content"],
    content: "The New SEO Playbook\n\nSEO has changed dramatically. Google's algorithms now prioritize content quality, topical authority, and user experience over backlink counts. This means the old playbook of churning out keyword-stuffed articles and building links is dead.",
  },
  "LinkedIn Organic": {
    tag: "Social",
    subtitle: "How to acquire customers through LinkedIn organic content.",
    about: "Material from conversations with LinkedIn employees and top audience builders on how to grow an engaged following.",
    learns: ["Algorithm-friendly post formats", "Hook writing techniques", "Engagement tactics", "Profile optimization", "Content calendar planning"],
    tags: ["LinkedIn", "Social"],
    content: "Why LinkedIn Now\n\nLinkedIn organic reach is at an all-time high. The platform is actively trying to compete with Twitter/X for creator attention, which means the algorithm rewards content creators more generously than ever.",
  },
  "Personalization Tactics": {
    tag: "CRO",
    subtitle: "How smart companies use data to personalize the customer experience.",
    about: "Data. Privacy. Personalization. This playbook covers how to personalize interactions without being creepy.",
    learns: ["Segmentation strategies", "Dynamic content approaches", "Privacy-first personalization", "A/B testing personalized experiences"],
    tags: ["CRO", "Data"],
    content: "The Personalization Spectrum\n\nPersonalization exists on a spectrum from simple (using someone's first name in an email) to complex (dynamically changing your entire landing page based on visitor behavior). The key is finding the sweet spot where effort meets impact.",
  },
  "Influencer Marketing": {
    tag: "Social",
    subtitle: "The modern playbook for working with creators and influencers.",
    about: "Consider two ways to learn about a product: a brand ad vs. a creator you follow recommending it. This playbook covers how to leverage creator partnerships.",
    learns: ["Finding the right creators", "Negotiation frameworks", "Campaign structures", "Measuring creator ROI", "Scaling creator programs"],
    tags: ["Influencers", "Social"],
    content: "Why Creator Marketing Works\n\n92% of consumers trust recommendations from people they follow over brand advertising. Creator marketing works because it combines the reach of advertising with the trust of word-of-mouth.",
  },
  "12 Great Copywriting Examples": {
    type: "article",
    tag: "Copywriting",
    subtitle: "12 real-world examples of exceptional marketing copy, broken down.",
    about: "A curated collection of the best copywriting examples from top brands, with analysis of what makes each one work.",
    learns: ["Headline techniques", "Emotional triggers in copy", "CTA writing patterns", "Long-form vs short-form copy"],
    tags: ["Copywriting"],
    content: "What Makes Great Copy\n\nEvery Friday at 5 o'clock, I sit back in my '70s paisley armchair, pour a glass of something strong, and read copy. Not books, not articles — copy. I've spent decades collecting the best examples, and these 12 are the ones I keep coming back to.",
  },
  "Email List Growth: 19 Tactics": {
    type: "article",
    tag: "Email",
    subtitle: "19 proven tactics to grow a high-quality email list.",
    about: "Email is money. But contrary to popular advice, you don't need a massive list — you need a quality one.",
    learns: ["Lead magnet strategies", "Opt-in form optimization", "Content upgrade tactics", "List quality maintenance"],
    tags: ["Email", "Growth"],
    content: "Quality Over Quantity\n\nA list of 1,000 engaged subscribers will outperform a list of 100,000 cold ones every time. The goal isn't to collect as many emails as possible — it's to attract the right people and keep them engaged.",
  },
  "How to Write a Cold Email": {
    type: "article",
    tag: "Outreach",
    subtitle: "The complete guide to writing cold emails that get responses.",
    about: "This is not an article about Mark Cuban. But if you need proof that cold emails work, look no further than the billionaire Mavs owner.",
    learns: ["Subject line formulas", "Opening line techniques", "Personalization at scale", "Follow-up sequences"],
    tags: ["Cold Email", "Outreach"],
    content: "The Mark Cuban Method\n\nMark Cuban is known for responding to cold emails. Why? Because the good ones follow a pattern: they're short, specific, and make it easy to say yes. This guide teaches you that pattern.",
  },
  "The Complete Marketing Glossary": {
    type: "article",
    tag: "Reference",
    subtitle: "120+ marketing terms defined in plain English.",
    about: "A marketing skill that's often overlooked: the ability to pretend to know what others are talking about. Now you don't have to pretend.",
    learns: ["Growth terminology", "Ad platform jargon", "Analytics concepts", "CRO terminology"],
    tags: ["Reference", "120 Terms"],
    content: "Why This Glossary Exists\n\nMarketing is full of jargon. CPA, ROAS, MQL, SQL, LTV, CAC — it's an alphabet soup that makes newcomers feel lost and veterans complacent. This glossary cuts through the noise with clear, practical definitions.",
  },
};

/* ─── Newsletters ─── */

export const newsletterData: Record<string, NewsletterData> = {
  "314": { title: "Welcome to the frontier", date: "Feb 19, 2026", topic: "Growth", url: "https://www.demandcurve.com/newsletters/growth-newsletter-314", takeaways: ["Strategic thinking separates good marketers from great ones", "Tactical depth matters, but frameworks matter more", "The best growth comes from combining strategy + execution"], content: "For years, this newsletter has been a series of tactical deep dives. That's not changing. But we're experimenting with something new — combining the tactical depth you love with the strategic thinking that separates good marketers from great ones.\n\nThis issue marks the beginning of a new era for The Growth Newsletter. We're going deeper, getting more opinionated, and sharing the frameworks we use when advising companies behind the scenes." },
  "313": { title: "How to identify your highest-impact growth opportunities", date: "Feb 17, 2026", topic: "Growth", url: "https://www.demandcurve.com/newsletters/growth-newsletter-313", takeaways: ["Diagnose your bottleneck before jumping to tactics", "Most teams waste time on channels that aren't their actual problem", "Good growth starts with root cause analysis"], content: "A good doctor doesn't see high blood pressure and immediately prescribe drugs. A good doctor investigates the root cause. Good growth works the same way.\n\nMost teams jump straight to tactics: \"Let's try TikTok ads\" or \"We need a referral program.\" But the highest-impact growth opportunities come from diagnosing your actual bottleneck first." },
  "312": { title: "How to win on Reddit in 2026", date: "Feb 12, 2026", topic: "Content", url: "https://www.demandcurve.com/newsletters/growth-newsletter-312", takeaways: ["Reddit rewards genuine value, not promotion", "Build a repeatable engine, not one-off posts"], content: "Quick intermission from the experimentation series. Today we're doing something we haven't done in a while — passing the mic to someone who's built a repeatable Reddit growth engine." },
  "311": { title: "How two words generated millions in new revenue", date: "Feb 10, 2026", topic: "CRO", url: "https://www.demandcurve.com/newsletters/growth-newsletter-311", takeaways: ["Specificity in CTA copy dramatically impacts conversions", "\"Add to Chrome\" outperformed \"Get Grammarly\" by 8x", "Small copy changes can produce outsized revenue impact"], content: "Over a decade ago, as one of Grammarly's first growth hires, I changed two words on a button. Those two words produced 8x the lift of any other experiment we'd run that quarter.\n\nThe old button said \"Get Grammarly.\" The new button said \"Add to Chrome.\" That's it. Two words. Millions in revenue." },
  "310": { title: "Your Growth Experiments Are Lying to You", date: "Feb 5, 2026", topic: "Strategy", url: "https://www.demandcurve.com/newsletters/growth-newsletter-310", content: "\"What we're doing seems to be working. The problem is we have no idea why.\" A founder reached out to me to advise their growth team, and this was the first thing they said." },
  "309": { title: "Do your ads look the way you think they do?", date: "Jan 29, 2026", topic: "Ads", url: "https://www.demandcurve.com/newsletters/growth-newsletter-309", content: "Most founders don't mess up Meta ads because they're careless or unsophisticated. They mess them up because the setup feels secondary to the creative and targeting decisions." },
  "308": { title: "Is your checkout bleeding revenue?", date: "Jan 27, 2026", topic: "CRO", url: "https://www.demandcurve.com/newsletters/growth-newsletter-308", content: "You've spent weeks perfecting your checkout flow. Meanwhile, your customers are making snap judgments in seconds about whether to complete their purchase or abandon the cart." },
  "307": { title: "When does a growth advantage turn into a flywheel?", date: "Jan 22, 2026", topic: "Growth", url: "https://www.demandcurve.com/newsletters/growth-newsletter-307", content: "Here's a pattern that's common in startup land: A company grows quickly early on. Things feel easier than expected. Customers show up. Revenue compounds. Then one day, growth stalls — and nobody can figure out why." },
  "306": { title: "The cheapest growth lever most teams ignore", date: "Jan 20, 2026", topic: "Ads", url: "https://www.demandcurve.com/newsletters/growth-newsletter-306", content: "You've probably had this moment: You spin up Meta, LinkedIn, or Google. You ship a few solid tests. Nothing hits. So you move on to the next channel, convinced that paid acquisition isn't for you." },
  "305": { title: "The Map Is Not the Territory", date: "Jan 15, 2026", topic: "Strategy", url: "https://www.demandcurve.com/newsletters/growth-newsletter-305", content: "Here's something most founders don't realize until it's too late: the way you see your startup is completely different from how your customers see it." },
  "304": { title: "Your growth problems aren't tactical. They're structural.", date: "Jan 8, 2026", topic: "Strategy", url: "https://www.demandcurve.com/newsletters/growth-newsletter-304", content: "Most founders respond to slow growth the same way. They add things. Another channel. Another experiment. Another tool. It feels productive, but it rarely moves the needle." },
  "303": { title: "Why social ads don't work like search ads", date: "Jan 6, 2026", topic: "Ads", url: "https://www.demandcurve.com/newsletters/growth-newsletter-303", content: "\"Top of funnel,\" \"middle of funnel,\" and \"bottom of funnel\" get thrown around like they mean the same thing across every channel. They don't." },
};

/* ─── SOPs ─── */

export const sopData: Record<string, SOPData> = {
  "Cold Outreach": {
    category: "Sales",
    tags: ["Sales", "Outbound", "Process"],
    author: "Demand Curve",
    overview: "This SOP covers the full cold outreach process — from building a targeted prospect list to booking qualified sales calls. It's the exact system used to generate 50+ qualified meetings per month without burning your domain reputation or annoying prospects.",
    whenToUse: [
      "You're launching outbound for the first time",
      "Your current cold emails get less than 2% reply rates",
      "You need a repeatable system your team can follow",
      "You want to scale outreach without hiring a big sales team",
    ],
    tools: [
      { name: "Email sending tool", desc: "Instantly, Smartlead, or Lemlist" },
      { name: "Prospect list source", desc: "Apollo, LinkedIn Sales Nav" },
      { name: "Secondary domain", desc: "Don't send from your main domain" },
      { name: "CRM or spreadsheet", desc: "HubSpot, Pipedrive, or Google Sheets" },
    ],
    steps: [
      { title: "Build Your Prospect List", content: "Use Apollo or LinkedIn Sales Navigator to find prospects that match your ICP (Ideal Customer Profile). Filter by company size, industry, job title, and funding stage. Export 200-500 contacts per week — quality over quantity." },
      { title: "Warm Up Your Domains", content: "Set up 3-5 secondary domains (e.g., tryacme.com, getacme.io). Create Google Workspace accounts on each and run a warmup tool like Instantly's built-in warmer for 2-3 weeks before sending any cold emails. This protects your sender reputation." },
      { title: "Write Your Sequence", content: "Create a 3-email sequence spaced 3-4 days apart. Email 1: short, personalized, one clear ask. Email 2: new angle + social proof. Email 3: breakup email with a soft CTA. Keep every email under 100 words. No HTML, no images — plain text only." },
      { title: "Launch & Monitor", content: "Send 30-50 emails per domain per day max. Monitor open rates (aim for 60%+), reply rates (aim for 5%+), and bounce rates (keep under 3%). Rotate domains if any get flagged. A/B test subject lines weekly." },
      { title: "Book & Handoff", content: "When a prospect replies positively, respond within 1 hour during business hours. Send a Calendly link with 3 suggested times. Log every booked call in your CRM. Brief the closer with the prospect's company info, pain points from the email exchange, and any relevant context." },
    ],
    template: {
      label: "Email 1 — First Touch",
      content: "Subject: quick q about {{company}}\n\nHi {{firstName}},\n\nSaw that {{company}} just {{trigger_event}}. When companies hit that stage, outbound usually becomes a priority — but most teams waste months figuring out the right approach.\n\nWe helped [similar company] book 40+ qualified calls/month within 6 weeks of launching outbound.\n\nWorth a quick chat to see if we could do the same for {{company}}?\n\n— [Your name]",
    },
    tips: [
      { icon: "tip", title: "Personalize the first line", content: "Generic openers kill reply rates. Reference something specific — a recent hire, product launch, or LinkedIn post." },
      { icon: "warning", title: "Don't send from your main domain", content: "If your cold emails get flagged as spam, it can tank deliverability for your entire company — including transactional emails." },
      { icon: "tip", title: "Follow up fast", content: "Responding within 1 hour of a positive reply increases your booking rate by 3x compared to waiting 24 hours." },
    ],
    stats: [
      { value: "50+", label: "Calls booked / month" },
      { value: "5-8%", label: "Avg reply rate" },
      { value: "6 weeks", label: "Time to results" },
    ],
    related: [
      { type: "SOP", name: "Content Production", desc: "End-to-end content workflow", view: "sop-detail" },
      { type: "Article", name: "How to Write a Cold Email", desc: "The complete guide to emails that get responses", view: "playbook-detail" },
      { type: "Article", name: "Cold Email Subject Lines", desc: "Subject line formulas that get opened", view: "playbook-detail" },
      { type: "SOP", name: "Launch Checklist", desc: "47-point pre-launch checklist", view: "sop-detail" },
    ],
  },
  "Content Production": {
    category: "Content",
    tags: ["Content", "Marketing", "Process"],
    author: "Demand Curve",
    overview: "A repeatable system for producing high-quality content at scale without burning out your team. Covers ideation through distribution.",
    whenToUse: [
      "You're publishing less than 2 pieces per week",
      "Your content process feels chaotic or inconsistent",
      "You need to scale content without adding headcount",
      "Your team wastes time on topics that don't perform",
    ],
    tools: [
      { name: "SEO tool", desc: "Ahrefs, SEMrush, or Ubersuggest" },
      { name: "Project management", desc: "Notion, Asana, or Linear" },
      { name: "Writing tool", desc: "Google Docs or Notion" },
      { name: "Distribution", desc: "Buffer, Typefully, or native platforms" },
    ],
    steps: [
      { title: "Content Calendar Setup", content: "Create a rolling 4-week content calendar. Map each piece to a funnel stage (awareness, consideration, decision) and a distribution channel. Start with 2 pieces per week — quality over quantity." },
      { title: "Topic Research", content: "Use a mix of keyword research (Ahrefs/SEMrush), community mining (Reddit, Twitter, Slack groups), and customer interviews to generate topics. Prioritize by search volume + business relevance." },
      { title: "Brief Creation", content: "Write a detailed brief for each piece: target keyword, search intent, outline with H2s, competitor URLs to beat, unique angle, target word count, and CTA. The brief should be good enough that any writer could execute it." },
      { title: "Writing & Editing", content: "First draft in 2-3 hours. Edit pass focuses on: clarity, flow, proof points, and actionability. Every section should answer 'so what?' — if it doesn't help the reader do something, cut it." },
      { title: "Distribution", content: "Publish and distribute same-day: social posts (LinkedIn, Twitter), email to subscribers, internal Slack share. Repurpose key insights into 3-5 social posts over the next 2 weeks." },
    ],
    tips: [
      { icon: "tip", title: "Brief before you write", content: "A great brief takes 20 minutes and saves 2 hours of rewrites. Never skip this step." },
      { icon: "warning", title: "Don't chase volume", content: "2 great pieces per week beats 5 mediocre ones. Google rewards depth and quality." },
      { icon: "tip", title: "Repurpose everything", content: "One blog post should become 3-5 social posts, an email snippet, and a potential podcast talking point." },
    ],
    stats: [
      { value: "2x", label: "Pieces per week" },
      { value: "4 weeks", label: "Rolling calendar" },
      { value: "3-5", label: "Social posts per piece" },
    ],
    related: [
      { type: "Playbook", name: "Content-Led SEO", desc: "Modern SEO strategy", view: "playbook-detail" },
      { type: "SOP", name: "Ad Creative Pipeline", desc: "Weekly winning creatives", view: "sop-detail" },
    ],
  },
  "Ad Creative Pipeline": {
    category: "Ads",
    tags: ["Ads", "Creative", "Process"],
    author: "Demand Curve",
    overview: "A system for consistently producing winning ad creatives every week. Covers ideation, production, testing, and iteration.",
    whenToUse: [
      "Your ad creative is stale and performance is declining",
      "You don't have a repeatable process for new creatives",
      "You want to test more variations without hiring a designer",
      "Your team argues about what 'good creative' looks like",
    ],
    tools: [
      { name: "Design tool", desc: "Figma, Canva, or CapCut" },
      { name: "Ad library", desc: "Meta Ad Library, TikTok Creative Center" },
      { name: "Ad platform", desc: "Meta Ads Manager, Google Ads" },
      { name: "Tracking", desc: "UTM builder + GA4" },
    ],
    steps: [
      { title: "Creative Research", content: "Spend 30 minutes in the Meta Ad Library and TikTok Creative Center studying top-performing ads in your vertical. Screenshot 10 ads that catch your eye. Note what works: hook, format, copy angle." },
      { title: "Concept Generation", content: "Generate 5 new creative concepts per week using this formula: [Hook Type] + [Value Prop] + [Format]. Hook types: pain point, social proof, curiosity, contrarian take. Formats: static image, carousel, video, UGC." },
      { title: "Production", content: "Produce 3-5 new creatives per week. Use Figma for statics, CapCut for video. Keep production simple — the idea matters more than polish. A good iPhone video beats a bad professional one." },
      { title: "Testing Framework", content: "Test 3 new creatives per ad set per week. Give each creative $20-50 and 3 days. Kill anything below 1% CTR. Scale anything above 2% CTR. Document winners and losers." },
      { title: "Iteration", content: "Take your top 3 performers and create 3 variations of each: different hook, different visual, different CTA. This is where most of your wins come from — iterating on what already works." },
    ],
    tips: [
      { icon: "tip", title: "Ideas > polish", content: "A rough concept with a great hook beats a polished ad with a weak angle every time." },
      { icon: "warning", title: "Don't test too many variables", content: "Change one thing at a time between variations so you know what actually moved the needle." },
      { icon: "tip", title: "Document everything", content: "Keep a swipe file of winners and losers. Patterns emerge after 20+ tests." },
    ],
    stats: [
      { value: "3-5", label: "New creatives / week" },
      { value: "2%+", label: "Target CTR" },
      { value: "$20-50", label: "Test budget per creative" },
    ],
    related: [
      { type: "Playbook", name: "Above the Fold", desc: "Master your landing page hero", view: "playbook-detail" },
      { type: "SOP", name: "Cold Outreach", desc: "Book 50+ qualified calls/month", view: "sop-detail" },
    ],
  },
  "Launch Checklist": {
    category: "Product",
    tags: ["Product", "Launch", "Checklist"],
    author: "Demand Curve",
    overview: "A 47-point pre-launch checklist covering everything from positioning to analytics to day-one execution.",
    whenToUse: [
      "You're launching a new product or major feature",
      "You want to make sure nothing falls through the cracks",
      "Your last launch felt disorganized or underperformed",
      "You need a repeatable launch process for your team",
    ],
    tools: [
      { name: "Analytics", desc: "GA4, Mixpanel, or Amplitude" },
      { name: "Launch platforms", desc: "Product Hunt, Hacker News" },
      { name: "Social scheduling", desc: "Buffer, Typefully" },
      { name: "Email", desc: "ConvertKit, Mailchimp, or Loops" },
    ],
    steps: [
      { title: "Positioning & Messaging", content: "Finalize your one-liner, value props, and target audience. Make sure your homepage hero section passes the 5-second test: can a stranger understand what you do and why they should care?" },
      { title: "Landing Page Audit", content: "Review every page visitors will see. Check: headline clarity, CTA visibility, social proof presence, mobile responsiveness, page speed (target <3s), and meta tags for SEO." },
      { title: "Analytics Setup", content: "Ensure GA4, conversion tracking, and event tracking are all firing. Set up goals for: page views, signups, trial starts, and purchases. Test the full funnel in a private browser." },
      { title: "Launch Day Channels", content: "Prepare assets for: Product Hunt, Hacker News, relevant subreddits, Twitter/LinkedIn announcements, email blast to your list, and any communities you're part of." },
      { title: "Post-Launch Plan", content: "Plan your first 7 days: Day 1-2 is launch push. Day 3-5 is follow-up content and responding to feedback. Day 6-7 is analyzing data and planning iteration." },
    ],
    tips: [
      { icon: "tip", title: "Soft launch first", content: "Share with 10-20 people before the public launch. Fix the obvious issues before the spotlight hits." },
      { icon: "warning", title: "Don't launch on Friday", content: "Tuesday-Thursday gives you weekdays to respond to feedback and iterate." },
      { icon: "tip", title: "Prepare your responses", content: "Draft responses to common questions and objections before launch day." },
    ],
    stats: [
      { value: "47", label: "Checklist items" },
      { value: "7 days", label: "Post-launch window" },
      { value: "Tue-Thu", label: "Best launch days" },
    ],
    related: [
      { type: "SOP", name: "Onboarding Flows", desc: "Turn signups into active users", view: "sop-detail" },
      { type: "Playbook", name: "Above the Fold", desc: "Nail your hero section", view: "playbook-detail" },
    ],
  },
  "Onboarding Flows": {
    category: "Product",
    tags: ["Product", "Activation", "UX"],
    author: "Demand Curve",
    overview: "How to turn signups into active, retained users with a structured onboarding flow that drives activation.",
    whenToUse: [
      "Your signup-to-activation rate is below 40%",
      "Users sign up but never come back",
      "Your onboarding has too many steps and high dropoff",
      "You're not sure what your activation metric should be",
    ],
    tools: [
      { name: "Analytics", desc: "Mixpanel, Amplitude, or PostHog" },
      { name: "Email automation", desc: "Customer.io, Loops, or Intercom" },
      { name: "Session recording", desc: "Hotjar, FullStory, or PostHog" },
      { name: "A/B testing", desc: "LaunchDarkly, Statsig, or Optimizely" },
    ],
    steps: [
      { title: "Define Your Activation Metric", content: "What's the ONE action that predicts long-term retention? For Slack it's sending 2,000 messages. For Dropbox it's saving a file. Find yours by analyzing retained vs churned user behavior." },
      { title: "Map the Critical Path", content: "What's the shortest path from signup to activation? Remove every step that isn't essential. If you have 8 onboarding steps and your activation metric only requires 3, you have 5 steps to cut." },
      { title: "Design the Welcome Flow", content: "First screen after signup should feel personal and set expectations. Show the user what they'll accomplish (not what buttons to click). Use progress indicators to create momentum." },
      { title: "Build Trigger-Based Emails", content: "Set up behavioral emails that fire based on actions (or inaction). Day 1: welcome + quick win. Day 3: if not activated, nudge. Day 7: social proof + FOMO. Day 14: last chance." },
      { title: "Measure & Iterate", content: "Track completion rate at each step. Where do users drop off? That's your bottleneck. Fix the biggest drop-off first. A/B test one change at a time. Target 40%+ signup-to-activation rate." },
    ],
    tips: [
      { icon: "tip", title: "Reduce to the minimum", content: "Every extra step loses 10-20% of users. Cut ruthlessly — you can always add steps later." },
      { icon: "warning", title: "Don't ask for everything upfront", content: "Progressive profiling > long signup forms. Ask for what you need to deliver value, nothing more." },
      { icon: "tip", title: "Use empty states wisely", content: "The first screen after signup is your highest-leverage moment. Don't waste it on a blank dashboard." },
    ],
    stats: [
      { value: "40%+", label: "Target activation rate" },
      { value: "1 action", label: "Activation metric" },
      { value: "14 days", label: "Onboarding window" },
    ],
    related: [
      { type: "SOP", name: "Launch Checklist", desc: "47-point pre-launch checklist", view: "sop-detail" },
      { type: "Playbook", name: "Personalization Tactics", desc: "Data-driven personalization", view: "playbook-detail" },
    ],
  },
};

/* ─── Search Index (all items flattened for search) ─── */

export function buildSearchIndex() {
  const items: { title: string; type: string; view: string; sub?: string }[] = [];

  Object.keys(skillData).forEach((name) => {
    items.push({ title: name, type: "Skill", view: "skill-detail", sub: name });
  });
  Object.keys(sopData).forEach((name) => {
    items.push({ title: name, type: "SOP", view: "sop-detail", sub: name });
  });
  Object.keys(playbookData).forEach((name) => {
    items.push({ title: name, type: playbookData[name].type === "article" ? "Article" : "Playbook", view: "playbook-detail", sub: name });
  });
  Object.keys(teardownData).forEach((name) => {
    items.push({ title: name, type: "Teardown", view: "teardown-detail", sub: name });
  });
  Object.keys(newsletterData).forEach((num) => {
    items.push({ title: `#${num} — ${newsletterData[num].title}`, type: "Newsletter", view: "newsletter-detail", sub: num });
  });

  return items;
}
