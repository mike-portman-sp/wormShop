import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'pill',
  title: 'Pills',
  type: 'object',
  preview: {
    select: {
      pills: 'pills',
    },
    prepare: ({pills}) => {
      const pillCount = pills?.length || 0;
      const firstPillText = pills?.[0]?.text || 'No pills';
      return {
        title: pillCount > 1 ? `${pillCount} pills` : firstPillText,
        subtitle: pillCount > 1 ? `First: ${firstPillText}` : undefined,
      }
    },
  },
  fields: [
    defineField({
      name: 'pills',
      title: 'Pills',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'pillImage',
              title: 'Image Icon',
              type: 'image',
            }),
            defineField({
              name: 'pillStyle',
              title: 'Pill Style',
              type: 'string',
              description: 'Style',
              initialValue: 'pill-plain-text',
              options: {
                list: [
                  {title: 'Plain Text', value: 'pill-plain-text'},
                  {title: 'Grey BG', value: 'pill-grey-bg'},
                ],
              },
            }),
            defineField({
              name: 'text',
              type: 'string',
              title: 'Text',
            }),
          ],
          preview: {
            select: {
              text: 'text',
              style: 'pillStyle',
            },
            prepare: ({text, style}) => {
              return {
                title: text || 'Untitled Pill',
                subtitle: style || 'No style',
              }
            },
          },
        },
      ],
    }),
  ],
})