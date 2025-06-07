import {defineField, defineType} from 'sanity'
import {EditIcon} from '@sanity/icons'

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: EditIcon,
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
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'text',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'featuredEvents',
      title: 'Featured Events',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'event'}]}],
      hidden: ({document}) => document?.title?.toLowerCase() !== 'events',
    }),
  ],
})
