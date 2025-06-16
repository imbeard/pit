import {defineField, defineType} from 'sanity'
import {CommentIcon} from '@sanity/icons'

export const cloud = defineType({
  name: 'cloud',
  title: 'Cloud',
  type: 'object',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          {title: 'Internal', value: 'linkInternal'},
          {title: 'URL', value: 'linkExternal'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
    defineField({
      name: 'linkExternal',
      title: 'URL',
      type: 'linkExternal',
      hidden: ({parent}) => parent.source !== 'linkExternal',
    }),
    defineField({
      name: 'linkInternal',
      type: 'linkInternal',
      hidden: ({parent}) => parent.source !== 'linkInternal',
    }),
    defineField({
      title: 'Theme',
      name: 'theme',
      type: 'string',
      hidden: ({parent}) => parent.source !== 'linkExternal',
      options: {
        list: [
          {title: 'Pink / Red', value: 'pink-red'},
          {title: 'Pink / Blue', value: 'pink-blue'},
          {title: 'Pink / Brown', value: 'pink-brown'},
          {title: 'Pink / Black', value: 'pink-black'},
          {title: 'Red / Pink', value: 'red-pink'},
          {title: 'Red / Black', value: 'red-black'},
          {title: 'Brown / Pink', value: 'brown-pink'},
          {title: 'Brown / Black', value: 'brown-black'},
          {title: 'Blue / Pink', value: 'blue-pink'},
          {title: 'Blue / Gray', value: 'blue-gray'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
    }),
  ],
})
