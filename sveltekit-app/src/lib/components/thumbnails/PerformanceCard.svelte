<script>
	import Image from '$lib/components/element/Image.svelte';
	export let performance;
</script>

<a href="/performances/{performance.slug}">
	<div>
		<Image image={performance.image} fit="cover" />
	</div>
	<div class="pt-1 flex flex-col gap-1">
		<div class="w-full grid-3 typo-s">
			<span>Artist</span>
			<span>Institutions</span>
			<span>Typology</span>
		</div>
		<h3 class="typo-2xl text-center">{performance.title}</h3>
		<div class="w-full grid-3 typo-s">
			{#each performance.artists as artist}<div>{artist.name}</div>{/each}
			{#each performance.institutions as institution}<div>{institution.title}</div>{/each}
			<span>{performance.typology}</span>
		</div>
	</div>
</a>
