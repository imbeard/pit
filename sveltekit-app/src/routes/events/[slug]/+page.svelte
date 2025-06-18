<script>
	import Image from '$lib/components/element/Image.svelte';
	import PageBuilder from '$lib/components/PageBuilder.svelte';
	import PortableText from '$lib/components/element/PortableText.svelte';
	import FeaturedArtists from '$lib/components/FeaturedArtists.svelte';
	import PartneringInstitutions from '$lib/components/PartneringInstitutions.svelte';
	import CloudShape from '$lib/components/svg/CloudShape-4.svelte';
	import Cloud from '$lib/components/Cloud.svelte';
	import EventsSlider from '$lib/components/sliders/EventsSlider.svelte';
	import EventCard from '$lib/components/thumbnails/EventCard.svelte';

	import { formatDate } from '$lib/utils';
	export let data;
	$: event = data?.document?.data[0];
	$: relatedEvents = event?.relatedEvents;
	$: pageBuilder = event?.pageBuilder;

	$: cloudBg = event?.performance?.theme.split('-')[0];
	$: cloudFg = event?.performance?.theme.split('-')[1];
</script>

<div class="px-xs">
	<section
		class="w-full pt-10 flex flex-col justify-between gap-6 min-h-screen md:grid-12 border-b border-gray pb-6 md:min-h-[90vh]"
	>
		<div class="w-full relative col-start-1 col-end-13">
			<div class="flex flex-col items-center">
				<div class="flex justify-center typo-s gap-xs">
					<span>Event</span>
					{#if event?.typology?.title}<span>{event?.typology.title}</span>{/if}
					{#if event?.location}<span>{event?.city}</span>{/if}
				</div>
				{#if event?.title}
					<div class="typo-2xl text-center pt-[1.2rem] max-w-7xl">{event?.title}</div>
				{/if}
			</div>
		</div>

		{#if event?.performance}
			<div class="md:hidden w-full flex justify-end px-xs">
				<Cloud
					entry={event?.performance}
					category="performances"
					link="/performances/{event?.performance?.slug}"
					{cloudFg}
					{cloudBg}
					rotation="6"
				>
					<div slot="shape">
						<CloudShape {cloudBg} {cloudFg} link="/performances/{event?.performance?.slug}" />
					</div>

					<div slot="title">Associated Performance</div>
				</Cloud>
			</div>
		{/if}

		<div class="col-start-3 col-end-12 md:self-end typo-2xl">
			<div>{event?.institution?.title}</div>
			<div>
				<span>{formatDate(event?.start)}</span>
				{#if event?.end}
					<span>&mdash; {formatDate(event?.end)}</span>
				{/if}
			</div>
			<div>
				<span>{event?.time.start}</span>
				{#if event?.end}<span>&mdash; {event?.time?.end}</span>
				{/if}
			</div>
		</div>
	</section>

	<div class="relative">
		
		{#if event?.performance}
			<div class="hidden md:block absolute h-full right-5 z-10">
				<div class="sticky top-36 h-auto flex justify-end -mt-30">
					<Cloud
						entry={event?.performance}
						category="performances"
						link="/performances/{event?.performance?.slug}"
						{cloudFg}
						{cloudBg}
						rotation="8"
					>
						<div slot="shape">
							<CloudShape {cloudBg} {cloudFg} link="/performances/{event?.performance?.slug}" />
						</div>

						<div slot="title">Associated Performance</div>
					</Cloud>
				</div>
			</div>
		{/if}

		{#if event?.image}
			<section class="w-full mx-auto pt-xs">
				<Image image={event?.image} fit="contain" />
			</section>
		{/if}

		<section class="flex flex-col-reverse md:grid-2 pt-s pb-10 md:pt-3 md:pb-12">
			{#if event?.description}
				<PortableText data={event?.description} />
			{/if}
			{#if event?.informations && event?.informations.length > 0}
				<div class="grid-2 md:block">
					<div class="col-start-2">
						{#each event?.informations as information}
							<div class="pb-2">
								<h4 class="typo-s pb-xs">{information.title}</h4>
								<PortableText data={information.text} />
							</div>
						{/each}
					</div>
				</div>
			{/if}
		</section>
	</div>

	{#if event.featuredArtists && event.featuredArtists.length > 0}
		<section class="pt-16">
			<FeaturedArtists artists={event.featuredArtists} theme="theme-pink-brown" />
		</section>
	{/if}

	{#if event.allPartners && event.allPartners.length > 0}
		<section class="pt-16">
			<PartneringInstitutions partners={event.allPartners} />
		</section>
	{/if}

	{#if pageBuilder}
		<PageBuilder sections={pageBuilder.sections} />
	{/if}

	{#if event?.relatedEvents && event?.relatedEvents.length > 0}
		<section class="pt-6">
			<div class="flex justify-between w-full items-center pb-xs border-b border-gray">
				<h3 class="typo-lg">Related Events</h3>
			</div>
			<div class="hidden md:block pt-xs">
				<EventsSlider slides={event?.relatedEvents} />
			</div>
			<div class="flex flex-col gap-xs md:hidden pt-xs">
				{#each relatedEvents as slide}
					<EventCard thumbnail={slide} pageColor="brown" />
				{/each}
			</div>
		</section>
	{/if}
</div>
