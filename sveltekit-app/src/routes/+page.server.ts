import { homepageQuery, eventsQuery, partnersQuery, resourcesQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const page = await loadQuery(homepageQuery);
	const events = await loadQuery(eventsQuery, { end: 4 });
	const partners = await loadQuery(partnersQuery, { end: 100 });
	const resources = await loadQuery(resourcesQuery, { end: 10 });

	return { 
		page,
		events,
		partners,
		resources
	};
};
