<script>
	import Image from '$lib/components/element/Image.svelte';
	import PortableText from '../element/PortableText.svelte';
	export let thumbnail;
	let thumbnailFocused = false;
</script>

<a
	href="/artists/{thumbnail?.slug}"
	class="flex flex-col justify-between p-2 bg-white text-red relative h-full overflow-hidden"
	on:mouseover={() => (thumbnailFocused = true)}
	on:focus={() => (thumbnailFocused = true)}
	on:mouseout={() => (thumbnailFocused = false)}
	on:blur={() => (thumbnailFocused = false)}
>
	{#if thumbnail.image}
		<div class="absolute top-0 left-0 w-full h-full flex justify-center items-center">
			<Image image={thumbnail?.image} fit="cover" />
		</div>
	{/if}

	<button class="button p-xs w-fit h-fit border border-red text-red bg-transparent absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
		<span>View Artist</span>
		<span class="align-super typo-s leading-0">&nearr;</span>
	</button>

	<div class="z-10">
		<div class="typo-base text-center pt-xs">Artist</div>
		<h2 class="typo-2xl text-center">{thumbnail?.name}</h2>
	</div>
	<div class="typo-2xl flex flex-col gap-1 z-10">
		<div
			class="typo-base text-center transition-transform duration-200 pb-1"
			class:-rotate-4={thumbnailFocused}
		>
			<PortableText data={thumbnail?.summary} />
		</div>
	</div>
</a>
