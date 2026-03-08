import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  narrow?: boolean;
  centered?: boolean;
}

export function Section({ children, className, id, narrow, centered }: SectionProps) {
  return (
    <section
      id={id}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "clamp(6rem, 12vw, 12rem)",
        paddingBottom: "clamp(6rem, 12vw, 12rem)",
      }}
      className={cn(
        "px-6 md:px-12",
        className
      )}
    >
      <div
        style={{
          width: "100%",
          maxWidth: narrow ? 800 : 1200,
          ...(centered ? { textAlign: "center" as const } : {}),
        }}
      >
        {children}
      </div>
    </section>
  );
}
