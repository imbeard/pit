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

	<div class="z-10">
		<div class="typo-base text-center pt-xs">Artist</div>
		<h2 class="typo-2xl text-center">{thumbnail?.name}</h2>
	</div>
	<div class="typo-2xl flex flex-col gap-1 z-10">
		<div class="typo-base text-center transition-transform duration-200 pb-1"
		class:-rotate-4={thumbnailFocused}
		>
			<PortableText data={thumbnail?.summary} />
		</div>
	</div>
</a>
