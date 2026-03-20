"use client";

import { useState, useEffect } from "react";
import { Check } from "lucide-react";

type PlanType = "free" | "paid";
type BillingType = "annual" | "monthly";

const testimonials = [
  { text: "Demand Curve's newsletter is the only growth content I actually read every day. Actionable from line one.", name: "Alex Rivera", handle: "@alexrivera", gradient: "from-blue-500 to-cyan-400" },
  { text: "The SOP templates alone saved us 40+ hours last quarter. Worth 10x the price.", name: "Priya Sharma", handle: "@priyasharma", gradient: "from-pink-500 to-rose-400" },
  { text: "Went from 0 to 2k MRR using tactics straight from the growth playbooks. No BS, just results.", name: "Marcus Chen", handle: "@marcuschen", gradient: "from-emerald-500 to-green-400" },
  { text: "The Claude prompts are insane. I use them daily for landing pages and ad copy.", name: "Sarah Kim", handle: "@sarahkim", gradient: "from-violet-500 to-purple-400" },
  { text: "Best growth newsletter out there. Every issue has at least one idea I can implement same-day.", name: "James Okafor", handle: "@jamesokafor", gradient: "from-orange-500 to-amber-400" },
  { text: "The partner deals paid for my annual membership in the first week. No-brainer.", name: "Emma Larsson", handle: "@emmalarsson", gradient: "from-red-500 to-pink-400" },
];

const compareFeatures = [
  { feature: "Newsletter frequency", free: "Weekly", paid: "Daily" },
  { feature: "Resource access", free: "Limited", paid: "Full library" },
  { feature: "Community", free: "—", paid: "✓ Discord" },
  { feature: "Claude Skills", free: "—", paid: "✓ All prompts" },
  { feature: "SOP Templates", free: "—", paid: "✓ Full access" },
  { feature: "Partner Deals", free: "—", paid: "✓ $840+ value" },
  { feature: "Ads", free: "Yes", paid: "None" },
];

