import {defineField} from 'sanity'
import {HighlightIcon} from '@sanity/icons'

export const highlightedText = defineField({
  name: 'highlightedText',
  title: 'Highlighted Text',
  icon: HighlightIcon,
  type: 'object',
  fields: [
    defineField({
        name: 'text',
        type: 'blockContent'
    })
  ],
  preview: {
    select: {
      title: 'text',
    },
  },
})
