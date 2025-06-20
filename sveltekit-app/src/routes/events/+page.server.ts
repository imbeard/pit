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
		people: searchParams.get('people') ? searchParams.get('people').split(',') : [],
		start: parseInt(searchParams.get('start') || '0'),
		end: parseInt(searchParams.get('end') || '20')
	};

	const hasFilters = params.typologies.length > 0 || params.institutions.length > 0 || params.people.length > 0;

	const filteredEvents = hasFilters ? await loadQuery(filteredEventsQuery, {
		start: params.start,
		end: params.end,
		typologies: params.typologies,
		institutions: params.institutions,
		people: params.people
	}) : { data: [] };
	
	const events = !hasFilters ? await loadQuery(eventsQuery, { 
		start: params.start, 
		end: params.end 
	}) : { data: [] };

	const page = await loadQuery(archiveQuery, { slug: 'events' });

	return {
		events,
		filteredEvents,
		page,
		params,
		hasMoreEvents: hasFilters ? filteredEvents.data.length === params.end - params.start : events.data.length === params.end - params.start
	};
};