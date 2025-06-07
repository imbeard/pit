<script>
	import PortableText from '$lib/components/element/PortableText.svelte';
	import ResourceCard from '$lib/components/thumbnails/ResourceCard.svelte';
	export let data;
	$: resources = data?.resources?.data;
	$: document = data?.page?.data[0];
</script>

<div class="flex flex-col gap-6">
	<section class="pt-12 w-full">
		<div class="typo-s text-left pl-10">{document.title}</div>
		<p class="px-4 typo-base text-center">
			{document?.intro}
		</p>
		{#if document?.description}
			<div class="grid-2 pt-3 px-xs">
				<div class="col-start-2 typo-base">
					<PortableText data={document?.description} />
				</div>
			</div>
		{/if}
	</section>
	{#if resources}
		<section class="p-xs">
			<div class="grid-2 p-xs gap-y-6">
				{#each resources as resource}
					<ResourceCard thumbnail={resource} />
				{/each}
			</div>
		</section>
	{/if}
</div>
