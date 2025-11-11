<script>
	// @ts-nocheck
	import PageBuilder from '$lib/components/PageBuilder.svelte';
	import Image from '$lib/components/element/Image.svelte';
	import FeaturedArtists from '$lib/components/FeaturedArtists.svelte';
	import PartneringInstitutions from '$lib/components/PartneringInstitutions.svelte';
	import EventsSlider from '$lib/components/sliders/EventsSlider.svelte';
	import ResourcesSlider from '$lib/components/sliders/ResourcesSlider.svelte';
	import ResourceCard from '$lib/components/thumbnails/ResourceCard.svelte';
	import EventCard from '$lib/components/thumbnails/EventCard.svelte';
	import SEO from '$lib/components/seo/SEO.svelte';

	export let data;
	$: performance = data?.performance?.data?.performance[0];
	$: pageBuilder = performance?.pageBuilder;
	$: relatedEvents = data?.performance?.data?.relatedEvents;
	$: relatedResources = data?.performance?.data?.relatedResources;
</script>

<SEO data={performance?.seo} pageTitle={performance?.title} />

<div class="pt-8 p-xs">
	<section class="hero">
		<div class="pt-1 flex flex-col gap-1 pb-xs">
			<div class="w-full grid-2 md:grid-3 typo-s lg:typo-xs">
				<span>Artist</span>
				<span>Institutions</span>
				<span class="hidden md:block">Typology</span>
			</div>
			<h3 class="typo-2xl text-center">{performance.title}</h3>
			<div class="w-full grid-2 md:grid-3 typo-s lg:typo-base">
				{#if performance.artists && performance.artists.length > 0}
					{#each performance.artists as artist}
						<div>
							{artist.name}
						</div>
					{/each}
				{/if}
				{#if performance.institutions && performance.institutions.length > 0}
					<div>
						{#each performance.institutions as institution, index}
							<div>
								<span>{institution.institution.title}</span>
								{#if index < performance?.institutions?.length - 1}
									<span>,</span>
								{/if}
							</div>
						{/each}
					</div>
				{/if}
				{#if performance.typology.title}
					<span class="hidden md:block">{performance.typology.title}</span>
				{/if}
			</div>
		</div>

		{#if performance.image}
			<div class="aspect-4/5 md:aspect-16/9">
				<Image image={performance.image} fit="cover" showCaption={true} />
			</div>
		{/if}

		{#if performance.typology.title}
			<div class="md:hidden typo-s pt-xs grid-2">
				<div class="col-start-2 flex flex-col gap-xs">
					<div>Typology</div>
					<div>{performance.typology.title}</div>
				</div>
			</div>
		{/if}
	</section>

	{#if pageBuilder?.sections && pageBuilder.sections.length > 0}
		<div class="pt-s">
			<PageBuilder sections={pageBuilder.sections} />
		</div>
	{/if}

	{#if performance.artists && performance.artists.length > 0}
		<div class="pt-16">
			<FeaturedArtists artists={performance.artists} theme="theme-pink-brown" />
		</div>
	{/if}

	{#if performance.institutions && performance.institutions.length > 0}
		<section class="pt-16">
			<PartneringInstitutions partners={performance.institutions} />
		</section>
	{/if}

	{#if relatedEvents && relatedEvents.length > 0}
		<div class="pt-12 flex flex-col gap-xs">
			<div class="w-full pb-xs border-b border-gray">
				<h3 class="typo-lg uppercase">Featured Events</h3>
			</div>
			<div class="hidden md:block">
				<EventsSlider slides={relatedEvents} />
			</div>
			<div class="flex flex-col gap-xs md:hidden">
				{#each relatedEvents as event}
					<EventCard thumbnail={event} />
				{/each}
			</div>
		</div>
	{/if}

	{#if relatedResources && relatedResources.length > 0}
		<div class="pt-12">
			<div class="w-full pb-xs border-b border-gray md:border-none">
				<h3 class="typo-lg uppercase">Related Resources</h3>
			</div>
			<div class="hidden md:block">
				<ResourcesSlider slides={relatedResources} />
			</div>
			<div class="flex flex-col gap-xs md:hidden">
				{#each relatedResources as resource}
					<ResourceCard thumbnail={resource} />
				{/each}
			</div>
		</div>
	{/if}
</div>
