<script>
	import Marquee3k from 'marquee3000';
	import Image from '$lib/components/element/Image.svelte';
	import { onMount } from 'svelte';
	export let data;
	onMount(() => Marquee3k.init());
</script>

<div class="marquee3k overflow-hidden absolute left-0 transform -translate-x-xs" data-speed="0.25" data-reverse="bool" data-pausable="bool">
	<div>
		{#each data as item}
			<div class="inline-block typo-s h-2.5">
				{#if item.logo}
					<Image image={item.logo} fit="contain" />
				{:else}
					{item.title}
				{/if}
			</div>
		{/each}
	</div>
</div>

<style>
    .marquee3k {
        width: calc(100% + var(--spacing-xs) * 2);
    }
	.marquee3k div > div {
		padding-inline: 6rem;
	}
</style>
