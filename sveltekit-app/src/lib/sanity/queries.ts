import groq from 'groq';
import { performanceThumb } from './thumbnails/performance';
import { eventThumb } from './thumbnails/event';
import { peopleThumb } from './thumbnails/people';
import { partnerThumb } from './thumbnails/partner';
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
    }
}`;
export const settingsQuery = groq`*[_type == "settings"][0]`;



// document entry
export const eventQuery = groq`*[
    _type == "event" 
    && defined(slug.current) 
    && slug.current == $slug] | order(_createdAt desc)`;
export const partnerQuery = groq`*[
    _type == "partner" 
    && defined(slug.current) 
    && slug.current == $slug]| order(_createdAt desc)`;
export const peopleQuery = groq`*[
    _type == "people" 
    && defined(slug.current) 
    && slug.current == $slug]| order(_createdAt desc)`;
export const resourceQuery = groq`*[
    _type == "resource" 
    && defined(slug.current) 
    && slug.current == $slug]| order(_createdAt desc)`;
export const performanceQuery = groq`*[
    _type == "performance" 
    && defined(slug.current) 
    && slug.current == $slug]| order(_createdAt desc)`;
export const pageQuery = groq`*[
    _type == "page" 
    && defined(slug.current) 
    && slug.current == $slug]| order(_createdAt desc)`;
export const categoryQuery = groq`*[
    _type == "category" 
    && defined(slug.current) 
    && slug.current == $slug]| order(_createdAt desc)`;



// document entries
export const eventsQuery = groq`*[_type == "event"]| order(_createdAt desc){
    ${eventThumb}
}`;
export const partnersQuery = groq`*[_type == "partner"]| order(_createdAt desc){
    ${partnerThumb}
}`;
export const allPeopleQuery = groq`*[_type == "people"]| order(_createdAt desc){
    ${peopleThumb}
}`;
export const resourcesQuery = groq`*[_type == "resource"]| order(_createdAt desc){
    ${resourceThumb}
}`;
export const performancesQuery = groq`*[_type == "performance"]| order(_createdAt desc){
    ${performanceThumb}
}`;
export const categoriesQuery = groq`*[_type == "category"]| order(_createdAt desc)`;
