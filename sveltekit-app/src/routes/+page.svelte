<script>
	// @ts-nocheck
	import Image from '$lib/components/Image.svelte';

	export let data;

	$: document = data?.page?.data;
</script>

<section class="grid-12">
	<div class="hero-bleed absolute top-0 left-0 w-full flex items-center justify-center overflow-hidden">
		<Image image={document?.image} alt="hero" fit="contain" />
	</div>
</section>

<style>
	.hero-bleed {
		height: 100svh;
		background: linear-gradient(rgba(185, 185, 185, 0) 15%, rgba(185, 185, 185, 1) 70%);
	}
</style>
