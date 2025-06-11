<script>
	import Image from '$lib/components/element/Image.svelte';
	export let thumbnail;
</script>

<a
	href="/thumbnails/{thumbnail.slug}"
	class="bg-gray w-full aspect-square flex justify-center items-center thumbnail colorize"
>
	<div class="cover-image">
		{#if thumbnail.logo}
			<Image image={thumbnail.logo} fit="contain" />
		{:else}
			<div class="w-full h-full typo-2xl">{thumbnail.title}</div>
		{/if}
	</div>
</a>

<style>
	.thumbnail.colorize:hover .cover-image{
		filter: invert(35%) sepia(31%) saturate(6562%) hue-rotate(204deg) brightness(102%)
			contrast(101%);
	}
</style>
