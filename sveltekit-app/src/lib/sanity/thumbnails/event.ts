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
    "typology": typology-> {
        _id,
        "slug": slug.current,
        title
    },
    "institution": institution->{
        _id,
        "slug": slug.current,
        title
    },
    "featuredArtists": featuredArtists[]-> {
        _id,
        "slug": slug.current,
        name,
     },
`;
