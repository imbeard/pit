<script>
	import Image from '$lib/components/element/Image.svelte';
	import PortableText from '$lib/components/element/PortableText.svelte';
	export let artists;
	export let theme;
</script>

<div>
	<div class="w-full">
		<h3 class="uppercase typo-lg pb-xs">Featured Artists</h3>
		<hr class="text-gray" />
	</div>
	{#each artists as artist}
		<div class="pt-xs relative pb-xs border-b border-gray flex flex-col-reverse md:block">
			<div class="self-center md:absolute top-0 right-0 mt-s">
				<a class="button {theme}" href="/people/{artist.slug}">
					<span>Discover</span>
					<span class="typo-s align-super leading-0">&nearr;</span>
				</a>
			</div>
			<div>
				<div class="w-20 aspect-[4/5] mx-auto">
					<Image image={artist.image} fit="cover" />
					<div class="typo-s text-center pt-xs">{artist.country}</div>
					<div>{artist.name}</div>
					<div class="text-center">{artist.job}</div>
				</div>
				<div class="summary mx-auto max-w-60 pt-2">
					<PortableText data={artist.summary} />
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	a {
		display: inherit;
	}
</style>