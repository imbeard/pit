<script lang="ts">
	import '../assets/css/main.css';
	import { isPreviewing, VisualEditing } from '@sanity/visual-editing/svelte';
	import { page } from '$app/state';
	import LiveMode from '$lib/components/LiveMode.svelte';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import LogoAnimation from '$lib/components/LogoAnimation.svelte';

	export let data;
	$: settings = data?.settings?.data;
</script>

{#if $isPreviewing}
	<a href={`/preview/disable?redirect=${page.url.pathname}`} class="preview-toggle">
		<span>Preview Enabled</span>
		<span>Disable Preview</span>
	</a>
{/if}

<div class="typo-base">
	<Header />
	<LogoAnimation />
	<slot />
	<div class="mt-12">
		<Footer data={settings} />
	</div>
</div>

{#if $isPreviewing}
	<VisualEditing />
	<LiveMode />
{/if}
