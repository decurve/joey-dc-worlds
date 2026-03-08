"use client";

import { cn } from "@/lib/utils";
import type { NavLink } from "@/types";

interface NavProps {
  brand: string;
  links: NavLink[];
  mode?: "light" | "dark";
  className?: string;
}

export function Nav({ brand, links, mode = "dark", className }: NavProps) {
  const isLight = mode === "light";

  return (
    <nav
      className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50",
        isLight ? "glass-light" : "glass",
        "rounded-full",
        "px-6 py-3",
        "flex items-center gap-8",
        "animate-fade-in",
        className
      )}
    >
      <a
        href="/"
        className={cn(
          "font-mono text-[0.6875rem] tracking-[0.25em] uppercase transition-colors",
          isLight
            ? "text-gray-900 hover:text-collective"
            : "text-white hover:text-accent"
        )}
      >
        [{brand}]
      </a>

      <div className="flex items-center gap-6">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={cn(
              "font-mono text-[0.625rem] tracking-[0.15em] uppercase transition-colors hidden md:block",
              isLight
                ? "text-gray-500 hover:text-gray-900"
                : "text-gray-400 hover:text-white"
            )}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
