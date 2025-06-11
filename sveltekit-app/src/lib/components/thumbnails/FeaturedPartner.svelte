<script>
	import Image from '$lib/components/element/Image.svelte';
	import PortableText from '../element/PortableText.svelte';
	export let thumbnail;
	let thumbnailFocused = false;
</script>

<a
	href="/artists/{thumbnail.slug.current}"
	class="flex flex-col justify-between p-2 bg-black text-blue h-full relative overflow-hidden"
	on:mouseover={() => (thumbnailFocused = true)}
	on:focus={() => (thumbnailFocused = true)}
	on:mouseout={() => (thumbnailFocused = false)}
	on:blur={() => (thumbnailFocused = false)}
>
	{#if thumbnail.image}
		<div class="absolute top-0 left-0 w-full h-full flex justify-center items-center">
			<div class="cover-image">
				<Image image={thumbnail.image} fit="cover" />
			</div>
		</div>
	{/if}
	<div class="z-10">
		<div class="typo-base text-center pt-xs">Institution</div>
		<h2 class="typo-2xl text-center transition-transform duration-200" 
		class:-rotate-6={thumbnailFocused}>{thumbnail.title}</h2>
	</div>
	<div class="typo-2xl flex flex-col gap-1 z-10">
		<div class="typo-base text-center">
			<PortableText data={thumbnail.description} />
		</div>
	</div>
</a>

<style>
	.cover-image {
		mask-image: url('/masks/featured-partner.svg');
		mask-repeat: no-repeat;
		mask-size: 90% 90%;
		mask-position: center;
		width: 100%;
		height: 100%;
	}
</style>
