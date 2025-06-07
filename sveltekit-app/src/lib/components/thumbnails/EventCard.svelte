<script>
	import Image from '$lib/components/element/Image.svelte';
	import { formatDate } from '$lib/utils';
	export let thumbnail;
	$: theme = thumbnail?.image?.asset ? '' : `theme-${thumbnail.theme}`;
</script>

<a href="/events/{thumbnail.slug}" class="flex flex-col justify-between event-card pb-1 {theme}">
	<div>
		{#if thumbnail?.image?.asset}
			<div class="cover-image">
				<Image image={thumbnail.image} fit="cover" />
			</div>
		{/if}
		<div class="typo-s text-center pt-xs">{thumbnail.location}</div>
		<h4 class="typo-lg text-center">{thumbnail.title}</h4>
	</div>
	<div class="typo-lg" class:px-xs={!thumbnail?.image?.asset}>
		<h4>{thumbnail.institution.title}</h4>
		<div>{formatDate(thumbnail.start)}</div>
	</div>
</a>

<style>
	.event-card {
		aspect-ratio: 0.68;
	}
	.cover-image {
		aspect-ratio: 1.44;
	}
</style>
