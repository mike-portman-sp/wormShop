import {title} from 'node:process'
import {defineType, defineField} from 'sanity'
import {ActivityIcon, CogIcon, MobileDeviceIcon} from '@sanity/icons'

export default defineType({
  name: 'column',
  title: 'Column',
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
    {
      name: 'mobile',
      title: 'Mobile',
      icon: MobileDeviceIcon,
    },
  ],
  fieldsets: [
    {
      name: 'layout',
      title: 'Layout Settings',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
    {
      name: 'mobile',
      title: 'Mobile Layout Settings',
      options: {
        collapsible: true,
        collapsed: false,
      },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'basic',
    }),

    defineField({
      // Column Content
      name: 'columnContent',
      title: 'Column Content',
      type: 'array',
      group: 'basic',
      of: [
        {type: 'heading'},
        {type: 'advancedText'},
        {type: 'imageField'},
        {type: 'button'},
        {type: 'form'},
        {type: 'pill'},
      ],
    }),
    defineField({
      name: 'columnStyle',
      title: 'Column Style',
      type: 'string',
      description: 'Different column styling options',
      group: 'settings',
      options: {
        list: [{title: 'Shadow', value: 'shadow'}],
      },
    }),
    defineField({
      // Flex Direction
      name: 'flexDirection',
      title: 'Flex Direction',
      type: 'string',
      initialValue: 'flex-col',
      fieldset: 'layout',
      options: {
        list: [
          {title: 'Row', value: 'flex-row'},
          {title: 'Column', value: 'flex-col'},
        ],
      },
      group: 'settings',
    }),
    defineField({
      // colHorizontalAlign
      name: 'colHorizontalAlign',
      title: 'Horizontal Alignment',
      type: 'string',
      initialValue: 'items-start',
      fieldset: 'layout',
      options: {
        list: [
          {title: 'Left', value: 'items-start'},
          {title: 'Center', value: 'items-center'},
          {title: 'Right', value: 'items-end'},
        ],
      },
      // hidden: ({parent, value}) => parent?.flexDirection === 'flex-row',
      group: 'settings',
    }),
    defineField({
      // Vertical Alignment
      name: 'colVerticalAlign',
      title: 'Vertical Alignment',
      type: 'string',
      initialValue: 'align-top',
      fieldset: 'layout',
      options: {
        list: [
          {title: 'Top', value: 'align-top'},
          {title: 'Center', value: 'align-middle'},
          {title: 'Bottom', value: 'align-bottom'},
        ],
      },
      // hidden: ({parent, value}) => parent?.flexDirection === 'flex-row',
      group: 'settings',
    }),
    defineField({
      // Text alignment
      name: 'colTextAlign',
      title: 'Text Alignment',
      type: 'string',
      initialValue: 'text-left',
      fieldset: 'layout',
      options: {
        list: [
          {title: 'Left', value: 'text-left'},
          {title: 'Center', value: 'text-center'},
          {title: 'Right', value: 'text-right'},
        ],
      },
      // hidden: ({parent, value}) => parent?.flexDirection === 'flex-row',
      group: 'settings',
    }),
    defineField({
      name: 'colGap',
      title: 'Gap Between Items',
      type: 'string',
      initialValue: 'gap-6',
      fieldset: 'layout',
      options: {
        list: [
          {title: 'None', value: 'gap-0'},
          {title: 'XS', value: 'gap-2'},
          {title: 'SM', value: 'gap-4'},
          {title: 'MD', value: 'gap-6'},
          {title: 'LG', value: 'gap-8'},
          {title: 'XL', value: 'gap-12'},
        ],
      },
      group: 'settings',
    }),
    defineField({
      name: 'customClass',
      type: 'string',
      title: 'Custom CSS Classes',
      description: 'Add custom CSS classes to the column for additional styling',
      group: 'settings',
    }),
  ],

  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      const {title} = selection
      if (!title) {
        return {
          title: 'Column',
        }
      } else {
        return {
          title: title,
        }
      }
    },
  },
})
