<script>
	import PortableText from '../element/PortableText.svelte';
	export let section;
</script>

<div class="grid-2 w-full">
	<div>
		{#if section.heading}<h3 class="heading pb-3 typo-lg">{section.heading}</h3>{/if}
		<div class="max-w-4xl">
			<PortableText data={section.content} />
		</div>
	</div>
</div>

<style>
	.heading {
		padding-top: calc(5rem - var(--spacing-s));
	}
</style>
