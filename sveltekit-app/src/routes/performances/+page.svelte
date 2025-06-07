<script>
	import PortableText from '$lib/components/element/PortableText.svelte';
	import PerformanceCard from '$lib/components/thumbnails/PerformanceCard.svelte';
	export let data;
	$: performances = data?.performances?.data;
	$: page = data?.page?.data[0];
</script>

<div>
	<section class="typo-xl text-center pt-12 w-full">
		<div class="typo-s text-left pl-10">Performances</div>
		<p class="px-4">
			{page?.intro}
		</p>
		<div class="grid-2 pt-3 px-xs">
			<div class="col-start-2 typo-base text-left">
				<PortableText data={page?.description} />
			</div>
		</div>
	</section>
	{#if performances}
		<section class="p-xs mt-12">
			<ul class="flex flex-col gap-6">
				{#each performances as performance}
					<li><PerformanceCard {performance} /></li>
				{/each}
			</ul>
		</section>
	{/if}
</div>
