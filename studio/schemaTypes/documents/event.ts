import {defineField, defineType, defineArrayMember} from 'sanity'
import {SearchIcon} from '@sanity/icons'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO', icon: SearchIcon},
  ],
  fieldsets: [
    {
      name: 'details',
      title: 'Details',
    },
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
      name: 'link',
      title: 'Link',
      type: 'url',
      placeholder: 'Link to participate',
      group: 'content',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'elementImage',
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
      group: 'content',
    }),
    defineField({
      name: 'typology',
      title: 'Typology',
      type: 'string',
      group: 'content',
      fieldset: 'details',
    }),
    defineField({
      name: 'artists',
      title: 'Artists',
      type: 'blockContent',
      group: 'content',
      fieldset: 'details',
    }),
    defineField({
      name: 'start',
      title: 'Start date',
      type: 'datetime',
      fieldset: 'details',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'end',
      title: 'End date',
      type: 'datetime',
      fieldset: 'details',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      group: 'content',
      fieldset: 'details',
    }),
    defineField({
      name: 'institutions',
      title: 'Institutions',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'partner'}]}],
      group: 'content',
    }),
    defineField({
      name: 'featuredArtists',
      title: 'Featured Artists',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'people'}]}],
      group: 'content',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page builder',
      type: 'array',
      of: [
        {type: 'cta'},
        {type: 'infoSection'},
        {type: 'hero'},
        {type: 'gallery'},
        {type: 'blockquote'},
      ],
      options: {
        insertMenu: {
          views: [
            {
              name: 'grid',
              previewImageUrl: (schemaTypeName) =>
                `/static/page-builder-thumbnails/${schemaTypeName}.png`,
            },
          ],
        },
      },
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
      subtitle: 'typology',
      media: 'image',
    },
  },
})
