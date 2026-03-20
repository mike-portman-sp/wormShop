
export const schemaTypesWithPageAndSlug = [
    "page",
] as const;

// export const schemaTypeWithPageAndNoSlug = [
//   SchemaType.BlogSettings,
//   SchemaType.NewsRoomSettings,
//   SchemaType.PressReleaseSettings,
//   SchemaType.GlossarySettings,
//   SchemaType.FaqSettings,
// ] as const;

export const schemaTypesWithPage = [...schemaTypesWithPageAndSlug] as const;

export type SchemaTypeWithPageAndSlug = (typeof schemaTypesWithPageAndSlug)[number];
// export type SchemaTypeWithPageAndNoSlug = (typeof schemaTypeWithPageAndNoSlug)[number];
export type SchemaTypeWithPage = (typeof schemaTypesWithPage)[number];

// export const DocumentFilters: Record<string, { query: string; params: Record<string, unknown> }> = {
//   AllDocumentsWithAPage: {
//     query: `(_type in $types || (_type == $customer && hasStory == true) || (_type == $connector && hasPage == true)) && !(docSettings.disableReferencesToThisDocument == true)`,
//     params: {
//       types: schemaTypesWithPage
//         .filter((type) => type !== SchemaType.Customer)
//         .filter((type) => type !== SchemaType.Connector),
//       customer: SchemaType.Customer,
//       connector: SchemaType.Connector,
//     },
//   },
// } as const;

export function isTypeASchemaTypeWithPage(maybeAType: string): maybeAType is SchemaTypeWithPage {
  return schemaTypesWithPage.includes(maybeAType as SchemaTypeWithPage);
}

export function isTypeASchemaTypeWithPageAndSlug(maybeAType: string): maybeAType is SchemaTypeWithPageAndSlug {
  return schemaTypesWithPageAndSlug.includes(maybeAType as SchemaTypeWithPageAndSlug);
}

// export function isTypeASchemaTypeWithPageAndNoSlug(maybeAType: string): maybeAType is SchemaTypeWithPageAndNoSlug {
//   return schemaTypeWithPageAndNoSlug.includes(maybeAType as SchemaTypeWithPageAndNoSlug);
// }
