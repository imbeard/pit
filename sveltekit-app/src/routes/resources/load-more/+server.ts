import { resourcesQuery, filteredResourcesQuery } from '$lib/sanity/queries';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals, url }) => {
	const { loadQuery } = locals;
	const searchParams = url.searchParams;

	const params = {
		typologies: searchParams.get('typologies') ? searchParams.get('typologies').split(',') : [],
		media: searchParams.get('media') ? searchParams.get('media').split(',') : [],
		start: parseInt(searchParams.get('start') || '0'),
		end: parseInt(searchParams.get('end') || '20')
	};

	const hasFilters = params.typologies.length > 0 || params.media.length > 0;

	try {
		const result = hasFilters
			? await loadQuery(filteredResourcesQuery, {
					start: params.start,
					end: params.end,
					typologies: params.typologies,
					media: params.media
				})
			: await loadQuery(resourcesQuery, {
					start: params.start,
					end: params.end
				});

		return json({
			resources: result.data,
			hasMore: result.data.length === params.end - params.start
		});
	} catch (error) {
		console.error('Error loading more resources:', error);
		return json({ error: 'Failed to load resources' }, { status: 500 });
	}
};
