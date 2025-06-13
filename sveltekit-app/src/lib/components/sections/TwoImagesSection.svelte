<script>
	import Image from '$lib/components/element/Image.svelte';
	export let section;

	$: console.log(section);
</script>

<div class="md:grid-2">
	{#each section.items as image}
		<Image {image} fit="contain" />
	{/each}
	{#if section?.caption}<div class="caption">{section?.caption}</div>{/if}
</div>
