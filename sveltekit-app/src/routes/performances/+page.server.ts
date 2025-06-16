import { performancesQuery, archiveQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const performances = await loadQuery(performancesQuery, { end: 5 });
	const page = await loadQuery(archiveQuery, { slug: 'performances' });

	return {
		performances,
		page
	};
};
