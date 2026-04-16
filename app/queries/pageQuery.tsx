import { groq } from "next-sanity";
import { heroProjection } from "./heroQuery";
import { innerRowQuery } from "./innerRowQuery";
import { pillQuery } from "./pillQuery";
import { footerQuery } from "./footerQuery";
import { buttonQuery } from "./buttonQuery";
import { columnQuery } from "./columnQuery";
import { linkProjection } from "./linkProjection";

export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    title,
    "currentSlug": slug.current,
    seo{
      metaTitle,
      metaDescription,
      noIndex,
      hideNavigation,
      metaImage{
        hotspot,
        crop,
        asset->{
          _id,
          url
        }
      }
    },
    "siteName": *[_type == "siteSettings"][0].siteName,
    "mainMenu": *[_type == "mainMenu"][0]{
      title,
      menuItems[]{
        _key,
        _type,
        title,
        link{
          ${linkProjection}
        }
      },
      ctaButton{
        ${buttonQuery}
      }
    },
    "footer": *[_type == "footer"][0]{
      ${footerQuery}
    },
    pageBuilder[]{
      _key,
      _type,
      _type == "hero" => {
        ${heroProjection}
      },
      _type == "row" => {
        title,
        columns,
        backgroundColor,
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
          _type == "pill" => {
            ${pillQuery}
          },
          _type == "innerRow" => {
            ${innerRowQuery}
          },
          _type == "column" => {
            ${columnQuery}
          }
        }
      },
      _type == "form" => {
        formTitle,
        formCTA,
        buttonStyle,
      },
      _type == "productList" => {
        title,
        showAllProducts,
        filterCategory,
        backgroundColor,
        featuredProducts[]{
          "_ref": @._ref
        }
      }
    }
  }
`;
