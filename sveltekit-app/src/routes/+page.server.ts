import { homepageQuery, eventsQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const page = await loadQuery(homepageQuery);
	const events = await loadQuery(eventsQuery);
	return { 
		page,
		events
	};
};
