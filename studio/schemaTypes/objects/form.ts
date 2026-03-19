// form.ts
import {defineType, defineField} from 'sanity'
import buttonStyle from '../fields/buttonStyles'

export default defineType({
  name: 'form',
  title: 'Form',
  type: 'object',
  fields: [
    defineField({
      name: 'formTitle',
      type: 'string',
      title: 'Form Title',
      validation: (rule) => rule.required(),
    }),
    buttonStyle, // 👈 reuse the field
    defineField({
      name: 'formCTA',
      type: 'string',
      title: 'Form CTA',
      validation: (rule) => rule.required(),
    }),
  ],
})
