import {defineField, defineType} from 'sanity'
import {InboxIcon} from '@sanity/icons'

export const contact = defineType({
  name: 'contact',
  title: 'Contact',
  type: 'document',
  icon: InboxIcon,
  fields: [
    defineField({
      name: 'contacts',
      title: 'Contacts',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'subtitle',
              title: 'Subtitle',
              type: 'string',
            }),
            defineField({
              name: 'content',
              title: 'Content',
              type: 'blockContent',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage',
      }
    },
  },
})
