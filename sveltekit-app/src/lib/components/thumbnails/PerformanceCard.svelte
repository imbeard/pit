<script>
	import Image from '$lib/components/element/Image.svelte';
	export let thumbnail;
	$: theme = `theme-${thumbnail.theme}`;
	$: console.log(thumbnail);
</script>

<a href="/performances/{thumbnail.slug}" class="performance {theme} text-black">
	<div>
		<Image image={thumbnail.image} fit="cover" />
	</div>
	<div class="pt-1 flex flex-col gap-1">
		<div class="w-full grid-3 typo-s">
			<span>Artist</span>
			<span>Institutions</span>
			<span>Typology</span>
		</div>
		<h3 class="typo-2xl text-center">{thumbnail.title}</h3>
		<div class="w-full grid-3 typo-s">
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
			<div>{thumbnail.typology.title}</div>
		</div>
	</div>
</a>
