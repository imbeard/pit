<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import ArchiveIntro from '$lib/components/ArchiveIntro.svelte';
	import PeopleFilters from '$lib/components/filters/PeopleFilters.svelte';
	import { filtersOpen } from '$lib/stores/filters';

	export let data;

	$: document = data?.page?.data[0];
	$: allPeople = data?.allPeople?.data;
	$: filteredPeople = data?.filteredPeople?.data;
	$: params = data?.params;

	$: jobs = [...new Set(allPeople.map((person) => person.job))];
	$: countries = [...new Set(allPeople.map((person) => person.country))];
	$: selectedCountries = [];
	$: selectedJobs = [];

	$: newUrl = '';
	$: queryString = '';

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

	const removeFilter = (item) => {
		if (params.countries.includes(item)) {
			params.countries = params.countries.filter((i) => i !== item);
		}

		if (params.jobs.includes(item)) {
			params.jobs = params.jobs.filter((i) => i !== item);
		}

		handleUpdateFilters({
			detail: {
				countries: params.countries,
				jobs: params.jobs
			}
		});

		goto(newUrl, { replaceState: true });
	};

	const handleUpdateFilters = (event) => {
		if (event.detail.countries) selectedCountries = event.detail.countries;
		if (event.detail.jobs) selectedJobs = event.detail.jobs;

		let queryParams = [];

		if (selectedCountries.length) queryParams.push(`countries=${selectedCountries.join(',')}`);
		if (selectedJobs.length) queryParams.push(`jobs=${selectedJobs.join(',')}`);

		queryString = queryParams.length > 0 ? '?' + queryParams.join('&') : '';
		newUrl = `${window.location.pathname}${queryString}`;
	};
</script>

<div class="px-xs">
	<section class="pt-12 pb-6 w-full">
		<div class="typo-s text-center md:text-left md:pl-10">{document.title}</div>
		<p class="px-4 typo-base text-center">
			{document?.intro}
		</p>
		<ArchiveIntro {document} />
	</section>
	<div class="flex w-full justify-end pb-xs">
		<button class="button theme-pink-red" on:click={() => openFilters()}>
			<span>Filters</span>
			{#if params.jobs.length > 0 || params.countries.length > 0}
				<span class="align-super typo-s leading-0"
					>{params.jobs.length + params.countries.length}</span
				>
			{/if}
		</button>
		<PeopleFilters
			{jobs}
			{countries}
			{newUrl}
			{queryString}
			on:updateFilters={handleUpdateFilters}
		/>
	</div>
	{#if params.jobs.length > 0 || params.countries.length > 0}
		<div class="flex flex-wrap gap-xs w-full justify-end py-xs border-t border-gray">
			{#each params.countries as country}
				<button class="button theme-pink-red" on:click={() => removeFilter(country)}
					>{country}&nbsp;<span class="align-super typo-s leading-0">x</span></button
				>
			{/each}
			{#each params.jobs as job}
				<button class="button theme-pink-red" on:click={() => removeFilter(job)}
					>{job}&nbsp;<span class="align-super typo-s leading-0">x</span></button
				>
			{/each}
		</div>
	{/if}
	{#each sections as section}
		{#if section.people.length > 0}
			<section
				class="people-section pt-xs gap-x-0 pb-12 flex flex-col gap-xs md:gap-y-0 md:grid-5 md:pb-6 md:border-t md:border-gray"
			>
				<h2 class="typo-base pr-xs">{section.title}</h2>
				<div
					class="border-t border-gray col-start-2 col-end-6 grid-2 pt-xs gap-y-6 md:pt-0 md:grid-4 md:gap-x-0 md:border-none"
				>
					{#each section.people as person}
						<a
							href="/people/{person.slug}"
							class="card col-span-1 min-h-8 border-b border-gray transition-all duration-200 hover:text-red md:border-none"
						>
							<div class="typo-s">{person.country}</div>
							<div class="typo-lg text-center pt-xs px-2">{person.name}</div>
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
