import {defineType, defineField} from 'sanity'
import {CogIcon} from '@sanity/icons'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {
      name: 'general',
      title: 'General',
      default: true,
    },
    {
      name: 'seo',
      title: 'Default SEO',
    },
    {
      name: 'localSeo',
      title: 'Local SEO',
    },
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'general',
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      description: 'The main URL of your website (e.g., https://example.com)',
      validation: (Rule) => Rule.required(),
      group: 'general',
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'seo',
      description: 'These values are used as fallback when pages don\'t have their own SEO settings',
      group: 'seo',
    }),

    // Local SEO
    defineField({
      name: 'localBusinessDescription',
      title: 'Business Description',
      type: 'text',
      rows: 3,
      group: 'localSeo',
      description: 'Used in Google local search structured data. Describe what you sell and where you serve.',
      placeholder: 'Austin and Central Texas source for live composting worms...',
    }),
    defineField({
      name: 'serviceAreas',
      title: 'Service Areas',
      type: 'array',
      group: 'localSeo',
      description: 'Cities and regions you serve — used in Google local search structured data.',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'knowsAbout',
      title: 'Knows About (Keywords)',
      type: 'array',
      group: 'localSeo',
      description: 'Topics/keywords your business is known for — used in Google local search structured data.',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'shopCategories',
      title: 'Shop Category Labels',
      type: 'array',
      group: 'localSeo',
      description: 'Display names for product categories shown as headings on the shop page.',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'value', type: 'string', title: 'Slug', description: 'e.g. red-wigglers'},
            {name: 'label', type: 'string', title: 'Display Name', description: 'e.g. Red Wigglers'},
          ],
          preview: {
            select: {title: 'label', subtitle: 'value'},
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
})