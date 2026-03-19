import {defineField, defineType} from 'sanity'
// import { makeCustomLinkValidator } from "@/sanity/lib/validation/validateLink";

export default defineType({
  name: 'mainMenu',
  type: 'document',
  title: 'Main Menu',

  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Label',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'menuItems',
      type: 'array',
      title: 'Menu items',
      // fieldset: "submenu",
      of: [{type: 'menuItem'}],
    }),
    defineField({
      name: 'ctaButton',
      type: 'button',
      title: 'CTA Button',
    }),
  ],
})
