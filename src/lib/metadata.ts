import type { Metadata } from "next";
import { site } from "@/data/site";

/** Keep page titles, descriptions and URLs consistent across search and sharing. */
export function pageMetadata(metadata: Metadata): Metadata {
  const title = typeof metadata.title === "string" ? `${metadata.title} \u2014 ${site.name}` : site.name;
  const description = metadata.description ?? site.description;
  const canonical = metadata.alternates?.canonical;
  const url = typeof canonical === "string" ? new URL(canonical, site.url).href : site.url;
  return {
    ...metadata,
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url,
      images: [{ url: new URL("/opengraph-image", site.url).href, width: 1200, height: 630, alt: site.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [new URL("/opengraph-image", site.url).href],
    },
  };
}
