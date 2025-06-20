<script>
	import CloudShapeI from '$lib/components/svg/CloudShape-i.svelte';
	import CloudShapeP from '$lib/components/svg/CloudShape-p.svelte';
	import CloudShapeT from '$lib/components/svg/CloudShape-t.svelte';
	import CloudShape_1 from '$lib/components/svg/CloudShape-1.svelte';
	import CloudShape_2 from '$lib/components/svg/CloudShape-2.svelte';
	import CloudShape_3 from '$lib/components/svg/CloudShape-3.svelte';
	import CloudShape_4 from '$lib/components/svg/CloudShape-4.svelte';
	import CloudShape_5 from '$lib/components/svg/CloudShape-5.svelte';
	import CloudShape_6 from '$lib/components/svg/CloudShape-6.svelte';

	import { dateYear, formatDate } from '$lib/utils';

	export let cloudPerformance;
	export let cloudEvent;
	export let cloudResource;
	export let resourceTheme;

	export let cloudArtist;
	export let artistTheme;

	export let cloudUrl;
	export let urlTheme;

	$: cloudPerformanceBg = cloudPerformance?.theme?.split('-')[0];
	$: cloudPerformanceFg = cloudPerformance?.theme?.split('-')[1];
	$: performanceTextColor = 'text-' + cloudPerformanceFg;
	$: performanceHoverColor = `var(--color-${cloudPerformanceBg})`;

	$: cloudEventBg = cloudEvent?.theme?.split('-')[0];
	$: cloudEventFg = cloudEvent?.theme?.split('-')[1];
	$: eventTextColor = 'text-' + cloudEventFg;
	$: eventHoverColor = `var(--color-${cloudEventBg})`;

	$: cloudArtistBg = artistTheme?.split('-')[0];
	$: cloudArtistFg = artistTheme?.split('-')[1];
	$: artistTextColor = 'text-' + cloudArtistFg;
	$: artistHoverColor = `var(--color-${cloudArtistBg})`;

	$: cloudResourceBg = resourceTheme?.split('-')[0];
	$: cloudResourceFg = resourceTheme?.split('-')[1];
	$: resourceTextColor = 'text-' + cloudResourceFg;
	$: resourceHoverColor = `var(--color-${cloudResourceBg})`;

	$: cloudUrlBg = urlTheme?.split('-')[0];
	$: cloudUrlFg = urlTheme?.split('-')[1];
	$: urlTextColor = 'text-' + cloudUrlFg;
	$: urlHoverColor = `var(--color-${cloudUrlBg})`;
</script>

<div
	class="hidden sm:flex absolute justify-center items-center w-[15vw] top-[35vh] max-w-16 left-4"
>
	<CloudShapeP />
</div>

<div class="hidden sm:flex absolute justify-center items-center w-[5vw] top-3 left-[30vw]">
	<CloudShapeI />
</div>

<div
	class="hidden sm:flex absolute justify-center items-center w-[20vw] min-w-16 max-w-300 top-0 -mt-8 -mr-7 right-0"
>
	<CloudShapeT color="red" />
</div>

<div class="hidden sm:flex absolute w-[15vw] bottom-s max-w-16 right-1">
	<CloudShape_1 cloudBg="blue" />
</div>

