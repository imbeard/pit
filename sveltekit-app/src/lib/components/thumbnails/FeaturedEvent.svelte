<script>
	import Image from '$lib/components/element/Image.svelte';
	import { formatDate } from '$lib/utils';
	export let thumbnail;
	$: theme = `theme-${thumbnail?.theme}`;
</script>

<a href="/events/{thumbnail?.slug?.current}" class="flex flex-col justify-between p-2 {theme} h-full">
	{#if thumbnail?.image?.asset}
		<div class="absolute top-1/2 left-0 transform -translate-y-1/2">
			<div class="cover-image">
				<Image image={thumbnail?.image} fit="cover" />
			</div>
		</div>
	{/if}
	<div class="z-10">
		<div class="typo-base text-center pt-xs">
			<span>{thumbnail?.typology}</span>
			<span>{thumbnail?.location}</span>
		</div>
		<h2 class="typo-2xl text-center">{thumbnail?.title}</h2>
	</div>
	<div class="typo-2xl flex flex-col gap-1 z-10">
		<h4>{thumbnail?.institution?.title}</h4>
		<div class="typo-base">{thumbnail?.summary}</div>
		<div class="text-center">{formatDate(thumbnail.start)}</div>
	</div>
</a>

<style>
</style>
