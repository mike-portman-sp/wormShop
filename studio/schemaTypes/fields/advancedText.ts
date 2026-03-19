import {defineType, defineField} from 'sanity'
import {ArrowLeftIcon} from '@sanity/icons'
import {ArrowUpIcon} from '@sanity/icons'
import {ArrowRightIcon} from '@sanity/icons'
import {schemaTypesWithPage} from '../utils/references'
import { TextAlign } from '../../../app/components/utils/textAlign'

export default defineType({
  name: 'advancedText',
  title: 'Advanced Text',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'},
          ],
          marks: {
            decorators: [
              {title: 'Text Strong', value: 'strong'},
              {title: 'Text Emphasis', value: 'em'},
              {title: 'Text Left', value: 'left', icon: ArrowLeftIcon, component: (props) => TextAlign(props)},
              {title: 'Text Center', value: 'center', icon: ArrowUpIcon, component: (props) => TextAlign(props)},
              {title: 'Text Right', value: 'right', icon: ArrowRightIcon, component: (props) => TextAlign(props)},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'linkType',
                    title: 'Link Type',
                    type: 'string',
                    initialValue: 'external',
                    options: {
                      list: [
                        {title: 'Internal', value: 'internal'},
                        {title: 'External', value: 'external'},
                        {title: 'File', value: 'file'},
                      ],
                      layout: 'radio',
                    },
                    validation: (Rule) => Rule.required(),
                  },
                  {
                    name: 'internal',
                    title: 'Internal Reference',
                    type: 'reference',
                    to: schemaTypesWithPage.map((d) => ({type: d})),
                    hidden: ({parent}) => parent?.linkType !== 'internal',
                  },
                  {
                    name: 'external',
                    title: 'External URL',
                    type: 'string',
                    hidden: ({parent}) => parent?.linkType !== 'external',
                  },
                  {
                    name: 'file',
                    title: 'File',
                    type: 'file',
                    hidden: ({parent}) => parent?.linkType !== 'file',
                  },
                ],
              },
            ],
          },
        },
      ],
    }),
  ],
})
