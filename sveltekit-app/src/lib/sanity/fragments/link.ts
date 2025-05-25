export const link = /* groq */ `
"link": {
    ...,
    source == 'linkInternal' => {
        "category": linkInternal.url->_type,
        "url": linkInternal.url->slug.current,
        "typology": linkInternal.url->typology,
        "label": linkInternal.label,
    },
    source == 'linkExternal' => {
        "url": linkExternal.url,
        "label": linkExternal.label
    },
    source == 'linkEmail' => {
        "url": linkEmail.url,
        "label": linkEmail.label
    },
    source == 'download' => {
        "url": linkExternal.url,
        "label": linkExternal.label
    },
}`;
