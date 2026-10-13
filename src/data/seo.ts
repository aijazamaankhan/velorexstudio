import { site } from "./site";

/** Only confirmed company details; no invented addresses, reviews or prices. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  description: site.description,
  founder: { "@type": "Person", name: site.founder },
  ...(site.socials.length ? { sameAs: site.socials.map((s) => s.href) } : {}),
};
