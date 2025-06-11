import { peopleThumb } from './people';

export const eventThumb = /* groq */ ` 
    _id,
    "slug": slug.current,
    title,
    image,
    theme,
    summary,
    start,
    end,
    location,
    "typology": typology->,
    "institution": institution->,
    "featuredArtists": featuredArtists[]-> {
        ${peopleThumb}
     },
`;

export const featuredEventThumb = /* groq */ ` 
    ...,
     "typology": typology->,
     "institution": institution->,
     "featuredArtists": featuredArtists[]-> {
        ${peopleThumb}
    },
`;
