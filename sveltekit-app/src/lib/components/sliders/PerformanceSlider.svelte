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
	$: theme = `theme-${slides[selectedIndex].theme}`;

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
			dotNode.addEventListener('click', () => {
				emblaApi.scrollTo(index, true);
				const autoplayPlugin = emblaApi.plugins().autoplay;
				if (autoplayPlugin) {
					autoplayPlugin.reset();
					autoplayPlugin.play();
				}
			});
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

	const updateDotAnimations = (targetIndex) => {
		dotNodes.forEach((dotNode, index) => {
			let progressBar = dotNode.querySelector('.embla__progress__bar');
			progressBar.classList.remove('active');
			progressBar.style.animation = '';
			if (index === targetIndex) {
				progressBar.classList.add('active');
				progressBar.style.animation = `sliderDotProgress ${delay}ms linear`;
			}
		});
	};

	function onInit(event) {
		emblaApi = event.detail;
		selectedIndex = emblaApi.selectedScrollSnap();
		renderDots();

		emblaApi.on('select', () => {
			updateDotAnimations(emblaApi.selectedScrollSnap());
			selectedIndex = emblaApi.selectedScrollSnap();
		});
	}
</script>

<div class="embla" use:emblaCarouselSvelte={{ options, plugins }} on:emblaInit={onInit}>
	<div class="embla__container">
		{#each slides as slide}
			<a
				class="embla__slide performance {theme} text-black bg-white"
				href="/performances/{slide.slug}"
			>
				{#if slide.image._type === 'elementImage'}
					<div
						class="slide-image aspect-[4/5] md:aspect-[2/1]"
						bind:clientHeight={slideImageHeight}
					>
						<Image image={slide.image} fit="cover" />
					</div>
				{/if}
				<div class="pt-1 flex flex-col gap-1">
					<div class="w-full grid-3 typo-s">
						<span>Artist</span>
						<span>Institutions</span>
						<span>Typology</span>
					</div>
					<h3 class="typo-2xl text-center">{slide.title}</h3>
					<div class="w-full grid-3 typo-s">
						{#each slide.artists as artist}<div>{artist.name}</div>{/each}

						{#if slide?.institutions?.length > 0}
							<div>
								{#each slide?.institutions as institution, index}
									<div>
										<span>{institution.institution.title}</span>
										{#if index < slide?.institutions?.length - 1}
											<span>,</span>
										{/if}
									</div>
								{/each}
							</div>
						{/if}

						<span>{slide.typology.title}</span>
					</div>
				</div>
			</a>
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
