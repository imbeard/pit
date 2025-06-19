import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  fieldsets: [
    {name: 'intro', title: 'Intro', options: {collapsed: false, collapsible: true}},
    {name: 'hero', title: 'Hero', options: {collapsed: false, collapsible: true}},
    {name: 'main', title: 'Main', options: {collapsed: false, collapsible: true}},
    {name: 'clouds', title: 'Clouds', options: {collapsed: false, collapsible: true}},
  ],
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'elementImage',
      fieldset: 'hero',
    }),
    defineField({
      name: 'cloudResource',
      title: 'Cloud Resource',
      type: 'reference',
      to: [{type: 'resource'}],
      fieldset: 'clouds',
    }),
    defineField({
      title: 'Resource Theme',
      name: 'resourceTheme',
      type: 'string',
      fieldset: 'clouds',
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
      name: 'cloudPerformance',
      title: 'Cloud Performance',
      type: 'reference',
      to: [{type: 'performance'}],
      fieldset: 'clouds',
    }),
    defineField({
      name: 'cloudEvent',
      title: 'Cloud Event',
      type: 'reference',
      to: [{type: 'event'}],
      fieldset: 'clouds',
    }),
    defineField({
      name: 'cloudArtist',
      title: 'Cloud Artist',
      type: 'reference',
      to: [{type: 'people'}],
      fieldset: 'clouds',
    }),
    defineField({
      title: 'Artist Theme',
      name: 'artistTheme',
      type: 'string',
      fieldset: 'clouds',
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
      name: 'cloudUrl',
      title: 'Cloud Url',
      type: 'linkExternal',
      fieldset: 'clouds',
    }),
    defineField({
      title: 'Url Theme',
      name: 'urlTheme',
      type: 'string',
      fieldset: 'clouds',
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
      name: 'intro',
      title: 'Intro',
      type: 'blockContent',
      fieldset: 'intro',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      fieldset: 'intro',
    }),
    defineField({
      name: 'cta',
      type: 'link',
      fieldset: 'intro',
    }),

    defineField({
      name: 'performanceSlider',
      type: 'array',
      of: [
        {
          name: 'performance',
          type: 'reference',
          to: [{type: 'performance'}],
        },
      ],
      fieldset: 'main',
    }),
    defineField({
      name: 'featuredEvent',
      type: 'reference',
      to: [{type: 'event'}],
      fieldset: 'main',
    }),
    defineField({
      name: 'partners',
      title: 'Partners',
      type: 'infoSection',
      fieldset: 'main',
    }),
    defineField({
      name: 'featuredArtists',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'people'}],
        },
      ],
      fieldset: 'main',
    }),
    defineField({
      name: 'featuredPartners',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'partner'}],
        },
      ],
      fieldset: 'main',
    }),
    defineField({
      name: 'manifesto',
      title: 'Manifesto',
      type: 'object',
      fields: [
        defineField({
          name: 'heading',
          title: 'Heading',
          type: 'string',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'blockContent',
        }),
      ],
      fieldset: 'main',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage',
      }
    },
  },
})
