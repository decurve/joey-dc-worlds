"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";

const hoverStyles = `
/* 1. Magnetic Pull — button slightly follows cursor direction */
.hover-1:hover {
  transform: scale(1.03) translateY(-2px);
  box-shadow: 0 0 0 1px rgba(0,0,0,0.8), 0 8px 30px rgba(0,0,0,0.35), inset 0 1px 6px rgba(255,255,255,0.3);
  background: linear-gradient(to bottom, #333 0%, #111 100%);
}

/* 2. Glow Pulse — pulsing outer glow on hover */
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 0 1px rgba(0,0,0,0.8), 0 0 20px 4px rgba(0,0,0,0.25), 0 0 40px 8px rgba(0,0,0,0.12); }
  50% { box-shadow: 0 0 0 1px rgba(0,0,0,0.8), 0 0 35px 10px rgba(0,0,0,0.35), 0 0 60px 20px rgba(0,0,0,0.15); }
}
.hover-2:hover {
  animation: glow-pulse 2s ease-in-out infinite;
}

/* 3. Border Reveal — white border draws in on hover */
.hover-3 { position: relative; }
.hover-3::after {
  content: '';
  position: absolute;
  inset: -3px;
  border: 1.5px solid rgba(255,255,255,0);
  border-radius: 10px;
  transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
}
.hover-3:hover::after {
  border-color: rgba(0,0,0,0.25);
  inset: -6px;
}

/* 4. Underline Slide — line slides in from left under text */
.hover-4 { position: relative; }
.hover-4::after {
  content: '';
  position: absolute;
  bottom: 8px;
  left: 24px;
  right: 24px;
  height: 1px;
  background: rgba(255,255,255,0.5);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
}
.hover-4:hover::after {
  transform: scaleX(1);
}

/* 5. Invert — flips to white bg black text */
.hover-5 {
  transition: all 0.3s cubic-bezier(0.16,1,0.3,1) !important;
}
.hover-5:hover {
  background: #fff !important;
  color: #000 !important;
  border-color: rgba(0,0,0,0.2) !important;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.08) !important;
}

/* 6. Diagonal Wipe — gradient sweeps across */
.hover-6 {
  background-size: 200% 100% !important;
  background-image: linear-gradient(120deg, #0a0a0a 0%, #0a0a0a 49%, #333 50%, #1a1a1a 100%) !important;
  background-position: 100% 0 !important;
  transition: background-position 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s, transform 0.3s !important;
}
.hover-6:hover {
  background-position: 0% 0 !important;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.3) !important;
}

/* 7. Shake — subtle horizontal shake */
@keyframes micro-shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-2px); }
  75% { transform: translateX(2px); }
}
.hover-7:hover {
  animation: micro-shake 0.3s ease-in-out;
}

/* 8. Press Down — sinks into the surface */
.hover-8:hover {
  transform: translateY(2px) !important;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.3), inset 0 2px 8px rgba(0,0,0,0.4) !important;
  background: linear-gradient(to bottom, #111 0%, #0a0a0a 100%) !important;
}

/* 9. Rainbow Border — animated gradient border */
@keyframes rainbow-rotate {
  to { --rainbow-angle: 360deg; }
}
.hover-9 { position: relative; overflow: visible !important; }
.hover-9::before {
  content: '';
  position: absolute;
  inset: -2px;
  border-radius: 8px;
  background: conic-gradient(from 0deg, #ff6b6b, #ffd93d, #6bcb77, #4d96ff, #ff6b6b);
  opacity: 0;
  z-index: -1;
  transition: opacity 0.4s;
  animation: rainbow-spin 3s linear infinite;
}
@keyframes rainbow-spin {
  to { transform: rotate(360deg); }
}
.hover-9:hover::before {
  opacity: 1;
}

/* 10. Expand Arrow — arrow slides further right */
.hover-10 .arrow-icon {
  transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
}
.hover-10:hover .arrow-icon {
  transform: translateX(4px);
}

/* 11. Text Tracking Expand — letters spread on hover */
.hover-11 .btn-text {
  transition: letter-spacing 0.4s cubic-bezier(0.16,1,0.3,1);
  letter-spacing: 0;
}
.hover-11:hover .btn-text {
  letter-spacing: 0.08em;
}

/* 12. Spotlight — radial gradient follows center on hover */
.hover-12:hover {
  background: radial-gradient(circle at 50% 50%, #333 0%, #0a0a0a 70%) !important;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.8), 0 0 40px 8px rgba(0,0,0,0.2) !important;
}

/* 13. Glitch Flicker — brief opacity flicker */
@keyframes glitch-flicker {
  0%, 100% { opacity: 1; }
  10% { opacity: 0.8; }
  12% { opacity: 1; }
  20% { opacity: 0.6; }
  22% { opacity: 1; }
  50% { opacity: 0.9; }
  52% { opacity: 1; }
}
.hover-13:hover {
  animation: glitch-flicker 0.4s ease-in-out;
}

/* 14. Dotted Border Orbit — dotted outline appears and rotates */
.hover-14 { position: relative; overflow: visible !important; }
.hover-14::after {
  content: '';
  position: absolute;
  inset: -5px;
  border: 1px dashed rgba(0,0,0,0);
  border-radius: 10px;
  transition: border-color 0.3s;
}
.hover-14:hover::after {
  border-color: rgba(0,0,0,0.25);
}

/* 15. Shadow Lift — dramatic shadow lift */
.hover-15:hover {
  transform: translateY(-3px) !important;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.6), 0 20px 40px -8px rgba(0,0,0,0.5), 0 8px 16px -4px rgba(0,0,0,0.3) !important;
}

/* 16. Fill from Left — white fill sweeps left to right */
.hover-16 { position: relative; z-index: 1; }
.hover-16::after {
  content: '';
  position: absolute;
  top: 0; left: 0; bottom: 0;
  width: 0%;
  background: rgba(255,255,255,0.08);
  transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
  z-index: -1;
  border-radius: 6px;
}
.hover-16:hover::after {
  width: 100%;
}

/* 17. Neon Glow — colored glow appears */
.hover-17:hover {
  box-shadow: 0 0 0 1px rgba(0,0,0,0.8), 0 0 15px 2px rgba(100,140,255,0.3), 0 0 40px 8px rgba(100,140,255,0.15) !important;
}

/* 18. Outline Ghost — becomes outlined/ghost on hover */
.hover-18:hover {
  background: transparent !important;
  color: #000 !important;
  border: 1.5px solid #000 !important;
  box-shadow: none !important;
}

/* 19. Squish — horizontal squish and bounce */
@keyframes squish {
  0% { transform: scaleX(1) scaleY(1); }
  30% { transform: scaleX(1.06) scaleY(0.94); }
  60% { transform: scaleX(0.97) scaleY(1.02); }
  100% { transform: scaleX(1) scaleY(1); }
}
.hover-19:hover {
  animation: squish 0.4s cubic-bezier(0.16,1,0.3,1);
}

/* 20. Scanline — CRT-style scanline sweep */
.hover-20 { position: relative; overflow: hidden !important; }
.hover-20::after {
  content: '';
  position: absolute;
  top: -100%;
  left: 0;
  right: 0;
  height: 200%;
  background: repeating-linear-gradient(
    to bottom,
    transparent,
    transparent 2px,
    rgba(255,255,255,0.03) 2px,
    rgba(255,255,255,0.03) 4px
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s;
}
@keyframes scanline-move {
  to { transform: translateY(50%); }
}
.hover-20:hover::after {
  opacity: 1;
  animation: scanline-move 2s linear infinite;
}
.hover-20:hover {
  box-shadow: 0 0 0 1px rgba(0,0,0,0.8), 0 0 30px 6px rgba(0,0,0,0.3), inset 0 0 30px rgba(255,255,255,0.05) !important;
}
`;

