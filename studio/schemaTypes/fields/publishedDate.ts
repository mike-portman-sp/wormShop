import {defineField} from 'sanity'

export default defineField({
  name: 'publishedDateType', // Different name from the field
  title: 'Published Date',
  type: 'datetime',
  description: 'The date and time when the content was published.',
  validation: (Rule) => Rule.required(),
  initialValue: () => new Date().toISOString(),
})
