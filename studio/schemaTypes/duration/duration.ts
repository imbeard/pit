import {defineField, defineType} from 'sanity'

export const duration = defineType({
  name: 'duration',
  title: 'Duration',
  description: 'A start and finish time for the event',
  type: 'object',
  fields: [
    defineField({
      name: 'start',
      type: 'timeValue',
    }),
    defineField({
      name: 'end',
      type: 'timeValue',
    }),
  ],
  options: {columns: 2},
})