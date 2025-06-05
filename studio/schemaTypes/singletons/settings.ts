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
      name: 'navigation',
      title: 'Navigation',
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
      name: 'contacts',
      type: 'array',
      of: [{type: 'link'}],
      group: 'company'
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
        defineField({
          name: 'contact',
          title: 'Contact',
          type: 'link'
        })
      ],
      group: 'navigation'
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo'
    })
  ]
})
