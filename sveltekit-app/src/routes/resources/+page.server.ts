import {
	resourcesQuery,
	filteredResourcesQuery,
	archiveQuery,
	resourceTypologiesQuery,
	resourceMediaQuery
} from '$lib/sanity/queries';
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

	const hasFilters = params.typologies.length > 0 || params.media.length > 0;

	const filteredResources = hasFilters
		? await loadQuery(filteredResourcesQuery, {
				start: params.start,
				end: params.end,
				typologies: params.typologies,
				media: params.media
			})
		: { data: [] };

	const resources = await loadQuery(resourcesQuery, {
		start: params.start,
		end: params.end
	});

	const page = await loadQuery(archiveQuery, { slug: 'resources' });

	// Get all available filter options efficiently
	const [typologiesData, mediaData] = await Promise.all([
		loadQuery(resourceTypologiesQuery, {}),
		loadQuery(resourceMediaQuery, {})
	]);

	// Extract unique typologies
	const availableTypologies = Array.from(
		new Set((typologiesData.data as any[]).map((item: any) => item.typology).filter(Boolean))
	).sort();

	// Extract unique media extensions
	const availableMedia = Array.from(
		new Set(
			(mediaData.data as any[])
				.flatMap((item: any) => item.downloads)
				.map((download: any) => download.url.asset.extension)
				.filter(Boolean)
		)
	).sort();

	return {
		resources,
		filteredResources,
		page,
		params,
		hasMoreResources: hasFilters
			? (filteredResources.data as any[]).length === params.end - params.start
			: (resources.data as any[]).length === params.end - params.start,
		filterOptions: {
			typologies: availableTypologies,
			media: availableMedia
		}
	};
};
