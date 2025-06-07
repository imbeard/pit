import { performancesQuery, categoryQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const performances = await loadQuery(performancesQuery, { end: 100 });
	const page = await loadQuery(categoryQuery, { slug: 'performances' });

	return {
		performances,
		page
	};
};
