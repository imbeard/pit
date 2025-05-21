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
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Optional heading',
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'elementVideo',
      fieldset: 'video'
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'elementImage',
      fieldset: 'image',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
    },
    prepare(selection) {
      const {title} = selection

      return {
        title: title,
        subtitle: 'Hero',
      }
    },
  },
})
