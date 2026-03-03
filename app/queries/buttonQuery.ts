export const buttonQuery = `
         _key,
          _type,
          title,
          style,
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

`;