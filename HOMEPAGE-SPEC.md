# DC Homepage v2 — Full Spec (Mar 5, 2026)

## Context for the Builder

This spec was developed through a strategic session between Justin and Claude (narrative/strategy session). It contains the exact page structure, copy, and design direction for the v2 homepage rebuild. The current v2 page (`src/app/v2/page.tsx`) has strong design bones — keep the visual language (stripe.dev editorial aesthetic, monospace labels, grid markers, SVG figures, border grids, hover effects). This spec is about restructuring the sections and replacing the copy.

**What to keep from the current design:**
- The overall visual language: light bg, monospace UI labels, border-based grid layouts, IBM Plex Mono, subtle SVG figures
- The sticky nav bar (but update nav items per spec)
- The stats ticker/marquee
- The feed/table UI pattern (repurpose for Growth Program section)
- The hover effects, rainbow-hover interactions, feed-row styling
- The footer treatment (massive type)

**What to change:**
- Section order (completely restructured)
- All copy (new copy below)
- Remove: Philosophy/Foundational Five split section, "Two Paths One Outcome" section, "Our Approach" grid, current Intelligence section
- Add: Manifesto block, Growth Program section with content table, Newsletter signup, Social proof
- Rename: "Growth Services" -> "Growth Studio" everywhere

---

## Page Structure (top to bottom)

### 1. NAVIGATION

Keep the current sticky nav design. Update links:

```
[DC logo] GROWTH STUDIO    GROWTH PROGRAM    NEWSLETTER    MANIFESTO    |    CONTACT    [Start a Project] (button)
```

The `[S]`, `[G]` etc. keyboard hint pattern is cool, keep it:
- `[S]` GROWTH STUDIO
- `[P]` GROWTH PROGRAM
- `[N]` NEWSLETTER
- `[M]` MANIFESTO

"Start a Project" replaces "Start Project" (slightly warmer).

---

### 2. HERO

**Layout:** Keep the current hero layout (left-aligned, large type). Add two CTAs below the subhead.

**Headline:**
```
We help startups
build growth systems
```

(Keep as-is including the blinking cursor and italic rainbow hover on "growth systems")

**Subhead (REPLACE current):**
```
For the founders, operators, and builders competing against
companies with 10x their budget. Strategy, systems, and execution
from a decade of working with 4,500+ startups.
```

**CTAs (NEW — add below subhead with spacing):**

Primary button (filled black, like current nav button style):
```
Explore the Growth Studio
```

Secondary (text link with arrow, using the existing rainbow-hover + ArrowRight pattern):
```
Or build it yourself ->
```
(Links to the Growth Program section on-page)

---

### 3. STATS TICKER

Keep as-is. Same marquee items:
- Companies Trained: 4,500+
- Growth Operators: 100,000+
- Unicorns In Network: 18
- Years of Methodology: 10
- YC-Backed

---

### 4. MANIFESTO BLOCK (NEW — replaces Philosophy + Foundational Five)

**Layout:** Full-width section. Single column, centered or left-aligned, generous padding. Should feel like a pause — the reader slowing down. Think editorial magazine pull-quote energy, not a content block.

**Section label:** `/ WHAT WE BELIEVE`

**Copy:**

```
Building something from nothing is hard. Doing it against companies
with 10x your resources makes it feel impossible. And the internet
is full of people telling you what to do — most of whom have never
built anything themselves.

We've spent a decade inside the problem. Working with startups.
Studying what the best companies actually do. And we learned that
the companies that grow consistently aren't the ones with the best
tactics. They're the ones that build systems.

Our mission is to level the playing field. We take the growth
advantages that used to be reserved for the biggest companies in
the world and put them in the hands of the people trying to
challenge them.

100,000+ builders. Sharing what's working. Keeping each other
on the frontier. The incumbents have headcount. We have each other.
```

**CTA (text link with arrow):**
```
Read our manifesto ->
```
(Links to /v2/manifesto)

