import { groq } from "next-sanity";
import { heroProjection } from "./heroQuery";
import { innerRowQuery } from "./innerRowQuery";
import { pillQuery } from "./pillQuery";
import footer from "@/studio/schemaTypes/documents/footer";
import { footerQuery } from "./footerQuery";
import { buttonQuery } from "./buttonQuery";
export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0]{
    title,
    "currentSlug": slug.current,
    seo{
      metaTitle,
      metaDescription,
      metaImage{
        asset->{
          url
        }
      }
    },

    "mainMenu": *[_type == "mainMenu"][0]{
      title,
      menuItems[]{
        _key,
        _type,
        title,
        link{
          _type,
          linkType,
          external,
         internal->{ slug{ current } },
          file{
            asset->
          }
        }
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
      
      // Row-specific fields (when _type is row)
      _type == "row" => {
        title,
          backgroundColor,  

        contentBuilder[]{
          _key,
          _type,
          
          // Card fields (when _type is card)
          _type == "card" => {
            heading,
            text,
            pills,
            cardStyle,
              image{
                asset->,
                alt,
              },
            button{
              _key,
              _type,
              title,
              link{
                _type,
                linkType,
                external,
                 openInNewTab,
             internal->{ slug{ current } },
                file{
                  asset->
                }
              },
              style,
              targetBlank
            }
          },

                 _type == "pill" => {
${pillQuery}
},
                  // Inner Row fields (when _type is innerRow)
          _type == "innerRow" => {
            ${innerRowQuery}
          },
          // Column fields (when _type is column)
          _type == "column" => {
            colHorizontalAlign,
            colVerticalAlign,
            colTextAlign,
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
                      linkType,
                      external,
                      internal->{ slug{ current } },
                      file{
                        asset->{
                          url
                        }
                      }
                    },
                      _type== "span" => {
                      text,
                      marks 
                      },
                  }
                }
              },
              _type == "imageField" => {
                borderRadius,
                maxHeight,
                asset->,
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
          }
        }
      }
    }
  }
`;
