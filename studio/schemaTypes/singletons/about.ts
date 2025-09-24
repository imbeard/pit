import {defineField, defineType} from 'sanity'
import {CropIcon} from '@sanity/icons'

export const about = defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  icon: CropIcon,
  fieldsets: [
    {name: 'intro', title: 'Intro', options: {collapsed: false, collapsible: true}},
    {name: 'clouds', title: 'Clouds', options: {collapsed: false, collapsible: true}},
  ],
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
      name: 'intro',
      title: 'Intro',
      type: 'text',
      fieldset: 'intro',
    }),
    defineField({
      name: 'texts',
      title: 'Texts',
      type: 'array',
      of: [{type: 'infoSection'}],
      fieldset: 'intro',
    }),
    defineField({
      name: 'coreValue_1',
      title: 'Core Value 1',
      type: 'infoSection',
      fieldset: 'clouds',
    }),
    defineField({
      name: 'coreValue_2',
      title: 'Core Value 2',
      type: 'infoSection',
      fieldset: 'clouds',
    }),
    defineField({
      name: 'coreValue_3',
      title: 'Core Value 3',
      type: 'infoSection',
      fieldset: 'clouds',
    }),
    defineField({
      name: 'coreValue_4',
      title: 'Core Value 4',
      type: 'infoSection',
      fieldset: 'clouds',
    }),
    defineField({
      name: 'coreValue_5',
      title: 'Core Value 5',
      type: 'infoSection',
      fieldset: 'clouds',
    }),
    defineField({
      name: 'keyActivities',
      title: 'Key Activities',
      type: 'array',
      of: [{type: 'infoSection'}],
    }),
    defineField({
      name: 'impactGoals',
      title: 'Impact Goals',
      type: 'array',
      of: [{type: 'infoSection'}],
    }),
    defineField({
      name: 'euProgramme',
      title: 'European Programme',
      type: 'infoSection',
    }),
    defineField({
      name: 'partners',
      title: 'Partners',
      type: 'infoSection',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'About',
      }
    },
  },
})
