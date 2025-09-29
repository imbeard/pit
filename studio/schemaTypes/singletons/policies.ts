import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const policies = defineType({
  name: 'policies',
  title: 'Policies',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'cookiePolicy',
      title: 'Cookie Policy',
      type: 'blockContent',
    }),
    defineField({
      name: 'privacyPolicy',
      title: 'Privacy Policy',
      type: 'blockContent',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Policies',
      }
    },
  },
})
