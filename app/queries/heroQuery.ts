import { linkProjection } from "./linkProjection";

export const heroProjection = `
  heading,
  subheading,
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
