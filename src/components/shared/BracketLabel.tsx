"use client";

import { cn } from "@/lib/utils";

interface BracketLabelProps {
  text: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function BracketLabel({
  text,
  className,
  size = "md",
}: BracketLabelProps) {
  const sizeClasses = {
    sm: "text-[0.625rem] tracking-[0.2em]",
    md: "text-[0.6875rem] tracking-[0.2em]",
    lg: "text-xs tracking-[0.25em]",
  };

  return (
    <span
      className={cn(
        "inline-block font-mono uppercase text-gray-400",
        sizeClasses[size],
        className
      )}
    >
      [{text}]
    </span>
  );
}
