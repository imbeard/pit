import { peopleQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async (event) => {
    const { loadQuery } = event.locals;
    const params = event.params;

    const person = await loadQuery(peopleQuery, { slug: params.slug });
    return {
        person
    };
};
