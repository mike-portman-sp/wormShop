// ./structure/index.ts

import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Menus')
        .child(
          S.list()
            .title('Menus')
            .items([
              S.listItem()
                .title('Main Menu')
                .child(S.documentList().title('Main Menu').filter('_type == "mainMenu"')),
              S.listItem()
                .title('Footer')
                .child(S.documentList().title('Footer').filter('_type == "footer"')),
            ]),
        ),

      // Singleton - Site Settings
      S.listItem()
        .title('Site Settings')
        .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      // Divider
      S.divider(),

      // Pages
      S.listItem()
        .title('Pages')
        .schemaType('page')
        .child(S.documentTypeList('page').title('Pages')),

      S.listItem()
        .title('Blogs')
        .schemaType('blogs')
        .child(
          S.documentTypeList('blogs')
            .title('Blogs')
            .defaultOrdering([{field: 'publishedDate', direction: 'desc'}])
        ),

      //   Divider
      //   S.divider(),

      //   All other document types
      //   ...S.documentTypeListItems().filter(
      //     (listItem) => !['menu', 'page'].includes(listItem.getId() || '')
      //   ),
    ])
