import { resourcesQuery, filteredResourcesQuery, archiveQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const { searchParams } = event.url;

	const params = {
		typologies: searchParams.get('typologies') ? searchParams.get('typologies').split(',') : [],
		media: searchParams.get('media') ? searchParams.get('media').split(',') : []
	};

	const filteredResources = await loadQuery(filteredResourcesQuery, {
		end: 5,
		typologies: params.typologies,
		media: params.media,
	});

	const resources = await loadQuery(resourcesQuery, { end: 5 });
	const page = await loadQuery(archiveQuery, { slug: 'resources' });

	return {
		resources,
        filteredResources,
		page,
        params
	};
};
