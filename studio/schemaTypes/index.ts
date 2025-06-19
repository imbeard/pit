// documents
import {page} from './documents/page'
import {people} from './documents/people'
import {partner} from './documents/partner'
import {event} from './documents/event'
import {performance} from './documents/performance'
import {archive} from './documents/archive'
import {category} from './documents/category'
import {resource} from './documents/resource'

// objects
import {hero} from './objects/hero'
import {blockContent} from './objects/blockContent'
import {blockquote} from './objects/blockquote'
import {gallery} from './objects/gallery'
import {twoImages} from './objects/twoImages'
import {elementImage} from './objects/elementImage'
import {elementVideo} from './objects/elementVideo'
import {link} from './objects/link'
import {linkInternal} from './objects/link/linkInternal'
import {linkExternal} from './objects/link/linkExternal'
import {linkEmail} from './objects/link/linkEmail'
import {seo} from './objects/seo'
import {cta} from './objects/cta'
import {infoSection} from './objects/infoSection'
import {info} from './objects/info'
import {pageBuilder} from './objects/pageBuilder'
import {highlightedText} from './objects/highlightedText'

// singletons
import {homepage} from './singletons/homepage'
import {contact} from './singletons/contact'
import {about} from './singletons/about'
import {settings} from './singletons/settings'

// duration
import {duration} from './duration/duration'
import {timeValue} from './duration/timeValue'

export const schemaTypes = [
  // links
  link,
  linkInternal,
  linkExternal,
  linkEmail,

  // documents
  // page,
  people,
  event,
  performance,
  partner,
  archive,
  category,
  resource,

  // objects
  hero,
  blockContent,
  blockquote,
  gallery,
  twoImages,
  highlightedText,
  elementImage,
  elementVideo,
  seo,
  cta,
  infoSection,
  info,
  pageBuilder,

  // singletons
  homepage,
  settings,
  about,
  contact,

  //duration
  duration,
  timeValue,
]
