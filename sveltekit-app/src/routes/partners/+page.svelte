<script>
	// @ts-nocheck
	import ArchiveIntro from '$lib/components/ArchiveIntro.svelte';
	import Image from '$lib/components/element/Image.svelte';

	export let data;

	$: partners = data?.partners?.data;
	$: document = data?.page?.data[0];
</script>

<div class="flex flex-col gap-6">
	<section class="pt-12 w-full">
		<div class="typo-s text-center md:text-left md:pl-10">{document.title}</div>
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
						<a
							href="/partners/{partner.slug}"
							class="bg-gray w-full flex justify-center items-center thumbnail colorize p-3 aspect-square"
						>
							<div class="cover-image">
								{#if partner?.logo}
									<Image image={partner?.logo} fit="contain" />
								{:else}
									<div class="w-full h-full typo-2xl">{partner.title}</div>
								{/if}
							</div>
						</a>
					</li>
				{/each}
			</ul>
		</section>
	{/if}
</div>
