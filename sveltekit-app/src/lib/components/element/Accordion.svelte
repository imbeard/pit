<script>
	import { slide } from 'svelte/transition';

	export let open = false;
	export let sticky = false;
	export let arrow = true;
	export let lineColor = '';

	const handleClick = () => (open = !open);
</script>

<div class="accordion py-2 border-y {lineColor}">
	<button class="w-full flex items-center" class:sticky class:top-0={sticky} on:click={handleClick}>
		<div class="flex justify-between w-full">
			<slot name="head"></slot>
		</div>
		<button>
			{#if !open}
				+
			{:else}
				-
			{/if}
		</button>
	</button>

	{#if open}
		<div class="details pt-2" transition:slide>
			<slot name="details"></slot>
		</div>
	{/if}
</div>

<style>
    .accordion:not(:first-child) {
       border-top: none;
    }
</style>
