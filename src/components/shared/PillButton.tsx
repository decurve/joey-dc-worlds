import { cn } from "@/lib/utils";

interface PillButtonProps {
  children: React.ReactNode;
  variant?: "solid" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export function PillButton({
  children,
  variant = "solid",
  size = "md",
  className,
  href,
  onClick,
  type = "button",
}: PillButtonProps) {
  const base =
    "inline-flex items-center justify-center font-mono uppercase tracking-[0.15em] rounded-full transition-all duration-300 cursor-pointer whitespace-nowrap";

  const variants = {
    solid:
      "bg-accent text-black hover:bg-white",
    outline:
      "border border-white/20 text-white hover:border-white/50 hover:bg-white/5",
    ghost:
      "text-gray-400 hover:text-white",
  };

  const sizes = {
    sm: "text-[0.625rem] px-4 py-2",
    md: "text-[0.6875rem] px-6 py-3",
    lg: "text-xs px-8 py-4",
  };

  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
