import groq from 'groq';

// singletons
export const homepageQuery = groq`*[_type == "homepage"][0]`;
export const settingsQuery = groq`*[_type == "settings"][0]`;

// documents
export const eventsQuery = groq`*[_type == "event" && defined(slug.current)]| order(_createdAt desc)`;
export const partnersQuery = groq`*[_type == "partner" && defined(slug.current)]| order(_createdAt desc)`;
export const peopleQuery = groq`*[_type == "people" && defined(slug.current)]| order(_createdAt desc)`;
export const resourceQuery = groq`*[_type == "resource" && defined(slug.current)]| order(_createdAt desc)`;
export const performanceQuery = groq`*[_type == "performance" && defined(slug.current)]| order(_createdAt desc)`;
export const pageQuery = groq`*[_type == "page" && defined(slug.current)]| order(_createdAt desc)`;
export const categoryQuery = groq`*[_type == "category" && defined(slug.current)]| order(_createdAt desc)`;

// document thumbs
export const eventThumbQuery = groq`*[_type == "event" && defined(slug.current)]| order(_createdAt desc) {
    _id,
    "slug": slug.current,
    title,
    image,
    theme,
    typology,
    summary,
    start,
    end,
    location
}`;

export const performanceThumbQuery = groq`*[_type == "performance" && defined(slug.current)]| order(_createdAt desc) {
    _id,
    "slug": slug.current,
    image,
    title,
    typology,
    artists,
    institutions,
}`;

export const partnerThumbQuery = groq`*[_type == "partner" && defined(slug.current)]| order(_createdAt desc) {
    _id,
    "slug": slug.current,
    logo,
    title,
}`;

export const peopleThumbQuery = groq`*[_type == "people" && defined(slug.current)]| order(_createdAt desc) {
    _id,
    "slug": slug.current,
    name,
    country,
}`;

export const resourceThumbQuery = groq`*[_type == "resource" && defined(slug.current)]| order(_createdAt desc) {
    _id,
    _createdAt,
    "slug": slug.current,
    downloads,
}`;
