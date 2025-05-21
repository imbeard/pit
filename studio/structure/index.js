import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {EyeOpenIcon, BookmarkIcon, VersionsIcon} from '@sanity/icons'

export const structure = (S, context) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      orderableDocumentListDeskItem({
        type: 'project',
        title: 'Project',
        icon: EyeOpenIcon,
        S,
        context,
      }),

      S.divider(),

      S.documentTypeListItem('page'),

      S.divider(),

      S.documentTypeListItem('category'),

      S.divider(),

      S.documentTypeListItem('settings')
        .title('Settings')
        .child(S.document().schemaType('settings').title('Settings').documentId('settings')),
    ])
