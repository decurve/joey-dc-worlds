"use client";

import { useState } from "react";
import { submitEmail } from "@/lib/email";
import { cn } from "@/lib/utils";

interface EmailCaptureProps {
  source: string;
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

export function EmailCapture({
  source,
  placeholder = "Enter your email",
  buttonText = "Get Access",
  className,
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    const result = await submitEmail(email, source);
    setStatus(result.success ? "success" : "error");

    if (result.success) {
      setEmail("");
    }
  }

  if (status === "success") {
    return (
      <div className={cn("text-center", className)}>
        <p className="text-accent text-sm tracking-wide uppercase">
          You&apos;re in. We&apos;ll be in touch.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col sm:flex-row gap-3", className)}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        required
        className="flex-1 bg-white/5 border border-white/10 rounded-full px-5 py-3 text-sm text-white placeholder:text-gray-500 font-mono focus:outline-none focus:border-white/30 transition-colors"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-accent text-black font-mono text-[0.6875rem] tracking-[0.15em] uppercase px-6 py-3 rounded-full hover:bg-white transition-all duration-300 disabled:opacity-50 cursor-pointer whitespace-nowrap"
      >
        {status === "loading" ? "..." : buttonText}
      </button>
      {status === "error" && (
        <p className="text-red-400 text-xs mt-2 sm:mt-0 sm:self-center">Something went wrong.</p>
      )}
    </form>
  );
}
