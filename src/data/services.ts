import type { IconName } from "@/components/Icons";

/** What Velorex Studio builds for clients. Drives /services and the homepage. */

export type Service = {
  slug: string;
  index: string;
  title: string;
  icon: IconName;
  summary: string;
  items: string[];
};

export const services: Service[] = [
  {
    slug: "web",
    icon: "web",
    index: "01",
    title: "Web Development",
    summary:
      "Fast, accessible front ends and the systems behind them — from a single landing page to a full product surface.",
    items: [
      "Websites",
      "Landing pages",
      "E-commerce",
      "Web applications",
      "Dashboards",
      "SaaS",
    ],
  },
  {
    slug: "software",
    icon: "desktop",
    index: "02",
    title: "Software Development",
    summary:
      "Native and cross-platform applications for work that a browser tab cannot do well.",
    items: [
      "Desktop applications",
      "Business software",
      "Internal tools",
      "Automation",
      "Custom applications",
    ],
  },
  {
    slug: "ai",
    icon: "ai",
    index: "03",
    title: "AI & Automation",
    summary:
      "Intelligence applied where it removes real work — not bolted on as a demo.",
    items: [
      "AI-powered applications",
      "AI assistants",
      "Workflow automation",
      "Data processing",
      "Intelligent search",
    ],
  },
  {
    slug: "design",
    icon: "design",
    index: "04",
    title: "Product Design",
    summary:
      "The thinking before the building: what it should be, how it should feel, why it should exist.",
    items: [
      "UI/UX",
      "Design systems",
      "Prototyping",
      "Interaction design",
      "Product strategy",
    ],
  },
  {
    slug: "cloud",
    icon: "cloud",
    index: "05",
    title: "Cloud & Backend",
    summary:
      "The unglamorous layer that decides whether a product survives its first real month.",
    items: [
      "APIs",
      "Databases",
      "Cloud infrastructure",
      "Authentication",
      "Storage",
      "Deployment",
    ],
  },
];

/** The lifecycle diagram on the services section. */
export const pipeline = [
  "Idea",
  "Research",
  "Design",
  "Engineering",
  "Testing",
  "Launch",
  "Grow",
] as const;

export const pipelineIcons: Record<(typeof pipeline)[number], IconName> = {
  Idea: "idea",
  Research: "search",
  Design: "design",
  Engineering: "code",
  Testing: "check",
  Launch: "rocket",
  Grow: "grow",
};

/** How we work — the 5-step timeline. */
export const process = [
  {
    step: "01",
    icon: "search" as IconName,
    title: "Discover",
    body: "Understand the problem.",
    detail:
      "Before anything is designed we work out what is actually being solved, for whom, and what success would look like.",
  },
  {
    step: "02",
    icon: "design" as IconName,
    title: "Design",
    body: "Turn ideas into experiences.",
    detail:
      "Structure, flow and interface. We design the product as a whole system rather than a sequence of screens.",
  },
  {
    step: "03",
    icon: "build" as IconName,
    title: "Build",
    body: "Engineer the product.",
    detail:
      "Clean architecture, readable code, and the boring decisions that make a codebase survivable a year later.",
  },
  {
    step: "04",
    icon: "check" as IconName,
    title: "Test",
    body: "Refine and validate.",
    detail:
      "Real usage, real edge cases, real devices. Performance and accessibility are checked, not assumed.",
  },
  {
    step: "05",
    icon: "rocket" as IconName,
    title: "Launch",
    body: "Ship and improve.",
    detail:
      "Shipping is the start of the work. We instrument, watch, and keep refining after release.",
  },
] as const;

/** Principles — deliberately not "best quality / affordable prices". */
export const principles = [
  {
    title: "Product Thinking",
    icon: "compass" as IconName,
    body: "We don't just build features. We think about the product.",
  },
  {
    title: "Design First",
    icon: "layers" as IconName,
    body: "Software should be powerful and beautiful.",
  },
  {
    title: "Engineered To Last",
    icon: "blocks" as IconName,
    body: "Clean architecture and maintainable systems.",
  },
  {
    title: "AI Ready",
    icon: "cpu" as IconName,
    body: "We build products ready for the next generation of computing.",
  },
  {
    title: "Human First",
    icon: "human" as IconName,
    body: "Technology should make people's lives easier.",
  },
] as const;
