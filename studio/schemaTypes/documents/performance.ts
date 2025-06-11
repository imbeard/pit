import {defineField, defineType} from 'sanity'
import {SearchIcon} from '@sanity/icons'

export const performance = defineType({
  name: 'performance',
  title: 'Performance',
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
      title: 'Theme',
      name: 'theme',
      type: 'string',
      group: 'content',
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
    defineField({
      name: 'image',
      title: 'Image',
      type: 'elementImage',
      group: 'content',
    }),
    defineField({
      name: 'typology',
      title: 'Typology',
      group: 'content',
      type: 'reference',
      to: [{type: 'category'}],
    }),
    defineField({
      name: 'artists',
      title: 'Artists',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'people'}]}],
      group: 'content',
    }),
    defineField({
      name: 'institutions',
      title: 'Institutions',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'partner'}]}],
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
      subtitle: 'typology.title',
      media: 'image',
    },
  },
})
