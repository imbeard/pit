<script>
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';

	import ResourceCard from '$lib/components/thumbnails/ResourceCard.svelte';
	export let slides = [];
	let options = { loop: true, align: 'start' };
	let delay = 6000;
	let plugins = [Autoplay({ delay: delay })];
</script>

<div class="embla">
	<div class="embla__viewport" use:emblaCarouselSvelte={{ options, plugins }}>
		<div class="embla__container">
			{#each slides as resource}
				<div class="embla__slide border-y border-gray">
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
	}
	/* .embla__viewport {
		overflow: hidden;
	} */
	.embla__container {
		touch-action: pan-y pinch-zoom;
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: 50%;
		grid-column-gap: var(--spacing-xs);
		/* padding-left: var(--spacing-xs); */
	}

	.embla__slide {
		transform: translate3d(0, 0, 0);
		flex: 0 0 auto;
		min-width: 0;
	}
</style>
