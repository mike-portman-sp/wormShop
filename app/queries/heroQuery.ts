import { linkProjection } from "./linkProjection";

export const heroProjection = `
  heading,
  subheading,
  eyebrow,
  heroStyle,
  advancedText{
    content[]{
      ...,
      markDefs[]{
        ...,
        _type == "link" => {
          ${linkProjection}
        }
      }
    }
  },
  blobs,
  heroImage{
    "url": asset->url,
    alt,
  },
  iconImage{
    "url": asset->url,
    alt,
  },
  buttons[]{
    _key,
    _type,
    title,
    style,
    targetBlank,
    link{
      ${linkProjection}
    }
  }
`;
