<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import PortableText from '$lib/components/element/PortableText.svelte';
	import PeopleFilters from '$lib/components/PeopleFilters.svelte';
	import { filtersOpen } from '$lib/stores/filters';

	export let data;

	$: document = data?.page?.data[0];
	$: allPeople = data?.allPeople?.data;
	$: filteredPeople = data?.filteredPeople?.data;

	$: jobs = [...new Set(allPeople.map((person) => person.job))];
	$: countries = [...new Set(allPeople.map((person) => person.country))];
	$: selectedCountries = [];
	$: selectedJobs = [];

	$: sections = jobs.map((job) => ({
		title: job,
		people:
			filteredPeople.length !== 0
				? filteredPeople.filter((person) => person.job === job)
				: allPeople.filter((person) => person.job === job)
	}));

	const openFilters = () => {
		filtersOpen.set(true);
	};

	const handleUpdateFilters = (event) => {
		if (event.detail.countries) selectedCountries = event.detail.countries;
		if (event.detail.jobs) selectedJobs = event.detail.jobs;

		let queryParams = [];

		if (selectedCountries.length) queryParams.push(`countries=${selectedCountries.join(',')}`);
		if (selectedJobs.length) queryParams.push(`jobs=${selectedJobs.join(',')}`);

		const queryString = queryParams.length > 0 ? '?' + queryParams.join('&') : '';
		const newUrl = `${window.location.pathname}${queryString}`;

		goto(newUrl, { replaceState: true });

		if ($page.route.id !== '/') {
			goto(`/people/${queryString}`, { replaceState: true });
		}
	};
</script>

<div class="px-xs">
	<section class="pt-12 pb-6 w-full">
		<div class="typo-s text-left pl-10">{document.title}</div>
		<p class="px-4 typo-base text-center">
			{document?.intro}
		</p>
		{#if document?.description}
			<div class="grid-2 pt-3 px-xs">
				<div class="col-start-2 typo-base">
					<PortableText data={document?.description} />
				</div>
			</div>
		{/if}
	</section>
	<div class="flex w-full justify-end pb-xs">
		<button class="button theme-pink-red" on:click={() => openFilters()}>Filter</button>
		<PeopleFilters {jobs} {countries} on:updateFilters={handleUpdateFilters} />
	</div>
	{#each sections as section}
		{#if section.people.length > 0}
			<section class="people-section grid-5 pt-xs gap-x-0 border-t border-gray pb-6">
				<h2 class="typo-base pr-xs">{section.title}</h2>
				<div class="col-start-2 grid-4 col-end-6 gap-y-6 gap-x-0">
					{#each section.people as person}
						<a href="/people/{person.slug}" class="card col-span-1 min-h-8">
							<div class="typo-s">{person.country}</div>
							<div class="typo-lg text-center">{person.name}</div>
						</a>
					{/each}
				</div>
			</section>
		{/if}
	{/each}
</div>

<style>
	.card:nth-of-type(n + 5) {
		border-top: 1px solid var(--color-gray);
		padding-top: var(--spacing-xs);
	}
	.people-section:last-of-type {
		padding-bottom: 0;
	}
</style>
