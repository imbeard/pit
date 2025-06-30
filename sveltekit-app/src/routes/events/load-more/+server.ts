import { eventsQuery, filteredEventsQuery } from '$lib/sanity/queries';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, url }) => {
	const { loadQuery } = locals;
	const searchParams = url.searchParams;

	const params = {
		typologies: searchParams.get('typologies') ? searchParams.get('typologies').split(',') : [],
		institutions: searchParams.get('institutions')
			? searchParams.get('institutions').split(',')
			: [],
		people: searchParams.get('people') ? searchParams.get('people').split(',') : [],
		date: searchParams.get('date') || null,
		start: parseInt(searchParams.get('start') || '0'),
		end: parseInt(searchParams.get('end') || '2')
	};

	const hasFilters =
		params.typologies.length > 0 ||
		params.institutions.length > 0 ||
		params.people.length > 0 ||
		params.date !== null;

	try {
		const result = hasFilters
			? await loadQuery(filteredEventsQuery, {
					start: params.start,
					end: params.end,
					typologies: params.typologies,
					institutions: params.institutions,
					people: params.people,
					date: params.date
				})
			: await loadQuery(eventsQuery, {
					start: params.start,
					end: params.end,
					date: params.date
				});

		return json({
			events: result.data,
			hasMore: result.data.length === params.end - params.start
		});
	} catch (error) {
		console.error('Error loading more events:', error);
		return json({ error: 'Failed to load events' }, { status: 500 });
	}
};
