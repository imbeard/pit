import { portableText } from './portableText';

export const pageBuilder = /* groq */ `
pageBuilder {
    sections[] {
    ...,
    _type == 'blockquote' => {
        text[0] {
            ${portableText}
        }
    },
    _type == 'infoSection' => {
        content[] {
            ${portableText}
        }
    }
}
}
`;
