export interface VaultItem {
  id: string;
  title: string;
  description: string;
  category: string;
  type: "teardown" | "playbook" | "research" | "framework";
  locked: boolean;
}

export interface Pillar {
  id: string;
  number: number;
  title: string;
  headline: string;
  body: string;
  whyItWorks: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface PersonaCard {
  title: string;
  subtitle: string;
  description: string;
  traits: string[];
  mindset: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface Program {
  id: string;
  name: string;
  description: string;
  href?: string;
  status: "Active" | "Coming Soon";
}

export interface Differentiator {
  title: string;
  description: string;
}

export interface SocialProofStat {
  value: string;
  label: string;
}
