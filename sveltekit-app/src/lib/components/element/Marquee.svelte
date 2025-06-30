<script>
	import Image from '$lib/components/element/Image.svelte';
	export let data;
	import Marqueeck from '@arisbh/marqueeck';

	const options = {
		direction: 'left',
		speed: 20
	};
</script>

<Marqueeck {options}>
	<div>
		{#each data as item}
			<div class="inline-block h-3 typo-lg px-4 md:h-2.5 md:px-7">
				{#if item.logo}
					<Image image={item.logo} fit="contain" />
				{:else}
					{item.title}
				{/if}
			</div>
		{/each}
	</div>
</Marqueeck>