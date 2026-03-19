import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'blobs',
  type: 'object',
  title: 'Decorative Blobs',
  fields: [
    defineField({
      name: 'showBlobs',
      type: 'boolean',
      title: 'Show Decorative Blobs',
      description: 'Toggle animated blob decorations in the background',
      initialValue: false,
      options: {
        layout: 'switch',
      },
    }),
  ],
})