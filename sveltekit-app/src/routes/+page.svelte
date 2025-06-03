<script>
	// @ts-nocheck
	import { headerHeight } from '$lib/stores/header';
	import Image from '$lib/components/element/Image.svelte';
	import PortableText from '$lib/components/element/PortableText.svelte';
	import Link from '$lib/components/element/Link.svelte';
	import PerformanceSlider from '$lib/components/PerformanceSlider.svelte';
	import EventCard from '$lib/components/thumbnails/EventCard.svelte';
	import FeaturedEvent from '$lib/components/thumbnails/FeaturedEvent.svelte';
	import Marquee from '$lib/components/element/Marquee.svelte';

	export let data;

	$: document = data?.page?.data;
	$: events = data?.events?.data;
	$: partners = data?.partners?.data;
	$: console.log(data);
</script>

<main>
	<div class="hero-home w-full flex items-center justify-center overflow-hidden">
		<Image image={document?.image} alt="hero" fit="contain" />
	</div>
	<div class="page p-xs flex flex-col gap-12">
		<div class="typo-xl text-center pt-12 w-full">
			<div class="px-4">
				<PortableText data={document?.intro} />
			</div>
			<div class="pt-1 pt flex justify-between typo-base items-center">
				<div class="max-w-md text-center">{document?.subtitle}</div>
				<div class="theme-pink-red button">
					<Link to={document?.cta.link} />
				</div>
			</div>
		</div>
		<PerformanceSlider slides={document?.performanceSlider} />
		{#if events}
			<div class="events grid-2">
				<div class="featured-event sticky">
					<FeaturedEvent thumbnail={document?.featuredEvent} />
				</div>
				<div class="grid-2 gap-y-6">
					{#each events as event}
						{#if event !== document?.featuredEvent}
							<EventCard thumbnail={event} />
						{/if}
					{/each}
				</div>
				<div class="col-start-2 pt-5 pb-1">
					<a class="theme-black-pink button" href="/events">View events &nearr;</a>
				</div>
			</div>
		{/if}
		<div class="flex flex-col gap-1">
			<h3 class="typo-lg">{document?.partners.heading}</h3>
			<PortableText data={document?.partners.content} />
			<Marquee data={partners} />
		</div>
	</div>
</main>

<style>
	.hero-home {
		height: 100svh;
		background: linear-gradient(rgba(185, 185, 185, 0) 15%, rgba(185, 185, 185, 1) 70%);
	}
	.featured-event {
		width: 100%;
		top: calc(70px);
		height: calc(100svh - var(--spacing-xs) - 70px);
		/* aspect-ratio: 0.82; */
	}
</style>
