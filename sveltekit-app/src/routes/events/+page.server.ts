import { eventsQuery, categoryQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async (event) => {
    const { loadQuery } = event.locals;
    const events = await loadQuery(eventsQuery, {end: 300});
    const page = await loadQuery(categoryQuery, { slug: 'events' });

    return {
        events,
        page,
    };
};
