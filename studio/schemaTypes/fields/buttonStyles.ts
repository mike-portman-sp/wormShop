import {defineField} from 'sanity'

const buttonStyle = defineField({
  name: 'buttonStyle',
  type: 'string',
  title: 'Button Style',
  options: {
    list: [
      {title: 'Sun (Gradient)', value: 'btn--sun'},
      {title: 'Outline Grey', value: 'btn--outline-grey'},
      {title: 'Plain Text', value: 'btn--plain'},
    ],
    layout: 'radio',
  },
  initialValue: 'btn--outline-grey',
  readOnly: (props) => props?.parent?.lockStyles,
})

export default buttonStyle
