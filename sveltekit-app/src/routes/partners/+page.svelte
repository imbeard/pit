<script>
	// @ts-nocheck
	import ArchiveIntro from '$lib/components/ArchiveIntro.svelte';
	import Image from '$lib/components/element/Image.svelte';
	import PartnerCard from '$lib/components/thumbnails/PartnerCard.svelte';
	import SEO from '$lib/components/seo/SEO.svelte';

	export let data;

	$: partners = data?.partners?.data;
	$: document = data?.page?.data[0];
</script>

<SEO data={document?.seo} />

<div class="flex flex-col gap-6">
	<section class="pt-12 w-full">
		<div class="typo-base text-center md:text-left md:pl-10">{document.title}</div>
		<p class="px-4 typo-base text-center">
			{document?.intro}
		</p>
		<ArchiveIntro {document} />
	</section>
	{#if partners}
		<section class="p-xs">
			<ul class="grid-2 md:grid-3">
				{#each partners as partner}
					<li>
						<PartnerCard thumbnail={partner} ratio="1" />
					</li>
				{/each}
			</ul>
		</section>
	{/if}
</div>

<style>
</style>
