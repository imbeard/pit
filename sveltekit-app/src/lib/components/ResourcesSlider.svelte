<script>
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';

	import ResourceCard from '$lib/components/thumbnails/ResourceCard.svelte';
	export let slides = [];
	let options = { loop: true, align: 'start' };
	let delay = 3000;
	let plugins = [Autoplay({ delay: delay })];
</script>

<div class="embla">
	<div class="embla__viewport" use:emblaCarouselSvelte={{ options, plugins }}>
		<div class="embla__container">
			{#each slides as resource}
				<div class="embla__slide">
					<ResourceCard thumbnail={resource} />
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.embla {
		overflow: hidden;
		position: relative;
		--slide-size: 50%;
	}
	/* .embla__viewport {
		overflow: hidden;
	} */
	.embla__container {
		display: flex;
		touch-action: pan-y pinch-zoom;
	}

	.embla__slide {
		transform: translate3d(0, 0, 0);
		flex: 0 0 50%;
		min-width: 0;
		padding-left: var(--spacing-xs);
	}
</style>
