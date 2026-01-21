import {defineArrayMember, defineField, defineType} from 'sanity'
import {SearchIcon} from '@sanity/icons'

export const partner = defineType({
  name: 'partner',
  title: 'Partner',
  type: 'document',
  groups: [{name: 'seo', title: 'SEO', icon: SearchIcon}],
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

      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'extendedTitle',
      title: 'Extended Title',
      type: 'string',
      description: 'i.e. "Centre for Fine Arts"',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'elementImage',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'informations',
      title: 'Informations',
      type: 'array',
      description: 'Location, addresses, contacts, ...',
      of: [
        defineArrayMember({
          type: 'info',
        }),
      ],
    }),
    // defineField({
    //   name: 'performances',
    //   title: 'Performances',
    //   type: 'reference',
    //   to: [{type: 'performance'}],
    //
    // }),
    defineField({
      name: 'pageBuilder',
      type: 'pageBuilder',
    }),
    defineField({
      name: 'order',
      type: 'number',
      title: 'Order',
      description: 'Used for manual sorting (lower numbers appear first)',
      validation: (Rule) => Rule.integer(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  orderings: [
    {
      title: 'Manual Order',
      name: 'manualOrder',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'extendedTitle',
      media: 'image',
    },
  },
})
