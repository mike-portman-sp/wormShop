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
      name: 'advancedText',
      title: 'Advanced Text',
      type: 'advancedText',
      validation: (rule) => rule.required(),
      group: 'basic',
    }),
    defineField({
      name: 'subheading',
      type: 'string',
      title: 'Subheading',
      group: 'basic',
    }),
    defineField({
      name: 'buttons',
      type: 'array',
      group: 'basic',
      of: [{type: 'button'}],
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
