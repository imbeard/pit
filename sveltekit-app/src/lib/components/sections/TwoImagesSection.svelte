<script>
	import Image from '$lib/components/element/Image.svelte';
	import PortableText from '$lib/components/element/PortableText.svelte';
	export let section;
</script>

<div class="flex flex-col gap-xs md:grid-2">
	{#each section.items as image}
		<div>
			<Image {image} fit="contain" showCaption={true} />
		</div>
	{/each}
</div>
{#if section?.caption}
	<div class="caption typo-s md:max-w-1/2">
		<PortableText data={section.caption} />
	</div>
{/if}