**Design notes:**
- This should feel different from the rest of the page. More breathing room. Slightly larger type (maybe text-lg or text-xl with font-light).
- Consider a subtle left border accent or a different background treatment (very light warm gray?) to set it apart.
- No SVG figures or decorative elements in this section. Let the words breathe.

---

### 5. GROWTH STUDIO (replaces "The growth systems we build")

**Section label:** `/ GROWTH STUDIO`

**Headline:**
```
The growth systems we design and build
```

**Subhead:**
```
We partner with frontier operators — each one a specialist in
their domain — to architect growth systems around your specific
business. Think of it as a growth team without building one.
```

**Programs:** Keep the current card/row layout from the services section. Same interaction pattern (hover to reveal CTA, links on the right). Update the data:

```javascript
const programs = [
  {
    name: "Growth Architecture",
    description: "We audit, design, and build your complete growth system — market positioning, channel strategy, growth model, and the operating system to scale it.",
    cta: "Start a conversation",
    links: ["How It Works", "See Case Studies"],
  },
  {
    name: "Paid Acquisition Engines",
    description: "Your paid growth engine — designed, launched, and scaled. Strategy, creative, media buying, and measurement built as a system, not a collection of campaigns.",
    cta: "Scale your paid channels",
    links: ["How It Works", "See Results"],
  },
  {
    name: "AI Search Engines",
    description: "AI is rewriting how buyers discover products. We build the system that ensures your brand shows up when AI answers your buyers' questions.",
    cta: "Get your AI brand audit",
    links: ["Learn about AI Search", "Visit Saturation"],
  },
  {
    name: "Story Systems",
    description: "Your positioning and messaging aren't a one-time exercise. They're the operating system your entire go-to-market runs on.",
    cta: "Build your narrative",
    links: ["How Story Systems Work"],
  },
];
```

**Remove the "Coming Soon" row entirely.**

**Keep the left-column sticky SVG illustration** (the grid/circle diagram). It works with the studio aesthetic.

---

### 6. GROWTH PROGRAM (NEW — the big missing section)

**Section label:** `/ GROWTH PROGRAM`

**Headline:**
```
Build your own growth system
```

(Include the count badge like the current Intelligence section: `(50+)` for modules)

**Subhead:**
```
50+ playbooks, frameworks, and execution guides. An AI co-pilot
that knows your business. Everything you need to build a growth
system yourself — at your own pace.
```

**Price anchor (small, understated):**
```
Starting at $995/year
```

**CTAs:**

Primary button:
```
Explore the Growth Program
```

Secondary text link:
```
Start with a 7-day free trial ->
```

**Content table:** Repurpose the feed/table UI from the current Intelligence section. Same layout: filters on the left, content rows on the right. But the data changes:

Filter categories (left sidebar):
- **Path:** Foundation, Acquisition, Monetization, Retention, Strategy
- **Type:** Playbook, Framework, Deep Dive, Worksheet, Case Study

Content rows (right side):
```javascript
const gpItems = [
  { title: "The Foundational Five", type: "Framework", path: "Foundation" },
  { title: "Growth Catalysts: Finding Your Edge", type: "Deep Dive", path: "Foundation" },
  { title: "Building Your Growth Model", type: "Framework", path: "Foundation" },
  { title: "The Meta Ads Scaling System", type: "Playbook", path: "Acquisition" },
  { title: "Positioning That Converts", type: "Deep Dive", path: "Foundation" },
  { title: "Channel-Market Fit", type: "Framework", path: "Acquisition" },
  { title: "Landing Page Conversion Playbook", type: "Playbook", path: "Acquisition" },
  { title: "Pricing & Packaging Strategy", type: "Deep Dive", path: "Monetization" },
  { title: "Retention Flywheels", type: "Framework", path: "Retention" },
  { title: "The Growth Experimentation Process", type: "Playbook", path: "Strategy" },
];
```

