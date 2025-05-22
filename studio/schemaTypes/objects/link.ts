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
      validation: (Rule) =>
        // Custom validation to ensure URL is provided if the link type is 'href'
        Rule.custom((value, context: any) => {
          if (context.parent?.source === 'linkExternal' && !value) {
            return 'URL is required'
          }
          return true
        }),
    }),

    defineField({
      name: 'linkInternal',
      type: 'linkInternal',
      hidden: ({parent}) => parent?.source !== 'linkInternal',
      validation: (Rule) =>
        // Custom validation to ensure URL is provided if the link type is 'href'
        Rule.custom((value, context: any) => {
          if (context.parent?.source === 'linkInternal' && !value) {
            return 'An internal link is required'
          }
          return true
        }),
    }),

    defineField({
      title: 'Email',
      name: 'linkEmail',
      type: 'linkEmail',
      hidden: ({parent}) => parent?.source !== 'linkEmail',
      validation: (Rule) =>
        // Custom validation to ensure URL is provided if the link type is 'href'
        Rule.custom((value, context: any) => {
          if (context.parent?.source === 'linkEmail' && !value) {
            return 'An email is required'
          }
          return true
        }),
    }),

    defineField({
      name: 'download',
      title: 'Download',
      type: 'file',
      hidden: ({parent}) => parent?.source !== 'download',
    }),
  ],
})
