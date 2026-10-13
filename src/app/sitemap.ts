import { showTeam } from "@/data/team";
import type { MetadataRoute } from "next";
import { products } from "@/data/products";
import { site } from "@/data/site";

/** Generated from the product registry, so new products appear automatically. */
export default function sitemap(): MetadataRoute.Sitemap {

  const staticRoutes: MetadataRoute.Sitemap = ([
    { url: "/", priority: 1, changeFrequency: "monthly" },
    { url: "/products", priority: 0.9, changeFrequency: "monthly" },
    { url: "/ventures", priority: 0.8, changeFrequency: "monthly" },
    { url: "/services", priority: 0.8, changeFrequency: "monthly" },
    { url: "/studio", priority: 0.7, changeFrequency: "yearly" },
    { url: "/work", priority: 0.7, changeFrequency: "monthly" },
    { url: "/team", priority: 0.6, changeFrequency: "monthly" },
    { url: "/contact", priority: 0.6, changeFrequency: "yearly" },
  ] as const).filter((r) => showTeam || r.url !== "/team").map((r) => ({ ...r, url: `${site.url}${r.url}` }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${site.url}/products/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes];
}
