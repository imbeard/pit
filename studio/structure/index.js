import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {EyeOpenIcon, BookmarkIcon, VersionsIcon} from '@sanity/icons'

export const structure = (S, context) =>
  S.list()
    .id('root')
    .title('Content')
    .items([
      // orderableDocumentListDeskItem({
      //   type: 'project',
      //   title: 'Project',
      //   icon: EyeOpenIcon,
      //   S,
      //   context,
      // }),

      S.documentTypeListItem('homepage')
        .title('Homepage')
        .child(S.document().schemaType('homepage').title('Homepage').documentId('homepage')),

      S.divider(),

      S.documentTypeListItem('event').title('Events'),
      S.documentTypeListItem('performance').title('Performances'),
      S.documentTypeListItem('people').title('People'),
      S.documentTypeListItem('partner').title('Partners'),
      S.documentTypeListItem('resource').title('Resources'),
      S.documentTypeListItem('category').title('Categories'),

      S.divider(),

      S.documentTypeListItem('page').title('Pages'),
      S.documentTypeListItem('archive').title('Archives'),

      // S.documentTypeListItem('resource').title('Resources'),

      // S.listItem()
      //   .title('Archive Pages')
      //   .child(
      //     S.list()
      //       .title('Archive Pages')
      //       .items([
      //         S.documentTypeListItem('archivePartners').child(
      //           S.document()
      //             .schemaType('archivePartners')
      //             .title('Partners')
      //             .documentId('archivePartners'),
      //         ),
      //         S.documentTypeListItem('archivePerformances').child(
      //           S.document()
      //             .schemaType('archivePerformances')
      //             .title('Performances')
      //             .documentId('archivePerformances'),
      //         ),
      //         S.documentTypeListItem('archiveResources').child(
      //           S.document()
      //             .schemaType('archiveResources')
      //             .title('Resources')
      //             .documentId('archiveResources'),
      //         ),
      //         S.documentTypeListItem('archiveEvents').child(
      //           S.document()
      //             .schemaType('archiveEvents')
      //             .title('Events')
      //             .documentId('archiveEvents'),
      //         ),
      //         S.documentTypeListItem('archivePeople').child(
      //           S.document()
      //             .schemaType('archivePeople')
      //             .title('People')
      //             .documentId('archivePeople'),
      //         ),
      //       ]),
      //   ),

      S.divider(),

      S.documentTypeListItem('settings')
        .title('Settings')
        .child(S.document().schemaType('settings').title('Settings').documentId('settings')),
    ])
