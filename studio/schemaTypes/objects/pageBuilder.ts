import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'

export const pageBuilder = defineType({
  name: 'pageBuilder',
  title: 'Page Builder',
  type: 'object',
  icon: BlockElementIcon,
  fields: [
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      of: [
        {type: 'cta'},
        {type: 'infoSection'},
        {type: 'hero'},
        {type: 'gallery'},
        {type: 'twoImages'},
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
    }),
  ],
})
