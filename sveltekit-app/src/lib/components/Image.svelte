<script lang="ts">
	import { getImageDimensions } from '@sanity/asset-utils';

	import { urlFor } from '$lib/sanity/image';

	export let image;
	export let fit: string = 'cover';
	export let alt: string = 'Image';
	export let lazy: boolean = false;
	export let preload: boolean = false;

	let innerWidth = 1280;
	let src = innerWidth < 768 && image.mobileImage ? image.mobileImage.asset : image.asset;

	let aspectRatio = getImageDimensions(src).width / getImageDimensions(src).height;
</script>

<svelte:window bind:innerWidth />

<svelte:head>
	{#if preload}
		<link
			rel="preload"
			as="image"
			href={urlFor(src).width(getImageDimensions(src).width).url() + '&auto=format'}
		/>
	{/if}
</svelte:head>

<img
	class="max-h-full max-w-full w-full h-auto {fit === 'contain'
		? 'object-contain'
		: 'object-cover'}"
	loading={lazy ? 'lazy' : 'eager'}
	fetchpriority={lazy ? 'low' : 'high'}
	data-sizes="auto"
	width={src.width}
	height={src.height}
	style="aspect-ratio: {aspectRatio}"
	alt={src.alt || alt}
	src={urlFor(src).width(getImageDimensions(src).width).url() + '&auto=format'}
/>
