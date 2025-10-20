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
	import { onMount } from 'svelte';

	import { dateYear, formatDate } from '$lib/utils';

	export let cloudPerformance;
	export let hoveredPerformance;

	export let cloudEvent;
	export let hoveredEvent;

	export let cloudResource;
	export let hoveredResource;
	export let resourceTheme;

	export let cloudArtist;
	export let hoveredArtist;
	export let artistTheme;

	export let cloudUrl;
	export let hoveredUrl;
	export let urlTheme;

	$: viewportWidth = 0;
	$: viewportHeight = 0;
	$: isMounted = false;

	$: initialXDegrees = -0.5 * (0.5 * 10 - 0.5 * 10); // Based on maxDegrees = 10
	$: initialYDegrees = 0.5 * 10 - 0.5 * 10;
	$: cloudTransformStyle = `translateZ(50px) rotateY(${initialYDegrees}deg) rotateX(${initialXDegrees}deg)`;

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

	$: anyCloudHovered =
		hoveredArtist || hoveredPerformance || hoveredUrl || hoveredResource || hoveredEvent;

	const animateClouds = (event) => {
		const maxDegrees = 10;

		const mouseX = event.pageX / viewportWidth;
		const mouseY = event.pageY / viewportHeight;
		const yDegrees = mouseX * maxDegrees - 0.5 * maxDegrees;
		const xDegrees = -0.5 * (mouseY * maxDegrees - 0.5 * maxDegrees);

		// Apply transform to all cloud elements, preserving existing transforms
		const cloudElements = document.querySelectorAll('.cloud-container');
		cloudElements.forEach((element) => {
			// Preserve the translateZ and combine with rotation
			element.style.transform = `translateZ(50px) rotateY(${yDegrees}deg) rotateX(${xDegrees}deg)`;
		});
	};

	onMount(() => {
		isMounted = true;
	});
</script>

<svelte:window
	bind:innerWidth={viewportWidth}
	bind:innerHeight={viewportHeight}
	on:mousemove={animateClouds}
/>

