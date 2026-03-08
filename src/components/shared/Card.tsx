import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className,
  hover = false,
  glass = false,
  onClick,
}: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "border border-white/8 rounded-sm p-6 md:p-8",
        glass ? "glass" : "bg-gray-950",
        hover &&
          "cursor-pointer transition-all duration-300 hover:border-white/20 hover:bg-white/[0.03]",
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
