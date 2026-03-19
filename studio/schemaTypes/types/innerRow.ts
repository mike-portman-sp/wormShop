import { defineType, defineField, defineArrayMember } from 'sanity'

// innerRow.ts
export default defineType({
  name: 'innerRow',
  title: 'Inner Row',
  type: 'object',
fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Inner Row',
    }),

    defineField({
      name: 'columnLayout',
      title: 'Columns',
      type: 'string',
      options: {
        list: [
          {title: '1 Column', value: '1'},
          {title: '2 Columns', value: '2'},
          {title: '3 Columns', value: '3'},
          {title: '4 Columns', value: '4'},
          {title: '5 Columns', value: '5'},
          {title: '6 Columns', value: '6'},
          {title: '7 Columns', value: '7'},
          {title: '8 Columns', value: '8'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'contentBuilder',
      title: 'Column Content Builder',
      type: 'contentBuilder',
    }),
  ],
});