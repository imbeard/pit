import {defineField, defineType} from 'sanity'
import {PresentationIcon} from '@sanity/icons'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  icon: PresentationIcon,
  fieldsets: [
    {
      name: 'image',
      options: {
        collapsed: true,
        collapsible: true,
        modal: {type: 'popover'},
      },
    },
    {
      name: 'video',
      description: 'If video is present will override image',
      options: {
        collapsed: true,
        collapsible: true,
        modal: {type: 'popover'},
      },
    },
  ],
  fields: [
    defineField({
      name: 'video',
      title: 'Video',
      type: 'elementVideo',
      fieldset: 'video',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'elementImage',
      fieldset: 'image',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'title',
      }
    },
  },
})
