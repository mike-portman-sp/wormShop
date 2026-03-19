import {defineType, defineField} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export default defineType({
  name: 'imageField',
  title: 'Image',
  type: 'image',
  icon: ImageIcon,
  fields: [
      defineField({
      name: 'imageTitle',
      title: 'Image Title',
      type: 'string',
    }),
    defineField({
      name: 'borderRadius',
      title: 'Border Radius',
      type: 'boolean',
      initialValue: false,
      options: {
        layout: 'checkbox', // Try adding this
      },
    }),
      defineField({
      name: 'maxHeight',
      title: 'Max Height',
      type: 'number',
      description: 'Maximum height in pixels (optional)', 
    }),
  ],

})
