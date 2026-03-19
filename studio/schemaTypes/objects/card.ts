import {defineType, defineField, defineArrayMember} from 'sanity'

export default defineType({
  name: 'card',
  title: 'Card',
  type: 'object',
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
      name: 'cardStyle',
      title: 'Card Style',
      type: 'string',
      group: 'settings',
      options: {
        list: [
          {title: 'Gradient Card 1', value: 'bg-gradient-1'},
          {title: 'Gradient Card 2', value: 'bg-gradient-2'},
          {title: 'Gradient Card 3', value: 'bg-gradient-3'},
          {title: 'Gradient Card 4', value: 'bg-gradient-4'},
          {title: 'Card with image BG', value: 'card-image-bg'},
        ],
      },
    }),

    defineField({
      name: 'heading',
      type: 'string',
      title: 'Heading',
      group: 'basic',
    }),
    defineField({
      name: 'text',
      type: 'text',
      title: 'Text',
      group: 'basic',
    }),
    defineField({
      name: 'pills',
      title: 'Pills',
      type: 'array',
      description: 'List of pills',
      group: 'basic',
      of: [
        {
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'button',
      title: 'Button',
      type: 'button',
      group: 'settings',
      hidden: ({parent}) => parent?.cardStyle != 'card-image-bg',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      group: 'settings',
      hidden: ({parent}) => parent?.cardStyle != 'card-image-bg',
    }),
  ],
})
