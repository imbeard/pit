import { homepageQuery, eventsQuery, partnersQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const page = await loadQuery(homepageQuery);
	const events = await loadQuery(eventsQuery, { end: 4 });
	const partners = await loadQuery(partnersQuery, { end: 100 });

	return { 
		page,
		events,
		partners,
	};
};
