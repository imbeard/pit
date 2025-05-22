import {defineField, defineType} from 'sanity'
import {CommentIcon} from '@sanity/icons'

export const cloud = defineType({
  name: 'cloud',
  title: 'Cloud',
  type: 'object',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'link',
      type: 'link',
    }),
  ],
})
