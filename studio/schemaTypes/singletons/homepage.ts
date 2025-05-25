import {defineField, defineType} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  icon: HomeIcon,
  fieldsets: [
    {name: 'intro', title: 'Intro', options: {collapsed: true, collapsible: true}},
    {name: 'hero', title: 'Hero', options: {collapsed: true, collapsible: true}},
    {name: 'main', title: 'Main', options: {collapsed: true, collapsible: true}},
  ],
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'elementImage',
      fieldset: 'hero',
    }),
    defineField({
      name: 'clouds',
      title: 'Clouds',
      type: 'array',
      of: [
        defineField({
          name: 'link',
          type: 'link',
        }),
      ],
      fieldset: 'hero',
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
      type: 'gallery',
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
