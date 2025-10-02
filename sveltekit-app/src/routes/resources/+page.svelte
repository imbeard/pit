<script>
	// @ts-nocheck
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { onMount, onDestroy } from 'svelte';
	import { filtersOpen } from '$lib/stores/filters';

	import ArchiveIntro from '$lib/components/ArchiveIntro.svelte';
	import ResourceCard from '$lib/components/thumbnails/ResourceCard.svelte';
	import ResourcesFilters from '$lib/components/filters/ResourcesFilters.svelte';
	import SEO from '$lib/components/seo/SEO.svelte';

	export let data;

	let resourcesContainer;
	let isLoading = false;
	let hasMoreResources = data.hasMoreResources;
	let currentStart = 20;
	const loadSize = 20;

	$: resources = data?.resources?.data || [];
	$: document = data?.page?.data[0];
	$: filteredResources = data?.filteredResources?.data || [];
	$: params = data?.params;

	// Combine initial data with loaded data
	$: displayResources = filteredResources.length > 0 ? filteredResources : resources;
	$: hasFilters = params.typologies.length > 0 || params.media.length > 0;

	// Get filter options from server data instead of deriving from paginated resources
	$: ({ typologies, media } = data.filterOptions || { typologies: [], media: [] });

	$: selectedTypologies = [];
	$: selectedMedia = [];
	$: newUrl = '';
	$: queryString = '';

	const loadMoreResources = async () => {
		if (isLoading || !hasMoreResources) return;

		isLoading = true;

		try {
			const queryParams = new URLSearchParams({
				start: currentStart.toString(),
				end: (currentStart + loadSize).toString(),
				...(params.typologies.length && { typologies: params.typologies.join(',') }),
				...(params.media.length && { media: params.media.join(',') })
			});

			const response = await fetch(`/resources/load-more?${queryParams}`);
			const result = await response.json();

			if (result.resources && result.resources.length > 0) {
				if (hasFilters) {
					filteredResources = [...filteredResources, ...result.resources];
				} else {
					resources = [...resources, ...result.resources];
				}
				currentStart += loadSize;
				hasMoreResources = result.hasMore;
			} else {
				hasMoreResources = false;
			}
		} catch (error) {
			console.error('Error loading more resources:', error);
			hasMoreResources = false;
		} finally {
			isLoading = false;
		}
	};

	const handleScroll = () => {
		if (!resourcesContainer) return;

		// Get the position of the resources container relative to the viewport
		const containerRect = resourcesContainer.getBoundingClientRect();
		const containerBottom = containerRect.bottom;

		// Get viewport height
		const viewportHeight = window.innerHeight;

		// Check if we're near the bottom of the container
		const threshold = 200; // Load more when container bottom is 200px from viewport bottom

		if (containerBottom <= viewportHeight + threshold) {
			loadMoreResources();
		}
	};

	const openFilters = () => {
		filtersOpen.set(true);
	};

	const removeFilter = (item) => {
		if (params.typologies.includes(item)) {
			params.typologies = params.typologies.filter((i) => i !== item);
		}
		if (params.media.includes(item)) {
			params.media = params.media.filter((i) => i !== item);
		}

		handleUpdateFilters({
			detail: {
				typologies: params.typologies,
				media: params.media
			}
		});

		// Reset pagination when filters change
		resetPagination();
		goto(newUrl, { replaceState: true });
	};

	const handleUpdateFilters = (event) => {
		if (event.detail.typologies) selectedTypologies = event.detail.typologies;
		if (event.detail.media) selectedMedia = event.detail.media;

		let queryParams = [];

		if (selectedTypologies.length) queryParams.push(`typologies=${selectedTypologies.join(',')}`);
		if (selectedMedia.length) queryParams.push(`media=${selectedMedia.join(',')}`);

		queryString = queryParams.length > 0 ? '?' + queryParams.join('&') : '';
		newUrl = `${window.location.pathname}${queryString}`;
	};

	const resetPagination = () => {
		currentStart = 20;
		hasMoreResources = true;
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

<SEO data={document?.seo} pageTitle={document.title} />

<div class="px-xs">
	<section class="pt-12 w-full">
		<div class="typo-base text-center md:pl-10 md:text-left">{document.title}</div>
		<p class="px-4 typo-base text-center">
			{document?.intro}
		</p>
		<ArchiveIntro {document} />
	</section>

	<div class="flex w-full justify-end pb-xs border-b border-gray">
		<button class="button theme-pink-blue" on:click={() => openFilters()}>
			<span>Filters</span>
			{#if params.typologies.length > 0 || params.media.length > 0}
				<span class="align-super typo-s leading-0"
					>{params.typologies.length + params.media.length}</span
				>
			{/if}
		</button>
		<ResourcesFilters
			{typologies}
			{media}
			{newUrl}
			{queryString}
			on:updateFilters={handleUpdateFilters}
		/>
	</div>

	{#if params.typologies.length > 0 || params.media.length > 0}
		<div class="flex flex-wrap gap-xs w-full justify-end py-xs border-b border-gray">
			{#each params.typologies as typology}
				<button class="button theme-pink-blue" on:click={() => removeFilter(typology)}
					>{typology}&nbsp;<span class="align-super typo-s leading-0">x</span></button
				>
			{/each}
			{#each params.media as mediaItem}
				<button class="button theme-pink-blue" on:click={() => removeFilter(mediaItem)}
					>{mediaItem}&nbsp;<span class="align-super typo-s leading-0">x</span></button
				>
			{/each}
		</div>
	{/if}

	{#if resources}
		<section bind:this={resourcesContainer}>
			<div class="gap-y-6 md:grid-2 md:gap-y-6">
				{#each displayResources as resource}
					<div
						class="card border-b border-gray md:nth-of-type-[n+3]:border-y"
						class:filters-open={params.typologies.length > 0 || params.media.length > 0}
					>
						<ResourceCard thumbnail={resource} />
					</div>
				{/each}
			</div>

			{#if isLoading}
				<div class="flex justify-center py-4">
					<div class="loading-spinner">Loading more resources...</div>
				</div>
			{/if}
		</section>
	{/if}
</div>
