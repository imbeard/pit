import {defineType} from 'sanity'

export const elementVideo = defineType({
  name: 'elementVideo',
  title: 'Video',
  type: 'object',
  fields: [
    {
      name: 'poster',
      title: 'Poster',
      type: 'image',
      description: 'Optional poster image for the video',
    },
    {
      name: 'url',
      title: 'Video Url',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Alternative Text',
      name: 'alt',
      type: 'string',
      description:
        'Alt text makes web content accessible to people with visual impairments by providing them with a description of the media on the web page',
      options: {
        isHighlighted: true,
      },
    },
    {
      title: 'Caption Text',
      name: 'caption',
      type: 'blockContent',
      description: 'Optional caption for the video',
    },
    // mobileVideo
    {
      name: 'hasMobile',
      title: 'Has Mobile Video?',
      description: 'Does the video have another source for mobile?',
      type: 'boolean',
    },
    {
      name: 'mobileVideo',
      title: 'Mobile Video',
      type: 'object',
      hidden: ({parent}) => parent?.hasMobile !== true,
      fields: [
        {
          name: 'poster',
          title: 'Poster',
          type: 'image',
          description: 'Optional poster image for the video',
        },
        {
          name: 'url',
          title: 'Video Url',
          type: 'url',
          validation: (Rule) => Rule.required(),
        },
        {
          title: 'Alternative Text',
          name: 'alt',
          type: 'string',
          description:
            'Alt text makes web content accessible to people with visual impairments by providing them with a description of the media on the web page',
          options: {
            isHighlighted: true,
          },
        },
        {
          title: 'Caption Text',
          name: 'caption',
          type: 'blockContent',
          description: 'Optional caption for the video',
        },
      ],
    },
  ],
  preview: {
    select: {
      media: 'poster',
    },
    prepare({media}) {
      return {
        media,
      }
    },
  },
})
