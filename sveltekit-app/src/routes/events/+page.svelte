<script>
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	import { onMount, onDestroy } from 'svelte';
	import ArchiveIntro from '$lib/components/ArchiveIntro.svelte';
	import EventCard from '$lib/components/thumbnails/EventCard.svelte';
	import FeaturedEventCard from '$lib/components/thumbnails/FeaturedEventCard.svelte';
	import EventsFilters from '$lib/components/filters/EventsFilters.svelte';

	import { getCurrentDate, slugToTitle } from '$lib/utils';
	import { filtersOpen } from '$lib/stores/filters';

	export let data;

	let pageColor = 'brown';
	let eventsContainer;
	let isLoading = false;
	let hasMoreEvents = data.hasMoreEvents;
	let currentStart = 20;
	const loadSize = 20;

	$: allEvents = data?.events?.data || [];
	$: document = data?.page?.data[0];
	$: filteredEvents = data?.filteredEvents?.data || [];
	$: params = data?.params;

	$: displayEvents = filteredEvents.length > 0 ? filteredEvents : allEvents;
	$: hasFilters =
		params.typologies.length > 0 || params.people.length > 0 || params.institutions.length > 0;

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

	const loadMoreEvents = async () => {
		if (isLoading || !hasMoreEvents) return;

		isLoading = true;

		try {
			const queryParams = new URLSearchParams({
				start: currentStart.toString(),
				end: (currentStart + loadSize).toString(),
				...(params.typologies.length && { typologies: params.typologies.join(',') }),
				...(params.institutions.length && { institutions: params.institutions.join(',') }),
				...(params.people.length && { people: params.people.join(',') })
			});

			const response = await fetch(`/events/load-more?${queryParams}`);
			const result = await response.json();

			if (result.events && result.events.length > 0) {
				if (hasFilters) {
					filteredEvents = [...filteredEvents, ...result.events];
				} else {
					allEvents = [...allEvents, ...result.events];
				}
				currentStart += loadSize;
				hasMoreEvents = result.hasMore;
			} else {
				hasMoreEvents = false;
			}
		} catch (error) {
			console.error('Error loading more events:', error);
			hasMoreEvents = false;
		} finally {
			isLoading = false;
		}
	};

	const handleScroll = () => {
		if (!eventsContainer) return;

		// Get the position of the events container relative to the viewport
		const containerRect = eventsContainer.getBoundingClientRect();
		const containerBottom = containerRect.bottom;

		// Get viewport height
		const viewportHeight = window.innerHeight;

		// Check if we're near the bottom of the container
		const threshold = 200; // Load more when container bottom is 200px from viewport bottom

		if (containerBottom <= viewportHeight + threshold) {
			loadMoreEvents();
		}
	};

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

		// Reset pagination when filters change
		resetPagination();
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

	const resetPagination = () => {
		currentStart = 20;
		hasMoreEvents = true;
	};

	$: if (browser) {
		onMount(() => {
			window.addEventListener('scroll', handleScroll);
		});

		onDestroy(() => {
			window.removeEventListener('scroll', handleScroll);
		});
	}
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
					<FeaturedEventCard thumbnail={event} />
				</div>
			{/each}
		</div>
	{/if}

	<div class="flex w-full grid-3 items-baseline pb-xs">
		<button class="button bg-gray text-brown justify-self-start">{getCurrentDate()}</button>
		<h2 class="typo-2xl mx-auto w-fit pt-12 justify-self-center translate-y-xs">All Events</h2>
		<button class="button theme-gray-brown" on:click={() => openFilters()}>
			<span>Filters</span>
			{#if params.typologies.length > 0 || params.people.length > 0 || params.institutions.length > 0}
				<span class="align-super typo-s leading-0"
					>{params.typologies.length + params.people.length + params.institutions.length}</span
				>
			{/if}
		</button>
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
		<div class="flex flex-wrap gap-xs w-full justify-end py-xs border-y border-gray">
			{#each params.typologies as typology}
				<button class="button theme-gray-brown" on:click={() => removeFilter(typology)}
					>{slugToTitle(typology)}&nbsp;<span class="align-super typo-s leading-0">x</span></button
				>
			{/each}
			{#each params.institutions as institution}
				<button class="button theme-gray-brown" on:click={() => removeFilter(institution)}
					>{slugToTitle(institution)}&nbsp;<span class="align-super typo-s leading-0">x</span
					></button
				>
			{/each}
			{#each params.people as person}
				<button class="button theme-gray-brown" on:click={() => removeFilter(person)}
					>{slugToTitle(person)}&nbsp;<span class="align-super typo-s leading-0">x</span></button
				>
			{/each}
		</div>
	{/if}

	<section class="py-xs" bind:this={eventsContainer}>
		<div class="flex flex-col gap-xs md:grid-4">
			{#each displayEvents as event}
				<EventCard thumbnail={event} {pageColor} />
			{/each}
		</div>

		{#if isLoading}
			<div class="flex justify-center py-2">
				<div class="typo-s text-gray">Loading more events...</div>
			</div>
		{/if}
	</section>
</div>

<style>
	.featured-event {
		height: calc(100svh - var(--spacing-xs) - 70px);
	}
</style>
