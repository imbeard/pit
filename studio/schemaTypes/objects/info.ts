import {defineType, defineField} from 'sanity'
export const info = defineType({
  name: 'info',
  title: 'Info',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'blockContent',
    }),
  ],
})
