import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {EyeOpenIcon, BookmarkIcon, VersionsIcon} from '@sanity/icons'

export const structure = (S, context) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      S.documentTypeListItem('homepage')
        .title('Homepage')
        .child(S.document().schemaType('homepage').title('Homepage').documentId('homepage')),

      S.divider(),

      S.documentTypeListItem('about')
        .title('About')
        .child(S.document().schemaType('about').title('About').documentId('about')),

      S.divider(),

      S.documentTypeListItem('contact')
        .title('Contact')
        .child(S.document().schemaType('contact').title('Contact').documentId('contact')),

      S.divider(),

      S.documentTypeListItem('event').title('Events'),
      S.documentTypeListItem('performance').title('Performances'),
      S.documentTypeListItem('people').title('People'),
      S.documentTypeListItem('partner').title('Partners'),
      S.documentTypeListItem('resource').title('Resources'),
      S.documentTypeListItem('category').title('Categories'),

      S.divider(),

      S.documentTypeListItem('archive').title('Archives'),

      S.divider(),

      S.documentTypeListItem('settings')
        .title('Settings')
        .child(S.document().schemaType('settings').title('Settings').documentId('settings')),

      S.documentTypeListItem('policies')
        .title('Policies')
        .child(S.document().schemaType('policies').title('Policies').documentId('policies')),
    ])
