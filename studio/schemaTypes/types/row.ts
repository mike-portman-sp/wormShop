import {defineType, defineField, defineArrayMember} from 'sanity'
import {ActivityIcon, CogIcon, MobileDeviceIcon} from '@sanity/icons'

export default defineType({
  name: 'row',
  title: 'Row Block',
  type: 'object',
  groups: [
    {
      name: 'basic',
      title: 'Basic',
      default: true,
      icon: ActivityIcon,
    },
    {
      name: 'settings',
      title: 'Settings',
      icon: CogIcon,
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Row Title',
      group: 'basic',
    }),

    defineField({
      name: 'columns',
      title: 'Columns',
      type: 'number',
      options: {
        list: [
          {title: '1 Column', value: 1},
          {title: '2 Columns', value: 2},
          {title: '3 Columns', value: 3},
          {title: '4 Columns', value: 4},
          {title: '5 Columns', value: 5},
          {title: '6 Columns', value: 6},
          {title: '7 Columns', value: 7},
          {title: '8 Columns', value: 8},
        ],
        layout: 'dropdown',
      },
      initialValue: 1,
      group: 'basic',
    }),
    defineField({
      name: 'contentBuilder',
      title: 'Column Content Builder',
      type: 'contentBuilder',
      group: 'basic',
    }),

    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      options: {
        list: [{title: 'Shadow', value: 'bg-shadow'}],
      },
      group: 'settings',
    }),
  ],
  // preview: {
  //   select: {
  //     title: 'title',
  //   },
  //   prepare({ title }) {
  //     return {
  //       title: title || 'Untitled Row',
  //     }
  //   },
  // },
})
