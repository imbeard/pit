import {defineField, defineType, defineArrayMember} from 'sanity'
import {CloudShapes} from '../components/CloudShapes'
import {SearchIcon} from '@sanity/icons'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  groups: [{name: 'seo', title: 'SEO', icon: SearchIcon}],
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
      name: 'featuredMask',
      title: 'Featured Mask',
      description: 'Shape used when event is featured',
      type: 'string',
      options: {
        list: [
          {title: 'CloudShape 1', value: 'CloudShape-1'},
          {title: 'CloudShape 2', value: 'CloudShape-2'},
          {title: 'CloudShape 3', value: 'CloudShape-3'},
          {title: 'CloudShape 4', value: 'CloudShape-4'},
          {title: 'CloudShape 5', value: 'CloudShape-5'},
        ],
      },
      components: {input: CloudShapes},
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      placeholder: 'Link to participate',
    }),
    defineField({
      title: 'Theme',
      name: 'theme',
      type: 'string',
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
          {title: 'Gray / Blue', value: 'gray-blue'},
          {title: 'Gray / Red', value: 'gray-red'},
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
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      description: 'A short summary of the event, for thumbnails',
      type: 'text',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'typology',
      title: 'Typology',
      fieldset: 'details',
      type: 'reference',
      to: [{type: 'category'}],
    }),
    defineField({
      name: 'performance',
      title: 'Performance',
      type: 'reference',
      to: [{type: 'performance'}],
    }),
    defineField({
      name: 'artists',
      title: 'Artists',
      type: 'blockContent',
      fieldset: 'details',
    }),
    defineField({
      name: 'start',
      title: 'Start date',
      type: 'date',
      fieldset: 'details',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'end',
      title: 'End date',
      type: 'date',
      fieldset: 'details',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Time',
      type: 'duration',
      fieldset: 'details',
    }),
    defineField({
      name: 'city',
      title: 'City',
      type: 'string',
      fieldset: 'details',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      fieldset: 'details',
    }),
    defineField({
      name: 'informations',
      title: 'Informations',
      type: 'array',
      description: 'Addresses, contacts, ...',
      of: [
        defineArrayMember({
          type: 'info',
        }),
      ],
    }),
    defineField({
      name: 'institution',
      title: 'Institution',
      type: 'reference',
      to: [{type: 'partner'}],
    }),
    defineField({
      name: 'featuredArtists',
      title: 'Featured Artists',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'people'}]}],
    }),
    defineField({
      name: 'allPartners',
      title: 'All Partners',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'partner'}]}],
    }),
    defineField({
      name: 'pageBuilder',
      type: 'pageBuilder',
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
