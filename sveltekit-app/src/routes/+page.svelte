<script>
	// @ts-nocheck
	import { headerHeight } from '$lib/stores/header';
	import Image from '$lib/components/element/Image.svelte';
	import PortableText from '$lib/components/element/PortableText.svelte';
	import Link from '$lib/components/element/Link.svelte';
	import PerformanceSlider from '$lib/components/PerformanceSlider.svelte';
	import ResourcesSlider from '$lib/components/ResourcesSlider.svelte';

	import EventCard from '$lib/components/thumbnails/EventCard.svelte';
	import ResourceCard from '$lib/components/thumbnails/ResourceCard.svelte';
	import FeaturedEventCard from '$lib/components/thumbnails/FeaturedEventCard.svelte';
	import FeaturedArtistCard from '$lib/components/thumbnails/FeaturedArtistCard.svelte';
	import FeaturedPartnerCard from '$lib/components/thumbnails/FeaturedPartnerCard.svelte';

	import Marquee from '$lib/components/element/Marquee.svelte';

	export let data;

	$: document = data?.page?.data?.homepage;
	$: events = data?.page?.data?.events;
	$: partners = data?.page?.data?.partners;
	$: resources = data?.page?.data?.resources;

	$: activeFeaturedArtist = document?.featuredArtists[0];
	$: activeFeaturedPartner = document?.featuredPartners[0];
</script>

<main>
	<section class="hero-home h-screen w-full flex items-center justify-center overflow-hidden">
		<Image image={document?.image} alt="hero" fit="contain" />
	</section>

	<div class="page p-xs flex flex-col gap-12">
		<section class="typo-xl text-center pt-12 w-full">
			<div class="md:px-4">
				<PortableText data={document?.intro} />
			</div>
			<div class="pt-1 pt flex justify-between typo-base items-center">
				<div class="max-w-[18rem] md:max-w-md text-center">{document?.subtitle}</div>
				<div class="theme-pink-red button">
					<Link to={document?.cta?.link} />
				</div>
			</div>
		</section>

		<PerformanceSlider slides={document?.performanceSlider} />

		{#if events}
			<section class="flex flex-col md:grid-2">
				<div class="featured-event relative mb-xs aspect-[4/5] md:mb-0 md:aspect-auto md:sticky">
					<FeaturedEventCard thumbnail={document?.featuredEvent} />
				</div>
				<div class="flex flex-col gap-y-xs md:grid-2 md:gap-y-6">
					{#each events as event}
						{#if event !== document?.featuredEvent}
							<EventCard thumbnail={event} />
						{/if}
					{/each}
				</div>
				<a class="mt-3 col-start-2 theme-black-pink button w-fit md:mt-5" href="/events"
					>View events <span class="align-super typo-s leading-0">&nearr;</span></a
				>
			</section>
		{/if}

		<section class="flex flex-col gap-1">
			<h3 class="typo-lg">{document?.partners.heading}</h3>
			<PortableText data={document?.partners.content} />
			<div class="relative">
				<Marquee data={partners} />
			</div>
		</section>

		<section class="featured-lists flex flex-col gap-y-12 md:grid-2">
			<div class="featured-thumb-container">
				<div class="featured-thumb">
					<FeaturedArtistCard thumbnail={activeFeaturedArtist} />
				</div>
				<div class="list pt-xs flex gap-xs justify-center">
					{#each document?.featuredArtists as artist}
						<button
							class="artist cursor-pointer button"
							on:click={() => (activeFeaturedArtist = artist)}
							class:active={artist === activeFeaturedArtist}>{artist.name}</button
						>
					{/each}
				</div>
				<div class="w-full flex justify-center mt-xs">
					<a href="/people" class="theme-red-pink cursor-pointer button">View People <span class="align-super typo-s leading-0">&nearr;</span></a>
				</div>
			</div>
			<div class="featured-thumb-container h-full">
				<div class="featured-thumb w-full">
					<FeaturedPartnerCard thumbnail={activeFeaturedPartner} />
				</div>
				<div class="list pt-xs flex gap-xs justify-center">
					{#each document?.featuredPartners as partner}
						<button
							class="partner button cursor-pointer"
							on:click={() => (activeFeaturedPartner = partner)}
							class:active={partner === activeFeaturedPartner}>{partner.title}</button
						>
					{/each}
				</div>
				<div class="w-full flex justify-center mt-xs">
					<a href="/partners" class="theme-blue-pink cursor-pointer button">View Partners <span class="align-super typo-s leading-0">&nearr;</span></a
					>
				</div>
			</div>
		</section>

		<section>
			<div class="flex justify-between w-full items-center pb-xs">
				<h3 class="typo-lg">Resources</h3>
				<a href="/partners" class="hidden md:block theme-pink-blue cursor-pointer button">View All <span class="align-super typo-s leading-0">&nearr;</span></a>
			</div>
			<div class="hidden md:block">
				<ResourcesSlider slides={resources} />
			</div>
			<div class="flex flex-col gap-3 md:hidden">
				<div>
					{#each resources as resource}
						<ResourceCard thumbnail={resource} />
					{/each}
				</div>
				<a href="/partners" class="theme-pink-blue cursor-pointer button w-fit">View All <span class="align-super typo-s leading-0">&nearr;</span></a>
			</div>
		</section>
	</div>
</main>

<style>
	.hero-home {
		background: linear-gradient(rgba(185, 185, 185, 0) 15%, rgba(185, 185, 185, 1) 70%);
	}

	.featured-event {
		width: 100%;
		height: auto;
	}
	@media screen and (min-width: 768px) {
		.featured-event {
			top: 70px;
			height: calc(100svh - var(--spacing-xs) - 70px);
		}
	}

	.featured-thumb {
		height: calc(100svh - var(--spacing-xs) - 70px);
	}

	button.artist,
	button.partner {
		background-color: var(--color-gray);
		transition: all 0.2s ease-in;
	}

	button.artist.active {
		background-color: transparent;
		transition: all 0.2s ease-in;
		rotate: -3.65deg;
	}

	button.partner.active {
		background-color: transparent;
		transition: all 0.2s ease-in;
		rotate: 12deg;
	}
</style>
