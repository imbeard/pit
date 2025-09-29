import groq from 'groq';
import { performanceThumb } from './thumbnails/performance';
import { eventThumb } from './thumbnails/event';
import { peopleThumb, featuredPeopleThumb } from './thumbnails/people';
import { partnerThumb } from './thumbnails/partner';
import { resourceThumb } from './thumbnails/resource';
import { download } from './thumbnails/download';

import { link } from './fragments/link';
import { pageBuilder } from './fragments/pageBuilder';
import { portableText } from './fragments/portableText';

// singletons
export const settingsQuery = groq`*[_type == "settings"][0]`;
export const policiesQuery = groq`*[_type == "policies"][0]`;


export const contactQuery = groq`*[_type == "contact"][0]{
    contacts[] {
        ...,
        content[] {
            ${portableText}
        }
    }
}`;

export const homepageQuery = groq`{
    "homepage": *[_type == "homepage"][0] {
        ...,

        artistHover {
        "videoUrl": video.asset->url,

            ...
        },
        eventHover {
        "videoUrl": video.asset->url,

            ...
        },
        resourceHover {
        "videoUrl": video.asset->url,

            ...
        },
        performanceHover {
        "videoUrl": video.asset->url,

            ...
        },
        urlHover {
        "videoUrl": video.asset->url,

            ...
        },

        cloudArtist-> {
            name,
            "slug": slug.current,
            country,
            dateBirth
        },
        cloudEvent-> {
            title,
            "slug": slug.current,
            start,
            theme
        },
        cloudResource-> {
            title,
            "slug": slug.current,
            typology,
        },
        cloudPerformance-> {
            title,
            "slug": slug.current,
            theme
        },

        cta {
            ${link}
        },
        performanceSlider[]-> {
            ${performanceThumb}
        },
        featuredEvent->{
            ${eventThumb}
        },
        featuredArtists[]-> {
            ${featuredPeopleThumb}
        },
        featuredPartners[]-> {
            ${partnerThumb}
        },
    },

    "events": *[_type == "event" && defined(slug.current)] | order(_createdAt desc) [0...5] {
        ${eventThumb}
    },
    "resources": *[_type == "resource" && defined(slug.current)] | order(_createdAt desc) [0...5] {
        ${resourceThumb}
    },
    "partners": *[_type == "partner" && defined(slug.current)] | order(_createdAt desc) {
        ${partnerThumb}
    },
}`;

export const aboutQuery = groq`*[_type == "about"][0]`;

// document single entry
export const eventQuery = groq`*[
    _type == "event"
    && defined(slug.current)
    && slug.current == $slug] {
    ...,

    typology-> {
        _id,
        "slug": slug.current,
        title
    },

    performance-> {
       _id,
        "slug": slug.current,
        title,
        theme
    },

    institution-> {
       _id,
       "slug": slug.current,
       title
    },

    featuredArtists[]-> {
        ${featuredPeopleThumb}
    },

    allPartners[]-> {
        ${partnerThumb}
    },

    "relatedEvents": *[
    _type == "event" &&
    typology._ref == ^.typology._ref &&
    slug.current != $slug
    ] {
        ${eventThumb}
    }

    }`;

export const partnerQuery = groq`{

    "partner": *[
    _type == "partner"
    && defined(slug.current)
    && slug.current == $slug] {
        ...,
        ${pageBuilder}
    },

    "performances": *[_type == "performance"
    && references(*[_type == "partner" && slug.current == $slug][0]._id)] {
        ${performanceThumb}
    },

}`;

export const peopleQuery = groq`*[
    _type == "people"
    && defined(slug.current)
    && slug.current == $slug] {
        ...,
        performance-> {
           _id,
           "slug": slug.current,
           title,
           theme
        },
        ${pageBuilder}
    }`;
export const resourceQuery = groq`*[
    _type == "resource"
    && defined(slug.current)
    && slug.current == $slug] {
        ...,
        performance-> {
            _id,
            "slug": slug.current,
            title,
            theme
        },
        ${pageBuilder},
        downloads[] {
            ${download}
        },
    }`;

export const performanceQuery = groq`{
"performance": *[
    _type == "performance"
    && defined(slug.current)
    && slug.current == $slug] {
    ...,
    artists[]-> {
        ${featuredPeopleThumb}
    },
   institutions[] {
       role,
       institution-> {
           ${partnerThumb}
       }
    },
    "typology": typology->{
        _id,
        "slug": slug.current,
        title
    },
   ${pageBuilder},
    },

     "relatedEvents": *[_type == "event"
    && references(*[_type == "performance" && slug.current == $slug][0]._id)] {
        ${eventThumb}
    },
    "relatedResources": *[_type == "resource"
    && references(*[_type == "performance" && slug.current == $slug][0]._id)] {
        ${resourceThumb}
    },
}`;

export const pageQuery = groq`*[
    _type == "page"
    && defined(slug.current)
    && slug.current == $slug]`;

