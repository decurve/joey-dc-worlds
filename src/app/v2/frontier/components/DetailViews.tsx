"use client";

import { useState, useRef, useEffect } from "react";
import {
  ArrowLeft,
  Bot,
  FileText,
  Copy,
  Check,
  ChevronRight,
  BookOpen,
  ScanSearch,
  Megaphone,
  Mail,
  Send,
} from "lucide-react";
import { skillExamples } from "../skill-examples";

/* ─── Skill Detail ─── */

export function SkillDetail({
  skill,
  onBack,
}: {
  skill: {
    name: string;
    category: string;
    subtitle: string;
    about: string;
    helps: string[];
    prompts: string[];
    greeting: string;
    greeting2: string;
  };
  onBack: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"chat" | "example">("chat");
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<
    { role: "user" | "assistant"; text: string }[]
  >([
    { role: "assistant", text: skill.greeting },
    { role: "assistant", text: skill.greeting2 },
  ]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  function handlePrompt(prompt: string) {
    setChatMessages((prev) => [
      ...prev,
      { role: "user", text: prompt },
      {
        role: "assistant",
        text: "This is a demo — in the live version, this connects to Claude with the full " + skill.name + " skill context loaded. Try it with Claude Code or any LLM by using the Demand Curve skill pack.",
      },
    ]);
  }

  const hasExample = !!skillExamples[skill.name];

  return (
    <div>
      {/* Back */}
      <button
        onClick={onBack}
        className="group flex items-center gap-2 text-xs text-neutral-500 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5 ml-[-2px] transition-transform group-hover:-translate-x-1" /> Back
      </button>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center">
            <Bot className="w-5 h-5 text-neutral-400" />
          </div>
          <span className="frontier-tag">{skill.category}</span>
        </div>
        <h1 className="font-heading text-3xl md:text-4xl tracking-tight text-white mb-3">
          {skill.name}
        </h1>
        <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl">
          {skill.subtitle}
        </p>
      </div>

      <div className="flex gap-8 flex-col lg:flex-row">

        {/* Left: Chat Interface (~60%) */}
        <div className="flex-1 min-w-0 lg:w-[60%]">
          <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-3">
            Chat with this skill
          </p>

          {/* Terminal chat */}
          <div className="terminal-frame mb-6">
            <div className="terminal">
              {/* CRT layers */}
              <div className="terminal-scanlines" />
              <div className="terminal-glow" />
              <div className="terminal-noise" />
              <div className="terminal-vignette" />

              {/* Terminal header bar */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.04] terminal-output">
                <div className="flex items-center gap-3">
                  <span className="text-[9px] tracking-[0.2em] uppercase text-white/20">
                    {skill.name}.skill
                  </span>
                </div>
                <span className="text-[9px] text-white/10">
                  ░▒▓ ACTIVE ▓▒░
                </span>
              </div>

              {/* Messages */}
              <div className="p-5 space-y-4 max-h-[400px] overflow-y-auto retro-scrollbar terminal-text terminal-output">
                {chatMessages.map((msg, i) => (
                  <div key={i} className="text-sm leading-relaxed">
                    {msg.role === "assistant" ? (
                      <div className="terminal-bot">
                        {i === 0 && (
                          <span className="text-white/40 text-[10px] tracking-[0.1em] uppercase block mb-1">[{skill.name}]</span>
                        )}
                        {msg.text}
                      </div>
                    ) : (
                      <div className="terminal-user">{msg.text}</div>
                    )}
                  </div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Input */}
              <div className="border-t border-white/[0.04] px-5 py-4 flex items-center gap-2 terminal-output">
                <span className="text-white/20 text-sm">&gt;</span>
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && chatInput.trim()) {
                      handlePrompt(chatInput.trim());
                      setChatInput("");
                    }
                  }}
                  placeholder="Ask this skill anything..."
                  className="terminal-input flex-1 text-sm"
                />
                <button
                  onClick={() => {
                    if (chatInput.trim()) {
                      handlePrompt(chatInput.trim());
                      setChatInput("");
                    }
                  }}
                  className="text-white/20 hover:text-white/50 transition-colors"
                >
                  <Send className="w-4 h-4 transition-transform hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Download options */}
          <div className="space-y-3">
            <div className="frontier-card px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-neutral-500" />
                <span className="text-sm text-neutral-400">Download your output as PDF</span>
              </div>
              <button disabled className="rounded-lg border border-white/[0.06] bg-white/[0.03] text-[11px] text-neutral-600 px-4 py-2 cursor-not-allowed opacity-60">
                Run the skill first
              </button>
            </div>

            <div className="frontier-card p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-white/[0.05] flex items-center justify-center">
                  <FileText className="w-5 h-5 text-neutral-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-white">Download Skill as Markdown</p>
                  <p className="text-[10px] text-neutral-500">The reusable skill prompt files</p>
                </div>
              </div>
              <p className="text-sm text-neutral-400 leading-relaxed mb-4">
                Get the full skill as Markdown files you can plug into Claude Projects, Claude Code, or any LLM tool. Use it for every project — the skill grows with your company.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-white">$5</span>
                <button className="glow-btn-dark px-6 py-2.5 rounded-lg text-sm font-semibold relative">
                  <span className="relative z-10">Buy &amp; Download</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Skill details sidebar (~40%) */}
        <div className="lg:w-[40%] space-y-6">
          {/* About */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-3">
              About this skill
            </p>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {skill.about}
            </p>
          </div>

          {/* Helps with */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-3">
              What it helps with
            </p>
            <div className="space-y-2">
              {skill.helps.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                  <span className="text-white/30 mt-0.5">[✓]</span>
                  {h}
                </div>
              ))}
            </div>
          </div>

          {/* Example prompts */}
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-3">
              Example prompts
            </p>
            <div className="space-y-2">
              {skill.prompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handlePrompt(p)}
                  className="w-full text-left text-sm text-neutral-400 border border-white/[0.08] rounded-lg px-4 py-3 hover:border-white/[0.15] hover:text-white transition-colors leading-relaxed"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Audit CTA — full width below */}
      <div className="frontier-card p-5 mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-9 h-9 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
            <Bot className="w-4 h-4 text-neutral-500" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm text-white">Prefer an expert touch?</p>
            <p className="text-xs text-neutral-500 leading-relaxed mt-0.5">
              Our {skill.category.toLowerCase()} specialists will review your output and refine it into something battle-tested.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[10px] text-neutral-600">20% off for Premium members</span>
          <button className="glow-btn-dark px-5 py-2 rounded-lg text-xs font-semibold relative">
            <span className="relative z-10">Book a {skill.category} Audit</span>
          </button>
        </div>
      </div>

      {/* Example Output — full width below audit CTA */}
      {hasExample && (
        <div className="frontier-card p-8 mt-12 overflow-hidden">
          <div
            className="skill-example-dark prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: skillExamples[skill.name] }}
          />
        </div>
      )}
    </div>
  );
}

