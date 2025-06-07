<script>
	import PortableText from '$lib/components/element/PortableText.svelte';
	import EventCard from '$lib/components/thumbnails/EventCard.svelte';
	import FeaturedEvent from '$lib/components/thumbnails/FeaturedEvent.svelte';

	import { getCurrentDate } from '$lib/utils';

	export let data;
	$: events = data?.events?.data;
	$: document = data?.page?.data[0];
</script>

<div>
	<section class="pt-12 w-full">
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

	{#if document?.featuredEvents}
		<h2 class="typo-2xl mx-auto w-fit pt-6">Featured Events</h2>
		<div class="grid-2 p-xs">
			{#each document?.featuredEvents as event}
				<div class="featured-event relative">
					<FeaturedEvent thumbnail={event} />
				</div>
			{/each}
		</div>
	{/if}

	{#if events}
		<div class="flex w-full grid-3 items-baseline px-xs">
			<button class="button bg-pink text-black justify-self-start">{getCurrentDate()}</button>
			<h2 class="typo-2xl mx-auto w-fit pt-12 justify-self-center translate-y-xs">All Events</h2>
			<button class="button theme-pink-red justify-self-end">Filter</button>
		</div>
		<section class="p-xs">
			<div class="grid-4">
				{#each events as event}
					<EventCard thumbnail={event} />
				{/each}
			</div>
		</section>
	{/if}
</div>

<style>
	.featured-event {
		height: calc(100svh - var(--spacing-xs) - 70px);
	}
</style>
