"use client";

import { Search, ArrowUpRight, ChevronDown } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useHeroVisual } from "./HeroVisualContext";
import GlowButton from "./GlowButton";
import { heroVisuals } from "./HeroVisuals";
import type { HeroVisualId } from "./HeroVisuals";

const navLinks = [
  { key: "S", label: "GROWTH STUDIO", href: "/v2/services" },
  { key: "P", label: "GROWTH PROGRAM", href: "/v2/growth-program" },
  { key: "N", label: "NEWSLETTER", href: "/v2#newsletter" },
  { key: "M", label: "MANIFESTO", href: "/v2/manifesto" },
  { key: "F", label: "THE FRONTIER", href: "/v2/frontier", icon: ArrowUpRight },
];

// Box-drawing and block characters for the glitch effect
const glyphSets = [
  // Normal state — small boxes
  ["┌", "─", "┐", "│", " ", "│", "└", "─", "┘"],
  ["╔", "═", "╗", "║", "░", "║", "╚", "═", "╝"],
  ["┏", "━", "┓", "┃", "▒", "┃", "┗", "━", "┛"],
  ["╭", "─", "╮", "│", "▓", "│", "╰", "─", "╯"],
  ["┌", "┬", "┐", "├", "┼", "┤", "└", "┴", "┘"],
  ["╔", "╦", "╗", "╠", "█", "╣", "╚", "╩", "╝"],
  ["░", "▒", "▓", "▒", "█", "▒", "▓", "▒", "░"],
  ["╓", "─", "╖", "║", "◈", "║", "╙", "─", "╜"],
];

function AsciiBoxes({ isDark }: { isDark: boolean }) {
  const [currentSet, setCurrentSet] = useState(0);
  const lastScrollY = useRef(0);
  const glitchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onScroll() {
      const delta = Math.abs(window.scrollY - lastScrollY.current);
      lastScrollY.current = window.scrollY;

      // Only glitch when scrolling more than 30px since last trigger
      if (delta > 30) {
        // Pick a random glyph set (different from current)
        setCurrentSet((prev) => {
          let next = Math.floor(Math.random() * glyphSets.length);
          while (next === prev) next = Math.floor(Math.random() * glyphSets.length);
          return next;
        });

        // Extra rapid glitch: briefly show another set then settle
        if (glitchTimeout.current) clearTimeout(glitchTimeout.current);
        glitchTimeout.current = setTimeout(() => {
          setCurrentSet((prev) => {
            let next = Math.floor(Math.random() * glyphSets.length);
            while (next === prev) next = Math.floor(Math.random() * glyphSets.length);
            return next;
          });
        }, 80);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (glitchTimeout.current) clearTimeout(glitchTimeout.current);
    };
  }, []);

  const glyphs = glyphSets[currentSet];
  const color = isDark ? "text-neutral-500" : "text-neutral-400";

  return (
    <div
      className={`hidden md:flex items-center gap-[2px] font-mono text-[10px] leading-[1] ${color} select-none transition-none`}
      aria-hidden="true"
    >
      {/* 3 small boxes side by side */}
      {[0, 1, 2].map((boxIdx) => (
        <div key={boxIdx} className="flex flex-col items-center" style={{ lineHeight: "10px" }}>
          <span>{glyphs[(boxIdx * 3) % glyphs.length]}{glyphs[(boxIdx * 3 + 1) % glyphs.length]}{glyphs[(boxIdx * 3 + 2) % glyphs.length]}</span>
        </div>
      ))}
    </div>
  );
}

function HeroVisualDropdown() {
  const { visualId, setVisualId } = useHeroVisual();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const current = heroVisuals.find((v) => v.id === visualId);

  return (
    <div ref={ref} className="relative hidden md:block">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="nav-pill flex items-center gap-1.5 transition-colors v2-nav-hover hover:text-black"
      >
        <span className="opacity-40">[V]</span> VISUAL
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-64 border border-black/10 bg-[#f9f9f8]/95 backdrop-blur-sm shadow-lg z-50 dropdown-animate"
          style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
        >
          <div className="px-3 py-2 border-b border-black/10 font-mono-ui text-[10px] uppercase tracking-widest text-neutral-400">
            Hero Visual
          </div>
          {heroVisuals.map((v) => (
            <button
              key={v.id}
              onClick={() => { setVisualId(v.id as HeroVisualId); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center gap-2 ${
                visualId === v.id ? "bg-black text-white" : "hover:bg-black/5"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${visualId === v.id ? "bg-white" : "bg-black/20"}`} />
              {v.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

type V2NavProps = {
  currentPage?: string;
  variant?: "light" | "dark";
  minimal?: boolean;
  searchSlot?: React.ReactNode;
};

export default function V2Nav({ currentPage, variant = "light", minimal = false, searchSlot }: V2NavProps) {
  const isDark = variant === "dark";

  const pillClass = isDark ? "v2-nav-pill-dark" : "nav-pill";
  const hoverClass = isDark ? "v2-nav-hover-dark" : "v2-nav-hover";

  return (
    <nav
      aria-label="Primary navigation"
      className={`fixed top-0 left-0 right-0 z-50 flex items-center font-mono-ui text-xs tracking-wide ${
        isDark ? "text-neutral-400" : "text-neutral-600"
      }`}
      style={{ padding: "12px 24px" }}
    >
      {/* DC Logo + Nav links — left aligned together */}
      <div className="flex items-center gap-4 shrink-0">
        <a
          href="/v2"
          className={`${pillClass} font-semibold flex items-center gap-2 text-sm hover:opacity-80 transition-opacity ${
            isDark ? "text-white" : "text-black"
          }`}
        >
          <span className={`w-3 h-3 rounded-full ${isDark ? "bg-white" : "bg-black"}`} aria-hidden="true" /> DC
        </a>

        {!minimal && <div className="hidden md:flex gap-3">
          {navLinks.map((link) => {
            const isActive = currentPage === link.label;
            const activeColor = isDark ? "text-white" : "text-black";

            return (
              <a
                key={link.key}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`${pillClass} transition-colors ${
                  isActive ? activeColor : `${hoverClass} ${isDark ? "hover:text-white" : "hover:text-black"}`
                }`}
              >
                {link.label}
                {link.icon && <link.icon className="w-3 h-3 inline-block -mt-0.5 ml-0.5" />}
              </a>
            );
          })}
        </div>}
      </div>

      <div className="flex-1" />

      {/* Right side — pinned right */}
      <div className="flex items-center gap-3 shrink-0">
        {isDark && (
          <>
            {searchSlot}
            <button className="bg-white text-black px-3 py-1.5 rounded-md hover:bg-neutral-200 transition-colors text-xs font-medium border border-white">
              Join The Frontier
            </button>
          </>
        )}

        {!isDark && (
          <>
            <HeroVisualDropdown />
            <a
              href="#"
              className="nav-pill glow-btn relative text-white transition-colors"
            >
              <span className="relative z-10">CONTACT</span>
            </a>
          </>
        )}
      </div>
    </nav>
  );
}
