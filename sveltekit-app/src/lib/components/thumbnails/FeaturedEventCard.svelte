<script>
	import Image from '$lib/components/element/Image.svelte';
	import { formatDate } from '$lib/utils';
	export let thumbnail;
	$: theme = `theme-${thumbnail?.theme}`;
</script>

<a
	href="/events/{thumbnail?.slug}"
	class="card-empty flex flex-col justify-between p-[1.6rem] {theme} h-auto aspect-3/4 w-full md:aspect-auto md:h-full"
>
	{#if thumbnail?.image?.asset}
		<div class="absolute top-0 left-0 bottom-0 right-0">
			<div
				class="cover-image"
				style={thumbnail?.featuredMask
					? `mask-image: url('/masks/${thumbnail?.featuredMask}.svg')`
					: "mask-image: url('/masks/CloudShape-1.svg')"}
			>
				<Image image={thumbnail?.image} fit="cover" />
			</div>
		</div>
	{/if}
	<div class="z-10">
		<div class="typo-base text-center pt-xs">
			<span class="mr-1">{thumbnail?.typology.title}</span>
			<span>{thumbnail?.location}</span>
		</div>
		<h2 class="typo-2xl text-center">{thumbnail?.title}</h2>
	</div>
	<div class="typo-2xl flex flex-col gap-1 z-10">
		<h4>{thumbnail?.institution?.title}</h4>
		<div class="typo-s tracking-tight leading-tight md:typo-base">{thumbnail?.summary}</div>
		<div class="text-center">{formatDate(thumbnail.start)}</div>
	</div>
</a>

<style>
	.cover-image {
		mask-repeat: no-repeat;
		mask-size: 90% 90%;
		mask-position: center;
		width: 100%;
		height: 100%;
	}
</style>
