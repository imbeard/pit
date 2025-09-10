import {
	eventsQuery,
	filteredEventsQuery,
	archiveQuery,
	eventTypologiesQuery,
	eventInstitutionsQuery,
	eventPeopleQuery
} from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const { searchParams } = event.url;

	const today = new Date().toISOString().slice(0, 10);

	const params = {
		typologies: searchParams.get('typologies') ? searchParams.get('typologies').split(',') : [],
		institutions: searchParams.get('institutions')
			? searchParams.get('institutions').split(',')
			: [],
		people: searchParams.get('people') ? searchParams.get('people').split(',') : [],
		date: searchParams.get('date') || null,
		start: parseInt(searchParams.get('start') || '0'),
		end: parseInt(searchParams.get('end') || '20')
	};

	const dateForQuery = params.date || today;

	const hasFilters =
		params.typologies.length > 0 ||
		params.institutions.length > 0 ||
		params.people.length > 0 ||
		params.date !== null;

	const filteredEvents = hasFilters
		? await loadQuery(filteredEventsQuery, {
				start: params.start,
				end: params.end,
				typologies: params.typologies,
				institutions: params.institutions,
				people: params.people,
				date: dateForQuery
			})
		: { data: [] };

	const events = await loadQuery(eventsQuery, {
		start: params.start,
		end: params.end,
		date: dateForQuery
	});

	const page = await loadQuery(archiveQuery, { slug: 'events' });

	// Get all available filter options efficiently
	const [typologiesData, institutionsData, peopleData] = await Promise.all([
		loadQuery(eventTypologiesQuery, {}),
		loadQuery(eventInstitutionsQuery, {}),
		loadQuery(eventPeopleQuery, {})
	]);

	// Extract unique filter options
	const availableTypologies = Array.from(
		new Map(
			(typologiesData.data as any[]).map((item: any) => [item.typology._id, item.typology])
		).values()
	);

	const availableInstitutions = Array.from(
		new Map(
			(institutionsData.data as any[]).map((item: any) => [item.institution._id, item.institution])
		).values()
	);

	const availablePeople = Array.from(
		new Set(
			(peopleData.data as any[])
				.flatMap((item: any) => item.featuredArtists)
				.map((person: any) => JSON.stringify(person))
		)
	).map((person: string) => JSON.parse(person));

	return {
		events,
		filteredEvents,
		page,
		params,
		hasMoreEvents: hasFilters
			? (filteredEvents.data as any[]).length === params.end - params.start
			: (events.data as any[]).length === params.end - params.start,
		filterOptions: {
			typologies: availableTypologies,
			institutions: availableInstitutions,
			people: availablePeople
		}
	};
};
