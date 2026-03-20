"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

type SearchItem = {
  title: string;
  type: string;
  view: string;
  sub?: string;
};

export default function SearchBar({
  items,
  onNavigate,
}: {
  items: SearchItem[];
  onNavigate: (view: string, sub?: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // "/" and Cmd+K / Ctrl+K keyboard shortcuts
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      // Cmd+K (Mac) or Ctrl+K (Windows)
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        return;
      }
      if (
        e.key === "/" &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape" && focused) {
        inputRef.current?.blur();
        setQuery("");
        setFocused(false);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [focused]);

  const results = query.length > 0
    ? items
        .filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.type.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 8)
    : [];

  return (
    <div className="relative hidden md:block w-64">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-500" />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 150)}
        placeholder="Search..."
        className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg py-2 pl-9 pr-8 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/15 transition-colors"
      />
      {!query && (
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded border border-white/[0.08] text-[9px] text-neutral-600">
          <span className="hidden sm:inline">&#8984;K</span>
        </div>
      )}
      {query && (
        <button
          onClick={() => {
            setQuery("");
            inputRef.current?.focus();
          }}
          className="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center text-neutral-500 hover:text-white"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Dropdown */}
      {focused && results.length > 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 frontier-card p-2 z-50 max-h-80 overflow-y-auto retro-scrollbar" style={{ backgroundColor: '#1a1a1c' }}>
          {results.map((item, i) => (
            <button
              key={`${item.view}-${item.sub || ""}-${i}`}
              onMouseDown={() => {
                onNavigate(item.view, item.sub);
                setQuery("");
                setFocused(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/[0.06] transition-colors flex items-center justify-between"
            >
              <span className="text-sm text-white truncate">{item.title}</span>
              <span className={`frontier-tag text-[8px] ml-2 shrink-0 ${item.type === "Action" ? "text-amber-400 border-amber-400/30" : ""}`}>
                {item.type}
              </span>
            </button>
          ))}
        </div>
      )}

      {focused && query.length > 0 && results.length === 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 frontier-card p-4 z-50 text-center" style={{ backgroundColor: '#1a1a1c' }}>
          <p className="text-xs text-neutral-500">No results for &ldquo;{query}&rdquo;</p>
        </div>
      )}
    </div>
  );
}
