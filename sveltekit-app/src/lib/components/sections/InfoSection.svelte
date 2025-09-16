<script>
	import PortableText from '../element/PortableText.svelte';
	export let section;
</script>

<div class="md:grid-2 w-full">
	<div>
		{#if section.heading}<h3 class="heading py-2 typo-lg">{section.heading}</h3>{/if}
		<div class="max-w-5xl">
			<PortableText data={section.content} />
		</div>
	</div>
</div>

<style>
	.heading:not(:first-child) {
		padding-top: calc(5rem - var(--spacing-s));
	}
</style>
