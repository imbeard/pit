<script>
	import Image from '$lib/components/element/Image.svelte';
	import PageBuilder from '$lib/components/PageBuilder.svelte';
	import PortableText from '$lib/components/element/PortableText.svelte';
	import PerformanceCard from '$lib/components/thumbnails/PerformanceCard.svelte';

	export let data;
	$: partner = data?.document?.data?.partner[0];
	$: performances = data?.document?.data?.performances;
	$: pageBuilder = partner?.pageBuilder;
</script>

<div class="px-xs">
	<section class="w-full flex justify-center pt-10">
		<div class="pb-6 border-b border-gray w-full relative">
			<div class="flex flex-col items-center">
				<div class="typo-s">Partner</div>
				{#if partner?.title}
					<div class="typo-lg">{partner?.title}</div>
				{/if}
				{#if partner?.extendedTitle}
					<div class="typo-lg">{partner?.extendedTitle}</div>
				{/if}
			</div>
			{#if partner?.logo}
				<div class="mx-auto h-[50vh] aspect-square flex justify-center items-center">
					<Image image={partner?.logo} fit="contain" />
				</div>
			{/if}
		</div>
	</section>

	{#if partner?.image}
		<div class="w-full mx-auto pt-xs">
			<Image image={partner?.image} fit="contain" />
		</div>
	{/if}

	<section class="flex flex-col-reverse md:grid-2 pt-s pb-10 md:pt-3 md:pb-12">
		<PortableText data={partner?.description} />
		{#if partner?.informations && partner?.informations.length > 0}
			<div class="grid-2 md:block">
				<div class="col-start-2">
					{#each partner?.informations as information}
						<div class="pb-2">
							<h4 class="typo-s pb-xs">{information.title}</h4>
							<PortableText data={information.text} />
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</section>

	{#if pageBuilder}
		<PageBuilder sections={pageBuilder.sections} />
	{/if}

	{#if performances}
		<div>
			<h2 class="uppercase typo-lg w-full border-b border-gray pb-xs">Partner's Performances</h2>
			<div class="flex flex-col gap-6 mt-xs">
				{#each performances as performance}
					<div>
						<PerformanceCard thumbnail={performance} />
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>
