import { peopleThumb } from './people';
import { partnerThumb } from './partner';
export const performanceThumb = /* groq */ `
    _id,
    "slug": slug.current,
    image,
    title,
    typology,
    artists[]-> {
        ${peopleThumb}
    },
    institutions[]-> {
        ${partnerThumb}
    },
`;
