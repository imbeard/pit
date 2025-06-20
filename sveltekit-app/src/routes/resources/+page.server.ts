import { resourcesQuery, filteredResourcesQuery, archiveQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const { searchParams } = event.url;

	const params = {
		typologies: searchParams.get('typologies') ? searchParams.get('typologies').split(',') : [],
		media: searchParams.get('media') ? searchParams.get('media').split(',') : [],
		start: parseInt(searchParams.get('start') || '0'),
		end: parseInt(searchParams.get('end') || '20')
	};

	const hasFilters =
		params.typologies.length > 0 || params.media.length > 0;

	const filteredResources = hasFilters
		? await loadQuery(filteredResourcesQuery, {
				start: params.start,
				end: params.end,
				typologies: params.typologies,
				media: params.media,
			})
		: { data: [] };

	const resources = !hasFilters
		? await loadQuery(resourcesQuery, {
				start: params.start,
				end: params.end
			})
		: { data: [] };

	const page = await loadQuery(archiveQuery, { slug: 'resources' });

	return {
		resources,
		filteredResources,
		page,
		params,
		hasMoreEvents: hasFilters
			? filteredResources.data.length === params.end - params.start
			: resources.data.length === params.end - params.start
	};
};
