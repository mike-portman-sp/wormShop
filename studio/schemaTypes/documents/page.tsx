import {defineField, defineType} from 'sanity'
import {pageBuilderFields} from '../fields/pageBuilderFields'

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    {
      name: 'basic',
      title: 'Basic',
      default: true,
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'basic',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'publishedDate',
      type: 'publishedDateType',
      group: 'basic',
    }),

    {...pageBuilderFields, group: 'basic'},
    defineField({
      name: 'seo',
      type: 'seo',
      group: 'seo',
      validation: (Rule) => Rule.required(),
    }),
  ],
})
