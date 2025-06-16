export const portableText = /* groq */ `
   ...,
    markDefs[]{
        ...,
       _type == 'linkInternal' => {
        url->{
            "category": _type,
            "slug": slug.current,
            "typology": typology,
            "label": label
        }
    },
    }
`;
