<script>
	import { goto } from '$app/navigation';
	import { filtersOpen } from '$lib/stores/filters';

	import ArchiveIntro from '$lib/components/ArchiveIntro.svelte';
	import ResourceCard from '$lib/components/thumbnails/ResourceCard.svelte';
	import ResourcesFilters from '$lib/components/filters/ResourcesFilters.svelte';

	export let data;
	$: resources = data?.resources?.data;
	$: document = data?.page?.data[0];

	$: filteredResources = data?.filteredResources?.data || [];
	$: params = data?.params;

	$: typologies = Array.from(new Set(resources.flatMap((resource) => resource.typology)));

	$: media = Array.from(
		new Set(
			resources.flatMap((resource) =>
				resource.downloads.map((download) => download.url.asset.extension)
			)
		)
	);

	$: selectedTypologies = [];
	$: selectedMedia = [];
	$: newUrl = '';
	$: queryString = '';

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
</script>

<div class="px-xs">
	<section class="pt-12 w-full">
		<div class="typo-s text-center md:pl-10 md:text-left">{document.title}</div>
		<p class="px-4 typo-base text-center">
			{document?.intro}
		</p>
		<ArchiveIntro {document} />
	</section>

	<div class="flex w-full justify-end pb-xs">
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
		<div class="flex flex-wrap gap-xs w-full justify-end py-xs border-y border-gray">
			{#each params.typologies as typology}
				<button class="button theme-pink-blue" on:click={() => removeFilter(typology)}
					>{typology}&nbsp;<span class="align-super typo-s leading-0">x</span></button
				>
			{/each}
			{#each params.media as media}
				<button class="button theme-pink-blue" on:click={() => removeFilter(media)}
					>{media}&nbsp;<span class="align-super typo-s leading-0">x</span></button
				>
			{/each}
		</div>
	{/if}
	{#if resources}
		<section>
			<div class="gap-y-6 md:grid-2 md:gap-y-6">
				{#if filteredResources.length > 0}
					{#each filteredResources as resource}
						<div
							class="card border-y border-gray"
							class:filters-open={params.typologies.length > 0 || params.media.length > 0}
						>
							<ResourceCard thumbnail={resource} />
						</div>
					{/each}
				{:else}
					{#each resources as resource}
						<div class="card border-y border-gray">
							<ResourceCard thumbnail={resource} />
						</div>
					{/each}
				{/if}
			</div>
		</section>
	{/if}
</div>

<style>
	.card.filters-open:nth-of-type(1) {
		border-top: none;
	}

	@media (min-width: 768px) {
		.card.filters-open:nth-of-type(1),
		.card.filters-open:nth-of-type(2) {
			border-top: none;
		}
	}
</style>
