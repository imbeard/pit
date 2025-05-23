import {defineArrayMember, defineField, defineType} from 'sanity'
import {SearchIcon} from '@sanity/icons'

export const partner = defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO', icon: SearchIcon},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',

      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'extendedTitle',
      title: 'Extended Title',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'elementImage',
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'informations',
      title: 'Informations',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'info',
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'performances',
      title: 'Performances',
      type: 'reference',
      to: [{type: 'performance'}],
      group: 'content',
    }),
    defineField({
      name: 'pageBuilder',
      type: 'pageBuilder',
      group: 'content',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'extendedTitle',
      media: 'image',
    },
  },
})
