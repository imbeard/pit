export const performanceThumb = /* groq */ `
    _id,
    "slug": slug.current,
    image,
    title,
    theme,
    "typology": typology-> {
        _id,
        "slug": slug.current,
        title
    },
    artists[]-> {
         _id,
        "slug": slug.current,
        name,
        country,
        job
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
