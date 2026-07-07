'use client'

import { visionTool } from '@sanity/vision'
import { defineConfig, type SchemaTypeDefinition } from 'sanity'
import { structureTool } from 'sanity/structure'

// studio/ has its own isolated node_modules install of `sanity`, so its schema
// types are a structurally-identical but nominally distinct instance of these types.
import { schemaTypes } from './studio/schemaTypes'

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes as unknown as SchemaTypeDefinition[],
  },
})
