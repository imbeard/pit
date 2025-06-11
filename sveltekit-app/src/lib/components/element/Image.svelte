<script>
	import { getImageDimensions } from '@sanity/asset-utils';

	import { urlFor } from '$lib/sanity/image';

	export let image;
	export let fit = 'cover';
	export let alt = 'Image';
	export let lazy = false;
	export let preload = false;

	$: innerWidth = 1280;
	$: src = innerWidth < 768 && image.mobileImage ? image.mobileImage.asset : image.asset;
	$: aspectRatio = getImageDimensions(src).width / getImageDimensions(src).height;
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
	class="max-h-full max-w-full w-full h-full {fit === 'contain'
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