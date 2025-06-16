<script>
	// @ts-nocheck
	import emblaCarouselSvelte from 'embla-carousel-svelte';
	import Autoplay from 'embla-carousel-autoplay';
	import { onMount } from 'svelte';

	import Image from '$lib/components/element/Image.svelte';
	import Video from '$lib/components/element/Video.svelte';
	import { slide } from 'svelte/transition';

	export let section;
	$: gallery = section?.items;

	let emblaApi;
	let options = { loop: false, align: 'start' };
	let delay = 6000;
	let plugins = [Autoplay({ delay: delay })];
	let selectedIndex = 0;

	let videoElements = {};
	let videoStates = {};
	let intersectionObserver;

	$: if (gallery) {
		gallery.forEach((slide, index) => {
			if (slide._type === 'elementVideo') {
				videoStates[index] = {
					isVisible: false,
					hasUserInteracted: false,
					isPlaying: false
				};
			}
		});
	}

	onMount(() => {
		intersectionObserver = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const slideIndex = parseInt(entry.target.dataset.slideIndex);
					if (videoStates[slideIndex]) {
						videoStates[slideIndex].isVisible = entry.isIntersecting;
						
						if (!entry.isIntersecting && videoStates[slideIndex].isPlaying) {
							pauseVideo(slideIndex);
						}
					}
				});
			},
			{
				threshold: 1
			}
		);

		return () => {
			if (intersectionObserver) {
				intersectionObserver.disconnect();
			}
		};
	});

	function observeVideoSlide(element, slideIndex) {
		if (intersectionObserver && element) {
			element.dataset.slideIndex = slideIndex;
			intersectionObserver.observe(element);
		}
	}

	function handleVideoPlay(slideIndex) {
		if (videoStates[slideIndex]) {
			videoStates[slideIndex].hasUserInteracted = true;
			videoStates[slideIndex].isPlaying = true;
			
			if (videoStates[slideIndex].isVisible && videoElements[slideIndex]) {
				const mediaPlayer = videoElements[slideIndex].querySelector('media-player');
				if (mediaPlayer) {
					mediaPlayer.play();
				}
			}
		}
	}

	function handleVideoPause(slideIndex) {
		if (videoStates[slideIndex]) {
			videoStates[slideIndex].isPlaying = false;
		}
	}

	function pauseVideo(slideIndex) {
		if (videoElements[slideIndex]) {
			const mediaPlayer = videoElements[slideIndex].querySelector('media-player');
			if (mediaPlayer) {
				mediaPlayer.pause();
			}
		}
		if (videoStates[slideIndex]) {
			videoStates[slideIndex].isPlaying = false;
		}
	}
</script>

{#if section}
	<div class="embla" use:emblaCarouselSvelte={{ options }}>
		<div class="embla__container flex">
			{#each gallery as slide, index}
				<div class="embla__slide">
					{#if slide._type == 'elementImage'}
						<div class="image-container">
							<Image image={slide} fit="contain"/>
						</div>
					{:else if slide._type == 'elementVideo'}
						<div 
							class="image-container" 
							bind:this={videoElements[index]}
							use:observeVideoSlide={index}
						>
							<Video 
								src={slide.url} 
								alt={slide.alt} 
								poster={slide.poster}
								on:play={() => handleVideoPlay(index)}
								on:pause={() => handleVideoPause(index)}
								preventAutoplay={true}
							/>
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
		min-height: 370px;
		height: 45svh;
	}
	.embla__slide {
		transform: translate3d(0, 0, 0);
		flex: 0 0 auto;
		min-width: 0;
		margin-right: var(--spacing-xs);
	}

	.image-container {
		height: 100%;
	}

	.caption {
		height: 100%;
	}
</style>