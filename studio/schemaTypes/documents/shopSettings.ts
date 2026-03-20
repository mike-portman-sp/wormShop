import { defineType, defineField } from 'sanity'
import { BasketIcon } from '@sanity/icons'

export default defineType({
  name: 'shopSettings',
  title: 'Shop Settings',
  type: 'document',
  icon: BasketIcon,
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'badges', title: 'Trust Badges' },
  ],
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short tagline above the heading (e.g. "Live · Compostable · Shipped Fresh")',
      group: 'hero',
    }),
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      description: 'Main heading — wrap a word in ** to make it gradient (handled in code)',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubheading',
      title: 'Hero Subheading',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),
    defineField({
      name: 'trustBadges',
      title: 'Trust Badges',
      type: 'array',
      group: 'badges',
      of: [
        defineField({
          name: 'badge',
          title: 'Badge',
          type: 'object',
          fields: [
            defineField({ name: 'icon', title: 'Icon (emoji)', type: 'string' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'description', title: 'Description', type: 'string' }),
          ],
          preview: {
            select: { title: 'title', subtitle: 'description', media: 'icon' },
            prepare({ title, subtitle }) {
              return { title, subtitle }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Shop Settings' }
    },
  },
})
