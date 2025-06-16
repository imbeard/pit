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
  ],
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'elementImage',
      fieldset: 'hero',
    }),
    // defineField({
    //   name: 'clouds',
    //   title: 'Clouds',
    //   type: 'cloud',
    //   fieldset: 'hero',
    // }),

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
