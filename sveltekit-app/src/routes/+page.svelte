<script>
	// @ts-nocheck
	import Image from '$lib/components/element/Image.svelte';
	import PortableText from '$lib/components/element/PortableText.svelte';
	import Link from '$lib/components/element/Link.svelte';
	import PerformanceSlider from '$lib/components/PerformanceSlider.svelte';

	export let data;

	$: document = data?.page?.data;
</script>

<main>
	<div class="hero-home w-full flex items-center justify-center overflow-hidden">
		<Image image={document?.image} alt="hero" fit="contain" />
	</div>
	<div class="page p-xs flex flex-col gap-12">
		<div class="typo-xl text-center pt-12 w-full">
			<div class="px-4">
				<PortableText data={document?.intro} />
			</div>
			<div class="pt-1 pt flex justify-between typo-base items-center">
				<div class="max-w-md text-center">{document?.subtitle}</div>
				<div class="theme-pink-red button">
					<Link to={document?.cta.link} />
				</div>
			</div>
		</div>
		<PerformanceSlider slides={document?.performanceSlider} />
	</div>
</main>

<style>
	.hero-home {
		height: 100svh;
		background: linear-gradient(rgba(185, 185, 185, 0) 15%, rgba(185, 185, 185, 1) 70%);
	}
</style>
