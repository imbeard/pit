import groq from 'groq';
import { performanceThumb } from './thumbnails/performance';
import { eventThumb } from './thumbnails/event';
import { peopleThumb, featuredPeopleThumb } from './thumbnails/people';
import { partnerThumb, featuredPartnerThumb } from './thumbnails/partner';
import { resourceThumb } from './thumbnails/resource';

import { link } from './fragments/link';

// singletons
export const homepageQuery = groq`*[_type == "homepage"][0] {
    ...,
    cta {
        ${link}
    },
    performanceSlider[]-> {
        ${performanceThumb}
    },
    featuredEvent->{
        ...,
        "institution": institution->,
    },
    featuredArtists[]-> {
        ${featuredPeopleThumb}
    },
    featuredPartners[]-> {
        ${featuredPartnerThumb}
    },
}`;

export const settingsQuery = groq`*[_type == "settings"][0]`;

// document entry
export const eventQuery = groq`*[
    _type == "event" 
    && defined(slug.current) 
    && slug.current == $slug]`;
export const partnerQuery = groq`*[
    _type == "partner" 
    && defined(slug.current) 
    && slug.current == $slug]`;
export const peopleQuery = groq`*[
    _type == "people" 
    && defined(slug.current) 
    && slug.current == $slug]`;
export const resourceQuery = groq`*[
    _type == "resource" 
    && defined(slug.current) 
    && slug.current == $slug]`;
export const performanceQuery = groq`*[
    _type == "performance" 
    && defined(slug.current) 
    && slug.current == $slug]`;
export const pageQuery = groq`*[
    _type == "page" 
    && defined(slug.current) 
    && slug.current == $slug]`;
export const categoryQuery = groq`*[
    _type == "category" && defined(slug.current) && slug.current == $slug] {
    ...,
    featuredEvents[]->{
        ...,
        "institution": institution->
    },
    }`;

// document entries
export const eventsQuery = groq`*[_type == "event"] | order(_createdAt desc) [0...$end] {
    ${eventThumb}
}`;
export const partnersQuery = groq`*[_type == "partner"]| order(_createdAt desc) [0...$end]{
    ${partnerThumb}
}`;
export const filteredPeopleQuery = groq`*[_type == "people" && defined(slug.current) 
&& job in $jobs 
|| country in $countries
]| order(_createdAt desc) [0...$end]{
    ${peopleThumb}
}`;

export const allPeopleQuery = groq`*[_type == "people" && defined(slug.current) ]| order(_createdAt desc) [0...$end]{
    ${peopleThumb}
}`;

export const resourcesQuery = groq`*[_type == "resource"]| order(_createdAt desc) [0...$end]{
    ${resourceThumb}
}`;
export const performancesQuery = groq`*[_type == "performance"]| order(_createdAt desc) [0...$end]{
    ${performanceThumb}
}`;
export const categoriesQuery = groq`*[_type == "category"]| order(_createdAt desc) [0...$end]`;
