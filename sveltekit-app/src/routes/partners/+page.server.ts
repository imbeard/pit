import { partnersQuery, categoryQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const partners = await loadQuery(partnersQuery, {end: 300});
	const page = await loadQuery(categoryQuery, { slug: 'partners' });

	return {
		partners,
		page,
	};
};
