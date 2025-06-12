<script>
	import Image from '$lib/components/element/Image.svelte';
	import { formatDate } from '$lib/utils';
	export let thumbnail;
	export let pageColor;
	$: theme = `theme-${thumbnail.theme}`;
	$: textTheme = `hover:text-${pageColor}`;
	$: containerWidth = 0;
</script>

<a href="/events/{thumbnail.slug}" bind:clientWidth={containerWidth}>
	<div
		class="h-full hidden md:pb-1 md:flex md:flex-col md:justify-between {theme} theme-events"
		class:card-empty={!thumbnail?.image?.asset}
		class:bg-transparent={thumbnail?.image?.asset}
		class:text-black={thumbnail?.image?.asset}
		style:min-height={`${1.4 * containerWidth}px`}
	>
		<div>
			{#if thumbnail?.image?.asset}
				<div class="cover-image h-auto aspect-[7/5]">
					<Image image={thumbnail.image} fit="cover" />
				</div>
			{/if}
			<div class="typo-s text-center pt-xs px-xs">{thumbnail.location}</div>
			<h4 class="typo-lg text-center px-xs">{thumbnail.title}</h4>
		</div>
		<div class="typo-lg" class:px-xs={!thumbnail?.image?.asset}>
			<div class="pb-0">
				<h4>{thumbnail.institution.title}</h4>
				<div>{formatDate(thumbnail.start)}</div>
			</div>
		</div>
	</div>

	<div
		class="grid-2 md:hidden {theme} aspect-[2/1]"
		class:card-empty={!thumbnail?.image?.asset}
		class:bg-transparent={thumbnail?.image?.asset}
		class:text-black={thumbnail?.image?.asset}
	>
		{#if thumbnail?.image?.asset}
			<div class="cover-image aspect-auto h-full">
				<Image image={thumbnail.image} fit="cover" />
			</div>
			<div class="typo-lg flex justify-between flex-col md:block">
				<div class="block">
					<div class="flex gap-xs justify-center w-full typo-s py-xs">
						<div>{thumbnail.typology.title}</div>
						<div>{thumbnail.location}</div>
					</div>
					<h4 class="typo-lg text-center">{thumbnail.title}</h4>
				</div>
				<div class="pb-xs">
					<h4>{thumbnail.institution.title}</h4>
					<div>{formatDate(thumbnail.start)}</div>
				</div>
			</div>
		{:else}
			<div class="flex flex-col h-full justify-between" class:px-xs={!thumbnail?.image?.asset}>
				<div
					class="flex gap-xs w-full typo-s py-xs justify-center"
					class:justify-start={!thumbnail?.image?.asset}
				>
					<div>{thumbnail.typology.title}</div>
					<div>{thumbnail.location}</div>
				</div>
				<div class="pb-xs">
					<h4>{thumbnail.institution.title}</h4>
					<div>{formatDate(thumbnail.start)}</div>
				</div>
			</div>
			<div class="h-full flex justify-center items-center">
				<h4 class="typo-lg text-center">{thumbnail.title}</h4>
			</div>
		{/if}
	</div>
</a>
