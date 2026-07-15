import { client } from "../../studio/client";
import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0]{
    siteName,
    siteUrl,
    defaultSeo{
      metaTitle,
      metaDescription,
      metaImage{
        hotspot,
        crop,
        asset->{
          _id,
          url
        }
      }
    },
    localBusinessDescription,
    serviceAreas,
    knowsAbout,
    phone,
    priceRange,
    sameAs,
    shopCategories[]{value, label}
  }
`;

export async function getSiteSettings() {
  const settings = await client.fetch(siteSettingsQuery);

  if (settings?.siteUrl) {
    settings.siteUrl = settings.siteUrl.replace(/^http:\/\//, "https://").replace(/\/$/, "");
  }

  return settings;
}