import { resourcesQuery, categoryQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async (event) => {
    const { loadQuery } = event.locals;
    const resources = await loadQuery(resourcesQuery, { end: 100 });
    const page = await loadQuery(categoryQuery, { slug: 'resources' });

    return {
        resources,
        page
    };
};
