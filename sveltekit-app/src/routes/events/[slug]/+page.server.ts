import { eventQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async (event) => {
    const { loadQuery } = event.locals;
    const params = event.params;

    const document = await loadQuery(eventQuery, { slug: params.slug });
    return {
        document
    };
};
