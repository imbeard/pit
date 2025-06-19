<script>
	import { slide } from 'svelte/transition';

	export let open = false;
	export let sticky = false;
	export let arrow = true;
	export let lineColor = '';
	export let aboutPage = false;

	const handleClick = () => (open = !open);
</script>

<div class="accordion py-2 border-y {lineColor}" 
class:py-xs={aboutPage}
class:border-t-0={aboutPage}
>
	<button class="w-full flex items-center" class:sticky class:top-0={sticky} on:click={handleClick}>
		<div class="flex justify-between w-full">
			<slot name="head"></slot>
		</div>
		<button
			class:bg-red={aboutPage}
			class:w-3={aboutPage}
			class:text-pink={aboutPage}
			class:aspect-square={aboutPage}
		>
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