<div class="clouds-container">
	<div
		class="cloud-container hidden sm:flex absolute justify-center items-center w-[13vw] min-w-12 top-[35vh] left-4"
		class:md:hidden={anyCloudHovered}
		style="transform: {cloudTransformStyle}"
	>
		<CloudShapeP />
	</div>

	<div
		class="cloud-container hidden sm:flex absolute justify-center items-center w-[5vw] min-w-6 top-3 left-[30vw]"
		class:md:hidden={anyCloudHovered}
		style="transform: {cloudTransformStyle}"
	>
		<CloudShapeI />
	</div>

	<div
		class="cloud-container hidden sm:flex absolute justify-center items-center w-[20vw] min-w-16 max-w-300 top-0 -mt-8 -mr-7 right-0"
		class:md:hidden={anyCloudHovered}
		style="transform: {cloudTransformStyle}"
	>
		<CloudShapeT color="red" />
	</div>

	<div
		class="cloud-container hidden sm:flex absolute w-[12vw] min-w-12 bottom-s right-1"
		class:md:hidden={anyCloudHovered}
		style="transform: {cloudTransformStyle}"
	>
		<CloudShape_1 cloudBg="blue" />
	</div>

	{#if cloudEvent && cloudEvent.slug}
		<!-- svelte-ignore a11y-no-static-element-interactions -->

		<div
			class="cloud-container relative sm:absolute flex justify-center items-center rotate-10 right-xs mt-5 mr-3 sm:mr-0 sm:rotate-0 sm:top-1/2 sm:-translate-y-1/2 sm:-mt-4 sm:right-1"
			on:mouseenter={() => (hoveredEvent = true)}
			on:mouseleave={() => (hoveredEvent = false)}
			style="transform: {cloudTransformStyle}"
		>
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="relative event-cloud flex justify-center items-center hover:rotate-4 transition-rotation duration-150"
				class:md:hidden={hoveredArtist || hoveredPerformance || hoveredUrl || hoveredResource}
				style="--event-hover: {eventHoverColor}"
			>
				<div class="w-full h-auto size-cloud">
					<CloudShape_2
						cloudBg={cloudEventBg}
						cloudFg={cloudEventFg}
						link="/events/{cloudEvent?.slug}"
					/>
				</div>
				<div
					class="texts absolute top-0 bottom-0 left-0 right-0 text-center h-full w-full button {eventTextColor} pointer-events-none"
				>
					{#if cloudEvent?.start && cloudEvent?.title}
						<div class="typo-cloud-base px-2 rotate-30 absolute right-[10px] top-3">
							{formatDate(cloudEvent.start)}
						</div>
						<div class="typo-cloud-base px-2 absolute bottom-2 sm:bottom-3 text-center w-full">
							{cloudEvent.title}
						</div>
					{/if}
				</div>
			</div>
		</div>
	{/if}

	{#if cloudArtist && cloudArtist.slug}
		<!-- svelte-ignore a11y-no-static-element-interactions -->

		<div
			class="cloud-container relative sm:absolute flex justify-center items-center ml-14 sm:ml-0 sm:right-[16vw] sm:bottom-[20vh] sm:top-auto"
			on:mouseenter={() => (hoveredArtist = true)}
			on:mouseleave={() => (hoveredArtist = false)}
			style="transform: {cloudTransformStyle}"
		>
			<!-- svelte-ignore a11y-no-static-element-interactions -->

			<div
				class="relative artist-cloud min-w-20 w-[20vw] flex justify-center items-center md:max-w-[250px] hover:-rotate-4 transition-rotation duration-150 hover:z-[999]"
				class:md:hidden={hoveredEvent || hoveredPerformance || hoveredUrl || hoveredResource}
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
						{#if cloudArtist.dateBirth}
							<span>{dateYear(cloudArtist.dateBirth)}</span>
						{/if}
						{#if cloudArtist.country}
							<span
								>{#if cloudArtist?.dateBirth},
								{/if}
								{cloudArtist.country}</span
							>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/if}

	{#if cloudPerformance && cloudPerformance.slug}
		<!-- svelte-ignore a11y-no-static-element-interactions -->

		<div
			class="cloud-container relative sm:absolute flex px-xs mt-35 -rotate-10 ml-8 sm:ml-0 sm:rotate-0 sm:mt-[12vh] sm:top-0 sm:left-xs"
			on:mouseenter={() => (hoveredPerformance = true)}
			on:mouseleave={() => (hoveredPerformance = false)}
			style="transform: {cloudTransformStyle}"
		>
			<!-- svelte-ignore a11y-no-static-element-interactions -->

			<div
				class="relative performance-cloud flex justify-center items-center hover:rotate-10 transition-rotation duration-150"
				class:md:hidden={hoveredEvent || hoveredArtist || hoveredUrl || hoveredResource}
				style="--performance-hover: {performanceHoverColor}"
			>
				<div class="w-full max-w-lg h-auto size-cloud">
					<CloudShape_5
						cloudBg={cloudPerformanceBg}
						cloudFg={cloudPerformanceFg}
						link="/performances/{cloudPerformance?.slug}"
					/>
				</div>
				<div
					class="texts absolute top-0 bottom-0 left-0 right-0 text-center flex flex-col gap-[4px] justify-center items-center h-full w-full button {performanceTextColor} pointer-events-none"
				>
					{#if cloudPerformance.title}
						<div class="typo-cloud-base px-2">
							{cloudPerformance.title}
						</div>
					{/if}
					<div class="typo-cloud-s">Associated Performance</div>
				</div>
			</div>
		</div>
	{/if}

	{#if cloudResource && cloudResource.slug}
		<!-- svelte-ignore a11y-no-static-element-interactions -->

		<div
			class="cloud-container relative sm:absolute flex px-xs mr-8 rotate-10 sm:mr-0 sm:rotate-0 sm:top-[12vh] sm:right-[10vw] hover:-rotate-8 transition-rotation duration-150"
			on:mouseenter={() => (hoveredResource = true)}
			on:mouseleave={() => (hoveredResource = false)}
			style="transform: {cloudTransformStyle}"
		>
			<!-- svelte-ignore a11y-no-static-element-interactions -->

			<div
				class="relative resource-cloud flex justify-center items-center"
				class:md:hidden={hoveredEvent || hoveredPerformance || hoveredUrl || hoveredArtist}
				style="--resource-hover: {resourceHoverColor}"
			>
				<div class="w-full max-w-lg h-auto size-cloud">
					<CloudShape_4
						cloudBg={cloudResourceBg}
						cloudFg={cloudResourceFg}
						link="/resources/{cloudResource?.slug}"
					/>
				</div>
				<div
					class="texts absolute top-0 bottom-0 left-0 right-0 text-center flex flex-col gap-[4px] justify-center items-center h-full w-full button {resourceTextColor} pointer-events-none"
				>
					<div class="typo-cloud-s">&DownArrow;</div>

					{#if cloudResource.title}
						<div class="typo-cloud-base px-2">
							{cloudResource.title}
						</div>
					{/if}

					<div class="typo-cloud-s">Download</div>
				</div>
			</div>
		</div>
	{/if}

	{#if cloudUrl && cloudUrl?.url}
		<!-- svelte-ignore a11y-no-static-element-interactions -->
		<div
			class="cloud-container relative sm:absolute flex justify-center items-center sm:left-4 sm:bottom-4"
			on:mouseenter={() => (hoveredUrl = true)}
			on:mouseleave={() => (hoveredUrl = false)}
			style="transform: {cloudTransformStyle}"
		>
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div
				class="relative url-cloud flex justify-center items-center hover:rotate-4 transition-rotation duration-150"
				class:md:hidden={hoveredEvent || hoveredPerformance || hoveredArtist || hoveredResource}
				style="--url-hover: {urlHoverColor}"
			>
				<div class="w-full h-auto size-cloud">
					<CloudShape_6 cloudBg={cloudUrlBg} cloudFg={cloudUrlFg} link={cloudUrl?.url} />
				</div>
				<div
					class="texts absolute top-0 bottom-0 left-0 flex flex-col justify-center items-center gap-[4px] h-full w-full button {urlTextColor} pointer-events-none text-center mt-xs"
				>
					{#if cloudUrl?.label}
						<div class="typo-cloud-base px-2">
							{cloudUrl?.label}
						</div>
					{/if}

					<div class="typo-cloud-s">Feature</div>
				</div>
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
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

	@media (min-width: 768px) {
		.clouds-container {
			perspective: 1000px;
			width: 92svw;
			height: 100%;
		}

		.cloud-container {
			transform: translateZ(200px);
		}
	}
</style>
