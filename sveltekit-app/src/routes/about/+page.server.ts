import { aboutQuery, partnersQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const page = await loadQuery(aboutQuery);
	const partners = await loadQuery(partnersQuery);

	return { 
		page,
		partners
	};
};
