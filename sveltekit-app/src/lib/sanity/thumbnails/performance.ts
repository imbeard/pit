import { peopleThumb } from './people';
export const performanceThumb = /* groq */ `
    _id,
    "slug": slug.current,
    image,
    title,
    theme,
    "typology": typology->,
    artists[]-> {
        ${peopleThumb}
    },
    institutions[] {
       role,
       institution-> {
           _id,
           "slug": slug.current,
           title,
       }
    },
`;
