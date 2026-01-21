import {defineField, defineType} from 'sanity'
import {SearchIcon} from '@sanity/icons'

export const resource = defineType({
  name: 'resource',
  title: 'Resource',
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
      name: 'typology',
      title: 'Typology',
      type: 'string',
    }),
    defineField({
      name: 'performance',
      title: 'Performance',
      type: 'reference',
      to: [{type: 'performance'}],
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'elementImage',
    }),
    defineField({
      name: 'pageBuilder',
      type: 'pageBuilder',
    }),
    defineField({
      name: 'downloads',
      title: 'Downloads',
      type: 'array',
      of: [
        {
          name: 'download',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'Url',
              type: 'file',
            }),
          ],
        },
      ],
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
      subtitle: 'typology',
      media: 'thumbnail',
    },
  },
})
