<script>
	import ArchiveIntro from '$lib/components/ArchiveIntro.svelte';
	import PerformanceCard from '$lib/components/thumbnails/PerformanceCard.svelte';

	export let data;

	$: performances = data?.performances?.data;
	$: document = data?.page?.data[0];
</script>

<div>
	<section class="typo-xl text-center pt-12 w-full">
		<div class="typo-s text-center md:pl-10 md:text-left">{document.title}</div>
		{#if document?.intro}
			<p class="px-4">
				{document?.intro}
			</p>
		{/if}
		<ArchiveIntro {document} />
	</section>
	{#if performances}
		<section class="p-xs mt-3">
			<ul class="flex flex-col gap-6">
				{#each performances as performance}
					<li><PerformanceCard thumbnail={performance} /></li>
				{/each}
			</ul>
		</section>
	{/if}
</div>
