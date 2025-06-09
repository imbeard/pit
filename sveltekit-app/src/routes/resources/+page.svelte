<script>
	import PortableText from '$lib/components/element/PortableText.svelte';
	import ArchiveIntro from '$lib/components/ArchiveIntro.svelte';

	import ResourceCard from '$lib/components/thumbnails/ResourceCard.svelte';
	export let data;
	$: resources = data?.resources?.data;
	$: document = data?.page?.data[0];
	$: readmore = false;

	const toggleReadmore = () => {
		readmore = !readmore;
	};
</script>

<div class="flex flex-col gap-6">
	<section class="pt-12 w-full">
		<div class="typo-s text-center md:pl-10 md:text-left">{document.title}</div>
		<p class="px-4 typo-base text-center">
			{document?.intro}
		</p>
		<ArchiveIntro {document} />
	</section>
	{#if resources}
		<section class="p-xs">
			<div class="gap-y-6 border-b border-gray md:border-none md:grid-2 md:p-xs md:gap-y-0">
				{#each resources as resource}
					<ResourceCard thumbnail={resource} />
				{/each}
			</div>
		</section>
	{/if}
</div>
