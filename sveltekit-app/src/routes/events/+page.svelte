<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import ArchiveIntro from '$lib/components/ArchiveIntro.svelte';
	import EventCard from '$lib/components/thumbnails/EventCard.svelte';
	import FeaturedEvent from '$lib/components/thumbnails/FeaturedEvent.svelte';
	import EventsFilters from '$lib/components/filters/EventsFilters.svelte';

	import { getCurrentDate, slugToTitle } from '$lib/utils';
	import { filtersOpen } from '$lib/stores/filters';

	export let data;

	let pageColor = 'brown';

	$: allEvents = data?.events?.data;
	$: document = data?.page?.data[0];
	$: filteredEvents = data?.filteredEvents?.data;
	$: params = data?.params;


	$: typologies = Array.from(
		allEvents
			.flatMap((event) => event.typology)
			.reduce((map, typology) => map.set(typology._id, typology), new Map())
			.values()
	);

	$: institutions = Array.from(
		allEvents
			.flatMap((event) => event.institution)
			.reduce((map, institution) => map.set(institution._id, institution), new Map())
			.values()
	);

	$: people = Array.from(
		allEvents
			.flatMap((event) => event.featuredArtists)
			.reduce((map, person) => map.set(person._id, person), new Map())
			.values()
	);

	$: selectedTypologies = [];
	$: selectedInstitutions = [];
	$: selectedPeople = [];
	$: newUrl = '';
	$: queryString = '';

	const openFilters = () => {
		filtersOpen.set(true);
	};

	const removeFilter = (item) => {
		if (params.typologies.includes(item)) {
			params.typologies = params.typologies.filter((i) => i !== item);
		}
		if (params.institutions.includes(item)) {
			params.institutions = params.institutions.filter((i) => i !== item);
		}
		if (params.people.includes(item)) {
			params.people = params.people.filter((i) => i !== item);
		}

		handleUpdateFilters({
			detail: {
				typologies: params.typologies,
				institutions: params.institutions,
				people: params.people
			}
		});

		goto(newUrl, { replaceState: true });
	};

	const handleUpdateFilters = (event) => {
		if (event.detail.typologies) selectedTypologies = event.detail.typologies;
		if (event.detail.institutions) selectedInstitutions = event.detail.institutions;
		if (event.detail.people) selectedPeople = event.detail.people;

		let queryParams = [];

		if (selectedTypologies.length) queryParams.push(`typologies=${selectedTypologies.join(',')}`);
		if (selectedInstitutions.length)
			queryParams.push(`institutions=${selectedInstitutions.join(',')}`);
		if (selectedPeople.length) queryParams.push(`people=${selectedPeople.join(',')}`);

		queryString = queryParams.length > 0 ? '?' + queryParams.join('&') : '';
		newUrl = `${window.location.pathname}${queryString}`;
	};
</script>

<div class="px-xs">
	<section class="pt-12 w-full">
		<div class="typo-s text-center md:text-left md:pl-10">{document.title}</div>
		<p class="px-4 typo-base text-center">
			{document?.intro}
		</p>
		<ArchiveIntro {document} />
	</section>

	{#if document?.featuredEvents}
		<h2 class="typo-2xl mx-auto w-fit pt-6">Featured Events</h2>
		<div class="flex flex-col gap-xs md:grid-2 py-xs">
			{#each document?.featuredEvents as event}
				<div class="featured-event relative">
					<FeaturedEvent thumbnail={event} />
				</div>
			{/each}
		</div>
	{/if}

	<div class="flex w-full grid-3 items-baseline pb-xs">
		<button class="button bg-pink text-black justify-self-start">{getCurrentDate()}</button>
		<h2 class="typo-2xl mx-auto w-fit pt-12 justify-self-center translate-y-xs">All Events</h2>
		<button class="button theme-pink-black justify-self-end" on:click={() => openFilters()}
			>Filter</button
		>
		<EventsFilters
			{people}
			{typologies}
			{institutions}
			{newUrl}
			{queryString}
			on:updateFilters={handleUpdateFilters}
		/>
	</div>
	{#if params.typologies.length > 0 || params.people.length > 0 || params.institutions.length > 0}
		<div class="hidden md:flex gap-xs w-full justify-end py-xs border-y border-gray">
			{#each params.typologies as typology}
				<button class="button theme-pink-red" on:click={() => removeFilter(typology)}
					>{slugToTitle(typology)}&nbsp;<span class="align-super typo-s leading-0">x</span></button
				>
			{/each}
			{#each params.institutions as institution}
				<button class="button theme-pink-red" on:click={() => removeFilter(institution)}
					>{slugToTitle(institution)}&nbsp;<span class="align-super typo-s leading-0">x</span
					></button
				>
			{/each}
			{#each params.people as person}
				<button class="button theme-pink-red" on:click={() => removeFilter(person)}
					>{slugToTitle(person)}&nbsp;<span class="align-super typo-s leading-0">x</span></button
				>
			{/each}
		</div>
	{/if}
	<section class="py-xs">
		{#if filteredEvents.length > 0}
			<div class="flex flex-col gap-xs md:grid-4">
				{#each filteredEvents as event}
					<EventCard thumbnail={event} {pageColor} />
				{/each}
			</div>
		{:else}
			<div class="flex flex-col gap-xs md:grid-4">
				{#each allEvents as event}
					<EventCard thumbnail={event} {pageColor} />
				{/each}
			</div>
		{/if}
	</section>
</div>

<style>
	.featured-event {
		height: calc(100svh - var(--spacing-xs) - 70px);
	}
</style>
