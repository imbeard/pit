import {defineField, defineType} from 'sanity'
import {BulbOutlineIcon} from '@sanity/icons'

export const cta = defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  icon: BulbOutlineIcon,
  validation: (Rule) =>
    Rule.custom((fields) => {
      const {link} = fields || {}
      if (link) {
        return true
      }
      return 'Link must be set'
    }),
  fields: [
    defineField({
      title: 'Text',
      name: 'text',
      type: 'string',
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'link',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare(selection) {
      const {title} = selection

      return {
        title: title,
        subtitle: 'Call to Action',
      }
    },
  },
})
