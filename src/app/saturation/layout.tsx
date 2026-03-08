import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saturation — AI Search Strategy by Demand Curve x Galactic Fed",
  description:
    "Search changed. Your agency didn't. Purpose-built AI search strategy from Demand Curve and Galactic Fed.",
  openGraph: {
    title: "Saturation — AI Search Strategy",
    description:
      "Search changed. Your agency didn't. Purpose-built AI search strategy from Demand Curve and Galactic Fed.",
    type: "website",
  },
};

export default function SaturationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
