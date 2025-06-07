<script>
	import PortableText from '$lib/components/element/PortableText.svelte';
	import PerformanceCard from '$lib/components/thumbnails/PerformanceCard.svelte';

	export let data;

	$: performances = data?.performances?.data;
	$: document = data?.page?.data[0];
	$: readmore = false;

	const toggleReadmore = () => {
		readmore = !readmore;
	};
</script>

<div>
	<section class="typo-xl text-center pt-12 w-full">
		<div class="typo-s text-left pl-10">{document.title}</div>
		<p class="px-4">
			{document?.intro}
		</p>
		{#if document?.shortDescription && document?.description}
			<div class="grid-2 pt-3 px-xs text-left">
				<div class="col-start-2 typo-base">
					<PortableText data={readmore ? document?.description : document?.shortDescription} />
					<button on:click={() => toggleReadmore()} class="button theme-pink-brown mt-3"
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
