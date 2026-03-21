import {defineField, defineType} from 'sanity'
import {MenuIcon} from '@sanity/icons'

export default defineType({
  name: 'hero',
  type: 'object',
  title: 'Hero Section',
  icon: MenuIcon,
  groups: [
    {
      name: 'basic',
      title: 'Basic',
      default: true,
    },
    {
      name: 'settings',
      title: 'Settings',
    },
  ],
  fields: [
    defineField({
      name: 'heroStyle',
      type: 'string',
      title: 'Hero Style',
      group: 'settings',
      options: {
        list: [
          {title: 'Front Page Hero', value: 'main-hero'},
          {title: 'Sub Page Hero', value: 'sub-page-hero'},
        ],
      },
    }),
    defineField({
      name: 'eyebrow',
      type: 'object',
      title: 'Eyebrow Badge',
      group: 'basic',
      hidden: ({parent}) => parent?.heroStyle === 'sub-page-hero',
      options: { collapsed: true, collapsible: true },
      fields: [
        defineField({ name: 'badge', title: 'Badge Text', type: 'string', description: 'Text inside the hexagon shape (e.g. "Est. in Your Backyard")' }),
        defineField({ name: 'sub', title: 'Sub Text', type: 'string', description: 'Text after the badge (e.g. "Since 2024")' }),
      ],
    }),
    defineField({
      name: 'advancedText',
      title: 'Advanced Text',
      type: 'advancedText',
      validation: (rule) => rule.required(),
      group: 'basic',
    }),
    defineField({
      name: 'subheading',
      type: 'text',
      title: 'Subheading',
      group: 'basic',
      rows: 3,
    }),
    defineField({
      name: 'buttons',
      type: 'array',
      group: 'basic',
      of: [{type: 'button'}],
      hidden: ({parent}) => parent?.heroStyle === 'sub-page-hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'basic',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string' }),
      ],
      hidden: ({parent}) => parent?.heroStyle === 'sub-page-hero',
    }),
    defineField({
      name: 'blobs',
      type: 'boolean',
      group: 'settings',
      hidden: ({parent}) => parent?.heroStyle === 'sub-page-hero',
    }),
  ],
})
