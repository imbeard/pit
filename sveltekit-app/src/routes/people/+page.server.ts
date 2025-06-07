import { allPeopleQuery, filteredPeopleQuery, categoryQuery } from '$lib/sanity/queries';
import type { PageServerLoad } from './$types';
export const load: PageServerLoad = async (event) => {
	const { loadQuery } = event.locals;
	const { searchParams } = event.url;

	const params = {
		jobs: searchParams.get('jobs') ? searchParams.get('jobs').split(',') : [],
		countries: searchParams.get('countries') ? searchParams.get('countries').split(',') : []
	};

	const allPeople = await loadQuery(allPeopleQuery, {
		end: 300
	});

	const filteredPeople = await loadQuery(filteredPeopleQuery, {
		end: 300,
		jobs: params.jobs,
		countries: params.countries
	});

	const page = await loadQuery(categoryQuery, { slug: 'people' });

	return {
		allPeople,
		filteredPeople,
		page,
		params
	};
};