const effects = [
  { id: 1, name: "Magnetic Pull", desc: "Scale up + lift with deeper shadow" },
  { id: 2, name: "Glow Pulse", desc: "Pulsing outer glow animation" },
  { id: 3, name: "Border Reveal", desc: "Outer border fades in and expands" },
  { id: 4, name: "Underline Slide", desc: "Line slides in under the text" },
  { id: 5, name: "Invert", desc: "Flips to white bg / black text" },
  { id: 6, name: "Diagonal Wipe", desc: "Gradient sweeps across the button" },
  { id: 7, name: "Micro Shake", desc: "Quick horizontal shake" },
  { id: 8, name: "Press Down", desc: "Sinks into the surface like a real button" },
  { id: 9, name: "Rainbow Border", desc: "Spinning rainbow gradient border" },
  { id: 10, name: "Arrow Slide", desc: "Arrow icon slides further right" },
  { id: 11, name: "Letter Spread", desc: "Text tracking widens on hover" },
  { id: 12, name: "Spotlight", desc: "Radial light gradient appears at center" },
  { id: 13, name: "Glitch Flicker", desc: "Brief CRT-style opacity flicker" },
  { id: 14, name: "Dotted Orbit", desc: "Dashed border outline appears" },
  { id: 15, name: "Shadow Lift", desc: "Dramatic lift with long shadow" },
  { id: 16, name: "Fill from Left", desc: "Light fill sweeps left to right" },
  { id: 17, name: "Neon Glow", desc: "Colored blue/purple glow" },
  { id: 18, name: "Ghost Outline", desc: "Becomes transparent outlined button" },
  { id: 19, name: "Squish Bounce", desc: "Playful horizontal squish" },
  { id: 20, name: "Scanline Sweep", desc: "CRT scanlines scroll across" },
];

