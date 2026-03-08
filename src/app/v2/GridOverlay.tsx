"use client";

/**
 * GridOverlay — a grid of bordered square cells with gaps between them.
 * Each cell is a rectangle with a 1px stroke. The gap between cells is
 * empty space, so you see: border | gap | border | gap | border.
 * At intersections, the gaps form small empty squares.
 *
 * Grid starts at top of container. The nav naturally covers the top portion,
 * and the viewport clips the bottom, creating partial rows at top/bottom.
 */

import { useEffect, useRef, useState, useCallback } from "react";

type GridOverlayProps = {
  columns?: number;
  gapSize?: number; // px between cells
  sidePadding?: number; // px left/right page margin
  maxWidth?: number; // max width of the grid container
  maxRows?: number; // cap the number of visible rows
  lineColor?: string;
  className?: string;
  children?: React.ReactNode;
};

export default function GridOverlay({
  columns = 7,
  gapSize = 16,
  sidePadding = 48,
  maxWidth = 1300,
  maxRows,
  lineColor = "rgba(0,0,0,0.12)",
  className = "",
  children,
}: GridOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  const recalc = useCallback(() => {
    if (!containerRef.current) return;
    // Always use maxWidth for cell sizing so squares never shrink
    const h = containerRef.current.offsetHeight;
    const innerWidth = maxWidth - sidePadding * 2;
    const cs = (innerWidth - (columns - 1) * gapSize) / columns;
    setCellSize(Math.max(cs, 40));
    setContainerHeight(h);
  }, [columns, gapSize, sidePadding, maxWidth]);

  useEffect(() => {
    recalc();
    const ro = new ResizeObserver(recalc);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [recalc]);

  const autoRows = cellSize > 0 ? Math.ceil(containerHeight / (cellSize + gapSize)) + 1 : 0;
  const rowCount = maxRows ? Math.min(autoRows, maxRows) : autoRows;
  const totalCells = columns * rowCount;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Grid layer */}
      {cellSize > 0 && (
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center"
          style={{ zIndex: 0 }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: `${maxWidth}px`,
              padding: `0 ${sidePadding}px`,
              position: "relative",
            }}
          >
            {/* Edge lines — left and right edges of the grid */}
            <div
              style={{
                position: "absolute",
                left: sidePadding - gapSize,
                top: 0,
                bottom: 0,
                width: 0,
                borderLeft: `1px solid ${lineColor}`,
              }}
            />
            <div
              style={{
                position: "absolute",
                right: sidePadding - gapSize,
                top: 0,
                bottom: 0,
                width: 0,
                borderLeft: `1px solid ${lineColor}`,
              }}
            />

            {/* Grid cells */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${columns}, ${cellSize}px)`,
                gridAutoRows: `${cellSize}px`,
                gap: `${gapSize}px`,
              }}
            >
              {Array.from({ length: totalCells }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    border: `1px solid ${lineColor}`,
                    width: cellSize,
                    height: cellSize,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content layer */}
      <div className="relative mx-auto" style={{ zIndex: 1, maxWidth: `${maxWidth}px` }}>
        {children}
      </div>
    </div>
  );
}
