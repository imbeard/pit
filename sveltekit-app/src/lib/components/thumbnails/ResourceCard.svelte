<script>
	import { page } from '$app/stores';
	import Image from '$lib/components/element/Image.svelte';
	import PlayButton from '$lib/components/svg/PlayButton.svelte';
	import { formatDate } from '$lib/utils';
	export let thumbnail;
</script>

<a
	href="/resources/{thumbnail.slug}"
	class="resource-card grid-2 h-full py-xs min-h-20 hover:text-pink transition-all duration-200"
	class:border-none={$page.route.id === '/resources'}
>
	<div class="cover-image">
		{#if thumbnail.image}
			<div class="relative w-full h-full">
				<div class="absolute w-full h-full flex justify-center items-center">
					<PlayButton />
				</div>
				<Image image={thumbnail.image} fit="cover" />
			</div>
		{:else}
			<div class="bg-red w-full h-full flex justify-center items-center text-black">
				{thumbnail.typology}
			</div>
		{/if}
	</div>
	<div class="flex flex-col gap-1">
		<div class="typo-s text-center pt-xs">{thumbnail.typology}</div>
		<h4 class="typo-lg">{thumbnail.title}</h4>
		<div class="typo-s text-center pt-xs">{formatDate(thumbnail._createdAt)} &darr;</div>
	</div>
</a>
