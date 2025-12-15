import {defineField, defineType} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'Seo',
  type: 'object',
  description: 'SEO settings for the page, used for Google search and social media',
  fieldsets: [
    {
      name: 'openGraph',
      title: 'OpenGraph options',
      options: {
        collapsible: true,
        collapsed: false,
        modal: {type: 'popover'},
      },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      description: 'Dimensions: 1200 x 630',
      type: 'image',
    }),
  ],
})
