import {defineField, defineType} from 'sanity'
import {TextIcon} from '@sanity/icons'

export const infoSection = defineType({
  name: 'infoSection',
  title: 'Info Section',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      content: 'content',
    },
    prepare({title, content}) {
      const firstBlockText =
        content &&
        content[0] &&
        content[0].children &&
        content[0].children[0] &&
        content[0].children[0].text
      return {
        title: title || 'Untitled Info Section',
        subtitle: firstBlockText || 'No content',
      }
    },
  },
})
