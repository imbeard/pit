<script>
	import Image from '$lib/components/element/Image.svelte';
	export let thumbnail;
	$: theme = `theme-${thumbnail.theme}`;
</script>

<a href="/performances/{thumbnail.slug}" class="performance {theme} text-black">
	<div class="aspect-4/5 md:aspect-16/9">
		<Image image={thumbnail.image} fit="cover" />
	</div>
	<div class="pt-1 flex flex-col gap-1">
		<div class="w-full grid-2 md:grid-3 typo-s">
			{#if thumbnail.artists}<span>Artist</span>{/if}
			{#if thumbnail.institutions}<span>Institutions</span>{/if}
			{#if thumbnail.typology}<span class="hidden md:block">Typology</span>{/if}
		</div>
		<h3 class="typo-2xl text-center">{thumbnail.title}</h3>
		<div class="w-full grid-2 md:grid-3 typo-s">
			{#each thumbnail.artists as artist, index}
				<span>{artist.name}</span>
				{#if index < thumbnail?.artistis?.length - 1}
					<span>,</span>
				{/if}
			{/each}
			{#if thumbnail?.institutions?.length > 0}
				<div>
					{#each thumbnail?.institutions as institution, index}
						<div>
							<span>{institution.institution.title}</span>
							{#if index < thumbnail?.institutions?.length - 1}
								<span>,</span>
							{/if}
						</div>
					{/each}
				</div>
			{/if}
			<div class="hidden md:block">{thumbnail.typology.title}</div>
		</div>
	</div>
</a>
