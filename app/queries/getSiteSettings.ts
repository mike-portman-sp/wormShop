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
        asset->{
          url
        }
      }
    },
    localBusinessDescription,
    serviceAreas,
    knowsAbout,
    shopCategories[]{value, label}
  }
`;

export async function getSiteSettings() {
  return client.fetch(siteSettingsQuery);
}