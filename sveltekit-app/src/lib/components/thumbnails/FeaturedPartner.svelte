<script>
	import Image from '$lib/components/element/Image.svelte';
	import PortableText from '../element/PortableText.svelte';
	export let thumbnail;

	$: console.log(thumbnail);
</script>

<a
	href="/artists/{thumbnail.slug.current}"
	class="flex flex-col justify-between p-2 bg-black text-blue h-full relative overflow-hidden"
>
	{#if thumbnail.image}
		<div class="absolute top-0 left-0 w-full h-full flex justify-center items-center">
			<Image image={thumbnail.image} fit="contain" />
		</div>
	{/if}
	<div class="z-10">
		<div class="typo-base text-center pt-xs">Institution</div>
		<h2 class="typo-2xl text-center rotate-6">{thumbnail.title}</h2>
	</div>
	<div class="typo-2xl flex flex-col gap-1 z-10">
		<div class="typo-base text-center">
			<PortableText data={thumbnail.description} />
		</div>
	</div>
</a>
