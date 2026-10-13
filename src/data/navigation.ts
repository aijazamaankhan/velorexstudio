import { FOOTER_PRODUCT_COUNT, products } from "./products";
import { ventures } from "./ventures";

export type NavLink = { label: string; href: string };

export const primaryNav: NavLink[] = [
  { label: "Products", href: "/products" },
  { label: "Ventures", href: "/ventures" },
  { label: "Services", href: "/services" },
  { label: "Studio", href: "/studio" },
  { label: "Work", href: "/work" },
  { label: "Team", href: "/team" },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Navigate",
    links: [
      { label: "Products", href: "/products" },
      { label: "Ventures", href: "/ventures" },
      { label: "Services", href: "/services" },
      { label: "Work", href: "/work" },
      { label: "Studio", href: "/studio" },
      { label: "Team", href: "/team" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    // Generated: the first FOOTER_PRODUCT_COUNT products by name, then a link
    // to the full list. Reorder `products` to change which ones appear here.
    heading: "Products",
    links: [
      ...products.slice(0, FOOTER_PRODUCT_COUNT).map((p) => ({
        label: p.shortName,
        href: `/products/${p.slug}`,
      })),
      { label: `All ${products.length} products`, href: "/products" },
      { label: "Coming next", href: "/products#future" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Studio", href: "/studio" },
      { label: "Team", href: "/team" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    // Generated: a live venture links out to its store, the rest to /ventures.
    heading: "Ventures",
    links: ventures.map((v) => ({
      label: v.name,
      href: v.url ?? `/ventures#${v.slug}`,
    })),
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
      { label: "Cookies", href: "/legal/cookies" },
    ],
  },
];
