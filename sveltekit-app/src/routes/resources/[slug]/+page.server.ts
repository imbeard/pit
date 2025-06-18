import { resourceQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async (event) => {
    const { loadQuery } = event.locals;
    const params = event.params;

    const resource = await loadQuery(resourceQuery, { slug: params.slug });
    return {
        resource
    };
};
