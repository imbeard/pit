import {defineField, defineType} from 'sanity'
import {EarthGlobeIcon, MenuIcon, AsteriskIcon, SearchIcon} from '@sanity/icons'

export const settings = defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  icon: EarthGlobeIcon,
  groups: [
    {
      name: 'company',
      title: 'Company',
      icon: AsteriskIcon,
    },
    {
      default: true,
      name: 'footer',
      title: 'Footer',
      icon: MenuIcon,
    },
    {
      name: 'seo',
      title: 'SEO',
      icon: SearchIcon,
    },
  ],
  fieldsets: [
    {
      name: 'company',
      options: {
        columns: 2
      }
    },
    {
      name: 'contacts',
      options: {
        columns: 2
      }
    }
  ],
  fields: [
    defineField({
      name: 'companyName',
      title: 'Company Name',
      group: 'company',
      type: 'string',
      fieldset: 'company'
    }),
    defineField({
      name: 'companyAddress',
      title: 'Company Address',
      group: 'company',
      type: 'string',
      fieldset: 'company'
    }),
    defineField({
      name: 'email',
      type: 'email',
      group: 'company',
      fieldset: 'contacts'
    }),
     defineField({
      name: 'phone',
      type: 'string',
      group: 'company',
      fieldset: 'contacts'
    }),
    defineField({
      name: 'social',
      type: 'array',
      of: [{type: 'link'}],
      group: 'company'
    }),
    defineField({
      name: 'footer',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Text',
          type: 'text'
        }),
      ],
      group: 'footer'
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo'
    })
  ]
})
