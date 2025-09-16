import {defineField, defineType} from 'sanity'
import {PresentationIcon} from '@sanity/icons'

export const cloudHover = defineType({
  name: 'cloudHover',
  title: 'Cloud Hover',
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
      type: 'file',
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
