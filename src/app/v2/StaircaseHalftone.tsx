"use client";

import { useRef, useState, useCallback, useEffect } from "react";

/**
 * StaircaseHalftone — one continuous halftone image clipped to a staircase
 * shape that aligns with the grid. The image is solid — no grid lines
 * show through it. The staircase steps up and to the right.
 *
 * Layout (5 cols x 5 rows, 0 = empty, X = filled):
 *   Row 0:  0 0 0 X X        ← 2 cols (top)
 *   Row 1:  0 X X X X        ← 4 cols (over 2 from row 0)
 *   Row 2:  X X X X X        ← 5 cols (over 1 from row 1)
 *   Row 3:  X X X X X        ← 5 cols
 *   Row 4:  X X X X X        ← 5 cols (bottom)
 *
 * Steps bottom→top: up 1 over 1, up 1 over 2, up 1
 */
export default function StaircaseHalftone({
  columns = 5,
  rows = 5,
  gapSize = 16,
}: {
  columns?: number;
  rows?: number;
  gapSize?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [clipPath, setClipPath] = useState("none");
  const [computedHeight, setComputedHeight] = useState(0);

  const buildClip = useCallback(() => {
    if (!ref.current) return;
    const w = ref.current.offsetWidth;

    // Use square cells — cellH = cellW — so rows align with the grid overlay
    const cellW = (w - (columns - 1) * gapSize) / columns;
    const cellH = cellW;
    const totalH = rows * cellH + (rows - 1) * gapSize;
    setComputedHeight(totalH);

    const unitX = (col: number) => col * (cellW + gapSize);
    const unitY = (row: number) => row * (cellH + gapSize);

    // Staircase polygon (clockwise from top-left of filled area):
    // Steps bottom→top: up 1 over 1, up 1 over 2, up 1
    // Row 0: col3-4 (2 cols), Row 1: col1-4 (4 cols), Row 2-4: col0-4 (full)
    const points = [
      `${unitX(3)}px 0px`,               // top-left of row 0 (col 3) — flush with top
      `${w}px 0px`,                       // top-right corner
      `${w}px ${totalH}px`,              // bottom-right corner
      `0px ${totalH}px`,                 // bottom-left corner
      `0px ${unitY(2)}px`,               // left edge up to row 2
      `${unitX(1)}px ${unitY(2)}px`,     // step right to col 1 (over 1)
      `${unitX(1)}px ${unitY(1)}px`,     // step up to row 1
      `${unitX(3)}px ${unitY(1)}px`,     // step right to col 3 (over 2)
      `${unitX(3)}px 0px`,               // step up to row 0 (close)
    ];

    setClipPath(`polygon(${points.join(", ")})`);
  }, [columns, rows, gapSize]);

  useEffect(() => {
    buildClip();
    const ro = new ResizeObserver(buildClip);
    if (ref.current) ro.observe(ref.current);
    return () => ro.disconnect();
  }, [buildClip]);

  return (
    <div
      ref={ref}
      className="w-full h-full relative"
      style={{ height: computedHeight > 0 ? computedHeight : undefined, minHeight: computedHeight > 0 ? undefined : "480px", clipPath, WebkitClipPath: clipPath }}
    >
      {/* Solid blue fill so you can see the exact clipped shape */}
      <div className="absolute inset-0" style={{ background: "#3B82F6" }} />
    </div>
  );
}