/* ─── SOP Detail ─── */

export function SOPDetail({
  sop,
  onBack,
  onNavigate,
}: {
  sop: {
    name: string;
    category: string;
    tags: string[];
    author: string;
    steps: { title: string; content: string }[];
    overview: string;
    whenToUse: string[];
    tools: { name: string; desc: string }[];
    template?: { label: string; content: string };
    tips: { icon: "tip" | "warning"; title: string; content: string }[];
    stats: { value: string; label: string }[];
    related: { type: string; name: string; desc: string; view: string }[];
  };
  onBack: () => void;
  onNavigate?: (view: string, sub: string) => void;
}) {
  const [copiedStep, setCopiedStep] = useState<number | null>(null);

  function copyStep(i: number, text: string) {
    navigator.clipboard.writeText(text);
    setCopiedStep(i);
    setTimeout(() => setCopiedStep(null), 2000);
  }

  return (
    <div>
      <button
        onClick={onBack}
        className="group flex items-center gap-2 text-xs text-neutral-500 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5 ml-[-2px] transition-transform group-hover:-translate-x-1" /> Back
      </button>

      {/* Header */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="frontier-tag">SOP</span>
        {sop.tags.map((t) => (
          <span key={t} className="text-xs px-2.5 py-1 rounded bg-white/[0.04] text-neutral-400">{t}</span>
        ))}
      </div>
      <h1 className="font-heading text-3xl md:text-4xl tracking-tight text-white mb-3">
        {sop.name}
      </h1>
      <div className="flex items-center gap-4 text-[10px] tracking-[0.1em] uppercase text-neutral-500 mb-8">
        <span>By {sop.author}</span>
        <span>·</span>
        <span>{sop.steps.length} Steps</span>
        <span>·</span>
        <span>Updated Feb 2026</span>
        <span>·</span>
        <span>8 min read</span>
      </div>

      <div className="flex gap-10 flex-col xl:flex-row">
        {/* Left: Main Content */}
        <div className="flex-1 min-w-0">

          {/* Overview */}
          <div id="sop-overview" className="mb-8">
            <h2 className="font-heading text-xl tracking-tight text-white mb-3">Overview</h2>
            <p className="text-sm text-neutral-300 leading-relaxed">{sop.overview}</p>
          </div>

          {/* When to Use */}
          <div id="sop-when" className="mb-8">
            <h2 className="font-heading text-xl tracking-tight text-white mb-3">When to Use This</h2>
            <div className="space-y-2">
              {sop.whenToUse.map((item, i) => (
                <div key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                  <span className="text-emerald-400 mt-0.5">[✓]</span> {item}
                </div>
              ))}
            </div>
          </div>

          {/* What You'll Need */}
          <div id="sop-needs" className="mb-8">
            <h2 className="font-heading text-xl tracking-tight text-white mb-3">What You&apos;ll Need</h2>
            <div className="grid grid-cols-2 gap-3">
              {sop.tools.map((tool) => (
                <div key={tool.name} className="frontier-card p-3">
                  <p className="text-sm font-medium text-white">{tool.name}</p>
                  <p className="text-xs text-neutral-500 mt-1">{tool.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* The Process */}
          <div id="sop-process" className="mb-8">
            <h2 className="font-heading text-xl tracking-tight text-white mb-5">
              The {sop.steps.length}-Step Process
            </h2>
            <div className="space-y-6">
              {sop.steps.map((step, i) => (
                <div key={i} id={`step-${i}`} className="frontier-card p-0 overflow-hidden group">
                  <div className="flex">
                    <div className="w-1 bg-emerald-500/40 shrink-0" />
                    <div className="flex-1 p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] tracking-[0.15em] text-emerald-400 font-semibold">
                            {i + 1}
                          </span>
                          <h4 className="text-sm font-semibold text-white">{step.title}</h4>
                        </div>
                        <button
                          onClick={() => copyStep(i, step.content)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity text-neutral-500 hover:text-white flex items-center gap-1 text-xs"
                          aria-label="Copy step"
                        >
                          {copiedStep === i ? (
                            <><Check className="w-3.5 h-3.5 text-emerald-400" /> Copied</>
                          ) : (
                            <><Copy className="w-3.5 h-3.5" /> Copy</>
                          )}
                        </button>
                      </div>
                      <p className="text-sm text-neutral-400 leading-relaxed">{step.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Template */}
          {sop.template && (
            <div id="sop-templates" className="mb-8">
              <h2 className="font-heading text-xl tracking-tight text-white mb-4">Sample Template</h2>
              <div className="frontier-card p-6">
                <p className="text-[10px] tracking-[0.15em] uppercase text-neutral-500 mb-3">{sop.template.label}</p>
                <pre className="text-sm text-neutral-300 leading-relaxed whitespace-pre-wrap font-[inherit]">
                  {sop.template.content}
                </pre>
              </div>
            </div>
          )}

          {/* Tips & Pitfalls */}
          {sop.tips.length > 0 && (
            <div id="sop-tips" className="mb-8">
              <h2 className="font-heading text-xl tracking-tight text-white mb-4">Tips &amp; Pitfalls</h2>
              <div className="space-y-3">
                {sop.tips.map((tip, i) => (
                  <div key={i} className="frontier-card p-4 flex items-start gap-3">
                    <span className={`text-lg mt-0.5 ${tip.icon === "tip" ? "text-emerald-400" : "text-red-400"}`}>
                      {tip.icon === "tip" ? "⚡" : "⚠"}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white mb-1">{tip.title}</p>
                      <p className="text-sm text-neutral-400">{tip.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Resources */}
          {sop.related.length > 0 && (
            <div>
              <h2 className="font-heading text-xl tracking-tight text-white mb-4">Related Resources</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {sop.related.map((r) => (
                  <div
                    key={r.name}
                    className="frontier-card p-4 cursor-pointer"
                    onClick={() => onNavigate?.(r.view, r.name)}
                  >
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${
                      r.type === "SOP" ? "text-emerald-400 bg-emerald-400/10" : "text-violet-400 bg-violet-400/10"
                    }`}>{r.type}</span>
                    <h3 className="text-sm font-semibold text-white mt-2">{r.name}</h3>
                    <p className="text-xs text-neutral-500 mt-1">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Sticky Sidebar */}
        <div className="w-64 flex-shrink-0 hidden xl:block">
          <div className="sticky top-8 space-y-4">
            {/* Jump links */}
            <div className="frontier-card p-4">
              <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-3">On this page</p>
              <div className="space-y-1">
                <a href="#sop-overview" className="block text-xs text-neutral-400 hover:text-white py-1 transition-colors">Overview</a>
                <a href="#sop-when" className="block text-xs text-neutral-400 hover:text-white py-1 transition-colors">When to Use</a>
                <a href="#sop-needs" className="block text-xs text-neutral-400 hover:text-white py-1 transition-colors">What You&apos;ll Need</a>
                <a href="#sop-process" className="block text-xs text-neutral-400 hover:text-white py-1 transition-colors">The Process</a>
                {sop.template && <a href="#sop-templates" className="block text-xs text-neutral-400 hover:text-white py-1 transition-colors">Templates</a>}
                <a href="#sop-tips" className="block text-xs text-neutral-400 hover:text-white py-1 transition-colors">Tips &amp; Pitfalls</a>
              </div>
            </div>

            {/* Quick stats */}
            <div className="frontier-card p-4">
              <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-3">Quick stats</p>
              <div className="space-y-3">
                {sop.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-lg font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-neutral-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Audit CTA */}
            <div className="frontier-card p-4">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center shrink-0">
                  <FileText className="w-3.5 h-3.5 text-neutral-500" />
                </div>
                <p className="font-semibold text-sm text-white">Need help executing?</p>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed mb-3">
                Our growth experts can review your setup and optimize it for your specific business.
              </p>
              <p className="text-xs text-neutral-600 mb-3">20% discount for Premium members</p>
              <button className="glow-btn-dark w-full px-4 py-2.5 rounded-lg text-xs font-semibold relative">
                <span className="relative z-10">Book a Growth Audit</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Playbook Detail ─── */

export function PlaybookDetail({
  playbook,
  onBack,
}: {
  playbook: {
    title: string;
    topic: string;
    desc: string;
    sections: { title: string; content: string }[];
  };
  onBack: () => void;
}) {
  return (
    <div>
      <button
        onClick={onBack}
        className="group flex items-center gap-2 text-xs text-neutral-500 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5 ml-[-2px] transition-transform group-hover:-translate-x-1" /> Back
      </button>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-violet-400" />
        </div>
        <span className="frontier-tag">{playbook.topic}</span>
      </div>
      <h1 className="font-heading text-3xl md:text-4xl tracking-tight text-white mb-3">
        {playbook.title}
      </h1>
      <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl mb-8">
        {playbook.desc}
      </p>

      <hr className="frontier-divider mb-8" />

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-10">
          {playbook.sections.map((section, i) => (
            <div key={i} id={`section-${i}`}>
              <h2 className="font-heading text-xl tracking-tight text-white mb-4">
                {section.title}
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
              {i < playbook.sections.length - 1 && (
                <hr className="frontier-divider mt-10" />
              )}
            </div>
          ))}
        </div>

        {/* TOC */}
        <div className="hidden lg:block">
          <div className="frontier-card p-4 sticky top-8">
            <h3 className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-3">
              Contents
            </h3>
            <div className="space-y-1">
              {playbook.sections.map((section, i) => (
                <a
                  key={i}
                  href={`#section-${i}`}
                  className="block text-xs text-neutral-400 hover:text-white py-2 transition-colors"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Teardown Detail ─── */

export function TeardownDetail({
  teardown,
  onBack,
}: {
  teardown: {
    name: string;
    tag: string;
    subtitle: string;
    about: string;
    learns: string[];
  };
  onBack: () => void;
}) {
  return (
    <div>
      <button
        onClick={onBack}
        className="group flex items-center gap-2 text-xs text-neutral-500 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5 ml-[-2px] transition-transform group-hover:-translate-x-1" /> Back
      </button>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
          <ScanSearch className="w-5 h-5 text-amber-400" />
        </div>
        <span className="frontier-tag">{teardown.tag}</span>
      </div>
      <h1 className="font-heading text-3xl md:text-4xl tracking-tight text-white mb-3">
        {teardown.name}
      </h1>
      <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl mb-8">
        {teardown.subtitle}
      </p>

      <hr className="frontier-divider mb-8" />

      <div className="max-w-3xl space-y-8">
        <div>
          <h2 className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-4">
            About this teardown
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            {teardown.about}
          </p>
        </div>

        <div>
          <h2 className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-4">
            What you&apos;ll learn
          </h2>
          <div className="space-y-2">
            {teardown.learns.map((l, i) => (
              <div
                key={i}
                className="flex items-start gap-3 text-sm text-neutral-300"
              >
                <ChevronRight className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                {l}
              </div>
            ))}
          </div>
        </div>

        <div className="frontier-card p-6 text-center">
          <ScanSearch className="w-8 h-8 text-neutral-600 mx-auto mb-3" />
          <p className="text-sm text-neutral-400 mb-4">
            Full teardown with annotated screenshots and analysis.
          </p>
          <button className="glow-btn-dark px-6 py-3 rounded-lg text-sm font-semibold relative">
            <span className="relative z-10">View Full Teardown</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Newsletter Detail ─── */

export function NewsletterDetail({
  newsletter,
  onBack,
}: {
  newsletter: {
    title: string;
    number: string;
    date: string;
    topic: string;
    summary: string;
    content: string;
  };
  onBack: () => void;
}) {
  return (
    <div>
      <button
        onClick={onBack}
        className="group flex items-center gap-2 text-xs text-neutral-500 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5 ml-[-2px] transition-transform group-hover:-translate-x-1" /> Back
      </button>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center">
          <Mail className="w-5 h-5 text-teal-400" />
        </div>
        <span className="frontier-tag">{newsletter.topic}</span>
      </div>
      <h1 className="font-heading text-3xl md:text-4xl tracking-tight text-white mb-3">
        {newsletter.title}
      </h1>
      <div className="flex items-center gap-4 text-[10px] tracking-[0.1em] uppercase text-neutral-500 mb-8">
        <span>{newsletter.number}</span>
        <span>·</span>
        <span>{newsletter.date}</span>
      </div>

      <hr className="frontier-divider mb-8" />

      <div className="max-w-3xl space-y-6">
        <div>
          <h2 className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-4">
            Summary
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            {newsletter.summary}
          </p>
        </div>

        <hr className="frontier-divider" />

        <div>
          <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line">
            {newsletter.content}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Ad Detail ─── */

export function AdDetail({
  brand,
  onBack,
}: {
  brand: string;
  onBack: () => void;
}) {
  return (
    <div>
      <button
        onClick={onBack}
        className="group flex items-center gap-2 text-xs text-neutral-500 hover:text-white transition-colors mb-8"
      >
        <ArrowLeft className="w-3.5 h-3.5 ml-[-2px] transition-transform group-hover:-translate-x-1" /> Back
      </button>

      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-lg bg-rose-500/10 flex items-center justify-center">
          <Megaphone className="w-5 h-5 text-rose-400" />
        </div>
        <span className="frontier-tag">Meta Ad</span>
      </div>
      <h1 className="font-heading text-3xl md:text-4xl tracking-tight text-white mb-3">
        {brand}
      </h1>
      <p className="text-neutral-400 text-sm leading-relaxed max-w-2xl mb-8">
        Ad creative breakdown and performance analysis.
      </p>

      <hr className="frontier-divider mb-8" />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="frontier-card aspect-square flex items-center justify-center">
          <Megaphone className="w-12 h-12 text-neutral-700" />
        </div>
        <div className="space-y-4">
          <div>
            <h2 className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-2">
              Brand
            </h2>
            <p className="text-sm text-white">{brand}</p>
          </div>
          <div>
            <h2 className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-2">
              Platform
            </h2>
            <p className="text-sm text-white">Meta (Facebook / Instagram)</p>
          </div>
          <div>
            <h2 className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 mb-2">
              Why it works
            </h2>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Breakdown coming soon. This will include creative strategy, copy analysis,
              targeting insights, and performance benchmarks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