{#if cloudEvent.slug}
	<div
		class="relative sm:absolute flex justify-center items-center rotate-10 right-xs mt-5 mr-3 sm:mr-0 sm:rotate-0 sm:top-1/2 sm:-translate-y-1/2 sm:-mt-4 sm:right-1"
	>
		<div
			class="event-cloud flex justify-center items-center size-cloud"
			style="--event-hover: {eventHoverColor}"
		>
			<div class="w-full h-auto">
				<CloudShape_2
					cloudBg={cloudEventBg}
					cloudFg={cloudEventFg}
					link="/events/{cloudEvent?.slug}"
				/>
			</div>
			<div
				class="texts absolute top-0 bottom-0 left-0 right-0 text-center h-full w-full button {eventTextColor} pointer-events-none"
			>
				<div class="typo-cloud-base px-2 rotate-30 absolute right-[10px] top-3">
					{formatDate(cloudEvent.start)}
				</div>
				<div class="typo-cloud-base px-2 absolute bottom-2 sm:bottom-3 text-center w-full">
					{cloudEvent.title}
				</div>
			</div>
		</div>
	</div>
{/if}

{#if cloudArtist.slug}
	<div
		class="relative flex justify-center items-center max-w-300 w-[16vw] min-w-14 ml-10 mt-10 sm:mt-0 sm:ml-0 sm:absolute sm:right-[16vw] sm:bottom-[20vh] sm:top-auto sm:min-w-16"
	>
		<div
			class="artist-cloud flex justify-center items-center"
			style="--artist-hover: {artistHoverColor}"
		>
			<div class="w-full h-auto">
				<CloudShape_3
					cloudBg={cloudArtistBg}
					cloudFg={cloudArtistFg}
					link="/people/{cloudArtist?.slug}"
				/>
			</div>
			<div
				class="texts absolute top-0 bottom-0 left-0 flex flex-col justify-center items-center gap-[4px] h-full w-full button {artistTextColor} pointer-events-none"
			>
				<div class="typo-cloud-s">Artist profile</div>
				<div class="typo-cloud-base px-2">
					{cloudArtist.name}
				</div>
				<div class="typo-cloud-s px-2">
					<span>{dateYear(cloudArtist.dateBirth)}</span>
					{#if cloudArtist.country}
						<span>, {cloudArtist.country}</span>
					{/if}
				</div>
			</div>
		</div>
	</div>
{/if}

{#if cloudPerformance.slug}
	<div
		class="relative flex px-xs mt-20 -rotate-10 ml-8 sm:ml-0 sm:rotate-0 sm:absolute sm:mt-[12vh] sm:top-0 sm:left-xs"
	>
		<div
			class="performance-cloud flex justify-center items-center size-cloud"
			style="--performance-hover: {performanceHoverColor}"
		>
			<div class="w-full max-w-lg h-auto">
				<CloudShape_5
					cloudBg={cloudPerformanceBg}
					cloudFg={cloudPerformanceFg}
					link="/performances/{cloudPerformance?.slug}"
				/>
			</div>
			<div
				class="texts absolute top-0 bottom-0 left-0 right-0 text-center flex flex-col gap-[4px] justify-center items-center h-full w-full button {performanceTextColor} pointer-events-none"
			>
				<div class="typo-cloud-base px-2">
					{cloudPerformance.title}
				</div>

				<div class="typo-cloud-s">Associated Performance</div>
			</div>
		</div>
	</div>
{/if}

{#if cloudResource}
	<div
		class="relative flex px-xs mr-8 rotate-10 mt-20 sm:mt-0 sm:mr-0 sm:rotate-0 sm:absolute sm:top-[12vh] sm:right-[10vw]"
	>
		<div
			class="resource-cloud flex justify-center items-center size-cloud"
			style="--resource-hover: {resourceHoverColor}"
		>
			<div class="w-full max-w-lg h-auto">
				<CloudShape_4
					cloudBg={cloudResourceBg}
					cloudFg={cloudResourceFg}
					link="/resources/{cloudResource?.slug}"
				/>
			</div>
			<div
				class="texts absolute top-0 bottom-0 left-0 right-0 text-center flex flex-col gap-[4px] justify-center items-center h-full w-full button {resourceTextColor} pointer-events-none"
			>
				<div class="typo-cloud-s absolute right-5 top-2">&DownArrow;</div>

				<div class="typo-cloud-base px-2">
					{cloudResource.title}
				</div>

				<div class="typo-cloud-s">Download</div>
			</div>
		</div>
	</div>
{/if}

{#if cloudUrl?.url}
	<div
		class="relative sm:absolute flex justify-center items-center mt-10 sm:mt-0 sm:left-4 sm:bottom-4 size-cloud"
	>
		<div class="url-cloud flex justify-center items-center" style="--url-hover: {urlHoverColor}">
			<div class="w-full h-auto">
				<CloudShape_6 cloudBg={cloudUrlBg} cloudFg={cloudUrlFg} link={cloudUrl?.url} />
			</div>
			<div
				class="texts absolute top-0 bottom-0 left-0 flex flex-col justify-center items-center gap-[4px] h-full w-full button {urlTextColor} pointer-events-none text-center mt-xs"
			>
				<div class="typo-cloud-base px-2">
					{cloudUrl?.label}
				</div>

				<div class="typo-cloud-s">Feature</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.performance-cloud:hover .texts {
		color: var(--performance-hover);
	}

	.event-cloud:hover .texts {
		color: var(--event-hover);
	}

	.artist-cloud:hover .texts {
		color: var(--artist-hover);
	}

	.resource-cloud:hover .texts {
		color: var(--resource-hover);
	}

	.url-cloud:hover .texts {
		color: var(--url-hover);
	}
</style>
