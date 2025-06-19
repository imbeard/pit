import { json } from '@sveltejs/kit';
import { client } from '$lib/sanity/client';
import { searchQuery } from '$lib/sanity/queries';

export const GET = async ({ url }) => {
	const query = url.searchParams.get('q');

	if (!query || query.trim().length < 2) {
		return json({
			performances: [],
			people: [],
			resources: [],
			partners: [],
			events: []
		});
	}

	try {
		const results = await client.fetch(searchQuery, { query: query.toLowerCase() });

		return json({
			performances: results.performances || [],
			people: results.people || [],
			resources: results.resources || [],
			partners: results.partners || [],
			events: results.events || []
		});
	} catch (err) {
		console.error('Sanity query error:', err);
		return json(
			{ error: 'Error fetching search results' },
			{ status: 500 }
		);
	}
};