export default function SubscribeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [planType, setPlanType] = useState<PlanType>("free");
  const [billing, setBilling] = useState<BillingType>("annual");
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (open) { setVisible(true); setClosing(false); }
  }, [open]);

  function handleClose() {
    setClosing(true);
    setTimeout(() => { setVisible(false); setClosing(false); onClose(); }, 200);
  }

  if (!visible) return null;

  if (submitted) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}>
        <div className={`absolute inset-0 bg-black/70 backdrop-blur-sm ${closing ? "modal-backdrop-exit" : "modal-backdrop-enter"}`} />
        <div className="relative frontier-card p-10 text-center max-w-md w-full" style={{ backgroundColor: '#141416' }}>
          <div className="w-12 h-12 rounded-full bg-white/[0.08] flex items-center justify-center mx-auto mb-4">
            <Check className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-heading text-2xl tracking-tight text-white mb-2">You&apos;re in.</h3>
          <p className="text-sm text-neutral-400 mb-6">Check your inbox — your first issue is on the way.</p>
          <hr className="frontier-divider mb-6" />
          <p className="text-[10px] tracking-[0.15em] uppercase text-neutral-600">░▒▓█ Welcome to the frontier █▓▒░</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}>
      <div className={`absolute inset-0 bg-black/70 backdrop-blur-sm ${closing ? "modal-backdrop-exit" : "modal-backdrop-enter"}`} />

      <div className={`relative w-full max-w-5xl frontier-card p-0 overflow-hidden max-h-[90vh] overflow-y-auto retro-scrollbar ${closing ? "modal-content-exit" : "modal-content-enter"}`} style={{ backgroundColor: '#141416' }}>
        {/* Win98 title bar */}
        <div className="flex items-center justify-between px-2 py-2" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)' }}>
          <span className="text-[11px] font-bold text-white ml-2">Subscribe</span>
          <div className="flex gap-1">
            <span className="win98-btn" aria-hidden="true">
              <svg width="9" height="2" viewBox="0 0 9 2" fill="currentColor"><rect width="9" height="2"/></svg>
            </span>
            <span className="win98-btn" aria-hidden="true">
              <svg width="9" height="8" viewBox="0 0 9 8" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="0.75" y="0.75" width="7.5" height="6.5"/></svg>
            </span>
            <button onClick={handleClose} className="win98-btn" aria-label="Close" style={{ marginLeft: 4 }}>
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" stroke="currentColor" strokeWidth="1.5"><line x1="1" y1="1" x2="7" y2="7"/><line x1="7" y1="1" x2="1" y2="7"/></svg>
            </button>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row">

          {/* LEFT: Choose your plan */}
          <div className="flex-1 p-8 lg:p-10">
            <h2 className="font-heading text-2xl tracking-tight text-white mb-1">Choose your plan</h2>
            <p className="text-sm text-neutral-500 mb-6">Start free, upgrade when you&apos;re ready.</p>

            {/* Free / Paid toggle */}
            <div className="flex frontier-card p-1 mb-6 w-fit">
              <button
                onClick={() => setPlanType("free")}
                className={`px-5 py-2 text-sm rounded-lg transition-colors ${planType === "free" ? "bg-white/[0.1] text-white" : "text-neutral-500"}`}
              >
                Free
              </button>
              <button
                onClick={() => setPlanType("paid")}
                className={`px-5 py-2 text-sm rounded-lg transition-colors ${planType === "paid" ? "bg-white/[0.1] text-white" : "text-neutral-500"}`}
              >
                Paid
              </button>
            </div>

            {/* Free plan */}
            {planType === "free" && (
              <div className="space-y-5">
                <ul className="space-y-3">
                  {["One newsletter per week", "Limited access to resources", "Includes ads"].map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-neutral-300">
                      <span className="text-white">[✓]</span> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setSubmitted(true)} className="glow-btn-dark w-full px-6 py-3.5 rounded-lg text-sm font-semibold relative">
                  <span className="relative z-10">Subscribe for free</span>
                </button>
              </div>
            )}

            {/* Paid plan */}
            {planType === "paid" && (
              <div className="space-y-5">
                {/* Founder's discount */}
                <div className="rounded-xl px-4 py-3 border border-amber-500/30" style={{ background: "linear-gradient(135deg, rgba(245,158,11,0.08), rgba(245,158,11,0.03))" }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-amber-400 text-xs font-bold uppercase tracking-wide">Founder&apos;s Discount · 15% off</span>
                  </div>
                  <p className="text-sm text-neutral-400">
                    Claim your founder&apos;s pricing within the first <strong className="text-white">90 days</strong> — after that, this discount is gone for good.
                  </p>
                </div>

                {/* Annual */}
                <button
                  onClick={() => setBilling("annual")}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                    billing === "annual" ? "border-white/20 bg-white/[0.04]" : "border-white/[0.08]"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${billing === "annual" ? "border-white" : "border-neutral-600"}`}>
                    {billing === "annual" && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold text-sm">Annual</span>
                      <span className="text-[11px] font-bold text-green-400 bg-green-400/10 px-2 py-[2px] rounded-full">BEST DEAL</span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-sm text-neutral-500 line-through">$24/mo</span>
                      <span className="text-sm text-white font-semibold">$20/mo</span>
                      <span className="text-sm text-neutral-500">· billed $245/year</span>
                    </div>
                  </div>
                </button>

                {/* Monthly */}
                <button
                  onClick={() => setBilling("monthly")}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-colors ${
                    billing === "monthly" ? "border-white/20 bg-white/[0.04]" : "border-white/[0.08]"
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${billing === "monthly" ? "border-white" : "border-neutral-600"}`}>
                    {billing === "monthly" && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-white font-semibold text-sm">Monthly</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-sm text-neutral-500 line-through">$30/mo</span>
                      <span className="text-sm text-white font-semibold">$25.50/mo</span>
                    </div>
                  </div>
                </button>

                <button onClick={() => setSubmitted(true)} className="glow-btn-dark w-full px-6 py-3.5 rounded-lg text-sm font-semibold relative">
                  <span className="relative z-10">Start free trial</span>
                </button>
                <p className="text-[10px] text-neutral-600 text-center mt-2">Cancel anytime. No questions asked.</p>
              </div>
            )}
          </div>

          {/* RIGHT: Compare Plans */}
          <div className="flex-1 p-8 lg:p-10 lg:border-l border-white/[0.06]">
            <h3 className="font-heading text-lg tracking-tight text-white mb-5">Compare Plans</h3>
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left text-[10px] tracking-[0.15em] uppercase text-neutral-500 pb-3">Feature</th>
                  <th className="text-left text-[10px] tracking-[0.15em] uppercase text-neutral-500 pb-3">Free</th>
                  <th className="text-left text-[10px] tracking-[0.15em] uppercase text-neutral-600 pb-3">Paid</th>
                </tr>
              </thead>
              <tbody>
                {compareFeatures.map((row) => (
                  <tr key={row.feature} className="border-t border-white/[0.06]">
                    <td className="py-3 text-neutral-300">{row.feature}</td>
                    <td className="py-3 text-neutral-500">{row.free}</td>
                    <td className="py-3 text-white">{row.paid}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Testimonials */}
        <div className="p-8 lg:px-10 border-t border-white/[0.06]">
          <p className="text-[10px] tracking-[0.2em] uppercase text-neutral-600 mb-5 text-center">
            Don&apos;t just take our word for it
          </p>
          <div className="overflow-hidden">
            <div className="flex gap-4 animate-[scroll_30s_linear_infinite]" style={{ width: "max-content" }}>
              {[...testimonials, ...testimonials].map((t, i) => (
                <div key={i} className="frontier-card p-5 w-72 shrink-0">
                  <p className="text-sm text-neutral-300 leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${t.gradient} shrink-0`} />
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-neutral-500">{t.handle}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
