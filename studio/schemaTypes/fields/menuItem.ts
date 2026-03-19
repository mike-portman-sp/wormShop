import {defineField, defineType} from 'sanity'
// import { makeCustomLinkValidator } from "@/sanity/lib/validation/validateLink";

export default defineType({
  name: 'menuItem',
  type: 'object',
  title: 'Menu Item',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "link",
      type: "link",
      validation: (rule) => rule.required(),
    }),
  ],
})
