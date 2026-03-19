import { defineType, defineArrayMember } from 'sanity'


export default defineType({
    name: "contentBuilder",
    title: 'Content Builder',
    type: 'array',
    of: [
      {type: 'column',}, {type: 'card'},  {type: 'innerRow'}, 
    ]
})