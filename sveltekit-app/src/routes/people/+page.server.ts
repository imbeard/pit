import { allPeopleQuery, filteredPeopleQuery, archiveQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const { searchParams } = event.url;

	const params = {
		jobs: searchParams.get('jobs') ? searchParams.get('jobs').split(',') : [],
		countries: searchParams.get('countries') ? searchParams.get('countries').split(',') : []
	};

	const allPeople = await loadQuery(allPeopleQuery, {
		end: 5
	});

	const filteredPeople = await loadQuery(filteredPeopleQuery, {
		end: 5,
		jobs: params.jobs,
		countries: params.countries
	});

	const page = await loadQuery(archiveQuery, { slug: 'people' });

	return {
		allPeople,
		filteredPeople,
		page,
		params
	};
};
