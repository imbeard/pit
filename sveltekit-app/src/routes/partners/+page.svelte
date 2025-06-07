<script>
	import PortableText from '$lib/components/element/PortableText.svelte';
	import PartnerCard from '$lib/components/thumbnails/PartnerCard.svelte';

	export let data;

	$: partners = data?.partners?.data;
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
	{#if partners}
		<section class="p-xs">
			<ul class="grid-3">
				{#each partners as partner}
					<li><PartnerCard thumbnail={partner} /></li>
				{/each}
			</ul>
		</section>
	{/if}
</div>