export default function ButtonHoversPage() {
  const [favorite, setFavorite] = useState<number | null>(null);

  return (
    <div
      className="min-h-screen bg-[#f4f4f2] text-[#1a1a1a] py-16 px-6"
      style={{ fontFamily: "'IBM Plex Mono', ui-monospace, monospace" }}
    >
      <style dangerouslySetInnerHTML={{ __html: hoverStyles }} />

      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-400 mb-4">
            Button Hover Exploration — 20 Options
          </div>
          <h1
            className="text-4xl md:text-5xl tracking-tight mb-3"
            style={{ fontFamily: "'PP Mondwest', monospace", fontWeight: 700 }}
          >
            Pick a hover effect
          </h1>
          <p className="text-neutral-500 text-sm max-w-xl">
            Each button uses the same base glow-btn styling. Hover over each one to see the effect. Click the number to mark your favorite.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {effects.map((effect) => (
            <div
              key={effect.id}
              className={`border border-black/10 rounded-md p-6 transition-colors ${
                favorite === effect.id ? "bg-yellow-50 border-yellow-300" : "bg-white"
              }`}
            >
              <div className="flex items-center gap-3 mb-1">
                <button
                  onClick={() => setFavorite(favorite === effect.id ? null : effect.id)}
                  className={`w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center border transition-colors ${
                    favorite === effect.id
                      ? "bg-black text-white border-black"
                      : "border-black/20 text-neutral-400 hover:border-black hover:text-black"
                  }`}
                >
                  {effect.id}
                </button>
                <span className="font-medium text-sm">{effect.name}</span>
              </div>
              <p className="text-[11px] text-neutral-400 mb-5 ml-9">{effect.desc}</p>

              <div className="flex justify-center py-4">
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className={`hover-${effect.id} glow-btn relative px-6 py-3 rounded-md font-medium text-sm overflow-hidden inline-flex items-center justify-center shrink-0`}
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="btn-text">Explore the Growth Program</span>
                    <ArrowRight className="w-4 h-4 arrow-icon" />
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {favorite && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-3 rounded-md text-sm font-medium shadow-lg z-50">
            Favorite: #{favorite} — {effects.find((e) => e.id === favorite)?.name}
          </div>
        )}
      </div>
    </div>
  );
}
