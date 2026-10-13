# SEO setup and publishing checks

Reviewed 13 October 2026.

## Implemented

- Server-rendered pages with individual titles, descriptions and canonical URLs.
- Per-page Open Graph and Twitter metadata for all inner pages and products.
- Homepage Organization JSON-LD uses only confirmed company information from data.
  The JSON is escaped before insertion into HTML; no reviews, prices or addresses
  are invented.
- Sitemap includes the eight main routes and all sixteen product pages.
- Removed build-time lastModified values: rebuilding is not a content update.
- Legal placeholders remain noindex, with crawling allowed so search engines can
  read that instruction. They are excluded from the sitemap.
- Fictional client projects removed from the public portfolio.

## Remaining launch work

- Connect the domain and verify HTTPS and www redirects on Hostinger.
- Verify ownership in Google Search Console and submit /sitemap.xml.
- Inspect representative URLs and validate structured data after deployment.
- Complete the legal pages and remove/replace sample team members before launch.
- Check mobile rendering, loading performance and Core Web Vitals on the host.
- Add real screenshots and descriptive alternative text when assets are supplied.
- Refine product descriptions and pricing only from confirmed product details.
- If a published product is renamed or removed, decide whether there is a genuine
  replacement requiring a permanent redirect. Do not redirect unrelated deleted
  products to the homepage just to avoid 404 responses.

Technical SEO helps crawling and interpretation; it cannot guarantee indexing,
rich results or search rankings. No Search Console submission or hosted
performance assessment has been performed in this session.

References:
- [Google: Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization)
- [Google: sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
