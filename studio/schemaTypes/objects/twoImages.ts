import {defineType, defineField} from 'sanity'

export const twoImages = defineType({
  name: 'twoImages',
  title: 'One / Two Images',
  type: 'object',
  fields: [
    defineField({
      name: 'items',
      title: 'Gallery Items',
      type: 'array',
      of: [{type: 'elementImage'}],
      options: {
        layout: 'grid',
      },
      validation: (Rule) => Rule.max(2),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'blockContent',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Two-image gallery",
      }
    },
  },
})
