<script>
	import PortableText from '$lib/components/element/PortableText.svelte';
	export let data;
	$: policy = data?.page?.data?.privacyPolicy;
</script>

<div class="flex flex-col justify-start pt-20 items-center md:justify-center min-h-screen px-xs">
	<h1 class="typo-base">Cookie Policy</h1>
    <div class="max-w-6xl pt-3"><PortableText data={policy} /></div>
</div>
