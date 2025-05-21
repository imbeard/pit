// documents
import {project} from './documents/project'
import {category} from './documents/category'
import {page} from './documents/page'
// objects
import {hero} from './objects/hero'
import {blockContent} from './objects/blockContent'
import {blockquote} from './objects/blockquote'
import {gallery} from './objects/gallery'

import {elementImage} from './objects/elementImage'
import {elementVideo} from './objects/elementVideo'
import {link} from './objects/link'
import {seo} from './objects/seo'
import {cta} from './objects/cta'
import {infoSection} from './objects/infoSection'
// singletons
import {settings} from './singletons/settings'

export const schemaTypes = [
  project,
  category,
  page,
  hero,
  blockContent,
  blockquote,
  gallery,
  elementImage,
  elementVideo,
  link,
  seo,
  cta,
  infoSection,
  settings,
]
