import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

export async function fetchSitemapUrls(origin: string): Promise<string[]> {
  const sitemapUrl = `${ origin }/sitemap.xml`;
  try {
    // Fetch the sitemap XML
    const { data } = await axios.get(sitemapUrl);

    // Parse the XML
    const parser = new XMLParser();
    const sitemap = parser.parse(data);

    if (sitemap.urlset?.url) {
      // Standard sitemap: Extract <loc> values
      return sitemap.urlset.url
        .map((entry: { loc?: string }) => entry?.loc)
        .filter(Boolean);
    }
    if (sitemap.sitemapindex?.sitemap) {
      // Sitemap index: Recursively fetch and parse each linked sitemap
      if (Array.isArray(sitemap.sitemapindex.sitemap)) {
        return Promise.all(sitemap.sitemapindex.sitemap.flatMap(({ loc }: { loc: string }) => fetchSitemapUrls(loc)));
      } else {
        return fetchSitemapUrls(sitemap.sitemapindex.sitemap.loc);
      }
    }
    return [];

  } catch (error) {
    console.error(`Error fetching sitemap: ${ sitemapUrl }`, error);
    return [];
  }
};
