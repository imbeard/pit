<script>
	import PageBuilder from '$lib/components/PageBuilder.svelte';
	import Image from '$lib/components/element/Image.svelte';
	import FeaturedArtists from '$lib/components/FeaturedArtists.svelte';
	import PartneringInstitutions from '$lib/components/PartneringInstitutions.svelte';

	export let data;
	$: performance = data?.performance?.data[0];
	$: pageBuilder = performance?.pageBuilder;
</script>

<div class="pt-8 p-xs">
	<section class="hero">
		<div class="pt-1 flex flex-col gap-1 pb-xs">
			<div class="w-full grid-3 typo-s">
				<span>Artist</span>
				<span>Institutions</span>
				<span>Typology</span>
			</div>
			<h3 class="typo-2xl text-center">{performance.title}</h3>
			<div class="w-full grid-3 typo-s">
				{#if performance.artists.length > 0}
					{#each performance.artists as artist}
						<div>
							{artist.name}
						</div>
					{/each}
				{/if}
				{#if performance.institutions.length > 0}
					<div>
						{#each performance.institutions as institution, index}
							<div>
								<span>{institution.institution.title}</span>
								{#if index < performance?.institutions?.length - 1}
									<span>,</span>
								{/if}
							</div>
						{/each}
					</div>
				{/if}
				{#if performance.typology.title}
					<span>{performance.typology.title}</span>
				{/if}
			</div>
		</div>
		<div>
			<Image image={performance.image} fit="cover" />
		</div>
	</section>

	<div class="pt-s">
		<PageBuilder sections={pageBuilder.sections} />
	</div>

	{#if performance.artists && performance.artists.length > 0}
		<div class="pt-16">
			<FeaturedArtists artists={performance.artists} theme="theme-pink-brown" />
		</div>
	{/if}

	{#if performance.institutions && performance.institutions.length > 0}
		<section class="pt-16">
			<PartneringInstitutions partners={performance.institutions} />
		</section>
	{/if}
</div>
