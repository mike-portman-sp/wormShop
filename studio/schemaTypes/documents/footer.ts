import {defineField, defineType} from 'sanity'
// import { makeCustomLinkValidator } from "@/sanity/lib/validation/validateLink";

export default defineType({
  name: 'footer',
  type: 'document',
  title: 'Footer',

  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Label',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'footerItems',
      type: 'array',
      title: 'Footer items',
      // fieldset: "submenu",
      of: [{type: 'menuItem'}],
         validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'advancedText',
      title: 'Advanced Text',
      type: 'advancedText',
      validation: (rule) => rule.required(),
    }),
  ],
})