export const archiveQuery = groq`*[
    _type == "archive" && defined(slug.current) && slug.current == $slug] {
    ...,
    featuredEvents[]->{
       ${eventThumb}
    },
    }`;

// document archive entries
export const eventsQuery = groq`*[_type == "event" && defined(slug.current) && (
  !defined($date) || start >= $date
)] | order(start asc) [$start...$end] {
    ${eventThumb}
}`;
export const filteredEventsQuery = groq`*[_type == "event" && defined(slug.current) && (
  typology->slug.current in $typologies
  || featuredArtists[]->slug.current in $people
  || institution->slug.current in $institutions
) && (
  !defined($date) || start >= $date
)] | order(start asc) [$start...$end] {
    ${eventThumb}
}`;

export const partnersQuery = groq`*[_type == "partner"]| order(_createdAt desc) {
    ${partnerThumb}
}`;
export const filteredPeopleQuery = groq`*[_type == "people" && defined(slug.current)
&& job in $jobs
|| country in $countries
]| order(_createdAt desc) {
    ${peopleThumb}
}`;

export const allPeopleQuery = groq`*[_type == "people" && defined(slug.current) ]| order(_createdAt desc) {
    ${peopleThumb}
}`;

export const resourcesQuery = groq`*[_type == "resource"]| order(_createdAt desc) [$start...$end] {
    ${resourceThumb}
     downloads[] {
            ${download}
        },
}`;
export const filteredResourcesQuery = groq`*[_type == "resource" && defined(slug.current)
&& typology in $typologies
|| count(downloads[url.asset->extension in $media]) > 0
] | order(_createdAt desc) [$start...$end] {
    ${resourceThumb}
     downloads[] {
            ${download}
        },
}`;

export const performancesQuery = groq`*[_type == "performance"]| order(_createdAt desc) {
    ${performanceThumb}
}`;

export const archivesQuery = groq`*[_type == "archive"]| order(_createdAt desc)`;

// Filter options queries - lightweight queries for getting all available filter options
export const eventTypologiesQuery = groq`*[_type == "event" && defined(slug.current) && defined(typology)] {
    "typology": typology-> {
        _id,
        "slug": slug.current,
        title
    }
} | order(typology.title asc)`;

export const eventInstitutionsQuery = groq`*[_type == "event" && defined(slug.current) && defined(institution)] {
    "institution": institution-> {
        _id,
        "slug": slug.current,
        title
    }
} | order(institution.title asc)`;

export const eventPeopleQuery = groq`*[_type == "event" && defined(slug.current) && count(featuredArtists) > 0] {
    "featuredArtists": featuredArtists[]-> {
        _id,
        "slug": slug.current,
        name
    }
} | order(featuredArtists[0].name asc)`;

// Resource filter queries
export const resourceTypologiesQuery = groq`*[_type == "resource" && defined(slug.current) && defined(typology)] {
    typology
} | order(typology asc)`;

export const resourceMediaQuery = groq`*[_type == "resource" && defined(slug.current) && count(downloads) > 0] {
    downloads[] {
        url {
            asset->{
                extension
            }
        }
    }
}`;

/* SEARCH */
export const searchQuery = groq`{
  "performances": *[_type == "performance" && (
      title match "*" + $query + "*" ||
      pt::text(description) match "*" + $query + "*" ||
      count(institutions[title match "*" + $query + "*"]) > 0 ||
      count(artists[name match "*" + $query + "*"]) > 0 ||
      count(typology[title match "*" + $query + "*"]) > 0
    )] {
    _id,
    title,
    "slug": slug.current
  },

  "people": *[_type == "people" && (
      name match "*" + $query + "*" ||
      pt::text(summary) match "*" + $query + "*" ||
      string(job) match "*" + $query + "*"
    )] {
    _id,
    name,
    "slug": slug.current
  },

  "partners": *[_type == "partner" && (
      title match "*" + $query + "*" ||
      extendedTitle match "*" + $query + "*" ||
      pt::text(description) match "*" + $query + "*"
    )] {
    _id,
    title,
    "slug": slug.current
  },

  "events": *[_type == "event" && (
      title match "*" + $query + "*" ||
      pt::text(summary) match "*" + $query + "*" ||
      pt::text(description) match "*" + $query + "*" ||
      location match "*" + $query + "*" ||
      city match "*" + $query + "*" ||
      count(institution[title match "*" + $query + "*"]) > 0 ||
      count(featuredArtists[name match "*" + $query + "*"]) > 0 ||
      count(typology[title match "*" + $query + "*"]) > 0
    )] {
    _id,
    title,
    "slug": slug.current
  },

  "resources": *[_type == "resource" && (
      title match "*" + $query + "*" ||
      typology match "*" + $query + "*" ||
      count(performance[title match "*" + $query + "*"]) > 0
    )] {
    _id,
    title,
    "slug": slug.current
  }
}`;
