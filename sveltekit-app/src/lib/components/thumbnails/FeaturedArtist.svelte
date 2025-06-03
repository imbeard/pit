<script>
	import Image from '$lib/components/element/Image.svelte';
	import PortableText from '../element/PortableText.svelte';
	export let thumbnail;
</script>

<a
	href="/artists/{thumbnail.slug.current}"
	class="flex flex-col justify-between p-2 bg-white text-red h-full relative overflow-hidden"
>
	<div class="absolute top-1/2 left-0 transform -translate-y-1/2 w-full p-2">
		<Image image={thumbnail.image} fit="contain" />
	</div>
	<div class="z-10">
		<div class="typo-base text-center pt-xs">Artist</div>
		<h2 class="typo-2xl text-center">{thumbnail.name}</h2>
	</div>
	<div class="typo-2xl flex flex-col gap-1 z-10">
		<div class="typo-base text-center -rotate-4 pb-1">
            <PortableText data={thumbnail.summary} />
        </div>
	</div>
</a>