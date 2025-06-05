import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      initialValue: 'url',
      options: {
        list: [
          {title: 'Internal', value: 'linkInternal'},
          {title: 'URL', value: 'linkExternal'},
          {title: 'Email', value: 'linkEmail'},
          {title: 'Download', value: 'download'},
          {title: 'Phone', value: 'phone'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'linkExternal',
      title: 'URL',
      type: 'linkExternal',
      hidden: ({parent}) => parent?.source !== 'linkExternal',
    }),

    defineField({
      name: 'linkInternal',
      type: 'linkInternal',
      hidden: ({parent}) => parent?.source !== 'linkInternal',
    }),

    defineField({
      title: 'Email',
      name: 'linkEmail',
      type: 'linkEmail',
      hidden: ({parent}) => parent?.source !== 'linkEmail',
    }),

    defineField({
      name: 'download',
      title: 'Download',
      type: 'file',
      hidden: ({parent}) => parent?.source !== 'download',
    }),

    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'object',
      hidden: ({parent}) => parent?.source !== 'phone',
      fields: [
        defineField({
          name: 'label',
          type: 'string',
        }),
        defineField({
          name: 'url',
          title: 'URL',
          type: 'string',
        }),
      ],
    }),
  ],
})
