import { buttonQuery } from "./buttonQuery";
import { pillQuery } from "./pillQuery";
import { linkProjection } from "./linkProjection";

export const columnQuery = `
  colHorizontalAlign,
  colVerticalAlign,
  colTextAlign,
  colGap,
  columnLayout,
  customClass,
  columnStyle,
  columnContent[]{
    _key,
    _type,
    _type == "heading" => {
      level,
      text
    },
    _type == "advancedText" => {
      content[]{
        ...,
        markDefs[]{
          ...,
          _type == "link" => {
            ${linkProjection}
          },
          _type == "span" => {
            text,
            marks
          }
        }
      }
    },
    _type == "imageField" => {
      borderRadius,
      maxHeight,
      asset->{ url },
      alt
    },
    _type == "button" => {
      ${buttonQuery}
    },
    _type == "pill" => {
      ${pillQuery}
    },
    _type == "form" => {
      formTitle,
      buttonStyle,
      formCTA
    },
    _type == "blogs" => {
      title,
      subTitle
    }
  }
`;
