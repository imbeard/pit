<script>
	import PortableText from '$lib/components/element/PortableText.svelte';
	export let document;
	$: readmore = false;

	const toggleReadmore = () => {
		readmore = !readmore;
	};
</script>

{#if document?.shortDescription && document?.description}
	<div class="md:grid-2 pt-3 px-xs text-left">
		<div class="col-start-2 typo-base flex flex-col items-center md:items-start">
			<PortableText data={readmore ? document?.description : document?.shortDescription} />
			<button on:click={() => toggleReadmore()} class="button theme-pink-brown w-fit mt-3"
				>Read {readmore ? 'less' : 'more'}
				<span class="align-super typo-s leading-0">{readmore ? '-' : '+'}</span></button
			>
		</div>
	</div>
{:else}
	<div class="grid-2 pt-3 px-xs text-left">
		<div class="col-start-2 typo-base">
			<PortableText data={document?.description} />
		</div>
	</div>
{/if}