**Design notes:**
- Remove the date column from the feed rows (GP content isn't date-based)
- Replace with Path badge or icon
- Keep the type badge on the right
- Keep the hover effects and Plus icon interaction
- The "Load More" row at the bottom can say: "See all 50+ modules"

---

### 7. SOCIAL PROOF (NEW)

**Layout:** Simple horizontal section. Border top/bottom. Can be a single row or a 2-column split.

**Option A — Logo bar + quote (recommended for now):**

```
/ TRUSTED BY

[Logo] [Logo] [Logo] [Logo] [Logo] [Logo]

"Demand Curve changed how we think about growth. We went from
guessing to having a real system." — [Name], [Company]
```

**Design notes:**
- Use placeholder logos for now (gray squares with company names in monospace)
- Placeholder companies: can use real ones DC has worked with or leave as `[Company 1]` etc.
- Keep it minimal — this section should be understated, not a full testimonial carousel
- One quote is enough. Two max.

---

### 8. NEWSLETTER SIGNUP (NEW)

**Layout:** Full-width section with generous padding. Should feel like a destination, not an afterthought.

**Section label:** `/ THE GROWTH NEWSLETTER`

**Headline:**
```
Join 100,000+ operators
```

**Subhead:**
```
The tactics, frameworks, and insights powering the growth systems
of the fastest-growing startups. Delivered twice a week.
```

**Email form:**
```
[Email input field]  [Subscribe button]
```

Input placeholder: `your@email.com`
Button text: `Subscribe`

**Below form (small text):**
```
Free. No spam. Unsubscribe anytime.
```

**Optional: Show 3-4 recent newsletter titles** as a preview of what they'll get:
```
Recent editions:
- Your Growth Experiments Are Lying to You
- Stop Pulling the Wrong Growth Levers
- How Two Words Generated Millions in Revenue
- The Channel Most Startups Pick Wrong
```

**Design notes:**
- This is a conversion-critical section. Make the email input prominent.
- Consider a slightly different background (very subtle warm gray or the lightest possible tint) to make it pop.
- The input/button should use the existing design language — monospace, clean borders, black button.

---

### 9. PRE-FOOTER

**Layout:** Keep the current 2-column split (left: GP promo, right: social + resources stacked).

Update the left column:

**Label:** `/ START BUILDING`

**Text:**
```
Whether you want us to build your growth system or you want to
build it yourself — we've got you covered.
```

**Two CTAs stacked:**
```
[Talk to the Growth Studio]  (button, outline style)
[Explore the Growth Program]  (button, outline style)
```

Right column: Keep social links and resources as-is.

---

### 10. FOOTER

Keep as-is. The massive "DEMAND CURVE" type treatment is great.

---

## Summary of Removed Sections

1. **Philosophy / Foundational Five split** — replaced by Manifesto Block. Foundational Five is too down-funnel for the homepage. It lives in the Growth Program.
2. **"Two Paths, One Outcome"** — removed. Premature in the flow. The page naturally presents both paths (Studio then Program) without needing a section that says "pick one."
3. **"Our Approach" grid** — removed. The four differentiators (systems over tactics, architecture methodology, senior operators, frontier intelligence) were generic and not universally true across all DC offerings. The manifesto block now carries the "why we're different" weight through narrative instead of bullet points.
4. **Intelligence feed** — repurposed as the Growth Program content table. Newsletter gets its own dedicated signup section instead.
5. **Coming Soon services** — removed. Didn't add credibility; risked feeling like vaporware.

## Naming Convention

- **Growth Studio** = the services/agency side of DC (all expert-led programs)
- **Growth Program** = the DIY education product
- **Growth Systems** = the category/outcome DC owns (used in hero, throughout)
- **The Growth Newsletter** = the newsletter
- **Manifesto** = the /v2/manifesto page (linked from homepage)

## Tone Guidance

The homepage should feel confident but not corporate. It should read like it was written by a person with conviction, not a committee. Short sentences. No filler. The manifesto block is where the emotion lives — the rest of the page can be more functional/clean, but it should never feel generic or interchangeable with any other growth company's homepage.

Avoid: "leverage," "empower," "unlock," "elevate," "end-to-end," "holistic solutions"
Prefer: Direct language. Say what you mean. If it sounds like it could be on any B2B SaaS website, rewrite it.
