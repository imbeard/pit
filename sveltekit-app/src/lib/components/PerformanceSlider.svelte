<script>
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';
	import Image from '$lib/components/element/Image.svelte';
	import Fade from 'embla-carousel-fade';

	export let slides = [];

	let emblaApi;
	let dotsNode;
	let options = { loop: true };
	let delay = 6000;
	let plugins = [Autoplay({ delay: delay }), Fade()];

	$: selectedIndex = 0;
	$: dotNodes = [];
	$: gridCols = 'grid-cols-' + dotNodes.length;
	$: slideImageHeight = 0;
	$: offsetTop = slideImageHeight - 20;

	const renderDots = () => {
		dotsNode.innerHTML = emblaApi
			.scrollSnapList()
			.map(
				() => `
      <button class="embla__dot" type="button">
        <div class="embla__progress">
          <div class="embla__progress__bar"></div>
        </div>
      </button>
    `
			)
			.join('');

		dotNodes = Array.from(dotsNode.querySelectorAll('.embla__dot'));
		dotNodes.forEach((dotNode, index) => {
			dotNode.addEventListener('click', () => emblaApi.scrollTo(index, true));
		});
		dotNodes.forEach((dotNode, index) => {
			let progressBar = dotNode.querySelector('.embla__progress__bar');
			progressBar.style.width = `0%`;
			progressBar.style.height = `3px`;
			progressBar.style.background = '#fff';
			progressBar.style.borderRadius = `3px`;
			if (index === emblaApi.selectedScrollSnap()) {
				progressBar.classList.add('active');
			}
			if (progressBar.classList.contains('active')) {
				progressBar.style.animation = `sliderDotProgress ${delay}ms linear`;
			}
		});

		gridCols = 'grid-cols-' + dotNodes.length;
	};

	function onInit(event) {
		emblaApi = event.detail;
		selectedIndex = emblaApi.selectedScrollSnap();
		renderDots();
		emblaApi.on('scroll', () => {
			dotNodes.forEach((dotNode, index) => {
				let progressBar = dotNode.querySelector('.embla__progress__bar');
				progressBar.classList.remove('active');
				progressBar.style.animation = '';
				if (index === emblaApi.selectedScrollSnap()) {
					progressBar.classList.add('active');
					progressBar.style.animation = `sliderDotProgress ${delay}ms linear`;
				}
			});
		});
	}
</script>

<div class="embla" use:emblaCarouselSvelte={{ options, plugins }} on:emblaInit={onInit}>
	<div class="embla__container">
		{#each slides as slide}
			<div class="embla__slide">
				{#if slide.image._type === 'elementImage'}
					<div class="slide-image" bind:clientHeight={slideImageHeight}>
						<Image image={slide.image} fit="cover" />
					</div>
				{/if}
				<div class="pt-1 flex flex-col gap-1">
					<div class="w-full grid grid-cols-3 typo-s">
						<span>Artist</span>
						<span>Institutions</span>
						<span>Typology</span>
					</div>
					<h3 class="typo-2xl text-center">{slide.title}</h3>
					<div class="w-full grid grid-cols-3 typo-s">
						{#each slide.artists as artist}<div>{artist.name}</div>{/each}
						{#each slide.institutions as institution}<div>{institution.title}</div>{/each}
						<span>{slide.typology}</span>
					</div>
				</div>
			</div>
		{/each}
	</div>
	<div class="embla__controls">
		<div
			class="embla__dots px-xs grid gap-xs {gridCols}"
			bind:this={dotsNode}
			style:top="{offsetTop}px"
		></div>
	</div>
</div>

<style>
	.embla {
		overflow: hidden;
		position: relative;
	}
	.embla__container {
		display: flex;
	}
	.embla__slide {
		flex: 0 0 100%;
		min-width: 0;
	}

	.embla__slide .slide-image {
		width: 100%;
		aspect-ratio: 2 / 1;
	}

	.embla__dots {
		z-index: 2;
		position: absolute;
		width: 100%;
	}

	:global(.embla__dot) {
		-webkit-tap-highlight-color: rgba(white, 0.5);
		-webkit-appearance: none;
		appearance: none;
		background-color: rgba(255, 255, 255, 0.5);
		touch-action: manipulation;
		text-decoration: none;
		cursor: pointer;
		border: 0;
		padding: 0;
		margin: 0;
		height: 3px;
		border-radius: 3px;
		grid-column: span 1;
	}
</style>
