import {defineType} from 'sanity'

export const elementImage = defineType({
  name: 'elementImage',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true,
  },
  fields: [
    {
      title: 'Alternative Text',
      name: 'alt',
      type: 'string',
      description:
        'Alt text makes web content accessible to people with visual impairments by providing them with a description of the images on the web page',
    },
    {
      title: 'Caption Text',
      name: 'caption',
      type: 'blockContent',
      description: 'Optional caption for the image',
    },
    // mobileImage
    {
      name: 'hasMobile',
      title: 'Has Mobile Image?',
      description: 'Does the image have another source for mobile?',
      type: 'boolean',
    },
    {
      name: 'mobileImage',
      title: 'Mobile Image',
      type: 'image',
      hidden: ({parent}) => parent?.hasMobile !== true,
      fields: [
        {
          title: 'Alternative Text',
          name: 'alt',
          type: 'string',
          description:
            'Alt text makes web content accessible to people with visual impairments by providing them with a description of the images on the web page',
        },
        {
          title: 'Caption Text',
          name: 'caption',
          type: 'blockContent',
          description: 'Optional caption for the image',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'alt',
      media: 'asset',
    },
  },
})
