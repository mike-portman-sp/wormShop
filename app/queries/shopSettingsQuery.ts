import { groq } from "next-sanity";

export const shopSettingsQuery = groq`
  *[_type == "shopSettings" && _id == "shopSettings"][0] {
    tagline,
    heroHeading,
    heroSubheading,
    trustBadges[] {
      icon,
      title,
      description,
    }
  }
`;
