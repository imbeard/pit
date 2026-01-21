import {defineField, defineType} from 'sanity'
import {SearchIcon} from '@sanity/icons'
import country_list from '../../utils/country_list'

export const people = defineType({
  name: 'people',
  title: 'People',
  type: 'document',
  groups: [{name: 'seo', title: 'SEO', icon: SearchIcon}],
  fields: [
    // defineField({
    //   name: 'language',
    //   type: 'string',
    //   readOnly: true,
    //   hidden: true,
    // }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'elementImage',
    }),
    defineField({
      name: 'job',
      title: 'Job',
      type: 'string',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'blockContent',
    }),
    {
      title: 'Country',
      name: 'country',
      type: 'string',
      options: {
        list: [...country_list],
      },
    },
    {
      name: 'dateBirth',
      title: 'Date of birth',
      type: 'date',
    },
    defineField({
      name: 'performance',
      title: 'Performance',
      type: 'reference',
      to: [{type: 'performance'}],
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
      title: 'name',
      subtitle: 'job',
      media: 'image',
    },
  },
})
