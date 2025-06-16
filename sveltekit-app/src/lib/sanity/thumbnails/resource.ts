import { download } from './download';

export const resourceThumb = /* groq */ ` 
    _id,
    _createdAt,
    title,
    "slug": slug.current,
    typology,
    "image": thumbnail,
`;
