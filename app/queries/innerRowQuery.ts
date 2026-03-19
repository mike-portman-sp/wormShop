import { buttonQuery } from "./buttonQuery";
import { columnQuery } from "./columnQuery";

export const innerRowQuery = `
  title,
  columnLayout,
  contentBuilder[]{
    _key,
    _type,
    _type == "card" => {
      heading,
      text,
      pills,
      cardStyle,
      image{
        asset->{ url },
        alt
      },
      button{
        ${buttonQuery}
      }
    },
    _type == "column" => {
      ${columnQuery}
    }
  }
`;
