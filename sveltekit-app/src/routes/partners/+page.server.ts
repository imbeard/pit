import { partnersQuery, archiveQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const partners = await loadQuery(partnersQuery, {end: 300});
	const page = await loadQuery(archiveQuery, { slug: 'partners' });

	return {
		partners,
		page,
	};
};
