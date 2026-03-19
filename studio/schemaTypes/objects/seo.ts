import {defineType, defineField} from 'sanity'
import {EarthAmericasIcon} from '@sanity/icons'

export default defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  icon: EarthAmericasIcon,
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'metaImage', // Changed from 'image'
      title: 'Meta Image',
      type: 'image',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines',
      description: 'Enable to add noindex — prevents this page from appearing in Google search results.',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'hideNavigation',
      title: 'Hide menu and footer',
      description: 'Removes the navigation and footer from this page — useful for landing pages.',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})
