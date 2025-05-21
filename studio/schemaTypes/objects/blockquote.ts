import {defineField} from 'sanity'

export const blockquote = defineField({
  name: 'blockquote',
  title: 'Blockquote',
  type: 'object',
  fields: [
    defineField({
        name: 'text',
        type: 'text'
    })
  ]
})
