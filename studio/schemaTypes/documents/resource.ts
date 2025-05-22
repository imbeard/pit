import {defineField, defineType} from 'sanity'

export const resource = defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
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
    // defineField({
    //   name: 'downloads',
    //   title: 'Downloads',
    //   type: 'array',
    //   group: 'content',
    //   of: [
    //     {
    //       name: 'download',
    //       type: 'object',
    //       fields: [
    //         defineField({
    //           name: 'title',
    //           title: 'Title',
    //           type: 'string',
    //         }),
    //         defineField({
    //           name: 'url',
    //           title: 'Url',
    //           type: 'file',
    //         }),
    //       ],
    //     },
    //   ],
    // }),
  ],
})
