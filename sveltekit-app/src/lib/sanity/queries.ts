import groq from 'groq';
import { performanceThumb } from './thumbnails/performance';
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

// documents
export const eventsQuery = groq`*[_type == "event" && defined(slug.current)]| order(_createdAt desc)`;
export const partnersQuery = groq`*[_type == "partner" && defined(slug.current)]| order(_createdAt desc)`;
export const peopleQuery = groq`*[_type == "people" && defined(slug.current)]| order(_createdAt desc)`;
export const resourceQuery = groq`*[_type == "resource" && defined(slug.current)]| order(_createdAt desc)`;
export const performanceQuery = groq`*[_type == "performance" && defined(slug.current)]| order(_createdAt desc)`;
export const pageQuery = groq`*[_type == "page" && defined(slug.current)]| order(_createdAt desc)`;
export const categoryQuery = groq`*[_type == "category" && defined(slug.current)]| order(_createdAt desc)`;
