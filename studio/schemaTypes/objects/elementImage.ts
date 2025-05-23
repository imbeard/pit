import {defineType} from 'sanity'

export const elementImage = defineType({
  name: 'elementImage',
  title: 'Image',
  type: 'image',
  options: {
    hotspot: true,
  },
  fieldsets: [
    {
      name: 'mobileImage',
      title: 'Mobile Image',
      description: 'Does the image have a different format on mobile?',
      options: {
        collapsible: true,
        collapsed: true,
        modal: {type: 'popover'},
      },
    },
  ],
  fields: [
    {
      title: 'Alternative Text',
      name: 'alt',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description:
        'Alt text makes web content accessible to people with visual impairments by providing them with a description of the images on the web page',
      options: {
        isHighlighted: true,
      },
    },
    {
      title: 'Caption Text',
      name: 'caption',
      type: 'string',
      description: 'Optional caption for the image',
    },
    // mobileImage
    {
      title: 'Mobile Image',
      name: 'mobileImage',
      type: 'image',
      fieldset: 'mobileImage',
      options: {
        hotspot: true,
      },
    },
    {
      title: 'Mobile Alternative Text',
      name: 'mobileAlt',
      type: 'string',
      description:
        'Alt text makes web content accessible to people with visual impairments by providing them with a description of the images on the web page',
      options: {
        isHighlighted: true,
      },
      fieldset: 'mobileImage',
    },
    {
      title: 'Mobile Caption Text',
      name: 'mobileCaption',
      type: 'string',
      description: 'Optional caption for the image',
      fieldset: 'mobileImage',
    },
  ],
  preview: {
    select: {
      title: 'alt',
      media: 'asset',
    },
  },
})
