<script>
	// @ts-nocheck

	import 'vidstack/bundle';
	import { getImage } from '@sanity/asset-utils';
	import { PUBLIC_SANITY_DATASET, PUBLIC_SANITY_PROJECT_ID } from '$env/static/public';
	import { createEventDispatcher, onMount } from 'svelte';

	import PlayButton from '../svg/PlayButton.svelte';

	export let src = '';
	export let alt = '';
	export let poster = '';
	export let preventAutoplay = false;

	let player;
	const dispatch = createEventDispatcher();

	$: posterUrl = poster
		? getImage(poster, {
				projectId: PUBLIC_SANITY_PROJECT_ID,
				dataset: PUBLIC_SANITY_DATASET
			})
		: '';

	onMount(() => {
		if (player && preventAutoplay) {
			// Disable autoplay and prevent automatic playing
			player.autoplay = false;
			player.muted = false;
			
			// Listen for play/pause events and dispatch them to parent
			player.addEventListener('play', () => {
				dispatch('play');
			});
			
			player.addEventListener('pause', () => {
				dispatch('pause');
			});

			// Prevent automatic playing on load/interaction unless user clicks play
			player.addEventListener('loadstart', () => {
				player.pause();
			});

			// Override any autoplay behavior
			player.addEventListener('canplay', () => {
				if (preventAutoplay) {
					player.pause();
				}
			});
		}
	});

	// Expose play/pause methods for parent component control
	export function play() {
		if (player) {
			player.play();
		}
	}

	export function pause() {
		if (player) {
			player.pause();
		}
	}
</script>

<div class="player h-full">
	<media-player
		class="media-player h-full"
		title={alt}
		{src}
		poster={posterUrl?.asset?.url}
		bind:this={player}
		autoplay={preventAutoplay ? "false" : "false"}
		muted={preventAutoplay ? "false" : "true"}
	>
		<media-provider>
			<source {src} />
			<media-poster class="vds-poster"></media-poster>
		</media-provider>
		<media-video-layout small-when="always" class="vds-video-layout">
			<svg slot="play-icon">
				<PlayButton />
			</svg>
		</media-video-layout>
	</media-player>
</div>