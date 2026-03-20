import { client } from "../studio/client";
import { groq } from "next-sanity";
import { getSiteSettings } from "./queries/getSiteSettings";
import type { MetadataRoute } from "next";

const pagesQuery = groq`*[_type == "page" && defined(slug.current)]{ "slug": slug.current, _updatedAt }`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await getSiteSettings();
  const siteUrl = settings?.siteUrl || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const pages = await client.fetch(pagesQuery);

  const pageEntries: MetadataRoute.Sitemap = pages.map((page: { slug: string; _updatedAt: string }) => ({
    url: `${siteUrl}/${page.slug}`,
    lastModified: new Date(page._updatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...pageEntries,
  ];
}
