import { portableText } from './portableText';

export const pageBuilder = /* groq */ `
pageBuilder {
    sections[] {
    ...,
    _type == 'blockquote' => {
        text[0] {
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
        }
    },
    _type == 'infoSection' => {
        content[] {
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
        }
    }
}
}
`;
