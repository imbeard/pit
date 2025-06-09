import { peopleThumb } from './people';
import { partnerThumb } from './partner';
export const performanceThumb = /* groq */ `
    _id,
    "slug": slug.current,
    image,
    title,
    "typology": typology->,
    artists[]-> {
        ${peopleThumb}
    },
    institutions[]-> {
        ${partnerThumb}
    },
`;
