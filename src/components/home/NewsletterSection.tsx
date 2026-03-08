"use client";

import { useState } from "react";
import { BracketLabel } from "@/components/shared/BracketLabel";
import { submitEmail } from "@/lib/email";
import { useScrollReveal } from "@/lib/useScrollReveal";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const ref = useScrollReveal();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    const result = await submitEmail(email, "home-newsletter");
    setStatus(result.success ? "success" : "error");
    if (result.success) setEmail("");
  }

  return (
    <section
      id="newsletter"
      className="flex flex-col items-center px-6 md:px-12 border-t border-white/8"
      style={{
        paddingTop: "clamp(6rem, 12vw, 12rem)",
        paddingBottom: "clamp(6rem, 12vw, 12rem)",
      }}
    >
      <div
        ref={ref}
        className="reveal w-full max-w-[600px] text-center"
      >
        <BracketLabel text="NEWSLETTER" className="mb-6 block text-gray-500" />

        <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-light text-white uppercase tracking-wide mb-4">
          Stay on the frontier.
        </h2>

        <p className="text-gray-400 text-sm leading-relaxed mb-10">
          Weekly intelligence on what&apos;s working in growth — from the team
          that&apos;s spent a decade studying what actually compounds. 100,000+
          founders and operators. Zero spam.
        </p>

        {status === "success" ? (
          <p className="text-white text-sm tracking-wide uppercase">
            You&apos;re in. Welcome to the frontier.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder:text-gray-500 font-mono focus:outline-none focus:border-white/30 transition-colors"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="bg-white text-black font-mono text-[0.6875rem] tracking-[0.15em] uppercase px-6 py-3 rounded-full hover:bg-gray-200 transition-all duration-300 disabled:opacity-50 cursor-pointer whitespace-nowrap"
            >
              {status === "loading" ? "..." : "Get the insights"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="text-red-400 text-xs mt-3">Something went wrong.</p>
        )}
      </div>
    </section>
  );
}
