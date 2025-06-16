<script>
	import Image from '$lib/components/element/Image.svelte';
	import PortableText from '$lib/components/element/PortableText.svelte';
	export let artists;
    export let theme;
</script>

{#each artists as artist}
	<div class="pt-xs relative pb-xs border-b border-gray">
		<div class="absolute top-0 right-0 mt-s">
			<a class="button {theme}" href="/artists/{artist.slug}">
				<span>Discover</span>
				<span class="typo-s align-super">&nearr;</span>
			</a>
		</div>
		<div class="w-20 aspect-[4/5] mx-auto">
			<Image image={artist.image} fit="cover" />
			<div class="typo-s text-center">{artist.country}</div>
			<div>{artist.name}</div>
			<div class="text-center">{artist.job}</div>
		</div>
		<div class="summary mx-auto max-w-60 pt-2">
			<PortableText data={artist.summary} />
		</div>
	</div>
{/each}
