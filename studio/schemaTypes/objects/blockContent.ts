import {defineArrayMember, defineType, defineField} from 'sanity'

export const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
      ],
      marks: {
        decorators: [
          {title: 'Emphasis', value: 'em'},
        ],
        annotations: [
          {
            name: 'linkEmail',
            type: 'linkEmail',
          },
          {
            name: 'linkInternal',
            type: 'linkInternal',
          },
          {
            name: 'linkExternal',
            type: 'linkExternal',
          },
        ],
      },
    }),
  ],
})
