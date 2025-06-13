<script>
    import PortableText from "../element/PortableText.svelte";
    export let section;
</script>
<div class="w-full flex justify-center highlighted-text ">
    <div class="typo-xl text-center max-w-5xl">
        <PortableText data={section.text} />
    </div>
</div>

<style>
    .highlighted-text {
        padding-block: calc(5rem - var(--spacing-s));
    }
</style>