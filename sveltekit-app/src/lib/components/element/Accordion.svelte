<script>
	import { text } from '@sveltejs/kit';
	import { slide } from 'svelte/transition';

	export let open = false;
	export let sticky = false;
	export let arrow = true;
	export let lineColor = '';
	export let aboutPage = false;
	let identifier = Math.random().toString();

	const handleClick = () => (open = !open);
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="group accordion py-2 border-y {lineColor}"
	class:py-xs={aboutPage}
	class:border-t-0={aboutPage}
	data-id={identifier}
>
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="w-full flex items-center" class:sticky class:top-0={sticky} on:click={handleClick}>
		<div class="flex justify-between w-full {aboutPage ? 'pl-3' : 'pl-0'}">
			<slot name="head"></slot>
		</div>
		<button
			class="group-hover:bg-pink group-hover:text-red"
			class:button={aboutPage}
			class:theme-red-pink={aboutPage}
			class:w-3={aboutPage}
			class:aspect-square={aboutPage}
			class:text-red={aboutPage && open}
			class:bg-pink={aboutPage && open}
		>
			{#if !open}
				+
			{:else}
				-
			{/if}
		</button>
	</div>

	{#if open}
		<div class="details pt-2">
			<slot name="details"></slot>
		</div>
	{/if}
</div>

<style>
	.accordion:not(:first-child) {
		border-top: none;
	}
</style>
