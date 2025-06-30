<script>
	import { getImageDimensions } from '@sanity/asset-utils';
	import { urlFor } from '$lib/sanity/image';

	export let image;
	export let fit = 'cover';
	export let alt = 'Image';
	export let lazy = false;
	export let preload = false;
	export let height = 'auto';

	let innerWidth = 1280;

	$: src = innerWidth < 768 && image.mobileImage ? image.mobileImage.asset : image.asset;
	$: dimensions = getImageDimensions(src);
	$: aspectRatio = dimensions.width / dimensions.height;
	$: imageUrl = urlFor(src).width(dimensions.width).url() + '&auto=format';
</script>

<svelte:window bind:innerWidth />

<svelte:head>
	{#if preload}
		<link rel="preload" as="image" href={imageUrl} />
	{/if}
</svelte:head>

<img
	class="max-h-full max-w-full w-full
	{fit === 'contain' ? 'object-contain' : 'object-cover h-full w-full'}
	{height === 'full' ? 'h-full' : 'h-auto'}"
	
	loading={lazy ? 'lazy' : 'eager'}
	fetchpriority={lazy ? 'low' : 'high'}
	data-sizes="auto"
	width={dimensions.width}
	height={dimensions.height}
	style="aspect-ratio: {aspectRatio}"
	alt={src.alt || alt}
	src={imageUrl}
/>
