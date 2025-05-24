<script lang="ts">
	import { isPreviewing, VisualEditing } from '@sanity/visual-editing/svelte';
	import { page } from '$app/state';
	import LiveMode from '$lib/components/LiveMode.svelte';
	import Header from '$lib/components/Header.svelte';
</script>

{#if $isPreviewing}
	<a href={`/preview/disable?redirect=${page.url.pathname}`} class="preview-toggle">
		<span>Preview Enabled</span>
		<span>Disable Preview</span>
	</a>
{/if}

<div class="typo-base p-xs">
	<Header />
	<slot />
</div>

{#if $isPreviewing}
	<VisualEditing />
	<LiveMode />
{/if}
