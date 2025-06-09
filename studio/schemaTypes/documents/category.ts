import {defineField, defineType} from 'sanity'
import {FilterIcon} from '@sanity/icons'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: FilterIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
  ],
})
