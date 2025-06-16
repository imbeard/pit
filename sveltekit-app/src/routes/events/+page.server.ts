import { eventsQuery, filteredEventsQuery, archiveQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const { searchParams } = event.url;

	const params = {
		typologies: searchParams.get('typologies') ? searchParams.get('typologies').split(',') : [],
		institutions: searchParams.get('institutions')
			? searchParams.get('institutions').split(',')
			: [],
		people: searchParams.get('people') ? searchParams.get('people').split(',') : []
	};

	const filteredEvents = await loadQuery(filteredEventsQuery, {
		end: 5,
		typologies: params.typologies,
		institutions: params.institutions,
		people: params.people
	});
	
	const events = await loadQuery(eventsQuery, { end: 5 });
	const page = await loadQuery(archiveQuery, { slug: 'events' });

	return {
		events,
		filteredEvents,
		page,
		params
	};
};
