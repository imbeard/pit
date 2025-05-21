import {defineType} from 'sanity'

export const elementVideo = defineType({
  name: 'elementVideo',
  title: 'Video',
  type: 'object',
  fieldsets: [
    {
      name: 'mobileVideo',
      title: 'Mobile Video',
      description: 'Does the video have a source on mobile?',
      options: {
        collapsible: true,
        collapsed: true,
        modal: {type: 'popover'},
      },
    },
  ],
  fields: [
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
      validation: (Rule) => Rule.required(),
      description:
        'Alt text makes web content accessible to people with visual impairments by providing them with a description of the media on the web page',
      options: {
        isHighlighted: true,
      },
    },
    {
      title: 'Caption Text',
      name: 'caption',
      type: 'string',
      description: 'Optional caption for the video',
    },
    // mobileVideo
    {
      name: 'mobileUrl',
      title: 'Mobile Video Url',
      type: 'url',
      validation: (Rule) => Rule.required(),
      fieldset: 'mobileVideo',
    },
    {
      title: 'Mobile Alternative Text',
      name: 'mobileAlt',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description:
        'Alt text makes web content accessible to people with visual impairments by providing them with a description of the media on the web page',
      options: {
        isHighlighted: true,
      },
      fieldset: 'mobileVideo',
    },
    {
      title: 'Mobile Caption Text',
      name: 'mobileCaption',
      type: 'string',
      description: 'Optional caption for the video',
      fieldset: 'mobileVideo',
    },
  ],
})
