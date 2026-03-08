import { BracketLabel } from "./BracketLabel";
import { cn } from "@/lib/utils";

interface FooterProps {
  brand?: string;
  mode?: "light" | "dark";
}

export function Footer({ brand = "DEMAND CURVE", mode = "dark" }: FooterProps) {
  const isLight = mode === "light";

  return (
    <footer
      className={cn(
        "px-6 md:px-12 py-12",
        isLight ? "border-t border-gray-200" : "border-t border-white/8"
      )}
    >
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <BracketLabel
          text={brand}
          size="sm"
          className={isLight ? "text-gray-400" : "text-gray-500"}
        />
        <p
          className={cn(
            "text-[0.625rem] tracking-[0.15em] uppercase",
            isLight ? "text-gray-400" : "text-gray-600"
          )}
        >
          &copy; {new Date().getFullYear()} Demand Curve. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
