import {defineField, defineType} from 'sanity'
import {SearchIcon} from '@sanity/icons'
import country_list from '../../utils/country_list'

export const people = defineType({
  name: 'people',
  title: 'People',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO', icon: SearchIcon},
  ],
  fields: [
    // defineField({
    //   name: 'language',
    //   type: 'string',
    //   readOnly: true,
    //   hidden: true,
    // }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: {
        source: 'name',
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'elementImage',
      group: 'content',
    }),
    defineField({
      name: 'job',
      title: 'Job',
      type: 'string',
      group: 'content',
    }),
    {
      title: 'Country',
      name: 'country',
      type: 'string',
      options: {
        list: [...country_list],
      },
      group: 'content',
    },
    {
      name: 'dateBirth',
      title: 'Date of birth',
      type: 'date',
      group: 'content',
    },
    defineField({
      name: "performance",
      title: "Performance",
      type: "array",
      of: [{ type: "reference", to: [{ type: "performance" }] }],
      group: "content",
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page builder',
      type: 'array',
      of: [
        {type: 'cta'},
        {type: 'infoSection'},
        {type: 'hero'},
        {type: 'gallery'},
        {type: 'blockquote'},
      ],
      options: {
        insertMenu: {
          views: [
            {
              name: 'grid',
              previewImageUrl: (schemaTypeName) =>
                `/static/page-builder-thumbnails/${schemaTypeName}.png`,
            },
          ],
        },
      },
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
      title: 'name',
      subtitle: 'job',
      media: 'image',
    },
  },
})
