<script>
	import Image from '$lib/components/element/Image.svelte';
	export let thumbnail;
</script>

<a href="/performances/{thumbnail.slug}" class="hover:text-brown">
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
			{#each thumbnail.artists as artist}<div>{artist.name}</div>{/each}
			{#each thumbnail.institutions as institution}<div>{institution.title}</div>{/each}
			<span>{thumbnail.typology.title}</span>
		</div>
	</div>
</a>
