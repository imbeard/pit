<script>
	export let sections = [];

	const componentMap = {
		infoSection: () => import('$lib/components/sections/InfoSection.svelte'),
		hero: () => import('$lib/components/sections/HeroSection.svelte'),
		gallery: () => import('$lib/components/sections/GallerySection.svelte'),
		blockquote: () => import('$lib/components/sections/BlockquoteSection.svelte'),
		highlightedText: () => import('$lib/components/sections/HighlightedTextSection.svelte'),
		twoImages: () => import('$lib/components/sections/TwoImagesSection.svelte')
	};

	$: orderedComponents = sections
		.filter(section => componentMap[section._type])
		.map(section => ({
			section,
			componentPromise: componentMap[section._type]()
		}));
</script>

{#each orderedComponents as { section, componentPromise }}
	{#await componentPromise then Module}
		{@const Component = Module.default}
		<Component {section} />
	{/await}
{/each}