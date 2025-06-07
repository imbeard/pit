<script>
	import Image from '$lib/components/element/Image.svelte';
	export let thumbnail;
</script>

<a href="/thumbnails/{thumbnail.slug}" class="block bg-gray w-full aspect-square flex justify-center items-center">
	<div class="cover-image">
		{#if thumbnail.logo}
			<Image image={thumbnail.logo} fit="contain" />
		{:else}
			<div class="w-full h-full typo-2xl">{thumbnail.title}</div>
		{/if}
	</div>
</a>
