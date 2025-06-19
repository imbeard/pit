<script>
	// @ts-nocheck

	import 'vidstack/bundle';
	import { getImage } from '@sanity/asset-utils';
	import { PUBLIC_SANITY_DATASET, PUBLIC_SANITY_PROJECT_ID } from '$env/static/public';

	import PlayButton from '../svg/PlayButton.svelte';

	export let src = '';
	export let alt = '';
	export let poster = '';

	let player;

	$: posterUrl = poster
		? getImage(poster, {
				projectId: PUBLIC_SANITY_PROJECT_ID,
				dataset: PUBLIC_SANITY_DATASET
			})
		: '';
</script>

<div class="player h-full">
	<media-player
		class="media-player h-full"
		title={alt}
		{src}
		poster={posterUrl?.asset?.url}
		bind:this={player}
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
