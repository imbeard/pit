<script>
	// @ts-nocheck
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';
	import { onMount } from 'svelte';

	import Image from '$lib/components/element/Image.svelte';
	import Video from '$lib/components/element/Video.svelte';

	export let section;
	$: gallery = section?.items;

	let emblaApi;
	let options = { loop: false, align: 'start' };
	let delay = 6000;
	let plugins = [Autoplay({ delay: delay })];
	let selectedIndex = 0;
</script>

{#if section}
	<div class="embla" use:emblaCarouselSvelte={{ options }}>
		<div class="embla__container flex">
			{#each gallery as slide, index}
				<div class="embla__slide">
					{#if slide._type == 'elementImage'}
						<div class="image-container">
							<Image image={slide} fit="cover" />
						</div>
					{:else if slide._type == 'elementVideo'}
						<div class="image-container">
							<Video src={slide.url} alt={slide.alt} poster={slide.poster} />
						</div>
					{/if}
					{#if slide.caption}
						<div class="caption">{slide?.caption}</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
{/if}

<style>
	.embla {
		overflow: hidden;
		width: 100%;
	}
	.embla__container {
		display: flex;
		touch-action: pan-y pinch-zoom;
		min-height: 205px;
		height: 25svh;
	}
	.embla__slide {
		transform: translate3d(0, 0, 0);
		flex: 0 0 auto;
		min-width: 0;
		margin-right: var(--spacing-xs);
		max-width: 75vw;
		min-height: 205px;
		height: 25svh;
	}

	.image-container {
		height: 100%;
	}

	.caption {
		height: 100%;
	}

	@media (min-width: 768px) {
		.embla__container {
			min-height: 370px;
			height: 45svh;
		}

		.embla__slide {
			transform: translate3d(0, 0, 0);
			flex: 0 0 auto;
			min-width: 0;
			margin-right: var(--spacing-xs);
			max-width: none;
			min-height: 370px;
			height: 45svh;
		}
	}
</style>
