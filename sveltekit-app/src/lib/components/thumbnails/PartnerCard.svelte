<script>
	import Image from '$lib/components/element/Image.svelte';
	export let thumbnail;
	export let ratio = '';
</script>

<a
	href="/partners/{thumbnail.slug}"
	class="bg-gray w-full aspect-3/1 flex justify-center items-center thumbnail colorize p-3 md:aspect-square"
	class:aspect-square={ratio === '1'}
>
	<div class="cover-image">
		{#if thumbnail?.logo}
			<div class="max-w-3/4 mx-auto"><Image image={thumbnail?.logo} fit="cover" /></div>
		{:else}
			<div class="w-full h-full typo-2xl">{thumbnail.title}</div>
		{/if}
	</div>
</a>

<style>
	.thumbnail.colorize:hover .cover-image {
		filter: invert(35%) sepia(31%) saturate(6562%) hue-rotate(204deg) brightness(102%)
			contrast(101%);
	}
</style>
