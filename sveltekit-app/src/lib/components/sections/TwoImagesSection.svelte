<script>
	import Image from '$lib/components/element/Image.svelte';
	import PortableText from '$lib/components/element/PortableText.svelte';
	export let section;
</script>

<div class="md:grid-2">
	{#each section.items as image}
		<div>
			<Image {image} fit="contain" />
			{#if image?.caption}
				<div class="caption">
					<PortableText data={image.caption} />
				</div>
			{/if}
		</div>
	{/each}
</div>
{#if section?.caption}
	<div class="caption typo-s md:max-w-1/2">
		<PortableText data={section.caption} />
	</div>
{/if}
