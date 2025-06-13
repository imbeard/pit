<script>
    import PortableText from "$lib/components/element/PortableText.svelte";
    export let section;
</script>
<div class="w-full italic typo-lg">
    <PortableText data={section.text} />
</div>