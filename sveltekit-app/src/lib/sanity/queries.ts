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

export const homepageQuery = groq`{
    "homepage": *[_type == "homepage"][0] {
        ...,

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

export const performanceQuery = groq`*[
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
export const eventsQuery = groq`*[_type == "event" && defined(slug.current)] | order(_createdAt desc) [0...$end] {
    ${eventThumb}
}`;
export const filteredEventsQuery = groq`*[_type == "event" && defined(slug.current)
&& typology->slug.current in $typologies
|| featuredArtists[]->slug.current in $people
|| institution->slug.current in $institutions
] | order(_createdAt desc) [0...$end] {
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

export const resourcesQuery = groq`*[_type == "resource"]| order(_createdAt desc) [0...$end]{
    ${resourceThumb}
     downloads[] {
            ${download}
        },
}`;
export const filteredResourcesQuery = groq`*[_type == "resource" && defined(slug.current)
&& typology in $typologies
|| count(downloads[url.asset->extension in $media]) > 0
] | order(_createdAt desc) [0...$end] {
    ${resourceThumb}
     downloads[] {
            ${download}
        },
}`;

export const performancesQuery = groq`*[_type == "performance"]| order(_createdAt desc) {
    ${performanceThumb}
}`;

export const archivesQuery = groq`*[_type == "archive"]| order(_createdAt desc)`;

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
